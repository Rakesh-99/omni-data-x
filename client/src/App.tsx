import Layout from "./components/user-defined-components/layout/Layout"
import { Suspense, lazy } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner";



// lazy loading : 
const Home = lazy(() => import("./pages/Home"));
const OurTeachers = lazy(() => import("./pages/OurTeachers"));
const CreateTeacher = lazy(() => import("./pages/CreateTeacher"));
const GetTeacherInfo = lazy(() => import("./pages/GetTeacherInfo"));




const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: (
          <Suspense  >
            <Home />
          </Suspense>
        )
      },

      {
        path: "get-teachers",
        element: (
          <Suspense>
            <OurTeachers />
          </Suspense>
        )
      },
      {
        path: "create-teacher",
        element: (
          <Suspense>
            <CreateTeacher />
          </Suspense>
        )
      },
      {
        path: "get-teacher/:id",
        element: (
          <Suspense>
            <GetTeacherInfo />
          </Suspense>
        )
      }
    ]
  }
])


const App = () => {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>

  )
}

export default App