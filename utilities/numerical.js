export default function numToWords(num) {
  if (num) {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales = ['', 'Thousand', 'Lakh', 'Crore'];

    function convertTwoDigits(n) {
      if (n === 0) return '';
      if (n < 10) return units[n] + ' ';
      if (n < 20) return teens[n - 10] + ' ';
      return tens[Math.floor(n / 10)] + ' ' + (n % 10 !== 0 ? units[n % 10] + ' ' : '');
    }

    function convertThreeDigits(n) {
      let result = '';
      if (n >= 100) {
        result += units[Math.floor(n / 100)] + ' Hundred ';
        n %= 100;
      }
      return result + convertTwoDigits(n);
    }

    if (num === 0) return 'Zero';

    let result = '';
    let scaleIndex = 0;

    while (num > 0) {
      if (num % 100 !== 0) {
        if (scaleIndex === 0) {
          result = convertThreeDigits(num % 1000) + scales[scaleIndex] + ' ' + result;
          num = Math.floor(num / 1000);
        } else {
          result = convertTwoDigits(num % 100) + scales[scaleIndex] + ' ' + result;
          num = Math.floor(num / 100);
        }
      } else {
        num = Math.floor(num / 100);
      }
      scaleIndex++;
    }

    return result.trim();
  }
  else{
    return "Zero";
  }
}
