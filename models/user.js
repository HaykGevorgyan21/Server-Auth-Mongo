import mongoose from 'mongoose';

const {model, Schema} = mongoose;

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        posts: [{type: Schema.Types.ObjectId, ref: "posts"}]
    },
    {timestamps: true}
);


export default model("users", userSchema);