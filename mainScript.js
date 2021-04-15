//contact class
class Contact {
  //list constructor and variables
  constructor(name, number) {
    this.name = name;
    this.number = number;
    this.next = 0;
    //two by two
    this.CallerHistory = [];
    this.CallHistory = [];
  }
}

//root contact, is always empty
var mainContact = new Contact("root", "root");

function newContact(name, number) {
  //if the parameters are undefined then check the text inputs from page
  if (name === undefined && number === undefined) {
    name = document.getElementById("EDTName").value;
    number = document.getElementById("EDTNumber").value;

    //check if enterd values are Name as text and number as numbers
    var numberOk = number.search(/[A-Za-z]/);
    var nameOk = name.search(/\d/);
    if (numberOk > -1 || nameOk > -1) {
      alert("Name can only contain characters\nPhone can only contain numbers");
      document.getElementById("EDTName").value = "";
      document.getElementById("EDTNumber").value = "";
      return;
    }

    //another if to check if name already exists
  }

  //initial variables
  var tail = mainContact;
  var head;

  //if there is only mainContact then head and tail are pointing at mainContact
  //else head is pointing to the next contact
  if (tail.next != 0) {
    head = tail.next;
  } else {
    head = tail;
  }

  //increment both the head and tail untill
  //you find an empty head
  //or position the new contact by comparing the characters in current head
  //and the new contact name
  while (head.next != 0) {
    if (head.name.toLowerCase() > name.toLowerCase()) break;
    tail = head;
    head = head.next;
  }

  //if the current head is not the mainContact and out of position alphabatically
  //then place it in its rightful place
  //else place it in the most depth list
  if (head.name != "root" && head.name.toLowerCase() > name.toLowerCase()) {
    var contact = new Contact(name, number);
    tail.next = contact;
    contact.next = head;
  } else {
    var contact = new Contact(name, number);
    head.next = contact;
  }
  //redrow the grids on screen
  reOrderVisuals();
}

function editContact(contact, name, number) {
  deleteContactByName(contact.name);
  newContact(name, number);
  reOrderVisuals();
}

function editContactByClick(oldname) {
  var name = prompt("What is the new name?", "");
  var nameOk = name.search(/\d/);
  if (nameOk > -1) {
    alert("please enter something that works");
    return;
  }

  var number = prompt("What is the new number?", "");
  var numberOk = number.search(/[A-Za-z]/);
  if (numberOk > -1) {
    alert("please enter something that works");
    return;
  }

  var contact = searchContactByName(oldname);

  if (contact != undefined) {
    if (name == "") name = contact.name;

    if (number == "") number = contact.number;
    alert(name + " " + number);
    editContact(contact, name, number);
  } else {
    alert("contact does not exists");
  }
}

function deleteContactByName(name) {
  var contact;
  if (mainContact.name == "empty") {
    alert("there is no contacts to delete");
    return;
  } else {
    if (mainContact.name === name) {
      if (mainContact.next == 0) {
        mainContact.name = mainContact.number = "empty";
        return;
      } else {
        mainContact = mainContact.next;
        return;
      }
    }
    contact = mainContact;
    while (contact.next != 0) {
      if (contact.next.name == name) {
        break;
      }
      contact = contact.next;
    }
    //delete the contact in the middle and connect the other ends
    if (contact.next != 0 && contact.next.next != 0) {
      contact.next = contact.next.next;
    } //else delete the contact
    else contact.next = 0;
  }
  reOrderVisuals();
}

function searchContactByName(name) {
  //get from page
  var enableAlert = false;
  if (name === undefined) {
    name = document.getElementById("EDTSearchName").value;
    var nameOk = name.search(/\d/);
    enableAlert = true;
    if (nameOk > -1) {
      alert("Name cannot contain numbers");
      document.getElementById("EDTSearchName").value = "";
      return;
    }
    //another if to check if name already exists
  }
  console.log(name);
  var tail = mainContact;
  var head;

  if (tail.next != 0) {
    head = tail.next;
  } else {
    head = tail;
  }

  //increment both the head and tail untill
  //you find an empty head
  while (head.next != 0) {
    if (head.name.toLowerCase() == name.toLowerCase()) break;
    tail = head;
    head = head.next;
  }

  if (head.name.toLowerCase() === name.toLowerCase()) {
    if (enableAlert == true)
      alert("name is: " + head.name + "\nnumber is: " + head.number);
    document.getElementById("EDTSearchName").value = "";
    return head;
  }
  alert("no contact found");
  document.getElementById("EDTSearchName").value = "";
}

function searchContactByPhone(number) {
  //if number is undefined then this function is called by button press
  if (number === undefined) {
    number = document.getElementById("EDTSearchNumber").value;
    var numberOk = number.search(/[A-Za-z]/);
    if (numberOk > -1) {
      alert("Phone number cannot contain Characters");
      document.getElementById("EDTSearchNumber").value = "";
      return;
    }
    //another if to check if number already exists
  }
  console.log(number);
  var tail = mainContact;
  var head;

  if (tail.next != 0) {
    head = tail.next;
  } else {
    head = tail;
  }

  //increment both the head and tail untill
  //you find an empty head
  while (head.next != 0) {
    if (head.number == number) break;
    tail = head;
    head = head.next;
  }

  if (head.number === number) {
    alert("name is: " + head.name + "\nnumber is: " + head.number);
    document.getElementById("EDTSearchNumber").value = "";
    return;
  }
  alert("no contact found");
  document.getElementById("EDTSearchNumber").value = "";
}

function main() {
  newContact("Keri Atherton", "712-223-5296");
  newContact("Anisah Crosby", "267-925-6256");
  newContact("Darla Lowery", "702-451-2827");
  newContact("Iylah Beil", "817-877-9373");
  newContact("Kieren Escobar", "714-203-6227");
  newContact("Brenna Battle", "815-230-2521");
  newContact("Wil Harding", "206-680-7294");
}

$(window).on("load", function (e) {
  main();
});

//function to create the contacts grid visually and assign buttons and functions
function reOrderVisuals() {
  emptyContactGrid();

  if (mainContact.next == 0) {
    return;
  }

  //assign the main node contact
  contact = mainContact;
  do {
    //assign the next Contact
    contact = contact.next;

    //get the Contact list template from index.html and replace its macros with data
    var source = $("#caller-Template").html();
    source = source.replace(/@NAME@/g, contact.name);
    source = source.replace(/@NUMBER@/g, contact.number);

    $("#mainContacts").append(source);

    //Create the callers and recievers list
    var listOption = $("#list-option-Template").html();
    listOption = listOption.replace(/@NAME@/g, contact.name);
    $("#CallersList").append(listOption);

    var listOption = $("#list-option-Template").html();
    listOption = listOption.replace(/@NAME@/g, contact.name);
    $("#RecivingCallersList").append(listOption);
    //
  } while (contact.next != 0);
}

function emptyContactGrid() {
  $("#mainContacts").empty();
  $("#CallersList").empty();
  $("#RecivingCallersList").empty();
}

function makeAPhoneCall() {
  var Callercontact_Name = document.getElementById("CallersList").value;
  var Calledcontact_Name = document.getElementById("RecivingCallersList").value;

  var Caller_contact = searchContactByName(Callercontact_Name);
  var Called_contact = searchContactByName(Calledcontact_Name);

  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  Caller_contact.CallHistory.push([Calledcontact_Name, time]);

  today = new Date();
  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  Called_contact.CallerHistory.push([Callercontact_Name, time]);
}

//TODO: delete this later

//visually create viewlogs
function viewLogs(contact) {
  $("#CallerLogs").empty();

  //find out which list between caller and callers has a bigger length
  callerIndex = contact.CallerHistory.length - 1;
  callIndex = contact.CallHistory.length - 1;

  if (callerIndex > callIndex) var n = callerIndex + 1;
  else var n = callIndex + 1;

  //Create the table headers
  $("#CallerLogs").append(
    "<tr> <th>Callers</th>  <th>Date</th>  <th>Called</th>  <th>Date</th>  </tr>"
  );

  //loop through the lists and assign the data to the template
  for (var i = n - 1; i >= 0; i--) {
    var callerTemp = $("#caller-log-Template").html();
    if (callerIndex >= 0) {
      callerTemp = callerTemp.replace(
        /@CALLERS@/g,
        contact.CallerHistory[callerIndex][0]
      );
      callerTemp = callerTemp.replace(
        /@CALLDATE@/g,
        contact.CallerHistory[callerIndex--][1]
      );
    } else {
      callerTemp = callerTemp.replace(/@CALLERS@/g, " ");
      callerTemp = callerTemp.replace(/@CALLDATE@/g, " ");
    }

    if (callIndex >= 0) {
      callerTemp = callerTemp.replace(
        /@CALLHIST@/g,
        contact.CallHistory[callIndex][0]
      );
      callerTemp = callerTemp.replace(
        /@HISTDATE@/g,
        contact.CallHistory[callIndex--][1]
      );
    } else {
      callerTemp = callerTemp.replace(/@CALLHIST@/g, " ");
      callerTemp = callerTemp.replace(/@HISTDATE@/g, " ");
    }

    $("#CallerLogs").append(callerTemp);
  }
}
