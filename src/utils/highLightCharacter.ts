export const highLightCharacter = (value: number) => {
  if (value >= 8) return 'green';
  else if (value >= 5) return 'orange';
  else return 'red';
};
