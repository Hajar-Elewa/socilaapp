import mongoose from 'mongoose'

 const DBConnection = async () => {
  return await mongoose.connect(process.env.LOCAL_DATA_BASE_URI as string)//as string=> to make sure that there are a returned value
    .then(() => {
      console.log("Database connected successfully")
    })
    .catch((err) => {
      console.log("DB Error =>", err)
    })
}
export default DBConnection