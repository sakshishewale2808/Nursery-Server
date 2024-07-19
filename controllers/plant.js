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
const postPlant =  (req, res) => {
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
};

const getPlants =  (req, res) => {
    res.json({
        success: true,
        data: plants,
        message: "Plants fetched successfully"
    });
}

const getPlantId =  (req, res) => {
    const { id } = req.params;
    const plant = plants.find((p) => p.id == id);

    res.json({
        success: plant ? true : false,
        data: plant,
        message: plant ? "Plant fetched successfully" : "Plant not found"
    });
}

const putPlantId = (req, res) => {
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
}
 const deletePlantId =  (req, res) => {
    const { id } = req.params;

    const plantIndex = plants.findIndex((plant) => plant.id == id);

    if (plantIndex === -1) {
        return res.json({
            success: false,
            message: `Plant not found for id ${id}`,
            data: null
        });
    }

    plants.splice(plantIndex, 1);

    res.json({
        success: true,
        message: "Plant deleted successfully",
        data: null
    });
}
export {
    postPlant,
    getPlants,
    getPlantId,
    putPlantId,
    deletePlantId

}