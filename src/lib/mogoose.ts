import mongoose from "mongoose";

const connectionToDB = async () => {
    try {
        if (!process.env.MongoURL) {
            throw new Error("MongoURL is not defined in environment variables");
        }
        await mongoose.connect(process.env.MongoURL);
        console.log('Connected')
    } catch (error) {
        console.log(error)
    }
}

export default connectionToDB;