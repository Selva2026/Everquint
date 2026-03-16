import Booking from "../models/bookingModel.js"
import Room from "../models/roomModel.js"
import Idempotency from "../models/idempotencyModel.js"
import {validateTime} from "../utils/timeValidator.js"

export const create = async(data,key)=>{

    const {roomId,startTime,endTime,organizerEmail} = data

    const existingKey = await Idempotency.findOne({key,organizerEmail})

    if(existingKey)
    return existingKey.response

    const room = await Room.findById(roomId)

    if(!room)
    throw new Error("Room not found")

    validateTime(startTime,endTime)

    const overlap = await Booking.findOne({

        roomId,

        startTime:{$lt:endTime},

        endTime:{$gt:startTime},

        status:"confirmed"

    })

    if(overlap)
    throw new Error("OVERLAP")

    const booking = await Booking.create(data)

    await Idempotency.create({

        key,
        organizerEmail,
        response:booking

    })

    return booking

}

export const list = async(query)=>{

    const {roomId,from,to,limit=10,offset=0}=query

    let filter={}

    if(roomId) filter.roomId=roomId

    if(from && to){

        filter.startTime={$lt:new Date(to)}
        filter.endTime={$gt:new Date(from)}

    }

    const items = await Booking.find(filter)
    .skip(Number(offset))
    .limit(Number(limit))

    const total = await Booking.countDocuments(filter)

    return {items,total,limit:Number(limit),offset:Number(offset)}

}

export const cancel = async(id)=>{

    const booking = await Booking.findById(id)

    if(!booking) throw new Error("Booking not found")

    if(booking.status==="cancelled")
    return booking

    const diff = booking.startTime - new Date()

    if(diff < 3600000)
    throw new Error("Cannot cancel within 1 hour")

    booking.status="cancelled"

    await booking.save()

    return booking

}