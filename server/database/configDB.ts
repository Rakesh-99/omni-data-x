import mongoose from "mongoose";


const connectDB = async (db_url: string) => {
    try {
        const connect = await mongoose.connect(db_url);
        if (connect) {
            console.log("MongoDB connected");
        }
    } catch (error: any) {
        console.log(`Could not connect to Database!. Error -> `, error);
    }
};

export default connectDB;