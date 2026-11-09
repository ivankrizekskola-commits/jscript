import { loadExpenses, saveExpenses } from "./storage.js";

const APP_NAME = "Troškovnik";
console.log(`== ${APP_NAME} ==`);
import formatExpense from './format.js';


const args = process.argv.slice(2);
const command = args[0];
const args1 = args[1];
const args2 = args[2];
console.log("Naredba:", command);
console.log("Argument 1:", args1);
console.log("Argument 2:", args2);

let expenses;
try {
    expenses = loadExpenses();
} catch (error) {
    console.error('Datoteka expenses.json nije ispravna: ${error.message}');
    process.exit(1);
}

switch (command) {
    case "add": 
        const amount = Number(args2); 
        if (args1 === undefined || Number.isNaN(amount)) {
            console.error("Korištenje: add 'opis' iznos");
            process.exit(1);    
        }

        let newId = 1;
        if (expenses.length > 0) {
            newId = expenses[expenses.length - 1].id + 1;
        }

        expenses.push({id: newId, description: args1, amount: amount});

        saveExpenses(expenses);

        console.log(`Dodano: ${args1} (id: ${newId})`);

        break;

    case "list":
        if (expenses.length === 0) {
            console.log("Nema troškova.");
        } else {
            for (let i = 0; i < expenses.length; i++) {
                const expense = expenses[i];
                console.log(formatExpense(expense));
            }
        }

        break;

    case "total":
        let total = 0;
        for (const expense of expenses) {
            total += expense.amount; 
        }
        console.log(`Ukupno: ${total} ${currency}`);

        break;

    default:
        console.error("Nepoznata naredba. Koristi: add, list, total.", command);
        process.exit(1);
    }