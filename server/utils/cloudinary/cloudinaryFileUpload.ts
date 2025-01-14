import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
dotenv.config();



// cloudinary config : 
cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_API_NAME
})




// cloudinary uploader :

const cloudinaryFileUpload = async (profilePicture: any) => {
    try {
        const file = cloudinary.uploader.upload(profilePicture, { resource_type: "auto" });
        if (file) {
            const fileURL = (await file).url;
            return fileURL;
        }
    } catch (error: any) {
        console.log(`Could not upload image on cloudinary!, Error ->, ${error.message}`);
    }
};

export default cloudinaryFileUpload;


