export const hackbookData = [
    {
        id: 1,
        title: "Account Takeovers Methodologies",
        desc: "Account takeovers are a common threat to web applications. Here are some common methodologies used to compromise user accounts.",
        methods: [
            {
                title: "Credential Stuffing",
                desc: "Use automated tools to test large numbers of username and password combinations against the target's login page. If the target's users have reused passwords from other breaches, this can lead to account takeovers.",
            },
            {
                title: "Phishing Attacks",
                desc: "Send emails or messages that impersonate a legitimate source to trick users into providing their login credentials. If successful, the attacker can use the stolen credentials to take over the victim's account.",
            },
            {
                title: "Session Hijacking",
                desc: "Steal a user's session token to impersonate them and gain unauthorized access to their account. This can be done through various methods, such as exploiting vulnerabilities in the way sessions are managed or using session cookies captured through network sniffing.",
            },
        ],
    },
];
