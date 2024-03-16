import React, { useState } from "react";
import { validateEmail } from "src/utils/validateEmail";
import { useSelector } from "react-redux";

export default function SettingsForm() {
    const { username: reduxUsername, email: reduxEmail } = useSelector((state) => state.auth).user;
    const [username, setUsername] = useState({
        value: reduxUsername,
        error: "",
    });
    const [password, setPassword] = useState({
        value: "",
        error: "",
    });
    const [email, setEmail] = useState({
        value: reduxEmail,
        error: "",
    });
    const disabled = username.value === reduxUsername && email.value === reduxEmail;

    function handleChange(e, setState) {
        setState(() => ({
            value: e.target.value,
            error: "",
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!username.value)
            return setUsername((curr) => ({
                ...curr,
                error: "Username required!",
            }));

        if (!password.value)
            return setPassword((curr) => ({
                ...curr,
                error: "Password required!",
            }));

        // used to test a valid email address
        if (!validateEmail(email.value))
            return setEmail((curr) => ({
                ...curr,
                error: "Email required!",
            }));
    }

    return (
        <form onSubmit={handleSubmit} className="settings-profile-form">
            <div className="settings-profile-input-wrapper">
                <label htmlFor="username">Username</label>
                <br />
                <input
                    type="text"
                    value={username.value}
                    id="username"
                    name="username"
                    placeholder="Your cool username"
                    onChange={(e) => handleChange(e, setUsername)}
                />
                {username.error && <p className="profile-error">{username.error}</p>}
            </div>
            <div className="settings-profile-input-wrapper">
                <label htmlFor="password">Password</label>
                <br />
                <input
                    type="text"
                    value={password.value}
                    id="password"
                    name="password"
                    placeholder="Your awesome password"
                    onChange={(e) => handleChange(e, setPassword)}
                />
                {password.error && <p className="profile-error">{password.error}</p>}
            </div>
            <div className="settings-profile-input-wrapper">
                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="text"
                    value={email.value}
                    id="email"
                    name="email"
                    placeholder="Your email"
                    onChange={(e) => handleChange(e, setEmail)}
                />
                {email.error && <p className="profile-error">{email.error}</p>}
            </div>
            <button type="submit" className="settings-profile-form-submitbtn" disabled={disabled}>
                Submit
            </button>
        </form>
    );
}
