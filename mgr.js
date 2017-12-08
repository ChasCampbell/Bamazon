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

// Function to display the items list.
function saleList() {
    connection.query("SELECT id, product_name, price, stock  FROM products", function(err, results) {
        if (err) throw err;
        console.log("These are all of the products we offer:");
        for (var i = 0; i < results.length; i++) {
            console.log("Product ID: " + results[i].id + " Product: " + results[i].product_name +
                " Price: " + results[i].price + " Stock: " + results[i].stock);
        }
        connection.end();
        return;
    }); // End of connection query
} // End of function saleList

// Function to display the low inventory items.
function lowInvList() {
    connection.query("SELECT id, product_name, price, stock FROM products WHERE stock < 5",
        function(err, results) {
            if (err) throw err;
            console.log(results.length);
            for (var i = 0; i < results.length; i++) {
                console.log("Product ID: " + results[i].id + " Product: " + results[i].product_name +
                    " Price: " + results[i].price + " Stock: " + results[i].stock);
            }
            connection.end();
            return;
        }); // End of connection query
} // End of function lowInvList

function addInv() {
    var addStock;
    var addId;
    var newStock;
    inquirer.prompt([{
                name: "idToAddTo",
                type: "input",
                message: "Please enter the id of the product to which you want to add inventory.",
            },
            {
                name: "qtyToAdd",
                type: "input",
                message: "Please enter the quantity of the product you would like to add.",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                } // End of vaidate
            }
        ]) // End of prompt for addInv
        .then(function(answer) {
            addStock = parseInt(answer.qtyToAdd);
            addId = parseInt(answer.idToAddTo);
            connection.query("SELECT id, stock FROM products WHERE ?", { "id": addId }, function(err, results) {
                if (err) throw err;

                newStock = JSON.parse(results[0].stock) + addStock;
                console.log(typeof(JSON.parse(results[0].stock)));

                connection.query("UPDATE products SET ? WHERE ?", [{ stock: newStock }, { id: addId }], function(err, results) {
                    if (err) throw err;
                    console.log("Inventory of " + addId + " updated to " + newStock);
                    connection.end();
                    return;
                }); // End of connection query for UPDATE
            }); // End of connection query for SELECT
        }); //End of then
} // End of function addInv

function addProduct() {
    inquirer.prompt([{
                name: "productToAdd",
                type: "input",
                message: "Please enter the name of the product you would like to add.",
            },
            {
                name: "deptOfNew",
                type: "input",
                message: "Please enter the department of the product you would like to add.",
            },
            {
                name: "priceOfNew",
                type: "input",
                message: "Please enter the price of the product you would like to add.",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }

            },
            {
                name: "initialQuantity",
                type: "input",
                message: "Please enter the quantity of the product you would like to add.",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]) // End of prompt
        .then(function(answer) {
            var newProdStock = parseInt(answer.initialQuantity);
            var newProdPrice = parseInt(answer.priceOfNew);
            connection.query("INSERT INTO products (product_name, department, price, stock) VALUES (productToAdd, deptOfNew, ?, ?", [{ price: newProdPrice }, { stock: newProdStock }],
                function(err, results) {
                    if (err) throw err;
                    connection.end();
                    return;
                });
        }); // End of then
} // End of addProduct

function start() {
    inquirer.prompt([{
            name: "chosenOption",
            type: "rawlist",
            message: "Please choose the action you would like to perform.",
            choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }]) // End of prompt
        .then(function(answer) {
            switch (answer.chosenOption) {
                case 'View Products for Sale':
                    saleList();
                    break;
                case "View Low Inventory":
                    lowInvList();
                    break;
                case "Add to Inventory":
                    addInv();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
            } // End of switch
        }); // End of then right under start
} // End of start
start();
