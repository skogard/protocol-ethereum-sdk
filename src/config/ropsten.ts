import { Config } from "./type"
import { toAddress } from "@rarible/types"

export const ROPSTEN_CONFIG: Config = {
	basePath: "https://api-dev.rarible.com",
	chainId: 3,
	exchange: {
		v1: toAddress("0x33Aef288C093Bf7b36fBe15c3190e616a993b0AD"),
		v2: toAddress("0x33Aef288C093Bf7b36fBe15c3190e616a993b0AD")
	},
	transferProxies: {
		nft: toAddress("0x66611f8d97688a0af08d4337d7846efec6995d58"),
		erc20: toAddress("0xbf558e78cfde95afbf17a4abe394cb2cc42e6270"),
		erc721Lazy: toAddress("0xf8e4ecac18b65fd04569ff1f0d561f74effaa206"),
		erc1155Lazy: toAddress("0xf8e4ecac18b65fd04569ff1f0d561f74effaa206")
	},
}
