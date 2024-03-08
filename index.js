// npm init -y
// npm i inquirer@8.2.4
// npm i jest
// node index.js
// inquirer
// fs
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes
// To insert a shape, you create an element in the document. 
// Different elements correspond to different shapes and take different parameters to describe the size and position of those shapes.
// The package.json file is used by npm to learn about your node.js project. Use npm init to generate package.json files for you!

const inquirer = require("inquirer");

const fs = require("fs");

const { Triangle, Square, Circle } = require("./lib/shapes");

// Function writes the SVG file using answers from inquirer prompts
function writeToFile(fileName, answers) {
    // File starts as an empty string allowing user to customize
    let svgString = "";
    // Sets width & height of logo container base (shapes have their own custom values )
    svgString =
        '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    // <g> first for shape/color, <text> inside of <g> so that text appears on top of shape
    svgString += "<g>";
    // Takes user input for shape choice and inserts it into SVG file
    svgString += `${answers.shape}`;

    // If statement for three different shape options
    // Custom user input (array) + polygon properties (specific to each shape) + color = svgString (svgString is inside function writeToFile that generates the SVG - svgString has base properties for the svg file)

    let shapeChoice;
    if (answers.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }

    // <text> (user input) inside of <g> to appear on top of shape. Color/content taken from userPrompt, font size defaulted to 40
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    // END </g> tag, 
    svgString += "</g>";
    // END </svg> tag
    svgString += "</svg>";

    //   FS generates svg file, error gets logged, or Generated logo.svg
    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Generated logo.svg");
    });
}

function userPrompt() {
    inquirer
        .prompt([

            {
                type: "input",
                message:
                    "What text would you like your logo to display? (Enter up to three characters)",
                name: "text",
            },

            {
                type: "input",
                message:
                    "Choose text color (Enter color keyword OR a hexadecimal number)",
                name: "textColor",
            },

            {
                type: "list",
                message: "What shape would you like the logo to render?",
                choices: ["Triangle", "Square", "Circle"],
                name: "shape",
            },

            {
                type: "input",
                message:
                    "Choose shapes color (Enter color keyword OR a hexadecimal number)",
                name: "shapeBackgroundColor",
            },
        ])
        .then((answers) => {
            // Error - (user must enter 3 characters or less for logo to generate)
            if (answers.text.length > 3) {
                console.log("Must enter a value of no more than 3 characters");
                userPromptser();
            } else {
                writeToFile("logo.svg", answers);
            }
        });
}

userPrompt();

// 5BC0BE
// 0B132B

// 4C1036
// C6D8FF

// B3CBB9
// 542E71