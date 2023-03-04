import mongoose from "mongoose"

export const connectDb = async () => {
  try {
    await mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("DB connected")
  } catch (err) {
    console.error(err)
    console.log(process.env.LOCAL_DB)
  }
}
