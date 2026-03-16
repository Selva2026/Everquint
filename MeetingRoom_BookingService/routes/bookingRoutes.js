import express from "express"
import {createBooking,listBookings,cancelBooking} from "../controllers/bookingController.js"

const router = express.Router()

router.post("/",createBooking)
router.get("/",listBookings)
router.post("/:id/cancel",cancelBooking)

export default router