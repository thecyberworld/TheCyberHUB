import React from "react";
import { H1 } from "../ContactForm/ContactFormElements";
// import tailwind from "../../../assets/images/tailwind.svg";
import {
    SponsorsWrapper,
    SponsorsContainer,
    SponsorsLayout,
    SponsorsTopHeader,
    SponsorsH4,
    SponsorsGrid1,
    SponsorsGridColTop,
    SponsorsH1,
    SponsorsGrid2,
    SponsorsGrid3,
    // SponsorsImg,
    SponsorsGridColLast,
    SponsorsGridColHidden,
    SponsorsGridColHiddenSm,
    SponsorsFooterBar,
    SponsorButton,
} from "./SpecialSponsorsElement";

const SpecialSponsors = () => {
    return (
        <SponsorsWrapper>
            <SponsorsContainer>
                <H1>SPONSORS</H1>
                <SponsorsLayout>
                    <SponsorsTopHeader
                        style={{
                            borderRadius: "1rem 1rem 0 0",
                        }}
                    >
                        <SponsorsH4>Special Sponsors</SponsorsH4>
                    </SponsorsTopHeader>
                    <SponsorsGrid1>
                        <SponsorsGridColTop>
                            <SponsorsH1 href={"https://thecyber-sec.com"} target={"_blank"} rel={"noreferrer"}>
                                TheCyberSEC
                            </SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1>Thecyberworld</SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            {/* <SponsorsH1>Thecyberworld</SponsorsH1> */}
                            {/* <SponsorsImg src={tailwind} alt="tailwind"/> */}
                        </SponsorsGridColTop>
                    </SponsorsGrid1>
                    <SponsorsTopHeader>
                        <SponsorsH4>Platinum Sponsors</SponsorsH4>
                    </SponsorsTopHeader>
                    <SponsorsGrid2>
                        <SponsorsGridColTop>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColTop>
                    </SponsorsGrid2>
                    <SponsorsTopHeader>
                        <SponsorsH4>Gold Sponsors</SponsorsH4>
                    </SponsorsTopHeader>
                    <SponsorsGrid3>
                        <SponsorsGridColLast>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColHiddenSm>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColHiddenSm>
                        <SponsorsGridColHiddenSm>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColHiddenSm>
                        <SponsorsGridColHidden>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColHidden>
                        <SponsorsGridColHidden>
                            <SponsorsH1></SponsorsH1>
                        </SponsorsGridColHidden>
                    </SponsorsGrid3>
                    <SponsorsFooterBar>
                        <SponsorsH4>{""}</SponsorsH4>
                    </SponsorsFooterBar>
                </SponsorsLayout>
                <SponsorButton href={"https://github.com/sponsors/Thecyberworld"} target={"_blank"} rel={"noreferrer"}>
                    {" "}
                    Sponsor Thecyberworld Community
                </SponsorButton>
            </SponsorsContainer>
        </SponsorsWrapper>
    );
};

export default SpecialSponsors;
