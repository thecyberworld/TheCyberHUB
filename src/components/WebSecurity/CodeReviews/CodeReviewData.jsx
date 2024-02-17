export const codeReviewData = [
    {
        id: 1,
        title: "Python Vulnerable Code Review",
        description: "Review and understand the vulnerable Python code.",
        code: `
import os
import sys
import subprocess
    
def execute_command(command):
    try:
        output = subprocess.check_output(command, shell=True)
    except subprocess.CalledProcessError as e:
        output = e.output
    return output
        
def main():
    command = sys.argv[1]
    result = execute_command(command)
    print(result)
        
if __name__ == "__main__":
    main()
    `,
        language: "python",
        tags: ["Python", "Code Review", "Cyber Security"],
        category: "Python",
        level: "Intermediate",

        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements.",
        ],
    },
    {
        id: 2,
        title: "Javascript Vulnerable Code Review",
        description: "Review and understand the vulnerable Javascript code.",
        code: `
const express = require('express');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    const { command } = req.query;
    const exec = require('child_process').exec;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(stdout);
    });
    
    res.send('Command executed');
}

app.listen(port, () => {
    console.log(\`Server running on port \${port}\`);
});`,
        language: "javascript",
        tags: ["Javascript", "Code Review", "Cyber Security"],
        category: "Javascript",
        level: "Intermediate",

        solution: [
            "Understand the code and identify the potential security vulnerabilities.",
            "Identify the potential security risks and impacts of the code.",
            "Review the code and suggest the necessary security improvements.",
        ],
    },
];
