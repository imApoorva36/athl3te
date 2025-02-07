import {
  ActivityAdded as ActivityAddedEvent,
  BotCreated as BotCreatedEvent,
  BotPurchased as BotPurchasedEvent,
  CommunityRoomCreated as CommunityRoomCreatedEvent,
  CommunityRoomJoined as CommunityRoomJoinedEvent,
  InjuryUpdated as InjuryUpdatedEvent,
  NutritionGoalAdded as NutritionGoalAddedEvent,
  SportGoalAdded as SportGoalAddedEvent,
  UserRegistered as UserRegisteredEvent
} from "../generated/Athl3te/Athl3te"
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
} from "../generated/schema"

export function handleActivityAdded(event: ActivityAddedEvent): void {
  let entity = new ActivityAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.activityId = event.params.activityId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBotCreated(event: BotCreatedEvent): void {
  let entity = new BotCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.botName = event.params.botName.toString()
  entity.deploymentURL = event.params.deploymentURL
  entity.unlockCostInGWei = event.params.unlockCostInGWei

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBotPurchased(event: BotPurchasedEvent): void {
  let entity = new BotPurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.botName = event.params.botName
  entity.messagesId = event.params.messagesId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCommunityRoomCreated(
  event: CommunityRoomCreatedEvent
): void {
  let entity = new CommunityRoomCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.communityName = event.params.communityName.toString()
  entity.creator = event.params.creator
  entity.botName = event.params.botName
  entity.messagesId = event.params.messagesId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCommunityRoomJoined(
  event: CommunityRoomJoinedEvent
): void {
  let entity = new CommunityRoomJoined(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.communityName = event.params.communityName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInjuryUpdated(event: InjuryUpdatedEvent): void {
  let entity = new InjuryUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.injuryId = event.params.injuryId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNutritionGoalAdded(event: NutritionGoalAddedEvent): void {
  let entity = new NutritionGoalAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.goalId = event.params.goalId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSportGoalAdded(event: SportGoalAddedEvent): void {
  let entity = new SportGoalAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.goalId = event.params.goalId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let entity = new UserRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.metadata = event.params.metadata

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
