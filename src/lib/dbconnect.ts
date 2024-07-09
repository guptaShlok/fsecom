import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbconnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database already connected!");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    //print the db and connection.isconnected and go through the code everytime
    connection.isConnected = db.connections[0].readyState;
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Database connection error");
    process.exit(1);
  }
}

export default dbconnect;
