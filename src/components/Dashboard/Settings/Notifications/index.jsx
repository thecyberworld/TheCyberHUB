import React from "react";
import "./Notification.css";
import Toggle from "./toggle";

export default function Notifications() {
    // const [toggled, setToggled] = useState(false);

    return (
        <section style={{ width: "100%" }}>
            <div>
                <h2>Notifications</h2>
                <p>Here you can modify which notifications you want to receive</p>
                <div id="container">
                    <div>
                        <h3>All notifications</h3>
                        <p>Turn of all notifications</p>
                    </div>
                    <Toggle />

                    <div>
                        <h3>Event notifications</h3>
                        <p>Receive notifications related to events</p>
                    </div>
                    <Toggle />

                    <div>
                        <h3>Newsletter notifications</h3>
                        <p>Receive the monthly newsletter</p>
                    </div>
                    <Toggle />

                    <div>
                        <h3>Blogs notifications</h3>
                        <p>Receive notifications regarding the blog</p>
                    </div>
                    <Toggle />
                </div>
            </div>
        </section>
    );
}
