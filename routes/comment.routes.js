const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth-Middleware')
const commentController = require("../controllers/comment.controller")

router.get('/comment/:postId', authMiddleware, commentController.getComment)
router.post('/comment/:id', authMiddleware, commentController.createComment)
router.patch('/comment/:id', authMiddleware, commentController.updateComment)
router.delete('/comment/:id', authMiddleware, commentController.deleteComment)

module.exports = router;