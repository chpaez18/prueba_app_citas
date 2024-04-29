//Nos ayudara a generar un id aleatorio para la tarea
export const generateID = () =>
  window.URL.createObjectURL(new Blob([])).slice(-36);


//Nos ayudara a simular un tiempo de espera
export const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));