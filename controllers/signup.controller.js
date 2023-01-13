const {User, Post, Comment, Like } = require("../models");

const signUp = async (req,res) =>{
    try{
        const {nickname, password, confirm} = req.body;

        const existUser = await User.findOne({
            where: {nickname}
        })

        if(existUser) {
            res.json({message: "중복된 닉네임입니다."})
            return
        }  
        if(password !== confirm) {
            res.json({message: "비밀번호를 확인해주세요"})
            return
        } 
        await User.create({nickname, password}),
        res.json({message: "회원가입 완료"})

    } catch(error){
        console.log(error)
    }
};

module.exports = {signUp}