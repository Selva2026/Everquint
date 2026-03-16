import express from "express"
import {roomUtilization} from "../controllers/reportController.js"

const router = express.Router()

router.get("/room-utilization",roomUtilization)

export default router