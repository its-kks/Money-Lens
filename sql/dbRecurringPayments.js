import { getDBConnection } from "./dbServices";

export const fetchRecurringPayments = async () => {
  const db = await getDBConnection();
  const query = `
  SELECT rp.id AS id, rp.name AS name, rp.amount AS amount, rp.start_date AS pay_date, rp.frequency AS frequency,
  c.icon as categoryIcon , c.background_color as categoryColor
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

