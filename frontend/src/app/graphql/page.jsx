"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "@/app/providers";
import { Athl3teContractUtils } from "./contract_utils";
import Web3 from 'web3';
import {
  GET_USER_ACTIVITIES,
  GET_USER_GOALS_AND_INJURIES,
  GET_USER_PERSONAL_ASSISTANTS,
  GET_USER_PROFILE,
  GET_ALL_COMMUNITIES,
  GET_COMMUNITY_MESSAGES_AND_GOALS,
  GET_COMMUNITY_DETAILS,
  GET_USER_COMMUNITIES,
  GET_ALL_BOTS,
  GET_COMMUNITY_GOALS
} from "./graphql_queries";

const abi = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" },
      { "internalType": "string", "name": "_baseURL", "type": "string" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "sender", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "operator", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "approver", "type": "address" }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "operator", "type": "address" }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "receiver", "type": "address" }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "sender", "type": "address" }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
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
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalBots",
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
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalCommunities",
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
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalNFTsForUser",
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
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "_tokenURIs",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_activityId", "type": "string" }
    ],
    "name": "addActivity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "communityName", "type": "string" },
      { "internalType": "string", "name": "goalId", "type": "string" }
    ],
    "name": "addCommunityGoal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_goalId", "type": "string" },
      { "internalType": "string", "name": "goalType", "type": "string" }
    ],
    "name": "addGoal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_botName", "type": "string" }
    ],
    "name": "buyBot",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_botName", "type": "string" },
      { "internalType": "string", "name": "_systemPrompt", "type": "string" },
      { "internalType": "string", "name": "_botDescription", "type": "string" },
      { "internalType": "string", "name": "_deploymentURL", "type": "string" },
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
      { "internalType": "string", "name": "_communityName", "type": "string" },
      { "internalType": "string", "name": "_botName", "type": "string" }
    ],
    "name": "createCommunityRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "getApproved",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_botName", "type": "string" }
    ],
    "name": "getBotDetails",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "botName", "type": "string" },
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
      { "internalType": "string", "name": "_communityName", "type": "string" }
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
          { "internalType": "string", "name": "botName", "type": "string" },
          { "internalType": "address", "name": "createdBy", "type": "address" },
          { "internalType": "uint16", "name": "messagesId", "type": "uint16" },
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
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "operator", "type": "address" }
    ],
    "name": "isApprovedForAll",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_communityName", "type": "string" }
    ],
    "name": "joinCommunityRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }],
    "name": "mintNftWithUri",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "ownerOf",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_metadata", "type": "string" }
    ],
    "name": "registerUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "internalType": "bytes", "name": "data", "type": "bytes" }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "operator", "type": "address" },
      { "internalType": "bool", "name": "approved", "type": "bool" }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }
    ],
    "name": "supportsInterface",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "tokenURI",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_injuryId", "type": "string" }
    ],
    "name": "updateInjury",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


const queries = [
  { name: "User Activities", query: GET_USER_ACTIVITIES },
  { name: "User Goals & Injuries", query: GET_USER_GOALS_AND_INJURIES },
  { name: "User Personal Assistants", query: GET_USER_PERSONAL_ASSISTANTS },
  { name: "User Profile", query: GET_USER_PROFILE },
  { name: "All Communities", query: GET_ALL_COMMUNITIES },
  { name: "Community Messages & Goals", query: GET_COMMUNITY_MESSAGES_AND_GOALS },
  { name: "Community Details", query: GET_COMMUNITY_DETAILS },
  { name: "User Communities", query: GET_USER_COMMUNITIES},
  { name: "All Bots", query: GET_ALL_BOTS},
  { name: "Community Goals", query: GET_COMMUNITY_GOALS}
];

const writeOperations = [
  { 
    name: "Register User", 
    action: async (utils) => {
      const metadata = "testuserdata";
      return await utils.registerUser(metadata);
    }
  },
  { 
    name: "Add Activity", 
    action: async (utils) => {
      const activityId = `activity_testing_2`;
      return await utils.addActivity(activityId);
    }
  },
  { 
    name: "Add Sport Goal", 
    action: async (utils) => {
      const goalId = `sport_goallllllll`;
      return await utils.addGoal(goalId, "sport");
    }
  },
  { 
    name: "Create Community", 
    action: async (utils) => {
      const communityName = `community_${Date.now()}`;
      const botName = "bot2";
      return await utils.createCommunityRoom(communityName, botName);
    }
  },
  { 
    name: "Mint NFT", 
    action: async (utils) => {
      const uri = `ipfs://testUri_${Date.now()}`;
      return await utils.mintNFT(uri);
    }
  },
  { 
    name: "Buy Bot", 
    action: async (utils) => {
      const botName = "bot1";
      return await utils.buyBot(botName);
    }
  },
  { 
    name: "Update Injury", 
    action: async (utils) => {
      const injuryId = "injury_123";
      return await utils.updateInjury(injuryId);
    }
  },
  { 
    name: "Join Community Room", 
    action: async (utils) => {
      const communityName = "room1";
      return await utils.joinCommunityRoom(communityName);
    }
  },
  { 
    name: "Add Community Goal", 
    action: async (utils) => {
      const communityName = "community_123";
      const goalId = "goal_123";
      return await utils.addCommunityGoal(communityName, goalId);
    }
  },
  { 
    name: "Create Bot", 
    action: async (utils) => {
      const botName = "NewBot";
      const systemPrompt = "System prompt";
      const botDescription = "Bot description";
      const deploymentURL = "https://example.com";
      const unlockCostInGWei = 100;
      return await utils.createBot(botName, systemPrompt, botDescription, deploymentURL, unlockCostInGWei);
    }
  }
];

export default function GraphQLPage() {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [contractUtils, setContractUtils] = useState(null);
  const [txResult, setTxResult] = useState(null);
  const [txError, setTxError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [selectedQuery?.name],
    queryFn: async () => {
      if (!selectedQuery) return null;
      return await graphQLClient.request(selectedQuery.query, { userAddress: "0xecB4F7d130716305ae3a4B8b68D5a230166Ffa7D", communityName: "room1" });
    },
    enabled: !!selectedQuery,
  });

  // Initialize Web3 and contract utils
  const initializeWeb3 = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        console.log("MetaMask is installed!");
        const web3 = new Web3(window.ethereum);

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const contractAddress = "0xA9A98bAcAa8446145062070113194a2657e683b8"; // Replace with actual address
        const contractABI = abi;
        
        const utils = new Athl3teContractUtils(contractAddress, contractABI, web3);
        setContractUtils(utils);
        return utils;
      } else {
        throw new Error("Please install MetaMask!");
      }
    } catch (error) {
      setTxError(error.message);
    }
  };

  // Handle write operation
  const handleWriteOperation = async (operation) => {
    setTxResult(null);
    setTxError(null);
    setIsProcessing(true);

    try {
      console.log(contractUtils)
      let utils;
      if (!contractUtils) {
        utils = await initializeWeb3();
      }
      console.log(utils)
      
      const result = await operation.action(utils);
      setTxResult(result);
    } catch (error) {
      setTxError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto p-4">
      <div className="grid grid-cols-2 gap-8">
        {/* Read Operations Section */}
        <div>
          <h1 className="text-xl font-bold mb-4">GraphQL Queries (Read Operations)</h1>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {queries.map(({ name, query }) => (
              <button
                key={name}
                onClick={() => {
                  setSelectedQuery({ name, query });
                  refetch();
                }}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Write Operations Section */}
        <div>
          <h1 className="text-xl font-bold mb-4">Smart Contract Operations (Write)</h1>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {writeOperations.map((operation) => (
              <button
                key={operation.name}
                onClick={() => handleWriteOperation(operation)}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={isProcessing}
              >
                {operation.name}
              </button>
            ))}
          </div>
          {isProcessing && <div>Processing transaction...</div>}
          {txError && <div className="text-red-500">Error: {txError}</div>}
          {txResult && (
            <div className="bg-gray-100 p-2 rounded overflow-auto">
              <h3 className="font-bold mb-2">Transaction Result:</h3>
              <pre>txResult</pre>
            </div>
          )}
        </div>
      </div>
      {isLoading && <div>Loading...</div>}
          {error && <div className="text-red-500">Error: {error.message}</div>}
          {data && <pre className="bg-gray-100 p-2 rounded overflow-auto">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}