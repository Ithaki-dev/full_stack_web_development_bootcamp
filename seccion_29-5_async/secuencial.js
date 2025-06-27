// Simula una llamada a la API con retraso
const fakeApiCall = (id, delay) => {
  return new Promise((resolve) => {
    console.log(`⏳ Iniciando llamada a la API con ID: ${id}`);
    setTimeout(() => {
      console.log(`✅ Respuesta recibida para ID: ${id}`);
      resolve({ id, data: `Resultado para ${id}` });
    }, delay);
  });
};

const ids = [201, 202, 203, 204, 205];

const main = async () => {
  console.log('🔍 Iniciando búsqueda secuencial...');
  const results = [];

  for (let i = 0; i < ids.length; i++) {
    const delay = 1000 + i * 500; // similar a antes
    const result = await fakeApiCall(ids[i], delay);
    results.push(result);
  }

  console.log('🎉 Todas las respuestas llegaron:');
  console.log(results);
};

main();