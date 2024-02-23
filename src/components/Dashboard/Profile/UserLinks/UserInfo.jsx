import React from "react";

import { UserPicture } from "../../../Explore/Users/UsersElements";
import { cdnContentImagesUrl } from "../../../../features/apiUrl";
import { UserInfoContainer } from "./UserLinksElements";

const UserInfo = ({ children }) => {
    const avatar = cdnContentImagesUrl("/user/" + (children?.avatar || "avatarDummy.png"));

    return (
        <UserInfoContainer>
            <UserPicture style={{ height: "200px", width: "200px" }} src={avatar} />
            <span className={"name"}>{children?.name}</span>
            <span className={"username"}>@{children?.username}</span>
        </UserInfoContainer>
    );
};
export default UserInfo;
