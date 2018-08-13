const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/posts");
const mongoose = require("mongoose");

const app = express();

mongoose
.connect(
  "mongodb://ctjs:" +
  process.env.MONGO_MLAB_PW +
  "@ds119652.mlab.com:19652/sandbox", { useNewUrlParser: true }
)
.then(() => {
  console.log("Connected to Database")
})
.catch(() => {
  console.log("Connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post Added Succesfully!',
      postId: result._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetch success',
      posts: documents
    });
  });
})

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({
      message: 'Post deleted',
    });
  })
})

module.exports = app;
