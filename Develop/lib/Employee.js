class Employee {
    constructor(name, id, title) {
        this.name = name;
        this.id = id;
        this.title = "Employee";
    }
    getName() {

    }
    getId() {

    }
    getEmail() {

    }
    getRole() {
        return this.title;
    }
}

module.exports = Employee;