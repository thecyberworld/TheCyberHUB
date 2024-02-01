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
                        link: "labs/lab2",
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
        title: "Advanced XSS Techniques",
        desc: [
            {
                title: "Introduction",
                content:
                    "Explore advanced XSS techniques that go beyond the basics. This topic covers sophisticated methods for exploiting and defending against cross-site scripting vulnerabilities...",
                labs: [
                    {
                        title: "Polyglot XSS",
                        content: "Lab content for Polyglot XSS",
                        level: "Advanced",
                        link: "labs/advanced/polyglot",
                    },
                    {
                        title: "AngularJS Sandbox Escape",
                        content: "Lab content for AngularJS Sandbox Escape",
                        level: "Advanced",
                        link: "labs/advanced/angularjs",
                    },
                ],
            },
            {
                title: "Filter Bypass Techniques",
                content: "Learn various filter bypass techniques to execute XSS payloads in restricted environments...",
            },
            {
                title: "Client-Side Template Injection",
                content: "Understand client-side template injection vulnerabilities and exploitation techniques...",
            },
            {
                title: "Beyond the Browser",
                content:
                    "Explore XSS scenarios that go beyond traditional browser-based attacks, including server-side XSS and other vectors...",
            },
        ],
        tags: ["XSS", "Web Security", "Advanced"],
        level: "Advanced",
        category: "XSS",
    },
    {
        id: 3,
        title: "Introduction to CSRF",
        desc: [
            {
                title: "Overview",
                content:
                    "Cross-site request forgery (CSRF) is a type of web security vulnerability that allows an attacker to induce users to perform actions that they do not intend to perform...",
                labs: [
                    {
                        title: "CSRF Lab 1",
                        content: "Lab content for CSRF Lab 1",
                        level: "Beginner",
                        link: "labs/csrf/lab1",
                    },
                    {
                        title: "CSRF Lab 2",
                        content: "Lab content for CSRF Lab 2",
                        level: "Beginner",
                        link: "labs/csrf/lab2",
                    },
                ],
            },
            {
                title: "How CSRF Works",
                content:
                    "CSRF attacks target state-changing requests, not theft of data, since the attacker has no way to see the response to the forged request...",
            },
            {
                title: "Consequences",
                content:
                    "Successful CSRF attacks can have serious consequences. For example, a victim can be tricked into changing their email address or password...",
            },
            {
                title: "Mitigation",
                content:
                    "To mitigate CSRF vulnerabilities, web developers need to implement secure coding practices and use security mechanisms such as SameSite cookies and CSRF tokens...",
            },
            {
                title: "Importance",
                content:
                    "Understanding CSRF is crucial for web developers, security professionals, and system administrators to safeguard web applications against these common and potentially devastating attacks...",
            },
        ],
        tags: ["CSRF", "Web Security", "JavaScript"],
        level: "Beginner",
        category: "CSRF",
    },
    {
        id: 4,
        title: "Advanced CSRF Techniques",
        desc: [
            {
                title: "Introduction",
                content:
                    "Explore advanced CSRF techniques that go beyond the basics. This topic covers sophisticated methods for exploiting and defending against cross-site request forgery vulnerabilities...",
                labs: [
                    {
                        title: "CSRF Lab 3",
                        content: "Lab content for CSRF Lab 3",
                        level: "Advanced",
                        link: "labs/advanced/csrf3",
                    },
                    {
                        title: "CSRF Lab 4",
                        content: "Lab content for CSRF Lab 4",
                        level: "Advanced",
                        link: "labs/advanced/csrf4",
                    },
                ],
            },
            {
                title: "CSRF with Flash",
                content: "Learn how to exploit CSRF vulnerabilities using Adobe Flash...",
            },
            {
                title: "CSRF with JSONP",
                content: "Learn how to exploit CSRF vulnerabilities using JSONP...",
            },
            {
                title: "CSRF with CORS",
                content: "Learn how to exploit CSRF vulnerabilities using CORS...",
            },
            {
                title: "CSRF with XHR",
                content: "Learn how to exploit CSRF vulnerabilities using XHR...",
            },
        ],
        tags: ["CSRF", "Web Security", "Advanced"],
        level: "Advanced",
        category: "CSRF",
    },
];

export default topics;
