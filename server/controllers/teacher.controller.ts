import expressAsyncHandler from "express-async-handler";
import teacherModel from "../models/teacher.model";
import { NextFunction, Request, Response } from "express";
import { ITeacherType } from '../models/teacher.model';
import ErrorHandler from "../utils/ErrorHandler";
import cloudinaryFileUpload from "../utils/cloudinary/cloudinaryFileUpload";
import { unlink } from "fs/promises";



interface UserType {
    name: string,
    subject: string,
    email: string,
    phone: number | string,
    bio: string,
    experience: number | string,
    classesHandled: string[] | ""
}


// Create teacher:
export const createTecher = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { name, subject, email, phone, bio, experience, classesHandled }: UserType = req.body;
    const profilePicture = req.file;
    

    const getClass = (classesHandled as string).split(",").map((getClass) => getClass);

    // Convert strings to numbers
    const phoneNo = Number(phone);
    const experienceInYears = Number(experience);

    // Upload image on cloudinary : 
    const cloudinaryImageURL = await cloudinaryFileUpload(profilePicture?.path);

    // Check if the email is already registered : 
    const user = await teacherModel.findOne({ email });
    if (user) {
        return next(new ErrorHandler(400, "User already exist!"));
    }


    const newUser = new teacherModel({
        name,
        subject,
        email,
        phone: phoneNo,
        profilePicture: cloudinaryImageURL,
        bio,
        experience: experienceInYears,
        classesHandled: getClass
    });

    await newUser.save();

    // function to remove images from upload after being uploaded on server : 
    if (profilePicture && newUser) {
        unlink(profilePicture.path);
    }

    return res.status(200).json({
        success: true,
        message: "A new teacher has been added",
        data: newUser
    })
});



// Get teacher details : 
export const getTeachersDetails = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { name }: Partial<ITeacherType> = req.query;

    // Searching teacheres by name : 
    const result: any = {};

    if (name) {
        result.$or = [
            { name: { $regex: name, $options: "i" } }
        ]
    }
    const getTeachers = await teacherModel.find(result);


    if (getTeachers.length < 1) {
        return next(new ErrorHandler(404, "No Teachers found!"))
    }

    return res.status(200).json({
        success: true,
        message: `${getTeachers.length} teachers found`,
        data: getTeachers
    })
});

export const getTeacherData = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const teacher = await teacherModel.findById({ _id: id });


    if (!teacher) {
        return next(new ErrorHandler(404, "Teacher not found!"));
    }

    return res.status(200).json({
        success: true,
        message: `${teacher.name} profile has been fetched`,
        data: teacher
    })
})