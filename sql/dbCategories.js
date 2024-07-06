import { getDBConnection } from "./dbServices";


export const  addDefaultCategories = async ()=>{
  const query = `
  INSERT INTO categories (name,type, icon, background_color)
  VALUES
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
  ('EMI', 'Expense', '💳', 'red'),
  ('Miscellaneous', 'Expense', '❔', 'purple'),
  ('Micellaneous', 'Income', '❓', 'blue');

  `;
  try{
    const db = await getDBConnection();
    await db.executeSql(query);
    console.log('Default Categories Added');
  }
  catch(error){
    console.log(error);
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
    console.log(error);
  }

}