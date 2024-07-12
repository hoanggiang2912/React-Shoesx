import { NavLink } from "react-router-dom";
import styles from "./UserSideBar.module.css";
import { useMemo } from "react";

function UserSideBar() {
  const sidebarOptions = useMemo(
    () => [
      {
        name: "General",
        to: "/user/general",
      },
      {
        name: "Order History",
        to: "/user/orders",
      },
      {
        name: "Forgot Password",
        to: "/user/forgot-password", // Fixed the duplicate '/user/orders' path
      },
      {
        name: "Logout",
        onClick: () => console.log("Logout"),
        // Assuming you handle the logout differently since it doesn't navigate
      },
    ],
    []
  );

  return (
    <nav className="sidebar w-full">
      <ul className="w-full">
        {sidebarOptions.map((option, index) => (
          <li className="w-full" key={index}>
            {option.to ? (
              <NavLink
                to={option.to}
                className={({ isActive }) =>
                  isActive
                    ? `block p-4 w-full rounded-lg hover:text-gray-900 ${styles.active}`
                    : "block p-4 w-full rounded-lg hover:bg-gray-100 hover:text-gray-900"
                }
              >
                {option.name}
              </NavLink>
            ) : (
              <button
                onClick={option.onClick}
                className="block p-4 w-full text-start rounded-lg hover:bg-gray-100 text-red-400"
              >
                {option.name}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default UserSideBar;
