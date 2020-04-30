export const deck = (a, j) => {
  let cards = [];

  const suits = ["PI", "CA", "TR", "CE"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "J",
    "Q",
    "K",
  ];
  for (let n = 0; n < a; n++) {
    j && cards.push(`X${n}`);
    j && cards.push(`Y${n}`);
    suits.map((s) => {
      return values.map((v) => {
        return cards.push(`${v}${s}${n}`);
      });
    });
  }

  return cards;
};
