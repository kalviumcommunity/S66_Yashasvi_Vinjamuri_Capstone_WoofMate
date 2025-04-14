const DogModel=require('../models/dog.model')
const cloudinary=require('../config/cloudinary')

const getDogs=async(req, res)=>{
  try {
    const dogs=await DogModel.find();
    res.status(200).json({"message":"Dogs fetched successfully", dogs});
  } catch (error) {5
    res.status(400).json({"error":"Could not fetch dogs"})
  }
}

const getDogsbyId=async(req, res)=>{
  const {id}=req.params;
  try {
    const dog=await DogModel.findById(id);
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }
    res.status(200).json({"message":"Dog fetched successfully", dog});
  } catch (error) {
    res.status(400).json({"error":"Could not fetch dogs"})
  }
}

const postDog = async (req, res) => {
  try {
    const {
      images,
      name,
      age,
      gender,
      size,
      qualities,
      location,
      description,
      history,
      specialNeeds
    } = req.body;

    const uploadedImages = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "dog_images",
      });
      uploadedImages.push(result.secure_url);
    }

    const new_dog = new DogModel({
      images: uploadedImages,
      name,
      age,
      gender,
      size,
      qualities,
      location,
      description,
      history,
      specialNeeds,
    });

    await new_dog.save();

    res.status(201).json({ message: "Dog added successfully", dog: new_dog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports={getDogs, getDogsbyId, postDog};