import mongoose from 'mongoose';
const { Schema } = mongoose;
require('mongoose-type-url');

const letterSchema=new Schema(
    {
        t_id: {
            type: Number,
            required: true
        },
        subject: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required:true
        },
        date:{
            type: Date,
            required: true
        },
        hidden: Boolean,
        url: {
            type: mongoose.SchemaTypes.Url, 
            required: true
        },
        agreed: {
            type: Boolean,
            required: true
        }

    })