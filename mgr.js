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
    var addId;
    var addStock;
    var newStock;
    inquirer.prompt([{
                name: "idToAddTo",
                type: "input",
                message: "Please enter the id of the product to which you want to add inventory.",
            },
            {
                name: "qtyTo Add",
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
            addStock = parseInt(answer.stock);
            addId = answer.idToAddTo;
            connection.query("SELECT id, stock  FROM products", function(err, results) {
                if (err) throw err;
                newStock = results[0].stock + addStock;
            }); // End of connection query for SELECT
            connection.query("UPDATE products SET stock = ? WHERE id = ?", { newStock, addId }, function(err, results) {
                if (err) throw err;
                console.log("Inventory updated to " + newStock);
                connection.end();
                return;
            }); // End of connection query for UPDATE
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
            var newProdId;
            var newProdStock;
            connection.query("INSERT INTO products (product_name, department, price, stock) VALUES (productToAdd, deptOfNew, priceOfNew, initialQuantity"),
                function(err, results) {
                    if (err) throw err;
                    var oldProdStock = parseInt(results.stock);
                    newProdStock = oldProdStock + newProdStock;
                }; // End of connection query
            connection.query("UPDATE products SET stock = ? WHERE id = ?", { newProdStock, newProdId },
                function(err, results) {
                    if (err) throw err;
                    connection.end();
                }); // End of connection query
        }); // End of then
} // End of function addProd

function start() {
    inquirer.prompt([{
            name: "chosenOption",
            type: "rawlist",
            message: "Please choose the search you would like to perform.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
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
