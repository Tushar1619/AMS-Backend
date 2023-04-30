import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
import * as dotenv from 'dotenv'
dotenv.config();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
res.send("Hello World from Tushar");

})



let dbURI = process.env.MONGO_URL
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log("mongoose is connected");
});

mongoose.connection.on('disconnected', () => {
    console.log("mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', (err) => {
    console.log(err);
    process.exit(1);
});

//   SIGINT  it means agar koi ctrl se close kr raha hai server ko to mongoose ko bhi close krdo
process.on('SIGINT', () => {
    console.log("App is terminating");
    mongoose.connection.close(() => {
        console.log("Mongoose default connection closed");
        process.exit(0);
    })
})



app.listen(5000,()=>{
    console.log("Listening on port 5000");
})