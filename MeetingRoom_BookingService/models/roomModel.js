import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },

    capacity:{
        type:Number,
        required:true,
        min:1
    },

    floor:Number,

    amenities:[String]

})

export default mongoose.model("Room",roomSchema)