import { Network } from "./type"

const DEV_ONLY_NETWORKS: Network[] = [
  {
    id: "integration",
    name: "Integration",
    chainId: "SN_GOERLI",
    baseUrl: "https://external.integration.starknet.io",
    accountClassHash: {
      argentAccount:
        "0x144304b418a264f20b427988261aeb4cb325fabcfbb1df2851de5db416d8b14",
    },
    multicallAddress:
      "0x05754af3760f3356da99aea5c3ec39ccac7783d925a19666ebbeca58ff0087f4",
  },
]

export const defaultNetworks: Network[] = [
  {
    id: "mainnet-alpha",
    name: "Mainnet",
    chainId: "SN_MAIN",
    baseUrl: "https://alpha-mainnet.starknet.io",
    explorerUrl: "https://voyager.online",
    accountClassHash: {
      argentAccount:
        "0x144304b418a264f20b427988261aeb4cb325fabcfbb1df2851de5db416d8b14",
    },
    multicallAddress:
      "0x05754af3760f3356da99aea5c3ec39ccac7783d925a19666ebbeca58ff0087f4",
    readonly: true,
  },
  {
    id: "goerli-alpha",
    name: "Testnet",
    chainId: "SN_GOERLI",
    baseUrl: "https://alpha4.starknet.io",
    explorerUrl: "https://goerli.voyager.online",
    accountClassHash: {
      argentAccount:
        "0x144304b418a264f20b427988261aeb4cb325fabcfbb1df2851de5db416d8b14",
      argentPluginAccount:
        "0x4ee23ad83fb55c1e3fac26e2cd951c60abf3ddc851caa9a7fbb9f5eddb2091",
    },
    multicallAddress:
      "0x05754af3760f3356da99aea5c3ec39ccac7783d925a19666ebbeca58ff0087f4",
    readonly: true,
  },
  {
    id: "goerli-alpha-2",
    name: "Testnet 2",
    chainId: "SN_GOERLI2",
    baseUrl: "https://alpha4-2.starknet.io",
    explorerUrl: "https://goerli-2.voyager.online/",
    accountClassHash: {
      argentAccount:
        "0x144304b418a264f20b427988261aeb4cb325fabcfbb1df2851de5db416d8b14",
      argentPluginAccount:
        "0x4ee23ad83fb55c1e3fac26e2cd951c60abf3ddc851caa9a7fbb9f5eddb2091",
    },
    multicallAddress:
      "0x05754af3760f3356da99aea5c3ec39ccac7783d925a19666ebbeca58ff0087f4",
  },
  ...(process.env.NODE_ENV === "development" ? DEV_ONLY_NETWORKS : []),
  {
    id: "localhost",
    chainId: "SN_GOERLI",
    baseUrl: "http://localhost:5050",
    name: "Localhost 5050",
  },
]

export const defaultNetwork = defaultNetworks[2]
