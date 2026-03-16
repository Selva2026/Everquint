import * as roomService from "../services/roomService.js"

export const createRoom = async(req,res)=>{

 try{

 const {name,capacity,floor,amenities} = req.body

 if(!name)
 return res.status(400).json({
  error:"ValidationError",
  message:"name is required"
 })

 if(capacity < 1)
 return res.status(400).json({
  error:"ValidationError",
  message:"capacity must be positive"
 })

 const room = await roomService.create({
  name,
  capacity,
  floor,
  amenities
 })

 res.status(201).json(room)

 }catch(e){

 res.status(400).json({
  error:"ValidationError",
  message:e.message
 })

 }

}

export const listRooms = async(req,res)=>{

 const {minCapacity,amenity} = req.query

 const rooms = await roomService.list({
  minCapacity,
  amenity
 })

 res.json(rooms)

}