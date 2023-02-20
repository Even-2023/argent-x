import { assertNever } from "./../ui/services/assertNever"
import type { WindowMessageType } from "../shared/messages"
import { getProvider } from "../shared/network/provider"
import { disconnectAccount } from "./account"
import { ArgentXAccount } from "./ArgentXAccount"
import { sendMessage, waitForMessage } from "./messageActions"
import { getIsPreauthorized } from "./preAuthorization"
import { starknetWindowObject, userEventHandlers } from "./starknetWindowObject"

const INJECT_NAMES = ["starknet_civia"]

function attach() {
  INJECT_NAMES.forEach((name) => {
    // we need 2 different try catch blocks because we want to execute both even if one of them fails
    try {
      delete (window as any)[name]
    } catch (e) {
      // ignore
    }
    try {
      // set read only property to window
      Object.defineProperty(window, name, {
        value: starknetWindowObject,
        writable: false,
      })
    } catch {
      // ignore
    }
    try {
      ;(window as any)[name] = starknetWindowObject
    } catch {
      // ignore
    }
  })
}

function attachHandler() {
  attach()
  setTimeout(attach, 100)
}
// inject script
attachHandler()
window.addEventListener("load", () => attachHandler())
document.addEventListener("DOMContentLoaded", () => attachHandler())
document.addEventListener("readystatechange", () => attachHandler())

window.addEventListener(
  "message",
  async ({ data }: MessageEvent<WindowMessageType>) => {
    const { starknet } = window
    if (!starknet) {
      return
    }

    if (starknet.account && data.type === "CONNECT_ACCOUNT_RES") {
      const isPreauthorized = await getIsPreauthorized()
      if (!isPreauthorized) {
        // disconnect so the user can see they are no longer connected
        // TODO: better UX would be to also re-connect when user selects pre-authorized account
        await disconnectAccount()
      } else {
        const walletAccountP = waitForMessage(
          "CONNECT_DAPP_RES",
          10 * 60 * 1000,
        )
        sendMessage({
          type: "CONNECT_DAPP",
          data: { host: window.location.host },
        })
        const walletAccount = await walletAccountP

        if (!walletAccount) {
          return disconnectAccount()
        }
        const { address, network } = walletAccount
        if (
          address !== starknet.selectedAddress ||
          network.chainId !== starknet.chainId
        ) {
          starknet.selectedAddress = address
          starknet.chainId = network.chainId
          starknet.provider = getProvider(network)
          starknet.account = new ArgentXAccount(address, starknet.provider)
          for (const userEvent of userEventHandlers) {
            if (userEvent.type === "accountsChanged") {
              userEvent.handler([address])
            } else if (userEvent.type === "networkChanged") {
              userEvent.handler(network.chainId)
            } else {
              assertNever(userEvent)
            }
          }
        }
      }
    } else if (data.type === "DISCONNECT_ACCOUNT") {
      starknet.selectedAddress = undefined
      starknet.account = undefined
      starknet.isConnected = false
      for (const userEvent of userEventHandlers) {
        if (userEvent.type === "accountsChanged") {
          userEvent.handler([])
        } else if (userEvent.type === "networkChanged") {
          userEvent.handler(undefined)
        } else {
          assertNever(userEvent)
        }
      }
    }
  },
)
