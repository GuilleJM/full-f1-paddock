class Circuito {
    constructor(nombre, ubicacion, longitudKm, tipo) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.longitudKm = longitudKm;
        this.curvas = [];
        this.recordVuelta = null;
        this.zonasDRS = [];
        this.condicionesClimaticas = {
            clima: 'seco',
            temperatura: 25,
            humedad: 50,
            visibilidad: 'alta'
        };
        this.tipo = tipo; /*Añadido para facilitar cálculos*/
    }

    /**
     * Determina si el circuito es desafiante según sus características
     * @returns {boolean} true si:
     * - Tiene más de 10 curvas
     * - Al menos 2 zonas DRS
     * - Longitud > 5km
     * - Dificultad promedio alta
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * circuito.curvas = [/* 12 curvas *\/];
     * circuito.zonasDRS = [
     *   { nombre: "Túnel", longitud: 0.5 },
     *   { nombre: "Nouvelle Chicane", longitud: 0.3 }
     * ];
     * const esDesafiante = circuito.esDesafiante();
     * // Returns: true
     */
    esDesafiante() {
        const numCurvas = this.curvas.length;
        const numZonasDRS = this.zonasDRS.length;
        const dificultadPromedio = this.curvas.reduce((acc, curva) => {
            if (curva.dificultad === 'alta') return acc + 3;
            if (curva.dificultad === 'media') return acc + 2;
            return acc + 1;
        }, 0) / numCurvas;

        return (
            numCurvas > 2 &&
            numZonasDRS >= 2 &&
            this.longitudKm > 5 &&
            dificultadPromedio > 2
        );
    }

    /**
     * Agrega una nueva curva al circuito
     * @param {string} nombre - Nombre de la curva
     * @param {number} velocidadMaxima - Velocidad máxima permitida en km/h
     * @param {string} dificultad - Nivel de dificultad (baja, media, alta)
     * @returns {Object} Información de la curva agregada
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const curva = circuito.agregarCurva("Loews Hairpin", 50, "alta");
     * // Returns: {
     * //   nombre: "Loews Hairpin",
     * //   velocidadMaxima: 50,
     * //   dificultad: "alta",
     * //   numeroCurva: 6
     * // }
     */
    agregarCurva(nombre, velocidadMaxima, dificultad) {

        if(nombre == null || velocidadMaxima == null || dificultad == null){
            throw new Error("No se aportaron las características necesarias");
        }

        const curva = {
            nombre,
            velocidadMaxima,
            dificultad,
            numeroCurva: this.curvas.length + 1
        };

        this.curvas.push(curva);
        return curva;
    }

    /**
     * Agrega una nueva zona DRS al circuito
     * @param {string} nombre - Nombre de la zona DRS
     * @param {number} longitud - Longitud de la zona en kilómetros
     * @returns {Object} Información de la zona DRS agregada
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const zonaDRS = circuito.agregarZonaDRS("Túnel", 0.5);
     * // Returns: {
     * //   nombre: "Túnel",
     * //   longitud: 0.5,
     * //   numeroZona: 1
     * // }
     */
    agregarZonaDRS(nombre, longitud) {

        if(nombre == null || longitud == null){
            throw new Error("No se aportaron las características necesarias");
        }

        const zonaDRS = {
            nombre,
            longitud,
            numeroZona: this.zonasDRS.length + 1
        };

        this.zonasDRS.push(zonaDRS);
        return zonaDRS;
    }

    /**
     * Establece las condiciones climáticas actuales del circuito
     * @param {string} clima - Tipo de clima (seco, lluvia, mixto)
     * @param {number} temperatura - Temperatura en grados Celsius
     * @param {number} humedad - Humedad relativa en porcentaje
     * @returns {Object} Condiciones climáticas actualizadas
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const condiciones = circuito.establecerCondicionesClimaticas("lluvia", 18, 85);
     * // Returns: {
     * //   clima: "lluvia",
     * //   temperatura: 18,
     * //   humedad: 85,
     * //   visibilidad: "baja"
     * // }
     */
    establecerCondicionesClimaticas(clima, temperatura, humedad) {

        if(clima == null || temperatura == null || humedad == null){
            throw new Error("No se aportaron las características necesarias");
        }

        var visibilidad = "alta";

        if((clima).toLowerCase() == "humedo" && humedad >= 50){
            visibilidad = "media";
        }

        if((clima).toLowerCase() == "lluvia" && humedad >= 80){
            visibilidad = "baja";
        }

        this.condicionesClimaticas = { clima, temperatura, humedad, visibilidad };

        return this.condicionesClimaticas;
    }

    /**
     * Actualiza el récord de vuelta del circuito si el nuevo tiempo es mejor
     * @param {number} tiempo - Tiempo de vuelta en segundos
     * @param {string} piloto - Nombre del piloto
     * @returns {Object} Información del récord actualizado
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const record = circuito.actualizarRecordVuelta(71.553, "Max Verstappen");
     * // Returns: {
     * //   tiempo: 71.553,
     * //   piloto: "Max Verstappen",
     * //   fecha: "2024-05-26",
     * //   esNuevoRecord: true
     * // }
     */
    actualizarRecordVuelta(tiempo, piloto) {
        const esNuevoRecord = !this.recordVuelta || tiempo < this.recordVuelta.tiempo;
        if (esNuevoRecord) {
            this.recordVuelta = { tiempo, piloto, fecha: new Date().toISOString().split('T')[0] };
        }
        return {
            ...this.recordVuelta,
            esNuevoRecord
        };
    }

    /**
     * Obtiene estadísticas detalladas del circuito
     * @returns {Object} Estadísticas del circuito
     * 
     * @example
     * const circuito = new Circuito("Monaco", "Monte Carlo", 3.337);
     * const estadisticas = circuito.obtenerEstadisticasCircuito();
     * // Returns: {
     * //   numeroCurvas: 12,
     * //   zonasDRS: 2,
     * //   recordVuelta: {
     * //     tiempo: 71.553,
     * //     piloto: "Max Verstappen",
     * //     fecha: "2024-05-26"
     * //   },
     * //   condicionesActuales: {
     * //     clima: "seco",
     * //     temperatura: 25,
     * //     humedad: 50
     * //   },
     * //   dificultadPromedio: "alta"
     * // }
     */
    obtenerEstadisticasCircuito() {
        const dificultadPromedio = this.curvas.length > 0
            ? this.curvas.reduce((acc, curva) => {
                if (curva.dificultad === 'alta') return acc + 3;
                if (curva.dificultad === 'media') return acc + 2;
                return acc + 1;
              }, 0) / this.curvas.length
            : 0;
        return {
            numeroCurvas: this.curvas.length,
            zonasDRS: this.zonasDRS.length,
            recordVuelta: this.recordVuelta,
            condicionesActuales: this.condicionesClimaticas,
            dificultadPromedio: dificultadPromedio > 2 ? 'alta' : 'media'
        };
    }
}

module.exports = Circuito;
