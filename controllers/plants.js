import Plant from "./../models/Plant.js";

const postPlant = async (req, res) => {
    const { name, category, image, price, description } = req.body;

    const newPlant = new Plant({
        name,
        category,
        image,
        price,
        description
    });

    const savedPlant = await newPlant.save();

    res.json({
        success: true,
        data: savedPlant,
        message: "Plant added successfully"
    });
};

const getPlants = async (req, res) => {
    const plants = await Plant.find();
    res.json({
        success: true,
        data: plants,
        message: "Plants fetched successfully"
    });
};

const getPlantId = async (req, res) => {
    const { id } = req.params;
    const plant = await Plant.findById(id);

    res.json({
        success: plant ? true : false,
        data: plant,
        message: plant ? "Plant fetched successfully" : "Plant not found"
    });
};

const putPlantId = async (req, res) => {
    const { id } = req.params;

    const updatedResult = await Plant.updateOne({_id:id},{
        $set:{
            name:name,
            category:category,
            image:image,
            price:price,
            description:description
        }
    })
    res.json({
        success:true,
        message:"plant updated successfully",
        data:updatedResult
    })


    const updatedPlant = await Plant.findByIdAndUpdate(id, {
        name,
        category,
        image,
        price,
        description
    }, { new: true });

    if (!updatedPlant) {
        return res.json({
            success: false,
            message: `Plant not found for id ${id}`,
            data: null
        });
    }

    res.json({
        success: true,
        message: "Plant updated successfully",
        data: updatedPlant
    });
};

const deletePlantId = async (req, res) => {
    const { id } = req.params;

    const deletedPlant = await Plant.findByIdAndDelete(id);

    if (!deletedPlant) {
        return res.json({
            success: false,
            message: `Plant not found for id ${id}`,
            data: null
        });
    }

    res.json({
        success: true,
        message: "Plant deleted successfully",
        data: null
    });
};

export {
    postPlant,
    getPlants,
    getPlantId,
    putPlantId,
    deletePlantId
};
