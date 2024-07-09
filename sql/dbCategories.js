import { getDBConnection } from "./dbServices";


export const  addDefaultCategories = async ()=>{
  const query = `
  INSERT INTO categories (name,type, icon, background_color)
  VALUES
  ('Miscellaneous', 'Expense', '❓', 'purple'),
  ('Miscellaneous', 'Income', '❓', 'blue'),
  ('Groceries', 'Expense', '🍞', 'red'),
  ('Transport', 'Expense', '🚗', 'orange'),
  ('Entertainment', 'Expense', '🎥', 'green'),
  ('Clothing', 'Expense', '👕', 'purple'),
  ('Utilities', 'Expense', '💡', 'red'),
  ('Salary', 'Income', '💵', 'grey'),
  ('Health', 'Expense', '🏥', 'blue'),
  ('Electoronics', 'Expense', '📱', 'orange'),
  ('Education', 'Expense', '📚', 'pink'),
  ('Rent', 'Expense', '🏠', 'purple'),
  ('Insurance', 'Expense', '🛡️', 'green'),
  ('Vaccation', 'Expense', '🏖️', 'orange'),
  ('Gifts', 'Expense', '🎁', 'purple'),
  ('EMI', 'Expense', '💳', 'red');

  `;
  try{
    const db = await getDBConnection();
    await db.executeSql(query);
    console.log('Default Categories Added');
  }
  catch(error){
    console.error(error);
  }
}


export const fetchCategories = async ()=>{
  const query = `SELECT * FROM categories`;
  try{
    const db = await getDBConnection();
    const [results] = await db.executeSql(query);
    const categories = results.rows.raw();
    return categories;
  }
  catch(error){
    console.error(error);
  }

}

export const addCategories = async ({categoryName, categoryType, categoryIcon, categoryBackgroundColor})=>{
  const query = `
  INSERT INTO categories (name,type, icon, background_color)
  VALUES
  (?,?,?,?);
  `;
  const data = [
    categoryName.trim(),
    categoryType.trim(),
    categoryIcon,
    categoryBackgroundColor
  ];
  console.log(data);
  try{
    const db = await getDBConnection();
    await db.executeSql(query,data);
    console.log('Category Added');
  }
  catch(error){
    console.error(error);
  }
}

export const deleteCategory = async (id)=>{
  const query = ` DELETE FROM categories WHERE id = ?`;
  const data = [id];
  try{
    const db = await getDBConnection();
    await db.executeSql(query,data);
    console.log('Category Deleted');
  }
  catch(error){
    console.error(error);
  }

}

export const updateCategory = async ({categoryId, categoryName, categoryType, categoryIcon, categoryBackgroundColor})=>{
  const query = `
  UPDATE categories
  SET name = ?,
  type = ?,
  icon = ?,
  background_color = ?
  WHERE id = ?;
  `;
  const data = [
    categoryName.trim(),
    categoryType.trim(),
    categoryIcon,
    categoryBackgroundColor,
    categoryId
  ];
  try{
    const db = await getDBConnection();
    await db.executeSql(query,data);
    console.log('Category Updated');
  }
  catch(error){
    console.error(error);
  }
}