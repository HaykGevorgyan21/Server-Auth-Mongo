import postModel from '../../models/post.js';
import userModel from "../../models/user.js";


export const getPosts = async (req, res) => {
    const posts = await postModel.find().sort('-createdAt');
    res.status(200).json(posts);
}


export const getUserPosts = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        const list = await Promise.all(
            user?.posts.map((post) => {
                return postModel.findById(post._id);
            })
        )
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
};



export const getSinglePost = async (req, res) => {
    const id = req.params.id;

    try {
        const singlePost = await postModel.findById(id);
        res.status(200).json(singlePost);
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }

};

export const getUserSinglePost = async (req, res) => {
    const id = req.params.id;

    try {
        const singleUserPost = await postModel.findById(id);
        res.status(200).json(singleUserPost);
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }

};