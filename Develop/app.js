// the below links to the constructors for each applicable instance
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const eeQuestions = async (inputs = []) => {
    const prompts = [
    {
        message: "What would you like to do now?",
        type: "list",
        name: "Initial Question",
        choices: ['Enter employee', 'Quit', 'Render Information to team.html']
    },
    {
        name: 'Employee name',
        message: 'Please enter employee name: ',
        default: 'default',
        when: function( answers ) {
            return answers["Initial Question"] === 'Enter employee'
        }
    },
    {
        name: 'Employee id',
        message: 'Please enter employee id: ',
        default: '1',
        when: function( answers ) {
            return answers["Initial Question"] === 'Enter employee'
        }
    },
    {
        type: 'list',
        name: 'Employee type',
        message: "Who would you like to enter first?",
        choices: ['Manager','Engineer','Intern'],
        when: function( answers ) {
            return answers["Initial Question"] === 'Enter employee'
        }
    },
    {
        name: 'officeNumber',
        message: 'Please enter office phone number',
        when: function( answers ) {
            return answers['Employee type']==='Manager'
        }
    },
    {
        name: 'gitHub',
        message: 'Please enter gitHub account id',
        when: function( answers ) {
            return answers['Employee type']==='Engineer'
        }
    },
    {
        name: "School",
        message: 'Please enter school',
        when: function( answers ) {
            return answers['Employee type']==='Intern'
        }
    },
    {
        type: 'confirm',
        name: 'again',
        message: 'Would you like to enter more employees?',
        when: function( answers ) {
            return answers["Initial Question"] === 'Enter employee'
        }
    }
]

const {again, ...answers} = await inquirer.prompt(prompts);
const newInputs = [...inputs, answers];
return again ? eeQuestions(newInputs) : newInputs;
}

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");

const main = async () => {
    const inputs = await eeQuestions();
    console.log(inputs);
  };
  
main();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// 
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
