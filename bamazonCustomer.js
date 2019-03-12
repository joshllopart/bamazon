var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;

  loadTable();
});


function loadTable() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.table(res);

    start(res)


  })
}


function start() {
  inquirer
    .prompt([
      {
        name: "itemsOptions",
        type: "input",
        message: "What is the ID of the product you would like to buy.?",
        validate: function (val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val){

      quitAll(val.choice);

      let choiceId = parseInt(val.choice);
      let product = checkInventory(choiceId, stock);

      if (product) {
        howMany(product);

      }
      else {
        console.log("\n Sorry that item ID doesn't exist :(");
        loadTable();
      }
    });
}

function howMany(product) {
inquirer

.prompt([
  {
    type: "input",
    name: "Howmany",
    message: "How many would you like to buy?",
    validate: function (val) {
      return val > 0 || val.toLowerCase() === "q"; 
    }


  }
])
.then(function(val){
  quitAll(val.quantity);

  let quantity = parseInt(val.quantity);

  if (quantity > product.stock_quantity) {
    console.log("\nNot enough Items, Sorry");
    loadTable();
  } else {
    confirmYourPurchase(product, quantity);
  } 
});
}

function confirmYourPurchase(product, quantity){
  connection.query
  "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
  [quantity, product.item_id],
  function(err, res) {
    console.log("\n Congrats!!! you just bought" + quantity + of + product.product_name);
    loadTable()
  }

}


function checkInventory(choiceId, stock) {
  for (i=0; i < stock.length; i++) {
    if (stock[i].item_id === choiceId) {
      return stock[i];
    }
  }
  return null;
}

function quitAll(choice) {

  if(choice.toLowerCase() === "q") {
    console.log("bye");
    process.exit(0);
  }

}






















// // function to handle posting new items up for auction
// function postAuction() {
//   // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function (value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function (answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid,
//           highest_bid: answer.startingBid
//         },
//         function (err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function (err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function () {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?"
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?"
//         }
//       ])
//       .then(function (answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid
//               },
//               {
//                 id: chosenItem.id
//               }
//             ],
//             function (error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         }
//         else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
