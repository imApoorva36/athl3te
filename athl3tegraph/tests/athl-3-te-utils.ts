import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ActivityAdded,
  BotCreated,
  BotPurchased,
  CommunityRoomCreated,
  CommunityRoomJoined,
  InjuryUpdated,
  NutritionGoalAdded,
  SportGoalAdded,
  UserRegistered
} from "../generated/Athl3te/Athl3te"

export function createActivityAddedEvent(
  userAddress: Address,
  activityId: string
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

  return activityAddedEvent
}

export function createBotCreatedEvent(
  botName: string,
  deploymentURL: string,
  unlockCostInGWei: i32
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

  return botCreatedEvent
}

export function createBotPurchasedEvent(
  userAddress: Address,
  botName: string,
  messagesId: i32
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

  return botPurchasedEvent
}

export function createCommunityRoomCreatedEvent(
  communityName: string,
  creator: Address,
  botName: string,
  messagesId: i32
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

  return communityRoomCreatedEvent
}

export function createCommunityRoomJoinedEvent(
  userAddress: Address,
  communityName: string
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

  return communityRoomJoinedEvent
}

export function createInjuryUpdatedEvent(
  userAddress: Address,
  injuryId: string
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
    new ethereum.EventParam("injuryId", ethereum.Value.fromString(injuryId))
  )

  return injuryUpdatedEvent
}

export function createNutritionGoalAddedEvent(
  userAddress: Address,
  goalId: string
): NutritionGoalAdded {
  let nutritionGoalAddedEvent = changetype<NutritionGoalAdded>(newMockEvent())

  nutritionGoalAddedEvent.parameters = new Array()

  nutritionGoalAddedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  nutritionGoalAddedEvent.parameters.push(
    new ethereum.EventParam("goalId", ethereum.Value.fromString(goalId))
  )

  return nutritionGoalAddedEvent
}

export function createSportGoalAddedEvent(
  userAddress: Address,
  goalId: string
): SportGoalAdded {
  let sportGoalAddedEvent = changetype<SportGoalAdded>(newMockEvent())

  sportGoalAddedEvent.parameters = new Array()

  sportGoalAddedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  sportGoalAddedEvent.parameters.push(
    new ethereum.EventParam("goalId", ethereum.Value.fromString(goalId))
  )

  return sportGoalAddedEvent
}

export function createUserRegisteredEvent(
  userAddress: Address,
  metadata: string
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

  return userRegisteredEvent
}
