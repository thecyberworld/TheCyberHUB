import React from "react";
import { H1 } from "../ContactForm/ContactFormElements";
import tailwind from "../../../assets/images/tailwind.svg";
import {
    SponsorsWrapper,
    SponsorsContainer,
    SponsorsLayout,
    SponorsHeader,
    SponsorsH4,
    SponsorsGrid1,
    SponsorsGridColTop,
    SponsorsH1,
    SponsorsGrid2,
    SponsorsGrid3,
    SponsorsImg,
    SponsorsGridColLast,
    SponsorsGridColHidden,
    SponsorsGridColHiddenSm,
} from "./SpecialSponsorsElement";

const SpecialSponsors = () => {
    return (
        <SponsorsWrapper>
            <SponsorsContainer>
                <H1>SPONSORS</H1>
                <SponsorsLayout>
                    <SponorsHeader>
                        <SponsorsH4>Special Sponsors</SponsorsH4>
                    </SponorsHeader>
                    <SponsorsGrid1>
                        <SponsorsGridColTop>
                            <SponsorsImg src={tailwind} alt="tailwind" />
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColTop>
                        <SponsorsGridColTop>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColTop>
                    </SponsorsGrid1>
                    <SponorsHeader>
                        <SponsorsH4>Platinum Sponsors</SponsorsH4>
                    </SponorsHeader>
                    <SponsorsGrid2>
                        <SponsorsGridColTop>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColTop>
                    </SponsorsGrid2>
                    <SponorsHeader>
                        <SponsorsH4>Gold Sponsors</SponsorsH4>
                    </SponorsHeader>
                    <SponsorsGrid3>
                        <SponsorsGridColLast>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColLast>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColLast>
                        <SponsorsGridColHiddenSm>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColHiddenSm>
                        <SponsorsGridColHiddenSm>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColHiddenSm>
                        <SponsorsGridColHidden>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColHidden>
                        <SponsorsGridColHidden>
                            <SponsorsH1>StackBlitz</SponsorsH1>
                        </SponsorsGridColHidden>
                    </SponsorsGrid3>
                </SponsorsLayout>
            </SponsorsContainer>
        </SponsorsWrapper>
    );
};

export default SpecialSponsors;
