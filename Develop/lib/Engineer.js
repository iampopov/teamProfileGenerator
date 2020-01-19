const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, gitHub) {
        super(name, id, "Engineer");
        this.gitHub = gitHub;
    }
}

module.exports = Engineer;