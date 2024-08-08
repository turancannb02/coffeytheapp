// zodiacUtils.ts

export const getZodiacSign = (birthday: Date) => {
  const date = new Date(birthday);
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();

  if ((month === 1 && day <= 19) || (month === 12 && day >= 22)) {
    return 'Oğlak';
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'Kova';
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return 'Balık';
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'Koç';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'Boğa';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'İkizler';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'Yengeç';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Aslan';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Başak';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'Terazi';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'Akrep';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'Yay';
  }
};
