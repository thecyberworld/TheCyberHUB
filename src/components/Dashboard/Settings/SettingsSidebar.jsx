import React from "react";
import { Link, useLocation } from "react-router-dom";

const SIDEBAR_LINKS = [
    {
        id: 1,
        label: "Profile",
        href: "/dashboard/settings/profile",
    },
    {
        id: 2,
        label: "Account",
        href: "/dashboard/settings/account",
    },
    {
        id: 3,
        label: "Api",
        href: "/dashboard/settings/api",
    },
    {
        id: 4,
        label: "Appearance",
        href: "/dashboard/settings/appearance",
    },
    {
        id: 5,
        label: "Notifications",
        href: "/dashboard/settings/notifications",
    },
    {
        id: 6,
        label: "Display",
        href: "/dashboard/settings/display",
    },
    {
        id: 7,
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        id: 8,
        label: "Home",
        href: "/",
    },
];

export default function Sidebar() {
    const { pathname } = useLocation();

    return (
        <article className="settings-sidebar-wrapper">
            {SIDEBAR_LINKS.map(({ id, label, href }) => {
                return (
                    <Link key={id} to={href} className={`${pathname === href ? "active" : ""}`}>
                        {label}
                    </Link>
                );
            })}
        </article>
    );
}
