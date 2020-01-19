// the below links to the constructors for each applicable instance
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const eeQuestions = [
    {
        name: 'Employee name',
        message: 'Please enter employee name: ',
        default: 'default'
    },
    {
        name: 'Employee id',
        message: 'Please enter employee id: ',
        default: '1'
    },
    {
        type: 'list',
        name: 'Employee type',
        message: "Who would you like to enter first?",
        choices: ['Manager','Engineer','Intern']
    },
    {
        message: "Would you like to exit?",
        type: 'confirm',
        name: 'Exit',
    }
]
const specificQuestions = [
    {
        name: 'officeNumber',
        message: 'Please enter office phone number'
    },
    {
        name: 'gitHub',
        message: 'Please enter gitHub account id'
    },
    {
        name: 'School',
        message: 'Please enter school'
    }

]
const empArr = [];

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function menu () {
    inquirer
        .prompt(eeQuestions)
        .then(answers => {
            
            if (answers['Exit']) {
                process.exit(0);
            }

            else if (answers['Employee type']==='Manager') {
                 inquirer
                .prompt(specificQuestions[0])
                .then(function managerAnswers() {
                    const manager = new Manager(answers['Employee name'], answers['Employee id'], answers['Employee type'], managerAnswers);
                    empArr.push(manager);
                    //console.log(empArr);
                    menu(empArr);
                })
            } else if (answers['Employee type']==='Engineer') {
                inquirer
                .prompt(specificQuestions[1])
                .then(engineerAnswers => {
                    const engineer = new Engineer(answers['Employee name'], answers['Employee id'], answers['Employee type'], engineerAnswers);
                    empArr.push(engineer);
                    //console.log(empArr);
                })
            } else if (answers['Employee type']==='Intern') {
                inquirer
                .prompt(specificQuestions[2])
                .then(internAnswers => {
                    const intern = new Intern(answers['Employee name'], answers['Employee id'], answers['Employee type'], internAnswers);
                    empArr.push(intern);
                    //console.log(empArr);
                })
            } 
            console.log(empArr);
        }
        
        )
}
menu();

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

