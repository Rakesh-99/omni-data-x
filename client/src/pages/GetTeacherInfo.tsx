import { ITeacher } from '@/constants/data';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import BlurFade from "@/components/ui/blur-fade";
import { Separator } from '@/components/ui/separator';
import { TextAnimate } from "@/components/ui/text-animate";
import { Label } from '@/components/ui/label';
import { MdOutlineEmail } from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { Badge } from '@/components/ui/badge';
import { Loader, SchoolIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IoMdArrowDropleft } from "react-icons/io";
import { axiosTeacherInstance } from '@/utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { getTeachersPending, getTeachersFullfilled, getTeachersRejected } from "../../app/features/teacherSlice";
import Particles from '@/components/ui/particles';
import DotPattern from '@/components/ui/dot-pattern';
import clsx from 'clsx'



const GetTeacherInfo: React.FC = () => {

    const [teacherData, setTeacherData] = useState<ITeacher>();
    const { id } = useParams();
    const { isLoading } = useSelector((state: any) => state.teacherslice);


    const dispatch = useDispatch();

    useEffect(() => {
        const getTeachData = async () => {
            try {
                dispatch(getTeachersPending());
                const getTeacher = await axiosTeacherInstance.get(`/api/get-teacher/${id}`);
                const response = await getTeacher.data;
                if (response.success) {
                    dispatch(getTeachersFullfilled());
                    setTeacherData(response.data)
                    toast.success(response.message)
                }
            } catch (error: any) {
                if (error) {
                    dispatch(getTeachersRejected(error.response.data.message || "Something Went Wrong!"));
                    toast.error(error.response.data.message)
                    console.log(error);
                }
            }
        }
        getTeachData();
    }, [id]);

    return (
        <>
            <div className="">
                {/* Top content :  */}
                <section id="header" className='text-center my-10'>
                    <BlurFade delay={0.25} inView>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-4xl/none">
                            {teacherData?.name} 👋
                        </h2>
                    </BlurFade>
                    <BlurFade delay={0.25 * 2} inView>
                        <span className="text-pretty text-xl tracking-tighter sm:text-3xl xl:text-2xl/none">
                            Nice to meet you
                        </span>
                        <div className="w-full flex justify-center mt-2">
                            <Separator className='w-96 ' />
                        </div>
                    </BlurFade>
                </section>


                {/* bottom content :  */}
                <div className="">
                    <Particles
                        className="absolute inset-0 z-0"
                        quantity={50}
                        ease={80}
                        color={"white"}
                        refresh
                    />
                    {
                        isLoading ?
                            <div className=" items-center justify-center flex h-60">
                                <Loader size={35} className='animate-spin' />
                            </div>
                            :
                            <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col w-[80%] m-auto">

                                {/* left content :  */}
                                <div className=" lg:w-2/5 md:w-[400px] md:min-h-96 lg:min-h-96 h-52">
                                    <img src={teacherData?.profilePicture as string} alt="avatar" className='w-full h-full object-cover p-2' />
                                </div>


                                {/* Dot pattern :  */}

                                <div className="absolute flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
                                    <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
                                    </p>
                                    <DotPattern
                                        className={clsx(
                                            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                                        )}
                                    />
                                </div>


                                {/* right content :  */}
                                <div className=" w-full lg:m-5 md:ml-4 ">



                                    <div className="">
                                        {/* Name :  */}
                                        <div className="flex justify-between">
                                            <h1 className='text-3xl md:text-5xl my-2 lg:text-6xl'>{teacherData?.name}</h1>
                                            <Button className='z-50'>
                                                <NavLink to={'/get-teachers'} className={"flex items-center gap-1  py-5"}>
                                                    <IoMdArrowDropleft />
                                                    <p>Back</p>
                                                </NavLink>
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            {/* Email :  */}
                                            <div className="flex items-center gap-1">
                                                <MdOutlineEmail size={20} />
                                                <p>{teacherData?.email}</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <CiMobile3 size={20} />
                                                <p>{teacherData?.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio :  */}
                                    <div className="mt-5">
                                        <div className="items-center flex gap-2">
                                            <Label className='text-xl my-2'>About</Label>
                                            <Badge className='py-1'>{teacherData?.subject} Teacher</Badge>
                                        </div>

                                        <TextAnimate animation="fadeIn" by="line" as="p">
                                            {
                                                teacherData?.bio ? `${teacherData.bio}` : ""
                                            }
                                        </TextAnimate>
                                    </div>

                                    {/* Experience :  */}
                                    <div className="mt-5">
                                        <Label>Experience </Label>
                                        <div className="flex">
                                            <h1>{teacherData?.experience}</h1>
                                            <span className='text-xs '>Years</span>
                                        </div>
                                    </div>

                                    {/* class Handled :  */}

                                    <div className="flex flex-col gap-1 mb-3">
                                        <div className="flex gap-1 items-center">
                                            <h1><SchoolIcon size={15} /></h1>
                                            <Label>Class Handled</Label>
                                        </div>
                                        <div className="">
                                            {
                                                teacherData?.classesHandled.map((getClass: string, idx: number) => {
                                                    return (
                                                        <Badge key={idx} className='py-1 mr-2'>{getClass}</Badge>
                                                    )
                                                })
                                            }
                                        </div>


                                    </div>
                                </div>

                            </div>
                    }
                </div>



            </div >
        </>
    )
}

export default GetTeacherInfo;