import type {AbiItem} from "web3-utils";
import Web3 from "web3";
import {Address} from "@rarible/protocol-api-client";
import {Contract} from "web3-eth-contract";

export function createTransferProxyContract(web3: Web3, address?: Address): Contract {
    return new web3.eth.Contract(transferProxyAbi, address)
}

export async function deployTransferProxy(web3: Web3, name: string, symbol: string) {
    const empty = createTransferProxyContract(web3)
    const [address] = await web3.eth.getAccounts()
    return empty
        .deploy({ data: transferProxyBytecode, arguments: [name, symbol] })
        .send({ from: address, gas: 3000000, gasPrice: "0" })
}

const transferProxyAbi: AbiItem[] = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OperatorAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OperatorRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "addOperator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isOperator",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "isOwner",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "removeOperator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "contract IERC721",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "erc721safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "contract IERC1155",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "erc1155safeTransferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const transferProxyBytecode = "0x608060405260006100176001600160e01b0361006616565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35061006a565b3390565b610978806100796000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c80639870d7fe116100665780639870d7fe146101085780639c1c2ee91461012e578063ac8a584a146101cb578063f2fde38b146101f1578063f709b9061461021757610093565b80636d70f7ae14610098578063715018a6146100d25780638da5cb5b146100dc5780638f32d59b14610100575b600080fd5b6100be600480360360208110156100ae57600080fd5b50356001600160a01b0316610253565b604080519115158252519081900360200190f35b6100da61026c565b005b6100e46102fd565b604080516001600160a01b039092168252519081900360200190f35b6100be61030c565b6100da6004803603602081101561011e57600080fd5b50356001600160a01b0316610330565b6100da600480360360c081101561014457600080fd5b6001600160a01b038235811692602081013582169260408201359092169160608201359160808101359181019060c0810160a082013564010000000081111561018c57600080fd5b82018360208201111561019e57600080fd5b803590602001918460018302840111640100000000831117156101c057600080fd5b509092509050610383565b6100da600480360360208110156101e157600080fd5b50356001600160a01b03166104a5565b6100da6004803603602081101561020757600080fd5b50356001600160a01b03166104f5565b6100da6004803603608081101561022d57600080fd5b506001600160a01b03813581169160208101358216916040820135169060600135610545565b600061026660018363ffffffff61060316565b92915050565b61027461030c565b6102b3576040805162461bcd60e51b81526020600482018190526024820152600080516020610902833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b600080546001600160a01b031661032161066a565b6001600160a01b031614905090565b61033861030c565b610377576040805162461bcd60e51b81526020600482018190526024820152600080516020610902833981519152604482015290519081900360640190fd5b6103808161066e565b50565b61039361038e61066a565b610253565b6103ce5760405162461bcd60e51b81526004018080602001828103825260348152602001806108ad6034913960400191505060405180910390fd5b866001600160a01b031663f242432a8787878787876040518763ffffffff1660e01b815260040180876001600160a01b03166001600160a01b03168152602001866001600160a01b03166001600160a01b03168152602001858152602001848152602001806020018281038252848482818152602001925080828437600081840152601f19601f820116905080830192505050975050505050505050600060405180830381600087803b15801561048457600080fd5b505af1158015610498573d6000803e3d6000fd5b5050505050505050505050565b6104ad61030c565b6104ec576040805162461bcd60e51b81526020600482018190526024820152600080516020610902833981519152604482015290519081900360640190fd5b610380816106b6565b6104fd61030c565b61053c576040805162461bcd60e51b81526020600482018190526024820152600080516020610902833981519152604482015290519081900360640190fd5b610380816106fe565b61055061038e61066a565b61058b5760405162461bcd60e51b81526004018080602001828103825260348152602001806108ad6034913960400191505060405180910390fd5b60408051632142170760e11b81526001600160a01b0385811660048301528481166024830152604482018490529151918616916342842e0e9160648082019260009290919082900301818387803b1580156105e557600080fd5b505af11580156105f9573d6000803e3d6000fd5b5050505050505050565b60006001600160a01b03821661064a5760405162461bcd60e51b81526004018080602001828103825260228152602001806109226022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b3390565b61067f60018263ffffffff61079e16565b6040516001600160a01b038216907fac6fa858e9350a46cec16539926e0fde25b7629f84b5a72bffaae4df888ae86d90600090a250565b6106c760018263ffffffff61081f16565b6040516001600160a01b038216907f80c0b871b97b595b16a7741c1b06fed0c6f6f558639f18ccbce50724325dc40d90600090a250565b6001600160a01b0381166107435760405162461bcd60e51b81526004018080602001828103825260268152602001806108876026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6107a88282610603565b156107fa576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b6108298282610603565b6108645760405162461bcd60e51b81526004018080602001828103825260218152602001806108e16021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff1916905556fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f70657261746f72526f6c653a2063616c6c657220646f6573206e6f74206861766520746865204f70657261746f7220726f6c65526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c654f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373a265627a7a72315820a07fc26bc15f5aae06f36e1fc2190886d48e5461fa43d04c3e112340def8f05664736f6c63430005100032"
