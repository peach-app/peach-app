export const formatToMoneyFromPence = pence =>
  '£' + ((parseFloat(pence) || 0) / 100).toFixed(2);

export const formatToPenceFromMoney = money =>
  money
    .substring(1)
    .split('.')
    .join('');
