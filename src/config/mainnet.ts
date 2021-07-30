import { Config } from "./type"
import { toAddress } from "@rarible/types"

export const MAINNET_CONFIG: Config = {
	basePath: "https://api.rarible.com",
	chainId: 1,
	exchange: {
		v1: toAddress("0x33Aef288C093Bf7b36fBe15c3190e616a993b0AD"),
		v2: toAddress("0x9757F2d2b135150BBeb65308D4a91804107cd8D6"),
	},
	transferProxies: {
		nft: toAddress("0x66611f8d97688a0af08d4337d7846efec6995d58"),
		erc20: toAddress("0xbf558e78cfde95afbf17a4abe394cb2cc42e6270"),
		erc721Lazy: toAddress("0xEa90CFad1b8e030B8Fd3E63D22074E0AEb8E0DCD"),
		erc1155Lazy: toAddress("0xEa90CFad1b8e030B8Fd3E63D22074E0AEb8E0DCD")
	},
}
