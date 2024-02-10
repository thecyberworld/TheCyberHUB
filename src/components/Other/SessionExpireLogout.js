import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout, userReset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    console.log("User Found:", user.username);

    const onLogout = () => {
        dispatch(logout());
        dispatch(userReset());
        navigate("/login");
    };

    useEffect(() => {
        const token = user.token;
        if (token) {
            const tokenExpTime = getTokenExpirationTime(token); // Get token expiration time
            if (tokenExpTime && Date.now() >= tokenExpTime * 1000) {
                console.log("Token Expired");
                setIsTokenExpired(true);
            } else {
                console.log("Token Not Expired");
                setIsTokenExpired(false);
            }
        }
    }, [user]);

    useEffect(() => {
        console.log("Token Expired:", isTokenExpired);
        if (isTokenExpired) {
            onLogout();
        }
    }, [isTokenExpired]);

    return null;
};

export default SessionExpireLogout;
