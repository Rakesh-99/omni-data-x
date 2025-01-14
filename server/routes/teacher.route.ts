import express from 'express';
const teacherRouter = express.Router();
import { createTecher, getTeacherData, getTeachersDetails } from '../controllers/teacher.controller';
import multerFileUpload from '../middlewares/multer.config';




teacherRouter.get("/get-teachers-detail", getTeachersDetails)
    .post("/create-teacher", multerFileUpload.single("profilePicture"), createTecher)
    .get("/get-teacher/:id", getTeacherData)


export default teacherRouter;