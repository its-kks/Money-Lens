
const to24Hour = (timestamp) => {

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

export default to24Hour;