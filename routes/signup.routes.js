const express = require("express");
const signupController = require("../controllers/signup.controller")
const router = express.Router();


// 회원가입
router.post('/signup', signupController.signUp);

module.exports = router;