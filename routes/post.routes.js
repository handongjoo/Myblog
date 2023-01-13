const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')
const postController = require("../controllers/post.controller")

const {Post, User, Like} = require('../models')


router.get('/post', postController.getPost)
router.post('/post', authMiddleware, postController.createPost)
router.get('/post/:id', postController.detailPost)
router.patch('/post/:id', authMiddleware, postController.updatePost)
router.delete('/post/:id', authMiddleware, postController.deletePost)

//게시글 좋아요, 좋아요 취소 (미완)
router.post('/post/:id/like', authMiddleware, async (req, res) => {
    try{
        const {id} = req.params;
        const userId = res.locals.user.id
    
        const countLike = await Post.findOne({
            where: {id}
            // attributes:["like"]
        })
        console.log(countLike)
        const alreadyLike = await Like.findOne({
            where : {postId:id, userId}
        })
        // console.log(alreadyLike)
        if (alreadyLike === null) {
            Like.create({done: 1, postId:id, userId})
            Post.update({like : countLike.like + 1})
            res.json({message : "좋아요를 눌렀습니다."})
            return
        }
        // if (alreadyLike.done === 1) {
        Like.destroy({where: {postId:id, userId}})
        Post.update({like : countLike.like - 1})
        console.log(alreadyLike)
        return res.json({message: "좋아요를 취소했습니다."})
    } catch (error) {
        console.log(error)
    }
        
    // }
    // const like = Like.create({
    //     postId:id,
    //     userId
    // })
    // res.json({like})
})

module.exports = router;