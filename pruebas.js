const Auto = require('./entities/Auto');
<<<<<<< HEAD
const Piloto = require('./entities/Piloto');
const Escuderia = require('./entities/Escuderia');
const Carrera = require('./entities/Carrera');
const Circuito = require('./entities/Circuito');
=======
const Escuderia = require('./entities/Escuderia');
const Circuito = require('./entities/Circuito');
const Piloto = require('./entities/Piloto');
const Carrera = require('./entities/Carrera');
>>>>>>> 8f4422d969699a4f078ea0908d9ca040aba0a109
const Estrategia = require('./entities/Estrategia');

// Sección de pruebas para Auto
console.log('\n=== Pruebas para Auto ===');
<<<<<<< HEAD
const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);

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
try {
    autoPrueba.configurarDesgasteInicial({
        desgasteNeumaticos: 150,
        desgasteMotor: 20,
        combustible: 80
    });
    console.assert(false, 'Error: debería lanzar excepción por valores fuera de rango');
} catch (e) {
    console.assert(e.message === 'Los parámetros deben encontrarse dentro del rango entre 0 y 100', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 1 completada');

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
autoPrueba.desgasteMotor = 20;
console.log('Prueba 2 completada');

console.log('Prueba 3: cambiarNeumaticos');
const cambioNeumaticos = autoPrueba.cambiarNeumaticos("duros");
console.assert(cambioNeumaticos.tipoAnterior === "blandos", 'Error: tipoAnterior debe ser "blandos"');
console.assert(cambioNeumaticos.tipoNuevo === "duros", 'Error: tipoNuevo debe ser "duros"');
console.assert(cambioNeumaticos.desgasteReseteado === true, 'Error: desgasteReseteado debe ser true');
console.assert(autoPrueba.neumaticos === "duros", 'Error: autoPrueba.neumaticos debe ser "duros"');
console.assert(autoPrueba.desgasteNeumaticos === 0, 'Error: autoPrueba.desgasteNeumaticos debe ser 0');
try {
    autoPrueba.cambiarNeumaticos("invalidos");
    console.assert(false, 'Error: debería lanzar excepción por tipo de neumáticos inválido');
} catch (e) {
    console.assert(e.message === 'El tipo de neumáticos no es válido', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 3 completada');

console.log('Prueba 4: repostarCombustible');
const repostaje = autoPrueba.repostarCombustible(15);
console.assert(repostaje.combustibleAnterior === 80, 'Error: combustibleAnterior debe ser 80');
console.assert(repostaje.combustibleNuevo === 95, 'Error: combustibleNuevo debe ser 95');
console.assert(autoPrueba.combustible === 95, 'Error: autoPrueba.combustible debe ser 95');
try {
    autoPrueba.repostarCombustible(-1);
    console.assert(false, 'Error: debería lanzar excepción por cantidad fuera de rango');
} catch (e) {
    console.assert(e.message === 'La cantidad a repostar debe ser un valor entre 0 y 100', 'Error: mensaje de error incorrecto');
}
try {
    autoPrueba.repostarCombustible(10);
    console.assert(false, 'Error: debería lanzar excepción por superar el 100% del tanque');
} catch (e) {
    console.assert(e.message === 'La cantidad a repostar supera el 100% del tanque', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 4 completada');

console.log('Prueba 5: instalarPiezaNueva');
const piezaInstalada = autoPrueba.instalarPiezaNueva({ tipo: "motor", especificacion: "nueva versión" });
console.assert(piezaInstalada.piezaInstalada === true, 'Error: piezaInstalada debe ser true');
console.assert(piezaInstalada.estadoActualizado === "desarrollo", 'Error: estadoActualizado debe ser "desarrollo"');
console.assert(autoPrueba.estado === "desarrollo", 'Error: autoPrueba.estado debe ser "desarrollo"');
console.assert(autoPrueba.piezasNuevas.length === 1, 'Error: piezasNuevas debe tener 1 elemento');
console.assert(autoPrueba.piezasNuevas[0].tipo === "motor", 'Error: tipo de pieza debe ser "motor"');
try {
    autoPrueba.instalarPiezaNueva({ tipo: "alerón", especificacion: "nueva versión" });
    console.assert(false, 'Error: debería lanzar excepción por tipo de pieza inválido');
} catch (e) {
    console.assert(e.message === 'El tipo de pieza debe ser uno de los siguientes: motor, aerodinámica, neumáticos, suspensión', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 5 completada');

console.log('Prueba 6: calcularDesgaste');
const desgaste = autoPrueba.calcularDesgaste({
    numero: 10,
    velocidad: 200,
    condiciones: { temperatura: 25, humedad: 50 },
    longitudCircuito: 5,
    tipoDeCircuito: "Alta degradacion"
});
console.assert(Math.abs(desgaste.desgasteNeumaticos - (10 / (40 * 0.8)) * 100 * 0.98) < 0.01, 'Error: desgasteNeumaticos incorrecto');
console.assert(Math.abs(desgaste.desgasteMotor - (20 + (200 / 340))) < 0.01, 'Error: desgasteMotor incorrecto');
console.assert(desgaste.combustibleConsumido === 2.5, 'Error: combustibleConsumido debe ser 2.5');
console.assert(autoPrueba.combustible === 92.5, 'Error: autoPrueba.combustible debe ser 92.5');
console.log('Prueba 6 completada');

console.log('Prueba 7: realizarPitStop');
const pitStop = autoPrueba.realizarPitStop({ tipoNeumaticos: "medios", combustible: 5 });
console.assert(pitStop.estado === "en_boxes", 'Error: estado debe ser "en_boxes"');
console.assert(pitStop.operaciones.includes("cambio_neumaticos"), 'Error: operaciones debe incluir "cambio_neumaticos"');
console.assert(pitStop.operaciones.includes("repostaje"), 'Error: operaciones debe incluir "repostaje"');
console.assert(pitStop.tiempoTotal === 4.2, 'Error: tiempoTotal debe ser 4.2');
console.assert(autoPrueba.neumaticos === "medios", 'Error: autoPrueba.neumaticos debe ser "medios"');
console.assert(autoPrueba.combustible === 97.5, 'Error: autoPrueba.combustible debe ser 97.5');
console.log('Prueba 7 completada');

console.log('Prueba 8: obtenerEstadisticasDesgaste');
const stats = autoPrueba.obtenerEstadisticasDesgaste();
console.assert(stats.neumaticos === 0, 'Error: neumaticos debe ser 0');
console.assert(stats.combustible === 97.5, 'Error: combustible debe ser 97.5');
console.assert(stats.motor > 0, 'Error: motor debe ser mayor que 0');
console.assert(stats.estado === "en_boxes", 'Error: estado debe ser "en_boxes"');
console.log('Prueba 8 completada');

// Sección de pruebas para Circuito
console.log('\n=== Pruebas para Circuito ===');
const circuitoPrueba = new Circuito("Monaco", "Monte Carlo", 3.337);

console.log('Prueba 1: esDesafiante');
circuitoPrueba.curvas = [
    { nombre: "Curva1", velocidadMaxima: 50, dificultad: "alta", numeroCurva: 1 },
    { nombre: "Curva2", velocidadMaxima: 60, dificultad: "alta", numeroCurva: 2 },
    { nombre: "Curva3", velocidadMaxima: 70, dificultad: "media", numeroCurva: 3 },
    { nombre: "Curva4", velocidadMaxima: 80, dificultad: "media", numeroCurva: 4 },
    { nombre: "Curva5", velocidadMaxima: 90, dificultad: "baja", numeroCurva: 5 },
    { nombre: "Curva6", velocidadMaxima: 100, dificultad: "alta", numeroCurva: 6 },
    { nombre: "Curva7", velocidadMaxima: 110, dificultad: "alta", numeroCurva: 7 },
    { nombre: "Curva8", velocidadMaxima: 120, dificultad: "media", numeroCurva: 8 },
    { nombre: "Curva9", velocidadMaxima: 130, dificultad: "baja", numeroCurva: 9 },
    { nombre: "Curva10", velocidadMaxima: 140, dificultad: "alta", numeroCurva: 10 },
    { nombre: "Curva11", velocidadMaxima: 150, dificultad: "baja", numeroCurva: 11 }
];
circuitoPrueba.zonasDRS = [
    { nombre: "Túnel", longitud: 0.5, numeroZona: 1 },
    { nombre: "Nouvelle Chicane", longitud: 0.3, numeroZona: 2 }
];
circuitoPrueba.longitudKm = 5.5;
const esDesafiante1 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante1 === true, 'Error: debe devolver true (circuito desafiante)');
circuitoPrueba.curvas.pop();

const esDesafiante2 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante2 === false, 'Error: debe devolver false (curvas <= 10)');
circuitoPrueba.curvas.push({ nombre: "Curva11", velocidadMaxima: 150, dificultad: "baja", numeroCurva: 11 });
circuitoPrueba.zonasDRS.pop();
const esDesafiante3 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante3 === false, 'Error: debe devolver false (zonasDRS < 2)');
circuitoPrueba.zonasDRS.push({ nombre: "Nouvelle Chicane", longitud: 0.3, numeroZona: 2 });
circuitoPrueba.longitudKm = 5.0;
const esDesafiante4 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante4 === false, 'Error: debe devolver false (longitudKm <= 5)');
circuitoPrueba.longitudKm = 5.5;
circuitoPrueba.curvas = circuitoPrueba.curvas.map(curva => ({ ...curva, dificultad: "baja" }));
const esDesafiante5 = circuitoPrueba.esDesafiante();
console.assert(esDesafiante5 === false, 'Error: debe devolver false (dificultadPromedio <= 2)');
console.log('Prueba 1 completada');

console.log('Prueba 2: agregarCurva');
circuitoPrueba.curvas = [];
const curva1 = circuitoPrueba.agregarCurva("Loews Hairpin", 50, "alta");
console.assert(curva1.nombre === "Loews Hairpin", 'Error: nombre debe ser "Loews Hairpin"');
console.assert(curva1.velocidadMaxima === 50, 'Error: velocidadMaxima debe ser 50');
console.assert(curva1.dificultad === "alta", 'Error: dificultad debe ser "alta"');
console.assert(curva1.numeroCurva === 1, 'Error: numeroCurva debe ser 1');
console.assert(circuitoPrueba.curvas.length === 1, 'Error: curvas.length debe ser 1');
const curva2 = circuitoPrueba.agregarCurva("Casino Square", 80, "media");
console.assert(curva2.numeroCurva === 2, 'Error: numeroCurva debe ser 2');
console.assert(circuitoPrueba.curvas.length === 2, 'Error: curvas.length debe ser 2');
console.log('Prueba 2 completada');

console.log('Prueba 3: agregarZonaDRS');
circuitoPrueba.zonasDRS = [];
const zonaDRS1 = circuitoPrueba.agregarZonaDRS("Túnel", 0.5);
console.assert(zonaDRS1.nombre === "Túnel", 'Error: nombre debe ser "Túnel"');
console.assert(zonaDRS1.longitud === 0.5, 'Error: longitud debe ser 0.5');
console.assert(zonaDRS1.numeroZona === 1, 'Error: numeroZona debe ser 1');
console.assert(circuitoPrueba.zonasDRS.length === 1, 'Error: zonasDRS.length debe ser 1');
const zonaDRS2 = circuitoPrueba.agregarZonaDRS("Nouvelle Chicane", 0.3);
console.assert(zonaDRS2.numeroZona === 2, 'Error: numeroZona debe ser 2');
console.assert(circuitoPrueba.zonasDRS.length === 2, 'Error: zonasDRS.length debe ser 2');
console.log('Prueba 3 completada');

console.log('Prueba 4: establecerCondicionesClimaticas');
const condiciones1 = circuitoPrueba.establecerCondicionesClimaticas("lluvia", 18, 85);
console.assert(condiciones1.clima === "lluvia", 'Error: clima debe ser "lluvia"');
console.assert(condiciones1.temperatura === 18, 'Error: temperatura debe ser 18');
console.assert(condiciones1.humedad === 85, 'Error: humedad debe ser 85');
console.assert(circuitoPrueba.condicionesClimaticas.clima === "lluvia", 'Error: condicionesClimaticas.clima debe ser "lluvia"');
const condiciones2 = circuitoPrueba.establecerCondicionesClimaticas("seco", 30, 40);
console.assert(condiciones2.clima === "seco", 'Error: clima debe ser "seco"');
console.assert(condiciones2.temperatura === 30, 'Error: temperatura debe ser 30');
console.assert(condiciones2.humedad === 40, 'Error: humedad debe ser 40');
console.log('Prueba 4 completada');

console.log('Prueba 5: actualizarRecordVuelta');
const record1 = circuitoPrueba.actualizarRecordVuelta(71.553, "Max Verstappen");
console.assert(record1.tiempo === 71.553, 'Error: tiempo debe ser 71.553');
console.assert(record1.piloto === "Max Verstappen", 'Error: piloto debe ser "Max Verstappen"');
console.assert(record1.esNuevoRecord === true, 'Error: esNuevoRecord debe ser true');
console.assert(typeof record1.fecha === "string", 'Error: fecha debe ser una cadena');
const record2 = circuitoPrueba.actualizarRecordVuelta(72.0, "Lewis Hamilton");
console.assert(record2.tiempo === 71.553, 'Error: tiempo debe seguir siendo 71.553 (no mejorado)');
console.assert(record2.piloto === "Max Verstappen", 'Error: piloto debe seguir siendo "Max Verstappen"');
console.assert(record2.esNuevoRecord === false, 'Error: esNuevoRecord debe ser false');
console.log('Prueba 5 completada');

console.log('Prueba 6: obtenerEstadisticasCircuito');
circuitoPrueba.curvas = [
    { nombre: "Curva1", velocidadMaxima: 50, dificultad: "alta", numeroCurva: 1 },
    { nombre: "Curva2", velocidadMaxima: 60, dificultad: "media", numeroCurva: 2 }
];
circuitoPrueba.zonasDRS = [
    { nombre: "Túnel", longitud: 0.5, numeroZona: 1 }
];
circuitoPrueba.longitudKm = 3.337;
const statsCircuito = circuitoPrueba.obtenerEstadisticasCircuito();
console.assert(statsCircuito.numeroCurvas === 2, 'Error: numeroCurvas debe ser 2');
console.assert(statsCircuito.zonasDRS === 1, 'Error: zonasDRS debe ser 1');
console.assert(statsCircuito.recordVuelta.tiempo === 71.553, 'Error: recordVuelta.tiempo debe ser 71.553');
console.assert(statsCircuito.condicionesActuales.clima === "seco", 'Error: condicionesActuales.clima debe ser "seco"');
console.assert(statsCircuito.dificultadPromedio === "alta", 'Error: dificultadPromedio debe ser "alta"');
circuitoPrueba.curvas = [];
const statsCircuitoVacio = circuitoPrueba.obtenerEstadisticasCircuito();
console.assert(statsCircuitoVacio.numeroCurvas === 0, 'Error: numeroCurvas debe ser 0');
console.assert(statsCircuitoVacio.dificultadPromedio === "media", 'Error: dificultadPromedio debe ser "media"');
console.log('Prueba 6 completada');

// Sección de pruebas para Escuderia
console.log('\n=== Pruebas para Escuderia ===');
const escuderiaPrueba = new Escuderia('Prueba', 'España', 1000000);

console.log('Prueba 1: invertirEnDesarrollo');
const inversion = escuderiaPrueba.invertirEnDesarrollo('motor', 200000);
console.assert(inversion.area === 'motor', 'Error: area debe ser "motor"');
console.assert(inversion.montoInvertido === 200000, 'Error: montoInvertido debe ser 200000');
console.assert(inversion.presupuestoRestante === 800000, 'Error: presupuestoRestante debe ser 800000');
console.assert(inversion.nivelAnterior === 0, 'Error: nivelAnterior debe ser 0');
console.assert(inversion.nivelNuevo === 2, 'Error: nivelNuevo debe ser 2');
console.assert(escuderiaPrueba.desarrollo.motor.estadisticas.potencia === 10, 'Error: potencia debe ser 10');
console.assert(escuderiaPrueba.desarrollo.motor.estadisticas.eficiencia === 10, 'Error: eficiencia debe ser 10');
try {
    escuderiaPrueba.invertirEnDesarrollo('chasis', 200000);
    console.assert(false, 'Error: debería lanzar excepción por área no válida');
} catch (e) {
    console.assert(e.message === 'Área de desarrollo no válida', 'Error: mensaje de error incorrecto');
}
try {
    escuderiaPrueba.invertirEnDesarrollo('motor', 1000000);
    console.assert(false, 'Error: debería lanzar excepción por presupuesto insuficiente');
} catch (e) {
    console.assert(e.message === 'Presupuesto insuficiente', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 1 completada');

console.log('Prueba 2: calcularMejora');
const mejora = escuderiaPrueba.calcularMejora('motor', 200000);
console.assert(mejora.area === 'motor', 'Error: area debe ser "motor"');
console.assert(mejora.mejoraPotencia === 10, 'Error: mejoraPotencia debe ser 10');
console.assert(mejora.mejoraEficiencia === 10, 'Error: mejoraEficiencia debe ser 10');
console.assert(mejora.nivelAlcanzado === 2, 'Error: nivelAlcanzado debe ser 2');
console.log('Prueba 2 completada');

console.log('Prueba 3: esDesarrolloExitoso');
const esExitoso1 = escuderiaPrueba.esDesarrolloExitoso('motor');
console.assert(esExitoso1 === true, 'Error: esDesarrolloExitoso debe devolver true (suma de stats >= 20)');
const esExitoso2 = escuderiaPrueba.esDesarrolloExitoso('chasis');
console.assert(esExitoso2 === false, 'Error: esDesarrolloExitoso debe devolver false para área no válida');
console.log('Prueba 3 completada');

console.log('Prueba 4: obtenerEstadisticas');
console.log(escuderiaPrueba.obtenerEstadisticas());
console.log('Prueba 4 completada');

console.log('Prueba 5: actualizarEstadisticas');
const actualizacion = escuderiaPrueba.actualizarEstadisticas('podio', 3);
console.assert(actualizacion.tipo === 'podio', 'Error: tipo debe ser "podio"');
console.assert(actualizacion.cantidadAnterior === 0, 'Error: cantidadAnterior debe ser 0');
console.assert(actualizacion.cantidadNueva === 3, 'Error: cantidadNueva debe ser 3');
console.assert(actualizacion.estadisticasActualizadas.podios === 3, 'Error: podios debe ser 3');
try {
    escuderiaPrueba.actualizarEstadisticas('campeonato', 1);
    console.assert(false, 'Error: debería lanzar excepción por tipo de estadística no válido');
} catch (e) {
    console.assert(e.message === 'Tipo de estadística no válido', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 5 completada');

// Sección de pruebas para Piloto
console.log('\n=== Pruebas para Piloto ===');
const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);

console.log('Prueba 1: establecerHabilidades');
const habilidades1 = pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
console.assert(habilidades1.velocidad === 95, 'Error: velocidad debe ser 95');
console.assert(habilidades1.consistencia === 90, 'Error: consistencia debe ser 90');
console.assert(habilidades1.agresividad === 85, 'Error: agresividad debe ser 85');
console.assert(habilidades1.nivelTotal === '90', 'Error: nivelTotal debe ser "90"');
console.assert(pilotoPrueba.habilidad === '90', 'Error: pilotoPrueba.habilidad debe ser "90"');
try {
    pilotoPrueba.establecerHabilidades({ velocidad: 101, consistencia: 90, agresividad: 85 });
    console.assert(false, 'Error: debería lanzar excepción por habilidad fuera de rango');
} catch (e) {
    console.assert(e.message === 'Los parámetros deben encontrarse dentro del rango entre 0 y 100', 'Error: mensaje de error incorrecto');
}
try {
    pilotoPrueba.establecerHabilidades(null);
    console.assert(false, 'Error: debería lanzar excepción por habilidades no proporcionadas');
} catch (e) {
    console.assert(e.message === 'No se proporcionaron habilidades del piloto', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 1 completada');

console.log('Prueba 2: puedeConducirAuto');
// Asumimos que puedeConducirAuto verifica si el auto no tiene conductor y habilidad > 50
const auto1 = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
console.assert(pilotoPrueba.puedeConducirAuto(auto1) === true, 'Error: debe devolver true (auto disponible, habilidad suficiente)');
pilotoPrueba.habilidad = '40';
console.assert(pilotoPrueba.puedeConducirAuto(auto1) === false, 'Error: debe devolver false (habilidad insuficiente)');
pilotoPrueba.habilidad = '90';
auto1.conductor = new Piloto("Max Verstappen", "Holandés", 0);
console.assert(pilotoPrueba.puedeConducirAuto(auto1) === false, 'Error: debe devolver false (auto ocupado)');
console.log('Prueba 2 completada');

console.log('Prueba 3: conducirAuto');
auto1.conductor = null; // Liberar el auto
const asignacion1 = pilotoPrueba.conducirAuto(auto1);
console.assert(asignacion1.piloto === "Lewis Hamilton", 'Error: piloto debe ser "Lewis Hamilton"');
console.assert(asignacion1.auto === "Mercedes W13", 'Error: auto debe ser "Mercedes W13"');
console.assert(asignacion1.numero === 44, 'Error: numero debe ser 44');
console.assert(asignacion1.estado === "asignado", 'Error: estado debe ser "asignado"');
console.assert(pilotoPrueba.auto === auto1, 'Error: pilotoPrueba.auto debe ser auto1');
console.assert(pilotoPrueba.autosConducidos.length === 1, 'Error: autosConducidos.length debe ser 1');
console.assert(auto1.conductor === pilotoPrueba, 'Error: auto1.conductor debe ser pilotoPrueba');
try {
    pilotoPrueba.conducirAuto(auto1);
    console.assert(false, 'Error: debería lanzar excepción por auto ocupado');
} catch (e) {
    console.assert(e.message === 'El auto ya está ocupado', 'Error: mensaje de error incorrecto');
}
console.log('Prueba 3 completada');

console.log('Prueba 4: calcularRendimiento');
pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 }); // Restaurar habilidades
const rendimiento1 = pilotoPrueba.calcularRendimiento({ clima: "seco", temperatura: 25, humedad: 40 });
console.assert(Math.abs(rendimiento1.velocidad - (95 * 1.02 * 1.01)) < 0.01, 'Error: velocidad debe ser 95 * 1.02 * 1.01');
console.assert(Math.abs(rendimiento1.consistencia - 90) < 0.01, 'Error: consistencia debe ser 90');
console.assert(Math.abs(rendimiento1.agresividad - 85) < 0.01, 'Error: agresividad debe ser 85');
console.assert(Math.abs(rendimiento1.rendimientoTotal - ((95 * 1.02 * 1.01 * 0.4 + 90 * 0.4 + 85 * 0.2) / 1.0)) < 0.01, 'Error: rendimientoTotal incorrecto');
const rendimiento2 = pilotoPrueba.calcularRendimiento({ clima: "lluvia", temperatura: 10, humedad: 80 });
console.assert(Math.abs(rendimiento2.velocidad - (95 * 1.02 * 1.01 * 0.8 * 0.95)) < 0.01, 'Error: velocidad debe ser 95 * 1.02 * 1.01 * 0.8 * 0.95');
console.assert(Math.abs(rendimiento2.consistencia - (90 * 0.8)) < 0.01, 'Error: consistencia debe ser 90 * 0.8');
console.assert(Math.abs(rendimiento2.agresividad - (85 * 0.8)) < 0.01, 'Error: agresividad debe ser 85 * 0.8');
console.assert(Math.abs(rendimiento2.rendimientoTotal - ((95 * 1.02 * 1.01 * 0.8 * 0.95 * 0.4 + 90 * 0.8 * 0.4 + 85 * 0.8 * 0.2) / 1.0)) < 0.01, 'Error: rendimientoTotal incorrecto');
console.log('Prueba 4 completada');

console.log('Prueba 5: adaptarEstiloConduccion');
// Asumimos que lluvia cambia estilo a "conservador" y ajusta habilidades
pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 }); // Restaurar habilidades
const estilo1 = pilotoPrueba.adaptarEstiloConduccion({ clima: "lluvia", visibilidad: "baja", estadoPista: "mojada" });
console.assert(estilo1.estiloAnterior === "agresivo", 'Error: estiloAnterior debe ser "agresivo"');
console.assert(estilo1.estiloNuevo === "conservador", 'Error: estiloNuevo debe ser "conservador"');
console.assert(estilo1.ajustes.agresividad === -20, 'Error: ajustes.agresividad debe ser -20');
console.assert(estilo1.ajustes.consistencia === 15, 'Error: ajustes.consistencia debe ser 15');
console.assert(pilotoPrueba.estilo === "conservador", 'Error: pilotoPrueba.estilo debe ser "conservador"');
const estilo2 = pilotoPrueba.adaptarEstiloConduccion({ clima: "seco", visibilidad: "alta", estadoPista: "seca" });
console.assert(estilo2.estiloAnterior === "conservador", 'Error: estiloAnterior debe ser "conservador"');
console.assert(estilo2.estiloNuevo === "agresivo", 'Error: estiloNuevo debe ser "agresivo"');
console.assert(estilo2.ajustes.agresividad === 0, 'Error: ajustes.agresividad debe ser 0');
console.assert(estilo2.ajustes.consistencia === 0, 'Error: ajustes.consistencia debe ser 0');
console.log('Prueba 5 completada');

console.log('Prueba 6: registrarVictoria');
const victoria1 = pilotoPrueba.registrarVictoria();
console.assert(victoria1.victorias === 1, 'Error: victorias debe ser 1');
console.assert(victoria1.puntosCampeonato === 25, 'Error: puntosCampeonato debe ser 25');
console.assert(victoria1.estadisticas.victorias === 1, 'Error: estadisticas.victorias debe ser 1');
console.assert(pilotoPrueba.victorias === 1, 'Error: pilotoPrueba.victorias debe ser 1');
console.assert(pilotoPrueba.estadisticas.victorias === 1, 'Error: pilotoPrueba.estadisticas.victorias debe ser 1');
console.log('Prueba 6 completada');

console.log('Prueba 7: registrarPodio');
const podio1 = pilotoPrueba.registrarPodio(2);
console.assert(podio1.podios === 1, 'Error: podios debe ser 1');
console.assert(podio1.puntosCampeonato === 43, 'Error: puntosCampeonato debe ser 43');
console.assert(podio1.estadisticas.podios === 1, 'Error: estadisticas.podios debe ser 1');
console.assert(pilotoPrueba.podios === 1, 'Error: pilotoPrueba.podios debe ser 1');
console.assert(pilotoPrueba.estadisticas.podios === 1, 'Error: pilotoPrueba.estadisticas.podios debe ser 1');
console.log('Prueba 7 completada');

console.log('Prueba 8: registrarVueltaRapida');
const vueltaRapida1 = pilotoPrueba.registrarVueltaRapida();
console.assert(vueltaRapida1.vueltasRapidas === 1, 'Error: vueltasRapidas debe ser 1');
console.assert(vueltaRapida1.puntosCampeonato === 44, 'Error: puntosCampeonato debe ser 44');
console.assert(vueltaRapida1.estadisticas.vueltasRapidas === 1, 'Error: estadisticas.vueltasRapidas debe ser 1');
console.assert(pilotoPrueba.vueltasRapidas === 1, 'Error: pilotoPrueba.vueltasRapidas debe ser 1');
console.assert(pilotoPrueba.estadisticas.vueltasRapidas === 1, 'Error: pilotoPrueba.estadisticas.vueltasRapidas debe ser 1');
console.log('Prueba 8 completada');

console.log('Prueba 9: obtenerEstadisticas');
pilotoPrueba.adelantamientos = 15;
pilotoPrueba.errores = 2;
pilotoPrueba.vueltasCompletadas = 450;
const estadisticas1 = pilotoPrueba.obtenerEstadisticas();
console.assert(estadisticas1.general.victorias === 1, 'Error: general.victorias debe ser 1');
console.assert(estadisticas1.general.podios === 1, 'Error: general.podios debe ser 1');
console.assert(estadisticas1.general.vueltasRapidas === 1, 'Error: general.vueltasRapidas debe ser 1');
console.assert(estadisticas1.general.abandonos === 0, 'Error: general.abandonos debe ser 0');
console.assert(estadisticas1.habilidades.velocidad === 95, 'Error: habilidades.velocidad debe ser 95');
console.assert(estadisticas1.rendimiento.adelantamientos === 15, 'Error: rendimiento.adelantamientos debe ser 15');
console.assert(estadisticas1.rendimiento.errores === 2, 'Error: rendimiento.errores debe ser 2');
console.assert(estadisticas1.rendimiento.vueltasCompletadas === 450, 'Error: rendimiento.vueltasCompletadas debe ser 450');
const pilotoVacio = new Piloto("Max Verstappen", "Holandés", 0);
const estadisticas2 = pilotoVacio.obtenerEstadisticas();
console.assert(estadisticas2.rendimiento.vueltasCompletadas === 0, 'Error: rendimiento.vueltasCompletadas debe ser 0');
console.log('Prueba 9 completada');
=======
try {
    console.log('Prueba 1: configurarDesgasteInicial');
    const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
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
} catch (e) {
    console.error('Error en Prueba 1 (Auto):', e.message);
}

try {
    console.log('Prueba 2: estaEnCondicionesOptimas');
    const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
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
} catch (e) {
    console.error('Error en Prueba 2 (Auto):', e.message);
}

try {
    console.log('Prueba 3: cambiarNeumaticos');
    const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
    const cambioNeumaticos = autoPrueba.cambiarNeumaticos("duros");
    console.assert(cambioNeumaticos.tipoAnterior === "blandos", 'Error: tipoAnterior debe ser "blandos"');
    console.assert(cambioNeumaticos.tipoNuevo === "duros", 'Error: tipoNuevo debe ser "duros"');
    console.assert(cambioNeumaticos.desgasteReseteado === true, 'Error: desgasteReseteado debe ser true');
    console.assert(autoPrueba.neumaticos === "duros", 'Error: autoPrueba.neumaticos debe ser "duros"');
    console.assert(autoPrueba.desgasteNeumaticos === 0, 'Error: autoPrueba.desgasteNeumaticos debe ser 0');
    console.log('Prueba 3 completada');
} catch (e) {
    console.error('Error en Prueba 3 (Auto):', e.message);
}

try {
    console.log('Prueba 4: repostarCombustible');
    const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
    autoPrueba.configurarDesgasteInicial({ desgasteNeumaticos: 10, desgasteMotor: 20, combustible: 80 });
    const repostaje = autoPrueba.repostarCombustible(15);
    console.assert(repostaje.combustibleAnterior === 80, 'Error: combustibleAnterior debe ser 80');
    console.assert(repostaje.combustibleNuevo === 95, 'Error: combustibleNuevo debe ser 95');
    console.assert(autoPrueba.combustible === 95, 'Error: autoPrueba.combustible debe ser 95');
    try {
        autoPrueba.repostarCombustible(21);
        console.assert(false, 'Error: debería lanzar excepción por superar el 100% del tanque');
    } catch (e) {
        console.assert(e.message === 'La cantidad a repostar debe ser un valor entre 0 y 100', 'Error: mensaje de error incorrecto');
    }
    try {
        autoPrueba.repostarCombustible(0);
        console.assert(false, 'Error: debería lanzar excepción por cantidad no positiva');
    } catch (e) {
        console.assert(e.message === 'La cantidad a repostar debe ser un valor entre 0 y 100', 'Error: mensaje de error incorrecto');
    }
    console.log('Prueba 4 completada');
} catch (e) {
    console.error('Error en Prueba 4 (Auto):', e.message);
}

try {
    console.log('Prueba 5: instalarPiezaNueva');
    const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
    const piezaInstalada = autoPrueba.instalarPiezaNueva({ tipo: "motor", especificacion: "nueva versión" });
    console.assert(piezaInstalada.piezaInstalada === true, 'Error: piezaInstalada debe ser true');
    console.assert(piezaInstalada.estadoActualizado === "desarrollo", 'Error: estadoActualizado debe ser "desarrollo"');
    console.assert(autoPrueba.estado === "desarrollo", 'Error: autoPrueba.estado debe ser "desarrollo"');
    console.assert(autoPrueba.piezasNuevas.length === 1, 'Error: piezasNuevas debe tener 1 elemento');
    console.assert(autoPrueba.piezasNuevas[0].tipo === "motor", 'Error: tipo de pieza debe ser "motor"');
    console.log('Prueba 5 completada');
} catch (e) {
    console.error('Error en Prueba 5 (Auto):', e.message);
}

try {
    console.log('Prueba 6: calcularDesgaste');
    const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
    autoPrueba.configurarDesgasteInicial({ desgasteNeumaticos: 10, desgasteMotor: 20, combustible: 80 });
    const desgaste = autoPrueba.calcularDesgaste({
        numero: 10,
        velocidad: 200,
        condiciones: { temperatura: 25, humedad: 50 },
        longitudCircuito: 5,
        tipoDeCircuito: "Alta degradacion"
    });
    console.assert(Math.abs(desgaste.desgasteNeumaticos - (10 / (40 * 0.8)) * 100 * 0.98) < 0.01, 'Error: desgasteNeumaticos incorrecto');
    console.assert(Math.abs(desgaste.desgasteMotor - (40 + (200 / 340))) < 0.01, 'Error: desgasteMotor incorrecto');
    console.assert(desgaste.combustibleConsumido === 2.5, 'Error: combustibleConsumido debe ser 2.5');
    console.assert(autoPrueba.combustible === 92.5, 'Error: autoPrueba.combustible debe ser 92.5');
    console.log('Prueba 6 completada');
} catch (e) {
    console.error('Error en Prueba 6 (Auto):', e.message);
}

try {
    console.log('Prueba 7: realizarPitStop');
    const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
    const pitStop = autoPrueba.realizarPitStop({ tipoNeumaticos: "medios", combustible: 5 });
    console.assert(pitStop.estado === "en_boxes", 'Error: estado debe ser "en_boxes"');
    console.assert(pitStop.operaciones.includes("cambio_neumaticos"), 'Error: operaciones debe incluir "cambio_neumaticos"');
    console.assert(pitStop.operaciones.includes("repostaje"), 'Error: operaciones debe incluir "repostaje"');
    console.assert(pitStop.tiempoTotal === 5.3, 'Error: tiempoTotal debe ser 5.3');
    console.assert(autoPrueba.neumaticos === "medios", 'Error: autoPrueba.neumaticos debe ser "medios"');
    console.assert(autoPrueba.combustible === 97.5, 'Error: autoPrueba.combustible debe ser 97.5');
    console.log('Prueba 7 completada');
} catch (e) {
    console.error('Error en Prueba 7 (Auto):', e.message);
}

try {
    console.log('Prueba 8: obtenerEstadisticasDesgaste');
    const autoPrueba = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
    autoPrueba.realizarPitStop({ tipoNeumaticos: "medios", combustible: 5 });
    const stats = autoPrueba.obtenerEstadisticasDesgaste();
    console.assert(stats.neumaticos === 0, 'Error: neumaticos debe ser 0');
    console.assert(stats.combustible === 97.5, 'Error: combustible debe ser 97.5');
    console.assert(stats.motor > 0, 'Error: motor debe ser mayor que 0');
    console.assert(stats.estado === "en_boxes", 'Error: estado debe ser "en_boxes"');
    console.log('Prueba 8 completada');
} catch (e) {
    console.error('Error en Prueba 8 (Auto):', e.message);
}

// Sección de pruebas para Escuderia
console.log('\n=== Pruebas para Escuderia ===');
try {
    console.log('Prueba 1: invertirEnDesarrollo');
    const escuderiaPrueba = new Escuderia('Prueba', 'España', 1000000);
    const inversion = escuderiaPrueba.invertirEnDesarrollo('motor', 100000);
    console.assert(inversion.area === 'motor', 'Error: area debe ser "motor"');
    console.assert(inversion.montoInvertido === 100000, 'Error: montoInvertido debe ser 100000');
    console.assert(inversion.presupuestoRestante === 900000, 'Error: presupuestoRestante debe ser 900000');
    console.assert(inversion.nivelAnterior === 0, 'Error: nivelAnterior debe ser 0');
    console.assert(inversion.nivelNuevo === 1, 'Error: nivelNuevo debe ser 1');
    console.assert(escuderiaPrueba.desarrollo.motor.estadisticas.potencia === 5, 'Error: potencia debe ser 5');
    console.assert(escuderiaPrueba.desarrollo.motor.estadisticas.eficiencia === 5, 'Error: eficiencia debe ser 5');
    try {
        escuderiaPrueba.invertirEnDesarrollo('chasis', 200000);
        console.assert(false, 'Error: debería lanzar excepción por área no válida');
    } catch (e) {
        console.assert(e.message === 'Área de desarrollo no válida', 'Error: mensaje de error incorrecto');
    }
    try {
        escuderiaPrueba.invertirEnDesarrollo('motor', 1000000);
        console.assert(false, 'Error: debería lanzar excepción por presupuesto insuficiente');
    } catch (e) {
        console.assert(e.message === 'Presupuesto insuficiente', 'Error: mensaje de error incorrecto');
    }
    console.log('Prueba 1 completada');
} catch (e) {
    console.error('Error en Prueba 1 (Escuderia):', e.message);
}

try {
    console.log('Prueba 2: calcularMejora');
    const escuderiaPrueba = new Escuderia('Prueba', 'España', 1000000);
    const mejora = escuderiaPrueba.calcularMejora('motor', 200000);
    console.assert(mejora.area === 'motor', 'Error: area debe ser "motor"');
    console.assert(mejora.mejoraPotencia === 10, 'Error: mejoraPotencia debe ser 10');
    console.assert(mejora.mejoraEficiencia === 10, 'Error: mejoraEficiencia debe ser 10');
    console.assert(mejora.nivelAlcanzado === 2, 'Error: nivelAlcanzado debe ser 2');
    console.log('Prueba 2 completada');
} catch (e) {
    console.error('Error en Prueba 2 (Escuderia):', e.message);
}

try {
    console.log('Prueba 3: esDesarrolloExitoso');
    const escuderiaPrueba = new Escuderia('Prueba', 'España', 1000000);
    escuderiaPrueba.invertirEnDesarrollo('motor', 100000);
    const esExitoso1 = escuderiaPrueba.esDesarrolloExitoso('motor');
    console.assert(esExitoso1 === true, 'Error: esDesarrolloExitoso debe devolver true (suma de stats >= 20)');
    const esExitoso2 = escuderiaPrueba.esDesarrolloExitoso('chasis');
    console.assert(esExitoso2 === false, 'Error: esDesarrolloExitoso debe devolver false para área no válida');
    console.log('Prueba 3 completada');
} catch (e) {
    console.error('Error en Prueba 3 (Escuderia):', e.message);
}

try {
    console.log('Prueba 4: obtenerEstadisticas');
    const escuderiaPrueba = new Escuderia('Prueba', 'España', 1000000);
    console.log(escuderiaPrueba.obtenerEstadisticas());
    console.log('Prueba 4 completada');
} catch (e) {
    console.error('Error en Prueba 4 (Escuderia):', e.message);
}

try {
    console.log('Prueba 5: actualizarEstadisticas');
    const escuderiaPrueba = new Escuderia('Prueba', 'España', 1000000);
    const actualizacion = escuderiaPrueba.actualizarEstadisticas('podio', 3);
    console.assert(actualizacion.tipo === 'podio', 'Error: tipo debe ser "podio"');
    console.assert(actualizacion.cantidadAnterior === 0, 'Error: cantidadAnterior debe ser 0');
    console.assert(actualizacion.cantidadNueva === 3, 'Error: cantidadNueva debe ser 3');
    console.assert(actualizacion.estadisticasActualizadas.podios === 3, 'Error: podios debe ser 3');
    try {
        escuderiaPrueba.actualizarEstadisticas('campeonato', 1);
        console.assert(false, 'Error: debería lanzar excepción por tipo de estadística no válido');
    } catch (e) {
        console.assert(e.message === 'Tipo de estadística no válido', 'Error: mensaje de error incorrecto');
    }
    console.log('Prueba 5 completada');
} catch (e) {
    console.error('Error en Prueba 5 (Escuderia):', e.message);
}

// Sección de pruebas para Circuito
console.log('\n=== Pruebas para Circuito ===');
try {
    console.log('Prueba 1: esDesafiante');
    const circuitoPrueba = new Circuito("Monaco", "Monte Carlo", 3.337);
    circuitoPrueba.curvas = [
        { nombre: "Curva1", velocidadMaxima: 50, dificultad: "alta", numeroCurva: 1 },
        { nombre: "Curva2", velocidadMaxima: 60, dificultad: "alta", numeroCurva: 2 },
        { nombre: "Curva3", velocidadMaxima: 70, dificultad: "media", numeroCurva: 3 },
        { nombre: "Curva4", velocidadMaxima: 80, dificultad: "media", numeroCurva: 4 },
        { nombre: "Curva5", velocidadMaxima: 90, dificultad: "baja", numeroCurva: 5 },
        { nombre: "Curva6", velocidadMaxima: 100, dificultad: "alta", numeroCurva: 6 },
        { nombre: "Curva7", velocidadMaxima: 110, dificultad: "alta", numeroCurva: 7 },
        { nombre: "Curva8", velocidadMaxima: 120, dificultad: "media", numeroCurva: 8 },
        { nombre: "Curva9", velocidadMaxima: 130, dificultad: "baja", numeroCurva: 9 },
        { nombre: "Curva10", velocidadMaxima: 140, dificultad: "alta", numeroCurva: 10 },
        { nombre: "Curva11", velocidadMaxima: 150, dificultad: "alta", numeroCurva: 11 }
    ];
    circuitoPrueba.zonasDRS = [
        { nombre: "Túnel", longitud: 0.5, numeroZona: 1 },
        { nombre: "Nouvelle Chicane", longitud: 0.3, numeroZona: 2 }
    ];
    circuitoPrueba.longitudKm = 5.5;
    const esDesafiante1 = circuitoPrueba.esDesafiante();
    console.assert(esDesafiante1 === true, 'Error: debe devolver true (circuito desafiante)');
    circuitoPrueba.curvas.pop();
    const esDesafiante2 = circuitoPrueba.esDesafiante();
    console.assert(esDesafiante2 === false, 'Error: debe devolver false (curvas <= 10)');
    circuitoPrueba.curvas.push({ nombre: "Curva11", velocidadMaxima: 150, dificultad: "baja", numeroCurva: 11 });
    circuitoPrueba.zonasDRS.pop();
    const esDesafiante3 = circuitoPrueba.esDesafiante();
    console.assert(esDesafiante3 === false, 'Error: debe devolver false (zonasDRS < 2)');
    circuitoPrueba.zonasDRS.push({ nombre: "Nouvelle Chicane", longitud: 0.3, numeroZona: 2 });
    circuitoPrueba.longitudKm = 5.0;
    const esDesafiante4 = circuitoPrueba.esDesafiante();
    console.assert(esDesafiante4 === false, 'Error: debe devolver false (longitudKm <= 5)');
    circuitoPrueba.longitudKm = 5.5;
    circuitoPrueba.curvas = circuitoPrueba.curvas.map(curva => ({ ...curva, dificultad: "baja" }));
    const esDesafiante5 = circuitoPrueba.esDesafiante();
    console.assert(esDesafiante5 === false, 'Error: debe devolver false (dificultadPromedio <= 2)');
    console.log('Prueba 1 completada');
} catch (e) {
    console.error('Error en Prueba 1 (Circuito):', e.message);
}

try {
    console.log('Prueba 2: agregarCurva');
    const circuitoPrueba = new Circuito("Monaco", "Monte Carlo", 3.337);
    circuitoPrueba.curvas = [];
    const curva1 = circuitoPrueba.agregarCurva("Loews Hairpin", 50, "alta");
    console.assert(curva1.nombre === "Loews Hairpin", 'Error: nombre debe ser "Loews Hairpin"');
    console.assert(curva1.velocidadMaxima === 50, 'Error: velocidadMaxima debe ser 50');
    console.assert(curva1.dificultad === "alta", 'Error: dificultad debe ser "alta"');
    console.assert(curva1.numeroCurva === 1, 'Error: numeroCurva debe ser 1');
    console.assert(circuitoPrueba.curvas.length === 1, 'Error: curvas.length debe ser 1');
    const curva2 = circuitoPrueba.agregarCurva("Casino Square", 80, "media");
    console.assert(curva2.numeroCurva === 2, 'Error: numeroCurva debe ser 2');
    console.assert(circuitoPrueba.curvas.length === 2, 'Error: curvas.length debe ser 2');
    console.log('Prueba 2 completada');
} catch (e) {
    console.error('Error en Prueba 2 (Circuito):', e.message);
}

try {
    console.log('Prueba 3: agregarZonaDRS');
    const circuitoPrueba = new Circuito("Monaco", "Monte Carlo", 3.337);
    circuitoPrueba.zonasDRS = [];
    const zonaDRS1 = circuitoPrueba.agregarZonaDRS("Túnel", 0.5);
    console.assert(zonaDRS1.nombre === "Túnel", 'Error: nombre debe ser "Túnel"');
    console.assert(zonaDRS1.longitud === 0.5, 'Error: longitud debe ser 0.5');
    console.assert(zonaDRS1.numeroZona === 1, 'Error: numeroZona debe ser 1');
    console.assert(circuitoPrueba.zonasDRS.length === 1, 'Error: zonasDRS.length debe ser 1');
    const zonaDRS2 = circuitoPrueba.agregarZonaDRS("Nouvelle Chicane", 0.3);
    console.assert(zonaDRS2.numeroZona === 2, 'Error: numeroZona debe ser 2');
    console.assert(circuitoPrueba.zonasDRS.length === 2, 'Error: zonasDRS.length debe ser 2');
    console.log('Prueba 3 completada');
} catch (e) {
    console.error('Error en Prueba 3 (Circuito):', e.message);
}

try {
    console.log('Prueba 4: establecerCondicionesClimaticas');
    const circuitoPrueba = new Circuito("Monaco", "Monte Carlo", 3.337);
    const condiciones1 = circuitoPrueba.establecerCondicionesClimaticas("lluvia", 18, 85);
    console.assert(condiciones1.clima === "lluvia", 'Error: clima debe ser "lluvia"');
    console.assert(condiciones1.temperatura === 18, 'Error: temperatura debe ser 18');
    console.assert(condiciones1.humedad === 85, 'Error: humedad debe ser 85');
    console.assert(circuitoPrueba.condicionesClimaticas.clima === "lluvia", 'Error: condicionesClimaticas.clima debe ser "lluvia"');
    const condiciones2 = circuitoPrueba.establecerCondicionesClimaticas("seco", 30, 40);
    console.assert(condiciones2.clima === "seco", 'Error: clima debe ser "seco"');
    console.assert(condiciones2.temperatura === 30, 'Error: temperatura debe ser 30');
    console.assert(condiciones2.humedad === 40, 'Error: humedad debe ser 40');
    console.log('Prueba 4 completada');
} catch (e) {
    console.error('Error en Prueba 4 (Circuito):', e.message);
}

try {
    console.log('Prueba 5: actualizarRecordVuelta');
    const circuitoPrueba = new Circuito("Monaco", "Monte Carlo", 3.337);
    const record1 = circuitoPrueba.actualizarRecordVuelta(71.553, "Max Verstappen");
    console.assert(record1.tiempo === 71.553, 'Error: tiempo debe ser 71.553');
    console.assert(record1.piloto === "Max Verstappen", 'Error: piloto debe ser "Max Verstappen"');
    console.assert(record1.esNuevoRecord === true, 'Error: esNuevoRecord debe ser true');
    console.assert(typeof record1.fecha === "string", 'Error: fecha debe ser una cadena');
    const record2 = circuitoPrueba.actualizarRecordVuelta(72.0, "Lewis Hamilton");
    console.assert(record2.tiempo === 71.553, 'Error: tiempo debe seguir siendo 71.553 (no mejorado)');
    console.assert(record2.piloto === "Max Verstappen", 'Error: piloto debe seguir siendo "Max Verstappen"');
    console.assert(record2.esNuevoRecord === false, 'Error: esNuevoRecord debe ser false');
    console.log('Prueba 5 completada');
} catch (e) {
    console.error('Error en Prueba 5 (Circuito):', e.message);
}

try {
    console.log('Prueba 6: obtenerEstadisticasCircuito');
    const circuitoPrueba = new Circuito("Monaco", "Monte Carlo", 3.337);
    circuitoPrueba.curvas = [
        { nombre: "Curva1", velocidadMaxima: 50, dificultad: "alta", numeroCurva: 1 },
        { nombre: "Curva2", velocidadMaxima: 60, dificultad: "media", numeroCurva: 2 }
    ];
    circuitoPrueba.zonasDRS = [
        { nombre: "Túnel", longitud: 0.5, numeroZona: 1 }
    ];
    circuitoPrueba.longitudKm = 3.337;
    const statsCircuito = circuitoPrueba.obtenerEstadisticasCircuito();
    console.assert(statsCircuito.numeroCurvas === 2, 'Error: numeroCurvas debe ser 2');
    console.assert(statsCircuito.zonasDRS === 1, 'Error: zonasDRS debe ser 1');
    console.assert(statsCircuito.recordVuelta.tiempo === 71.553, 'Error: recordVuelta.tiempo debe ser 71.553');
    console.assert(statsCircuito.condicionesActuales.clima === "seco", 'Error: condicionesActuales.clima debe ser "seco"');
    console.assert(statsCircuito.dificultadPromedio === "alta", 'Error: dificultadPromedio debe ser "alta"');
    circuitoPrueba.curvas = [];
    const statsCircuitoVacio = circuitoPrueba.obtenerEstadisticasCircuito();
    console.assert(statsCircuitoVacio.numeroCurvas === 0, 'Error: numeroCurvas debe ser 0');
    console.assert(statsCircuitoVacio.dificultadPromedio === "media", 'Error: dificultadPromedio debe ser "media"');
    console.log('Prueba 6 completada');
} catch (e) {
    console.error('Error en Prueba 6 (Circuito):', e.message);
}

// Sección de pruebas para Piloto
console.log('\n=== Pruebas para Piloto ===');
try {
    console.log('Prueba 1: establecerHabilidades');
    const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);
    const habilidades1 = pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
    console.assert(habilidades1.velocidad === 95, 'Error: velocidad debe ser 95');
    console.assert(habilidades1.consistencia === 90, 'Error: consistencia debe ser 90');
    console.assert(habilidades1.agresividad === 85, 'Error: agresividad debe ser 85');
    console.assert(habilidades1.nivelTotal === '90', 'Error: nivelTotal debe ser "90"');
    console.assert(pilotoPrueba.habilidad === '90', 'Error: pilotoPrueba.habilidad debe ser "90"');
    console.assert(pilotoPrueba.velocidad === 95, 'Error: pilotoPrueba.velocidad debe ser 95');
    console.assert(pilotoPrueba.consistencia === 90, 'Error: pilotoPrueba.consistencia debe ser 90');
    console.assert(pilotoPrueba.agresividad === 85, 'Error: pilotoPrueba.agresividad debe ser 85');
    try {
        pilotoPrueba.establecerHabilidades({ velocidad: 101, consistencia: 90, agresividad: 85 });
        console.assert(false, 'Error: debería lanzar excepción por habilidad fuera de rango');
    } catch (e) {
        console.assert(e.message === 'Los parámetros deben encontrarse dentro del rango entre 0 y 100', 'Error: mensaje de error incorrecto para habilidad fuera de rango');
    }
    try {
        pilotoPrueba.establecerHabilidades(null);
        console.assert(false, 'Error: debería lanzar excepción por habilidades no proporcionadas');
    } catch (e) {
        console.assert(e.message === 'No se proporcionaron habilidades del piloto', 'Error: mensaje de error incorrecto para habilidades no proporcionadas');
    }
    console.log('Prueba 1 completada');
} catch (e) {
    console.error('Error en Prueba 1 (Piloto):', e.message);
}

try {
    console.log('Prueba 2: puedeConducirAuto');
    const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);
    const auto1 = new Auto(44, "Mercedes", "W13", "blandos", 333, 100); // velocidadMaxima = 333 para habilidad 90
    // Caso no compatible: sin habilidades
    const puede1 = pilotoPrueba.puedeConducirAuto(auto1);
    console.assert(puede1 === false, 'Error: debe devolver false (sin habilidades, habilidad = 0)');
    // Caso compatible: habilidad = 90, velocidadMaxima = 333
    pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
    const puede2 = pilotoPrueba.puedeConducirAuto(auto1);
    console.assert(puede2 === true, 'Error: debe devolver true (habilidad = 90, velocidadMaxima = 333, auto disponible)');
    // Caso no compatible: auto ocupado
    auto1.conductor = new Piloto("Max Verstappen", "Holandés", 0);
    const puede3 = pilotoPrueba.puedeConducirAuto(auto1);
    console.assert(puede3 === false, 'Error: debe devolver false (auto ocupado)');
    // Caso no compatible: velocidadMaxima demasiado alta
    const auto2 = new Auto(33, "Red Bull", "RB18", "blandos", 400, 100); // habilidad 90 / 400 < 0.27
    const puede4 = pilotoPrueba.puedeConducirAuto(auto2);
    console.assert(puede4 === false, 'Error: debe devolver false (habilidad / velocidadMaxima < 0.27)');
    console.log('Prueba 2 completada');
} catch (e) {
    console.error('Error en Prueba 2 (Piloto):', e.message);
}

try {
    console.log('Prueba 3: conducirAuto');
    const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);
    const auto1 = new Auto(44, "Mercedes", "W13", "blandos", 333, 100);
    // Caso de error: auto y piloto no compatibles
    try {
        pilotoPrueba.conducirAuto(auto1);
        console.assert(false, 'Error: debería lanzar excepción por auto y piloto no compatibles');
    } catch (e) {
        console.assert(e.message === 'El auto y el piloto no son compatibles', 'Error: mensaje de error incorrecto');
    }
    // Caso exitoso: establecer habilidades para compatibilidad
    pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
    const asignacion1 = pilotoPrueba.conducirAuto(auto1);
    console.assert(asignacion1.piloto === "Lewis Hamilton", 'Error: piloto debe ser "Lewis Hamilton"');
    console.assert(asignacion1.auto === "Mercedes W13", 'Error: auto debe ser "Mercedes W13"');
    console.assert(asignacion1.numero === 44, 'Error: numero debe ser 44');
    console.assert(asignacion1.estado === "asignado", 'Error: estado debe ser "asignado"');
    console.assert(pilotoPrueba.auto === auto1, 'Error: pilotoPrueba.auto debe ser auto1');
    console.assert(pilotoPrueba.autosConducidos.length === 1, 'Error: autosConducidos.length debe ser 1');
    console.assert(pilotoPrueba.autosConducidos[0] === auto1, 'Error: autosConducidos[0] debe ser auto1');
    console.assert(auto1.conductor === pilotoPrueba, 'Error: auto1.conductor debe ser pilotoPrueba');
    try {
        pilotoPrueba.conducirAuto(auto1);
        console.assert(false, 'Error: debería lanzar excepción por auto ocupado');
    } catch (e) {
        console.assert(e.message === 'El auto y el piloto no son compatibles', 'Error: mensaje de error incorrecto');
    }
    console.log('Prueba 3 completada');
} catch (e) {
    console.error('Error en Prueba 3 (Piloto):', e.message);
}

try {
    console.log('Prueba 4: calcularRendimiento');
    const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);
    pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
    // Caso seco: temperatura 25, humedad 40
    const rendimiento1 = pilotoPrueba.calcularRendimiento({ clima: "seco", temperatura: 25, humedad: 40 });
    console.assert(rendimiento1.velocidad === (95 * 1.02 * 1.01).toFixed(2), 'Error: velocidad debe ser 95 * 1.02 * 1.01');
    console.assert(rendimiento1.consistencia === (90 * 1.0).toFixed(2), 'Error: consistencia debe ser 90 * 1.0');
    console.assert(rendimiento1.agresividad === (85 * 1.0).toFixed(2), 'Error: agresividad debe ser 85 * 1.0');
    const esperado1 = (95 * 1.02 * 1.01 * 0.4 + 85 * 0.4 + 90 * 0.2).toFixed(2);
    console.assert(rendimiento1.rendimientoTotal === esperado1, `Error: rendimientoTotal debe ser ${esperado1}`);
    console.assert(pilotoPrueba.velocidad.toFixed(2) === (95 * 1.02 * 1.01).toFixed(2), 'Error: pilotoPrueba.velocidad debe ser actualizada');
    console.assert(pilotoPrueba.consistencia.toFixed(2) === (90 * 1.0).toFixed(2), 'Error: pilotoPrueba.consistencia debe ser 90');
    console.assert(pilotoPrueba.agresividad.toFixed(2) === (85 * 1.0).toFixed(2), 'Error: pilotoPrueba.agresividad debe ser 85');
    // Caso lluvia: temperatura 10, humedad 80
    pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 }); // Restaurar habilidades
    const rendimiento2 = pilotoPrueba.calcularRendimiento({ clima: "lluvia", temperatura: 10, humedad: 80 });
    console.assert(rendimiento2.velocidad === (95 * 0.95 * 1.01 * 0.8).toFixed(2), 'Error: velocidad debe ser 95 * 0.95 * 1.01 * 0.8');
    console.assert(rendimiento2.consistencia === (90 * 0.8).toFixed(2), 'Error: consistencia debe ser 90 * 0.8');
    console.assert(rendimiento2.agresividad === (85 * 0.8).toFixed(2), 'Error: agresividad debe ser 85 * 0.8');
    const esperado2 = (95 * 0.95 * 1.01 * 0.8 * 0.4 + 85 * 0.8 * 0.4 + 90 * 0.8 * 0.2).toFixed(2);
    console.assert(rendimiento2.rendimientoTotal === esperado2, `Error: rendimientoTotal debe ser ${esperado2}`);
    console.log('Prueba 4 completada');
} catch (e) {
    console.error('Error en Prueba 4 (Piloto):', e.message);
}

try {
    console.log('Prueba 5: registrarVictoria');
    const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);
    const victoria1 = pilotoPrueba.registrarVictoria();
    console.assert(victoria1.victorias === 1, 'Error: victorias debe ser 1');
    console.assert(victoria1.puntosCampeonato === 25, 'Error: puntosCampeonato debe ser 25');
    console.assert(victoria1.estadisticas.victorias === 1, 'Error: estadisticas.victorias debe ser 1');
    console.assert(victoria1.estadisticas.podios === 0, 'Error: estadisticas.podios debe ser 0');
    console.assert(victoria1.estadisticas.vueltasRapidas === 0, 'Error: estadisticas.vueltasRapidas debe ser 0');
    console.assert(pilotoPrueba.victorias === 1, 'Error: pilotoPrueba.victorias debe ser 1');
    console.assert(pilotoPrueba.puntosCampeonato === 25, 'Error: pilotoPrueba.puntosCampeonato debe ser 25');
    console.assert(pilotoPrueba.estadisticas.victorias === 1, 'Error: pilotoPrueba.estadisticas.victorias debe ser 1');
    console.log('Prueba 5 completada');
} catch (e) {
    console.error('Error en Prueba 5 (Piloto):', e.message);
}

try {
    console.log('Prueba 6: registrarPodio');
    const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);
    pilotoPrueba.registrarVictoria();
    const podio1 = pilotoPrueba.registrarPodio(2);
    console.assert(podio1.podios === 1, 'Error: podios debe ser 1');
    console.assert(podio1.puntosCampeonato === 43, 'Error: puntosCampeonato debe ser 25 + 18 = 43');
    console.assert(podio1.estadisticas.podios === 1, 'Error: estadisticas.podios debe ser 1');
    console.assert(podio1.estadisticas.victorias === 1, 'Error: estadisticas.victorias debe ser 1');
    console.assert(podio1.estadisticas.vueltasRapidas === 0, 'Error: estadisticas.vueltasRapidas debe ser 0');
    console.assert(pilotoPrueba.podios === 1, 'Error: pilotoPrueba.podios debe ser 1');
    console.assert(pilotoPrueba.puntosCampeonato === 43, 'Error: pilotoPrueba.puntosCampeonato debe ser 43');
    console.assert(pilotoPrueba.estadisticas.podios === 1, 'Error: pilotoPrueba.estadisticas.podios debe ser 1');
    // Caso posición 3
    const pilotoPrueba2 = new Piloto("Max Verstappen", "Holandés", 0);
    const podio2 = pilotoPrueba2.registrarPodio(3);
    console.assert(podio2.puntosCampeonato === 15, 'Error: puntosCampeonato debe ser 15 para posición 3');
    console.log('Prueba 6 completada');
} catch (e) {
    console.error('Error en Prueba 6 (Piloto):', e.message);
}

try {
    console.log('Prueba 7: registrarVueltaRapida');
    const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);
    pilotoPrueba.registrarVictoria();
    pilotoPrueba.registrarPodio(2);
    const vueltaRapida1 = pilotoPrueba.registrarVueltaRapida();
    console.assert(vueltaRapida1.vueltasRapidas === 1, 'Error: vueltasRapidas debe ser 1');
    console.assert(vueltaRapida1.puntosCampeonato === 44, 'Error: puntosCampeonato debe ser 25 + 18 + 1 = 44');
    console.assert(vueltaRapida1.estadisticas.vueltasRapidas === 1, 'Error: estadisticas.vueltasRapidas debe ser 1');
    console.assert(vueltaRapida1.estadisticas.victorias === 1, 'Error: estadisticas.victorias debe ser 1');
    console.assert(vueltaRapida1.estadisticas.podios === 1, 'Error: estadisticas.podios debe ser 1');
    console.assert(pilotoPrueba.vueltasRapidas === 1, 'Error: pilotoPrueba.vueltasRapidas debe ser 1');
    console.assert(pilotoPrueba.puntosCampeonato === 44, 'Error: pilotoPrueba.puntosCampeonato debe ser 44');
    console.assert(pilotoPrueba.estadisticas.vueltasRapidas === 1, 'Error: pilotoPrueba.estadisticas.vueltasRapidas debe ser 1');
    console.log('Prueba 7 completada');
} catch (e) {
    console.error('Error en Prueba 7 (Piloto):', e.message);
}

try {
    console.log('Prueba 8: obtenerEstadisticas');
    const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);
    pilotoPrueba.adelantamientos = 15;
    pilotoPrueba.errores = 2;
    pilotoPrueba.vueltasCompletadas = 450;
    pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
    pilotoPrueba.registrarVictoria();
    pilotoPrueba.registrarPodio(2);
    pilotoPrueba.registrarVueltaRapida();
    const estadisticas1 = pilotoPrueba.obtenerEstadisticas();
    console.assert(estadisticas1.general.victorias === 1, 'Error: general.victorias debe ser 1');
    console.assert(estadisticas1.general.podios === 1, 'Error: general.podios debe ser 1');
    console.assert(estadisticas1.general.vueltasRapidas === 1, 'Error: general.vueltasRapidas debe ser 1');
    console.assert(estadisticas1.general.abandonos === 0, 'Error: general.abandonos debe ser 0');
    console.assert(estadisticas1.habilidades.velocidad === 95, 'Error: habilidades.velocidad debe ser 95');
    console.assert(estadisticas1.habilidades.consistencia === 90, 'Error: habilidades.consistencia debe ser 90');
    console.assert(estadisticas1.habilidades.agresividad === 85, 'Error: habilidades.agresividad debe ser 85');
    console.assert(estadisticas1.rendimiento.adelantamientos === 15, 'Error: rendimiento.adelantamientos debe ser 15');
    console.assert(estadisticas1.rendimiento.errores === 2, 'Error: rendimiento.errores debe ser 2');
    console.assert(estadisticas1.rendimiento.vueltasCompletadas === 450, 'Error: rendimiento.vueltasCompletadas debe ser 450');
    console.assert(estadisticas1.puntosCampeonato === 25 + 18 + 1, 'Error: puntosCampeonato debe ser 25 + 18 + 1 = 44');
    const pilotoVacio = new Piloto("Max Verstappen", "Holandés", 0);
    const estadisticas2 = pilotoVacio.obtenerEstadisticas();
    console.assert(estadisticas2.general.victorias === 0, 'Error: general.victorias debe ser 0');
    console.assert(estadisticas2.rendimiento.adelantamientos === 0, 'Error: rendimiento.adelantamientos debe ser 0');
    console.assert(estadisticas2.rendimiento.vueltasCompletadas === 0, 'Error: rendimiento.vueltasCompletadas debe ser 0');
    console.log('Prueba 8 completada');
} catch (e) {
    console.error('Error en Prueba 8 (Piloto):', e.message);
}

try {
    console.log('Prueba 9: adaptarEstiloConduccion');
    const pilotoPrueba = new Piloto("Lewis Hamilton", "Británico", 0);
    pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
    // Caso ideal: seco, alta visibilidad, pista seca
    const estilo1 = pilotoPrueba.adaptarEstiloConduccion({
        clima: "seco",
        visibilidad: "alta",
        estadoPista: "seca"
    });
    console.assert(estilo1.estiloAnterior === "agresivo", 'Error: estiloAnterior debe ser "agresivo"');
    console.assert(estilo1.estiloNuevo === "agresivo", 'Error: estiloNuevo debe ser "agresivo"');
    console.assert(estilo1.ajustes.agresividad === "+20", 'Error: ajustes.agresividad debe ser "+20"');
    console.assert(estilo1.ajustes.consistencia === "-10", 'Error: ajustes.consistencia debe ser "-10"');
    console.assert(pilotoPrueba.agresividad === 105, 'Error: pilotoPrueba.agresividad debe ser 85 + 20 = 105');
    console.assert(pilotoPrueba.consistencia === 80, 'Error: pilotoPrueba.consistencia debe ser 90 - 10 = 80');
    // Caso medio: mojado
    pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 }); // Restaurar
    const estilo2 = pilotoPrueba.adaptarEstiloConduccion({
        clima: "mojado",
        visibilidad: "media",
        estadoPista: "húmeda"
    });
    console.assert(estilo2.estiloAnterior === "agresivo", 'Error: estiloAnterior debe ser "agresivo"');
    console.assert(estilo2.estiloNuevo === "conservador", 'Error: estiloNuevo debe ser "conservador"');
    console.assert(estilo2.ajustes.agresividad === "-10", 'Error: ajustes.agresividad debe ser "-10"');
    console.assert(estilo2.ajustes.consistencia === "+10", 'Error: ajustes.consistencia debe ser "+10"');
    console.assert(pilotoPrueba.agresividad === 75, 'Error: pilotoPrueba.agresividad debe ser 85 - 10 = 75');
    console.assert(pilotoPrueba.consistencia === 100, 'Error: pilotoPrueba.consistencia debe ser 90 + 10 = 100');
    // Caso extremo: lluvia
    pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 }); // Restaurar
    const estilo3 = pilotoPrueba.adaptarEstiloConduccion({
        clima: "lluvia",
        visibilidad: "baja",
        estadoPista: "mojada"
    });
    console.assert(estilo3.estiloAnterior === "agresivo", 'Error: estiloAnterior debe ser "agresivo"');
    console.assert(estilo3.estiloNuevo === "conservador", 'Error: estiloNuevo debe ser "conservador"');
    console.assert(estilo3.ajustes.agresividad === "-20", 'Error: ajustes.agresividad debe ser "-20"');
    console.assert(estilo3.ajustes.consistencia === "+15", 'Error: ajustes.consistencia debe ser "+15"');
    console.assert(pilotoPrueba.agresividad === 65, 'Error: pilotoPrueba.agresividad debe ser 85 - 20 = 65');
    console.assert(pilotoPrueba.consistencia === 105, 'Error: pilotoPrueba.consistencia debe ser 90 + 15 = 105');
    console.log('Prueba 9 completada');
} catch (e) {
    console.error('Error en Prueba 9 (Piloto):', e.message);
}

// Sección de pruebas para Estrategia
console.log('\n=== Pruebas para Estrategia ===');
try {
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
} catch (e) {
    console.error('Error en Prueba 1 (Estrategia):', e.message);
}

try {
    console.log('Prueba 2: paradasDistribuidasUniformemente');
    const estrategia1 = new Estrategia("alta", [20, 40, 60], ["duros", "duros", "duros"]);
    console.assert(estrategia1.paradasDistribuidasUniformemente() === true, 'Error: debe devolver true (paradas uniformes)');
    const estrategia2 = new Estrategia("alta", [10, 25, 50], ["duros", "duros", "duros"]);
    console.assert(estrategia2.paradasDistribuidasUniformemente() === false, 'Error: debe devolver false (primer intervalo fuera de rango)');
    const estrategia3 = new Estrategia("alta", [20, 40, 70], ["duros", "duros", "duros"]);
    console.assert(estrategia3.paradasDistribuidasUniformemente() === false, 'Error: debe devolver false (diferencia entre intervalos > 5)');
    console.log('Prueba 2 completada');
} catch (e) {
    console.error('Error en Prueba 2 (Estrategia):', e.message);
}

try {
    console.log('Prueba 3: agresividadConsistente');
    const estrategia1 = new Estrategia("alta", [20, 40, 60], ["duros", "duros", "duros"]);
    console.assert(estrategia1.agresividadConsistente() === true, 'Error: debe devolver true (alta con duros)');
    const estrategia2 = new Estrategia("alta", [20, 40, 60], ["blandos", "duros", "duros"]);
    console.assert(estrategia2.agresividadConsistente() === false, 'Error: debe devolver false (alta pero con blandos)');
    const estrategia3 = new Estrategia("baja", [20, 40, 60], ["blandos", "blandos", "blandos"]);
    console.assert(estrategia3.agresividadConsistente() === true, 'Error: debe devolver true (baja con blandos)');
    const estrategia4 = new Estrategia("baja", [20, 40, 60], ["duros", "blandos", "blandos"]);
    console.assert(estrategia4.agresividadConsistente() === false, 'Error: debe devolver false (baja pero con duros)');
    console.log('Prueba 3 completada');
} catch (e) {
    console.error('Error en Prueba 3 (Estrategia):', e.message);
}

try {
    console.log('Prueba 4: registrarParada');
    const estrategia = new Estrategia("alta", [20, 40, 60], ["duros", "duros", "duros"]);
    const parada1 = estrategia.registrarParada(3.5);
    console.assert(parada1.parada === 1, 'Error: parada debe ser 1');
    console.assert(parada1.tiempo === 3.5, 'Error: tiempo debe ser 3.5');
    console.assert(parada1.vuelta === 20, 'Error: vuelta debe ser 20');
    console.assert(parada1.neumaticos === "duros", 'Error: neumaticos debe ser "duros"');
    console.assert(parada1.totalAcumulado === 3.5, 'Error: totalAcumulado debe ser 3.5');
    const parada2 = estrategia.registrarParada(4.0);
    console.assert(parada2.parada === 2, 'Error: parada debe ser 2');
    console.assert(parada2.totalAcumulado === 7.5, 'Error: totalAcumulado debe ser 7.5');
    console.log('Prueba 4 completada');
} catch (e) {
    console.error('Error en Prueba 4 (Estrategia):', e.message);
}

try {
    console.log('Prueba 5: obtenerSiguienteParada');
    const estrategia = new Estrategia("alta", [20, 40], ["duros", "duros"]);
    const sig1 = estrategia.obtenerSiguienteParada();
    console.assert(sig1.vuelta === 20, 'Error: vuelta debe ser 20');
    console.assert(sig1.neumaticos === "duros", 'Error: neumaticos debe ser "duros"');
    console.assert(sig1.tiempoEstimado === 3, 'Error: tiempoEstimado debe ser 3');
    console.assert(sig1.numeroParada === 1, 'Error: numeroParada debe ser 1');
    estrategia.registrarParada(3.0);
    const sig2 = estrategia.obtenerSiguienteParada();
    console.assert(sig2.vuelta === 40, 'Error: vuelta debe ser 40');
    console.assert(sig2.numeroParada === 2, 'Error: numeroParada debe ser 2');
    console.log('Prueba 5 completada');
} catch (e) {
    console.error('Error en Prueba 5 (Estrategia):', e.message);
}

// Sección de pruebas para Carrera
console.log("\n=== Pruebas para Carrera ===");

// Prueba 1: esValida
try {
    const circuito = new Circuito("Monaco", 3.3, "urbano");
    const carrera = new Carrera("GP Monaco", circuito, "2024-05-26"); // domingo
    for (let i = 0; i < 10; i++) {
        carrera.autosParticipantes.push(new Auto("Auto" + i, new Piloto("Piloto" + i)));
    }
    carrera.condicionesClimaticas = { clima: "seco", temperatura: 25, humedad: 40 };
    console.assert(carrera.esValida(), "Error: la carrera debería ser válida con 10 autos y condiciones");
    console.log("Prueba 1 completada");
} catch (e) {
    console.error("Error en Prueba 1:", e.message);
}

// Prueba 2: calcularNumeroVueltas
try {
    const circuito = new Circuito("Interlagos", 4.3, "alta_degradacion");
    const carrera = new Carrera("GP Brasil", circuito, "2024-05-26");
    for (let i = 0; i < 12; i++) {
        carrera.autosParticipantes.push(new Auto("Auto" + i, new Piloto("Piloto" + i)));
    }
    carrera.condicionesClimaticas = { clima: "seco", temperatura: 28, humedad: 35 };
    const vueltas = carrera.calcularNumeroVueltas();
    console.assert(vueltas > 0, "Error: el cálculo de vueltas debería ser mayor que 0");
    console.log("Prueba 2 completada");
} catch (e) {
    console.error("Error en Prueba 2:", e.message);
}

// Prueba 3: realizarClasificacion
try {
    const circuito = new Circuito("Monza", 5.8, "rapido");
    const carrera = new Carrera("GP Italia", circuito, "2024-05-26");
    for (let i = 0; i < 20; i++) {
        carrera.autosParticipantes.push(new Auto("Auto" + i, new Piloto("Piloto" + i)));
    }
    carrera.condicionesClimaticas = { clima: "seco", temperatura: 30, humedad: 20 };
    const clasificacion = carrera.realizarClasificacion();
    console.assert(clasificacion.posiciones.length === 20, "Error: la clasificación debería devolver 20 posiciones");
    console.log("Prueba 3 completada");
} catch (e) {
    console.error("Error en Prueba 3:", e.message);
}

// Prueba 4: registrarVueltaDeCarrera
try {
    const circuito = new Circuito("Silverstone", 5.9, "rapido");
    const carrera = new Carrera("GP UK", circuito, "2024-05-26");
    const piloto = new Piloto("Hamilton");
    const auto = new Auto("Mercedes", piloto);
    carrera.autosParticipantes.push(auto);
    carrera.condicionesClimaticas = { clima: "seco", temperatura: 20, humedad: 50 };
    carrera.numeroVueltas = 5;
    carrera.vueltaActual = 1;
    const infoVuelta = carrera.registrarVueltaDeCarrera(auto);
    console.assert(infoVuelta.piloto === "Hamilton", "Error: el piloto debería ser Hamilton");
    console.log("Prueba 4 completada");
} catch (e) {
    console.error("Error en Prueba 4:", e.message);
}

// Prueba 5: finalizarCarrera
try {
    const circuito = new Circuito("Spa", 7, "mixto");
    const carrera = new Carrera("GP Belgica", circuito, "2024-05-26");
    for (let i = 0; i < 12; i++) {
        carrera.autosParticipantes.push(new Auto("Auto" + i, new Piloto("Piloto" + i)));
    }
    carrera.condicionesClimaticas = { clima: "seco", temperatura: 22, humedad: 40 };
    carrera.numeroVueltas = 3;
    carrera.vueltaActual = 3;
    carrera.autosParticipantes.forEach(auto => auto.tiempoCarrera = Math.random() * 500);
    carrera.posicionesDeSalida = carrera.autosParticipantes.map((auto, index) => ({
        piloto: auto.conductor.nombre, posicion: index + 1
    }));
    carrera.vueltaRapida = { piloto: carrera.autosParticipantes[0].conductor, tiempo: 85 };
    const resultados = carrera.finalizarCarrera();
    console.assert(resultados.podio.length === 2, "Error: el podio debería contener 3 posiciones (ganador + 2 más)");
    console.log("Prueba 5 completada");
} catch (e) {
    console.error("Error en Prueba 5:", e.message);
}
>>>>>>> 8f4422d969699a4f078ea0908d9ca040aba0a109
