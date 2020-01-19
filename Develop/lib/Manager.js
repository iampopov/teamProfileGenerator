const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, officeNumber) {
        super(name, id, "Manager");
        this.officeNumber = officeNumber;
    }
    getRole () {
        return this.title
    }
}

module.exports = Manager;