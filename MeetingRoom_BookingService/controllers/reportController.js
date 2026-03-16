import * as reportService from "../services/reportService.js"

export const roomUtilization = async(req,res)=>{

 const {from,to} = req.query

 if(!from || !to)
 return res.status(400).json({
  error:"ValidationError",
  message:"from and to required"
 })

 const report = await reportService.utilization({from,to})

 res.json(report)

}