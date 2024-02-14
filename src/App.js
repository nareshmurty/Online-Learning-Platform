import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import RootLayout from "./Layouts/RootLayout"
import { Home, Login, About, Signup, MyCourses, Profile } from "./pages"
import { loginAction, loginLoader } from "./pages/Login"
import { MyCoursesLoader } from "./pages/MyCourses"
import { profileLoader } from "./pages/Profile"
import { signupAction, signupLoader } from "./pages/Signup"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="profile" element={<Profile />} loader={profileLoader} />
      <Route
        path="login"
        element={<Login />}
        action={loginAction}
        loader={loginLoader}
      />
      <Route
        path="signup"
        element={<Signup />}
        action={signupAction}
        loader={signupLoader}
      />
      <Route
        path="my-courses"
        element={<MyCourses />}
        loader={MyCoursesLoader}
      />
    </Route>
  )
)
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
