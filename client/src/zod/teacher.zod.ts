import { z } from 'zod';


// Validation of create teacher form : 

export const teacherSchemaZod = z.object({

    // name : 
    _id: z.string(),
    name: z.
        string()
        .min(2, "Username should be at least 2 char!")
        .max(40, "Username can't exceed 40 char!"),

    // email : 
    email: z.string().email("Invalid email!"),

    // subject : 
    subject: z.
        string()
        .min(2, "Subject field should contain at least 2 char!"),

    // Phone : 
    phone: z.string().length(10, "Phone no should contain 10 digit!")
        .or(z.number()),


    // Profile picture : 
    profilePicture: z.instanceof(File).or(z.string()), // Handle cases where it might be a URL or string

    // bio : 
    bio: z.string().min(10, "Minimum 10 char required!"),

    // Experience : 
    experience: z.string().or(z.number()).refine((val) => {
        const getExperience = typeof val === "string" ? parseInt(val) : val
        return getExperience > 0
    }),

    // class handled : 
    classesHandled: z.array(z.string())
});

export type TeacherZodType = z.infer<typeof teacherSchemaZod>

