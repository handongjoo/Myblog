const express = require("express");
const app = express();
const port = 3000;

const commentRouter = require('./routes/comment.routes');
const loginRouter = require('./routes/login.routes');
const postRouter = require('./routes/post.routes');
const signupRouter = require('./routes/signup.routes');

app.use(express.json());
app.use('/', [commentRouter, loginRouter, postRouter,signupRouter]);


app.get('/', (res, req) => {
    res.send("메인페이지")
})

app.listen(port, () => {
    console.log(port, "서버 오픈")
})