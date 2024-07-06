import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

// Enable promises
enablePromise(true);

// Open database
export const getDBConnection = async () => {
  return openDatabase({
    name: 'money-lens-expense.db',
    location: 'default',
  });
};

// Create tables functions
export const createTableCategories = async (db) => {
  const query = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Expense', 'Income')),
    icon TEXT NOT NULL DEFAULT '❓',
    background_color TEXT DEFAULT 'blue' NOT NULL
  );`;
  await db.executeSql(query);
  console.log('Category Table Created');
};

export const createTableRecipients = async (db) => {
  const query = `
  CREATE TABLE IF NOT EXISTS recipients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    upiUrl TEXT,
    icon TEXT NOT NULL DEFAULT '🤷‍♂',
    background_color TEXT DEFAULT 'red' NOT NULL
  );`;
  await db.executeSql(query);
  console.log('Recipient Table Created');
};

export const createTableRecurringPayments = async (db) => {
  const query = `
  CREATE TABLE IF NOT EXISTS recurring_payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount REAL NOT NULL,
    start_date DATE NOT NULL,
    frequency INTEGER NOT NULL DEFAULT 1,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE
  );`;
  await db.executeSql(query);
  console.log('Recurring Payments Table Created');
};

export const createTableTransactions = async (db) => {
  const query = `
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category_id INTEGER,
    recipient_id INTEGER,
    tran_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES recipients(id) ON DELETE SET NULL ON UPDATE CASCADE
  );`;
  await db.executeSql(query);
  console.log('Transactions Table Created');
};

export const createTableSavings = async (db) => {
  const query = `
  CREATE TABLE IF NOT EXISTS savings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount REAL NOT NULL,
    saved REAL NOT NULL DEFAULT 0,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE
  );`;
  await db.executeSql(query);
  console.log('Savings Table Created');
};

export const createTables = async () => {
  try {
    const db = await getDBConnection();
    await createTableCategories(db);
    await createTableRecipients(db);
    await createTableRecurringPayments(db);
    await createTableTransactions(db);
    await createTableSavings(db);
    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

export const createMiscData = async () => {
    try{
        const db = await getDBConnection();
        await db.executeSql('INSERT INTO categories (name, type, icon, background_color) VALUES ("Miscellaneous", "Expense", "❔", "red")');
    }
    catch(error){
        console.error('Error creating misc data:', error);
    }
};
