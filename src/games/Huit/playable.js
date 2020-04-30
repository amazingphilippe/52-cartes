export const playable = (G, a, b) => {
  //VSSD Valeur, Sorte, Deck
  //a = stack, b = play

  const _a = { valeur: a.slice(0, 1), sorte: a.slice(1, 3) };
  const _b = { valeur: b.slice(0, 1), sorte: b.slice(1, 3) };

  let playable = false;

  if (_a.valeur === _b.valeur) playable = true;
  if (_a.sorte === _b.sorte && G.action.sorte === "") playable = true;
  if (_b.valeur === "8" || _b.valeur === "X" || _b.valeur === "Y")
    playable = true;
  if (_b.sorte === G.action.sorte) playable = true;

  if (G.action.pickup === 5) playable = false;
  if (G.action.pickup > 0 && _a.valeur !== _b.valeur) playable = false;
  if (G.action.skip) playable = false;

  return playable;
};
