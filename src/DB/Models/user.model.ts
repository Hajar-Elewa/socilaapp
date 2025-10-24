import { model, models, Schema } from 'mongoose'
import {IUser} from '../../Modules/userModule/user.types'

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
  type: Number,
  required: true
},
 phone: {
  type: String,
  required: true
},
 profileImage: String,

 coverImages: [String],
 
 folderId:String,

  isVerified: {
  type: Boolean,
  default: false
},
changedCredentialsAt:Date,

emailOtp: {
  otp: String,
  expiredAt: Date
}
},
{
  timestamps: true
})

export const UserModel = models.users || model<IUser>('users',userSchema) //if i foud this model, use it,if not , create it fromscratch