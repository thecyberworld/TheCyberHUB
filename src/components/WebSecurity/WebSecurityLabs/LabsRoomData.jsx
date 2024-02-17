export const RoomData = {
    "xsslab-1": {
        heading: "Basic Stored XSS Lab",
        link: "https://xss-labs.thecyberhub.org/xss1",
        Description:
            "Welcome to WebBlox, the popular online forum where users engage in discussions on a wide range of topics! In this basic Stored XSS lab, you'll explore the User Profile Page, a key feature that allows users to personalize their online presence. \n Your mission is to uncover potential vulnerabilities in the profile page's input fields and inject a harmless script to demonstrate how Stored XSS works.",
        Question: [],
        solution:
            "'Inject the following harmless script into the  section to demonstrate the stored XSS vulnerability without causing any harm:        html   Upon saving the bio, an alert box will pop up, indicating that the script was executed successfully.  Objective 2: Custom Avatar Upload a custom avatar image with the following script embedded in its metadata. This script will execute when the image is\n loaded: html Copy codeUpon viewing the profile with the custom avatar, an alert box will appear,\n showcasing the stored XSS vulnerability. Objective 3: Status Update Craft a status update with the following script embedded to demonstrate the \nstored XSS vulnerability in the  input field:html Copy code Hello, everyone! Just testing some scripting here. After posting the status update, an alert box will pop up when viewing the status, indicating the successful execution of the stored XSS script.'",
    },
};
