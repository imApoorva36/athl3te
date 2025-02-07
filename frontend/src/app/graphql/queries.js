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
    sportGoalAddeds(first: 1000) {
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
    approvals(first: 1000) {
      id
      owner
      approved
      tokenId
      blockNumber
      blockTimestamp
      transactionHash
    }
    approvalForAlls(first: 1000) {
      id
      owner
      operator
      approved
      blockNumber
      blockTimestamp
      transactionHash
    }
    minteds(first: 1000) {
      id
      owner
      tokenId
      tokenURI
      blockNumber
      blockTimestamp
      transactionHash
    }
    tokenURIUpdateds(first: 1000) {
      id
      tokenId
      newTokenURI
      blockNumber
      blockTimestamp
      transactionHash
    }
    transfers(first: 1000) {
      id
      from
      to
      tokenId
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;