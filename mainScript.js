//contact object
function Contact(name, number)
{
    var next;
    this.next = 0;
    this.name = name;
    this.number = number;
}

//initial contact
var mainContact = new Contact("empty", "empty");

function newContact(name, number)
{
    var contact = new Contact(name, number);

    if (mainContact.name == "empty")
        {mainContact = contact; return;}

    //initial variabls and assign mainContact to tail
    var tail = mainContact;
    var head, tmp;

    //if there is only 1 contact then the head is same as tail 
    //else head is the next contact
    if (tail.next === 0)
        {head = tail;} else {head = tail.next;}

    //increment both the head and tail untill
    //you find an empty head
    while (head.next != 0)
        { tail = head; head = head.next; }

    //assign the new contact
    head.next = contact;
}

function editContact(contact, name, number)
{
    if ((name != "") && (number != ""))
    {
        contact.name = name;
        contact.number = number;
    }
    else
    {   
        //do something here to force name and number
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
}

function deleteContactByPhone(number)
{
    var contact;
    if (mainContact.number == "empty")
    {
        alert("there is no contacts to delete");
        return;
    }
    else
    {
        if (mainContact.number === number)
        {
            if (mainContact.next == 0)
                {mainContact.name = mainContact.number = "empty"; return;}
            else
                {mainContact = mainContact.next; return;}
        }
        
        contact = mainContact;
        while(contact.next.number != number)
        {
            contact = contact.next;
        }
        //delete the contact in the middle and connect the other ends
        if (contact.next.next != 0)
        {contact.next = contact.next.next;}
        else //else delete the contact
        contact.next = 0;
    }
}


function searchContactByName(contact)
{


}

function searchContactByPhone(contact)
{


}

function orderAlpha()
{
    
}

function main()
{
    newContact('abo ali', '1234');
    newContact('hassan', '12342');
    newContact('ahmaddd', '53543');
    newContact('ahmaddss2d', '53543');
    newContact('ahmaddssd', '535433');

    //make delete by number same as delete by phone for last index
    //if found more then one number ask who to delete dialog
    contact = mainContact;
    console.log(contact.name);
    do
    {
        contact = contact.next;
        console.log(contact.name);  
    }
    while (contact.next != 0)
}

main();