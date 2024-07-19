import express from "express";
import dotenv from "dotenv";
import { getHealth } from "./controllers/data.js";

dotenv.config();

import { postPlant,
    getPlants ,
    getPlantId,
    putPlantId,
    deletePlantId
} from "./controllers/plant.js";
import {error} from "./controllers/error.js";

const app = express();
app.use(express.json());

app.get("/plants",getPlants);
app.get("/plant/:id",getPlantId);
app.post("/plant",postPlant);
app.put("/plant/:id", putPlantId);
app.delete("/plant/:id",deletePlantId);

app.get("/health", getHealth);

app.use("*", error);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
