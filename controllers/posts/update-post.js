import postModel from '../../models/post.js';
import Cloud from '../../middleware/cloudinary.js';


export const updatePost = async (req, res) => {
    const id = req.params.id;
    const {title, text, image} = req.body;

    const currentProduct = await postModel.findById(id);

    const updatedData = {title, text};

    if (image) {
        const imgId = currentProduct?.image.public_id;
        if (imgId) {
            await Cloud.uploader.destroy(imgId);
        }
        const newImg = await Cloud.uploader.upload(image, {
            folder: "products"
        })
        updatedData.image = {public_id: newImg.public_id, url: newImg.secure_url};
    }
    await postModel.findByIdAndUpdate(id, updatedData);
    res.status(200).json({message: "The post was updated"});
}