const Auto = require('./entities/Auto');
const Piloto = require('./entities/Piloto');
const Escuderia = require('./entities/Escuderia');
const Carrera = require('./entities/Carrera');
const Circuito = require('./entities/Circuito');
const Estrategia = require('./entities/Estrategia');

// Sección de pruebas para Escuderia
console.log('\n=== Pruebas Unitarias para Escuderia ===');
const escuderiaPrueba = new Escuderia('Prueba', 'España', 1000000);

console.log('Prueba 1: invertirEnDesarrollo');
const inversion = escuderiaPrueba.invertirEnDesarrollo('motor', 200000);
console.assert(inversion.area === 'motor', 'Error: area debe ser "motor"');
console.assert(inversion.montoInvertido === 200000, 'Error: montoInvertido debe ser 200000');
console.assert(inversion.presupuestoRestante === 800000, 'Error: presupuestoRestante debe ser 800000');
console.assert(inversion.nivelAnterior === 0, 'Error: nivelAnterior debe ser 0');
console.assert(inversion.nivelNuevo === 2, 'Error: nivelNuevo debe ser 2');
console.assert(escuderiaPrueba.desarrollo.motor.estadisticas.potencia === 10, 'Error: potencia debe ser 15');
console.assert(escuderiaPrueba.desarrollo.motor.estadisticas.eficiencia === 10, 'Error: eficiencia debe ser 10');
console.log('Prueba 1 completada');

console.log('Prueba 2: calcularMejora');
const mejora = escuderiaPrueba.calcularMejora('motor', 200000);
console.assert(mejora.area === 'motor', 'Error: area debe ser "motor"');
console.assert(mejora.mejoraPotencia === 10, 'Error: mejoraPotencia debe ser 15');
console.assert(mejora.mejoraEficiencia === 10, 'Error: mejoraEficiencia debe ser 10');
console.assert(mejora.nivelAlcanzado === 2, 'Error: nivelAlcanzado debe ser 2');
console.log('Prueba 2 completada');

console.log('Prueba 3: esDesarrolloExitoso (progreso suficiente)');
const esExitoso1 = escuderiaPrueba.esDesarrolloExitoso('motor');
console.assert(esExitoso1 === true, 'Error: esDesarrolloExitoso debe devolver true (suma de stats >= 20)');
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
console.log('Prueba 5 completada');

try {
    // Crear circuito con condiciones climáticas
    const circuito = new Circuito('Monza', 'Italia', 5.793, "baja_degradacion");
    circuito.establecerCondicionesClimaticas('soleado', 25, 50);
    circuito.agregarZonaDRS('Recta principal', 1000);
    circuito.agregarZonaDRS('Curva Parabolica', 800);

    // Agregar curvas al circuito
    circuito.agregarCurva('Curva 1', 250, 'alta');
    circuito.agregarCurva('Curva 2', 180, 'media');
    circuito.agregarCurva('Curva 3', 80, 'baja');

    // Crear escuderías con presupuesto y desarrollo
    const escuderia1 = new Escuderia('Ferrari', 'Italia', 400000000);
    const escuderia2 = new Escuderia('Mercedes', 'Alemania', 450000000);

    // Invertir en desarrollo
    escuderia1.invertirEnDesarrollo('motor', 50000000);
    escuderia2.invertirEnDesarrollo('aerodinamica', 60000000);

    // Crear autos con sistema de desgaste
    const auto1 = new Auto(16, 'Ferrari', 'SF21', 'blandos', 340, 100);
    const auto2 = new Auto(55, 'Ferrari', 'SF21', 'medios', 338, 100);
    const auto3 = new Auto(44, 'Mercedes', 'W12', 'blandos', 342, 100);
    const auto4 = new Auto(77, 'Mercedes', 'W12', 'duros', 341, 100);
    const auto5 = new Auto(33, 'Red Bull', 'RB16B', 'blandos', 343, 100);
    const auto6 = new Auto(11, 'Red Bull', 'RB16B', 'medios', 339, 100);
    const auto7 = new Auto(4, 'McLaren', 'MCL35M', 'blandos', 337, 100);
    const auto8 = new Auto(3, 'McLaren', 'MCL35M', 'duros', 336, 100);
    const auto9 = new Auto(31, 'Alpine', 'A521', 'medios', 335, 100);
    const auto10 = new Auto(14, 'Alpine', 'A521', 'blandos', 340, 100);
    const auto11 = new Auto(18, 'Aston Martin', 'AMR21', 'duros', 334, 100);
    const auto12 = new Auto(5, 'Aston Martin', 'AMR21', 'medios', 338, 100);
    const auto13 = new Auto(22, 'AlphaTauri', 'AT02', 'blandos', 341, 100);
    const auto14 = new Auto(10, 'AlphaTauri', 'AT02', 'duros', 336, 100);
    const auto15 = new Auto(99, 'Alfa Romeo', 'C41', 'medios', 333, 100);
    const auto16 = new Auto(7, 'Alfa Romeo', 'C41', 'blandos', 339, 100);
    const auto17 = new Auto(63, 'Williams', 'FW43B', 'duros', 332, 100);
    const auto18 = new Auto(6, 'Williams', 'FW43B', 'medios', 335, 100);
    const auto19 = new Auto(47, 'Haas', 'VF-21', 'blandos', 330, 100);
    const auto20 = new Auto(9, 'Haas', 'VF-21', 'duros', 331, 100);

    // Configurar desgaste inicial

    [auto1, auto2, auto3, auto4, auto5, auto6, auto7, auto8, auto9, auto10, auto11, auto12, auto13, auto14, auto15, auto16, auto17, auto18, auto19, auto20].forEach(auto => {
        auto.configurarDesgasteInicial({
            desgasteNeumaticos: 0,
            desgasteMotor: 0,
            combustible: 60
        });
    });

    // Crear pilotos con habilidades
    const piloto1 = new Piloto('Charles Leclerc', 'Mónaco', 0);
    const piloto2 = new Piloto('Carlos Sainz', 'España', 0);
    const piloto3 = new Piloto('Lewis Hamilton', 'Reino Unido', 0);
    const piloto4 = new Piloto('Valtteri Bottas', 'Finlandia', 0);
    const piloto5 = new Piloto('Max Verstappen', 'Países Bajos', 0);
    const piloto6 = new Piloto('Sergio Pérez', 'México', 0);
    const piloto7 = new Piloto('Lando Norris', 'Reino Unido', 0);
    const piloto8 = new Piloto('Daniel Ricciardo', 'Australia', 0);
    const piloto9 = new Piloto('Esteban Ocon', 'Francia', 0);
    const piloto10 = new Piloto('Fernando Alonso', 'España', 0);
    const piloto11 = new Piloto('Lance Stroll', 'Canadá', 0);
    const piloto12 = new Piloto('Sebastian Vettel', 'Alemania', 0);
    const piloto13 = new Piloto('Yuki Tsunoda', 'Japón', 0);
    const piloto14 = new Piloto('Pierre Gasly', 'Francia', 0);
    const piloto15 = new Piloto('Antonio Giovinazzi', 'Italia', 0);
    const piloto16 = new Piloto('Kimi Räikkönen', 'Finlandia', 0);
    const piloto17 = new Piloto('George Russell', 'Reino Unido', 0);
    const piloto18 = new Piloto('Nicholas Latifi', 'Canadá', 0);
    const piloto19 = new Piloto('Mick Schumacher', 'Alemania', 0);
    const piloto20 = new Piloto('Nikita Mazepin', 'Rusia', 0);

    // Configurar habilidades de los pilotos
    [piloto1, piloto2, piloto3, piloto4, piloto5, piloto6, piloto7, piloto8, piloto9, piloto10, piloto11, piloto12, piloto13, piloto14, piloto15, piloto16, piloto17, piloto18, piloto19, piloto20].forEach(piloto => {
        piloto.establecerHabilidades({
            velocidad: Math.floor(99),
            consistencia: Math.floor(99),
            agresividad: Math.floor(99)
        });
    });

    /*console.log(piloto1.establecerHabilidades({
            velocidad: Math.floor(99),
            consistencia: Math.floor(99),
            agresividad: Math.floor(99)
        }));
    
    console.log(piloto1.calcularRendimiento({
        clima: "seco",
        temperatura: 20,
        humedad: 40
      }));*/
        
    // Asignar pilotos a autos
    console.log(piloto1.conducirAuto(auto1));
    piloto2.conducirAuto(auto2);
    piloto3.conducirAuto(auto3);
    piloto4.conducirAuto(auto4);
    piloto5.conducirAuto(auto5);
    piloto6.conducirAuto(auto6);
    piloto7.conducirAuto(auto7);
    piloto8.conducirAuto(auto8);
    piloto9.conducirAuto(auto9);
    piloto10.conducirAuto(auto10);
    piloto11.conducirAuto(auto11);
    piloto12.conducirAuto(auto12);
    piloto13.conducirAuto(auto13);
    piloto14.conducirAuto(auto14);
    piloto15.conducirAuto(auto15);
    piloto16.conducirAuto(auto16);
    piloto17.conducirAuto(auto17);
    piloto18.conducirAuto(auto18);
    piloto19.conducirAuto(auto19);
    piloto20.conducirAuto(auto20);

    console.log(piloto1.registrarVictoria());
    console.log(piloto1.registrarPodio());
    console.log(piloto1.registrarVueltaRapida());

    console.log(piloto1.estadisticas);



    console.log(auto1.configurarDesgasteInicial({
        desgasteNeumaticos: 0,
        desgasteMotor: 0,
        combustible: 30
    }));

    console.log();

    console.log(auto1.estaEnCondicionesOptimas());

    console.log();

    console.log(auto1.instalarPiezaNueva({
        tipo: "motor",
        especificacion: "nueva versión"
    }))

    console.log();

    console.log(auto1.calcularDesgaste({
        numero: 15,
        velocidad: 210,
        condiciones: { temperatura: 25, humedad: 40 },
        longitudCircuito: 5.739,
        tipoDeCircuito: "baja_degradación"
    }));

    [auto1, auto2, auto3, auto4].forEach(auto => {
        auto.calcularDesgaste({
        numero: 15,
        velocidad: 210,
        condiciones: { temperatura: 25, humedad: 40 },
        longitudCircuito: 5.739,
        tipoDeCircuito: "baja_degradación"
        });
    });

    console.log();
    
    console.log(auto1.realizarPitStop({tipoNeumaticos: "blandos", combustible: 30}));

    console.log();

    console.log(auto1.obtenerEstadisticasDesgaste());

    console.log(piloto1.registrarVictoria());
    console.log(piloto1.registrarPodio());
    console.log(piloto1.registrarVueltaRapida());

    console.log(piloto1.estadisticas);


    console.log(auto1.configurarDesgasteInicial({
        desgasteNeumaticos: 0,
        desgasteMotor: 0,
        combustible: 30
    }));

    console.log();

    console.log(auto1.estaEnCondicionesOptimas());

    console.log();

    console.log(auto1.instalarPiezaNueva({
        tipo: "motor",
        especificacion: "nueva versión"
    }))

    console.log();

    console.log(auto1.calcularDesgaste({
        numero: 15,
        velocidad: 210,
        condiciones: { temperatura: 25, humedad: 40 },
        longitudCircuito: 5.739,
        tipoDeCircuito: "baja degradación"
    }))

    console.log();
    
    console.log(auto1.realizarPitStop({tipoNeumaticos: "blandos", combustible: 30}));

    console.log();

    console.log(auto1.obtenerEstadisticasDesgaste());

    // Crear estrategias de carrera
    const estrategiaFerrari = new Estrategia(
        2,
        ['blandos', 'medios'],
        [20, 40],
        80
    );

    const estrategiaMercedes = new Estrategia(
        3,
        ['blandos', 'medios', 'duros'],
        [15, 30, 45],
        70
    );

    // Crear carrera
    const carrera = new Carrera('Gran Premio de Italia', circuito, '2024-08-12');

    carrera.autosParticipantes = [auto1, auto2, auto3, auto4, auto5, auto6, auto7, auto8, auto9, auto10, auto11, auto12, auto13, auto14, auto15, auto16, auto17, auto18, auto19, auto20];

    carrera.condicionesClimaticas = { clima: "seco", temperatura: 25, humedad: 40 };

    // Realizar clasificación
    console.log('\nResultados de la Clasificación:');
    carrera.realizarClasificacion();

    // Iniciar carrera
    console.log(carrera.iniciarCarrera());

    // Mostrar resultados finales
    console.log('\nResultados finales de la carrera:');
    console.log(carrera.finalizarCarrera());

    [piloto1, piloto2, piloto3, piloto4, piloto5, piloto6, piloto7, piloto8, piloto9, piloto10, piloto11, piloto12, piloto13, piloto14, piloto15, piloto16, piloto17, piloto18, piloto19, piloto20].forEach(piloto => {
        console.log(piloto.obtenerEstadisticas().rendimiento);
    });

    // Mostrar estadísticas de desgaste final
    console.log('\nEstadísticas de desgaste final:');
    [auto1, auto2, auto3, auto4].forEach(auto => {
        const desgaste = auto.obtenerEstadisticasDesgaste() || {
            neumaticos: 0,
            combustible: 0,
            motor: 0
        };
        console.log(`Auto #${auto.numero}:`);
        console.log(`- Desgaste neumáticos: ${desgaste.neumaticos}%`);
        console.log(`- Combustible restante: ${desgaste.combustible}%`);
        console.log(`- Estado del motor: ${desgaste.motor}%`);
    });

    // Mostrar puntos por escudería
    console.log('\nPuntos por escudería:');
    const stats1 = escuderia1.obtenerEstadisticas() || { puntosCampeonato: 0 };
    const stats2 = escuderia2.obtenerEstadisticas() || { puntosCampeonato: 0 };
    console.log(`${escuderia1.nombre}: ${stats1.puntosCampeonato} puntos`);
    console.log(`${escuderia2.nombre}: ${stats2.puntosCampeonato} puntos`);

    // Mostrar estadísticas de pilotos
    console.log('\nEstadísticas de pilotos:');
    [piloto1, piloto2, piloto3, piloto4].forEach(piloto => {
        const stats = piloto.obtenerEstadisticas() || {
            puntosCampeonato: 0,
            vueltasRapidas: 0,
            podios: 0
        };
        console.log(`${piloto.nombre}:`);
        console.log(`- Puntos en el campeonato: ${stats.puntosCampeonato}`);
        console.log(`- Vueltas rápidas: ${stats.general.vueltasRapidas}`);
        console.log(`- Podios: ${stats.general.podios}`);
    });

} catch (error) {
    console.error('Error durante la ejecución:', error.message);
}
