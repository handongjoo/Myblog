const {User, Post, Comment, Like } = require("../models");
const authMiddleware = require('../middlewares/auth-middleware')

//게시글 조회
const getPost = async (req, res) => {
    try{
        const posts = await Post.findAll({})
        // attributes: ["title"]
        res.json({posts})
    } catch(error) {
        console.log(error)
    }
}

//게시글 생성
const createPost = async (req, res) => {
    try{
        const {title, content} = req.body;
        const userId = res.locals.user.id
        console.log(res.locals.user)
        if(!title || !content) {
            res.json({message: "모든 항목을 작성해주세요."})
            return
        }
        await Post.create({title, content, userId})
        return res.json({message: "게시글 생성 완료"})
    } catch(error) {
        console.log(error)
    }
}

// 게시글 상세 조회
const detailPost = async (req, res) => {
    try{
        const {id} = req.params;
        const existPost = await Post.findOne({where : {id}})
        if (!existPost) {
        res.json({message: "없는 게시글 입니다."})
        }
        return res.json({existPost})

    } catch(error) {
        console.log(error)
    }
}

// 게시글 수정
const updatePost = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, content} = req.body;
        const userId = res.locals.user.id
        const checkPost = await Post.findOne({where: {id}})
        if(!checkPost) {
            res.json({message: "없는 게시글 입니다."})
            return
        }
        if(checkPost.userId !== userId) {
            res.json({message: "수정 권한이 없습니다."})
            return
        }
        await Post.update({title, content}, {where : {id}})
        return res.json({message: "수정이 완료되었습니다."})
    } catch(error) {
        console.log(error)
    }
}

// 게시글 삭제
const deletePost = async (req, res) =>{
    try{
        const {id} = req.params;
        const userId = res.locals.user.id
        const checkPost = await Post.findOne({where: {id}})
        if(!checkPost) {
            res.json({message: "없는 게시글 입니다."})
            return
        }
        if (checkPost.userId !== userId) {
            res.json({message: "수정 권한이 없습니다."})
            return
        }
        await Post.destroy({where: {id}})
        return res.json({message: "삭제가 완료되었습니다."})
    } catch(error) {
        console.log(error)
    }
}

module.exports = {getPost, createPost, detailPost, updatePost, deletePost}