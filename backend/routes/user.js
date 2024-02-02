const express = require('express');
const {User} = require("../db");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config");
const zod = require("zod")
const {Account} = require("../db")
const  { authMiddleware } = require("../middleware");
const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})


router.post("/signup", async(req,res) => {
    const { success } = signupBody.safeParse(req.body)

    if(!success) {
        console.log()
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    //checking if the user with same email exists

    const foundUser = await User.findOne({ username: req.body.username });

    //if yes

    if(foundUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    //if no

    const {username, firstName, lastName, password} = req.body;
    const newUser = await User.create({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    const userId = newUser._id;

    await Account.create({
        userId,
        balance:Math.floor(Math.random() * 10000) + 1
    });

    const token = jwt.sign({userId}, JWT_SECRET)

    

    res.status(200).json({
        message: "User created successfully",
	    token: token
    })


})

//signin
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async(req,res) => {
    const {success} = signinBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })


    if(user) {
        const userId = user._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET)

        res.status(200).json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/" , authMiddleware, async(req,res) => {
    const {success} = updateBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    console.log('User ID:', req.userId);
    const updatedUser = await User.findOneAndUpdate(
        { _id: req.userId },
        { $set: req.body },
        { new: true, useFindAndModify: false }
    );
    
    res.json({
        message: "Updated successfully"
    })
})

router.get("/", async(req,res) => {
    const allUsers = await User.find()
    res.json(allUsers)
})
// /bulk
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router;