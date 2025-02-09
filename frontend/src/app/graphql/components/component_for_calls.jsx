import React, { useState } from 'react';
import { GetDataUtils } from '../all_data_calls';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CONTRACT_ADDRESS = '0x34058be1ec2F67eFD9Fa351dAaDe5bA81f397cD3';
const CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_baseURL",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721IncorrectOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721InsufficientApproval",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidOperator",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721NonexistentToken",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "activityId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalActivities",
                "type": "uint256"
            }
        ],
        "name": "ActivityAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "botName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "systemPrompt",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "botDescription",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "deploymentURL",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "unlockCostInGWei",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "BotCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "botName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "messagesId",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "costPaid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalBotsPurchased",
                "type": "uint256"
            }
        ],
        "name": "BotPurchased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "communityName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "goalId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalGoalsOfCommunity",
                "type": "uint256"
            }
        ],
        "name": "CommunityGoalAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "communityName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "botName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "messagesId",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "CommunityRoomCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "communityName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalMembers",
                "type": "uint256"
            }
        ],
        "name": "CommunityRoomJoined",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "goalId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "goalType",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalGoalsOfType",
                "type": "uint256"
            }
        ],
        "name": "GoalAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "oldInjuryId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newInjuryId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "InjuryUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "uri",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "NFTMinted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "metadata",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "UserRegistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "_tokenURIs",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_activityId",
                "type": "string"
            }
        ],
        "name": "addActivity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "communityName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "goalId",
                "type": "string"
            }
        ],
        "name": "addCommunityGoal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_goalId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "goalType",
                "type": "string"
            }
        ],
        "name": "addGoal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
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
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_botName",
                "type": "string"
            }
        ],
        "name": "buyBot",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_botName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_systemPrompt",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_botDescription",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_deploymentURL",
                "type": "string"
            },
            {
                "internalType": "uint16",
                "name": "_unlockCostInGWei",
                "type": "uint16"
            }
        ],
        "name": "createBot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_communityName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_botName",
                "type": "string"
            }
        ],
        "name": "createCommunityRoom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_botName",
                "type": "string"
            }
        ],
        "name": "getBotDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "botName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "systemPrompt",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "botDescription",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "deploymentURL",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "unlockCostInGWei",
                        "type": "uint16"
                    }
                ],
                "internalType": "struct Athl3te.Bot",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_communityName",
                "type": "string"
            }
        ],
        "name": "getCommunityRoomDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "communityName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "botName",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "createdBy",
                        "type": "address"
                    },
                    {
                        "internalType": "uint16",
                        "name": "messagesId",
                        "type": "uint16"
                    },
                    {
                        "internalType": "string[]",
                        "name": "communitySportGoalIds",
                        "type": "string[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "members",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct Athl3te.CommunityRoom",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_communityName",
                "type": "string"
            }
        ],
        "name": "joinCommunityRoom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "mintNftWithUri",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_metadata",
                "type": "string"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
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
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
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
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
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
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_injuryId",
                "type": "string"
            }
        ],
        "name": "updateInjury",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const GetDataUtilsUI = () => {
    const [userAddress, setUserAddress] = useState('');
    const [communityName, setCommunityName] = useState('');
    const [botName, setBotName] = useState('');
    const [result, setResult] = useState(null);

    // Initialize GetDataUtils (you'll need to provide actual contract details)
    const dataUtils = new GetDataUtils(CONTRACT_ADDRESS, CONTRACT_ABI);

    const handleAction = async (action, ...params) => {
        try {
            const result = await action(...params);
            setResult(JSON.stringify(result, null, 2));
        } catch (error) {
            setResult(`Error: ${error.message}`);
        }
    };

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>GetDataUtils Functions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Input
                        placeholder="User Address"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        className="mb-2"
                    />
                    <Input
                        placeholder="Community Name"
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        className="mb-2"
                    />
                    <Input
                        placeholder="Bot Name"
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        className="mb-4"
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {/* Read Functions */}
                    <Button
                        onClick={() => handleAction(dataUtils.getUserActivities.bind(dataUtils), userAddress)}
                        className="w-full"
                    >
                        Get User Activities
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.getUserGoalsAndInjuries.bind(dataUtils), userAddress)}
                        className="w-full"
                    >
                        Get User Goals & Injuries
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.getUserPersonalAssistants.bind(dataUtils), userAddress)}
                        className="w-full"
                    >
                        Get User Personal Assistants
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.getUserProfile.bind(dataUtils), userAddress)}
                        className="w-full"
                    >
                        Get User Profile
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.getBotDetails.bind(dataUtils), botName)}
                        className="w-full"
                    >
                        Get Bot Details
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.getAllCommunities.bind(dataUtils))}
                        className="w-full"
                    >
                        Get All Communities
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.getCommunityMessagesAndGoals.bind(dataUtils), communityName)}
                        className="w-full"
                    >
                        Get Community Messages & Goals
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.getUserCommunities.bind(dataUtils), userAddress)}
                        className="w-full"
                    >
                        Get User Communities
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.getCommunityDetails.bind(dataUtils), communityName)}
                        className="w-full"
                    >
                        Get Community Details
                    </Button>

                    {/* Write Functions */}
                    <Button
                        onClick={() => handleAction(dataUtils.mintNFT.bind(dataUtils), "example-uri")}
                        className="w-full"
                    >
                        Mint NFT
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.registerUser.bind(dataUtils), {
                            metadata: {
                                name: "example-name",
                                age: 25,
                                gender: "Male",
                                height: 180,
                                weight: 80,
                            }
                        })}
                        className="w-full"
                    >
                        Register User
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.addActivity.bind(dataUtils), {
                            activityData: {
                                distance: "10k",
                                time: "1h",
                                speed: "10kmph",
                                calories: "800",
                                cadence: "1.2m",
                                activityType: "Running",
                                pr: "5k",
                            }
                        })}
                        className="w-full"
                    >
                        Add Activity
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.addGoal.bind(dataUtils), "sport", { example: "goal" })}
                        className="w-full"
                    >
                        Add Goal
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.buyBot.bind(dataUtils), botName)}
                        className="w-full"
                    >
                        Buy Bot
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.updateInjury.bind(dataUtils), { example: "injury" })}
                        className="w-full"
                    >
                        Update Injury
                    </Button>

                    <Button
                        onClick={() => handleAction(dataUtils.joinCommunityRoom.bind(dataUtils), communityName)}
                        className="w-full"
                    >
                        Join Community Room
                    </Button>
                </div>

                {result && (
                    <div className="mt-4">
                        <h3 className="font-medium mb-2">Result:</h3>
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                            {result}
                        </pre>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default GetDataUtilsUI;