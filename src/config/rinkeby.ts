import { Config } from "./type"
import { toAddress } from "@rarible/types"

export const RINKEBY_CONFIG: Config = {
	basePath: "https://api-staging.rarible.com",
	chainId: 4,
	exchange: {
		v1: toAddress("0x80f32a12cc4c095e2a409b70e5c96e8515e87dea"),
		v2: toAddress("0xd4a57a3bD3657D0d46B4C5bAC12b3F156B9B886b"),
	},
	transferProxies: {
		nft: toAddress("0x66611f8d97688a0af08d4337d7846efec6995d58"),
		erc20: toAddress("0xbf558e78cfde95afbf17a4abe394cb2cc42e6270"),
		erc721Lazy: toAddress("0x7d47126a2600E22eab9eD6CF0e515678727779A6"),
		erc1155Lazy: toAddress("0x7d47126a2600E22eab9eD6CF0e515678727779A6"),
	},
}
