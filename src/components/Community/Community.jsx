import React from "react";
import { Header, Overlay, Container, Heading, Paragraph, Button } from "./CommunityElements";
import { IconContext } from "react-icons";
import { FaDiscord } from "react-icons/fa";

const Community = () => {
    return (
        <Header>
            <Overlay></Overlay>
            <Container>
                <Heading>Loved by thousands of hackers</Heading>
                <Paragraph>
                    Community goal is to help new folks to get started with open-source and cyber-security. <br />
                    We create Cybersecurity courses and build opensource projects for hackers and beginners.
                </Paragraph>
                <a href="https://discord.gg/thecyberworld-799183504759324672" target="blanck">
                    <Button>
                        <IconContext.Provider value={{ size: "2em", style: { margin: "0 0.2rem" } }}>
                            <FaDiscord style={{ color: "#7289da" }} />
                        </IconContext.Provider>
                        <span>Join our Discord Channel</span>
                    </Button>
                </a>
            </Container>
        </Header>
    );
};

export default Community;
