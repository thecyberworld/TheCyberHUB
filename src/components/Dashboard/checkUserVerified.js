import { useState, useEffect } from "react";
import axios from "axios";
import getApiUrl from "../../features/apiUrl";

export const useUserData = ({ user }) => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(getApiUrl("api/users/user"), {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setUserData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [user.token]);

    return userData;
};
