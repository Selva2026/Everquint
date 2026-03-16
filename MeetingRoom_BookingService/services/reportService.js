import Booking from "../models/bookingModel.js"
import Room from "../models/roomModel.js"

export const utilization = async({from,to})=>{

    const rooms = await Room.find()

    const bookings = await Booking.find({
        startTime:{$lt:new Date(to)},
        endTime:{$gt:new Date(from)},
        status:"confirmed"
    })

    const businessHours = 12

    let result=[]

    for(const room of rooms){

        let total=0

        bookings
        .filter(b=>b.roomId.toString()===room._id.toString())
        .forEach(b=>{

            const start = Math.max(new Date(b.startTime),new Date(from))
            const end = Math.min(new Date(b.endTime),new Date(to))

            total += (end-start)/3600000

        })

        result.push({

            roomId:room._id,

            roomName:room.name,

            totalBookingHours:total,

            utilizationPercent:total/businessHours

        })

    }

    return result

}