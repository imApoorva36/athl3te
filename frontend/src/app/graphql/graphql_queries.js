import { gql } from 'graphql-request';

// 1. Get user activities
export const GET_USER_ACTIVITIES = gql`
  query GetUserActivities($userAddress: Bytes!) {
    activityAddeds(
      where: { userAddress: $userAddress }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      activityId
      timestamp
      totalActivities
      blockNumber
      blockTimestamp
    }
  }
`;

// 2. Get user goals, community goals, and injury info
// CHECK
export const GET_USER_GOALS_AND_INJURIES = gql`
  query GetUserGoalsAndInjuries($userAddress: Bytes!) {
    goalAddeds(
      where: { userAddress: $userAddress }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      goalId
      goalType
      timestamp
      totalGoalsOfType
    }
    # Check
    communityRoomJoineds(
      where: { userAddress: $userAddress }
    ) {
      communityName
      timestamp
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
    communityGoalAdded(
      where: { communityName: $communityName }
      orderBy: timestamp
      orderDirection: desc
    ) {
      goalId
      timestamp
      # totalCommunityGoals
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

//CHECK
// 5. Get user NFTs and metadata
export const GET_USER_PROFILE = gql`
  query GetUserProfile($userAddress: Bytes!) {
    # Check
    nftMinteds(
      where: { owner: $userAddress }
    ) {
      tokenId
      uri
      timestamp
      totalNFTsForUser
    }
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
      id
      communityName
      creator
      botName
      messagesId
      timestamp
      totalCommunities
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
      totalCommunities
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
export const GET_ALL_BOTS = gql`
  query GetAllBots {
    botCreateds(
      orderBy: timestamp
      orderDirection: desc
    ) {
      botName
      systemPrompt
      botDescription
      deploymentURL
      unlockCostInGWei
      timestamp
      totalBots
    }
  }
`;