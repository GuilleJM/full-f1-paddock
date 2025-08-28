// Pruebas para la clase Escuderia, to run: node tests/testEscuderia

const Escuderia = require('../entities/Escuderia');

console.log('\n=== Pruebas para Escuderia ===');

const escuderiaPrueba = new Escuderia('Prueba', 'España', 1000000);

// Guardamos el Math.random original para forzarlo a un valor fijo en pruebas y restaurarlo después
const originalRandom = Math.random;
Math.random = () => 0.5; // Forzamos a Math.random a devolver 0.5 para la prueba 1, 2 y 3

// Prueba 1: invertirEnDesarrollo
console.log('Prueba 1: invertirEnDesarrollo');
escuderiaPrueba.presupuesto = 1000000;
escuderiaPrueba.presupuestoInvertido = 0;
escuderiaPrueba.desarrollo.motor = { nivel: 0, estadisticas: { potencia: 0, eficiencia: 0 } };
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

// Prueba 2: calcularMejora
console.log('Prueba 2: calcularMejora');
escuderiaPrueba.presupuesto = 1000000; // Reiniciar estado
const mejora = escuderiaPrueba.calcularMejora('motor', 200000);
console.assert(mejora.area === 'motor', 'Error: area debe ser "motor"');
console.assert(mejora.mejoraPotencia === 10, 'Error: mejoraPotencia debe ser 10');
console.assert(mejora.mejoraEficiencia === 10, 'Error: mejoraEficiencia debe ser 10');
console.assert(mejora.nivelAlcanzado === 2, 'Error: nivelAlcanzado debe ser 2');
console.log('Prueba 2 completada');

// Prueba 3: esDesarrolloExitoso
console.log('Prueba 3: esDesarrolloExitoso');
escuderiaPrueba.presupuesto = 1000000; // Reiniciar estado
escuderiaPrueba.invertirEnDesarrollo('motor', 100000); // Establece nivelAlcanzado = 1
const esExitoso1 = escuderiaPrueba.esDesarrolloExitoso(1, 1);
console.assert(esExitoso1 === true, 'Error: esDesarrolloExitoso debe devolver true (nivelEsperado === nivelAlcanzado)');
Math.random = () => 0.1; // Esta vez forzamos a Math.random a devolver 0.1 -> Desarrollo no exitoso (0.1 < 0.2)
escuderiaPrueba.invertirEnDesarrollo('aerodinamica', 100000); // Establece nivelAlcanzado = 0
const esExitoso2 = escuderiaPrueba.esDesarrolloExitoso(1, 0);
console.assert(esExitoso2 === false, 'Error: esDesarrolloExitoso debe devolver false (nivelEsperado !== nivelAlcanzado)');
console.log('Prueba 3 completada');

// Prueba 4: obtenerEstadisticas
console.log('Prueba 4: obtenerEstadisticas');
escuderiaPrueba.presupuesto = 1000000; // Reiniciar estado
escuderiaPrueba.presupuestoInvertido = 0;
escuderiaPrueba.desarrollo = {
    motor: { nivel: 0, estadisticas: { potencia: 0, eficiencia: 0 } },
    aerodinamica: { nivel: 0, estadisticas: { carga: 0, resistencia: 0 } },
    neumaticos: { nivel: 0, estadisticas: { durabilidad: 0, agarre: 0 } },
    suspension: { nivel: 0, estadisticas: { estabilidad: 0, respuesta: 0 } }
};
escuderiaPrueba.estadisticas = { victorias: 0, podios: 0, vueltasRapidas: 0, abandonos: 0 };
const estadisticas = escuderiaPrueba.obtenerEstadisticas();
console.assert(estadisticas.desarrollo.motor.nivel === 0, 'Error: nivel de motor debe ser 0');
console.assert(estadisticas.rendimiento.victorias === 0, 'Error: victorias debe ser 0');
console.assert(estadisticas.puntosCampeonato === 0, 'Error: puntosCampeonato debe ser 0');
console.assert(estadisticas.presupuesto.total === 1000000, 'Error: presupuesto total debe ser 1000000');
console.assert(estadisticas.presupuesto.disponible === 1000000, 'Error: presupuesto disponible debe ser 1000000');
console.assert(estadisticas.presupuesto.invertido === 0, 'Error: presupuesto invertido debe ser 0');
console.log('Prueba 4 completada');

// Prueba 5: actualizarEstadisticas
console.log('Prueba 5: actualizarEstadisticas');
escuderiaPrueba.estadisticas = { victorias: 0, podios: 0, vueltasRapidas: 0, abandonos: 0 }; // Reiniciar estado
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
console.log('Prueba 5 completada\n');