import multer from 'multer';
import { v4 as uuid } from "uuid";





// multer configuration : 

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/uploads");
    },
    filename: (req, file, callback) => {
        const uniqueName = `${file.originalname}_${uuid()}`;
        callback(null, uniqueName);
    }
});


const multerFileUpload = multer({ storage: storage });

export default multerFileUpload;