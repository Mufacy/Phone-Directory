//contact class
class Contact
{
    //list constructor and variables
    constructor(name, number)
    {
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

function newContact(name, number)
{
    //if the parameters are undefined then check the text inputs from page
    if ((name === undefined) && (number === undefined))
    {
        name   = document.getElementById("EDTName").value;
        number = document.getElementById("EDTNumber").value;

        //check if enterd values are Name as text and number as numbers
        var numberOk = number.search(/[A-Za-z]/); 
        var nameOk = name.search(/\d/);
        if ((numberOk > -1) || (nameOk > -1))
        {
            alert("Name can only contain characters\nPhone can only contain numbers");
            document.getElementById("EDTName").value   = "";
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
    if (tail.next != 0)
    {
        head = tail.next;
    }
    else
    {
        head = tail;
    }

    //increment both the head and tail untill
    //you find an empty head
    //or position the new contact by comparing the characters in current head
    //and the new contact name
    while (head.next != 0)
    { 
        if (head.name.toLowerCase() > name.toLowerCase())
            break;
        tail = head; 
        head = head.next; 
    }

    //if the current head is not the mainContact and out of position alphabatically
    //then place it in its rightful place
    //else place it in the most depth list
    if ((head.name != "root") && (head.name.toLowerCase() > name.toLowerCase()))
    {
        var contact = new Contact(name, number);
        tail.next = contact;
        contact.next = head;
    }
    else
    {
        var contact = new Contact(name, number);
        head.next = contact;
    }
    //redrow the grids on screen
    reOrderVisuals();
}

function editContact(contact, name, number)
{
    deleteContactByName(contact.name);
    newContact(name, number);
    reOrderVisuals();
}

function editContactByClick(oldname)
{
    
    var name = prompt("What is the new name?", "");
    var nameOk = name.search(/\d/);
    if (nameOk > -1)
    {
        alert("please enter something that works");
        return;
    }

    var number = prompt("What is the new number?", "");
    var numberOk = number.search(/[A-Za-z]/); 
    if (numberOk > -1)
    {
        alert("please enter something that works");
        return;
    }

    var contact = searchContactByName(oldname);

    if (contact != undefined)
    {
        if (name == "")
            name = contact.name;

        if (number == "")
            number = contact.number;
            alert(name +" "+number);
        editContact(contact,name,number);
    }
    else
    {
        alert("contact does not exists");
    }
}

function deleteContactByName(name)
{
    var contact;
    if (mainContact.name == "empty")
    {
        alert("there is no contacts to delete");
        return;
    }
    else
    {
        if (mainContact.name === name)
        {
            if (mainContact.next == 0)
                {mainContact.name = mainContact.number = "empty"; return;}
            else
                {mainContact = mainContact.next; return;}
        }
        contact = mainContact;
        while(contact.next != 0)
        {
                if (contact.next.name == name)
                    {break;}
                contact = contact.next;
        }
        //delete the contact in the middle and connect the other ends
        if (contact.next != 0 && contact.next.next != 0)
        {contact.next = contact.next.next;}
        else //else delete the contact
        contact.next = 0;
    }
    reOrderVisuals();
}

function searchContactByName(name)
{
    //get from page
    var enableAlert = false;
    if (name === undefined)
    {
        name = document.getElementById("EDTSearchName").value;
        var nameOk = name.search(/\d/);
        enableAlert = true;
        if (nameOk > -1)
        {
            alert("Name cannot contain numbers");
            document.getElementById("EDTSearchName").value   = "";
            return;
        }
        //another if to check if name already exists
    }
    console.log(name);
    var tail = mainContact;
    var head;

    if (tail.next != 0)
    {
        head = tail.next;
    }
    else
    {
        head = tail;
    }

    //increment both the head and tail untill
    //you find an empty head
    while (head.next != 0)
    { 
        if (head.name.toLowerCase() == name.toLowerCase())
            break;
        tail = head; 
        head = head.next; 
    }

    if (head.name.toLowerCase() === name.toLowerCase())
    {   
        if (enableAlert == true)
            alert("name is: "+head.name+"\nnumber is: "+head.number); 
        document.getElementById("EDTSearchName").value   = "";  
        return head;
    }
    alert("no contact found");
    document.getElementById("EDTSearchName").value   = "";  
}

function searchContactByPhone(number)
{
    //if number is undefined then this function is called by button press
    if (number === undefined)
    {
        number = document.getElementById("EDTSearchNumber").value;
        var numberOk = number.search(/[A-Za-z]/);
        if (numberOk > -1)
        {
            alert("Phone number cannot contain Characters");
            document.getElementById("EDTSearchNumber").value   = "";
            return;
        }
        //another if to check if number already exists
    }
    console.log(number);
    var tail = mainContact;
    var head;

    if (tail.next != 0)
    {
        head = tail.next;
    }
    else
    {
        head = tail;
    }

    //increment both the head and tail untill
    //you find an empty head
    while (head.next != 0)
    { 
        if (head.number == number)
            break;
        tail = head; 
        head = head.next; 
    }

    if (head.number === number)
    {   
        alert("name is: "+head.name+"\nnumber is: "+head.number); 
        document.getElementById("EDTSearchNumber").value = "";  
        return;
    }
    alert("no contact found");
    document.getElementById("EDTSearchNumber").value   = "";
}

function main()
{
    newContact('hassan', '12342');
    newContact('adoali', '1234'); 
    newContact('eehmaddd', '53543');
    newContact('aahmaddd', '53543');
    newContact('abhmaddd', '53543');
    newContact('ahmaddss2d', '53543');
    newContact('acmaddssd', '535433');
}

main();
// reOrderVisuals();

//function to create the contacts grid visually and assign buttons and functions
function reOrderVisuals()
{
    emptyContactGrid();
    if (mainContact.next == 0)
    {
        return;
    }
    var contactList = document.getElementById('mainContacts');
    CellIndex = 0;
    contact = mainContact;
    do
    {
        //move to next Contact and create row
        contact = contact.next;
        var tbl_row = document.createElement('tr');  
        tbl_row.setAttribute("align","left");
        contactList.appendChild(tbl_row);

        //create contact name
        var THeader = document.createElement('th');
            THeader.innerHTML = contact.name;
        tbl_row.appendChild(THeader);

        var TDataPhone = document.createElement('td');
            TDataPhone.innerHTML = contact.number;
        tbl_row.appendChild(TDataPhone);

        //create dynamically a button to view contact logs
        var TDataViewLogs = document.createElement('td');
            TDataViewLogs.setAttribute("id", CellIndex++); 
            var TDataViewLogsButton = document.createElement("button");
                TDataViewLogsButton.innerText = "View logs";
                TDataViewLogsButton.setAttribute("onclick", "viewLogs(searchContactByName(this.value));");
                TDataViewLogsButton.setAttribute("value", contact.name);
            TDataViewLogs.appendChild(TDataViewLogsButton);
        tbl_row.appendChild(TDataViewLogs);

        //create dynamically a button to edit contact
        var TDataEdit = document.createElement('td');
            TDataEdit.setAttribute("id", CellIndex++); 
            var TDataEditButton = document.createElement("button");
                TDataEditButton.innerText = "Edit Contact";
                TDataEditButton.setAttribute("onclick", "editContactByClick(this.value);");
                TDataEditButton.setAttribute("value", contact.name);
            TDataEdit.appendChild(TDataEditButton);
        tbl_row.appendChild(TDataEdit);

        //create dynamically a button to delete contact logs
        var TDataDelete = document.createElement('td');
            TDataDelete.setAttribute("id", CellIndex++); 
            var TDataDeleteButton = document.createElement("button");
                TDataDeleteButton.innerText = "Delete Contact";
                TDataDeleteButton.setAttribute("onclick", "deleteContactByName(this.value);");
                TDataDeleteButton.setAttribute("value", contact.name);
            TDataDelete.appendChild(TDataDeleteButton);
        tbl_row.appendChild(TDataDelete);

        //Create the callers and recievers list
        var listOption = document.createElement('option');
            listOption.innerHTML = contact.name;
            listOption.value = contact.name;
        CallersList.appendChild(listOption);

        var listOption = document.createElement('option');
            listOption.innerHTML = contact.name;
            listOption.value = contact.name;
        RecivingCallersList.appendChild(listOption);
    }
    while (contact.next != 0)
}


function emptyContactGrid() //this clears the board
{ 
    var e = document.getElementById('mainContacts');

    var child = e.lastElementChild;  
    while (child) 
    {
        e.removeChild(child); 
        child = e.lastElementChild; 
    } 

    var e = document.getElementById('CallersList');

    var child = e.lastElementChild;  
    while (child) 
    {
        e.removeChild(child); 
        child = e.lastElementChild; 
    } 

    var e = document.getElementById('RecivingCallersList');

    var child = e.lastElementChild;  
    while (child) 
    {
        e.removeChild(child); 
        child = e.lastElementChild; 
    } 
} 

function makeAPhoneCall()
{
    var Callercontact_Name = document.getElementById("CallersList").value;
    var Calledcontact_Name = document.getElementById("RecivingCallersList").value;

    var Caller_contact = searchContactByName(Callercontact_Name);
    var Called_contact  = searchContactByName(Calledcontact_Name);

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Caller_contact.CallHistory.push([Calledcontact_Name, time]);

    today = new Date();
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Called_contact.CallerHistory.push([Callercontact_Name, time]);  
}

function emptyListGrid()
{
    var e = document.getElementById('CallerLogs');

    var child = e.lastElementChild;  
    while (child) 
    {
        e.removeChild(child); 
        child = e.lastElementChild; 
    }    
}

//visually create viewlogs
function viewLogs(contact)
{
    emptyListGrid();
    var n;

    if (contact.CallerHistory.length > contact.CallHistory.length)
        n = contact.CallerHistory.length;
    else
        n = contact.CallHistory.length;
    
    var CallersList = document.getElementById('CallerLogs');

    var tbl_row = document.createElement('tr');  
        tbl_row.setAttribute("align","left");
    CallersList.appendChild(tbl_row);

    var TDataName = document.createElement('td');
        TDataName.innerHTML = ' Callers ';
    tbl_row.appendChild(TDataName);

    var TDataName = document.createElement('td');
        TDataName.innerHTML = ' Date ';
    tbl_row.appendChild(TDataName);

    var TDataName = document.createElement('td');
        TDataName.innerHTML = ' Call History';
    tbl_row.appendChild(TDataName)

    var TDataName = document.createElement('td');
        TDataName.innerHTML = ' Date ';
    tbl_row.appendChild(TDataName);

    callerIndex = contact.CallerHistory.length-1;
    callIndex = contact.CallHistory.length-1;
    for(var i = n-1; i >= 0; i--)
    {
        //move to next Contact and create row
        var tbl_row = document.createElement('tr');  
            tbl_row.setAttribute("align","left");
        CallersList.appendChild(tbl_row);

        if (callerIndex >= 0)
        {
            alert('Caller is '+contact.CallerHistory[i][0]+" "+contact.CallerHistory[i][1]);
            var TDataName = document.createElement('td');
                TDataName.innerHTML = contact.CallerHistory[callerIndex][0];
            tbl_row.appendChild(TDataName);
            
            var TDataName = document.createElement('td');
                TDataName.innerHTML = contact.CallerHistory[callerIndex--][1];
            tbl_row.appendChild(TDataName);
        }
        else
        {
            var TDataName = document.createElement('td');
                TDataName.innerHTML = "";
            tbl_row.appendChild(TDataName);
            
            var TDataName = document.createElement('td');
                TDataName.innerHTML = "";
            tbl_row.appendChild(TDataName);
        }

        if (callIndex >= 0)
        {
             var TDataName = document.createElement('td');
                 TDataName.innerHTML = contact.CallHistory[callIndex][0];
             tbl_row.appendChild(TDataName);

            var TDataName = document.createElement('td');
                 TDataName.innerHTML = contact.CallHistory[callIndex--][1];
             tbl_row.appendChild(TDataName);
        }
        else
        {
            var TDataName = document.createElement('td');
                TDataName.innerHTML = "";
            tbl_row.appendChild(TDataName);
            
            var TDataName = document.createElement('td');
                TDataName.innerHTML = "";
            tbl_row.appendChild(TDataName);
        }
    }
}