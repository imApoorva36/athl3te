// queries.js
import { gql } from 'graphql-request';

export const GET_ALL_DATA = gql`
  query GetAllData {
    activityAddeds(first: 1000) {
      id
      userAddress
      activityId
      blockNumber
      blockTimestamp
      transactionHash
    }
    botCreateds(first: 1000) {
      id
      botName
      deploymentURL
      unlockCostInGWei
      blockNumber
      blockTimestamp
      transactionHash
    }
    botPurchaseds(first: 1000) {
      id
      userAddress
      botName
      messagesId
      blockNumber
      blockTimestamp
      transactionHash
    }
    communityRoomCreateds(first: 1000) {
      id
      communityName
      creator
      botName
      messagesId
      blockNumber
      blockTimestamp
      transactionHash
    }
    communityRoomJoineds(first: 1000) {
      id
      userAddress
      communityName
      blockNumber
      blockTimestamp
      transactionHash
    }
    injuryUpdateds(first: 1000) {
      id
      userAddress
      injuryId
      blockNumber
      blockTimestamp
      transactionHash
    }
    nutritionGoalAddeds(first: 1000) {
      id
      userAddress
      goalId
      blockNumber
      blockTimestamp
      transactionHash
    }
    userRegistereds(first: 1000) {
      id
      userAddress
      metadata
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const GET_USER_ACTIVITIES_QUERY = gql`
   query getUserActivities {
    activityAddeds(first: 1000) {
      userAddress
      activityId
    }
   }
`;

export const GET_ALL_COMMUNITY_ROOMS = gql`
    query communityRoomsCreated {
      communityRoomCreateds(messagesId: 2) {
      id
      communityName
      creator
      botName
      messagesId
    }
  }
`;

//get all bots
export const GET_ALL_BOTS = gql`
    botCreateds(first: 1000) {
      botName
      deploymentURL
      unlockCostInGWei
    }
    `;



export const GET_USER_GOALS_QUERY = gql`
   query GetUserActivities {
    nutritionGoalAddeds(first: 1000) {
      userAddress
      goalId
    }
   }
`;


// export const GET_USER_ACTIVITIES_QUERY = gql`
//    query GetUserActivities {
//     activityAddeds(first: 1000) {
//       userAddress
//       activityId
//     }
//    }
// `;