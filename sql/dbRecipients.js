import { getDBConnection } from "./dbServices";

export const addDefaultRecipients = async () => {
  const query = `
  INSERT INTO recipients (name, background_color,type)
  VALUES
  ('Unknown','red','Recipient'),
  ('Unknown','green','Payer');
  `
  try {
    const db = await getDBConnection();
    await db.executeSql(query);
    console.log('Default Recipients Added');
  }
  catch (error) {
    console.error(error);
  }
}

export const fetchRecipients = async () => {
  const query = `SELECT * FROM recipients`;
  try {
    const db = await getDBConnection();
    const [results] = await db.executeSql(query);
    const recipients = results.rows.raw();
    return recipients;
  }
  catch (error) {
    console.error(error);
  }

}

export const addRecipient = async ({ recipientName, recipientType, recipientUrl, recipientIcon, recipientBackgroundColor }) => {
  const query = `
  INSERT INTO recipients (name, type, upiUrl, icon, background_color)
  VALUES
  (?, ? , ? , ? , ?);
  `
  try {
    const db = await getDBConnection();
    recipientUrl = recipientUrl === '' ? null : recipientUrl;
    const data = [
      recipientName.trim(),
      recipientType.trim(),
      recipientUrl,
      recipientIcon,
      recipientBackgroundColor,
    ]
    console.log(data);
    await db.executeSql(query, data);
    console.log('Recipient Added');
  }
  catch (error) {
    console.error(error);
  }
}

export const updateRecipient = async ({ recipientId, recipientName, recipientType, recipientUrl, recipientIcon, recipientBackgroundColor }) => {
  const query = `
  UPDATE recipients
  SET name = ?, type = ?, upiUrl = ?, icon = ?, background_color = ?
  WHERE id = ?
  `
  try {
    recipientUrl = recipientUrl === '' ? null : recipientUrl;
    const data = [
      recipientName.trim(),
      recipientType.trim(),
      recipientUrl,
      recipientIcon,
      recipientBackgroundColor,
      recipientId
    ]
    const db = await getDBConnection();
    await db.executeSql(query, data);
    console.log('Recipient Updated');
  }
  catch (error) {
    console.error(error);
  }
}

export const deleteRecipient = async (id) => {
  const queryUpdate = `
  update transactions
  set recipient_id = CASE
    WHEN amount < 0 then 1
      else 2
  END
  where recipient_id = ?; 
  `
  const queryDelete = `
  DELETE FROM recipients
  WHERE id = ?;
  `
  try {
    const db = await getDBConnection();
    await db.executeSql(queryUpdate, [id]);
    await db.executeSql(queryDelete,[id]); 
    console.log('Recipient Deleted');
  }
  catch (error) {
    console.error(error);
  }
}