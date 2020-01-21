# Object Oriented Programming and Test Driven Development: Template Engine - Employee Summary

One of the most important aspects of programming is writing code that is readable, reliable, and maintainable. Oftentimes, *how* we design our code is just as important as the code itself. In this app I demonstrate how to build a Node CLI that takes in information about employees and generates an HTML webpage that displays summaries for each person. Since testing is a key piece in making code maintainable, there are tests in the test directory.


## Description

This is a software engineering team generator command line application. The application prompts the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. This app also passed all unit tests in the test directory. When the user has completed building the team, the application creates an HTML file that displays a nicely formatted team roster based on the information provided by the user. 

```
As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles
```

## Technology:

* Used the [Inquirer npm package](https://github.com/SBoudrias/Inquirer.js/) to prompt the user for their email, id, and specific information based on their role with the company. For instance, an intern may provide their school, whereas an engineer may provide their GitHub username.

* App runs as a Node CLI to gather information about each employee.

In the `Develop` folder, there is a `package.json`.

The dependencies are, [jest](https://jestjs.io/) for running the provided tests, and [inquirer](https://www.npmjs.com/package/inquirer) for collecting input from the user.

* App uses multiple HTML templates:

  * `main.html`

  * `engineer.html`
  
  * `intern.html`
  
  * `manager.html`

* The different employee types inherit some methods and properties from a base class of `Employee`.

### Classes
The app has these classes: `Employee`, `Manager`, `Engineer`, `Intern`. The tests for these classes in the `tests` directory.

The first class is an `Employee` parent class with the following properties and
methods:

  * name
  * id
  * title
  * getName()
  * getId()
  * getEmail()
  * getRole() // Returns 'Employee'

The other three classes extend `Employee`. 

In addition to `Employee`'s properties and methods, `Manager` also has:

  * officeNumber

  * getRole() // Overridden to return 'Manager'

In addition to `Employee`'s properties and methods, `Engineer` also has:

  * github  // GitHub username

  * getGithub()

  * getRole() // Overridden to return 'Engineer'

In addition to `Employee`'s properties and methods, `Intern` also has:

  * school 

  * getSchool()

  * getRole() // Overridden to return 'Intern'

### User input

The app prompt the user to build an engineering team. An engineering
team consists of any number of managers, engineers and interns.

### Roster output

The app generates a `team.html` page in the `output` directory, that displays a nicely formatted team roster. Each team member displays the following:

  * Name

  * Role

  * ID

  * Role-specific property (School, link to GitHub profile, or office number)

## Information validation

* Used validation to ensure that the information provided is in the proper expected format.

