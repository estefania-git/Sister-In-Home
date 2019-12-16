const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SisterMamiSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coment: {
        type: Schema.Types.ObjectId, ref: ""

    },

    picture: {
        type: String,
        default: "https://i.stack.imgur.com/l60Hf.png"
    },
    geo: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        }
    },
    done: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["mami", "sister"]
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.created_at;
            return ret;
        }
    }
})

SisterMamiSchema.index({
    location: '2dsphere'
});

const SisterMami = mongoose.model('SisterMami', SisterMamiSchema);
module.exports = SisterMami;