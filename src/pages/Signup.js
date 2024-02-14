import { SIGNUP_URL, SUPABASE_API_KEY } from "../constants"
import axios from "axios"
import { Form, useActionData, redirect } from "react-router-dom"
import { getUser } from "../utils/getUsers"

export async function signupLoader() {
  const user = await getUser()
  if (user === null) return null
  else return redirect("/")
}

export async function signupAction({ request }) {
  const formData = await request.formData()
  const newUser = {
    email: formData.get("email"),
    password: formData.get("password"),
  }
  const confirmPassword = formData.get("confirm-password")
  if (newUser.password !== confirmPassword) {
    return { error: "passwords must match" }
  }
  try {
    const response = await axios.post(SIGNUP_URL, newUser, {
      headers: {
        apikey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      },
    })
    const data = response.data
    if (data.identities && data.identities.length === 0)
      return { error: "user already exists" }
    return { message: "confirm your email and login" }
  } catch (error) {}

  return null
}

function Signup() {
  const data = useActionData()
  return (
    <Form action="/signup" method="POST">
      <h1>Signup Page</h1>
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
          type="password"
          name="confirm-password"
          id="password"
          placeholder="confirm password"
          autoCapitalize="off"
        />
      </div>
      <div>
        <input type="submit" value="submit" />
      </div>
      {data && data.error && <p>{data.error}</p>}
    </Form>
  )
}

export default Signup
