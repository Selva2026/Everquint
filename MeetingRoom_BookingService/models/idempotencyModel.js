import mongoose from "mongoose"

const schema = new mongoose.Schema({

    key:String,

    organizerEmail:String,

    response:Object

})

schema.index({key:1, organizerEmail:1}, {unique:true})

export default mongoose.model("Idempotency",schema)