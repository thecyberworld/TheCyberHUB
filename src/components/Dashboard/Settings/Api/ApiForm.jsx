import React, { useEffect, useState } from "react";
import { getApiUrl } from "../../../../features/apiUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SettingsForm() {
    const { user } = useSelector((state) => state.auth);
    const API_BASE_URL = getApiUrl("api/aiChat");

    const [apiKey, setApiKey] = useState({
        value: "",
        error: "",
    });

    useEffect(() => {
        fetchApiKey();
    }, []);

    async function fetchApiKey() {
        const response = await axios.get(
            `${API_BASE_URL}/getApiKey`,

            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            },
        );
        setApiKey({
            value: response.data,
            error: "",
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!apiKey.value) {
            return setApiKey((curr) => ({
                ...curr,
                error: "Api Key required!",
            }));
        }

        const response = await axios.post(
            `${API_BASE_URL}/createApiKey`,
            {
                apiKey: apiKey.value,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            },
        );

        if (response.data.apiKey) {
            toast("Sucessfully updated API Key");
        }
    }

    function handleChange(e, setState) {
        setState(() => ({
            value: e.target.value,
            error: "",
        }));
    }

    return (
        <form onSubmit={handleSubmit} className="settings-profile-form">
            <div className="settings-profile-input-wrapper">
                <label htmlFor="apiKey">Api Key</label>
                <br />
                <input
                    type="text"
                    value={apiKey.value}
                    id="apiKey"
                    name="apiKey"
                    placeholder="Your API key"
                    onChange={(e) => handleChange(e, setApiKey)}
                />
            </div>
            <button type="submit" className="settings-profile-form-submitbtn">
                Submit
            </button>
        </form>
    );
}
