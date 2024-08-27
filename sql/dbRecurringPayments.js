import { addMonths } from "../utilities/dateTime";
import { getDBConnection } from "./dbServices";

export const fetchRecurringPayments = async () => {
  const db = await getDBConnection();
  const query = `
  SELECT rp.id AS id, rp.name AS name, rp.amount AS amount, rp.start_date AS pay_date, rp.frequency AS frequency,
  rp.next_date AS next_date, rp.action_added AS action_added, rp.money_saved as saved, c.icon as categoryIcon , 
  c.background_color as categoryColor, rp.category_id AS categoryID, rp.recipient_id AS recipientID
  FROM recurring_payments rp,
  categories c
  WHERE rp.category_id = c.id
  `;
  try {
    const [result] = await db.executeSql(query);
    return result.rows.raw();
  } catch (error) {
    console.error(error);
  }
}

export const addRecurringPayments = async ({
  recPaymentName,
  recPaymentAmount,
  recPaymentCategory,
  recPaymentRecipient,
  recPaymentNextPayment,
  recPaymentFrequency,
  recPaymentType

}) => {
  const db = await getDBConnection();
  const query = `
  INSERT INTO recurring_payments (name, amount, start_date, frequency, next_date, category_id, recipient_id)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const start_date = recPaymentNextPayment.split('/').reverse().join('-');
  const next_date = addMonths(start_date, recPaymentFrequency);

  const data = [
    recPaymentName,
    Math.abs(recPaymentAmount) * (recPaymentType === '1' ? -1 : 1),
    start_date,
    recPaymentFrequency,
    next_date,
    parseInt(recPaymentCategory),
    parseInt(recPaymentRecipient)
  ]

  try {
    await db.executeSql(query, data);
    console.log('Recurring Payment added');
  } catch (error) {
    console.error(error);
  }
}

export const deleteRecurringPayments = async (id) => {
  const db = await getDBConnection();
  const query = `DELETE FROM recurring_payments
  WHERE id = ?
  `
  try {
    await db.executeSql(query, [id]);
    console.log('Recurring Payment Deleted');
  }
  catch (error) {
    console.error(error);
  }

}

export const updateRecurringPayments = async ({
  recPaymentID,
  recPaymentName,
  recPaymentAmount,
  recPaymentCategory,
  recPaymentRecipient,
  recPaymentNextPayment,
  recPaymentFrequency,
  recPaymentType,
  recPaymentActionAdded
}) => {
  const query = `
  UPDATE recurring_payments
  SET name = ?,
  amount = ?,
  start_date = ?,
  frequency = ?,
  next_date = ?,
  category_id = ?,
  recipient_id = ?
  action_added = ?
  WHERE id = ?
  `
  const start_date_updated = recPaymentNextPayment.split('/').reverse().join('-');
  const next_date_updated = addMonths(start_date_updated, recPaymentFrequency);
  const data = [
    recPaymentName,
    Math.abs(recPaymentAmount) * (recPaymentType === '1' ? -1 : 1),
    start_date_updated,
    recPaymentFrequency,
    next_date_updated,
    parseInt(recPaymentCategory),
    parseInt(recPaymentRecipient),
    recPaymentActionAdded,
    recPaymentID
  ]
  const db = await getDBConnection();
  try {
    await db.executeSql(query, data);
    console.log('Recurring Payments Updated');
  }
  catch (error) {
    console.error(error);
  }
}