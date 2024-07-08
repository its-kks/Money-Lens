import { getDBConnection } from "./dbServices";

export const addTransaction = async ({
  transactionName,
  transactionAmount,
  transactionCategory,
  transactionDate,
  transactionTime,
  transactionRecipient,
  transactionType }) => {

  const db = await getDBConnection();
  const query = `INSERT INTO transactions (name, amount, category_id, recipient_id, tran_date_time) VALUES (?,?,?,?,?)`;
  const data = [transactionName,
    Math.abs(transactionAmount) * (transactionType === 'Expense' ? -1 : 1),
    parseInt(transactionCategory),
    parseInt(transactionRecipient),
    `${transactionDate} ${transactionTime}`];
  console.log(data);
  try {
    await db.executeSql(query, data);
    console.log('Transaction added');
  } catch (error) {
    console.error(error);
  }

}
