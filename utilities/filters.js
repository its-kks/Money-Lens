import { negativeInf, positiveInf } from "../constants/numeric";


const returnLowerAmount = (type) => {
  switch (type) {
    case 'Any':
      return negativeInf;
    case 'Income':
      return 0;
    case 'Expenditure':
      return negativeInf;
    default:
      return 0;
  }
}
const returnUpperAmount = (type) => {
  switch (type) {
    case 'Any':
      return positiveInf;
    case 'Income':
      return positiveInf;
    case 'Expenditure':
      return 0;
    default:
      return 0;
  }
}

const returnLowerMonth = (month) => {
  const date = new Date();
  switch (month) {
    case 'This Month':
      return date.getMonth();
    case 'Prev Month':
      if (date.getMonth() == 0) {
        return 11;
      }
      else{
        return date.getMonth() - 1;
      }
    case 'Janurary':
      return 0;
    case 'Feburary':
      return 1;
    case 'March':
      return 2;
    case 'April':
      return 3;
    case 'May':
      return 4;
    case 'June':
      return 5;
    case 'July':
      return 6;
    case 'August':
      return 7;
    case 'September':
      return 8;
    case 'October':
      return 9;
    case 'November':
      return 10;
    case 'December':
      return 11;
    default:
      return 0;
  }
}

const returnLowerYear = (year) => {
  const date = new Date();
  switch (year) {
    case 'This Year':
      return date.getFullYear() - 1;
    case 'Prev Year':
      return date.getFullYear() - 2;
    default:
      return 0;
  }
}

export { returnLowerAmount, returnUpperAmount, returnLowerMonth, returnLowerYear };