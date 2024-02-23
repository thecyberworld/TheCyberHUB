import styled from "styled-components";

export const AnalyticsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 100%;
`;

export const AnalyticsHeader = styled.header`
    display: flex;
    justify-content: flex-start;    
    background-color: #151414;
    border: 1px solid #151414;
    border-radius: 5px;
    color: #fff;
    padding: 20px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
`;

export const Title = styled.h1`
    color: #fff;
    text-align: center;
`;

export const TopSection = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
height: 20vw;
background-color: #151414;
border: 1px solid #151414;
border-radius: 5px;
color: #fff;
text-align: center;
padding: 20px;
`;

export const TopSectionCaption = styled.div`
display: flex;
flex-direction: row;
gap: 15px;
background-color: #151414;
border-radius: 5px;
color: #fff;
`;

export const TopSectionCaptionTitle = styled.div`
flex: 6;
display: flex;
justify-content: flex-start;
background-color: #151414;
border-radius: 5px;
color: #fff;
padding: 10px;
border: 0.5px solid grey;
`;

export const TopSectionCaptionCTABtn = styled.div`
flex: 3;
display: flex;
flex-direction: row;
gap: 15px;
background-color: #151414;
border-radius: 5px;
color: #fff;
text-align: center;
`;

export const TopSectionCaptionCTABtnBig = styled.div`
flex: 3;
border: 2px solid white;
background-color: black;
border-radius: 12px;
color: #fff;
margin: 5px;
padding: 12px;
text-align: center;
border: 0.5px solid grey;
`;

export const TopSectionMainContent = styled.div`
display: flex;
flex-direction: row;
gap: 18px;
height: 100%;
border: 1px solid #151414;
border-radius: 5px;
color: #fff;
text-align: center;
`;

export const TopSectionInnerCard = styled.div`
flex: 3;
display: flex;
justify-content: flex-start;
border: 2px solid white;
background-color: #151414;
border: 1px solid #151414;
border-radius: 5px;
color: #fff;
padding: 15px;
text-align: center;
border: 0.5px solid grey;
`;

export const BottomSection = styled.div`
height: 46vw;
display: flex;
flex-direction: row;
gap: 40px;
border-radius: 5px;
color: #fff;
text-align: center;
`;

export const BottomLeftSection = styled.div`
flex: 6;
display: flex;
justify-content: flex-start;
border: 2px solid white;
background-color: #151414;
border: 1px solid #151414;
border-radius: 5px;
color: #fff;
padding: 20px;
text-align: center;
`;

export const BottomRightSection = styled.div`
flex: 3;
display: flex;
justify-content: flex-start;
border: 2px solid white;
background-color: #151414;
border: 1px solid #151414;
border-radius: 5px;
color: #fff;
padding: 20px;
text-align: center;
`;

export const LeftSection = styled.div`
    flex: 1;
    //padding: 20px;
`;

export const RightSection = styled.div`
    flex: 1;
    //padding: 20px;
    max-width: 300px;
`;

export const Post = styled.div`
    background-color: #1c1c1c;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #eaeaea;
    border: 1px solid #151414;
    border-radius: 5px;
`;

export const SummaryItem = styled.div`
    background-color: #1c1c1c;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #eaeaea;
    border: 1px solid #151414;
    border-radius: 5px;
`;
