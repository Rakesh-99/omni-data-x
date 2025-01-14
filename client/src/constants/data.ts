

export interface IClass {
    class: string
}

export interface IMenuItems {
    menuName: string;
    path: string
}

export const menuItems: IMenuItems[] = [
    {
        menuName: "Home",
        path: "/",

    },
    {
        menuName: "Our Teachers",
        path: "/get-teachers",

    },

]

export interface ITeacher {
    _id: string,
    name: string,
    subject: string,
    email: string,
    phone: number | string
    bio: string,
    experience: number | string
    classesHandled: string[],
    profilePicture: string | File
}


export interface InitialStateType {
    teachers: ITeacher[],
    error: string | null | undefined,
    isLoading: boolean
}


