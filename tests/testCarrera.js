// Pruebas para la clase Carrera, to run: node tests/testCarrera

const Carrera = require('../entities/Carrera');
const Circuito = require('../entities/Circuito');
const Auto = require('../entities/Auto');
const Piloto = require('../entities/Piloto');

console.log("\n=== Pruebas para Carrera ===");

console.log("Prueba 1: esValida");
const circuito1 = new Circuito("Monaco", 3.3, "urbano");
const carrera1 = new Carrera("GP Monaco", circuito1, "2024-05-26");
for (let i = 0; i < 10; i++) {
    carrera1.autosParticipantes.push(new Auto("Auto" + i, new Piloto("Piloto" + i)));
}
carrera1.condicionesClimaticas = { clima: "seco", temperatura: 25, humedad: 40 };
console.assert(carrera1.esValida(), "Error: la carrera debería ser válida con 10 autos y condiciones");
console.log("Prueba 1 completada");

console.log("Prueba 2: calcularNumeroVueltas");
const circuito2 = new Circuito("Interlagos", 4.3, "alta_degradacion");
const carrera2 = new Carrera("GP Brasil", circuito2, "2024-05-26");
for (let i = 0; i < 12; i++) {
    carrera2.autosParticipantes.push(new Auto("Auto" + i, new Piloto("Piloto" + i)));
}
carrera2.condicionesClimaticas = { clima: "seco", temperatura: 28, humedad: 35 };
const vueltas = carrera2.calcularNumeroVueltas();
console.assert(vueltas > 0, "Error: el cálculo de vueltas debería ser mayor que 0");
console.log("Prueba 2 completada");

console.log("Prueba 3: realizarClasificacion");
const circuito3 = new Circuito("Monza", 5.8, "rapido");
const carrera3 = new Carrera("GP Italia", circuito3, "2024-05-26");
for (let i = 0; i < 20; i++) {
    carrera3.autosParticipantes.push(new Auto("Auto" + i, new Piloto("Piloto" + i)));
}
carrera3.condicionesClimaticas = { clima: "seco", temperatura: 30, humedad: 20 };
const clasificacion = carrera3.realizarClasificacion();
console.assert(clasificacion.posiciones.length === 20, "Error: la clasificación debería devolver 20 posiciones");
console.log("Prueba 3 completada");

console.log("Prueba 4: registrarVueltaDeCarrera");
const circuito4 = new Circuito("Silverstone", 5.9, "rapido");
const carrera4 = new Carrera("GP UK", circuito4, "2024-05-26");
const piloto4 = new Piloto("Hamilton");
const auto4 = new Auto("Mercedes", piloto4);
carrera4.autosParticipantes.push(auto4);
carrera4.condicionesClimaticas = { clima: "seco", temperatura: 20, humedad: 50 };
carrera4.numeroVueltas = 5;
carrera4.vueltaActual = 1;
const infoVuelta = carrera4.registrarVueltaDeCarrera(auto4);
console.assert(infoVuelta.piloto === "Hamilton", "Error: el piloto debería ser Hamilton");
console.log("Prueba 4 completada");

console.log("Prueba 5: finalizarCarrera");
const circuito5 = new Circuito("Spa", 7, "mixto");
const carrera5 = new Carrera("GP Belgica", circuito5, "2024-05-26");
for (let i = 0; i < 12; i++) {
    carrera5.autosParticipantes.push(new Auto("Auto" + i, new Piloto("Piloto" + i)));
}
carrera5.condicionesClimaticas = { clima: "seco", temperatura: 22, humedad: 40 };
carrera5.numeroVueltas = 3;
carrera5.vueltaActual = 3;
carrera5.autosParticipantes.forEach(auto => auto.tiempoCarrera = Math.random() * 500);
carrera5.posicionesDeSalida = carrera5.autosParticipantes.map((auto, index) => ({
    piloto: auto.conductor.nombre,
    posicion: index + 1
}));
carrera5.vueltaRapida = { piloto: carrera5.autosParticipantes[0].conductor, tiempo: 85 };
const resultados = carrera5.finalizarCarrera();
console.assert(resultados.podio.length === 3, "Error: el podio debería contener 3 posiciones");
console.log("Prueba 5 completada\n");