import  express  from "express";
const router = express.Router();
import { body, validationResult } from 'express-validator';
import lettersModel from '../models/letter.mjs'

import * as dotenv from 'dotenv' 
dotenv.config();

router.post('/addleave',[
    body('sub','Subject length should be greater than 5 characters').isLength({min: 6}),
    body('desc','Description length should be greater than 10 characters').isLength({min: 11}),
],
async (req,res)=>{
    const {sub,desc,url,t_id}=req.body;
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        try{

            let leaveLetter={
                enrollmentNo: t_id,
                subject: sub,
                description: desc,
                // url: url,
                agreed: false,
            }
            console.log(leaveLetter);
            let createdLetter = await lettersModel.create(leaveLetter);
            res.send(createdLetter);
        }
        catch(err){
            console.log(err.message);
            res.status(500).send("Internal server error!");
        }
}
)

export default router;