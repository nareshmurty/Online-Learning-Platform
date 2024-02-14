import React from "react"
import { Outlet, NavLink } from "react-router-dom"

function RootLayout() {
  return (
    <main>
      <nav>
        <h1>
          <NavLink to="/">Code</NavLink>
        </h1>
        <ul>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
          <li>
            <NavLink to="profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="login">Login</NavLink>
          </li>
          <li>
            <NavLink to="signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="my-courses">My Courses</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </main>
  )
}

export default RootLayout
