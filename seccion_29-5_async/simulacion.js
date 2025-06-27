// Simulamos una función que "llama a la API" con delay
const fakeApiCall = (id, delay) => {
  return new Promise((resolve) => {
    console.log(`⏳ Iniciando llamada a la API con ID: ${id}`);
    setTimeout(() => {
      console.log(`✅ Respuesta recibida para ID: ${id}`);
      resolve({ id, data: `Resultado para ${id}` });
    }, delay);
  });
};

// Simulamos una búsqueda que devuelve varios IDs
const ids = [101, 102, 103, 104, 105];

// Map con promesas asincrónicas
const main = async () => {
  console.log('🔍 Iniciando búsqueda...');

  const promises = ids.map((id, index) => {
    // Cada "llamada" tarda entre 1 y 3 segundos
    const delay = 1000 + index * 500;
    return fakeApiCall(id, delay);
  });

  console.log('🕒 Todas las llamadas están en curso...');
  
  // Esperamos todas
  const results = await Promise.all(promises);

  console.log('🎉 Todas las respuestas llegaron:');
  console.log(results);
};

main();