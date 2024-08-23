import { getDBConnection } from './dbServices'

export const fetchSavings = async () => {
  const query = `
  SELECT * FROM savings;
  `;
  const db = await getDBConnection();
  try{
    const [result] = await db.executeSql(query);
    return result.rows.raw();
    console.log('Savings fetched');
  }
  catch (error) {
    console.error(error);
  }
}

export const addSaving = async ({
  savingName,
  savingAmount,
  savingCategory,
  savingDate
}) => {
  const query = `
  INSERT INTO savings (name, amount, category_id, buy_date)
  VALUES (?, ?, ?, ?);
  `;
  const data = [
    savingName,
    savingAmount.abs()*-1,
    parseInt(savingCategory),
    savingDate.split('/').reverse().join('-')
  ];
  const db = await getDBConnection();
  try{
    await db.executeSql(query, data);
    console.log('Saving added');
  }
  catch (error) {
    console.error(error);
  }
}

export const deleteSaving = async (id) => {
  const query = `
  DELETE FROM savings
  WHERE id = ?;
  `;
  const db = await getDBConnection();
  try{
    await db.executeSql(query, [id]);
    console.log('Saving deleted');
  }
  catch (error) {
    console.error(error);
  }
}

export const updateSaving = async ({
  savingID,
  savingName,
  savingAmount,
  savingCategory,
  savingDate
}) => {
  const query = `
  UPDATE savings
  SET name = ?, amount = ?, category_id = ?, buy_date = ?
  WHERE id = ?;
  `;
  const data = [
    savingName,
    savingAmount.abs()*-1,
    parseInt(savingCategory),
    savingDate.split('/').reverse().join('-'),
    savingID
  ];
  const db = await getDBConnection();
  try{
    await db.executeSql(query, data);
    console.log('Saving updated');
  }
  catch (error) {
    console.error(error);
  }
}