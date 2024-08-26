
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

export function addMonths(dateStr, n) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const newDate = new Date(date.getTime());
  newDate.setMonth(newDate.getMonth() + n);

  // check if the new date's day is different after adding the months
  if (newDate.getDate() < day) {
      // set the date to the last day of the previous month
      newDate.setDate(0);
  }

  const newYear = newDate.getFullYear();
  const newMonth = String(newDate.getMonth() + 1).padStart(2, '0');
  const newDay = String(newDate.getDate()).padStart(2, '0');

  return `${newYear}-${newMonth}-${newDay}`;
}