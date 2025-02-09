'use client';

import React, { useState } from 'react';
import { GetDataUtils } from './all_data_calls';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Athl3teContractUtils } from './contract_utils';
import Web3 from 'web3';
import ABI from '../abi';
require('dotenv').config();


const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const CONTRACT_ABI = ABI;

export default function GetDataUtilsUI(){
    const [userAddress, setUserAddress] = useState('');
    const [communityName, setCommunityName] = useState('');
    const [botName, setBotName] = useState('');
    const [result, setResult] = useState(null);

    // Initialize GetDataUtils (you'll need to provide actual contract details)
    const dataUtils = new GetDataUtils(CONTRACT_ADDRESS, CONTRACT_ABI, new Web3(window.ethereum));

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
                        onClick={async () => handleAction(dataUtils.registerUser.bind(dataUtils), {
                            name: "John Doe",
                            age: 30,
                            weight: 80,
                            height: 180,
                            gender: "M"
                        })

                        }
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