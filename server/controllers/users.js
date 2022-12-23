import mongoose from 'mongoose';
import users from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try{
        const allUsers = await users.find(); //In allUsers we store the entire Users records from User database
        const allUserDetails = []
        allUsers.forEach(user => {
            allUserDetails.push({ _id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn })
        })
      res.status(200).json(allUserDetails);
    }catch(error){
        res.status(404).json({ message: error.message});
    }
}

export const updateProfile = async (req,res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
    //checking the id is valid or not(i.e.,checking is there any user with that id in users database)
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('User is unavailable');
    }

    try{
        const updatedProfile = await users.findByIdAndUpdate( _id, { $set: { 'name':name,'about':about, 'tags': tags}}, { new: true}) // by writing {new: true} it will return updated record
        res.status(200).json(updateProfile)
    } catch(error){
        res.status(405).json({ message: error.message });
    }

}