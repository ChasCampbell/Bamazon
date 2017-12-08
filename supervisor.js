console.log("Welcome");
var inquirer = require("inquirer");
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
}); // End of connection

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // After the connection is made, run the start function to prompt the user
    //  start();
}); // End of connect.connect

var Table = require('cli-table');

// To see a table of sales by department
function viewSales() {
    connection.query("SELECT department_id, department_name, over_head_costs, sales SUM (products.sales) AS department.total_sales FROM departments INNER JOIN products ON departments.department_id = products.department_id GROUP BY depatment.department_id",
        function(err, results) {
            if (err) throw err;
            // instantiate a table 
            var table = new Table({
                head: ['department_id', 'department_name', "over_head_costs", "product_sales", "total_profit"],
                colWidths: [100, 200]
            });
            for (var i = 0; i < department.department_id.length; i++) {
                department.total_sales = products.sales - department.over_head_costs;
                table.push['department.department_id', 'department+name', 'department.over_head_costs', 'product.product.sales', 'department.total_sales']
            } //End of for
        }); // End of connection query for SELECT
    connection.end();
} // End of viewSales

// to create a new department
function newDept() {
    var overHead;
    inquirer
        .prompt([{
                name: "departmentName",
                type: "input",
                message: "What department would you like to create?",
            },
            {
                name: "overHead",
                type: "input",
                message: "What over head would you assign to this department?",
            }
        ]) // End of prompt
        .then(function(answer) {
            var dName = answer.departmentName;
            var oHead = JSON.parse(answer.overHead);
            console.log(dName);
            console.log(oHead);
            connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)", [{ department_name: dName }, { over_head_costs: oHead }],
                function(err, results) {
                    if (err) throw err;
                    console.log("Department created: " + dName);
                    connection.end();
                    return;
                }); // End of connection.query
        }); // End of then
} // End of newDept

function supervisor() {
    inquirer
        .prompt({
            name: "viewOrCreate",
            type: "rawlist",
            message: "Would you like to view sales by department or create a department?",
            choices: ["VIEW", "CREATE"]
        })
        .then(function(answer) {
            if (answer.viewOrCreate == "VIEW") {
                viewSales();
            }
            else {
                newDept();
            }
        });
} // End of function supervisor
supervisor();
//  [addId],
