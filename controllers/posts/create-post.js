import postModel from '../../models/post.js';
import userModel from '../../models/user.js';
import fs from "fs-extra"
import cloudinary from '../../middleware/cloudinary.js';


export const createPost = async (req, res) => {
    const {title, text} = req.body;

    try {
        const image = req.file.path;
          const result = await cloudinary.uploader.upload(image, {
      folder: "samples",
    });
           
        const user = await userModel.findById(req.userId);
        const newPost = await postModel.create({
            username: user?.name,
            title,
            text,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            author: req.userId
        });
        await userModel.findByIdAndUpdate(req.userId, {
            $push: {posts: newPost}
        });
        res.status(200).json(newPost);
        let path = req.file.path;
    await fs.remove(path);
    } catch (err) {
        res.status(500).json({message: 'Something went wrong'});
        console.log(err);
    }

}





