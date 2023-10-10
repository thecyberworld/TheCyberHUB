import React from "react";
// import BotAvatar from "../../../../assets/thecyberworld-green01.png";
import { getCdnAssets } from "../../../../features/apiUrl";
const logoThecyberworld = `${getCdnAssets}/images/ThecyberworldLogo/Thecyberworld_logo_outlined.png`;

export default function ChatBotAvatar() {
    return (
        <div className="react-chatbot-kit-chat-bot-avatar">
            <div className="react-chatbot-kit-chat-bot-avatar-container" style={{ background: "none" }}>
                <img alt="BotAvatar" src={logoThecyberworld} />
            </div>
        </div>
    );
}
