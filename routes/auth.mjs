import  express  from "express";
const router = express.Router();

import * as dotenv from 'dotenv' 
dotenv.config();

//logan paul
router.post('/teacher/createuser',(req,res)=>{
    console.log(req.body.name);
    res.send("Hi from logan paul");
})

export default router;