const {User, Post, Comment, Like } = require("../models");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try{
        const {nickname, password} = req.body;

        const user = await User.findOne({where:{nickname}})
        const checkPwd = user.dataValues.password
        // console.log(existUser)
        // console.log(existUser.dataValues.password)
        if(!user) {
            res.json({message: "없는 사용자 입니다."})
            return
        }
        if(checkPwd !== password) {
            res.json({message: "비밀번호가 틀렸습니다."})
            return
        }
        const token = jwt.sign({userId : user.id}, "key", {expiresIn: "30m"})
        res.json({token, message: "로그인 성공"})
        console.log(user.id)
    } catch(error) {
        console.log(error)
    }
}

module.exports = {login}