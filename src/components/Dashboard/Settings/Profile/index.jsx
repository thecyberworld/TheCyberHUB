import React from "react";
import SettingsForm from "./ProfileForm";
import "./profile.css";

export default function Proofile() {
    return (
        <section style={{ width: "100%" }}>
            <div>
                <div className="settings-profile">
                    <h3 className="profile-heading">Profile</h3>
                    <p className="profile-info">This is how others will see you on the site.</p>
                </div>
                <div>
                    <SettingsForm />
                </div>
            </div>
        </section>
    );
}
