// Pruebas para la clase Estrategia, to run: node tests/testEstrategia

const Estrategia = require('../entities/Estrategia');

console.log('\n=== Pruebas para Estrategia ===');

// Prueba 1: esOptima
console.log('Prueba 1: esOptima');
const estrategia1 = new Estrategia("alta", [20, 40, 60], ["duros", "duros", "duros"]);
console.assert(estrategia1.esOptima() === true, 'Error: debe devolver true (estrategia válida)');
const estrategia2 = new Estrategia("alta", [20], ["duros"]);
console.assert(estrategia2.esOptima() === false, 'Error: debe devolver false (menos de 2 paradas)');
const estrategia3 = new Estrategia("alta", [20, 40, 60, 80, 100], ["duros", "duros", "duros", "duros", "duros"]);
console.assert(estrategia3.esOptima() === false, 'Error: debe devolver false (más de 4 paradas)');
const estrategia4 = new Estrategia("alta", [5, 40, 60], ["duros", "duros", "duros"]);
console.assert(estrategia4.esOptima() === false, 'Error: debe devolver false (primer intervalo fuera de rango)');
const estrategia5 = new Estrategia("baja", [20, 35, 50], ["blandos", "blandos", "blandos"]);
console.assert(estrategia5.esOptima() === true, 'Error: debe devolver true (estrategia baja válida)');
console.log('Prueba 1 completada');

// Prueba 2: paradasDistribuidasUniformemente
console.log('Prueba 2: paradasDistribuidasUniformemente');
const estrategia6 = new Estrategia("alta", [20, 40, 60], ["duros", "duros", "duros"]);
console.assert(estrategia6.paradasDistribuidasUniformemente() === true, 'Error: debe devolver true (paradas uniformes)');
const estrategia7 = new Estrategia("alta", [10, 25, 50], ["duros", "duros", "duros"]);
console.assert(estrategia7.paradasDistribuidasUniformemente() === false, 'Error: debe devolver false (primer intervalo fuera de rango)');
const estrategia8 = new Estrategia("alta", [20, 40, 70], ["duros", "duros", "duros"]);
console.assert(estrategia8.paradasDistribuidasUniformemente() === false, 'Error: debe devolver false (diferencia entre intervalos > 5)');
console.log('Prueba 2 completada');

// Prueba 3: agresividadConsistente
console.log('Prueba 3: agresividadConsistente');
const estrategia9 = new Estrategia("alta", [20, 40, 60], ["duros", "duros", "duros"]);
console.assert(estrategia9.agresividadConsistente() === true, 'Error: debe devolver true (alta con duros)');
const estrategia10 = new Estrategia("alta", [20, 40, 60], ["blandos", "duros", "duros"]);
console.assert(estrategia10.agresividadConsistente() === false, 'Error: debe devolver false (alta pero con blandos)');
const estrategia11 = new Estrategia("baja", [20, 40, 60], ["blandos", "blandos", "blandos"]);
console.assert(estrategia11.agresividadConsistente() === true, 'Error: debe devolver true (baja con blandos)');
const estrategia12 = new Estrategia("baja", [20, 40, 60], ["duros", "blandos", "blandos"]);
console.assert(estrategia12.agresividadConsistente() === false, 'Error: debe devolver false (baja pero con duros)');
console.log('Prueba 3 completada');

// Prueba 4: registrarParada
console.log('Prueba 4: registrarParada');
const estrategia13 = new Estrategia("alta", [20, 40, 60], ["duros", "duros", "duros"]);
const parada1 = estrategia13.registrarParada(3.5);
console.assert(parada1.numeroParada === 1, 'Error: numeroParada debe ser 1');
console.assert(parada1.tiempo === 3.5, 'Error: tiempo debe ser 3.5');
console.assert(parada1.vuelta === 20, 'Error: vuelta debe ser 20');
console.assert(parada1.neumaticos === "duros", 'Error: neumaticos debe ser "duros"');
console.assert(parada1.tiempoTotalPitStops === 3.5, 'Error: tiempoTotalPitStops debe ser 3.5');
const parada2 = estrategia13.registrarParada(4.0);
console.assert(parada2.numeroParada === 2, 'Error: numeroParada debe ser 2');
console.assert(parada2.tiempoTotalPitStops === 7.5, 'Error: tiempoTotalPitStops debe ser 7.5');
console.log('Prueba 4 completada');

// Prueba 5: obtenerSiguienteParada
console.log('Prueba 5: obtenerSiguienteParada');
const estrategia14 = new Estrategia("alta", [20, 40], ["duros", "duros"]);
const sig1 = estrategia14.obtenerSiguienteParada();
console.assert(sig1.vuelta === 20, 'Error: vuelta debe ser 20');
console.assert(sig1.neumaticos === "duros", 'Error: neumaticos debe ser "duros"');
console.assert(sig1.tiempoEstimado === 2.5, 'Error: tiempoEstimado debe ser 2.5');
console.assert(sig1.numeroParada === 1, 'Error: numeroParada debe ser 1');
estrategia14.registrarParada(3.0);
const sig2 = estrategia14.obtenerSiguienteParada();
console.assert(sig2.vuelta === 40, 'Error: vuelta debe ser 40');
console.assert(sig2.numeroParada === 2, 'Error: numeroParada debe ser 2');
console.log('Prueba 5 completada\n');