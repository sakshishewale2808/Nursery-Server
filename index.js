import express from "express";
import dotenv from "dotenv";
dotenv.config()

const app = express();
app.use(express.json());

const plants = [
    {
        id: 3,
        name: "Bamboo",
        category: "indoor",
        price: 150,
        image: "",
        description: "Very big tree"
    },
    {
        id: 6,
        name: "Tulsi",
        category: "indoor",
        price: 180,
        image: "",
        description: "Very big tree"
    },
    {
        id: 9,
        name: "Mango",
        category: "indoor",
        price: 250,
        image: "",
        description: "Very big tree"
    }
];

app.get("/plants", (req, res) => {
    res.json({
        success: true,
        data: plants,
        message: "Plants fetched successfully"
    });
});

app.get("/plant/:id", (req, res) => {
    const { id } = req.params;
    const plant = plants.find((p) => p.id == id);

    res.json({
        success: plant ? true : false,
        data: plant,
        message: plant ? "Plant fetched successfully" : "Plant not found"
    });
});

app.post("/plant", (req, res) => {
    const { name, category, image, description } = req.body;
    const randomId = Math.round(Math.random() * 10000);

    if (!name) {
        return res.json({
            success: false,
            data: null,
            message: "Name is required"
        });
    }

    const newPlant = {
        id: randomId,
        name,
        category,
        image,
        description
    };

    plants.push(newPlant);

    res.json({
        success: true,
        data: newPlant,
        message: "Plant added successfully"
    });
});

app.put("/plant/:id", (req, res) => {
    const { id } = req.params;
    const { name, category, image, price, description } = req.body;

    const plantIndex = plants.findIndex((plant) => plant.id == id);

    if (plantIndex === -1) {
        return res.json({
            success: false,
            message: `Plant not found for id ${id}`,
            data: null
        });
    }

    const updatedPlant = {
        ...plants[plantIndex],
        name,
        category,
        image,
        price,
        description
    };

    plants[plantIndex] = updatedPlant;

    return res.json({
        success: true,
        message: "Plant updated successfully",
        data: updatedPlant
    });
});

app.delete("/plant/:id",(req,res)=>{

    const {id} = req.params

    let index = -1

    plants.forEach((plant,i)=>{
        if(plant.id == id){
            index = i
        }
    })

    plants.splice(index,1)

    if(index==-1){
        return res.json({
            success:false,
            message:`plant not found with index ${id}`
        })
    }

    res.json({
        success:true,
        message:"plant deleted successfully",
        data:null
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
