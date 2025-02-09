import { Athl3teContractUtils } from './contract_utils';
import { NilliumUtils } from './nillium_utils';
import { graphQLClient } from "@/app/providers";
import {
    GET_USER_ACTIVITIES,
    GET_USER_GOALS_AND_INJURIES,
    GET_USER_PERSONAL_ASSISTANTS,
    GET_USER_PROFILE,
    GET_USER_DETAILS,
    GET_ALL_COMMUNITIES,
    GET_COMMUNITY_MESSAGES_AND_GOALS,
    GET_COMMUNITY_DETAILS,
    GET_USER_COMMUNITIES,
    GET_BOT_DETAILS,
    GET_COMMUNITY_GOALS
  } from "./graphql_queries";
  

export class GetDataUtils {
  constructor(contractAddress, abi, web3Instance = null) {
    this.contractUtils = new Athl3teContractUtils(contractAddress, abi, web3Instance);
}

  async getUserActivities(userAddress) {
    // Fetch on-chain data using GraphQL
    const userActivities = await graphQLClient.request(GET_USER_ACTIVITIES, { userAddress: userAddress });    
    
    // Initialize an array to hold the combined activity data
    const combinedActivities = [];

    // Loop through each activity and fetch off-chain data from Nillium
    for (const activity of userActivities.activityAddeds) {
    const offChainData = await NilliumUtils.getActivityDetails(activity.activityId);
    combinedActivities.push({
        ...activity,
        offChainData
    });
    }

    return combinedActivities;
    
  }

  async getUserGoalsAndInjuries(userAddress) {
    // Fetch on-chain data using GraphQL
    const onChainData = await graphQLClient.request(GET_USER_GOALS_AND_INJURIES, { userAddress: userAddress });

    // Initialize arrays to hold the combined data
    const combinedGoals = [];
    const combinedCommunityGoals = [];
    const combinedInjuries = [];

    // Loop through each goal and fetch off-chain data from Nillium
    for (const goal of onChainData.goalAddeds) {
    //depending on goal.goalType we will call the appropriate function
      const offChainData = await NilliumUtils.getGoalDetails(goal.goalId);
      combinedGoals.push({
        ...goal,
        offChainData
      });
    }

    // Loop through each community the user has joined and fetch community goals
    for (const community of onChainData.communityRoomJoineds) {
      const communityGoalsData = await graphQLClient.request(GET_COMMUNITY_GOALS, { communityName: community.communityName });
      for (const communityGoal of communityGoalsData.communityGoalAddeds) {
        const offChainData = await NilliumUtils.getGoalDetails(communityGoal.goalId);
        combinedCommunityGoals.push({
          ...communityGoal,
          communityName: community.communityName,
          offChainData
        });
      }
    }

    // Loop through each injury and fetch off-chain data from Nillium
    for (const injury of onChainData.injuryUpdateds) {
      const offChainData = await NilliumUtils.getInjuryDetails(injury.newInjuryId);
      combinedInjuries.push({
        ...injury,
        offChainData
      });
    }

    return {
      goals: combinedGoals,
      communityGoals: combinedCommunityGoals,
      injuries: combinedInjuries
    };
  }

  async getUserPersonalAssistants(userAddress) {
    const userBots = await fetchGraphQL(GET_USER_PERSONAL_ASSISTANTS, { userAddress });

    return userBots;
  }

  async getMessagesForMessagesId(messagesId) {
    const messages = await NilliumUtils.getMessagesForMessagesId(messagesId);
    return messages;
  }

  async getUserProfile(userAddress) {
    // Fetch on-chain data using GraphQL
    const onChainData = await graphQLClient.request(GET_USER_PROFILE, { userAddress });
    
    // Fetch off-chain data from Nillium
    const userMetadata = onChainData.userRegistereds[0].metadata;
    const offChainData = await NilliumUtils.getUserProfile(userMetadata);
    
    return {
      ...onChainData,
      userMetadata: offChainData
    };
  }

  async getBotDetails(botName) {
    const botDetails = await fetchGraphQL(GET_BOT_DETAILS, { botName });
    return botDetails;
  }

    async getAllCommunities() {
        const allCommunities = await fetchGraphQL(GET_ALL_COMMUNITIES);
        return allCommunities;
    }

  async getCommunityMessagesAndGoals(communityName) {
    // Fetch on-chain data using GraphQL
    const onChainData = await graphQLClient.request(GET_COMMUNITY_MESSAGES_AND_GOALS, { communityName });
    
    // Initialize arrays to hold the combined data
    const combinedMessages = [];
    const combinedGoals = [];

    // Loop through each message and fetch off-chain data from Nillium
    for (const message of onChainData.communityRoomCreateds) {
      const messages = await NilliumUtils.getMessagesForMessagesId(message.messagesId);
      combinedMessages.push({
        ...message,
        messages
      });
    }

    // Loop through each goal and fetch off-chain data from Nillium
    for (const goal of onChainData.goalAddeds) {
      const offChainData = await NilliumUtils.getGoalDetails(goal.goalId);
      combinedGoals.push({
        ...goal,
        offChainData
      });
    }

    return {
      messages: combinedMessages,
      goals: combinedGoals
    };
  }


  async getUserCommunities(userAddress) {
    const onChainData = await fetchGraphQL(GET_USER_COMMUNITIES, { userAddress });
    
    return onChainData;
  }

  async getCommunityDetails(communityName) {
    // Fetch on-chain data using GraphQL
    const onChainData = await graphQLClient.request(GET_COMMUNITY_DETAILS, { communityName });
    
    // Initialize arrays to hold the combined data
    const combinedCommunityDetails = [];

    // Loop through each community and fetch user metadata and details from Nillium
    for (const community of onChainData.communityRoomJoineds) {
      const userDetails = await graphQLClient.request(GET_USER_DETAILS, { userAddress: community.userAddress });
      const userMetadata = userDetails.userRegistereds[0].metadata;
      const offChainData = await NilliumUtils.getUserProfile(userMetadata);
      combinedCommunityDetails.push({
        ...community,
        userMetadata: offChainData
      });
    }

    return {
      communityRoomCreateds: onChainData.communityRoomCreateds,
      communityRoomJoineds: combinedCommunityDetails
    };
  }


// Write

  async mintNFT(uri) {
    // await NilliumUtils.storeUserMetadata(uri);
    return await this.contractUtils.mintNFT(uri);
  }

  async registerUser(metadata) {
    const id = await NilliumUtils.addUserMetadata(metadata);
    console.log(id);
    return await this.contractUtils.registerUser(id[0]);
  }

  async addActivity(activityData) {
    const id = await NilliumUtils.addActivity(activityData);
    return await this.contractUtils.addActivity(id);
  }

    async addActivities(activitiesData) {
        for (const activityData of activitiesData) {
            await this.addActivity(activityData);
        }
    }

  async addGoal(goalType, goalData) {
    let id;
    if (goalType === 'sport') {
      id = await NilliumUtils.addSportsGoal(goalData);
    } else {
      id = await NilliumUtils.addNutritionGoal(goalData);
    }
    return this.contractUtils.addGoal(id, goalType);
  }

  async buyBot(botName) {
    return await this.contractUtils.buyBot(botName);
  }

  async updateInjury(injuryUpdateData) {
    return await this.contractUtils.updateInjury(injuryUpdateData);
  }

  async joinCommunityRoom(communityName) {
    return this.contractUtils.joinCommunityRoom(communityName);
  }
}