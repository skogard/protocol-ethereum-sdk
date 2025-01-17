import Web3 from "web3";
import {Address} from "@rarible/protocol-api-client";
import {createErc721Contract} from "./contracts/erc721";
import {ContractSendMethod, SendOptions} from "web3-eth-contract";

export async function approveErc721(
    sentTx: (source: ContractSendMethod, options: SendOptions) => Promise<string>,
    web3: Web3,
    contract: Address,
    owner: Address,
    operator: Address
): Promise<string | undefined> {
    const erc721 = createErc721Contract(web3, contract)
    const allowance: boolean = await erc721.methods.isApprovedForAll(owner, operator).call()
    if (!allowance) {
        const [address] = await web3.eth.getAccounts()
        return sentTx(erc721.methods.setApprovalForAll(operator, true), { from: address })
    }
    return undefined
}
