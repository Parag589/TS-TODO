import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


// Define a request logging middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(todoRoutes);

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

const uri: string =
    "mongodb+srv://shyam2020100:123456780@cluster0.zhnlwok.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async (DB_URL: string) => {
    const DB_OPTIONS: mongoose.ConnectOptions = {
        dbName: "Todo",
    }

    try {
        await mongoose.connect(DB_URL, DB_OPTIONS);
        console.log('Connected to mongo');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDb(uri);
