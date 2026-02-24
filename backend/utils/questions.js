const demoQuestions = [
    {
        questionId: 1,
        text: "What does HTML stand for?",
        type: "mcq",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"],
        correctAnswer: "Hyper Text Markup Language",
        justification: "HTML is the standard markup language for documents designed to be displayed in a web browser."
    },
    {
        questionId: 2,
        text: "Which of the following is used for styling web pages?",
        type: "mcq",
        options: ["HTML", "JQuery", "CSS", "XML"],
        correctAnswer: "CSS",
        justification: "Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML."
    },
    {
        questionId: 3,
        text: "What is the output of `typeof null` in JavaScript?",
        type: "mcq",
        options: ["null", "undefined", "object", "string"],
        correctAnswer: "object",
        justification: "In JavaScript, typeof null is 'object'. This is a known bug in JavaScript, kept for legacy reasons."
    },
    {
        questionId: 4,
        text: "In React, what hook is used to manage side effects?",
        type: "fill",
        options: [],
        correctAnswer: "useEffect",
        justification: "The useEffect Hook allows you to perform side effects in your components, like data fetching, setting up a subscription, and manually changing the DOM."
    },
    {
        questionId: 5,
        text: "Which HTTP status code means 'Not Found'?",
        type: "mcq",
        options: ["200", "404", "500", "403"],
        correctAnswer: "404",
        justification: "The HTTP 404 Not Found response code indicates that the server cannot find the requested resource."
    },
    {
        questionId: 6,
        text: "What package manager is default for Node.js?",
        type: "fill",
        options: [],
        correctAnswer: "npm",
        justification: "npm is the default package manager for the JavaScript runtime environment Node.js."
    },
    {
        questionId: 7,
        text: "Which SQL clause is used to filter records?",
        type: "mcq",
        options: ["ORDER BY", "WHERE", "GROUP BY", "HAVING"],
        correctAnswer: "WHERE",
        justification: "The WHERE clause is used to filter records. It is used to extract only those records that fulfill a specified condition."
    },
    {
        questionId: 8,
        text: "What does CSS stand for?",
        type: "mcq",
        options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets",
        justification: "CSS stands for Cascading Style Sheets."
    },
    {
        questionId: 9,
        text: "Which method adds one or more elements to the end of an array and returns the new length of the array in JavaScript?",
        type: "fill",
        options: [],
        correctAnswer: "push",
        justification: "The push() method adds new items to the end of an array."
    },
    {
        questionId: 10,
        text: "In Git, command used to download a repository from GitHub to your computer?",
        type: "mcq",
        options: ["git commit", "git push", "git clone", "git pull"],
        correctAnswer: "git clone",
        justification: "git clone is a Git command line utility which is used to target an existing repository and create a clone, or copy of the target repository."
    },
    {
        questionId: 11,
        text: "What is the default port for MongoDB?",
        type: "mcq",
        options: ["27017", "3306", "5432", "8080"],
        correctAnswer: "27017",
        justification: "The default port for MongoDB is 27017."
    },
    {
        questionId: 12,
        text: "A closure is a combination of a function bundled together with references to its surrounding state (the lexical ___).",
        type: "fill",
        options: [],
        correctAnswer: "environment",
        justification: "In JavaScript, closures are created every time a function is created, at function creation time."
    },
    {
        questionId: 13,
        text: "Which protocol is used for secure communication over a computer network?",
        type: "mcq",
        options: ["HTTP", "HTTPS", "FTP", "SMTP"],
        correctAnswer: "HTTPS",
        justification: "HTTPS (Hypertext Transfer Protocol Secure) is an extension of the Hypertext Transfer Protocol (HTTP). It is used for secure communication over a computer network."
    },
    {
        questionId: 14,
        text: "What is the term for a function that calls itself?",
        type: "fill",
        options: [],
        correctAnswer: "recursion",
        justification: "Recursion is a method of solving a computational problem where the solution depends on solutions to smaller instances of the same problem. A function that calls itself is recursive."
    },
    {
        questionId: 15,
        text: "In Python, which keyword is used to define a function?",
        type: "mcq",
        options: ["function", "def", "func", "define"],
        correctAnswer: "def",
        justification: "In Python, the 'def' keyword is used to declare a function."
    },
    {
        questionId: 16,
        text: "Which NoSQL database type stores data in key-value pairs?",
        type: "mcq",
        options: ["Document", "Graph", "Key-Value", "Column-family"],
        correctAnswer: "Key-Value",
        justification: "A key-value database, or key-value store, is a data storage paradigm designed for storing, retrieving, and managing associative arrays (dictionaries / hash tables)."
    },
    {
        questionId: 17,
        text: "What is the primary language used to write iOS applications?",
        type: "fill",
        options: [],
        correctAnswer: "Swift",
        justification: "Swift is a strong and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch."
    },
    {
        questionId: 18,
        text: "Which command in Docker lists all running containers?",
        type: "mcq",
        options: ["docker run", "docker ps", "docker ls", "docker containers"],
        correctAnswer: "docker ps",
        justification: "The docker ps command lists all running containers in Docker."
    },
    {
        questionId: 19,
        text: "What is the full form of API?",
        type: "fill",
        options: [],
        correctAnswer: "Application Programming Interface",
        justification: "An application programming interface (API) is a way for two or more computer programs to communicate with each other."
    },
    {
        questionId: 20,
        text: "Which hook in React is used to pass data deeply into the component tree without having to pass props down manually at every level?",
        type: "mcq",
        options: ["useState", "useEffect", "useRef", "useContext"],
        correctAnswer: "useContext",
        justification: "context provides a way to pass data through the component tree without having to pass props down manually at every level, properly consumed with useContext."
    }
];

module.exports = demoQuestions;
