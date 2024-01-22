// topicsData.js
const topics = [
    {
        id: 1,
        title: "Introduction to XSS",
        desc: [
            {
                title: "Overview",
                content:
                    "Cross-site scripting (XSS) is a type of computer security vulnerability typically found in web applications. XSS enables attackers to inject client-side scripts into web pages viewed by other users...",
                labs: [
                    {
                        title: "Reflected XSS",
                        content: "Lab 1 content",
                        level: "Beginner",
                        link: "labs/lab1",
                    },
                    {
                        title: "Stored XSS",
                        content: "Lab 2 content",
                        level: "Beginner",
                        link: "labs/lab1",
                    },
                ],
            },
            {
                title: "Types of XSS",
                content: "XSS attacks can be classified into three main types: stored, reflected, and DOM-based...",
            },
            {
                title: "Consequences",
                content:
                    "The consequences of successful XSS attacks can be severe, ranging from theft of sensitive information to complete compromise of user accounts...",
            },
            {
                title: "Mitigation",
                content:
                    "To mitigate XSS vulnerabilities, web developers need to implement secure coding practices, validate and sanitize user input, and use security mechanisms such as Content Security Policy (CSP)...",
            },
            {
                title: "Importance",
                content:
                    "Understanding XSS is crucial for web developers, security professionals, and system administrators to safeguard web applications against these common and potentially devastating attacks...",
            },
        ],
        tags: ["XSS", "Web Security", "JavaScript"],
        level: "Beginner",
        category: "XSS",
    },
    {
        id: 2,
        title: "Introduction to SQLi",
        desc: [
            {
                title: "Overview",
                content:
                    "Cross-site scripting (XSS) is a type of computer security vulnerability typically found in web applications. XSS enables attackers to inject client-side scripts into web pages viewed by other users...",
            },
            {
                title: "Types of XSS",
                content: "XSS attacks can be classified into three main types: stored, reflected, and DOM-based...",
            },
            {
                title: "Consequences",
                content:
                    "The consequences of successful XSS attacks can be severe, ranging from theft of sensitive information to complete compromise of user accounts...",
            },
            {
                title: "Mitigation",
                content:
                    "To mitigate XSS vulnerabilities, web developers need to implement secure coding practices, validate and sanitize user input, and use security mechanisms such as Content Security Policy (CSP)...",
            },
            {
                title: "Importance",
                content:
                    "Understanding XSS is crucial for web developers, security professionals, and system administrators to safeguard web applications against these common and potentially devastating attacks...",
            },
        ],
        tags: ["XSS", "Web Security", "JavaScript"],
        level: "Beginner",
        category: "XSS",
    },
];

export default topics;
