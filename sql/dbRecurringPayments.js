import { getDBConnection } from "./dbServices";

export const fetchRecurringPayments = async () => {
  const db = await getDBConnection();
  const query = `
  SELECT rp.id AS id, rp.name AS name, rp.amount AS amount, rp.start_date AS pay_date, rp.frequency AS frequency,
  c.icon as categoryIcon , c.background_color as categoryColor, rp.category_id AS categoryID, rp.recipient_id AS recipientID
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
  INSERT INTO recurring_payments (name, amount, start_date, frequency, category_id, recipient_id)
  VALUES (?, ?, ?, ?, ?, ?)
  `;

  const data = [
    recPaymentName,
    Math.abs(recPaymentAmount) * (recPaymentType === '1' ? -1 : 1),
    recPaymentNextPayment.split('/').reverse().join('-'),
    recPaymentFrequency,
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

export const deleteRecurringPayments = async (id) =>{
  const db = await getDBConnection();
  const query = `DELETE FROM recurring_payments
  WHERE id = ?
  `
  try{
    await db.executeSql(query,[id]);
    console.log('Recurring Payment Deleted');
  }
  catch(error){
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
  recPaymentType
}) =>{
  const query = `
  UPDATE recurring_payments
  SET name = ?,
  amount = ?,
  start_date = ?,
  frequency = ?,
  category_id = ?,
  recipient_id = ?
  WHERE id = ?
  `
  const data = [
    recPaymentName,
    Math.abs(recPaymentAmount) * (recPaymentType === '1' ? -1 : 1),
    recPaymentNextPayment.split('/').reverse().join('-'),
    recPaymentFrequency,
    parseInt(recPaymentCategory),
    parseInt(recPaymentRecipient),
    recPaymentID
  ]
  const db = await getDBConnection();
  try{
    await db.executeSql(query,data);
    console.log('Recurring Payments Updated');
  }
  catch(error){
    console.error(error);
  }
}