
export function to24Hour (timestamp){

  let [date, time, ampm] = timestamp.split(' ')
  if(!ampm){
    return timestamp;
  }
  let [hour, min, sec] = time.split(':')
  if (ampm == 'am') {
    if (hour == '12') {
      hour = '00';
    }
    if (hour.length == '1') {
      hour = '0' + hour;
    }
  }
  else {
    if (hour != '12') {
      let hourNum = parseInt(hour);
      hourNum += 12;
      hour = "" + hourNum;
    }
  }
  time = hour + ":" + min + ":" + sec;
  return date + " " + time;
}

export function formattedDate(){
  const date = new Date();
  return [
    date.getDate().toString().padStart(2, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'), // Months are 0-based
    date.getFullYear(),
  ].join('/');
}

export function formattedTime(){
  const date = new Date();
  return [
    date.getHours().toString().padStart(2, '0'),
    date.getMinutes().toString().padStart(2, '0'),
    date.getSeconds().toString().padStart(2, '0'),
  ].join(':');
}
