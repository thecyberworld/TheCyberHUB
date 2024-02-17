import React, { useState } from "react";
import "./Notification.css";
import Toggle from "./toggle";

export default function Notifications() {
    const [toggled, setToggled] = useState({
        all: false,
        blogs: false,
        newsletter: false,
        event: false,
    });

    function handleClickAll() {
        toggled.all = !toggled.all;
        setToggled(toggled);
        console.log(toggled);
        if (toggled.all === true) {
            const x = document.getElementsByClassName("otherButtons");
            if (toggled.event === false) {
                x[0].click();
            }
            if (toggled.newsletter === false) {
                x[1].click();
            }
            if (toggled.blogs === false) {
                x[2].click();
            }
        }
    }

    function handleEvent() {
        toggled.event = !toggled.event;
        setToggled(toggled);
        if (toggled.all === true) {
            const x = document.getElementsByClassName("allButton");
            x[0].click();
        }
        console.log(toggled);
    }

    function handleNewsletter() {
        toggled.newsletter = !toggled.newsletter;
        setToggled(toggled);
        if (toggled.all === true) {
            const x = document.getElementsByClassName("allButton");
            x[0].click();
        }
        console.log(toggled);
    }

    function handleBlogs() {
        toggled.blogs = !toggled.blogs;
        setToggled(toggled);
        if (toggled.all === true) {
            const x = document.getElementsByClassName("allButton");
            x[0].click();
        }
        console.log(toggled);
    }

    return (
        <section style={{ width: "100%" }}>
            <div>
                <h3>Notifications</h3>
                <p>Here you can modify which notifications you want to receive</p>
                <div id="container">
                    <div>
                        <h2>All notifications</h2>
                        <p id="allNotif">Turn of all notifications</p>
                    </div>
                    <Toggle handleClick={handleClickAll} className={"allButton"} />

                    <div>
                        <h3>Event notifications</h3>
                        <p>Receive notifications related to events</p>
                    </div>
                    <Toggle handleClick={handleEvent} className={"otherButtons"} />

                    <div>
                        <h3>Newsletter notifications</h3>
                        <p>Receive the monthly newsletter</p>
                    </div>
                    <Toggle handleClick={handleNewsletter} className={"otherButtons"} />

                    <div>
                        <h3>Blogs notifications</h3>
                        <p>Receive notifications regarding the blog</p>
                    </div>
                    <Toggle handleClick={handleBlogs} className={"otherButtons"} />
                </div>
            </div>
        </section>
    );
}