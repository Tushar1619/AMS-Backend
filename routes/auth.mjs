import express from "express";
const router = express.Router();
import { body, validationResult } from 'express-validator';

import bcrypt from "bcryptjs";

import * as dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken'

const jwt_key = 'jwtsecret';

//logan paul
router.post('/teacher/createuser',[
    body('email').isEmail().withMessage('Not a valid email'),
    body('name').isLength({min:3}).withMessage('Name should be atleast 3 characters'),
    body('password').isLength({min:8}).withMessage('Password length is less than 8')
], (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);

    //check if the user exists in the db


    //add the user if not present already

    var token = jwt.sign({uid:req.body.email}, jwt_key);
    res.json({token});
})


//banajeer bhutto
router.post('/teacher/login',[
    body('email').isEmail().withMessage('Not a valid email')
],(req,res)=>{

    //if user exists or not


    //password match
})

export default router;