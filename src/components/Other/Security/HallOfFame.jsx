import React from "react";
import {
    HallOfFameContainer,
    HallOfFameList,
    HallOfFameMonth,
    HallOfFameMonthSection,
    HallOfFameName,
    HallOfFameYear,
    HallOfFameYearSection,
} from "./HallOfFameElements";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { DotSymbol } from "../Support/SponsorsElements";
import SecurityNavigation from "./SecurityNavigation";

const HallOfFame = () => {
    const entries = [];

    return (
        <Wrapper>
            <HallOfFameContainer>
                <SecurityNavigation heading={"Hall of Fame"} />
                <HallOfFameList>
                    {entries.length > 0 ? (
                        entries
                            ?.slice()
                            ?.reverse()
                            ?.map((item, index) => (
                                <HallOfFameYearSection key={index}>
                                    <HallOfFameYear>{item.year}</HallOfFameYear>
                                    {item.months
                                        .slice()
                                        .reverse()
                                        .map((item, index) => (
                                            <HallOfFameMonthSection key={index}>
                                                <HallOfFameMonth>{item?.month}</HallOfFameMonth>
                                                <ul>
                                                    {item?.list.map((item, index) => (
                                                        <HallOfFameName key={index}>
                                                            <DotSymbol />
                                                            <span> </span>
                                                            {item?.vulnerability}
                                                            <span> - </span>
                                                            {item?.name}
                                                            <a
                                                                style={{ color: "#07b6f6" }}
                                                                href={item?.profile}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                [@{item?.username}]
                                                            </a>
                                                        </HallOfFameName>
                                                    ))}
                                                </ul>
                                            </HallOfFameMonthSection>
                                        ))}
                                </HallOfFameYearSection>
                            ))
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                width: "100%",
                                fontWeight: "bold",
                                fontSize: "35px",
                                color: "black",
                                background: "#ff6500",
                                borderRadius: "5px",
                                padding: "15px",
                            }}
                        >
                            No Vulnerabilities Reported Yet
                        </div>
                    )}
                </HallOfFameList>
            </HallOfFameContainer>
        </Wrapper>
    );
};

export default HallOfFame;
