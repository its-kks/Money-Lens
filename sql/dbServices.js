import SQLite from 'react-native-sqlite-storage';

// Enable promises
SQLite.DEBUG(true);
SQLite.enablePromise(true);


// Open database
export const getDBConnection = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: 'money-lens-expense.db',
      location: 'default',
    });
    console.log('Database opened');
    return db;
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
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
    type TEXT NOT NULL CHECK (type in ('Recipient', 'Payer')),
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
    next_date DATE NOT NULL,
    action_added DATE NOT NULL DEFAULT '1900-01-01',
    money_saved INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER,
    recipient_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES recipients(id) ON DELETE SET NULL ON UPDATE CASCADE
  );`;
  await db.executeSql(query);
  console.log('Recurring Payments Table Created');
};

export const createTableTransactions = async (db) => {
  const query = `
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
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
    buy_date DATE NOT NULL,
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
    console.log('Creating misc data');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};