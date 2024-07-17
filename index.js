import express from "express";

const app = express();
app.use(express.json());

const plants = [
    {
        "name":"Bamboo",
        "category": "indoor",
        "price":150,
        "image":"",
        "description":"Very big tree"
    }
];
app.get("/plants",(req,res)=>{
    res.json("plants are adding");
})

app.post("/plant", (req, res) => {
    const { name, category, image, description } = req.body;

    const randomId = Math.round(Math.random() * 10000);

    const newPlant = {
        id: randomId,
        name: name,
        category: category,
        image: image,
        description: description
    };

    if(!name){
       return res.json({
            success:true,
            data:null,
            message:"name is required"
        })
    }

    plants.push(newPlant);

    res.json({
        success: true,
        data: newPlant,
        message: "Plant added successfully"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
