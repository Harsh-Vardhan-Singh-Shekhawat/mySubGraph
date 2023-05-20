import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/Transactions/Transactions"

export function createTransferEvent(
  from: Address,
  receiver: Address,
  amount: BigInt,
  message: string,
  timestamp: BigInt,
  keyword: string
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("keyword", ethereum.Value.fromString(keyword))
  )

  return transferEvent
}
