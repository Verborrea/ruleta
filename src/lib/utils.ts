export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function getRandomItem(items: any[]) {
  const totalWeight = items.reduce((sum, item) => sum + item.prob, 0);

  if (totalWeight <= 0) {
    throw new Error("La suma de las probabilidades debe ser mayor que 0.");
  }

  const random = Math.random() * totalWeight;
  let cumulativeWeight = 0;

  for (const item of items) {
    cumulativeWeight += item.prob;
    if (random < cumulativeWeight) {
      return item
    }
  }

  throw new Error("No se pudo seleccionar un elemento. Verifica las probabilidades.");
}