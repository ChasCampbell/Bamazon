var mysql = require("mysql");
var inquirer = require("inquirer");

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

// Get all items available to display for the user..
function getItems() {
    connection.query("SELECT id, product_name, price, stock  FROM products", function(err, results) {
        if (err) throw err;
        // Display the items for the user to make a choice.console.log("Welcome! Thank you for visiting. Here is what we have available:");
        for (var i = 0; i < results.length; i++) {
            console.log("Product ID: " + results[i].id + " Product: " + results[i].product_name +
                " Price: " + results[i].price + " Stock: " + results[i].stock);
        }
        start();
    }); // End of connection query 
} // End of function getItems
getItems();

// Prompt the user for the id and quantity of the item sought.
function start() {
    inquirer
        .prompt([{
            name: "chosenItem",
            type: "input",
            message: "Please enter the id of the item you would like.\nEnter 0 here and at the next question to exit"
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like?"
        }]) // End of prompt
        .then(function(answer) {
            if (answer.chosenItem == "0") {
                console.log("Thanks for visiting.");
                connection.end();
                return;
            }
            var chosenId = parseInt(answer.chosenItem);
            var chosenQty = parseInt(answer.quantity);

            function lookupItem() {
                var query = "SELECT id, product_name, price, stock  FROM products WHERE id=?";
                connection.query(query, [chosenId], function(err, results) {
                    if (err) throw err;
                    var currentStock = results[0].stock;
                    // Check the requested quantity against the number in stock.
                    if (chosenQty > currentStock) {
                        console.log("Sorry, we do not have that many in stock.\brPlease reduce the number requested or make another selection.");
                        start();
                    } // End of if
                    else {
                        var priceNow = results[0].price;
                        var stockNow = currentStock - chosenQty;
                        var salesNow;
                        var orderTotal;
                        var saleQuery;
                        var query = "UPDATE products  SET stock = ? WHERE id = ?";
                        connection.query(query, [stockNow, chosenId], function(err, results) {
                            if (err) throw err;
                            orderTotal = chosenQty * priceNow;
                            console.log("Thank you for your order. Your order total is $" + orderTotal);
                        }); // End of connection query UPDATE
                        var totalQuery = "SELECT sales  FROM products WHERE id = ?";
                        connection.query(totalQuery, [chosenId], function(err, results) {
                            if (err) throw err;
                            salesNow = results.sales + orderTotal;
                        }); // End of connection query SELECT
                        saleQuery = "UPDATE products  SET sales = ? WHERE id = ?";
                        connection.query(saleQuery, [salesNow, chosenId], function(err, results) {
                            if (err) throw err;
                        }); // End of connection query UPDATE    
                    } // End of else
                    connection.end();
                    return;
                }); // End of connection query SELECT
            } // End of function lookupItem
            lookupItem();
        }); // End of then
} // End of start
