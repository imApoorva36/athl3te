import {
  ActivityAdded as ActivityAddedEvent,
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BotCreated as BotCreatedEvent,
  BotPurchased as BotPurchasedEvent,
  CommunityRoomCreated as CommunityRoomCreatedEvent,
  CommunityRoomJoined as CommunityRoomJoinedEvent,
  GoalAdded as GoalAddedEvent,
  InjuryUpdated as InjuryUpdatedEvent,
  NFTMinted as NFTMintedEvent,
  Transfer as TransferEvent,
  UserRegistered as UserRegisteredEvent
} from "../generated/Athl3te/Athl3te"
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
} from "../generated/schema"

export function handleActivityAdded(event: ActivityAddedEvent): void {
  let entity = new ActivityAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.activityId = event.params.activityId
  entity.timestamp = event.params.timestamp
  entity.totalActivities = event.params.totalActivities

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBotCreated(event: BotCreatedEvent): void {
  let entity = new BotCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.botName = event.params.botName
  entity.deploymentURL = event.params.deploymentURL
  entity.unlockCostInGWei = event.params.unlockCostInGWei
  entity.botDescription = event.params.botDescription
  entity.timestamp = event.params.timestamp
  entity.totalBots = event.params.totalBots

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
  entity.costPaid = event.params.costPaid
  entity.timestamp = event.params.timestamp
  entity.totalBotsPurchased = event.params.totalBotsPurchased

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
  entity.communityName = event.params.communityName
  entity.creator = event.params.creator
  entity.botName = event.params.botName
  entity.messagesId = event.params.messagesId
  entity.timestamp = event.params.timestamp
  entity.totalCommunities = event.params.totalCommunities

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
  entity.timestamp = event.params.timestamp
  entity.totalMembers = event.params.totalMembers

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGoalAdded(event: GoalAddedEvent): void {
  let entity = new GoalAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.goalId = event.params.goalId
  entity.goalType = event.params.goalType
  entity.timestamp = event.params.timestamp
  entity.totalGoalsOfType = event.params.totalGoalsOfType

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
  entity.oldInjuryId = event.params.oldInjuryId
  entity.newInjuryId = event.params.newInjuryId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNFTMinted(event: NFTMintedEvent): void {
  let entity = new NFTMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.tokenId = event.params.tokenId
  entity.uri = event.params.uri
  entity.timestamp = event.params.timestamp
  entity.totalNFTsForUser = event.params.totalNFTsForUser

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

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
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
