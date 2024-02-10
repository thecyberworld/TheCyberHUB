import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout, userReset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

// Function to extract expiration time from JWT
const getTokenExpirationTime = (token) => {
    try {
        const decoded = jwtDecode(token);
        console.log("Token Expiration Time:", decoded.exp);
        // show according date and month
        const date = new Date(decoded.exp * 1000);
        console.log("Token Expiration Time:", date);

        if (decoded.exp) {
            return decoded.exp;
        }
    } catch (error) {
        console.error("Error decoding JWT:", error);
    }
    return null;
};

const SessionExpireLogout = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const onLogout = () => {
        dispatch(logout());
        dispatch(userReset());
        toast.warn("session expired");
    };

    useEffect(() => {
        const token = user.token;
        if (token) {
            const tokenExpTime = getTokenExpirationTime(token);
            if (tokenExpTime) {
                // log out user when session expires
                setTimeout(() => {
                    setIsTokenExpired(true);
                }, [tokenExpTime * 1000 - Date.now()]);
            }
        }
    }, [user]);

    useEffect(() => {
        if (isTokenExpired) {
            onLogout();
        }
    }, [isTokenExpired]);

    return null;
};

export default SessionExpireLogout;
