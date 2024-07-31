import { to24Hour } from "../utilities/dateTime";
import { getDBConnection } from "./dbServices";


export const fetchTransactions = async () => {
  const db = await getDBConnection();
  const query = `SELECT t.id, t.name, t.amount, c.name as category, r.name as recipient, t.tran_date_time , c.icon as icon, c.background_color as backgroundColor,
  c.id as category_id, r.id as recipient_id
  FROM transactions t
  JOIN categories c ON t.category_id = c.id
  JOIN recipients r ON t.recipient_id = r.id
  ORDER BY t.tran_date_time DESC`;
  try {
    const [result] = await db.executeSql(query);
    return result.rows.raw();
  } catch (error) {
    console.error(error);
  }
}

export const addTransaction = async ({
  transactionName,
  transactionAmount,
  transactionCategory,
  transactionDate,
  transactionTime,
  transactionRecipient,
  transactionType
}) => {
  const db = await getDBConnection();

  const [day, month, year] = transactionDate.split('/');
  const formattedDateTime = to24Hour(`${year}-${month.length === 1 ? '0'+month : month}-${ day.length === 1 ? '0'+day : day } ${transactionTime}`);

  const query = `INSERT INTO transactions (name, amount, category_id, recipient_id, tran_date_time) VALUES (?,?,?,?,?)`;
  const data = [
    transactionName,
    Math.abs(transactionAmount) * (transactionType === '1' ? -1 : 1),
    parseInt(transactionCategory),
    parseInt(transactionRecipient),
    formattedDateTime
  ];
  console.log(data);
  try {
    await db.executeSql(query, data);
    console.log('Transaction added');
  } catch (error) {
    console.error(error);
  }
}

export const deleteTransaction = async (id) => {
  const db = await getDBConnection();
  const query = `DELETE FROM transactions WHERE id = ?`;
  try {
    await db.executeSql(query, [id]);
    console.log('Transaction deleted');
  } catch (error) {
    console.error(error);
  }
}

export const updateTransaction = async ({
  transactionId,
  transactionName,
  transactionAmount,
  transactionCategory,
  transactionDate,
  transactionTime,
  transactionRecipient,
  transactionType }) => {
  const [day, month, year] = transactionDate.split('/');
  const formattedDateTime = to24Hour(`${year}-${month.length === 1 ? '0'+month : month}-${ day.length === 1 ? '0'+day : day } ${transactionTime}`);
  const db = await getDBConnection();
  const query = `UPDATE transactions SET name = ?, amount = ?, category_id = ?, recipient_id = ?, tran_date_time = ? WHERE id = ?`;
  const data = [transactionName,
    Math.abs(transactionAmount) * (transactionType === '1' ? -1 : 1),
    parseInt(transactionCategory),
    parseInt(transactionRecipient),
    formattedDateTime,
    transactionId];
  try {
    await db.executeSql(query, data);
    console.log('Transaction updated');
  }
  catch (error) {
    console.error(error);
  }
}


