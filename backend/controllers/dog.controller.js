const {DogModel}=require('../models/dog.model')

const getDogs=async(req, res)=>{
  try {
    const dogs=await DogModel.find();
    res.status(200).json({"message":"Dogs fetched successfully", dogs});
  } catch (error) {
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

module.exports={getDogs, getDogsbyId};