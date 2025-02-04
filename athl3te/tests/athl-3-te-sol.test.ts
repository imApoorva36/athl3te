import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ActivityAdded } from "../generated/schema"
import { ActivityAdded as ActivityAddedEvent } from "../generated/Athl3te.sol/Athl3te.sol"
import { handleActivityAdded } from "../src/athl-3-te-sol"
import { createActivityAddedEvent } from "./athl-3-te-sol-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let activityDetails = "Example string value"
    let newActivityAddedEvent = createActivityAddedEvent(user, activityDetails)
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
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ActivityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "activityDetails",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
