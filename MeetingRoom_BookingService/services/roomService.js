import Room from "../models/roomModel.js"

export const create = async(data)=>{

    data.name = data.name.toLowerCase()

    if(data.capacity < 1)
    throw new Error("capacity must be positive")

    return await Room.create(data)

}

export const list = async(query)=>{

    let filter={}

    if(query.minCapacity)
        filter.capacity = {$gte:query.minCapacity}

    if(query.amenity)
        filter.amenities = query.amenity

    return await Room.find(filter)

}