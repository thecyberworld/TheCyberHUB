export const crackmeLabData = [
    {
        id: 1,
        title: "Crackme Lab 1",
        description: "Crackme lab to test basic password checking.",
        code: `
your_input = ""

if your_input == "Hello_World":
    print("Good Job!")
else:
    print("Wrong Password")
    `,
        answer: "Hello_World",
        hint: "The password is a simple string.",
        solution: ["The password is 'Hello_World'."],
        language: "python",
        category: "Python",
        tags: ["Crackme", "Python", "Password"],
        level: "Beginner",
    },
    {
        id: 2,
        title: "Crackme Lab 2",
        description: "Crackme lab to test password decryption.",
        code: `
your_input = ""
password = ""
intPass = "83,117,112,101,114,83,101,99,117,114,\
101,80,97,115,115,119,111,114,100,87,104,105,99,\
104,67,97,110,116,66,101,67,114,97,99,107,101,100,\
87,105,116,104,111,117,116,66,108,97,99,107,109,97,\
103,105,99"

intPass = intPass.split(",")

for c in intPass:
    password = password + chr(int(c))

if your_input == password:
    print("Good job!")
else:
    print("Wrong password")
    `,
        answer: "SuperSecurePasswordWhichCantBeCrackedWithoutKey",
        hint: "The password is a long string.",
        solution: ["The password is 'SuperSecurePasswordWhichCantBeCrackedWithoutKey'."],
        language: "python",
        category: "Python",
        tags: ["Crackme", "Python", "Password"],
        level: "Intermediate",
    },
    {
        id: 3,
        title: "Crackme Lab 3",
        description: "Crackme lab to test reverse engineering.",
        code: `
#include <stdio.h>
#include <string.h>

int main() {
    char password[] = "p@ssw0rd";
    char input[20];

    printf("Enter password: ");
    gets(input);

    if (strcmp(input, password) == 0)
        printf("Access granted!");
    else
        printf("Access denied!");

    return 0;
}
    `,
        answer: "p@ssw0rd",
        hint: "The password is a simple string.",
        solution: ["The password is 'p@ssw0rd'."],
        language: "c",
        category: "C",
        tags: ["Crackme", "C", "Password"],
        level: "Beginner",
    },
    {
        id: 4,
        title: "Crackme Lab 4",
        description: "Crackme lab to test encryption algorithms.",
        code: `
#include <stdio.h>

int main() {
    char encrypted[] = {98, 85, 86, 116, 85, 86, 87, 122, 90, 109, 86, 117, 101, 87, 120, 100, 50, 70, 104, 90, 50, 108, 48, 97, 72, 82, 48, 90, 50, 82, 104, 99, 109, 85, 61, 0};
    char key = 'k';
    int i;

    for (i = 0; encrypted[i] != '\0'; ++i) {
        encrypted[i] = encrypted[i] ^ key;
    }

    printf("Decrypted string: %s", encrypted);
    return 0;
}
    `,
        answer: "Hello, World! This is a secret message.",
        hint: "The message is a simple string.",
        solution: ["The message is 'Hello, World! This is a secret message.'"],
        language: "c",
        category: "C",
        tags: ["Crackme", "C", "Encryption"],
        level: "Advanced",
    },
    {
        id: 5,
        title: "Crackme Lab 5",
        description: "Crackme lab to test buffer overflow vulnerability.",
        code: `
#include <stdio.h>
#include <string.h>

void vulnerableFunction(char *input) {
    char buffer[10];
    strcpy(buffer, input);
}

int main() {
    char input[20];
    printf("Enter your input: ");
    gets(input);
    vulnerableFunction(input);
    printf("Input processed successfully.\n");
    return 0;
}
    `,
        answer: "A" * 11,
        hint: "The input is a string of length 11.",
        solution: ["The input is 'A' * 11."],
        language: "c",
        category: "C",
        tags: ["Crackme", "C", "Buffer Overflow"],
        level: "Intermediate",
    },
    {
        id: 6,
        title: "Crackme Lab 6",
        description: "Crackme lab to test SQL injection vulnerability.",
        code: `
import sqlite3

def authenticate(username, password):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    c.execute(query)
    result = c.fetchone()
    conn.close()
    return result

def main():
    username = input("Enter username: ")
    password = input("Enter password: ")
    result = authenticate(username, password)
    if result:
        print("Authentication successful.")
    else:
        print("Authentication failed.")

if __name__ == "__main__":
    main()
    `,
        answer: "admin'--",
        hint: "The username is a simple string.",
        solution: ["The username is 'admin'."],
        language: "python",
        category: "Python",
        tags: ["Crackme", "Python", "SQL Injection"],
        level: "Intermediate",
    },
];
