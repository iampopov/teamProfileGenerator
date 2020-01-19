const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, gitHub) {
        super(name, id, email);
        this.gitHub = gitHub;
        this.title = "Engineer";
    }
    getRole () {
        return this.title
    }
}

module.exports = Engineer;