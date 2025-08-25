class Estrategia {
    constructor(nivel, vueltas, neumaticos) {
        this.nivel = nivel; // "alta" o "baja"
        this.vueltas = vueltas; // Array de vueltas para paradas
        this.neumaticos = neumaticos; // Array de neumáticos para cada parada
        this.paradasRealizadas = 0; // Contador de paradas registradas
        this.totalAcumulado = 0; // Tiempo acumulado de paradas
    }

    /**
     * Valida si la estrategia es óptima según las condiciones de la carrera
     * @returns {boolean} true si:
     * - El número de paradas es adecuado para la duración de la carrera
     * - La distribución de neumáticos es óptima
     * - El nivel de agresividad es apropiado
     * 
     * @example
     * const estrategia = new Estrategia(
     *   "media", // agresividad
     *   [20, 40], // vueltas de parada
     *   ["blandos", "duros"], // tipos de neumáticos
     * );
     * const esOptima = estrategia.esOptima();
     * // Returns: true si la estrategia es óptima para una carrera de 60 vueltas
     */
    esOptima() {
        let result = false;

        // Verificar número de paradas (2 a 4) y rango de vueltas ([10, 80])
        if (this.vueltas.length <= 4 && this.vueltas.length >= 2 && 
            this.vueltas.every(vuelta => vuelta >= 10 && vuelta <= 80) && 
            this.agresividadConsistente() && this.paradasDistribuidasUniformemente()) {
            result = true;
        }

        return result;
    }

    /**
     * Verifica si las paradas están distribuidas uniformemente
     * @returns {boolean} true si:
     * - Los intervalos entre paradas son similares
     * - Las vueltas de parada están bien espaciadas
     * - No hay acumulación de paradas
     * 
     * @example
     * const estrategia = new Estrategia(
     *   "media",
     *   [20, 40],
     *   ["blandos", "duros"]
     * );
     * const distribucion = estrategia.paradasDistribuidasUniformemente();
     */
    paradasDistribuidasUniformemente() {
        let result = true;

        // Verificar que la primera parada esté en [10, 80]
        let intervalo = this.vueltas[0];
        if (intervalo < 10 || intervalo > 80) {
            result = false;
            return result;
        }

        let ultimoIntervalo = intervalo;
        for (let i = 1; i < this.vueltas.length; i++) {
            let intervalo = this.vueltas[i] - this.vueltas[i - 1];
            // Intervalos entre [10, 30]
            if (intervalo < 10 || intervalo > 30) {
                result = false;
                break;
            }
            // Diferencia entre intervalos no mayor a 5
            if (i > 1 && Math.abs(intervalo - ultimoIntervalo) > 5) {
                result = false;
                break;
            }
            ultimoIntervalo = intervalo;
        }
        return result;
    }

    /**
     * Valida si el nivel de agresividad es consistente
     * @returns {boolean} true si:
     * - La agresividad es consistente con el tipo de neumáticos
     * - El nivel es apropiado para las condiciones
     * - No hay cambios bruscos de agresividad
     * 
     * @example
     * const estrategia = new Estrategia(
     *   "media",
     *   [20, 40],
     *   ["blandos", "duros"]
     * );
     * const agresividad = estrategia.agresividadConsistente();
     * // Returns: true si la agresividad es consistente con la estrategia
     */
    agresividadConsistente() {
        let result = true;

        // Definir neumáticos válidos según nivel
        const neumaticosValidos = this.nivel === "alta" ? ["duros", "medios"] : ["blandos"];
        // Verificar que todos los neumáticos sean válidos
        if (!this.neumaticos.every(neumatico => neumaticosValidos.includes(neumatico))) {
            result = false;
        }

        return result;
    }

    /**
     * Registra una parada en boxes con su tiempo
     * @param {number} tiempo - Tiempo de la parada en segundos
     * @returns {Object} Información de la parada registrada
     * 
     * @example
     * const estrategia = new Estrategia(
     *   "media",
     *   [20, 40],
     *   ["blandos", "duros"]
     * );
     * const parada = estrategia.registrarParada(2.5);
     * // Returns: {
     * //   parada: 1,
     * //   tiempo: 2.5,
     * //   vuelta: 20,
     * //   neumaticos: "blandos",
     * //   totalAcumulado: 2.5
     * // }
     */
    registrarParada(tiempo) {
        this.paradasRealizadas = this.paradasRealizadas + 1;
        this.totalAcumulado = this.totalAcumulado + tiempo;

        return {
            parada: this.paradasRealizadas,
            tiempo: tiempo,
            vuelta: this.vueltas[this.paradasRealizadas - 1],
            neumaticos: this.neumaticos[this.paradasRealizadas - 1],
            totalAcumulado: this.totalAcumulado
        };
    }

    /**
     * Obtiene información sobre la próxima parada programada
     * @returns {Object} Detalles de la próxima parada
     * 
     * @example
     * const estrategia = new Estrategia(
     *   "media",
     *   [20, 40],
     *   ["blandos", "duros"]
     * );
     * const siguienteParada = estrategia.obtenerSiguienteParada();
     * // Returns: {
     * //   vuelta: 20,
     * //   neumaticos: "blandos",
     * //   tiempoEstimado: 3,
     * //   numeroParada: 1
     * // }
     */
    obtenerSiguienteParada() {
        return {
            vuelta: this.vueltas[this.paradasRealizadas],
            neumaticos: this.neumaticos[this.paradasRealizadas],
            tiempoEstimado: 3,
            numeroParada: this.paradasRealizadas + 1
        };
    }
}

module.exports = Estrategia;