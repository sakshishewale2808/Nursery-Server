import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getHealth } from "./controllers/data.js";
import { postPlant, getPlants, getPlantId, putPlantId, deletePlantId } from "./controllers/plants.js";
import { error } from "./controllers/error.js";

dotenv.config();

const app = express();
app.use(express.json());

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
dbConnection();

app.get("/plants", getPlants);
app.get("/plant/:id", getPlantId);
app.post("/plant", postPlant);
app.put("/plant/:id", putPlantId);
app.delete("/plant/:id", deletePlantId);

app.get("/health", getHealth);
app.use("*", error);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
