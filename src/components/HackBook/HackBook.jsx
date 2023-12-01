// import React from "react";
// import MarkdownPage from "./MarkdownPage";
// import {Wrapper} from "../Dashboard/Profile/ProfileElements";
// import {
//     ContentData,
//     ContentNav,
//     ContentNavData,
//     HackBookContainer,
//     HackBookHeading,
//     HackBookTitle,
//     LI,
//     UL
// } from "./HackBookElements";
// // import {DotSymbol} from "../Homepage/Info/InfoElements";
// import {RoadmapDetails, RoadmapDetailsCard} from "../Learn/Roadmaps/RoadmapElements";
//
// const HackBook = () => {
//     const [selectedFile, setSelectedFile] = React.useState('How-to-start-hacking.md');
//     const [selectedDir, setSelectedDir] = React.useState('Hacking');
//
//     const handleFile = (dirName, fileName) => {
//         setSelectedFile(fileName);
//         setSelectedDir(dirName)
//     };
//
//     console.log(selectedDir, selectedFile)
//
//     const hackBookData = {
//         "Hacking": [
//             "how-to-start-hacking.md",
//             "how-to-start-hacking-2.md"
//         ],
//         "Hacking1": [
//             "how-to-start-hacking.md",
//             "how-to-start-hacking-2.md"
//         ],
//         "Hacking2": [
//             "how-to-start-hacking.md",
//             "how-to-start-hacking-2.md"
//         ],
//         "Hacking3": [
//             "how-to-start-hacking.md",
//             "how-to-start-hacking-2.md"
//         ],
//     };
//
//     return (<Wrapper style={{
//         padding: "0",
//         margin: "80px 0 0 0"
//     }}>
//         <HackBookContainer key={1}>
//             <ContentNav>
//                 <HackBookTitle> HackBook </HackBookTitle>
//                 <ContentNavData>
//                     {Object.keys(hackBookData).map((dirName,id) => (
//                         <RoadmapDetails style={{padding: "5px"}} key={id}>
//                             <HackBookHeading>{dirName}</HackBookHeading>
//                             <UL key={dirName}>
//                                 {hackBookData[dirName].map((fileName, id) => (
//                                     <RoadmapDetailsCard>
//                                         {/*<DotSymbol/>*/}
//                                         <LI key={id} onClick={() => handleFile(dirName, fileName)}>
//                                             {fileName}
//                                         </LI>
//                                     </RoadmapDetailsCard>
//                                 ))}
//                             </UL>
//                         </RoadmapDetails>
//                     ))}
//                 </ContentNavData>
//             </ContentNav>
//             <ContentData>
//                 <MarkdownPage dirName={selectedDir} fileName={selectedFile}/>
//             </ContentData>
//         </HackBookContainer>
//     </Wrapper>);
// };
//
// export default HackBook;
