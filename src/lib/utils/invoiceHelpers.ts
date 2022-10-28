export const generateId = () => {
  // generate randomnumber between 1000 and 9999
  const random = Math.floor(Math.random() * 9000) + 1000;
  // get 2 random letters from the alphabet
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter1 = letters.charAt(Math.floor(Math.random() * letters.length));
  const letter2 = letters.charAt(Math.floor(Math.random() * letters.length));
  // return the random number and letters
  return `${letter1}${letter2}${random}`;
};
