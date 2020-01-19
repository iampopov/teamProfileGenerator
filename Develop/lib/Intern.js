const Employee = require("./Employee")

class Intern extends Employee {
    constructor(name, id, school) {
        super(name, id, "Intern");
        this.school = school;
    }
    getRole () {
        return this.title
    }
}

module.exports = Intern;