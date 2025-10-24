import { customAlphabet } from "nanoid"

export const createOTP = () => {
  const otp = customAlphabet('0123456789', 6)//Generate secure unique ID with custom alphabet.
  return otp
}