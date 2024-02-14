import { getUser } from "../utils/getUsers"
import { redirect } from "react-router-dom"
import { requireAuth } from "../utils/requireAuth"

export async function profileLoader({ request }) {
  const pathname = new URL(request.url).pathname
  console.log("pathname", pathname)
  const user = await getUser()
  await requireAuth({ redirectTo: pathname })
  return null
}

function Profile() {
  return <div>Profile</div>
}

export default Profile
