export const functionsData = [
    {
        type: "shell",
        label: "Shell",
        description:
            "It can be used to break out from restricted environments by spawning an interactive system shell.",
    },
    {
        type: "command",
        label: "Command",
        description:
            "It can be used to break out from restricted environments by running non-interactive system commands.",
    },
    {
        type: "reverse-shell",
        label: "Reverse shell",
        description: "It can send back a reverse shell to a listening attacker to open a remote network access.",
    },
    {
        type: "non-interactive-reverse-shell",
        label: "Non-interactive reverse shell",
        description:
            "It can send back a non-interactive reverse shell to a listening attacker to open a remote network access.",
    },
    {
        type: "bind-shell",
        label: "Bind shell",
        description: "It can bind a shell to a local port to allow remote network access.",
    },
    {
        type: "non-interactive-bind-shell",
        label: "Non-interactive bind shell",
        description: "It can bind a non-interactive shell to a local port to allow remote network access.",
    },
    {
        type: "file-upload",
        label: "File upload",
        description: "It can exfiltrate files on the network.",
    },
    {
        type: "file-download",
        label: "File download",
        description: "It can download remote files.",
    },
    {
        type: "file-write",
        label: "File write",
        description:
            "It writes data to files, it may be used to do privileged writes or write files outside a restricted file system.",
    },
    {
        type: "file-read",
        label: "File read",
        description:
            "It reads data from files, it may be used to do privileged reads or disclose files outside a restricted file system.",
    },
    {
        type: "library-load",
        label: "Library load",
        description: "It loads shared libraries that may be used to run code in the binary execution context.",
    },
    {
        type: "suid",
        label: "SUID",
        description:
            "If the binary has the SUID bit set, it does not drop the elevated privileges and may be abused to access the file system, escalate or maintain privileged access as a SUID backdoor. If it is used to run `sh -p`, omit the `-p` argument on systems like Debian (<= Stretch) that allow the default `sh` shell to run with SUID privileges. This example creates a local SUID copy of the binary and runs it to maintain elevated privileges. To interact with an existing SUID binary skip the first command and run the program using its original path.",
    },
    {
        type: "sudo",
        label: "Sudo",
        description:
            "If the binary is allowed to run as superuser by `sudo`, it does not drop the elevated privileges and may be used to access the file system, escalate or maintain privileged access.",
    },
    {
        type: "capabilities",
        label: "Capabilities",
        description:
            "If the binary has the Linux `CAP_SETUID` capability set or it is executed by another binary with the capability set, it can be used as a backdoor to maintain privileged access by manipulating its own process UID.",
    },
    {
        type: "limited-suid",
        label: "Limited SUID",
        description:
            "If the binary has the SUID bit set, it may be abused to access the file system, escalate or maintain access with elevated privileges working as a SUID backdoor. If it is used to run commands (e.g., via `system()`-like invocations) it only works on systems like Debian (<= Stretch) that allow the default `sh` shell to run with SUID privileges. This example creates a local SUID copy of the binary and runs it to maintain elevated privileges. To interact with an existing SUID binary skip the first command and run the program using its original path.",
    },
];
