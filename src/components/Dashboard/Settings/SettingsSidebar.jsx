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
        label: "Appearance",
        href: "/dashboard/settings/appearance",
    },
    {
        id: 4,
        label: "Notifications",
        href: "/dashboard/settings/notifications",
    },
    {
        id: 5,
        label: "Display",
        href: "/dashboard/settings/display",
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
