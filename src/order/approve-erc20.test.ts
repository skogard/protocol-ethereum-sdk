import Web3 from "web3"
// @ts-ignore
import RpcSubprovider from "web3-provider-engine/subproviders/rpc"
import Ganache from "ganache-core"
import { randomAddress, toAddress } from "@rarible/types"
import { deployTestErc20 } from "./contracts/test-erc20"
import { Contract } from "web3-eth-contract"
import Wallet from "ethereumjs-wallet"
import { approveErc20 } from "./approve-erc20"
import { toBn } from "../common/to-bn"

const testPK = "846b79108c721af4d0ff7248f4a10c65e5a7087532b22d78645c576fadd80b7f"
const testWallet = new Wallet(Buffer.from(testPK, "hex"))
const testAddress = toAddress(testWallet.getAddressString())

describe("approveErc20", () => {
	const provider = Ganache.provider({
		accounts: [{ secretKey: Buffer.from(testPK, "hex"), balance: "0x1000000000000000000000000000" }],
	})
	// @ts-ignore
	const web3 = new Web3(provider)
	let testErc20: Contract

	beforeAll(async () => {
		testErc20 = await deployTestErc20(web3, "TST", "TST")
	})

	test("should approve exact value if not infinite", async () => {
		await testErc20.methods.mint(testAddress, 100).send({ from: testAddress, gas: 200000 })

		const operator = randomAddress()
		await approveErc20(web3, toAddress(testErc20.options.address), testAddress, operator, toBn(100), false)

		const result = toBn(await testErc20.methods.allowance(testAddress, operator).call())
		expect(result.eq(100)).toBeTruthy()
	})
})