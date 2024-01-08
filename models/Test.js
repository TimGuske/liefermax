import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    zahl: {
        type: Number,
        required: true,
    },
},
//{timestamps: true}
)

export default mongoose.models.Test || mongoose.model("Test", TestSchema)