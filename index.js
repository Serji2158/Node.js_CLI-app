const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contact = await getContactById(id);
        if (!contact) {
          console.log(`Sorry, contact with ${id} is not exist`);
          return;
        }
        console.log(`Here is your contact!`);
        console.table(contact);
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log("Contact added");
        console.table(newContact);
        break;

      case "remove":
        const delContact = await removeContact(id);
        if (!delContact) {
          console.log("No such contact to delete");
          return;
        }
        console.table(delContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
}

invokeAction(argv);