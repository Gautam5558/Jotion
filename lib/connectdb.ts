import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return console.log("Already connected to mongodb");
  }

  if (!process.env.NEXT_MONGO_URL) {
    return console.log("MongoDb Cluster Url doesn't exist");
  }

  try {
    await mongoose.connect(process.env.NEXT_MONGO_URL);
    console.log("connected to mongoDb");
    isConnected = true;
  } catch (err) {
    console.log(err);
  }
};
