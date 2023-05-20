import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/schema"
import { Transfer as TransferEvent } from "../generated/Transactions/Transactions"
import { handleTransfer } from "../src/transactions"
import { createTransferEvent } from "./transactions-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let receiver = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let message = "Example string value"
    let timestamp = BigInt.fromI32(234)
    let keyword = "Example string value"
    let newTransferEvent = createTransferEvent(
      from,
      receiver,
      amount,
      message,
      timestamp,
      keyword
    )
    handleTransfer(newTransferEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Transfer created and stored", () => {
    assert.entityCount("Transfer", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Transfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "from",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Transfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "receiver",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Transfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "Transfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "message",
      "Example string value"
    )
    assert.fieldEquals(
      "Transfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )
    assert.fieldEquals(
      "Transfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "keyword",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
