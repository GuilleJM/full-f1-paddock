// Pruebas para la clase Auto, to run: node tests/testAuto

const Auto = require('../entities/Auto');

console.log('\n=== Pruebas para Auto ===');

const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);

// Prueba 1: configurarDesgasteInicial
console.log('Prueba 1: configurarDesgasteInicial');
const configDesgaste = autoPrueba.configurarDesgasteInicial({
    desgasteNeumaticos: 10,
    desgasteMotor: 20,
    combustible: 80
});
console.assert(configDesgaste.desgasteNeumaticos === 10, 'Error: desgasteNeumaticos debe ser 10');
console.assert(configDesgaste.desgasteMotor === 20, 'Error: desgasteMotor debe ser 20');
console.assert(configDesgaste.combustible === 80, 'Error: combustible debe ser 80');
console.assert(autoPrueba.desgasteNeumaticos === 10, 'Error: autoPrueba.desgasteNeumaticos debe ser 10');
console.assert(autoPrueba.desgasteMotor === 20, 'Error: autoPrueba.desgasteMotor debe ser 20');
console.assert(autoPrueba.combustible === 80, 'Error: autoPrueba.combustible debe ser 80');
console.log('Prueba 1 completada');

// Prueba 2: estaEnCondicionesOptimas
console.log('Prueba 2: estaEnCondicionesOptimas');
autoPrueba.conductor = "Lewis Hamilton";
autoPrueba.estado = "en_carrera";
const esOptimo1 = autoPrueba.estaEnCondicionesOptimas();
console.assert(esOptimo1 === true, 'Error: debe devolver true (condiciones óptimas cumplidas)');
autoPrueba.conductor = null;
const esOptimo2 = autoPrueba.estaEnCondicionesOptimas();
console.assert(esOptimo2 === false, 'Error: debe devolver false (sin conductor en carrera)');
autoPrueba.conductor = "Lewis Hamilton";
autoPrueba.desgasteNeumaticos = 30;
const esOptimo3 = autoPrueba.estaEnCondicionesOptimas();
console.assert(esOptimo3 === false, 'Error: debe devolver false (desgasteNeumaticos >= 30)');
autoPrueba.desgasteNeumaticos = 10;
autoPrueba.combustible = 20;
const esOptimo4 = autoPrueba.estaEnCondicionesOptimas();
console.assert(esOptimo4 === false, 'Error: debe devolver false (combustible <= 20)');
autoPrueba.combustible = 80;
autoPrueba.desgasteMotor = 40;
const esOptimo5 = autoPrueba.estaEnCondicionesOptimas();
console.assert(esOptimo5 === false, 'Error: debe devolver false (desgasteMotor >= 40)');
console.log('Prueba 2 completada');

// Prueba 3: cambiarNeumaticos
console.log('Prueba 3: cambiarNeumaticos');
const cambioNeumaticos = autoPrueba.cambiarNeumaticos("duros");
console.assert(cambioNeumaticos.tipoAnterior === "blandos", 'Error: tipoAnterior debe ser "blandos"');
console.assert(cambioNeumaticos.tipoNuevo === "duros", 'Error: tipoNuevo debe ser "duros"');
console.assert(cambioNeumaticos.desgasteReseteado === true, 'Error: desgasteReseteado debe ser true');
console.assert(autoPrueba.neumaticos === "duros", 'Error: autoPrueba.neumaticos debe ser "duros"');
console.assert(autoPrueba.desgasteNeumaticos === 0, 'Error: autoPrueba.desgasteNeumaticos debe ser 0');
console.log('Prueba 3 completada');

// Prueba 4: repostarCombustible
console.log('Prueba 4: repostarCombustible');
autoPrueba.configurarDesgasteInicial({ desgasteNeumaticos: 10, desgasteMotor: 20, combustible: 80 });
const repostaje = autoPrueba.repostarCombustible(15);
console.assert(repostaje.combustibleAnterior === 80, 'Error: combustibleAnterior debe ser 80');
console.assert(repostaje.combustibleNuevo === 95, 'Error: combustibleNuevo debe ser 95');
console.assert(autoPrueba.combustible === 95, 'Error: autoPrueba.combustible debe ser 95');
try {
    autoPrueba.repostarCombustible(10);
    console.assert(false, 'Error: debería lanzar excepción por superar el 100% del tanque');
} catch (e) {
    console.assert(e.message === 'La cantidad a repostar supera el 100% del tanque', 'Error: mensaje de error incorrecto para repostaje excesivo');
}
try {
    autoPrueba.repostarCombustible(-1);
    console.assert(false, 'Error: debería lanzar excepción por cantidad negativa');
} catch (e) {
    console.assert(e.message === 'La cantidad a repostar debe ser un valor entre 0 y 100', 'Error: mensaje de error incorrecto para cantidad negativa');
}
console.log('Prueba 4 completada');

// Prueba 5: instalarPiezaNueva
console.log('Prueba 5: instalarPiezaNueva');
const piezaInstalada = autoPrueba.instalarPiezaNueva({ tipo: "motor", especificacion: "nueva versión" });
console.assert(piezaInstalada.piezaInstalada === true, 'Error: piezaInstalada debe ser true');
console.assert(piezaInstalada.estadoActualizado === "desarrollo", 'Error: estadoActualizado debe ser "desarrollo"');
console.assert(autoPrueba.estado === "desarrollo", 'Error: autoPrueba.estado debe ser "desarrollo"');
console.assert(autoPrueba.piezasNuevas.length === 1, 'Error: piezasNuevas debe tener 1 elemento');
console.assert(autoPrueba.piezasNuevas[0].tipo === "motor", 'Error: tipo de pieza debe ser "motor"');
console.log('Prueba 5 completada');

// Prueba 6: calcularDesgaste
console.log('Prueba 6: calcularDesgaste');
autoPrueba.configurarDesgasteInicial({ desgasteNeumaticos: 10, desgasteMotor: 20, combustible: 80 });
const desgaste = autoPrueba.calcularDesgaste({
    numero: 10,
    velocidad: 200,
    condiciones: { temperatura: 25, humedad: 50 },
    longitudCircuito: 5,
    tipoDeCircuito: "Alta degradacion"
});
const vueltasMaximasNeumaticos = 40 * 0.8;
const desgasteNeumaticosEsperado = 10 + ((10 / vueltasMaximasNeumaticos) * 100 * 0.98);
const desgasteMotorEsperado = 20 + (200 / 340);
const combustibleConsumidoEsperado = 2.5 * (5 / 5);
console.assert(Math.abs(desgaste.desgasteNeumaticos - desgasteNeumaticosEsperado) < 0.01, 'Error: desgasteNeumaticos incorrecto');
console.assert(Math.abs(desgaste.desgasteMotor - desgasteMotorEsperado) < 0.01, 'Error: desgasteMotor incorrecto');
console.assert(desgaste.combustibleConsumido === combustibleConsumidoEsperado, 'Error: combustibleConsumido debe ser 2.5');
console.assert(Math.abs(autoPrueba.combustible - (80 - combustibleConsumidoEsperado)) < 0.01, 'Error: autoPrueba.combustible debe ser 77.5');
console.log('Prueba 6 completada');

// Prueba 7: realizarPitStop
console.log('Prueba 7: realizarPitStop');
autoPrueba.configurarDesgasteInicial({ desgasteNeumaticos: 10, desgasteMotor: 20, combustible: 80 });
const pitStop = autoPrueba.realizarPitStop({ tipoNeumaticos: "medios", combustible: 5 });
console.assert(pitStop.estado === "en_boxes", 'Error: estado debe ser "en_boxes"');
console.assert(pitStop.operaciones.includes("cambio_neumaticos"), 'Error: operaciones debe incluir "cambio_neumaticos"');
console.assert(pitStop.operaciones.includes("repostaje"), 'Error: operaciones debe incluir "repostaje"');
console.assert(pitStop.tiempoTotal === 4.3, 'Error: tiempoTotal debe ser 4.3');
console.assert(autoPrueba.neumaticos === "medios", 'Error: autoPrueba.neumaticos debe ser "medios"');
console.assert(autoPrueba.combustible === 85, 'Error: autoPrueba.combustible debe ser 85');
console.log('Prueba 7 completada');

// Prueba 8: obtenerEstadisticasDesgaste
console.log('Prueba 8: obtenerEstadisticasDesgaste');
autoPrueba.configurarDesgasteInicial({ desgasteNeumaticos: 10, desgasteMotor: 20, combustible: 80 });
autoPrueba.realizarPitStop({ tipoNeumaticos: "medios", combustible: 5 });
const stats = autoPrueba.obtenerEstadisticasDesgaste();
console.assert(stats.neumaticos === 0, 'Error: neumaticos debe ser 0');
console.assert(stats.combustible === 85, 'Error: combustible debe ser 85');
console.assert(stats.motor === 20, 'Error: motor debe ser 20');
console.assert(stats.estado === "en_boxes", 'Error: estado debe ser "en_boxes"');
console.log('Prueba 8 completada\n');