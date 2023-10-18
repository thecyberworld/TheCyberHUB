// chatData.js
export const chatData = {
    channels: [
        {
            channelname: "General Chat",
            id: "1",
            messages: [
                {
                    time: "2023-10-18T10:15:00",
                    username: "Alice",
                    image: "avatar-alice.jpg",
                    message: "Hello, everyone! How's it going?",
                },
                {
                    time: "2023-10-18T10:20:00",
                    username: "Bob",
                    image: "avatar-bob.jpg",
                    message: "Hey, Alice! I'm doing great. How about you?",
                },
                {
                    time: "2023-10-18T10:20:00",
                    username: "insane22",
                    image: "avatar-bob.jpg",
                    message: "Hey, Alice! I'm doing great. How about you?",
                },
                {
                    time: "2023-10-18T10:20:00",
                    username: "Bob",
                    image: "avatar-bob.jpg",
                    message: "Hey, Alice! I'm doing great. How about you?",
                },
                // Add more messages for the General Chat channel
            ],
        },
        {
            channelname: "Help",
            id: "2",
            messages: [
                {
                    time: "2023-10-18T11:00:00",
                    username: "Charlie",
                    image: "avatar-charlie.jpg",
                    message: "I need help with a technical issue.",
                },
                {
                    time: "2023-10-18T11:10:00",
                    username: "David",
                    image: "avatar-david.jpg",
                    message: "Sure, Charlie. What's the problem you're facing?",
                },
                // Add more messages for the Help channel
            ],
        },
        // Add more channels as needed
    ],
};

export default chatData;
