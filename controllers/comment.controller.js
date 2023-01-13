const {User, Post, Comment, Like } = require("../models");
const authMiddleware = require('../middlewares/auth-middleware')

// 댓글 조회
const getComment = async (req, res)=>{
    try{
        const {postId} = req.params
        const comments = await Comment.findAll({where:{postId}})
    
        if(!comments) {
            res.json({message: "댓글이 없습니다."})
            return
        }
        return res.json({comments})
    } catch(error) {
        console.log(error)
    }
}

// 댓글 작성
const createComment = async (req,res) => {
    try{
        const {id} = req.params
        const {content} = req.body
        const userId = res.locals.user.id
    
        const post = await Post.findOne({where:{id}})
        if (post.id !== Number(id)) {
            res.json({message: "없는 게시글입니다."})
            return
        }
        if (!content) {
            res.json({message: "댓글 내용을 입력해주세요."})
            return
        }
        await Comment.create({content, postId:id, userId})
        return res.json({message: "댓글 생성이 완료되었습니다."})
    } catch (error) {
        console.log(error)
    }
}

//댓글 수정
const updateComment = async (req, res) =>{
    try{
        const {id} = req.params
        const {content} = req.body
        const userId = res.locals.user.id
        
        const comment = await Comment.findOne({where: {id}})
        
        if (!comment) {
            res.json({message: "없는 댓글입니다."})
            return
        }
        if (comment.userId !== userId) {
            res.json({message: "수정 권한이 없습니다."})
            return
        }
        if (!content) {
            res.json({message: "내용을 입력해주세요"})
            return
        }
        await Comment.update({content},{where: {id}})
        return res.json({message: "댓글 수정이 완료되었습니다."})
    } catch(error) {
        console.log(error)
    }
}

// 댓글 삭제
const deleteComment = async (req, res) => {
    try{
        const {id} = req.params
        const userId = res.locals.user.id
    
        const comment = await Comment.findOne({where: {id}})
        if (!comment) {
            res.json({message: "없는 댓글입니다."})
            return
        }
        if (comment.userId !== userId) {
            res.json({message: "삭제 권한이 없습니다."})
            return
        }
        await Comment.destroy({where: {id}})
        return res.json({message: "댓글 삭제가 완료되었습니다."})
    } catch(error) {
        console.log(error)
    }
}

module.exports = {getComment, createComment, updateComment, deleteComment}