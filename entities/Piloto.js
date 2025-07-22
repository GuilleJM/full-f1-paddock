class Piloto {
    constructor(nombre, nacionalidad, puntosCampeonato) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.puntosCampeonato = puntosCampeonato;
        this.estilo = 'agresivo'; // agresivo, conservador, desarrollo
        this.habilidad = 0;
        this.autosConducidos = [];
        this.victorias = 0;
        this.podios = 0;
        this.vueltasRapidas = 0;
        this.adelantamientos = 0;
        this.errores = 0;
        this.auto = null;
        this.habilidades = {
            velocidad: 0,
            consistencia: 0,
            agresividad: 0
        };
        this.estadisticas = {
            victorias: 0,
            podios: 0,
            vueltasRapidas: 0,
            abandonos: 0
        };
    }

    /**
     * Establece las habilidades del piloto
     * @param {Object} habilidades - Objeto con valores de habilidades (0-100)
     * @param {number} habilidades.velocidad - Nivel de velocidad
     * @param {number} habilidades.consistencia - Nivel de consistencia
     * @param {number} habilidades.agresividad - Nivel de agresividad
     * @returns {Object} Habilidades actualizadas
     * @throws {Error} Si algún valor está fuera del rango 0-100
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const habilidades = piloto.establecerHabilidades({
     *   velocidad: 95,
     *   consistencia: 90,
     *   agresividad: 85
     * });
     * // Returns: {
     * //   velocidad: 95,
     * //   consistencia: 90,
     * //   agresividad: 85,
     * //   nivelTotal: 90
     * // }
     */
    establecerHabilidades(habilidades) {
        // Implementar lógica para establecer habilidades

         const valoresDeHabilidades = Object.values(habilidades)

        if (!habilidades) {
            throw new Error('No se proporcionaron habilidades del piloto');
        }


        const valorInvalido = valoresDeHabilidades.some((parametro) => parametro < 0 || parametro > 100)
        
        if(valorInvalido){
            throw new Error("Los parámetros deben encontrarse dentro del rango entre 0 y 100");
        }

        this.velocidad = habilidades.velocidad;
        this.consistencia = habilidades.consistencia;
        this.agresividad = habilidades.agresividad;

        const sumaDeHabilidades = valoresDeHabilidades.reduce((acumulador, parametro) => acumulador + parametro, 0);
        this.habilidad =  (sumaDeHabilidades / valoresDeHabilidades.length).toFixed(0);

        return {
            velocidad: this.velocidad,
            consistencia: this.consistencia,
            agresividad: this.agresividad,
            nivelTotal: this.habilidad
        }      
    }

    /**
     * Valida si el piloto puede conducir un auto específico
     * @param {Object} auto - Auto a validar
     * @returns {boolean} true si:
     * - El piloto tiene las habilidades necesarias
     * - El auto está disponible
     * - La compatibilidad es adecuada
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const puedeConducir = piloto.puedeConducirAuto(auto);
     * // Returns: true si cumple con los requisitos
     */
    puedeConducirAuto(auto) {
        // Implementar lógica para validar si puede conducir el auto PREGUNTAR A EZE CÓMO CALCULAR
    }

    /**
     * Asigna un auto al piloto
     * @param {Object} auto - Auto a asignar
     * @returns {Object} Información de la asignación
     * @throws {Error} Si el auto no está disponible o no es compatible
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const asignacion = piloto.conducirAuto(auto);
     * // Returns: {
     * //   piloto: "Lewis Hamilton",
     * //   auto: "Mercedes W13",
     * //   numero: 44,
     * //   estado: "asignado"
     * // }
     */
    conducirAuto(auto) {
        // Implementar lógica para asignar auto al piloto

        if(auto.conductor != null){
            throw new Error("El auto ya está ocupado");
        }

        /*if(!this.puedeConducirAuto(auto)){
            throw new Error("El auto y el piloto no son compatibles");
        }*/

        this.auto = auto;
        this.autosConducidos.push(auto);
        auto.conductor = this;

        return {
            piloto: this.nombre,
            auto: auto.marca + " " + auto.modelo,
            numero: auto.numero,
            estado: "asignado"
        } 

    }

    /**
     * Calcula el rendimiento del piloto según las condiciones
     * @param {Object} condiciones - Condiciones de la carrera
     * @param {string} condiciones.clima - Clima actual
     * @param {number} condiciones.temperatura - Temperatura en grados
     * @param {number} condiciones.humedad - Humedad relativa
     * @returns {Object} Rendimiento calculado
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const rendimiento = piloto.calcularRendimiento({
     *   clima: "seco",
     *   temperatura: 25,
     *   humedad: 40
     * });
     * // Returns: {
     * //   velocidad: 92,
     * //   consistencia: 88,
     * //   agresividad: 85,
     * //   rendimientoTotal: 88.3
     * // }
     */
    calcularRendimiento(condiciones) {
        // Implementar lógica para calcular rendimiento

        const pesos = [0.4, 0.4, 0.2];

        const parametros = [this.velocidad, this.agresividad, this.consistencia];

        let factorClima = 1.0;
        let factorTemperatura = 1.02;
        let factorHumedad = 1.01;

        if(condiciones.clima.toLowerCase() == "mojado"){
            factorClima = 0.9;
        }else if(condiciones.clima.toLowerCase() == "lluvia"){
            factorClima = 0.8;
        }

        if(condiciones.temperatura < 15){
            factorTemperatura = 0.95;
        }else if(condiciones.temperatura > 35){
            factorTemperatura = 0.97;
        }

        if(condiciones.humedad < 20){
            factorHumedad = 0.98;
        }else if(condiciones.temperatura > 70){
            factorHumedad = 0.96;
        }

        this.agresividad *= factorClima;

        this.consistencia *= factorClima;

        this.velocidad *= factorHumedad * factorTemperatura * factorClima;

        const rendimientoTotal = this.promedioPonderado(parametros, pesos);
    
        return {
            velocidad: (this.velocidad).toFixed(2),
            consistencia: (this.consistencia).toFixed(2),
            agresividad: (this.agresividad).toFixed(2),
            rendimientoTotal: (rendimientoTotal).toFixed(2)
        } 
    }

    /**
     * Adapta el estilo de conducción según las condiciones
     * @param {Object} condiciones - Condiciones actuales
     * @returns {Object} Estilo adaptado
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estilo = piloto.adaptarEstiloConduccion({
     *   clima: "lluvia",
     *   visibilidad: "baja",
     *   estadoPista: "mojada"
     * });
     * // Returns: {
     * //   estiloAnterior: "agresivo",
     * //   estiloNuevo: "conservador",
     * //   ajustes: {
     * //     agresividad: -20,
     * //     consistencia: +15
     * //   }
     * // }
     */
    adaptarEstiloConduccion(condiciones) {
        // Implementar lógica para adaptar estilo de conducción PREGUNTAR A EZE CÓMO CALCULAR
    }

    /**
     * Registra una victoria del piloto
     * @returns {Object} Estadísticas actualizadas
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estadisticas = piloto.registrarVictoria();
     * // Returns: {
     * //   victorias: 1,
     * //   puntosCampeonato: 25,
     * //   estadisticas: {
     * //     victorias: 1,
     * //     podios: 0,
     * //     vueltasRapidas: 0
     * //   }
     * // }
     */
    registrarVictoria() {
        // Implementar lógica para registrar victoria

        this.victorias++;
        this.puntosCampeonato += 25;
        this.estadisticas.victorias++;

        return {
            victorias: this.victorias,
            puntosCampeonato: this.puntosCampeonato,
            estadisticas: this.estadisticas
        } 

    }

    /**
     * Registra un podio del piloto
     * @param {number} posicion - Posición en el podio (1-3)
     * @returns {Object} Estadísticas actualizadas
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estadisticas = piloto.registrarPodio(2);
     * // Returns: {
     * //   podios: 1,
     * //   puntosCampeonato: 18,
     * //   estadisticas: {
     * //     victorias: 0,
     * //     podios: 1,
     * //     vueltasRapidas: 0
     * //   }
     * // }
     */
    registrarPodio(posicion) {
        // Implementar lógica para registrar podio

        this.podios++;
        this.puntosCampeonato += 18;
        this.estadisticas.podios++;

        return {
            podios: this.podios,
            puntosCampeonato: this.puntosCampeonato,
            estadisticas: this.estadisticas
        }
    }

    /**
     * Registra una vuelta rápida del piloto
     * @returns {Object} Estadísticas actualizadas
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estadisticas = piloto.registrarVueltaRapida();
     * // Returns: {
     * //   vueltasRapidas: 1,
     * //   puntosCampeonato: 1,
     * //   estadisticas: {
     * //     victorias: 0,
     * //     podios: 0,
     * //     vueltasRapidas: 1
     * //   }
     * // }
     */
    registrarVueltaRapida() {
        // Implementar lógica para registrar vuelta rápida

        this.vueltasRapidas++;
        this.puntosCampeonato++;
        this.estadisticas.vueltasRapidas++;

        return {
            vueltasRapidas: this.vueltasRapidas,
            puntosCampeonato: this.puntosCampeonato,
            estadisticas: this.estadisticas
        }
    }

    /**
     * Obtiene todas las estadísticas del piloto
     * @returns {Object} Estadísticas completas
     * 
     * @example
     * const piloto = new Piloto("Lewis Hamilton", "Británico", 0);
     * const estadisticas = piloto.obtenerEstadisticas();
     * // Returns: {
     * //   general: {
     * //     victorias: 5,
     * //     podios: 12,
     * //     vueltasRapidas: 3,
     * //     puntosCampeonato: 150
     * //   },
     * //   habilidades: {
     * //     velocidad: 95,
     * //     consistencia: 90,
     * //     agresividad: 85
     * //   },
     * //   rendimiento: {
     * //     adelantamientos: 15,
     * //     errores: 2,
     * //     vueltasCompletadas: 450
     * //   }
     * // }
     */
    obtenerEstadisticas() {
        // Implementar lógica para obtener estadísticas

        const habilidades = {
            velocidad: this.velocidad,
            consistencia: this.consistencia,
            agresividad: this.agresividad
        };

        const rendimiento = {
            adelantamientos: this.adelantamientos,
            errores: this.errores,
            vueltasCompletadas: this.vueltasCompletadas
        }


        return {
            general: this.estadisticas,
            habilidades: habilidades,
            rendimiento: rendimiento
        }

    }


    promedioPonderado(valores, pesos) {
    if (valores.length !== pesos.length || valores.length === 0) {
        throw new Error("Las listas deben tener el mismo tamaño y no estar vacías.");
    }

    let sumaPonderada = 0;
    let sumaPesos = 0;

    for (let i = 0; i < valores.length; i++) {
        sumaPonderada += valores[i] * pesos[i];
        sumaPesos += pesos[i];
    }

    return sumaPonderada / sumaPesos;
    }
}

module.exports = Piloto; 
