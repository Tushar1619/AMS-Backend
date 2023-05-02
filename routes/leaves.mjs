import express from "express";
const router = express.Router();
import { body, validationResult } from 'express-validator';
import lettersModel from '../models/letter.mjs'
import teacherModel from '../models/teachers.mjs'

import * as dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken'
const jwt_key = 'jwtsecret';

router.post('/addleave', [
    body('sub', 'Subject length should be greater than 5 characters').isLength({ min: 6 }),
    body('desc', 'Description length should be greater than 10 characters').isLength({ min: 11 }),
],
    async (req, res) => {
        const { sub, desc, url, t_id } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        try {

            const token = req.header('auth-token')
            console.log(token);
            if (!token) {
                return res.status(401).send("Please authenticate with valid auth-token")
            }

            const data = jwt.verify(token, jwt_key);
            // console.log(data);
            let department = await teacherModel.findOne({_id:data.user.id});
            department = department.department;
            console.log(department);
            let leaveLetter = {
                user: data.user.id,
                enrollmentNo: t_id,
                subject: sub,
                description: desc,
                // url: url,
                agreed: false,
                department
            }
            // console.log(leaveLetter);

            let createdLetter = await lettersModel.create(leaveLetter);
            res.json({createdLetter});
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send("Internal server error!");
        }
    }
)


router.get('/checkleaves', async (req, res) => {
    const token = req.header('auth-token')
    const data = jwt.verify(token, jwt_key);
    const personId = data.user.id;

    try {
        const person = await teacherModel.findOne({ _id: personId });
        if (person.designation !== 'hod') {
            res.json({ message: "You dont have access to this information" });

        }
    }
    catch (e) {
        res.json({ messgae: "Internal sever error!" });
    }

    try {

        const activeLeaves = await lettersModel.find({ agreed: false,department:["ece"]});
        res.json(activeLeaves);
    }
    catch (e) {
        res.json({ messgae: "Internal sever error!" });
    }

})

export default router;