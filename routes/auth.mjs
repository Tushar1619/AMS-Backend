import express from "express";
const router = express.Router();
import { body, validationResult } from 'express-validator';

import bcrypt from "bcryptjs";

import * as dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken'

import teacherModel from '../models/teachers.mjs'
import studentModel from '../models/students.mjs'

const jwt_key = 'jwtsecret';

//logan paul
router.post('/teacher/createuser', [
    body('email').isEmail().withMessage('Not a valid email'),
    body('firstName').isLength({ min: 3 }).withMessage('Name should be atleast 3 characters'),
    body('password').isLength({ min: 8 }).withMessage('Password length is less than 8')
], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);


    let {
        firstName,
        lastName,
        t_id,
        mobNo,
        email,
        department
    } = req.body;

    let newUser = {
        firstName,
        lastName,
        t_id,
        mobNo,
        email,
        password: hash,
        department,
        hidden: false,
        firstTime: false,
        designation:"base"
    }
    //check if the user exists in the db
    try {
        const hasUser = await teacherModel.findOne({ email });
        if (hasUser) {
            res.json({ message: "User already exists" });
        }
    }
    catch (e) {
        res.json({ error: "Internal server error!" });
        res.json({ message: "User successfully created" });
    }

    try {

        //add the user if not present already
        const user = await teacherModel.create(newUser);

        let token = jwt.sign({ user: { id: user._id } }, jwt_key);
        res.json({ message: "User created", token })
    }
    catch (e) {
        res.json({ error: "Internal server error!" });
    }





})


//banajeer bhutto
router.post('/teacher/login', [
    body('email').isEmail().withMessage('Not a valid email')
], async (req, res) => {

    const { email, password } = req.body;


    //if user does not exists 
    try {
        const hasUser = await teacherModel.findOne({ email });
        if (!hasUser) {
            res.json({ message: "Please signup before logging in" });
        }
    }
    catch (e) {
        res.json({ error: "Internal server error!" });
    }
    //if user exists
    try {
        const user = await teacherModel.findOne({ email });
        //password match
        const pass_match = bcrypt.compareSync(password, user.password);
        if (!pass_match) {
            res.json({ message: "Password does not match please use correct password!" })
        }
        var token = jwt.sign({ user: { id: user._id } }, jwt_key);
        res.json({ message: "Successfully logged in", token });

    }

    catch (e) {
        res.json({ message: "Internal server error!" })
    }

})


router.post('/student/createuser', [
    body('email').isEmail().withMessage('Not a valid email'),
    body('firstName').isLength({ min: 3 }).withMessage('Name should be atleast 3 characters'),
    body('password').isLength({ min: 8 }).withMessage('Password length is less than 8')
], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });

    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);


    let {
        firstName,
        lastName,
        enrollmentNo,
        mobNo,
        classs,
        section,
        email,

    } = req.body;

    let newUser = {
        firstName,
        lastName,
        enrollmentNo,
        mobNo,
        classs,
        section,
        email,
        password: hash,
        hidden: false,
        firstTime: false
    }
    //check if the user exists in the db
    try {
        const hasUser = await studentModel.findOne({ email });
        if (hasUser) {
            res.json({ message: "User already exists" });
        }
    }
    catch (e) {
        res.json({ error: "Internal server error!" });
        res.json({ message: "User successfully created" });
    }

    try {
        //add the user if not present already
        const user = await studentModel.create(newUser);

        let token = jwt.sign({ user: { id: user._id } }, jwt_key);
        res.json({ message: "User created", token })
    }
    catch (e) {
        res.json({ error: "Internal server error!" });
    }






})


//banajeer bhutto
router.post('/student/login', [
    body('email').isEmail().withMessage('Not a valid email')
], async (req, res) => {

    const { email, password } = req.body;


    //if user does not exists 
    try {
        const hasUser = await studentModel.findOne({ email });
        if (!hasUser) {
            res.json({ message: "Please signup before logging in" });
        }
    }
    catch (e) {
        res.json({ error: "Internal server error!" });
    }
    //if user exists
    try {
        const user = await studentModel.findOne({ email });
        //password match
        const pass_match = bcrypt.compareSync(password, user.password);
        if (!pass_match) {
            res.json({ message: "Password does not match please use correct password!" })
        }
        var token = jwt.sign({ user: { id: user._id } }, jwt_key);
        res.json({ message: "Successfully logged in", token });

    }

    catch (e) {
        res.json({ message: "Internal server error!" })
    }

})

export default router;