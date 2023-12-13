const  postModel  = require('../models/post');

// Add post 
const postData = async (req, res) => {
    try {
        let {title, description} = req.body;
        if(title !='' && description !=''){
            let user_id = req.user._id;
            let post = new postModel({title, description, user_id});
            await post.save();
            return res.send({ 
                success: true,
                message: 'Your Post created...!',
                data: post
            });
        }else{
            return res.send({
                success: false,
                message: 'Your post was not created...!',
                data: null
            })
        }
    } catch (error) {
        return res.status(400).json({ error: `Somethings wents wrong.${error.message}` });
    }
}

// get user post
const getData = async (req, res) => {
    try {
        const results = await postModel.find({user_id: req.user._id})
                        .sort({ createdAt: -1 })
                        .exec();
        res.json(results);
    } catch (error) {
        return res.status(400).json({ error: `Somethings wents wrong.${error.message}` });
    }
}

const getAllPosts = async (req, res) => {
    try {
      // Use populate to fetch user details for each post
      const post = await postModel.find()
        .populate({
          path: 'user_id',
          select: '-password -token -role -email',
        })
        .sort({ createdAt: -1 })
        .exec();
  
        return res.send({ 
            success: true,
            message: 'Post Found...!',
            data: post
        });
    } catch (error) {
      return res.status(400).json({ error: `Something went wrong. ${error.message}` });
    }
  };

// view Post
const viewPost = async (req, res) => {
    try {
        let post = await postModel.findOne({_id: req.params.id}).populate({
            path: 'user_id',
            select: '-password -token -role -email',
          })
          .exec();
        return res.send({ 
            success: true,
            message: 'Post Found...!',
            data: post
        });
    } catch (error) {
        return res.status(400).json({ error: `Somethings wents wrong.${error.message}` });
    }
};

// update post 
const updatePost = async (req, res) => {
    try {
        let {title, description} = req.body;
        let post = await postModel.findOne({_id: req.params.id});
        if(post){
            post.title = title;
            post.description = description;
            await post.save();
            return res.send({ 
                success: true,
                message: 'Your Post Updated...!',
                daa: post
            });
        }else{
            return res.status(400).json({ error: `Post not found...!`});
        }
    } catch (error) {
        return res.status(400).json({ error: `Somethings wents wrong.${error.message}` });
    }
}

// Delete post 
const deletePost = async (req, res) => {
    try {
        let post = await postModel.deleteOne({_id: req.params.id});
        if(post){
            return res.send({ 
                success: true,
                message: 'Your Post Deleted...!',
            });
        }else{
            return res.status(400).json({ error: `Post not found...!`});
        }
    } catch (error) {
        return res.status(400).json({ error: `Somethings wents wrong.${error.message}` });
    }
}
  

module.exports = {
    postData,
    getData,
    viewPost,
    updatePost,
    deletePost,
    getAllPosts
}