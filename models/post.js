import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const postModel = new Schema(
    {
        username: {type: String},
        title: {type: String, required: true},
        text: {type: String, required: true},
        image: {
            public_id: {type: String, required: true},
            url: {type: String, required: true}
        },
        views: {type: Number, default: 0},
        author: {type: Schema.Types.ObjectId, ref: 'users'},
        comments: {type: Schema.Types.ObjectId, ref: 'comment'}
    },
    {timestamps: true}
)


export default model("posts", postModel);