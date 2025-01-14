import { NavLink } from "react-router-dom"
import { menuItems, IMenuItems } from "@/constants/data"

const Footer = () => {





    return (
        <>
            <div className=" shadow-2xl text-center py-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">About Us</h3>
                            <p className="text-sm">
                                Dedicated to providing top-notch education and inspiring students to achieve their best.
                            </p>
                        </div>
                        <div className="">
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

                            {
                                menuItems && menuItems.map((menu: IMenuItems, idx: number) => {
                                    return (
                                        <div className="text-sm mb-1" key={idx}>
                                            <NavLink className={"text-center"} to={`${menu.path}`}>{menu.menuName}</NavLink>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <p className="text-sm">123 School Lane, Education City</p>
                            <p className="text-sm">Email: info@schoolname.com</p>
                            <p className="text-sm">Phone: (123) 456-7890</p>
                        </div>
                    </div>
                    <p className="text-sm mt-8">&copy; 2025 OmniDataX. All rights reserved.</p>
                </div>
            </div >
        </>
    )
}

export default Footer