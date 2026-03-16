export const validateTime = (start,end)=>{

    const s = new Date(start)
    const e = new Date(end)

    if(s>=e)
    throw new Error("startTime must be before endTime")

    const duration = (e-s)/60000

    if(duration < 15 || duration > 240)
    throw new Error("Booking must be between 15min and 4h")

    const day = s.getDay()

    if(day===0 || day===6)
    throw new Error("Bookings only Mon-Fri")

    const hour = s.getHours()

    if(hour < 8 || hour >= 20)
    throw new Error("Booking must be 08:00-20:00")

}