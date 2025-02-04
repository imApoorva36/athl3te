import {
  ActivityAdded as ActivityAddedEvent,
  CommunityRoomCreated as CommunityRoomCreatedEvent,
  UserRegistered as UserRegisteredEvent
} from "../generated/Athl3te.sol/Athl3te.sol"
import {
  ActivityAdded,
  CommunityRoomCreated,
  UserRegistered
} from "../generated/schema"

export function handleActivityAdded(event: ActivityAddedEvent): void {
  let entity = new ActivityAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.activityDetails = event.params.activityDetails

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
  entity.roomAddress = event.params.roomAddress
  entity.createdBy = event.params.createdBy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let entity = new UserRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.name = event.params.name

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
