const express = require("express");
const router = express.Router();

const User = require("../models/user")

router.get('/signup', async (req,res) =>{
    const {nickname, password, confirmPassword} = req.body;

    const existUser = await User.findOne({nickname})
    console.log(existUser);
})

module.exports = router;