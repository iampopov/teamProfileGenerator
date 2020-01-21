// Code to use inquirer to gather information about the development team members is defined in eeQuestions const
// Code to create objects for each team member is in let employee on line 70-82 (there is a for loop that goes through array and creates each role)
// After the user has input all employees desired, call the `render` function and pass in an array containing all employee objects; the `render` function will generate and return a block of HTML including templated divs for each employee!
// After generating html, fs.write on line 84 generates an HTML file using the HTML returned from the `render` function. Now write it to a file named `team.html` in the `output` folder. This is done using the variable `outputPath` above target this location.
// each employee type (manager, engineer, or intern) has slightly different
// information; 
// the below links to the constructors for each applicable instance
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const eeQuestions = async (inputs = []) => {
    const prompts = [
    {
        name: 'employeeName',
        message: 'Please enter employee name: ',
        validate: validateName
    },
    {
        name: 'employeeId',
        message: 'Please enter employee id: ',
        validate: validateId
    },
    {
        name: 'employeeEmail',
        message: 'Please enter employee email: ',
        default: 'mail@mail.com',
        validate: validateEmail
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

    let employee = [];
    for (let i in inputs) {
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

    fs.writeFile(outputPath, render(employee), err => {

        if (err) {
          return console.log(err);
        }
      
        console.log("Success!");
      
      })
  };

function validateId(id)
{
    const reg = /^\d+$/;
    return reg.test(id) || "ID should be a number!";
}

function validateName(name) {
    return name !== '';
}

function validateEmail(email) {
    
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) || "Please enter a valid email";
    
   }

main();


