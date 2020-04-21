export const readableName = (name) => {
  return (
    name.replace("-", " ").charAt(0).toUpperCase() +
    name.replace("-", " ").slice(1)
  );
};
