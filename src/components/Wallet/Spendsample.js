import React, { useState } from 'react';


const Spend = ({ instance, onPaymentSuccess }) => {
    // const [spendTo, setSpendTo] = useState('');
		const spendTo  = "ak_CSrYCbz7v29QDekGdw8WjhMd4SLxLJpmEJYy42N88xL7LTyfZ" 
    const [spendAmount, setSpendAmount] = useState('');
    // const [spendPayload, setSpendPayload] = useState('');
    const [spendPromise, setSpendPromise] = useState(null);

    let aci = [
        {
            "contract": {
                "functions": [
                    {
                        "arguments": [
                            {
                                "name": "user2_address",
                                "type": "address"
                            }
                        ],
                        "name": "init",
                        "payable": false,
                        "returns": "MoneyTransfer.state",
                        "stateful": false
                    },
                    {
                        "arguments": [
                            {
                                "name": "user2_address",
                                "type": "address"
                            }
                        ],
                        "name": "sendMoney",
                        "payable": true,
                        "returns": {
                            "tuple": []
                        },
                        "stateful": true
                    },
                    {
                        "arguments": [],
                        "name": "confirmationByUser",
                        "payable": false,
                        "returns": {
                            "tuple": []
                        },
                        "stateful": true
                    },
                    {
                        "arguments": [],
                        "name": "getContractDetails",
                        "payable": false,
                        "returns": "MoneyTransfer.state",
                        "stateful": false
                    }
                ],
                "kind": "contract_main",
                "name": "MoneyTransfer",
                "payable": true,
                "state": {
                    "record": [
                        {
                            "name": "user1",
                            "type": "address"
                        },
                        {
                            "name": "user2",
                            "type": "address"
                        },
                        {
                            "name": "amount",
                            "type": "int"
                        },
                        {
                            "name": "isConfirmed",
                            "type": "bool"
                        }
                    ]
                },
                "typedefs": []
            }
        }
    ];
    let bytecode =
        "cb_+QGjRgOgt1C4FYXbm6DpgI6/bsWOiHm1+VQC7d7KQpLhAEo8txPAuQF1uQEi/g7+0LIANwA3BEcARwAHFwwCggwChAwChgwCiCcMCAD+RNZEHwA3AUcANwBVAoIaBoQAGg6GABoOiH8BAz/+XAf0vwA3ADcAVQAgIIIHDAT7A11Pbmx5IFVzZXIgMSBjYW4gY29uZmlybSYIiAcMCPsDpVRyYW5zYWN0aW9uIGFscmVhZHkgY29uZmlybWVkIG9yIHJlamVjdGVkGgoMhGUKDIYaDoj/AQM//qGAQw0ENwFHADcAJgiIBwwE+wOlVHJhbnNhY3Rpb24gYWxyZWFkeSBjb25maXJtZWQgb3IgcmVqZWN0ZWQLAB8wAAcMCPsDfUFtb3VudCBzaG91bGQgYmUgZ3JlYXRlciB0aGFuIDALAGUBAAsChhoGhAABAz+4Sy8EEQ7+0LJJZ2V0Q29udHJhY3REZXRhaWxzEUTWRB8RaW5pdBFcB/S/SWNvbmZpcm1hdGlvbkJ5VXNlchGhgEMNJXNlbmRNb25leYIvAIU3LjQuMAHMzzJk";


    const handleSpendClick = async () => {
        try {
           
            const contract = await instance.initializeContract({ aci, bytecode, address: "ct_2FPxcH3jRAWQmv8ox6hwPny1YV5yYtdmCG1VA2rqmnqL3T4Hdc" })
            console.log("contract", contract);


            // const sendMoneyResult = await contract.sendMoney("ak_cgWc8Rs7UcrmRu7VMXBCsG3mMaAKMmAnKgPWsWby5S5C5rhc3");
            // console.log(sendMoneyResult);
            const options1 = {
                amount: spendAmount,
                callData: "",
                fee: null,
                gas: null,
                gasPrice: 1000000000,
            };
            const args = [spendTo];
            const options = Object.fromEntries(
                Object.entries(options1).filter(([, v]) => v != null),
            );

            contract
                ?.$call("sendMoney", args, options)
                .then((result) => {
                    console.log(result);
                    setSpendPromise(result.hash)
										onPaymentSuccess();
                });

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Coins amount</label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={spendAmount}

                    onChange={(e) => 	setSpendAmount((e.target.value)*1000000000000000000) }
		 

                />
            </div>
           
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSpendClick}
            >
                Pay
            </button>
            {spendPromise && (
                <div className="mt-4">
                    <div className="font-bold text-lg mb-2">Spend result</div>
                    <p className="text-gray-700">{spendPromise}</p>
                </div>
            )}
        </div>
    );
};

export default Spend;