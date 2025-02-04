import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ActivityAdded,
  CommunityRoomCreated,
  UserRegistered
} from "../generated/Athl3te.sol/Athl3te.sol"

export function createActivityAddedEvent(
  user: Address,
  activityDetails: string
): ActivityAdded {
  let activityAddedEvent = changetype<ActivityAdded>(newMockEvent())

  activityAddedEvent.parameters = new Array()

  activityAddedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  activityAddedEvent.parameters.push(
    new ethereum.EventParam(
      "activityDetails",
      ethereum.Value.fromString(activityDetails)
    )
  )

  return activityAddedEvent
}

export function createCommunityRoomCreatedEvent(
  roomAddress: Address,
  createdBy: Address
): CommunityRoomCreated {
  let communityRoomCreatedEvent =
    changetype<CommunityRoomCreated>(newMockEvent())

  communityRoomCreatedEvent.parameters = new Array()

  communityRoomCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "roomAddress",
      ethereum.Value.fromAddress(roomAddress)
    )
  )
  communityRoomCreatedEvent.parameters.push(
    new ethereum.EventParam("createdBy", ethereum.Value.fromAddress(createdBy))
  )

  return communityRoomCreatedEvent
}

export function createUserRegisteredEvent(
  user: Address,
  name: string
): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )

  return userRegisteredEvent
}
