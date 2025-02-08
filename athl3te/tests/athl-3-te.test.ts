import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ActivityAdded } from "../generated/schema"
import { ActivityAdded as ActivityAddedEvent } from "../generated/Athl3te/Athl3te"
import { handleActivityAdded } from "../src/athl-3-te"
import { createActivityAddedEvent } from "./athl-3-te-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let userAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let activityId = "Example string value"
    let timestamp = BigInt.fromI32(234)
    let totalActivities = BigInt.fromI32(234)
    let newActivityAddedEvent = createActivityAddedEvent(
      userAddress,
      activityId,
      timestamp,
      totalActivities
    )
    handleActivityAdded(newActivityAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ActivityAdded created and stored", () => {
    assert.entityCount("ActivityAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ActivityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "userAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ActivityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "activityId",
      "Example string value"
    )
    assert.fieldEquals(
      "ActivityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )
    assert.fieldEquals(
      "ActivityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalActivities",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
