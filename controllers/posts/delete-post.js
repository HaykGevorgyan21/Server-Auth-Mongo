import postModel from '../../models/post.js';
import userModel from '../../models/user.js';
import Cloud from '../../middleware/cloudinary.js';


export const deletePost = async (req, res) => {
    const id = req.params.id;

    try {
        const postToDelete = await postModel.findByIdAndDelete(id);
        await userModel.findByIdAndUpdate(req.userId, {
            $pull: {posts: id}
        });

        const imageId = postToDelete?.image.public_id;
        await Cloud.uploader.destroy(imageId);
        res.status(200).json({message: "Deleted successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }

}