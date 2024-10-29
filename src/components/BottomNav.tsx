import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

type Link = {
  name: string;
  icon: string;
  url: string;
};

const navLinks: Link[] = [
  {
    name: "Home",
    icon: "proicons:home-2",
    url: "/",
  },
  {
    name: "Task",
    icon: "ph:check-square-offset",
    url: "/task",
  },
  {
    name: "Invites",
    icon: "ph:users-three",
    url: "/invites",
  },
];

function BottomNav() {
  return (
    <footer className="px-6 py-3 bg-gray rounded-2xl">
      <ul className="flex items-center justify-between">
        {navLinks.map((link) => {
          return (
            <li key={link.name}>
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 ${isActive ? "text-white" : "text-white/50"}`
                }
                to={link.url}
              >
                <Icon icon={link.icon} />
                {link.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}

export default BottomNav;
