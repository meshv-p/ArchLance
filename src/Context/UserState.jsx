import React, { useState, useEffect } from "react";
// import blogContext from "./BlogContext";
import UserContext from "./UserContext";

export const UserState = (props) => {
    const [theme, setTheme] = useState(false);
    const [loggedinUser, setLoggedinUser] = useState();
    const [profile, setProfile] = useState()
    const [progress, setProgress] = useState(0);
    const [userRole, setUserRole] = useState()
    let url = process.env.REACT_APP_URL;

    // if (profile) {
    //     setLoggedinUser(profile)
    // }

    useEffect(() => {
        // console.log(url);
        // console.log("blog state run first");
        if (localStorage.getItem("Theme")) {
            let getTheme = JSON.parse(localStorage.getItem("Theme"));
            setTheme(getTheme);
        }

        if (localStorage.getItem("token")) {
            // console.log(JSON.parse(localStorage.getItem("user")));
            setLoggedinUser(JSON.parse(localStorage.getItem("token")));
            // console.log(loggedinUser);
        }
    }, []);

    const toggleTheme = () => {
        setTheme(!theme);
        localStorage.setItem("Theme", !theme);
    };

    return (
        <UserContext.Provider
            value={{
                url,
                theme,
                toggleTheme,
                loggedinUser,
                setLoggedinUser,
                progress,
                setProgress,
                profile,
                setProfile,
                userRole,
                setUserRole
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
