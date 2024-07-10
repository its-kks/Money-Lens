import { getDBConnection } from "./dbServices";

export const fetchMonthMoney = async () => {
  const queryPositive = `
  SELECT SUM(amount) as positive
  FROM transactions
  WHERE strftime('%Y', tran_date_time) = strftime('%Y', 'now')
  AND strftime('%m', tran_date_time) = strftime('%m', 'now')
  AND amount > 0;
  `
  const queryNegative = `
  SELECT SUM(amount) negative
  FROM transactions
  WHERE strftime('%Y', tran_date_time) = strftime('%Y', 'now')
  AND strftime('%m', tran_date_time) = strftime('%m', 'now')
  AND amount < 0;
  `
  try {
    const db = await getDBConnection();
    const [resultPositive] = await db.executeSql(queryPositive,[]);
    const [resultNegative] = await db.executeSql(queryNegative,[]);
    const positiveData = resultPositive.rows.raw();
    const negativeData = resultNegative.rows.raw();
    const combined = positiveData.map((item, index) => {
      return { ...item, ...negativeData[index] };
    });
    return combined;
  }
  catch (error) {
    console.error(error);
  }

}