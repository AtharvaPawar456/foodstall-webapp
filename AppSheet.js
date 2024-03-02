var usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Users");
var transactionsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Transactions");
var foodItemsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Fooditems");

function generateUniqueId(sheet) {
  // Get the last ID from the sheet and generate a new one
  var data = sheet.getDataRange().getValues();
  if (data.length > 1) {
    var lastId = data[data.length - 1][0];
    return lastId + 1;
  } else {
    return 1;
  }
}

function insertUser(name, description, accountBalance, gender) {
  var uid = generateUniqueId(usersSheet);
  usersSheet.appendRow([uid, name, description, accountBalance, gender]);
  return { message: "User added successfully", uid: uid };
}

function updateUser(uid, name, description, accountBalance, gender) {
  var data = usersSheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == uid) {
      usersSheet.getRange(i + 1, 2).setValue(name);
      usersSheet.getRange(i + 1, 3).setValue(description);
      usersSheet.getRange(i + 1, 4).setValue(accountBalance);
      usersSheet.getRange(i + 1, 5).setValue(gender);
      return { message: "User updated successfully", uid: uid };
    }
  }
  return { message: "User not found" };
}

function deleteUser(uid) {
  var data = usersSheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == uid) {
      usersSheet.deleteRow(i + 1);
      return { message: "User deleted successfully", uid: uid };
    }
  }
  return { message: "User not found" };
}



// Similar functions for update and delete transactions

// function insertFoodItem(name, points, price, imgLink, description) {
//   var fid = generateUniqueId(foodItemsSheet);
//   foodItemsSheet.appendRow([fid, name, points, price, imgLink, description]);
//   return { message: "Food item added successfully", fid: fid };
// }

// Functions for Transactions

function insertTransaction(date, time, user, phoneNo, amount, points, iconLink) {
    var tid = generateUniqueId(transactionsSheet);
    transactionsSheet.appendRow([tid, date, time, user, phoneNo, amount, points, iconLink]);
    return { message: "Transaction added successfully", tid: tid };
  }

// function updateTransaction(tid, date, time, user, phoneNo, amount, points, iconLink) {
//     var data = transactionsSheet.getDataRange().getValues();
//     for (var i = 1; i < data.length; i++) {
//       if (data[i][0] == tid) {
//         transactionsSheet.getRange(i + 1, 2).setValue(date);
//         transactionsSheet.getRange(i + 1, 3).setValue(time);
//         transactionsSheet.getRange(i + 1, 4).setValue(user);
//         transactionsSheet.getRange(i + 1, 5).setValue(phoneNo);
//         transactionsSheet.getRange(i + 1, 6).setValue(amount);
//         transactionsSheet.getRange(i + 1, 7).setValue(points);
//         transactionsSheet.getRange(i + 1, 8).setValue(iconLink);
//         return { message: "Transaction updated successfully", tid: tid };
//       }
//     }
//     return { message: "Transaction not found" };
//   }
  
//   function deleteTransaction(tid) {
//     var data = transactionsSheet.getDataRange().getValues();
//     for (var i = 1; i < data.length; i++) {
//       if (data[i][0] == tid) {
//         transactionsSheet.deleteRow(i + 1);
//         return { message: "Transaction deleted successfully", tid: tid };
//       }
//     }
//     return { message: "Transaction not found" };
//   }
  
  // Functions for Fooditems

  function getAllFoodItems() {
    var data = foodItemsSheet.getDataRange().getValues();
    var result = [];
    for (var i = 1; i < data.length; i++) {
      result.push({
        fid: data[i][0],
        name: data[i][1],
        points: data[i][2],
        price: data[i][3],
        imgLink: data[i][4],
        description: data[i][5]
      });
    }
    return result;
  }
  
  
//   function updateFoodItem(fid, name, points, price, imgLink, description) {
//     var data = foodItemsSheet.getDataRange().getValues();
//     for (var i = 1; i < data.length; i++) {
//       if (data[i][0] == fid) {
//         foodItemsSheet.getRange(i + 1, 2).setValue(name);
//         foodItemsSheet.getRange(i + 1, 3).setValue(points);
//         foodItemsSheet.getRange(i + 1, 4).setValue(price);
//         foodItemsSheet.getRange(i + 1, 5).setValue(imgLink);
//         foodItemsSheet.getRange(i + 1, 6).setValue(description);
//         return { message: "Food item updated successfully", fid: fid };
//       }
//     }
//     return { message: "Food item not found" };
//   }
  
//   function deleteFoodItem(fid) {
//     var data = foodItemsSheet.getDataRange().getValues();
//     for (var i = 1; i < data.length; i++) {
//       if (data[i][0] == fid) {
//         foodItemsSheet.deleteRow(i + 1);
//         return { message: "Food item deleted successfully", fid: fid };
//       }
//     }
//     return { message: "Food item not found" };
//   }
  

function doGet(e) {
    var action = e.parameter.action;
  
    if (action === "insertUser") {
      var result = insertUser(e.parameter.name, e.parameter.description, e.parameter.accountBalance, e.parameter.gender);
      return ContentService.createTextOutput(JSON.stringify(result));
    } else if (action === "updateUser") {
      var result = updateUser(e.parameter.uid, e.parameter.name, e.parameter.description, e.parameter.accountBalance, e.parameter.gender);
      return ContentService.createTextOutput(JSON.stringify(result));
    } else if (action === "deleteUser") {
      var result = deleteUser(e.parameter.uid);
      return ContentService.createTextOutput(JSON.stringify(result));
    } else if (action === "getAllUsers") {
      var allData = getAllData(usersSheet);
      return ContentService.createTextOutput(JSON.stringify(allData));
    } else if (action === "insertTransaction") {
      var result = insertTransaction(e.parameter.date, e.parameter.time, e.parameter.user, e.parameter.phoneNo, e.parameter.amount, e.parameter.points, e.parameter.iconLink);
      return ContentService.createTextOutput(JSON.stringify(result));

      
    // } else if (action === "updateTransaction") {
    //     var result = updateTransaction(e.parameter.tid, e.parameter.date, e.parameter.time, e.parameter.user, e.parameter.phoneNo, e.parameter.amount, e.parameter.points, e.parameter.iconLink);
    //     return ContentService.createTextOutput(JSON.stringify(result));
    // } else if (action === "deleteTransaction") {
    //     var result = deleteTransaction(e.parameter.tid);
    //     return ContentService.createTextOutput(JSON.stringify(result));
    

    } else if (action === "getAllTransactions") {
        var allData = getAllData(transactionsSheet);
        return ContentService.createTextOutput(JSON.stringify(allData));
    // } else if (action === "insertFoodItem") {
    //     var result = insertFoodItem(e.parameter.name, e.parameter.points, e.parameter.price, e.parameter.imgLink, e.parameter.description);
    //     return ContentService.createTextOutput(JSON.stringify(result));
    // } else if (action === "updateFoodItem") {
    //     var result = updateFoodItem(e.parameter.fid, e.parameter.name, e.parameter.points, e.parameter.price, e.parameter.imgLink, e.parameter.description);
    //     return ContentService.createTextOutput(JSON.stringify(result));
    // } else if (action === "deleteFoodItem") {
    //     var result = deleteFoodItem(e.parameter.fid);
    //     return ContentService.createTextOutput(JSON.stringify(result));
    } else if (action === "getAllFoodItems") {
        var allData = getAllData(foodItemsSheet);
        return ContentService.createTextOutput(JSON.stringify(allData));
    }
    
    return ContentService.createTextOutput("Invalid action");
    }
  







// Similar functions for update and delete food items

// Sample URLs for testing

// Add a new user
// https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=insertUser&name=John&description=Hello%20John&accountBalance=500&gender=male

// Update user
// https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=updateUser&uid=YOUR_USER_ID&name=Updated%20Name&description=Updated%20Description&accountBalance=1000&gender=female

// Delete user
// https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=deleteUser&uid=YOUR_USER_ID

// Similar URLs for Transactions (insert, update, delete) and Fooditems (insert, update, delete)



// sample GET URL requests routes:

// 1. Add a new user:
//    https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=insertUser&name=John&description=Hello%20John&accountBalance=500&gender=male

// 2. Update user:
//    https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=updateUser&uid=YOUR_USER_ID&name=Updated%20Name&description=Updated%20Description&accountBalance=1000&gender=female

// 3. Delete user:
//    https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=deleteUser&uid=YOUR_USER_ID

// 4. Get all users:
//    https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=getAllUsers

// 5. Add a new transaction:
//    https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=insertTransaction&date=2/3/2024&time=23:24&user=Alex&phoneNo=1234567890&amount=1120&points=13&iconLink=static/setup/images/avatar/avatar-3.png

// 6. Get all transactions:
//    https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=getAllTransactions

// 7. Get all food items:
//    https://script.google.com/macros/s/AKfycbxY87UDDqIsgsH0Gf-C7YHx4PthP8/exec?action=getAllFoodItems

// Replace `YOUR_USER_ID` in the URLs with the actual user ID when testing the update and delete operations. Adjust the parameters accordingly based on your requirements.