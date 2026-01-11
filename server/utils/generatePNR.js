module.exports = function generatePNR() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetters =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)];

  const randomNumbers = Math.floor(100000 + Math.random() * 900000);

  return `${randomLetters}${randomNumbers}`; // e.g. AB345678
};
