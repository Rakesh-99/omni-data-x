import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { menuItems, IMenuItems } from '@/constants/data';
import React, { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';



const Header: React.FC = () => {


    const location = useLocation();
    const [SheetOPen] = useState(true);





    return (
        <>

            <header className="h-20 sticky top-0 left-0 z-50 bg-white border-b w-full shadow-sm flex items-center px-5">


                <div className="flex items-center  w-[90%] m-auto justify-between">
                    {/* logo */}
                    <NavLink to={"/"} className="flex items-center">
                        <img src={logo}
                            alt="logo"
                            className='w-8 h-8'
                        />
                        <h4 className='font-extrabold'>MniDataX</h4>
                    </NavLink>

                    {/* Navmenu Items :  */}
                    <div className="md:flex lg:flex sm:hidden hidden">
                        {
                            menuItems && menuItems.map((menu: IMenuItems, idx: number) => {
                                return (
                                    <div className="mr-20 font-[500] hover:text-blue-800 transition-all text-[15px]" key={idx}>
                                        <NavLink
                                            className={` sm:text-sm md:text-sm ${location.pathname === `${menu.path}` && "border-b-2 pb-2 border-gray-400"}`} to={`${menu.path}`}>
                                            {menu.menuName}
                                        </NavLink>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <span className="md:hidden lg:hidden block " >
                        {
                            SheetOPen && <SmallerScreenNav />
                        }
                    </span>
                </div>

            </header>
        </>
    )
}

export default Header;





// Screen for smaller devices : 

const SmallerScreenNav: React.FC = () => {


    return (
        <>
            <div className="">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <RxHamburgerMenu />
                            <span className='text-xs'>Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle className='flex items-center'>
                                <img className='w-8 h-8' src={logo} alt="logo" />
                                <h3>MniDataX</h3>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="grid gap-4  mt-10 py-4">
                            {
                                menuItems && menuItems.map((menu: IMenuItems, idx: number) => {
                                    return (
                                        <ul key={idx}>
                                            <NavLink to={`${menu.path}`}>{menu.menuName}</NavLink>
                                        </ul>
                                    )
                                })
                            }
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button className='w-full' type="submit">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}
