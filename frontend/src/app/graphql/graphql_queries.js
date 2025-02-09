import { gql } from 'graphql-request';

// 1. Get user activities
export const GET_USER_ACTIVITIES = gql`
  query GetUserActivities($userAddress: Bytes!) {
    activityAddeds(
      where: { userAddress: $userAddress }
      orderBy: timestamp
      orderDirection: desc
    ) {
      activityId
      timestamp
      totalActivities
      blockNumber
      blockTimestamp
    }
  }
`;

// 2. Get user goals, communities joined, and injury info
export const GET_USER_GOALS_AND_INJURIES = gql`
  query GetUserGoalsAndInjuries($userAddress: Bytes!) {
    goalAddeds(
      where: { userAddress: $userAddress }
      orderBy: timestamp
      orderDirection: desc
    ) {
      goalId
      goalType
      timestamp
      totalGoalsOfType
    }
    communityRoomJoineds(
      where: { userAddress: $userAddress }) {
      communityName
  }
    injuryUpdateds(
      where: { userAddress: $userAddress }
      orderBy: timestamp
      orderDirection: desc
      first: 1
    ) {
      oldInjuryId
      newInjuryId
      timestamp
    }
  }
`;

// get community goal
export const GET_COMMUNITY_GOALS = gql`
  query GetCommunityGoals($communityName: String!) {
    communityGoalAddeds(
      where: { communityName: $communityName }
      orderBy: timestamp
      orderDirection: desc
    ) {
      goalId
      timestamp
    }
  }
`;

// 3. Get user personal assistants (bots)
export const GET_USER_PERSONAL_ASSISTANTS = gql`
  query GetUserBots($userAddress: Bytes!) {
    botPurchaseds(
      where: { userAddress: $userAddress }
      orderBy: timestamp
      orderDirection: desc
    ) {
      botName
      messagesId
      costPaid
      timestamp
      totalBotsPurchased
    }
  }
`;

// 5. Get user NFTs and metadata
export const GET_USER_PROFILE = gql`
  query GetUserProfile($userAddress: Bytes!) {
    nftminteds(
      where: { owner: $userAddress }
    ) {
      tokenId
      uri
      timestamp
    }
    userRegistereds(
      where: { userAddress: $userAddress }
    ) {
      metadata
      timestamp
    }
  }
`;

//get user details
export const GET_USER_DETAILS = gql`
  query GetUserDetails($userAddress: Bytes!) {
    userRegistereds(
      where: { userAddress: $userAddress }
    ) {
      metadata
      timestamp
    }
  }
`;

// 6. Get all communities
export const GET_ALL_COMMUNITIES = gql`
  query GetAllCommunities {
    communityRoomCreateds(
      orderBy: timestamp
      orderDirection: desc
    ) {
      communityName
      creator
      botName
      messagesId
      timestamp
    }
  }
`;

// 7. Get community messages and goals
export const GET_COMMUNITY_MESSAGES_AND_GOALS = gql`
  query GetCommunityMessagesAndGoals($communityName: String!) {
    communityRoomCreateds(
      where: { communityName: $communityName }
    ) {
      botName
      messagesId
      timestamp
    }
    goalAddeds(
      where: { goalType: $communityName }
      orderBy: timestamp
      orderDirection: desc
    ) {
      goalId
      timestamp
      totalGoalsOfType
    }
  }
`;

// 8. Get community description and members
export const GET_COMMUNITY_DETAILS = gql`
  query GetCommunityDetails($communityName: String!) {
    communityRoomCreateds(
      where: { communityName: $communityName }
    ) {
      communityName
      creator
      botName
      timestamp
    }
    communityRoomJoineds(
      where: { communityName: $communityName }
      orderBy: timestamp
      orderDirection: desc
    ) {
      userAddress
      timestamp
      totalMembers
    }
  }
`;


// get all communities joined by user
export const GET_USER_COMMUNITIES = gql`
  query GetUserCommunities($userAddress: Bytes!) {
    communityRoomJoineds(
      where: { userAddress: $userAddress }
      orderBy: timestamp
      orderDirection: desc
    ) {
      communityName
      timestamp
    }
  }
`;

// get all bots
export const GET_BOT_DETAILS = gql`
  query GetAllBots($botName: String!) {
    botCreateds(
      where: { botName: $botName }
      orderBy: timestamp
      orderDirection: desc
    ) {
      botName
      systemPrompt
      botDescription
      deploymentURL
      unlockCostInGWei
      timestamp
    }
  }
`;