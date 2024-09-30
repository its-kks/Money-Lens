import { getDBConnection } from "./dbServices";


export const addDefaultCategories = async () => {
  const query = `
  INSERT INTO categories (name, budget_amount, type, icon, background_color)
  VALUES
  ('Miscellaneous', 999999999999999, 'Expense', '❓', 'purple'),
  ('Miscellaneous', 0, 'Income', '❓', 'blue'),
  ('Groceries', 500, 'Expense', '🍞', 'red'),
  ('Transport', 500, 'Expense', '🚗', 'orange'),
  ('Entertainment', 500, 'Expense', '🎥', 'green'),
  ('Clothing', 500, 'Expense', '👕', 'purple'),
  ('Utilities', 500, 'Expense', '💡', 'red'),
  ('Salary', 0, 'Income', '💵', 'grey'),
  ('Health', 500, 'Expense', '🏥', 'blue'),
  ('Electoronics', 500, 'Expense', '📱', 'orange'),
  ('Education', 500, 'Expense', '📚', 'pink'),
  ('Rent', 500, 'Expense', '🏠', 'purple'),
  ('Insurance', 500, 'Expense', '🛡️', 'green'),
  ('Vaccation', 500, 'Expense', '🏖️', 'orange'),
  ('Gifts', 500, 'Expense', '🎁', 'purple'),
  ('EMI', 500, 'Expense', '💳', 'red');

  `;
  try {
    const db = await getDBConnection();
    await db.executeSql(query);
    console.log('Default Categories Added');
  }
  catch (error) {
    console.error(error);
  }
}


export const fetchCategories = async ({lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear ,upperBoundYear}) => {
  const query = `
    WITH trans as (
    SELECT t.category_id, t.amount
    FROM transactions t
    WHERE (t.amount > ? AND t.amount < ?)
    AND (strftime('%m', t.tran_date_time) > ? AND ? > strftime('%m', t.tran_date_time))
    AND (strftime('%Y', t.tran_date_time) > ? AND ? > strftime('%Y', t.tran_date_time))
    )
    SELECT c.id, c.name, c.budget_amount, c.type, c.icon, c.background_color, COALESCE(SUM(t.amount), 0) as total_amount_spent
  FROM categories c
  LEFT OUTER JOIN trans t
  ON c.id = t.category_id
  GROUP BY c.id, c.name, c.budget_amount, c.type, c.icon, c.background_color
  ORDER BY c.id;
  `;
  const data =  [lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear ,upperBoundYear];

  try {
    const db = await getDBConnection();
    const [results] = await db.executeSql(query,data);
    const categories = results.rows.raw();
    return categories;
  }
  catch (error) {
    console.error(error);
  }

}

export const addCategories = async ({ categoryName, categoryBudget, categoryType, categoryIcon, categoryBackgroundColor }) => {
  const query = `
  INSERT INTO categories (name, budeget_amount, type, icon, background_color)
  VALUES
  (?,?,?,?,?);
  `;
  if (categoryBudget === undefined) {
    categoryBudget = 0;
  }
  const data = [
    categoryName.trim(),
    Math.abs(categoryBudget),
    categoryType.trim(),
    categoryIcon,
    categoryBackgroundColor
  ];
  try {
    const db = await getDBConnection();
    await db.executeSql(query, data);
    console.log('Category Added');
  }
  catch (error) {
    console.error(error);
  }
}

export const deleteCategory = async (id) => {
  const queryDelete = `
  DELETE FROM categories WHERE 
  id = ?;
  `
  const queryUpdate = `
  update transactions
  set category_id = CASE
    WHEN amount < 0 then 1
      else 2
  END
  where category_id = ?; 
  `
  const data = [id];
  try {
    const db = await getDBConnection();
    await db.executeSql(queryUpdate, data);
    await db.executeSql(queryDelete, data);
    console.log('Category Deleted');
  }
  catch (error) {
    console.error(error);
  }

}

export const updateCategory = async ({ categoryId, categoryBudget, categoryName, categoryType, categoryIcon, categoryBackgroundColor }) => {
  const query = `
  UPDATE categories
  SET name = ?,
  budget_amount = ?,
  type = ?,
  icon = ?,
  background_color = ?
  WHERE id = ?;
  `;
  if (categoryBudget == undefined) {
    categoryBudget = 0;
  }
  const data = [
    categoryName.trim(),
    Math.abs(categoryBudget),
    categoryType.trim(),
    categoryIcon,
    categoryBackgroundColor,
    categoryId
  ];
  try {
    const db = await getDBConnection();
    await db.executeSql(query, data);
    console.log('Category Updated');
  }
  catch (error) {
    console.error(error);
  }
}