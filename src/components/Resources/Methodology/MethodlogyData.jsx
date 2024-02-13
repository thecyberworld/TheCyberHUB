export const MethodologyData = {
    "Infrastructure & DevOps Testing": {
        Description:
            "Prior to testing the application itself, our team of researchers will conduct a comprehensive assessment of the security measures in place for the cloud infrastructure hosting the application, as well as any supporting technology implemented as part of Development Operations.",
        Topics: {
            "Reverse Proxy Testing": {
                "Abusing Hop Headers": {
                    Summary:
                        "Adding known Hop-by-Hop Headers to the " +
                        "Connection:" +
                        " header values can force misconfigured reverse-proxy servers and/or load balancers to remove these Hop-by-Hop Headers, producing unpredictable responses.",
                    Goals: [
                        "Bypass access controls",
                        "Fingerprint back-end technology/services",
                        "Infer valuable information about how the application processes requests.",
                        "Produce error messages",
                        "Bypass WAF (or other defense mechanisms)",
                    ],
                },
                "Web Cache Poisoning": {
                    Summary:
                        "Web Cache Poisoning occurs when the attacker forces the web cache to store malicious content and serve that malicious content to victim clients. Web Cache Poisoning is more a means of delivering attacks instead of an attack itself, and can be used to build impact for vulnerabilities like XSS.",
                    Goals: [
                        "Force the application to send a response that includes a dangerous payload (Ex: XSS).",
                        "Cache the malicious response and force the victim to access the malicious response from the web cache.",
                    ],
                },
                "Web Cache Deception": {
                    Summary:
                        " Web Cache Deception occurs when the attacker forces the web cache to store sensitive content belonging to another user in the cache, allowing the attacker to retreive that sensitive data.",
                    Goals: [
                        "Access the sensitive information of other users by forcing the web cache to store and serve a page with sensitive data.",
                    ],
                },
                "HTTP Request Smuggling": {
                    Summary:
                        "HTTP Request Smuggling occurs when the attacker sends a specially crafted request that causes the front-end proxies and back-end servers to desynchronize. This vulnerability occurs when the front-end proxies interpret the request as a single request while the back-end servers interpret it as two separate requests (or vice versa).",
                    Goals: [
                        "Byass front-end security controls (Ex: Access /admin endpoint that would normally return a 403)",
                        "Reveal changes the front-end makes to incoming requests",
                        "Capture the requests of other users",
                        "Increase the impact of reflected XSS by using HTTP request smuggling to deliver the XSS payload",
                        "Increase the impact of an internal open-redirect to a wide-open redirect",
                        "Leverage HTTP request smuggling to perform web cache poisoning/deception",
                    ],
                },
                "H2C Smuggling": {
                    Summary:
                        "HTTP/2 cleartext (h2c) is a variant of the HTTP/2 protocol that doesn't use encryption, allowing for faster communication but without the security benefits of HTTPS. It's generally used in situations where security isn't a primary concern, although its use is less recommended due to potential vulnerabilities. \nUsing H2C Smuggling, the attacker exploits a misconfiguration in the Reverse Proxy to establish a malicious H2C connection. This connection allows the attacker to bypass security controls implemented in the reverse proxy, most notably Access Controls and Web Application Firewall (WAF) Rules.",
                    Goals: [
                        "Bypass security controls (Ex: Access /admin endpoint that would normally return a 403)",
                        "Bypass Web Application Firewall (WAF) Rules",
                        "Access Internal/Privileged Web Applications",
                        "Reveal changes the front-end makes to incoming requests",
                        "Capture the requests of other users",
                        "Increase the impact of reflected XSS by using HTTP request smuggling to deliver the XSS payload",
                        "Increase the impact of an internal open-redirect to a wide-open redirect",
                        "Leverage HTTP request smuggling to perform web cache poisoning/deception",
                    ],
                },
                "XSLT Server-Side Injection": {
                    Summary:
                        " Extensible Stylesheet Language Transformations (XSLT) is a programming language used for transforming and manipulating XML documents into different formats, such as HTML, text, or other XML structures. It enables developers to define templates and rules to extract and rearrange data from XML documents, facilitating the conversion of data between different representations. \n The most used frameworks are: Libxslt (Gnome), Xalan (Apache) and Saxon (Saxonica).\n If an attacker is able to inject malicious XSL tags into a response from a web application that uses XSLT, they can exploit this mechanism to access sensitive files or even execute malicious commands on the target server.",
                    Goals: [
                        "Force the target server to make unintended HTTP requests, resulting in a Server-Side Request Forgery (SSRF)",
                        "Read the contents of sensitive files on the target server",
                        "Infer valuable information about how the application processes requests.",
                        "Execute arbitrary commands on the target server, gaining Remote Code Execution (RCE)",
                    ],
                },
                "Edge Side Inclusion (ESI) Injection": {
                    Summary:
                        "Edge-Side Includes (ESI) is a web acceleration standard that enables dynamic content assembly at the edge of a content delivery network (CDN). It allows different components of a web page to be fetched and combined in real-time from various sources, improving page load times and reducing the load on the origin server. \n Edge Side Includes (ESI) requests are processed by a content delivery network (CDN) server, specifically at the Load Balancers of the CDN. If an attacker is able to inject an ESI element into a response from a web application that uses ESI, they can exploit this mechanism to access sensitive files or even execute malicious commands on the target server.",
                    Goals: [
                        "Steal valid cookies from a target victim to gain privilege escalation and/or unauthorized access to the victim's account",
                        "Read Environmental Variables used on the target server",
                        "Read the contents of sensitive files on the target server",
                        "Execute arbitrary commands on the target server, gaining Remote Code Execution (RCE)",
                    ],
                },
                "Host Header Poisoning": {
                    Summary:
                        "Adding known Hop-by-Hop Headers to the " +
                        "Connection:" +
                        " header values can force misconfigured reverse-proxy servers and/or load balancers to remove these Hop-by-Hop Headers, producing unpredictable responses.",
                    Goals: [
                        "Bypass access controls",
                        "Fingerprint back-end technology/services",
                        "Infer valuable information about how the application processes requests.",
                        "Produce error messages",
                        "Bypass WAF (or other defense mechanisms)",
                    ],
                },
                "IP Address Spoofing": {
                    Summary:
                        " Edge-Side Includes (ESI) is a web acceleration standard that enables dynamic content assembly at the edge of a content delivery network (CDN). It allows different components of a web page to be fetched and combined in real-time from various sources, improving page load times and reducing the load on the origin server.\n            Edge Side Includes (ESI) requests are processed by a content delivery network (CDN) server, specifically at the Load Balancers of the CDN. If an attacker is able to inject an ESI element into a response from a web application that uses ESI, they can exploit this mechanism to access sensitive files or even execute malicious commands on the target server.",
                    Goals: [
                        "Steal valid cookies from a target victim to gain privilege escalation and/or unauthorized access to the victim's account",
                        "Read Environmental Variables used on the target server",
                        "Read the contents of sensitive files on the target server",
                        "Execute arbitrary commands on the target server, gaining Remote Code Execution (RCE)",
                    ],
                },
            },
            "Cloud-Specific Testing": {
                "AWS S3 Bucket Misconfiguration": {
                    Summary:
                        " Amazon S3 buckets are scalable and secure storage containers in Amazon Web Services that store and manage data, files, and objects, accessible via unique URLs.",
                    Goals: [
                        "Read sensitive data stored on the S3 bucket",
                        "Upload malicious files to the S3 bucket",
                        "Modify the contents of critical data stored on the S3 bucket",
                        "Delete critical data/files stored on the S3 bucket",
                        "Exfiltrate backup files containing sensitive data",
                        "Enumerate hidden S3 bucket names",
                    ],
                },
                "AWS CloudFront Misconfiguration": {
                    Summary:
                        " AWS CloudFront is a content delivery service provided by Amazon Web Services in collaboration with Cloudflare, designed to distribute and accelerate content, videos, applications, and APIs to users globally with low latency and high transfer speeds.",
                    Goals: [
                        "Deliver content from a malicious AWS CloudFront instance owned by the attacker, taking advantage of an old DNS record to gain a Subdomain Takeover.",
                    ],
                },
                "AWS IAM/STS Misconfiguration": {
                    Summary:
                        "AWS IAM (Identity and Access Management) is a service that controls access to AWS resources by managing users, groups, permissions, and authentication. AWS STS (Security Token Service) is a service that provides temporary credentials for accessing AWS resources, helping to enhance security by minimizing the exposure of long-term credentials. AWS IAM sets up user identities and their permissions, while AWS STS issues temporary security tokens to these authenticated users, ensuring secure and limited access to resources without requiring long-term credentials.",
                    Goals: ["Enumerate cross account roles and users without proper authentication/authorization"],
                },
                "AWS Elastic Beanstalk Misconfiguration": {
                    Summary:
                        " AWS Elastic Beanstalk is a Platform-as-a-Service (PaaS) that simplifies the deployment and management of web applications and services. It automatically handles the underlying infrastructure, such as provisioning, scaling, load balancing, and application health monitoring, allowing developers to focus solely on their code.",
                    Goals: [
                        "Gain public access to internal Elastic Beanstalk instances",
                        "Bypass security/access controls configured through the Elastic Beanstalk",
                        "Access application code stored on public S3 buckets in Elastic Beanstalk applications",
                    ],
                },
                "AWS API Gateway Misconfiguration": {
                    Summary:
                        "AWS API Gateway is a managed service that enables the creation, deployment, and management of RESTful APIs to securely connect and expose backend services and functions for applications.",
                    Goals: [
                        "Bypass restrictions on API endpoints by abusing logic flaws in the IAM Syntax for access controls",
                    ],
                },
                "AWS Cognito Misconfiguration": {
                    Summary:
                        "AWS Cognito is a fully managed service that provides authentication, authorization, and user management for web and mobile applications. It allows developers to easily add user sign-up and sign-in functionality, as well as integrate with third-party identity providers like Google, Facebook, and Amazon.",
                    Goals: [
                        "Enumerate Identity Pool IDs, which can be relatively easy to find, to exploit IAM roles assigned to both unauthenticated users and authenticated users accessing the Identity Pool, allowing them to abuse the associated privileges.",
                    ],
                },
                "AWS Exposed Sensitive DocumentDB": {
                    Summary:
                        " AWS DocumentDB is a fully managed, scalable NoSQL database service compatible with MongoDB, designed to provide high performance and availability for storing, querying, and managing document-oriented data.",
                    Goals: ["Establish an unauthorized connection to a misconfigured instance of DocumentDB"],
                },
                "AWS EC2 Misconfiguration": {
                    Summary:
                        " An AWS EC2 (Elastic Compute Cloud) instance is a virtual server within Amazon Web Services that allows users to rent scalable computing resources, such as processing power and memory, to run applications and services on-demand in the cloud",
                    Goals: [
                        "Download the Amazon Machine Image (AMI) file of a misconfigured private EC2",
                        "Brute-force Public URL Templates to potentially bypass security controls",
                        "Enumerate private EC2 instances misconfigured with a public IP address",
                    ],
                },
                "AWS SNS Misconfiguration": {
                    Summary:
                        " AWS SNS (Simple Notification Service) is a fully managed messaging service that enables the sending of notifications and alerts to a variety of endpoints, such as email, SMS, and application endpoints.",
                    Goals: ["Bypass access control restrictions to Publish or Subscribe to an internal SNS topic"],
                },
                "AWS RDS Misconfiguration": {
                    Summary:
                        " AWS RDS (Relational Database Service) is a cloud service that simplifies database management by handling tasks like setup, scaling, and maintenance for various relational",
                    Goals: [
                        "Establish an unauthorized connection to a misconfigured RDS instance",
                        "Enumerate and download internal/sensitive RDS snapshots",
                    ],
                },
            },
            "Web Server Testing": {
                "Common Vulnerabilities and Exposures (CVE's)": {
                    Summary:
                        "CVE stands for Common Vulnerabilities and Exposures. It is a system used to identify and reference publicly known information security vulnerabilities and exposures. In essence, CVEs are used to track and catalog vulnerabilities in various software systems, hardware devices, and other technological components that can potentially be exploited by attackers. Of the over 200,000 registered CVE's, thousands are known to effect common web applications used today.",
                    Goals: [
                        "Unauthorized access to systems or networks.",
                        "Theft of sensitive data, such as personal and financial information.",
                        "Execution of ransomware to encrypt victim's data and demand a ransom.",
                        "Gain control over compromised systems for malicious purposes.",
                        "Escalation of privileges within a compromised system.",
                        "Launch distributed denial of service (DDoS) attacks to disrupt services.",
                        "Delivery of malware payloads through vulnerabilities.",
                        "Establishment of stealthy backdoors for persistent access.",
                        "Access to privileged accounts and critical information.",
                        "Disruption of systems through crashes or instability.",
                        "Reconnaissance of target networks for planning further attacks.",
                        "Propagation to interconnected systems for wider influence.",
                        "Financial gain through unauthorized access to financial systems.",
                        "Theft of intellectual property and proprietary software.",
                        "Espionage for political, economic, or military intelligence.",
                    ],
                },
                "Exposed Configuration Files": {
                    Summary:
                        "Configuration files are employed by web servers to define parameters and behaviors, allowing administrators to tailor the server's operations and establish security measures for how the server interfaces with its surroundings. Misconfigurations on the web server can cause these files to be publicly accessible, providing a wealth of valuable information to attackers.",
                    Goals: [
                        "Exfiltrate database connection strings or credentials from database configuration files like application.properties",
                        "Read sensitive data stored in environmental variable files like env.js or .env",
                        "Exploit logic flaws to bypass security controls implemented in the web server's routing configured in files like httpd.conf or .htaccess",
                        "Files with encryption keys, certificates, and decryption configurations in files like keystore.jks or openssl.cnf",
                    ],
                },
                "Server Side Includes (SSI) Injection": {
                    Summary:
                        "Server Side Includes (SSI) is a web server technology that enables the embedding of dynamic content within web pages. It allows for the inclusion of external files or data into the HTML output, facilitating easier site-wide updates and content reuse. \n If an attacker is able to injection HTML content into a web application that uses SSI, they can exploit this mechanism to access sensitive files or even execute malicious commands on the target server.",
                    Goals: [
                        "Read or set Environmental Variables used on the target server",
                        "Read the contents of sensitive files on the target server",
                        "Execute arbitrary commands on the target server, gaining Remote Code Execution (RCE)",
                    ],
                },
                "Information Disclosure": {
                    Summary:
                        "Some web servers are configured with custom rulesets that can cause information valuable to an attacker to leak in HTTP responses returned to the client.",
                    Goals: [
                        "Exfiltrate a fraction of the directory structure and source code through stack traces",
                        " Exfiltrate hard-coded credentials from source code",
                        "Identify version numbers associated with known CVE's",
                        "Exfiltrate sensitive or valuable information through verbose custom error messaging",
                    ],
                },
            },
            "Domain Name System (DNS) Testing": {
                "DNS Rebinding": {
                    Summary:
                        "DNS rebinding is a technique where an attacker tricks a victim's browser into making requests to a malicious website's domain that resolves to the attacker's controlled IP address initially and later changes to a victim's local network address. This enables the attacker to bypass the browser's same-origin policy and potentially interact with local network devices or services.",
                    Goals: [
                        "Bypass the same-origin policy, allowing an attacker to access or manipulate resources on a victim's local network, potentially compromising security and privacy.",
                        "Exploit vulnerabilities in network-connected devices or services running on the victim's network.",
                    ],
                },
                "Subdomain Takeover": {
                    Summary:
                        "A subdomain takeover attack occurs when an attacker identifies a dormant or unclaimed subdomain pointing to a third-party service (like a cloud provider), and then gains control of that service. By doing so, the attacker can potentially manipulate the subdomain's content or abuse its trust relationships for malicious purposes.",
                    Goals: [
                        "Leverage the compromised subdomain to carry out sophisticated and highly effective phishing campaigns",
                        "Inject malicious content into any web application that utilizes the subdomain",
                        "Steal valid session cookies from user accounts on any web application that utilizes the compromised subdomain",
                        "Register a malicious MX Record to an external mail server to carry out sophisticated and highly effective phishing campaigns",
                    ],
                },
            },
        },
    },
};
