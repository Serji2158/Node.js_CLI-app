// contacts.js
const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");
console.log(contactsPath);

// TODO: задокументировать каждую функцию

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}
console.log(listContacts);

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === Number(contactId));
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contact = await getContactById(contactId);
    const contacts = await listContacts();
    changedListContacts = contacts.filter(
      (item) => item.id !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(changedListContacts));
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    const contactsList = JSON.stringify([...contacts, newContact], null, "\t");
    await fs.writeFile(contactsPath, contactsList, (err) => {
      if (err) console.error(err);
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
