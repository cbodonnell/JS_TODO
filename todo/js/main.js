/*
// Plays a number guessing game
function GuessNumber() {
	var playing = true;
	var turn = 1;
	var number = Math.floor(Math.random() * 10) + 1; 
	while (playing) {
		var guess = Number(prompt("Guess a number 1 - 10. (Guess #" + turn + ")"));
		if (guess == number) {
			playing = false;
		}
		turn = turn + 1;
	}
	alert("You won!");
}
*/

// Adds item to the todo list
function AddItem() {
	// move this out of AddItem
	document.getElementById("input").focus();
	DeselectItems();
	itemToHighlight = -1;
	var item = document.getElementById("input").value;
	// Prevents empty entries
	if (item.replace(/ /g,'') != "") {
		itemList.push(item);
		RefreshList();
		UnfocusInput();
	}
}

// Removes item from the todo list
function RemoveItem(id) {
	if (id >= 0) {
		itemList.splice(id, 1);
		RefreshList();
	}
}

// Clears the entire todo list
function ClearList() {
	itemList = [];
	RefreshList();
}

// Reloads the todo list HTML
function RefreshList() {
	var listHTML = "";
	for (var i=0; i < itemList.length; i++) {
		listHTML += "<div id= " + i + " class='todo-item'><li>" + itemList[i] + "</li><button onclick='RemoveItem(this.parentElement.id)'>Remove</button></div>";
	}
	document.getElementById("todo-list").innerHTML = listHTML;
	itemToHighlight = -1;
	SaveList();
}

// Saves the item list to localStorage
function SaveList() {
	localStorage.setItem("itemList", JSON.stringify(itemList));
}

// CODE TO RUN WHEN SCRIPT LOADS

// Loads the itemList from localStorage and populates list HTML
window.name = "TODO List";
var itemList = JSON.parse(localStorage.getItem("itemList"));
RefreshList();
var itemToHighlight = -1;

// Event Listeners

// Allows return key event to call the AddItem function
window.onkeypress = function(event) {
	// Enter
	if (event.keyCode == 13) {
		AddItem();
	}
}

// Allows arrow keys to select items
window.onkeydown = function(event) {
	// Arrow keys to select items
	if (itemList.length > 0) {
		// Down arrow
		if (event.keyCode == 40) {
			itemToHighlight++;
			if (itemToHighlight >= itemList.length) {
				itemToHighlight = 0;
			}
			HighlightItem(itemToHighlight);
			UnfocusInput();
		}
		// Up arrow
		if (event.keyCode == 38) {
			itemToHighlight--;
			if (itemToHighlight < 0) {
				itemToHighlight = itemList.length - 1;
			}
			HighlightItem(itemToHighlight);
			UnfocusInput();
		}
		//DEL to delete items
		if (event.keyCode == 46) {
			RemoveItem(itemToHighlight);
			DeselectItems();
			itemToHighlight = -1;
		}
		//ESC to deselect items
		if (event.keyCode == 27) {
			DeselectItems();
			UnfocusInput();
			itemToHighlight = -1;
		}
	}
}

function HighlightItem(itemToHighlight) {
	DeselectItems();
	var selectedItem = document.getElementById(itemToHighlight.toString());
	selectedItem.style.background = "#ccf5ff";
}

function DeselectItems() {
	var items = document.getElementsByClassName('todo-item');
	for (var i = 0; i < items.length; i++) {
		items[i].style.background = null;
		items[i].style.border = null;	
	}
}

function UnfocusInput() {
	document.getElementById("input").value = "";
	document.getElementById("input").blur();
}





