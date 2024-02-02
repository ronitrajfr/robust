const mongoose = require("mongoose");
const {DB_URI} = require("./config")

mongoose.connect(DB_URI).then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
})

const accountSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const Account = mongoose.model("Account", accountSchema)


const User = mongoose.model("User",userSchema)

module.exports = {
    User,
    Account   
}

