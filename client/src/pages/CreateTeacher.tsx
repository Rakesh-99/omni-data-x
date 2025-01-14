import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import React, { ChangeEvent, useState } from "react"
import { TeacherZodType, teacherSchemaZod } from "@/zod/teacher.zod";
import { IClass, ITeacher } from "@/constants/data";
import ShineBorder from "@/components/ui/shine-border";
import { useDispatch, useSelector } from "react-redux";
import { addTeacherFullfilled, addTeacherPending, addTeacherRejected } from "../../app/features/teacherSlice";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { axiosTeacherInstance } from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import WordRotate from "@/components/ui/word-rotate";
import Particles from "@/components/ui/particles";








const CreateTeacher: React.FC = () => {


    const { isLoading } = useSelector((state: any) => state.teacherslice);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const classes: IClass[] = [
        {
            class: "class 7",
        },
        {
            class: "class 8",
        },
        {
            class: "class 9",
        },
        {
            class: "class 10",
        },
        {
            class: "class 11",
        },
        {
            class: "class 12",
        }
    ]


    const [formError, setFormError] = useState<Partial<ITeacher>>({})

    const [teacher, setTeacher] = useState<ITeacher>({
        _id: "",
        name: "",
        email: "",
        phone: "",
        subject: "",
        profilePicture: "",
        bio: "",
        classesHandled: [],
        experience: ""
    })



    // form input handler : 
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value }: { name: string, value: string } = e.target;
        setTeacher({
            ...teacher, [name]: value
        })
    }

    // text area input handler : 
    const textAreaInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setTeacher({
            ...teacher,
            bio: value
        })
    }


    // function for checking checkboxes input : 
    const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setTeacher((prevState: TeacherZodType) => ({
            ...prevState,
            classesHandled: checked ? [...prevState.classesHandled, value] :
                prevState.classesHandled.filter((getClass) => getClass !== value)
        }))
    }

    // File handler func : 
    const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        if (file) {
            setTeacher({
                ...teacher,
                profilePicture: file
            })
        }
    }

    // Form submit handler : 
    const submithandler = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // form validation using zod : 
        const validateForm = teacherSchemaZod.safeParse(teacher);
        if (validateForm.error) {
            const catchError = validateForm.error.formErrors.fieldErrors;
            setFormError(catchError as Partial<TeacherZodType>)
            return false;
        }



        // Form Data : 
        const formData = new FormData();

        formData.append("name", teacher.name);
        formData.append("email", teacher.email);
        formData.append("bio", teacher.bio);
        formData.append("phone", teacher.phone.toString());
        formData.append("experience", teacher.experience.toString());
        formData.append("classesHandled", teacher.classesHandled.toString());


        formData.append("subject", teacher.subject);

        if (teacher.profilePicture instanceof File) {
            formData.append("profilePicture", teacher.profilePicture)
        }

        // Perfom API call : 
        try {
            dispatch(addTeacherPending());
            const addTeacher = await axiosTeacherInstance.post(`/api/create-teacher`, formData)
            const response = await addTeacher.data;
            if (response) {
                console.log(response);
                toast.success(response.message)
                dispatch(addTeacherFullfilled(response));
                navigate(`/get-teachers`);
            }
        } catch (error: any) {
            if (error) {
                console.log(error.response.data.message);
                toast.error(error.response.data.message || "An unexpected error occurred!")
                dispatch(addTeacherRejected(error.response.data.message));
            }

        }

        // Reset the state after api call : 
        setTeacher({
            _id: "",
            name: "",
            email: "",
            phone: "",
            experience: "",
            subject: "",
            classesHandled: [],
            profilePicture: "",
            bio: ""
        })
    }




    return (
        <>
            <div className="flex flex-col  justify-center flex-wrap">
                <div className=" text-center">
                    <h3 className="">
                        <WordRotate
                            className="text-5xl font-extrabold text-gray-500 dark:text-white"
                            words={["Add a", "New Teacher"]}
                        />
                    </h3>
                </div>

                {/* Particles :  */}
                <div className="absolute flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
                    <Particles
                        className="absolute inset-0 z-0"
                        quantity={100}
                        ease={80}
                        color={"white"}
                        refresh
                    />
                </div>


                <div className="w-[80%] min-h-screen  m-auto  flex justify-center py-5">
                    <form onSubmit={submithandler}>
                        <div className="flex md:flex-row lg:flex-row sm:flex-col flex-col  gap-5">

                            <div className=" flex flex-col items-center">

                                {/* teacher name :  */}
                                <div className="">
                                    <Label>Name</Label>
                                    <Input
                                        required
                                        type="text"
                                        className="py-5 w-80"
                                        placeholder="Teacher name"
                                        name="name"
                                        value={teacher.name}
                                        onChange={inputChangeHandler}
                                    />
                                    <p className="text-red-500 text-xs font-semibold">{formError && formError.name}</p>
                                </div>

                                {/* subject :  */}
                                <div className="">
                                    <Label>Subject</Label>

                                    <Input
                                        required
                                        type="text"
                                        className="py-5 w-80"
                                        placeholder="Subject"
                                        name="subject"
                                        value={teacher.subject}
                                        onChange={inputChangeHandler}
                                    />

                                    <p className="text-red-500 text-xs font-semibold">{formError && formError.subject}</p>
                                </div>

                                {/* email :  */}
                                <div className="">
                                    <Label>Email</Label>
                                    <Input
                                        required
                                        type="email"
                                        className="py-5 w-80"
                                        placeholder="Email"
                                        name="email"
                                        value={teacher.email}
                                        onChange={inputChangeHandler}
                                    />
                                    <p className="text-red-500 text-xs font-semibold">{formError && formError.email}</p>
                                </div>

                                {/* Experience :  */}
                                <div className="">
                                    <Label>Experience</Label>
                                    <Input
                                        required
                                        name="experience"
                                        onChange={inputChangeHandler}
                                        value={teacher.experience}
                                        className="w-80 py-5"
                                        type="number"
                                    />
                                    <p className="text-red-500 text-xs font-semibold">{formError && formError.experience}</p>
                                </div>

                            </div>
                            {/* second row :  */}
                            <div className="flex flex-col items-center">

                                <div className="">
                                    <Label>Phone</Label>
                                    <Input
                                        type="number"
                                        required
                                        className="py-5 w-80"
                                        placeholder="Phone no."
                                        name="phone"
                                        value={teacher.phone}
                                        onChange={inputChangeHandler}
                                    />
                                    <p className="text-red-500 text-xs font-semibold">{formError && formError.phone}</p>
                                </div>

                                {/* profile picture :  */}
                                <div className="">
                                    <Label>Profile picture</Label>
                                    <Input
                                        required
                                        type="file"
                                        className="w-80"
                                        name="profilePicture"
                                        onChange={fileChangeHandle}
                                    />
                                    <p className="text-red-500 text-xs font-semibold">{typeof formError.profilePicture === "string" ? formError.profilePicture : ""}</p>
                                </div>


                                {/* bio :  */}
                                <div className="">
                                    <Label>Bio</Label>
                                    <Textarea
                                        required
                                        name="bio"
                                        className="w-80"
                                        placeholder="Enter bio.."
                                        value={teacher.bio}
                                        onChange={textAreaInputHandler}
                                    />
                                    <p className="text-red-500 text-xs font-semibold">{formError && formError.bio}</p>
                                </div>

                            </div>

                        </div>
                        {/* class handle :  */}

                        <div className="">
                            <div className="mt-2">
                                <Label>Class handled</Label>
                            </div>
                            <div className="flex  gap-3 mb-5 mt-1 ">
                                {
                                    classes.map((getClass: IClass, idx: number) => {

                                        return (
                                            <div key={idx} className="flex items-center gap-1">
                                                <input

                                                    type="checkbox"
                                                    onChange={checkboxHandler}
                                                    value={getClass.class}
                                                />
                                                <p className="text-sm">{getClass.class}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="">
                            <ShineBorder className=" w-full">
                                {
                                    isLoading ?
                                        <Button disabled
                                            className="w-full flex  font-semibold text-xs bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500">
                                            <Loader className="animate-spin" />
                                            <span>Loading ...</span>
                                        </Button>
                                        :
                                        <Button
                                            className="w-full flex  font-semibold text-xs bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500">Add Teacher</Button>
                                }

                            </ShineBorder>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default CreateTeacher