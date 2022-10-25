import React, { useState } from "react";
import {
    PastEventsContainer,
    PastEventsContent,
    PastEventsImage,
    PastEventsTitle,
    PastEventsHeading,
    PastEventsSubHeading,
    PastEventsChangeViewBtn,
    PastEventsDiscordLink,
} from "./PastEventsElements";

const PastEvents = (props) => {
    const [viewFull, setViewFull] = useState(false);
    return (
        <>
            <PastEventsContainer>
                <PastEventsTitle>
                    <PastEventsImage src={props.image} alt="Event Image" width="100%" height="180px" />
                    <PastEventsHeading>{props.title}</PastEventsHeading>
                    <PastEventsSubHeading>
                        {props.date} •{" "}
                        <PastEventsDiscordLink href={props.venue} target={"_blank"}>
                            {" "}
                            Discord{" "}
                        </PastEventsDiscordLink>
                    </PastEventsSubHeading>
                </PastEventsTitle>
                {/*<PastEventsContent>*/}
                {/*    {viewFull ? props.content : props.content.slice(0, 200) + "..."}<br></br>*/}
                {/*    <PastEventsChangeViewBtn onClick={() => {setViewFull(!viewFull)}}>*/}
                {/*        {viewFull ? "See Less" : "See More"}*/}
                {/*    </PastEventsChangeViewBtn>*/}
                {/*</PastEventsContent>*/}
            </PastEventsContainer>
        </>
    );
};

export default PastEvents;
