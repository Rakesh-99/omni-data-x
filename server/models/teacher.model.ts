import mongoose, { Document } from "mongoose";



export interface ITeacherType extends Document {
    name: string,
    subject: string,
    email: string,
    phone: number,
    profilePicture?: string,
    bio: string,
    experience: number,
    classesHandled: string[]
}



const teacherSchema = new mongoose.Schema<ITeacherType>({
    name: {
        type: String,
        required: [true, "Name field is required!"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "Mobile no. is required!"]
    },
    profilePicture: {
        type: String,
        default: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg'
    },
    bio: {
        type: String,
        required: [true, "Bio is required!"]
    },
    experience: {
        type: Number,
        required: [true, "Experience is required!"]
    },
    classesHandled: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const teacherModel = mongoose.model<ITeacherType>("Teacher", teacherSchema);

export default teacherModel;
