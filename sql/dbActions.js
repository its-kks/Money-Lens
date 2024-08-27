import { getDBConnection } from "./dbServices";


export const fetchActions = async () => {
  const query = `SELECT * FROM actons`
  try {
    const db = await getDBConnection();
    const [results] = await db.executeSql(query);
    const actions = results.rows.raw();
    return actions;
  }
  catch (error) {
    console.error(error);
  }
}

export const addActions = async ({
  actionAmount, actionType, recurringPaymentID
}) => {
  const query = `
  INSERT into actions (amount, type, recurring_payment_id)
  VALUES (?,?,?);
  `
  const data = [
    actionAmount,
    actionType,
    recurringPaymentID
  ]
  try{
    const db = await getDBConnection();
    await db.executeSql(query, data);
    console.log('Actions Added');
  }
  catch (error) {
    console.error(error);
  }
}

export const deleteActions = async (id) => {
  const query = `DELETE FROM actions WHERE 
  id = ?;
  `
  const data = [id]

  try{
    const db = await getDBConnection();
    db.executeSql(query, data);
    console.log('Actions Deleted');
  }
  catch (error) {
    console.error(error);
  }
}