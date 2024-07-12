import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownContent = styled(ReactMarkdown)`
    font-family: Inter, sans-serif;
    line-height: 1.6;
    color: #e0e0e0;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #f60;
        margin-top: 1em;
        margin-bottom: 0.5em;
        font-weight: 600;
    }

    h1 {
        font-size: 2.5em;
    }

    h2 {
        font-size: 2em;
    }

    h3 {
        font-size: 1.75em;
    }

    h4 {
        font-size: 1.5em;
    }

    h5 {
        font-size: 1.25em;
    }

    h6 {
        font-size: 1em;
    }

    p {
        margin-bottom: 10px;
    }

    ul,
    ol {
        margin-bottom: 10px;
        padding-left: 1.5em;
    }

    li {
        margin-bottom: 5px;
        list-style-type: disc;
        line-height: 1.6;
    }

    a {
        color: #4a9eff;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
            color: #f60;
        }
    }

    blockquote {
        border-left: 4px solid #f60;
        padding-left: 1em;
        margin-left: 0;
        font-style: italic;
        color: #b0b0b0;
    }

    code {
        background-color: #2a2a2a;
        padding: 0.2em 0.4em;
        border-radius: 3px;
        font-family: "Fira Code", monospace;
        font-size: 0.9em;
    }

    pre {
        overflow-x: auto;
        font-family: "Fira Code", monospace;
        font-size: 0.9em;
    }

    pre > code {
        background-color: transparent;
        border: none;
        font-family: "Fira Code", monospace;
        font-size: 0.9em;
    }

    img {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 1em;
    }

    th,
    td {
        border: 1px solid #333;
        padding: 0.5em;
        text-align: left;
    }

    th {
        background-color: #2a2a2a;
        font-weight: 600;
    }
`;

const Container = styled.div`
    display: flex;
    margin-top: 80px;
    min-height: 100vh;
    background-color: #121212;
`;

const Sidebar = styled.nav`
    width: 250px;
    background-color: #1a1a1a;
    padding: 2em;
    overflow-y: auto;
    border-right: 1px solid #333;
`;

const Content = styled.main`
    flex: 1;
    padding: 25px 50px;
    overflow-y: auto;
`;

const SidebarTitle = styled.h2`
    color: #f60;
    font-size: 1.5em;
    margin-bottom: 1em;
    font-weight: 600;
`;

const SidebarCategory = styled.div`
    margin-bottom: 1em;
`;

const SidebarCategoryTitle = styled.div`
    color: #d0d7de;
    cursor: pointer;
    padding: 0.5em;
    background-color: #252525;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #333;
    }
`;

const SidebarItem = styled.div`
    color: #d0d7de;
    cursor: pointer;
    padding: 0.5em 1em;
    margin-top: 0.5em;
    border-radius: 4px;
    transition:
        background-color 0.3s ease,
        border-left 0.3s ease;

    &:hover {
        background-color: #252525;
    }

    ${({ active }) =>
        active &&
        `
        background-color: #252525;
        font-weight: 600;
        border-left: 3px solid #ff6600;
    `}
`;

const ContentTitle = styled.h1`
    color: #fff;
    font-size: 2.5em;
    margin-bottom: 0.5em;
    font-weight: 700;
`;
const CodeBlock = ({ language, value }) => {
    return (
        <SyntaxHighlighter language={language} style={atomDark}>
            {value}
        </SyntaxHighlighter>
    );
};

const RightSidebar = styled.aside`
    width: 250px;
    background-color: #1e1e1e;
    padding: 20px;
    overflow-y: auto;
`;

// const ContentSection = styled.section`
//     margin-bottom: 30px;
// `;

// const SectionTitle = styled.h2`
//     color: #ff6600;
//     margin-bottom: 10px;
//     font-size: 22px;
// `;

const TableOfContents = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const TOCItem = styled.li`
    margin-bottom: 8px;
    cursor: pointer;
    color: ${(props) => (props.active ? "#ff6600" : "#e0e0e0")};

    &:hover {
        color: #f60;
    }
`;

const data = {
    "Generic Methodologies & Resources": {
        "External Recon Methodology": [
            {
                title: "Assets Discovery",
                content: `## Acquisitions

Find the acquisitions of the main company to identify companies inside the scope.

Steps:
1. Visit [Crunchbase](https://www.crunchbase.com/) and search for the main company
2. Click on 'acquisitions' to see other companies acquired by the main one
3. Check the Wikipedia page of the main company for acquisitions

## ASNs

Find the ASN (if any) of each company to identify IP ranges owned by each company.

> An autonomous system number (ASN) is a unique number assigned to an autonomous system (AS) by the Internet Assigned Numbers Authority (IANA). An AS consists of blocks of IP addresses which have a distinctly defined policy for accessing external networks and are administered by a single organisation but may be made up of several operators.

## Reverse DNS

Use reverse DNS lookups to find additional domain names and subdomains.

Steps:
1. Use tools like \`dig\` or online services for reverse DNS lookups
2. Analyze the results to identify new domains or subdomains

Example using \`dig\`:
\`\`\`bash
dig -x 8.8.8.8
\`\`\`

## Shodan

Use Shodan to discover internet-connected devices and potential vulnerabilities.

> Shodan is a search engine for Internet-connected devices. It can be used to find specific types of devices, identify vulnerabilities, and gather information about an organization's online presence.

Tip: Always use Shodan ethically and with proper authorization.
                `,
            },
            {
                title: "Domain Enumeration",
                content: `# Domain Enumeration

## Subdomain Enumeration

Discover subdomains associated with the target domain.

Steps:
1. Use tools like Sublist3r, Amass, or subfinder
2. Perform DNS brute-forcing
3. Check SSL/TLS certificates for additional subdomains

Example using Sublist3r:
\`\`\`bash
python sublist3r.py -d example.com
\`\`\`

## DNS Records

Analyze DNS records for valuable information.

> DNS records can reveal IP addresses, mail servers, and other services associated with a domain. Use 'dig' or online DNS lookup tools to gather this information.

Example using 'dig':
\`\`\`bash
dig example.com ANY
\`\`\`
                `,
            },
        ],
        "Pentesting Methodology": [
            {
                title: "Information Gathering",
                content: `# Information Gathering

## OSINT (Open Source Intelligence)

Collect publicly available information about the target.

Sources to check:
- Search engines (Google, Bing, etc.)
- Social media platforms
- Job postings and employee profiles
- Public records and databases

> Remember: OSINT should only be performed on publicly available information. Respect privacy and legal boundaries.

## Network Scanning

Identify live hosts and open ports on the target network.

> Use tools like Nmap to perform port scans and service detection. Be cautious of firewall and IDS/IPS systems that may detect or block scans.

Basic Nmap scan example:
\`\`\`bash
nmap -sV -p- 192.168.1.1
\`\`\`

Always ensure you have permission before scanning any network or system.
                `,
            },
            {
                title: "Vulnerability Assessment",
                content: `# Vulnerability Assessment

## Automated Scanning

Use automated tools to identify potential vulnerabilities.

Steps:
1. Run vulnerability scanners like Nessus, OpenVAS, or Nexpose
2. Analyze the results and prioritize findings

> Automated scanners can help identify known vulnerabilities quickly, but they may also produce false positives.

## Manual Testing

Perform manual checks to validate and expand on automated findings.

> Manual testing involves hands-on investigation of potential vulnerabilities, often using specialized tools and techniques for different types of systems or applications.

Tips for manual testing:
- Verify automated scan results
- Test for logic flaws that automated scanners might miss
- Use your creativity to think of unconventional attack vectors

Remember: Always obtain proper authorization before performing any security testing.
                `,
            },
        ],
    },
    "Web Application Security": {
        "OWASP Top 10": [
            {
                title: "Injection",
                content: `
# Injection

## SQL Injection

Exploit SQL injection vulnerabilities to manipulate database queries.

Steps:
1. Identify potential injection points
2. Test for SQL injection using various payloads
3. Exploit successful injections to extract data or manipulate the database

Example of a basic SQL injection payload:
\`\`\`sql
' OR '1'='1
\`\`\`

> Always use SQL injection techniques ethically and only on systems you have permission to test.

## Command Injection

Execute unauthorized commands on the host operating system.

> Command injection vulnerabilities occur when user input is incorrectly sanitized before being used in system commands. This can lead to arbitrary command execution on the server.

Example of a potential command injection:
\`\`\`bash
; ls -la
\`\`\`

Remember to sanitize all user inputs and use parameterized queries to prevent injection vulnerabilities.
                `,
            },
            {
                title: "Broken Authentication",
                content: `
# Broken Authentication

## Session Management

Exploit weaknesses in session handling and management.

Steps:
1. Analyze session token generation and handling
2. Test for session fixation vulnerabilities
3. Check for insecure session storage or transmission

Tips:
- Look for predictable session IDs
- Check if session IDs are transmitted securely (e.g., using HTTPS)
- Test if session IDs are properly invalidated after logout

## Password Policies

Evaluate and exploit weak password policies.

> Weak password policies can lead to easily guessable or brute-forceable passwords. Check for minimum length requirements, complexity rules, and password reuse policies.

Best practices for password policies:
- Enforce a minimum password length (e.g., 12 characters)
- Require a mix of uppercase, lowercase, numbers, and special characters
- Implement account lockout after a certain number of failed attempts
- Use multi-factor authentication when possible

Remember: Strong password policies are crucial, but they should balance security with usability.
                `,
            },
        ],
        "API Security": [
            {
                title: "Authentication and Authorization",
                content: `
# Authentication and Authorization in APIs

## JWT Analysis

Analyze and exploit vulnerabilities in JWT implementations.

Steps:
1. Decode and inspect JWT contents
2. Test for weak signing algorithms (e.g., 'none' algorithm)
3. Attempt JWT token manipulation and forgery

Example of decoding a JWT:
\`\`\`bash
echo -n "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" | cut -d"." -f2 | base64 -d
\`\`\`

## OAuth 2.0 Vulnerabilities

Identify and exploit misconfigurations in OAuth 2.0 implementations.

> Common OAuth 2.0 vulnerabilities include improper implementation of authorization codes, insecure storage of tokens, and inadequate scope validation.

Key areas to check:
- Proper implementation of state parameter to prevent CSRF
- Secure storage and transmission of tokens
- Proper validation of redirect URIs

Tip: Always use HTTPS for all OAuth 2.0 communications to prevent token interception.
                `,
            },
        ],
    },
    "Network Security": {
        "Network Protocols": [
            {
                title: "TCP/IP Suite",
                content: `
# TCP/IP Suite Vulnerabilities

## ARP Spoofing

Perform ARP spoofing attacks to intercept network traffic.

Steps:
1. Use tools like Ettercap or Bettercap to conduct ARP spoofing
2. Capture and analyze intercepted traffic
3. Implement mitigations such as static ARP entries or ARP spoofing detection

Example using arpspoof:
\`\`\`bash
arpspoof -i eth0 -t 192.168.1.2 192.168.1.1
\`\`\`

> ARP spoofing can be used for man-in-the-middle attacks. Always obtain proper authorization before performing such tests.

## DNS Attacks

Exploit vulnerabilities in DNS to redirect traffic or perform cache poisoning.

> DNS attacks can include DNS spoofing, cache poisoning, and DNS tunneling. These attacks can lead to traffic redirection, data exfiltration, or command and control communication.

Common DNS attack techniques:
- DNS Cache Poisoning
- DNS Hijacking
- DNS Tunneling

Mitigation strategies:
- Implement DNSSEC
- Use secure DNS resolvers
- Regularly update DNS software
                `,
            },
        ],
        "Wireless Security": [
            {
                title: "Wi-Fi Security",
                content: `
# Wi-Fi Security

## WPA2 Cracking

Attempt to crack WPA2 passwords using captured handshakes.

Steps:
1. Capture WPA2 handshakes using tools like aircrack-ng
2. Use dictionary attacks or brute-force methods to crack the password
3. Implement strong, unique passwords and consider using WPA3 where possible

Example of capturing a handshake:
\`\`\`bash
airodump-ng -c 1 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon
\`\`\`

> Always obtain proper authorization before attempting to crack Wi-Fi passwords.

## Evil Twin Attacks

Set up rogue access points to intercept wireless traffic.

> Evil Twin attacks involve creating a malicious Wi-Fi access point that mimics a legitimate one. This can be used to intercept traffic, perform man-in-the-middle attacks, or steal credentials.

Steps to perform an Evil Twin attack:
1. Set up a rogue access point with the same SSID as the target network
2. Create a captive portal to capture credentials
3. Intercept and analyze traffic

Mitigation:
- Educate users about the risks of connecting to unknown Wi-Fi networks
- Implement 802.1X authentication
- Use VPNs for sensitive communications

Remember: Evil Twin attacks can be highly effective. Always prioritize user education and implement strong Wi-Fi security measures.
                `,
            },
        ],
    },
};

const Hacklist = () => {
    const [activeCategory, setActiveCategory] = useState(Object.keys(data)[0]);
    const [activeItem, setActiveItem] = useState(Object.keys(data[Object.keys(data)[0]])[0]);
    const [expandedCategories, setExpandedCategories] = useState({ [Object.keys(data)[0]]: true });

    const toggleCategory = (category) => {
        setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
    };

    const setActiveItemAndCategory = (category, item) => {
        setActiveCategory(category);
        setActiveItem(item);
    };

    const renderMarkdownContent = (section) => {
        if (!section || typeof section !== "object") {
            console.error("Invalid section data:", section);
            return "";
        }

        let markdown = "";

        if (Array.isArray(section)) {
            // If section is an array, iterate through its items
            section.forEach((item) => {
                markdown += `# ${item.title}\n\n`;
                if (Array.isArray(item.content)) {
                    item.content.forEach((subItem) => {
                        markdown += `## ${subItem.subtitle}\n\n`;
                        markdown += `${subItem.description}\n\n`;

                        if (subItem.steps) {
                            markdown += "Steps:\n";
                            subItem.steps.forEach((step, index) => {
                                markdown += `${index + 1}. ${step}\n`;
                            });
                            markdown += "\n";
                        }

                        if (subItem.content) {
                            markdown += `${subItem.content}\n\n`;
                        }
                    });
                } else if (typeof item.content === "string") {
                    markdown += item.content + "\n\n";
                }
            });
        } else if (typeof section.content === "string") {
            // If content is already a string, just return it
            markdown = section.content;
        } else {
            console.error("Unexpected section structure:", section);
        }

        return markdown;
    };
    return (
        <Container>
            <Sidebar>
                <SidebarTitle>HackLists</SidebarTitle>
                {Object.entries(data).map(([category, items]) => (
                    <SidebarCategory key={category}>
                        <SidebarCategoryTitle onClick={() => toggleCategory(category)}>
                            {category}
                            {expandedCategories[category] ? <FaChevronDown /> : <FaChevronRight />}
                        </SidebarCategoryTitle>
                        {expandedCategories[category] &&
                            Object.keys(items).map((item) => (
                                <SidebarItem
                                    key={item}
                                    active={activeItem === item}
                                    onClick={() => setActiveItemAndCategory(category, item)}
                                >
                                    {item}
                                </SidebarItem>
                            ))}
                    </SidebarCategory>
                ))}
            </Sidebar>

            <Content>
                <ContentTitle>{activeItem}</ContentTitle>
                <MarkdownContent
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} {...props} />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
                    }}
                >
                    {renderMarkdownContent(data[activeCategory][activeItem])}
                </MarkdownContent>
            </Content>

            <RightSidebar>
                <SidebarTitle>Table of Contents</SidebarTitle>
                <TableOfContents>
                    {data[activeCategory][activeItem].map((section, index) => (
                        <TOCItem
                            key={index}
                            onClick={() => {
                                const element = document.getElementById(`section-${index}`);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                        >
                            {section.title}
                        </TOCItem>
                    ))}
                </TableOfContents>
            </RightSidebar>
        </Container>
    );
};
export default Hacklist;
