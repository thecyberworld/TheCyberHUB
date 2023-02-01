import React from "react";
import { ScrollButton, RedirectButton, RouterButton } from "../../Other/MixComponents/Buttons/ButtonElements";
import {
    BtnWrap,
    Column1,
    Column2,
    Heading,
    Img,
    ImgWrap,
    InfoContainer,
    InfoRow,
    InfoWrapper,
    Subtitle,
    TextWrapper,
    TopLine,
} from "./InfoElements";

const InfoSection = ({
    id,
    buttonType1,
    buttonType2,
    link1,
    link2,
    lightBg,
    lightText,
    topLine,
    headline,
    description,
    buttonLabel1,
    buttonLabel2,
    imgStart,
    img,
    alt,
    dark,
    dark2,
    primary,
    darkText,
}) => {
    return (
        <>
            <InfoContainer id={id} lightBg={lightBg}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine> {topLine} </TopLine>
                                <Heading lightText={lightText}> {headline} </Heading>
                                <Subtitle darkText={darkText}> {description} </Subtitle>
                                <BtnWrap>
                                    {buttonType1 === "router" && (
                                        <RouterButton
                                            to={link1}
                                            primary={primary ? "true" : ""}
                                            dark={dark ? 1 : 0}
                                            dark2={dark2 ? 1 : 0}
                                        >
                                            {buttonLabel1}
                                        </RouterButton>
                                    )}
                                    {buttonType1 === "scroll" && (
                                        <ScrollButton
                                            to={link1}
                                            smooth={true}
                                            duration={500}
                                            spy={true}
                                            exact={"true"}
                                            offset={-80}
                                            primary={primary ? "true" : ""}
                                            dark={dark ? 1 : 0}
                                            dark2={dark2 ? 1 : 0}
                                        >
                                            {buttonLabel1}
                                        </ScrollButton>
                                    )}
                                    {buttonType1 === "redirect" && (
                                        <RedirectButton
                                            href={link1}
                                            primary={primary ? "true" : ""}
                                            dark={dark ? 1 : 0}
                                            dark2={dark2 ? 1 : 0}
                                        >
                                            {buttonLabel1}
                                        </RedirectButton>
                                    )}
                                    {buttonType2 === "router" && (
                                        <RouterButton
                                            to={link2}
                                            primary={primary ? "true" : ""}
                                            dark={dark ? 1 : 0}
                                            dark2={dark2 ? 1 : 0}
                                        >
                                            {buttonLabel2}
                                        </RouterButton>
                                    )}
                                    {buttonType2 === "scroll" && (
                                        <ScrollButton
                                            to={link2}
                                            smooth={true}
                                            duration={500}
                                            spy={true}
                                            exact={"true"}
                                            offset={-80}
                                            primary={primary ? "true" : ""}
                                            dark={dark ? 1 : 0}
                                            dark2={dark2 ? 1 : 0}
                                        >
                                            {buttonLabel2}
                                        </ScrollButton>
                                    )}
                                    {buttonType2 === "redirect" && (
                                        <RedirectButton
                                            href={link2}
                                            primary={primary ? "true" : ""}
                                            dark={dark ? 1 : 0}
                                            dark2={dark2 ? 1 : 0}
                                        >
                                            {buttonLabel2}
                                        </RedirectButton>
                                    )}
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img} alt={alt} />
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    );
};

export default InfoSection;
