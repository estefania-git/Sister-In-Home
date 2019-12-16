const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const commentSchema = new Schema({
    user: {
        type: String,
    },
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            return ret;
        }
    }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;