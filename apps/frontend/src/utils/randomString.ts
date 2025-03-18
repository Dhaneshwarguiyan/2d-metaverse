export const generateRandomString = (len: number) => {
  const random = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let answer = "";
  for (let i = 0; i < len; i++) {
    answer = answer + random[Math.floor(Math.random() * random.length)];
  }
  return answer;
};
