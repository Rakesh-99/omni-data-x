import React, { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ITeacher } from "@/constants/data";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ShineBorder from "@/components/ui/shine-border";
import { NavLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectGroup, SelectLabel } from "@/components/ui/select";
// import { SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { TextAnimate } from "@/components/ui/text-animate";
import { Plus } from "lucide-react";
import Loader from "@/loader/Loader";
import { axiosTeacherInstance } from '../utils/axiosInstance';
import WordRotate from "@/components/ui/word-rotate";
import { getTeachersFullfilled, getTeachersPending, getTeachersRejected } from "../../app/features/teacherSlice";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaUserTie } from "react-icons/fa";
import { CoolMode } from "@/components/ui/cool-mode";
import { MdDeleteForever } from "react-icons/md";
import Particles from "@/components/ui/particles";



const OurTeachers: React.FC = () => {

    const [teachers, setTeachers] = useState([]);
    const [searchName, setSearchName] = useState("");
    const { isLoading } = useSelector((state: any) => state.teacherslice)
    const dispatch = useDispatch();
    const [selectInputData, setSelectInputData] = useState<string>("");



    const inputChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const { value }: { value: string } = e.target;
        setSearchName(value)
    }

    const selectInputChange = (e: string) => {
        setSelectInputData(e);
    }

    const clearFilter = () => {
        setSelectInputData("");
    }



    useEffect(() => {


        const getTeachers = async () => {

            try {
                dispatch(getTeachersPending());
                const getData = await axiosTeacherInstance.get(`/api/get-teachers-detail`);
                const response = await getData.data;
                if (response) {
                    setTeachers(response.data);
                    dispatch(getTeachersFullfilled());
                }
            } catch (error: any) {
                if (error) {
                    console.log("Error ->" + error);
                    dispatch(getTeachersRejected(error.response.data.message || " Something went wrong!"))
                }
            }
        }
        getTeachers();
    }, [selectInputData]);



    return (
        <>
            {/* Particles :  */}
            <div className="">
                <Particles
                    className="absolute inset-0 z-0"
                    quantity={100}
                    ease={80}
                    color={"white"}
                    refresh
                />

                <div className="mt-4 text-5xl flex justify-center">
                    <WordRotate
                        className="text-5xl font-extrabold text-gray-500 dark:text-white"
                        words={["Our", "Teachers"]}
                    />
                </div>

                <div className=" flex-col flex-wrap md:flex-row sm:flex-row xl:flex-row lg:flex-row flex items-center justify-center gap-10 my-10">
                    <Input
                        className="w-96 py-5"
                        value={searchName}
                        placeholder="Search teacher by name"
                        onChange={inputChangeHandle}
                    />
                    <div className="flex items-center gap-1">
                        {/* Select :  */}
                        <Select onValueChange={selectInputChange}>
                            <SelectTrigger className="w-[180px] py-5">
                                <SelectValue placeholder="Select a Teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel className="flex items-center gap-1">
                                        <FaUserTie />
                                        Teachers
                                    </SelectLabel>
                                    {
                                        teachers && teachers.map((teacher: ITeacher) => {
                                            return (
                                                <SelectItem
                                                    key={teacher._id}
                                                    value={`${teacher.name}`}>
                                                    {teacher.name}
                                                </SelectItem>
                                            )
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Reset filter button :  */}
                        <div className="relative justify-center">
                            <CoolMode>
                                <Button
                                    onClick={clearFilter}
                                    className="bg-red-500 py-5 active:scale-[95%] transition-all hover:bg-red-600 rounded-sm">
                                    <MdDeleteForever />
                                </Button>
                            </CoolMode>
                        </div>

                    </div>



                    <Button className="py-5 w-40 rounded-sm  font-semibold text-xs bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500" type="button">
                        <NavLink className={`flex  items-center gap-2`} to={"/create-teacher"}>
                            <Plus />
                            <p className="text-sm">Add New Teacher</p>
                        </NavLink>
                    </Button>
                </div>


                <div className="">
                    {
                        isLoading ?
                            <div className="flex-col gap-1 items-center justify-center flex h-96">
                                <Loader />
                                <TextAnimate animation="scaleDown" by="word" className="text-xs text-gray-600 font-bold" as={"p"}>
                                    Fetching data from server, please wait ..
                                </TextAnimate>
                            </div>
                            :
                            <div className="grid xl:grid-cols-4 lg:grid-cols-3 w-[90%] m-auto justify-center md:grid-cols-2 sm:grid-cols-2">
                                {
                                    teachers && teachers
                                        .
                                        filter((item: ITeacher) => searchName.toLowerCase() === "" ? item : item.name.toLowerCase().includes(searchName.toLowerCase()))


                                        .filter((item: ITeacher) => selectInputData.toLowerCase() === "" ? item : item.name.toLowerCase().includes(selectInputData.toLowerCase()))

                                        .map((teacher: ITeacher, idx: number) => {


                                            return (
                                                <div className="w-80 min-h-80 border hover:scale-[99%] transition-all  p-2 m-2" key={idx}>
                                                    {/* profile picture :  */}
                                                    <div className="relative">
                                                        <img className="" src={teacher?.profilePicture as string} alt="avatar" />
                                                    </div>

                                                    {/* name : */}
                                                    <div className="mt-2 flex justify-between items-center">
                                                        <TextAnimate animation="slideRight" by="word" className="text-2xl text-gray-600 font-bold">
                                                            {teacher.name}
                                                        </TextAnimate>

                                                        {/* subject :  */}
                                                        <Label className="bg-gray-100 text-xs px-2 py-1">{teacher?.subject} Teacher</Label>
                                                    </div>


                                                    <Separator className="mt-2" />

                                                    {/* bio :  */}
                                                    <div className="my-2">
                                                        <p className="text-sm line-clamp-2">{teacher.bio}</p>
                                                    </div>


                                                    {/* class handle :  */}
                                                    <div className="flex flex-col mt-2 gap-2">
                                                        <Label>Class handled</Label>
                                                        <div className="flex flex-wrap gap-1">
                                                            {
                                                                teacher && teacher.classesHandled.map((getClass: string, idx: number) => {
                                                                    return (
                                                                        <Badge key={idx} className="py-1" >{getClass}</Badge>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>

                                                    {/* button to know more :  */}
                                                    <NavLink to={`/get-teacher/${teacher?._id} `}>
                                                        <ShineBorder className="w-full mt-2">
                                                            <Button
                                                                className="w-full py-5 flex  font-semibold text-xs bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500">Know more..</Button>
                                                        </ShineBorder>
                                                    </NavLink>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                    }
                </div>


            </div>
        </>
    )
}

export default OurTeachers;