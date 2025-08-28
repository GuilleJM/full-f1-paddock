// Pruebas para la clase Piloto, to run: node tests/testPiloto

const Piloto = require('../entities/Piloto');
const Auto = require('../entities/Auto');

console.log('\n=== Pruebas para Piloto ===');

const pilotoPrueba = new Piloto('Lewis Hamilton', 'Británico', 0);

// Prueba 1: establecerHabilidades
console.log('Prueba 1: establecerHabilidades');
const habilidades1 = pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
console.assert(habilidades1.velocidad === 95, 'Error: velocidad debe ser 95');
console.assert(habilidades1.consistencia === 90, 'Error: consistencia debe ser 90');
console.assert(habilidades1.agresividad === 85, 'Error: agresividad debe ser 85');
console.assert(habilidades1.nivelTotal === '90', 'Error: nivelTotal debe ser "90"');
console.assert(pilotoPrueba.habilidad === '90', 'Error: pilotoPrueba.habilidad debe ser "90"');
console.assert(pilotoPrueba.habilidades.velocidad === 95, 'Error: pilotoPrueba.habilidades.velocidad debe ser 95');
console.assert(pilotoPrueba.habilidades.consistencia === 90, 'Error: pilotoPrueba.habilidades.consistencia debe ser 90');
console.assert(pilotoPrueba.habilidades.agresividad === 85, 'Error: pilotoPrueba.habilidades.agresividad debe ser 85');
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

// Prueba 2: puedeConducirAuto
console.log('Prueba 2: puedeConducirAuto');
pilotoPrueba.habilidad = 0;
pilotoPrueba.habilidades = { velocidad: 0, consistencia: 0, agresividad: 0 };
const auto1 = new Auto(44, 'Mercedes', 'W13', 'blandos', 333, 100);
const puede1 = pilotoPrueba.puedeConducirAuto(auto1);
console.assert(puede1 === false, 'Error: debe devolver false (sin habilidades, habilidad = 0)');
pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
const puede2 = pilotoPrueba.puedeConducirAuto(auto1);
console.assert(puede2 === true, 'Error: debe devolver true (habilidad = 90, velocidadMaxima = 333, auto disponible)');
auto1.conductor = new Piloto('Max Verstappen', 'Holandés', 0);
const puede3 = pilotoPrueba.puedeConducirAuto(auto1);
console.assert(puede3 === false, 'Error: debe devolver false (auto ocupado)');
const auto2 = new Auto(33, 'Red Bull', 'RB18', 'blandos', 400, 100);
const puede4 = pilotoPrueba.puedeConducirAuto(auto2);
console.assert(puede4 === false, 'Error: debe devolver false (habilidad / velocidadMaxima < 0.27)');
console.log('Prueba 2 completada');

// Prueba 3: conducirAuto
console.log('Prueba 3: conducirAuto');
pilotoPrueba.habilidad = 0;
pilotoPrueba.habilidades = { velocidad: 0, consistencia: 0, agresividad: 0 };
pilotoPrueba.auto = null;
pilotoPrueba.autosConducidos = [];
auto1.conductor = null;
try {
    pilotoPrueba.conducirAuto(auto1);
    console.assert(false, 'Error: debería lanzar excepción por auto y piloto no compatibles');
} catch (e) {
    console.assert(e.message === 'El auto y el piloto no son compatibles', 'Error: mensaje de error incorrecto');
}
pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
const asignacion1 = pilotoPrueba.conducirAuto(auto1);
console.assert(asignacion1.piloto === 'Lewis Hamilton', 'Error: piloto debe ser "Lewis Hamilton"');
console.assert(asignacion1.auto === 'Mercedes W13', 'Error: auto debe ser "Mercedes W13"');
console.assert(asignacion1.numero === 44, 'Error: numero debe ser 44');
console.assert(asignacion1.estado === 'asignado', 'Error: estado debe ser "asignado"');
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

// Prueba 4: calcularRendimiento
console.log('Prueba 4: calcularRendimiento');
pilotoPrueba.habilidad = 0;
pilotoPrueba.habilidades = { velocidad: 0, consistencia: 0, agresividad: 0 };
pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
const rendimiento1 = pilotoPrueba.calcularRendimiento({ clima: 'seco', temperatura: 25, humedad: 40 });
console.assert(rendimiento1.velocidad === (95 * 1.02 * 1.01).toFixed(2), 'Error: velocidad debe ser 95 * 1.02 * 1.01');
console.assert(rendimiento1.consistencia === (90 * 1.0).toFixed(2), 'Error: consistencia debe ser 90 * 1.0');
console.assert(rendimiento1.agresividad === (85 * 1.0).toFixed(2), 'Error: agresividad debe ser 85 * 1.0');
console.assert(rendimiento1.rendimientoTotal === (95 * 1.02 * 1.01 * 0.4 + 85 * 0.4 + 90 * 0.2).toFixed(2), 'Error: rendimientoTotal debe ser 91.13');
console.assert(pilotoPrueba.habilidades.velocidad.toFixed(2) === (95 * 1.02 * 1.01).toFixed(2), 'Error: pilotoPrueba.habilidades.velocidad debe ser actualizada');
console.assert(pilotoPrueba.habilidades.consistencia.toFixed(2) === (90 * 1.0).toFixed(2), 'Error: pilotoPrueba.habilidades.consistencia debe ser 90');
console.assert(pilotoPrueba.habilidades.agresividad.toFixed(2) === (85 * 1.0).toFixed(2), 'Error: pilotoPrueba.habilidades.agresividad debe ser 85');
pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
const rendimiento2 = pilotoPrueba.calcularRendimiento({ clima: 'lluvia', temperatura: 10, humedad: 80 });
console.assert(rendimiento2.velocidad === (95 * 0.95 * 0.96 * 0.8).toFixed(2), 'Error: velocidad debe ser 95 * 0.95 * 0.96 * 0.8');
console.assert(rendimiento2.consistencia === (90 * 0.8).toFixed(2), 'Error: consistencia debe ser 90 * 0.8');
console.assert(rendimiento2.agresividad === (85 * 0.8).toFixed(2), 'Error: agresividad debe ser 85 * 0.8');
console.assert(rendimiento2.rendimientoTotal === (
    95 * 0.95 * 0.96 * 0.8 * 0.4 +   // velocidad ponderada
    85 * 0.8 * 0.4 +                // agresividad ponderada
    90 * 0.8 * 0.2                  // consistencia ponderada
).toFixed(2), 'Error: rendimientoTotal debe ser 67.94');
console.log('Prueba 4 completada');

// Prueba 5: registrarVictoria
console.log('Prueba 5: registrarVictoria');
pilotoPrueba.victorias = 0;
pilotoPrueba.puntosCampeonato = 0;
pilotoPrueba.estadisticas = { victorias: 0, podios: 0, vueltasRapidas: 0, abandonos: 0 };
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

// Prueba 6: registrarPodio
console.log('Prueba 6: registrarPodio');
pilotoPrueba.victorias = 0;
pilotoPrueba.podios = 0;
pilotoPrueba.puntosCampeonato = 0;
pilotoPrueba.estadisticas = { victorias: 0, podios: 0, vueltasRapidas: 0, abandonos: 0 };
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
pilotoPrueba.podios = 0;
pilotoPrueba.puntosCampeonato = 0;
pilotoPrueba.estadisticas = { victorias: 0, podios: 0, vueltasRapidas: 0, abandonos: 0 };
const podio2 = pilotoPrueba.registrarPodio(3);
console.assert(podio2.puntosCampeonato === 15, 'Error: puntosCampeonato debe ser 15 para posición 3');
console.log('Prueba 6 completada');

// Prueba 7: registrarVueltaRapida
console.log('Prueba 7: registrarVueltaRapida');
pilotoPrueba.victorias = 0;
pilotoPrueba.podios = 0;
pilotoPrueba.vueltasRapidas = 0;
pilotoPrueba.puntosCampeonato = 0;
pilotoPrueba.estadisticas = { victorias: 0, podios: 0, vueltasRapidas: 0, abandonos: 0 };
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

// Prueba 8: obtenerEstadisticas
console.log('Prueba 8: obtenerEstadisticas');
pilotoPrueba.adelantamientos = 15;
pilotoPrueba.errores = 2;
pilotoPrueba.vueltasCompletadas = 450;
pilotoPrueba.victorias = 0;
pilotoPrueba.podios = 0;
pilotoPrueba.vueltasRapidas = 0;
pilotoPrueba.puntosCampeonato = 0;
pilotoPrueba.estadisticas = { victorias: 0, podios: 0, vueltasRapidas: 0, abandonos: 0 };
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
console.assert(estadisticas1.puntosCampeonato === 44, 'Error: puntosCampeonato debe ser 25 + 18 + 1 = 44');
pilotoPrueba.adelantamientos = 0;
pilotoPrueba.errores = 0;
pilotoPrueba.vueltasCompletadas = 0;
pilotoPrueba.victorias = 0;
pilotoPrueba.podios = 0;
pilotoPrueba.vueltasRapidas = 0;
pilotoPrueba.puntosCampeonato = 0;
pilotoPrueba.estadisticas = { victorias: 0, podios: 0, vueltasRapidas: 0, abandonos: 0 };
const estadisticas2 = pilotoPrueba.obtenerEstadisticas();
console.assert(estadisticas2.general.victorias === 0, 'Error: general.victorias debe ser 0');
console.assert(estadisticas2.rendimiento.adelantamientos === 0, 'Error: rendimiento.adelantamientos debe ser 0');
console.assert(estadisticas2.rendimiento.vueltasCompletadas === 0, 'Error: rendimiento.vueltasCompletadas debe ser 0');
console.log('Prueba 8 completada');

// Prueba 9: adaptarEstiloConduccion
console.log('Prueba 9: adaptarEstiloConduccion');
pilotoPrueba.estilo = 'agresivo';
pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
const estilo1 = pilotoPrueba.adaptarEstiloConduccion({
    clima: 'seco',
    visibilidad: 'alta',
    estadoPista: 'seca'
});
console.assert(estilo1.estiloAnterior === 'agresivo', 'Error: estiloAnterior debe ser "agresivo"');
console.assert(estilo1.estiloNuevo === 'agresivo', 'Error: estiloNuevo debe ser "agresivo"');
console.assert(estilo1.ajustes.agresividad === '+20', 'Error: ajustes.agresividad debe ser "+20"');
console.assert(estilo1.ajustes.consistencia === '-10', 'Error: ajustes.consistencia debe ser "-10"');
console.assert(pilotoPrueba.habilidades.agresividad === 105, 'Error: pilotoPrueba.agresividad debe ser 85 + 20 = 105');
console.assert(pilotoPrueba.habilidades.consistencia === 80, 'Error: pilotoPrueba.consistencia debe ser 90 - 10 = 80');
pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
pilotoPrueba.estilo = 'agresivo';
const estilo2 = pilotoPrueba.adaptarEstiloConduccion({
    clima: 'mojado',
    visibilidad: 'media',
    estadoPista: 'húmeda'
});
console.assert(estilo2.estiloAnterior === 'agresivo', 'Error: estiloAnterior debe ser "agresivo"');
console.assert(estilo2.estiloNuevo === 'conservador', 'Error: estiloNuevo debe ser "conservador"');
console.assert(estilo2.ajustes.agresividad === '-10', 'Error: ajustes.agresividad debe ser "-10"');
console.assert(estilo2.ajustes.consistencia === '+10', 'Error: ajustes.consistencia debe ser "+10"');
console.assert(pilotoPrueba.habilidades.agresividad === 75, 'Error: pilotoPrueba.agresividad debe ser 85 - 10 = 75');
console.assert(pilotoPrueba.habilidades.consistencia === 100, 'Error: pilotoPrueba.consistencia debe ser 90 + 10 = 100');
pilotoPrueba.establecerHabilidades({ velocidad: 95, consistencia: 90, agresividad: 85 });
pilotoPrueba.estilo = 'agresivo';
const estilo3 = pilotoPrueba.adaptarEstiloConduccion({
    clima: 'lluvia',
    visibilidad: 'baja',
    estadoPista: 'mojada'
});
console.assert(estilo3.estiloAnterior === 'agresivo', 'Error: estiloAnterior debe ser "agresivo"');
console.assert(estilo3.estiloNuevo === 'conservador', 'Error: estiloNuevo debe ser "conservador"');
console.assert(estilo3.ajustes.agresividad === '-20', 'Error: ajustes.agresividad debe ser "-20"');
console.assert(estilo3.ajustes.consistencia === '+15', 'Error: ajustes.consistencia debe ser "+15"');
console.assert(pilotoPrueba.habilidades.agresividad === 65, 'Error: pilotoPrueba.agresividad debe ser 85 - 20 = 65');
console.assert(pilotoPrueba.habilidades.consistencia === 105, 'Error: pilotoPrueba.consistencia debe ser 90 + 15 = 105');
console.log('Prueba 9 completada\n');