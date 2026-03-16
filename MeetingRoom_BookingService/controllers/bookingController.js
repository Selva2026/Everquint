import * as bookingService from "../services/bookingService.js"

export const createBooking = async(req,res)=>{

 try{

 const key = req.headers["idempotency-key"]

 const {
  roomId,
  title,
  organizerEmail,
  startTime,
  endTime
 } = req.body

 if(!roomId || !organizerEmail)
 return res.status(400).json({
  error:"ValidationError",
  message:"Missing required fields"
 })

 const booking = await bookingService.create({
  roomId,
  title,
  organizerEmail,
  startTime,
  endTime
 },key)

 res.status(201).json(booking)

 }catch(e){

 if(e.message==="OVERLAP")
 res.status(409).json({
  error:"Conflict",
  message:"Booking overlap"
 })
 else
 res.status(400).json({
  error:"ValidationError",
  message:e.message
 })

 }

}

export const listBookings = async (req, res) => {

    const { roomId, from, to, limit = 10, offset = 0 } = req.query;
  
    const data = await bookingService.list({
      roomId,
      from,
      to,
      limit: Number(limit),
      offset: Number(offset)
    });
  
    res.json(data);
  
  }

export const cancelBooking = async(req,res)=>{

 try{

 const {id} = req.params

 const booking = await bookingService.cancel(id)

 res.json(booking)

 }catch(e){

 res.status(400).json({
  error:"ValidationError",
  message:e.message
 })

 }

}