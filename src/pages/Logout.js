import { redirect } from "react-router-dom"
import axios from "axios"
import { LOGOUT_URL } from "../constants"
import { getUser } from "../utils/getUsers"
import { SUPABASE_API_KEY } from "../constants"

export async function logoutAction() {
  const user = await getUser()
  axios.post(LOGOUT_URL, null, {
    headers: {
      apikey: SUPABASE_API_KEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.access_token}`,
    },
  })
  localStorage.removeItem("user")

  //   console.log("inside logout action")
  return redirect("/")
}
