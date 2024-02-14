import React from "react"
import { Form, redirect, useActionData, useNavigation } from "react-router-dom"
import axios from "axios"
import { LOGIN_URL, SUPABASE_API_KEY } from "../constants"
import { getUser } from "../utils/getUsers"
import { useLocation } from "react-router-dom"

export async function loginLoader() {
  // if ("user" in localStorage) {
  //   const user = JSON.parse(localStorage.getItem("user"))
  //   if ("user_id" in user && "access_token" && "refresh_token" in user)
  //     return redirect("/")
  // }
  // return null

  const user = await getUser()
  if (user === null) return null
  else return redirect("/")
}

export async function loginAction({ request }) {
  // console.log(request)
  const redirectTo = new URL(request.url).searchParams.get("redirectTo") || "/"
  // console.log("redirectTo ", redirectTo)
  const data = await request.formData()
  // console.log(data)
  // console.log(data.get("email"))
  // console.log(data.get("password"))
  const credentials = {
    email: data.get("email"),
    password: data.get("password"),
  }
  // console.log(credentials)
  //request

  try {
    const response = await axios.post(LOGIN_URL, JSON.stringify(credentials), {
      headers: {
        apikey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      },
    })
    // console.log(response.data)
    const {
      access_token,
      refresh_token,
      expires_at,
      user: { id: user_id },
    } = response.data
    // console.log(response.data)
    const user = { access_token, refresh_token, expires_at, user_id }
    //localStorage:
    //sessionStorage: within a tab

    localStorage.setItem("user", JSON.stringify(user))

    // console.log(user)
    return redirect(redirectTo)
  } catch (error) {
    localStorage.removeItem("user")
    // console.log(error)
    if (error.response.status === 400)
      return { error: "wrong username or password" }
    else return { error: error?.response?.data?.message || error.message }
  }
}

function Login() {
  const navigation = useNavigation()
  // console.log(navigation)
  const issubmitting = navigation.state === "submitting"
  const data = useActionData()
  const location = useLocation()
  // console.log(location)
  const loginURL = location.pathname + location.search
  // console.log(loginURL)
  // console.log(data)

  return (
    <Form method="POST" action={loginURL} replace>
      <h1>Login Page</h1>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          autoComplete="off"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoCapitalize="off"
        />
      </div>
      <div>
        <input
          type="submit"
          value={issubmitting ? "submitting" : "login"}
          disabled={issubmitting}
        />
      </div>
      {/* {data?.error} */}
      {data && data.error && <p>{data.error}</p>}
    </Form>
  )
}

export default Login
