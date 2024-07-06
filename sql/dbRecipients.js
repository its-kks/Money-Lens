import { getDBConnection } from "./dbServices";

export const addDefaultRecipients = async ()=>{
  const query = `
  INSERT INTO recipients (name, background_color)
  VALUES
  ('Unknown','green')
  `
  try{
    const db = await getDBConnection();
    await db.executeSql(query);
    console.log('Default Recipients Added');
  }
  catch(error){
    console.log(error);
  }
}

export const fetchRecipients = async ()=>{
  const query = `SELECT * FROM recipients`;
  try{
    const db = await getDBConnection();
    const [results] = await db.executeSql(query);
    const recipients = results.rows.raw();
    return recipients;
  }
  catch(error){
    console.log(error);
  }

}