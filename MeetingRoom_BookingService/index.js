import express from "express"
import ConnectDb from "./config/DB.js"
import dotenv from 'dotenv'
import roomRoutes from "./routes/roomRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"
import cors  from 'cors'

const app = express()

dotenv.config();

ConnectDb();

const PORT = process.env.PORT || 5001;
app.use(express.json())
app.use(cors());

app.use("/rooms", roomRoutes)
app.use("/bookings", bookingRoutes)
app.use("/reports", reportRoutes)

app.listen(PORT,()=>{
    console.log("Server is running", PORT)
})