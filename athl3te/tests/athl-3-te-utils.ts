import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ActivityAdded,
  Approval,
  ApprovalForAll,
  BotCreated,
  BotPurchased,
  CommunityRoomCreated,
  CommunityRoomJoined,
  GoalAdded,
  InjuryUpdated,
  NFTMinted,
  Transfer,
  UserRegistered
} from "../generated/Athl3te/Athl3te"

export function createActivityAddedEvent(
  userAddress: Address,
  activityId: string,
  timestamp: BigInt,
  totalActivities: BigInt
): ActivityAdded {
  let activityAddedEvent = changetype<ActivityAdded>(newMockEvent())

  activityAddedEvent.parameters = new Array()

  activityAddedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  activityAddedEvent.parameters.push(
    new ethereum.EventParam("activityId", ethereum.Value.fromString(activityId))
  )
  activityAddedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  activityAddedEvent.parameters.push(
    new ethereum.EventParam(
      "totalActivities",
      ethereum.Value.fromUnsignedBigInt(totalActivities)
    )
  )

  return activityAddedEvent
}

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBotCreatedEvent(
  botName: string,
  deploymentURL: string,
  unlockCostInGWei: i32,
  botDescription: string,
  timestamp: BigInt,
  totalBots: BigInt
): BotCreated {
  let botCreatedEvent = changetype<BotCreated>(newMockEvent())

  botCreatedEvent.parameters = new Array()

  botCreatedEvent.parameters.push(
    new ethereum.EventParam("botName", ethereum.Value.fromString(botName))
  )
  botCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deploymentURL",
      ethereum.Value.fromString(deploymentURL)
    )
  )
  botCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "unlockCostInGWei",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(unlockCostInGWei))
    )
  )
  botCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "botDescription",
      ethereum.Value.fromString(botDescription)
    )
  )
  botCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  botCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalBots",
      ethereum.Value.fromUnsignedBigInt(totalBots)
    )
  )

  return botCreatedEvent
}

export function createBotPurchasedEvent(
  userAddress: Address,
  botName: string,
  messagesId: i32,
  costPaid: BigInt,
  timestamp: BigInt,
  totalBotsPurchased: BigInt
): BotPurchased {
  let botPurchasedEvent = changetype<BotPurchased>(newMockEvent())

  botPurchasedEvent.parameters = new Array()

  botPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  botPurchasedEvent.parameters.push(
    new ethereum.EventParam("botName", ethereum.Value.fromString(botName))
  )
  botPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "messagesId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(messagesId))
    )
  )
  botPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "costPaid",
      ethereum.Value.fromUnsignedBigInt(costPaid)
    )
  )
  botPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  botPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "totalBotsPurchased",
      ethereum.Value.fromUnsignedBigInt(totalBotsPurchased)
    )
  )

  return botPurchasedEvent
}

export function createCommunityRoomCreatedEvent(
  communityName: string,
  creator: Address,
  botName: string,
  messagesId: i32,
  timestamp: BigInt,
  totalCommunities: BigInt
): CommunityRoomCreated {
  let communityRoomCreatedEvent =
    changetype<CommunityRoomCreated>(newMockEvent())

  communityRoomCreatedEvent.parameters = new Array()

  communityRoomCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "communityName",
      ethereum.Value.fromString(communityName)
    )
  )
  communityRoomCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  communityRoomCreatedEvent.parameters.push(
    new ethereum.EventParam("botName", ethereum.Value.fromString(botName))
  )
  communityRoomCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "messagesId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(messagesId))
    )
  )
  communityRoomCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  communityRoomCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalCommunities",
      ethereum.Value.fromUnsignedBigInt(totalCommunities)
    )
  )

  return communityRoomCreatedEvent
}

export function createCommunityRoomJoinedEvent(
  userAddress: Address,
  communityName: string,
  timestamp: BigInt,
  totalMembers: BigInt
): CommunityRoomJoined {
  let communityRoomJoinedEvent = changetype<CommunityRoomJoined>(newMockEvent())

  communityRoomJoinedEvent.parameters = new Array()

  communityRoomJoinedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  communityRoomJoinedEvent.parameters.push(
    new ethereum.EventParam(
      "communityName",
      ethereum.Value.fromString(communityName)
    )
  )
  communityRoomJoinedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  communityRoomJoinedEvent.parameters.push(
    new ethereum.EventParam(
      "totalMembers",
      ethereum.Value.fromUnsignedBigInt(totalMembers)
    )
  )

  return communityRoomJoinedEvent
}

export function createGoalAddedEvent(
  userAddress: Address,
  goalId: string,
  goalType: string,
  timestamp: BigInt,
  totalGoalsOfType: BigInt
): GoalAdded {
  let goalAddedEvent = changetype<GoalAdded>(newMockEvent())

  goalAddedEvent.parameters = new Array()

  goalAddedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  goalAddedEvent.parameters.push(
    new ethereum.EventParam("goalId", ethereum.Value.fromString(goalId))
  )
  goalAddedEvent.parameters.push(
    new ethereum.EventParam("goalType", ethereum.Value.fromString(goalType))
  )
  goalAddedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  goalAddedEvent.parameters.push(
    new ethereum.EventParam(
      "totalGoalsOfType",
      ethereum.Value.fromUnsignedBigInt(totalGoalsOfType)
    )
  )

  return goalAddedEvent
}

export function createInjuryUpdatedEvent(
  userAddress: Address,
  oldInjuryId: string,
  newInjuryId: string,
  timestamp: BigInt
): InjuryUpdated {
  let injuryUpdatedEvent = changetype<InjuryUpdated>(newMockEvent())

  injuryUpdatedEvent.parameters = new Array()

  injuryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  injuryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldInjuryId",
      ethereum.Value.fromString(oldInjuryId)
    )
  )
  injuryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newInjuryId",
      ethereum.Value.fromString(newInjuryId)
    )
  )
  injuryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return injuryUpdatedEvent
}

export function createNFTMintedEvent(
  owner: Address,
  tokenId: BigInt,
  uri: string,
  timestamp: BigInt,
  totalNFTsForUser: BigInt
): NFTMinted {
  let nftMintedEvent = changetype<NFTMinted>(newMockEvent())

  nftMintedEvent.parameters = new Array()

  nftMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  nftMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftMintedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )
  nftMintedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  nftMintedEvent.parameters.push(
    new ethereum.EventParam(
      "totalNFTsForUser",
      ethereum.Value.fromUnsignedBigInt(totalNFTsForUser)
    )
  )

  return nftMintedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createUserRegisteredEvent(
  userAddress: Address,
  metadata: string,
  timestamp: BigInt
): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("metadata", ethereum.Value.fromString(metadata))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return userRegisteredEvent
}
