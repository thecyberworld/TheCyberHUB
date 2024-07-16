import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    CopyButton,
    CopyButtonSection,
    DownloadButton,
    Form,
    SubdomainFinderSpinner,
    SubdomainItem,
    SubdomainLink,
    SubdomainList,
    // Title,
} from "src/components/Tools/SubdomainFinder/SubdomainFinderElements.jsx";
import { Wrapper } from "src/components/Dashboard/Profile/ProfileElements.jsx";
import { CircleSpinner } from "react-spinners-kit";
import apiStatus from "src/features/apiStatus.jsx";
import UnderMaintenance from "src/components/Other/UnderMaintenance/UnderMaintenance.jsx";
// import { RiEarthFill } from "react-icons/ri";
import { Input } from "src/components/Blogs/BlogComments/AddCommentFormElements.jsx";
// import { GiTridentShield } from "react-icons/gi";
import { ReconageContainer } from "src/components/Tools/Reconage/ReconageElements.jsx";
// import ReconageSidebar from "src/components/Tools/Reconage/ReconageSidebar.jsx";

const Reconage = () => {
    const API_URLS = {
        subfinder: "http://localhost:5001/api/subdomains",
        urls: "http://localhost:5001/api/urls",
        technologies: "http://localhost:5001/api/technologies",
    };

    const { isApiLoading, isApiWorking } = apiStatus();
    const [domainName, setDomainName] = useState("");
    const [resultData, setResultData] = useState({ subfinder: [], urls: [], technologies: [] });
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [selectedOption, setSelectedOption] = useState("subfinder");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");

        if (!domainName) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                API_URLS[selectedOption],
                { domain: domainName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            console.log("Response Data:", response.data); // Log the response data

            // Extract the nested data for the selected option
            setResultData((prevData) => ({
                ...prevData,
                [selectedOption]: response.data || [],
            }));
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setErrorMessage(error?.response?.data?.message || "An error occurred");
            setIsLoading(false);
        }
    };

    const handleCopyToClipboard = () => {
        const textToCopy = (
            Array.isArray(resultData[selectedOption])
                ? resultData[selectedOption]
                : Object.values(resultData[selectedOption])
        )?.join("\n");
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1000);
            })
            .catch((error) => {
                console.error("Failed to copy to clipboard:", error);
            });
    };

    const handleDownloadTxtFile = () => {
        const textToDownload = (
            Array.isArray(resultData[selectedOption])
                ? resultData[selectedOption]
                : Object.values(resultData[selectedOption])
        )?.join("\n");
        const element = document.createElement("a");
        const file = new Blob([textToDownload], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = `${domainName}-${selectedOption}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        setIsDownloaded(true);
        setTimeout(() => {
            setIsDownloaded(false);
        }, 1000);
    };

    const filterResults = (data) => {
        if (!searchQuery) return data;
        return data.filter((item) => {
            const itemStr = typeof item === "string" ? item : JSON.stringify(item);
            return itemStr.toLowerCase().includes(searchQuery.toLowerCase());
        });
    };

    useEffect(() => {
        const dataToFilter = Array.isArray(resultData[selectedOption])
            ? resultData[selectedOption]
            : Object.values(resultData[selectedOption]);
        setFilteredData(filterResults(dataToFilter));
    }, [searchQuery, resultData, selectedOption]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading2(false);
        }, 100);
    }, []);

    if (isLoading2 || isApiLoading) {
        return (
            <Wrapper>
                <CircleSpinner size={25} color={"#ff6b08"} isLoading={isLoading2 || isApiLoading} />
            </Wrapper>
        );
    }

    if (!isApiWorking) return <UnderMaintenance />;

    const displayData = searchQuery
        ? filteredData
        : Array.isArray(resultData[selectedOption])
          ? resultData[selectedOption]
          : Object.values(resultData[selectedOption]);

    return (
        <ReconageContainer>
            <SubdomainFinderSpinner>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="thecyberhub.com"
                        value={domainName}
                        onChange={(e) => setDomainName(e.target.value)}
                    />
                    {!isLoading && (
                        <Button type="submit">
                            Find {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
                        </Button>
                    )}

                    {isLoading && <CircleSpinner size={25} color="#686769" />}
                </Form>

                {isError && <SubdomainList>{errorMessage}</SubdomainList>}

                <div
                    style={{
                        width: "auto",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "start",
                        gap: "10px",
                    }}
                >
                    <Button
                        type="button"
                        onClick={() => setSelectedOption("subfinder")}
                        className={selectedOption === "subfinder" ? "active" : ""}
                    >
                        Subdomains
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setSelectedOption("urls")}
                        className={selectedOption === "urls" ? "active" : ""}
                    >
                        URLs
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setSelectedOption("technologies")}
                        className={selectedOption === "technologies" ? "active" : ""}
                    >
                        Technologies
                    </Button>
                </div>
                {["subfinder", "urls", "technologies"].map((option) => (
                    <div key={option}>
                        {selectedOption === option && (
                            <SubdomainList>
                                <span>
                                    {Array.isArray(resultData[option])
                                        ? resultData[option].length
                                        : Object.keys(resultData[option]).length}
                                </span>{" "}
                                {option} found for {domainName}
                                <CopyButtonSection>
                                    {isDownloaded && <p>Downloaded!</p>}
                                    {isCopied && <p>Copied!</p>}
                                    <DownloadButton onClick={handleDownloadTxtFile} />
                                    <CopyButton onClick={handleCopyToClipboard} />
                                </CopyButtonSection>
                                <Input
                                    type="text"
                                    placeholder={`Find in ${selectedOption}`}
                                    style={{ margin: "10px 0", width: "100%" }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {Array.isArray(displayData) ? (
                                    displayData.length > 0 ? (
                                        displayData.map((item, index) => (
                                            <SubdomainList key={index}>
                                                {typeof item === "string" ? (
                                                    <SubdomainItem key={index}>
                                                        <SubdomainLink
                                                            href={item.includes("http") ? item : `http://${item}`}
                                                            target={"_blank"}
                                                        >
                                                            {item}
                                                        </SubdomainLink>
                                                    </SubdomainItem>
                                                ) : (
                                                    Object.entries(item).map(([key, value]) => (
                                                        <SubdomainItem key={key}>
                                                            <SubdomainLink
                                                                href={
                                                                    value.includes("http") ? value : `http://${value}`
                                                                }
                                                                target={"_blank"}
                                                            >
                                                                {value}
                                                            </SubdomainLink>
                                                        </SubdomainItem>
                                                    ))
                                                )}
                                            </SubdomainList>
                                        ))
                                    ) : (
                                        <p>No results found.</p>
                                    )
                                ) : (
                                    Object.entries(displayData).map(([key, value]) => (
                                        <SubdomainList key={key}>
                                            {value.map((sub, subKey) => (
                                                <SubdomainItem key={subKey}>
                                                    <SubdomainLink
                                                        href={sub.includes("http") ? sub : `http://${sub}`}
                                                        target={"_blank"}
                                                    >
                                                        {sub}
                                                    </SubdomainLink>
                                                </SubdomainItem>
                                            ))}
                                        </SubdomainList>
                                    ))
                                )}
                            </SubdomainList>
                        )}
                    </div>
                ))}
            </SubdomainFinderSpinner>
        </ReconageContainer>
    );
};

export default Reconage;
