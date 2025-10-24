import bcrypt from 'bcrypt'

export const hash = async (plainText: string): Promise<string> => bcrypt.hash(plainText, Number(process.env.BCRYPT_SALT_ROUNDS))

export const compare = async (plainText: string, hash: string): Promise<boolean> => bcrypt.compare(plainText, hash)