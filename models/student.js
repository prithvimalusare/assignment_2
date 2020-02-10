let mongoose = require('mongoose');

let studentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    school:{
        type: String,
        required: true
    },
    class:{
        type: Number,
        required: true
    },
    division:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

let Student = module.exports = mongoose.model('Student', studentSchema)