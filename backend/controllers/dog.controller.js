const DogModel=require('../models/dog.model')
const cloudinary=require('../config/cloudinary')

const getDogs=async(req, res)=>{
  try {
    const dogs=await DogModel.find()
    res.status(200).json({"message":"Dogs fetched successfully", dogs})
  } catch (error) {
    res.status(400).json({"error":"Could not fetch dogs"})
  }
}

const getDogsbyId=async(req, res)=>{
  const {id}=req.params
  try {
    const dog=await DogModel.findById(id)
    if (!dog) {
      return res.status(404).json({ error: "Dog not found" })
    }
    res.status(200).json({"message":"Dog fetched successfully", dog})
  } catch (error) {
    res.status(400).json({"error":"Could not fetch dogs"})
  }
}

const postDog = async (req, res) => {
  try {
    const {images,name,breed,age,gender,size,qualities,location,description,history,specialNeeds,userId} = req.body;
    const uploadedImages = []
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "dog_images",
      });
      uploadedImages.push(result.secure_url)
    }
    const new_dog = new DogModel({images: uploadedImages,name,breed,age,gender,size,qualities,location,description,history,specialNeeds,user:userId})
    await new_dog.save()
    res.status(201).json({ message: "Dog added successfully", dog: new_dog })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateDog = async (req, res) => {
  const { id } = req.params
  const {images, name, breed, age, gender, size, qualities, location, description, history, specialNeeds} = req.body
  try {
    let uploadedImages = []
    if (images && images.length > 0) {
      for (let image of images) {
        const result = await cloudinary.uploader.upload(image, {
          folder: "dog_images"
        });
        uploadedImages.push(result.secure_url)
      }
    }
    const updatedDog = await DogModel.findByIdAndUpdate(id, {...(images && { images: uploadedImages }) ,name, breed, age, gender, size, qualities, location, description, history, specialNeeds},{ new: true })
    if (!updatedDog) {
      return res.status(404).json({ error: "Dog not found" })
    }
    res.status(200).json({ message: "Dog updated successfully", dog: updatedDog })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports={getDogs, getDogsbyId, postDog, updateDog}