import mongoose from 'mongoose';


//This function is used to be able to connect to our database by using the connection string that we have
export const connectDB = async() => {        
        //Use mongoose package to connect to our database
        try {
                const conn = await mongoose.connect(process.env.MONGO_URI);
                console.log(conn);
                console.log(`MongoDB connected: ${conn.connection.host}`)
                
        } catch (error) {
                console.log(`Error: ${error.message}`);
                process.exit(1);
        }

}
