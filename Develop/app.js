// the below links to the constructors for each applicable instance
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const eeQuestions = async (inputs = []) => {
    const prompts = [
    {
        name: 'employeeName',
        message: 'Please enter employee name: ',
        default: 'default'
    },
    {
        name: 'employeeId',
        message: 'Please enter employee id: ',
        default: '1'
    },
    {
        name: 'employeeEmail',
        message: 'Please enter employee email: ',
        default: 'mail@mail.com'
    },
    {
        type: 'list',
        name: 'employeeType',
        message: "Who would you like to enter first?",
        choices: ['Manager','Engineer','Intern']
    },
    {
        name: 'officeNumber',
        message: 'Please enter office phone number',
        when: function( answers ) {
            return answers['employeeType']==='Manager'
        }
    },
    {
        name: 'gitHub',
        message: 'Please enter gitHub account id',
        when: function( answers ) {
            return answers['employeeType']==='Engineer'
        }
    },
    {
        name: "school",
        message: 'Please enter school',
        when: function( answers ) {
            return answers['employeeType']==='Intern'
        }
    },
    {
        type: 'confirm',
        name: 'again',
        message: 'Would you like to enter more employees?'
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
    //console.log(inputs[0].employeeName);
    let employee = [];
    for (let i=0; i<inputs.length; i++) {
        if (inputs[i].employeeType==='Manager') {
            let nM = new Manager(inputs[i].employeeName, inputs[i].employeeId, inputs[i].employeeEmail, inputs[i].officeNumber)
            employee.push(nM);    
        } else if (inputs[i].employeeType==='Engineer') {
            let nE = new Engineer(inputs[i].employeeName, inputs[i].employeeId, inputs[i].employeeEmail, inputs[i].gitHub)
            employee.push(nE);
        } else {
            let nI = new Intern(inputs[i].employeeName, inputs[i].employeeId, inputs[i].employeeEmail, inputs[i].school)
            employee.push(nI);
        }
    }    
    
    console.log(employee);
    
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
