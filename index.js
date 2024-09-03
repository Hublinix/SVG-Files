const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Circle, Square} = require("./lib/shape");

function writetoFile (fileName, answers) {
    let svgString = "";
    svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgString += "<g>";

    let shapeChoice;
    if (answers.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString +=`<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === "Square") {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }

    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";

    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Logo.svg is made");
    })
}

function promptUser() {
    inquirer
      .prompt([
        {
          type: "input",
          message:
            "Enter text display",
          name: "text",
        },
        {
          type: "input",
          message:
            "Choose textcolor",
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
            "Choose the shape's color",
          name: "shapeBackgroundColor",
        },
      ])
      .then((answers) => {
        if (answers.text.length > 3) {
          console.log("Must enter a value of no more than 3 characters");
          promptUser();
        } else {
          writetoFile("logo.svg", answers);
        }
      });
  }
  
  promptUser();