// 
var guestList = ["John", "Paul", "George", "Ringo"];
// Add a new guest to the end of the list
var newGuest = prompt("Enter the name of a new guest:");
guestList.push(newGuest);
// Display the updated guest list
console.log("Updated Guest List:");
for (var i = 0; i < guestList.length; i++) {
    console.log(guestList[i]);
}