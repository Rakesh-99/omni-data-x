import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import MorphingText from "@/components/ui/morphing-text";
import { NavLink } from "react-router-dom";
import { DotPattern } from "@/components/ui/dot-pattern";
import clsx from 'clsx'
import { MagicCard } from "@/components/ui/magic-card";
import { TextAnimate } from "@/components/ui/text-animate";







const Home = () => {

    const texts = [
        "Hello",
        "Welcome to",
        "Our",
        "OmniDataX Org",
        "Please",
        "Explore",
        "Our",
        "Teachers",
        "",
    ];
    return (
        <>
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">

                {/* Dot Pattern :  */}
                <div className="absolute flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
                    <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
                    </p>
                    <DotPattern
                        className={clsx(
                            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                        )}
                    />
                </div>

                <Meteors number={30} />
                <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center lg:text-8xl md:text-6xl sm:text-4xl text-2xl font-semibold leading-none text-transparent">

                </span>
                <MorphingText texts={texts} />

                {/* about :  */}
                <TextAnimate animation="scaleDown" by="word" className="text-sm md:w-[70%] lg:w-[70%] xl:w-[60%] sm:w-[80%] w-[90%] text-gray-500 mt-10 font-bold" as={"p"}>
                    Welcome to our Teacher Listing platform, where you can explore a diverse range of qualified educators from various fields. Whether you're looking for a tutor to help you excel in a subject or want to learn a new skill, our platform provides an easy way to find and connect with experienced teachers. Additionally, you can effortlessly add new profile.Browse through our listings."
                </TextAnimate>


                <div className="flex z-50 gap-2 mt-10">
                    <Button className="py-5 text-xs rounded-sm">
                        <NavLink to={"/create-teacher"}>Add Teacher</NavLink>
                    </Button>
                    <Button className="py-5 text-xs rounded-sm">
                        <NavLink to={"/get-teachers"}>Our Teachers</NavLink>
                    </Button>
                </div>

            </div >

            <div className="min-h-screen">
                {/* Features : */}

                <h1 className="text-gray-500 text-center my-20">Features </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 xl:grid-cols-2 md:w-[80%] lg:w-[80%] xl:w-[80%] w-[95%] m-auto gap-5 ">

                    <MagicCard
                        className="cursor-pointer  py-5 flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl"
                        gradientColor={"#D9D9D955"}
                    >
                        <div className="">
                            <h2 className="sm:text-2xl md:text-4xl xl:text-5xl text-2xl">1.</h2>
                            <div className="text-gray-500">
                                <h5 className="font-extrabold md:text-lg xl:text-lg sm:text-base text-sm">Front end </h5>
                                <p className="text-sm font-light"> -- Multipage webiste </p>
                                <p className="text-sm font-light"> -- Lazy loading for faster page loading response </p>
                                <p className="text-sm font-light"> -- Minimalist eye-catching Design </p>
                                <p className="text-sm font-light"> -- Full Responsive Design for different screens </p>
                                <p className="text-sm font-light"> -- Typescript to enhance the Typesefety & prevent bugs</p>
                                <p className="text-sm font-light"> -- Redux-Toolkit for state management</p>
                                <p className="text-sm font-light"> -- Clean code and reusable components</p>
                                <p className="text-sm font-light"> -- Animations for  visual appeal, and user experience. </p>
                            </div>
                        </div>
                    </MagicCard>

                    <MagicCard
                        className="cursor-pointer  py-5 flex-col items-center justify-center whitespace-nowrap text-4xl shadow-2xl"
                        gradientColor={"#D9D9D955"}
                    >
                        <div className="">
                            <h2 className="sm:text-2xl md:text-4xl xl:text-5xl text-2xl">2.</h2>
                            <div className="text-gray-500">
                                <h5 className="font-extrabold md:text-lg xl:text-lg sm:text-base text-sm">Backend </h5>
                                <p className="text-sm font-light"> -- MVC structure for better code readbility </p>
                                <p className="text-sm font-light"> -- Solid Error handling using error handler middleware </p>
                                <p className="text-sm font-light"> -- Typescript to enhance the Typesefety & prevent bugs </p>
                                <p className="text-sm font-light"> -- Route for Adding new Teacher </p>
                                <p className="text-sm font-light"> -- Implented multer & cloudinary for file handeling</p>
                                <p className="text-sm font-light"> -- clean code</p>
                                <p className="text-sm font-light"> -- Unlink() function for remove images autometically</p>
                                <p className="text-sm font-light"> --  </p>
                            </div>
                        </div>
                    </MagicCard>

                </div>
            </div>
        </>
    )
}

export default Home