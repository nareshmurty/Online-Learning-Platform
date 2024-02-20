import React from "react"
import { Outlet, NavLink, Form, useRouteLoaderData } from "react-router-dom"

function RootLayout() {
  const user = useRouteLoaderData("parentRoute")
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
          {user && (
            <li>
              <NavLink to="profile">Profile</NavLink>
            </li>
          )}

          {!user && (
            <li>
              <NavLink to="login">Login</NavLink>
            </li>
          )}

          {!user && (
            <li>
              <NavLink to="signup">Signup</NavLink>
            </li>
          )}
          {user && (
            <li>
              <NavLink to="my-courses">My Courses</NavLink>
            </li>
          )}
        </ul>
        {user && (
          <Form action="/Logout" method="post">
            <button>Logout</button>
          </Form>
        )}
      </nav>
      <Outlet />
    </main>
  )
}

export default RootLayout
