import { adminAPIBasedMessagesCodes } from './admin'

export const APIcodeBasedToastMessages = APICODE => APIBasedMessagesCodes[`${APICODE}`]

export const APIBasedMessagesCodes = {
  ...adminAPIBasedMessagesCodes
}
