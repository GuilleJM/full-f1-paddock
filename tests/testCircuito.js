// Pruebas para la clase Circuito, to run: node tests/testCircuito

const Circuito = require('../entities/Circuito');

console.log('\n=== Pruebas para Circuito ===');

const circuitoPrueba = new Circuito('Monaco', 'Monte Carlo', 3.337, 'urbano');

// Prueba 1: esDesafiante
console.log('Prueba 1: esDesafiante');
circuitoPrueba.curvas = [
    { nombre: 'Curva1', velocidadMaxima: 50, dificultad: 'alta', numeroCurva: 1 },
    { nombre: 'Curva2', velocidadMaxima: 60, dificultad: 'alta', numeroCurva: 2 },
    { nombre: 'Curva3', velocidadMaxima: 70, dificultad: 'media', numeroCurva: 3 },
    { nombre: 'Curva4', velocidadMaxima: 80, dificultad: 'media', numeroCurva: 4 },
    { nombre: 'Curva5', velocidadMaxima: 90, dificultad: 'baja', numeroCurva: 5 },
    { nombre: 'Curva6', velocidadMaxima: 100, dificultad: 'alta', numeroCurva: 6 },
    { nombre: 'Curva7', velocidadMaxima: 110, dificultad: 'alta', numeroCurva: 7 },
    { nombre: 'Curva8', velocidadMaxima: 120, dificultad: 'media', numeroCurva: 8 },
    { nombre: 'Curva9', velocidadMaxima: 130, dificultad: 'baja', numeroCurva: 9 },
    { nombre: 'Curva10', velocidadMaxima: 140, dificultad: 'alta', numeroCurva: 10 },
    { nombre: 'Curva11', velocidadMaxima: 150, dificultad: 'alta', numeroCurva: 11 }
];
circuitoPrueba.zonasDRS = [
    { nombre: 'Túnel', longitud: 0.5, numeroZona: 1 },
    { nombre: 'Nouvelle Chicane', longitud: 0.3, numeroZona: 2 }
];
circuitoPrueba.longitudKm = 5.5;
const esDesafiante1 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante1 === true, 'Error: debe devolver true (circuito desafiante)');
circuitoPrueba.curvas.pop();
const esDesafiante2 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante2 === false, 'Error: debe devolver false (curvas <= 10)');
circuitoPrueba.curvas.push({ nombre: 'Curva11', velocidadMaxima: 150, dificultad: 'baja', numeroCurva: 11 });
circuitoPrueba.zonasDRS.pop();
const esDesafiante3 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante3 === false, 'Error: debe devolver false (zonasDRS < 2)');
circuitoPrueba.zonasDRS.push({ nombre: 'Nouvelle Chicane', longitud: 0.3, numeroZona: 2 });
circuitoPrueba.longitudKm = 5.0;
const esDesafiante4 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante4 === false, 'Error: debe devolver false (longitudKm <= 5)');
circuitoPrueba.longitudKm = 5.5;
circuitoPrueba.curvas = circuitoPrueba.curvas.map(curva => ({ ...curva, dificultad: 'baja' }));
const esDesafiante5 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante5 === false, 'Error: debe devolver false (dificultadPromedio <= 2)');
console.log('Prueba 1 completada');

// Prueba 2: agregarCurva
console.log('Prueba 2: agregarCurva');
circuitoPrueba.curvas = []; // Reiniciar estado
const curva1 = circuitoPrueba.agregarCurva('Loews Hairpin', 50, 'alta');
console.assert(curva1.nombre === 'Loews Hairpin', 'Error: nombre debe ser "Loews Hairpin"');
console.assert(curva1.velocidadMaxima === 50, 'Error: velocidadMaxima debe ser 50');
console.assert(curva1.dificultad === 'alta', 'Error: dificultad debe ser "alta"');
console.assert(curva1.numeroCurva === 1, 'Error: numeroCurva debe ser 1');
console.assert(circuitoPrueba.curvas.length === 1, 'Error: curvas.length debe ser 1');
const curva2 = circuitoPrueba.agregarCurva('Casino Square', 80, 'media');
console.assert(curva2.numeroCurva === 2, 'Error: numeroCurva debe ser 2');
console.assert(circuitoPrueba.curvas.length === 2, 'Error: curvas.length debe ser 2');
try {
    circuitoPrueba.agregarCurva(null, 50, 'alta');
    console.assert(false, 'Error: debería lanzar excepción por parámetros nulos');
} catch (e) {
    console.assert(e.message === 'No se aportaron las características necesarias', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 2 completada');

// Prueba 3: agregarZonaDRS
console.log('Prueba 3: agregarZonaDRS');
circuitoPrueba.zonasDRS = []; // Reiniciar estado
const zonaDRS1 = circuitoPrueba.agregarZonaDRS('Túnel', 0.5);
console.assert(zonaDRS1.nombre === 'Túnel', 'Error: nombre debe ser "Túnel"');
console.assert(zonaDRS1.longitud === 0.5, 'Error: longitud debe ser 0.5');
console.assert(zonaDRS1.numeroZona === 1, 'Error: numeroZona debe ser 1');
console.assert(circuitoPrueba.zonasDRS.length === 1, 'Error: zonasDRS.length debe ser 1');
const zonaDRS2 = circuitoPrueba.agregarZonaDRS('Nouvelle Chicane', 0.3);
console.assert(zonaDRS2.numeroZona === 2, 'Error: numeroZona debe ser 2');
console.assert(circuitoPrueba.zonasDRS.length === 2, 'Error: zonasDRS.length debe ser 2');
try {
    circuitoPrueba.agregarZonaDRS(null, 0.5);
    console.assert(false, 'Error: debería lanzar excepción por parámetros nulos');
} catch (e) {
    console.assert(e.message === 'No se aportaron las características necesarias', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 3 completada');

// Prueba 4: establecerCondicionesClimaticas
console.log('Prueba 4: establecerCondicionesClimaticas');
circuitoPrueba.condicionesClimaticas = { clima: 'seco', temperatura: 25, humedad: 50, visibilidad: 'alta' }; // Reiniciar estado
const condiciones1 = circuitoPrueba.establecerCondicionesClimaticas('lluvia', 18, 85);
console.assert(condiciones1.clima === 'lluvia', 'Error: clima debe ser "lluvia"');
console.assert(condiciones1.temperatura === 18, 'Error: temperatura debe ser 18');
console.assert(condiciones1.humedad === 85, 'Error: humedad debe ser 85');
console.assert(condiciones1.visibilidad === 'baja', 'Error: visibilidad debe ser "baja"');
console.assert(circuitoPrueba.condicionesClimaticas.clima === 'lluvia', 'Error: condicionesClimaticas.clima debe ser "lluvia"');
const condiciones2 = circuitoPrueba.establecerCondicionesClimaticas('seco', 30, 40);
console.assert(condiciones2.clima === 'seco', 'Error: clima debe ser "seco"');
console.assert(condiciones2.temperatura === 30, 'Error: temperatura debe ser 30');
console.assert(condiciones2.humedad === 40, 'Error: humedad debe ser 40');
console.assert(condiciones2.visibilidad === 'alta', 'Error: visibilidad debe ser "alta"');
try {
    circuitoPrueba.establecerCondicionesClimaticas(null, 18, 85);
    console.assert(false, 'Error: debería lanzar excepción por parámetros nulos');
} catch (e) {
    console.assert(e.message === 'No se aportaron las características necesarias', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 4 completada');

// Prueba 5: actualizarRecordVuelta
console.log('Prueba 5: actualizarRecordVuelta');
const record1 = circuitoPrueba.actualizarRecordVuelta(71.553, 'Max Verstappen');
console.assert(record1.tiempo === 71.553, 'Error: tiempo debe ser 71.553');
console.assert(record1.piloto === 'Max Verstappen', 'Error: piloto debe ser "Max Verstappen"');
console.assert(record1.esNuevoRecord === true, 'Error: esNuevoRecord debe ser true');
console.assert(typeof record1.fecha === 'string', 'Error: fecha debe ser una cadena');
const record2 = circuitoPrueba.actualizarRecordVuelta(72.0, 'Lewis Hamilton');
console.assert(record2.tiempo === 71.553, 'Error: tiempo debe seguir siendo 71.553 (no mejorado)');
console.assert(record2.piloto === 'Max Verstappen', 'Error: piloto debe seguir siendo "Max Verstappen"');
console.assert(record2.esNuevoRecord === false, 'Error: esNuevoRecord debe ser false');
console.log('Prueba 5 completada');

// Prueba 6: obtenerEstadisticasCircuito
console.log('Prueba 6: obtenerEstadisticasCircuito');
circuitoPrueba.curvas = [
    { nombre: 'Curva1', velocidadMaxima: 50, dificultad: 'alta', numeroCurva: 1 },
    { nombre: 'Curva2', velocidadMaxima: 60, dificultad: 'media', numeroCurva: 2 }
];
circuitoPrueba.zonasDRS = [{ nombre: 'Túnel', longitud: 0.5, numeroZona: 1 }];
circuitoPrueba.longitudKm = 3.337;
circuitoPrueba.recordVuelta = null;
const statsCircuito = circuitoPrueba.obtenerEstadisticasCircuito();
console.assert(statsCircuito.numeroCurvas === 2, 'Error: numeroCurvas debe ser 2');
console.assert(statsCircuito.zonasDRS === 1, 'Error: zonasDRS debe ser 1');
console.assert(statsCircuito.recordVuelta === null, 'Error: recordVuelta debe ser null');
console.assert(statsCircuito.condicionesActuales.clima === 'seco', 'Error: condicionesActuales.clima debe ser "seco"');
console.assert(statsCircuito.dificultadPromedio === 'alta', 'Error: dificultadPromedio debe ser "alta"');
circuitoPrueba.curvas = [];
circuitoPrueba.actualizarRecordVuelta(71.553, 'Max Verstappen');
const statsCircuitoConRecord = circuitoPrueba.obtenerEstadisticasCircuito();
console.assert(statsCircuitoConRecord.numeroCurvas === 0, 'Error: numeroCurvas debe ser 0');
console.assert(statsCircuitoConRecord.recordVuelta.tiempo === 71.553, 'Error: recordVuelta.tiempo debe ser 71.553');
console.assert(statsCircuitoConRecord.dificultadPromedio === 'media', 'Error: dificultadPromedio debe ser "media"');
console.log('Prueba 6 completada\n');