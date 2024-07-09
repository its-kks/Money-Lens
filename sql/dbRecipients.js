import { getDBConnection } from "./dbServices";

export const addDefaultRecipients = async ()=>{
  const query = `
  INSERT INTO recipients (name, background_color,type)
  VALUES
  ('Unknown','red','recipient')
  ('Unknown','green','payer'),
  `
  try{
    const db = await getDBConnection();
    await db.executeSql(query);
    console.log('Default Recipients Added');
  }
  catch(error){
    console.error(error);
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
    console.error(error);
  }

}

export const addRecipient = async (name, icon, backgroundColor)=>{
  const query = `
  INSERT INTO recipients (name, background_color)
  VALUES
  (?,?)
  `
  try{
    const db = await getDBConnection();
    await db.executeSql(query,[name, backgroundColor]);
    console.log('Recipient Added');
  }
  catch(error){
    console.error(error);
  }
}