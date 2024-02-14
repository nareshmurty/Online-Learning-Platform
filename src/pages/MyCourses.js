import React from "react"
import { getUser } from "../utils/getUsers"
import { redirect } from "react-router-dom"

export async function MyCoursesLoader({ request }) {
  // console.log("course loader works")

  const pathname = new URL(request.url).pathname
  // console.log("pathname", pathname)
  const user = await getUser()
  if (user === null) return redirect("/login?redirectTo=/my-courses")
  else return null
}

function MyCourses() {
  return <div>MyCourses</div>
}

export default MyCourses
