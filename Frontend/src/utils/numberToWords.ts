const numberToWords = (num: number): string => {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];
  const teens = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];
  const bigs = ['', 'thousand', 'million', 'billion'];

  if (num === 0) {
    return 'zero';
  }

  if (num < 0) {
    return 'minus ' + numberToWords(Math.abs(num));
  }

  let words = '';

  for (let i = 0; num > 0; i++) {
    if (num % 1000 !== 0) {
      const wordPart = numberToWordsHelper(num % 1000);
      words = wordPart + bigs[i] + ' ' + words;
    }
    num = Math.floor(num / 1000);
  }

  return words.trim();

  function numberToWordsHelper(num: number): string {
    let words = '';

    if (num >= 100) {
      words += ones[Math.floor(num / 100)] + ' hundred ';
      num %= 100;
    }

    if (num >= 10 && num <= 19) {
      words += teens[num - 10] + ' ';
      return words;
    }

    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }

    if (num >= 1 && num <= 9) {
      words += ones[num] + ' ';
    }

    return words;
  }
};

export default numberToWords;
