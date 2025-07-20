class Auto {
    constructor(numero, marca, modelo, neumaticos, velocidadMaxima, combustible) {
        this.numero = numero;
        this.marca = marca;
        this.modelo = modelo;
        this.neumaticos = neumaticos;
        this.velocidadMaxima = velocidadMaxima;
        this.combustible = combustible;
        this.estado = 'en_carrera'; // en_carrera, en_boxes, reserva, desarrollo
        this.conductor = null;
        this.tiempoVuelta = 0;
        this.desgasteNeumaticos = 0;
        this.desgasteMotor = 0;
        this.kmRecorridos = 0;
        this.piezasNuevas = [];
        this.tiempoReparacion = 0;
    }

    esConducidoPor(piloto) {
        this.conductor = piloto;
    }

    /**
     * Configura los niveles iniciales de desgaste del auto
     * @param {Object} configuracion - Objeto con niveles iniciales de desgaste
     * @param {number} configuracion.desgasteNeumaticos - Desgaste inicial de neumáticos (0-100)
     * @param {number} configuracion.desgasteMotor - Desgaste inicial del motor (0-100)
     * @param {number} configuracion.combustible - Nivel inicial de combustible (0-100)
     * @returns {void}
     * @throws {Error} Si algún valor está fuera del rango 0-100
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * auto.configurarDesgasteInicial({
     *   desgasteNeumaticos: 0,
     *   desgasteMotor: 0,
     *   combustible: 100
     * });
     */
    configurarDesgasteInicial(configuracion) {
        
        if (!configuracion) {
            throw new Error('No se proporcionó configuración de desgaste inicial');
        }


        const valorInvalido = Object.values(configuracion).some((parametro) => parametro < 0 || parametro > 100)
        
        if(valorInvalido){
            throw new Error("Los parámetros deben encontrarse dentro del rango entre 0 y 100");
        }

        this.desgasteNeumaticos = configuracion.desgasteNeumaticos;
        this.desgasteMotor = configuracion.desgasteMotor;
        this.combustible = configuracion.combustible;

        console.log(this.desgasteNeumaticos, this.desgasteMotor, this.combustible);
    }

    /**
     * Verifica si el auto está en condiciones óptimas para competir
     * @returns {boolean} true si:
     * - Desgaste de neumáticos < 30%
     * - Nivel de combustible > 20%
     * - Desgaste del motor < 40%
     * - Si está en carrera, debe tener conductor asignado
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * auto.conductor = "Lewis Hamilton";
     * const estaOptimo = auto.estaEnCondicionesOptimas();
     * // Returns: true si cumple todas las condiciones
     */
    estaEnCondicionesOptimas() {
        let tienePilotoEnCarrera = true;
        if(this.estado == 'en_carrera' && (this.conductor == undefined || this.conductor == null)){
            tienePilotoEnCarrera = false;
        }
        return (
            this.desgasteNeumaticos < 30 &&
            this.combustible > 20 &&
            this.desgasteMotor < 40 &&
            tienePilotoEnCarrera
        );
    }

    /**
     * Cambia los neumáticos del auto
     * @param {string} tipoNeumaticos - Tipo de neumáticos a instalar (blandos, medios, duros)
     * @returns {Object} Información sobre el cambio de neumáticos
     * @throws {Error} Si el tipo de neumáticos no es válido
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const resultado = auto.cambiarNeumaticos("duros");
     * // Returns: { tipoAnterior: "blandos", tipoNuevo: "duros", desgasteReseteado: true }
     */
    cambiarNeumaticos(tipoNeumaticos) {
        const tiposValidos = ['blandos', 'medios', 'duros'];
        if (!tiposValidos.includes(tipoNeumaticos)) {
            throw new Error('El tipo de neumáticos no es válido');
        }

        const tipoAnterior = this.neumaticos;
        this.neumaticos = tipoNeumaticos;
        this.desgasteNeumaticos = 0;

        return {
            tipoAnterior: tipoAnterior,
            tipoNuevo: this.neumaticos,
            desgasteReseteado: true,
        };
    }

    /**
     * Reposta combustible en el auto
     * @param {number} cantidad - Cantidad de combustible a repostar (0-100)
     * @returns {Object} Información sobre el repostaje
     * @throws {Error} Si la cantidad supera el 100% del tanque
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 50);
     * const resultado = auto.repostarCombustible(30);
     * // Returns: { combustibleAnterior: 50, combustibleNuevo: 80 }
     */
    repostarCombustible(cantidad) {
        if (cantidad < 0 || cantidad > 100) {
            throw new Error('La cantidad a repostar debe ser un valor entre 0 y 100');
        }

        if (this.combustible + cantidad > 100) {
            throw new Error('La cantidad a repostar supera el 100% del tanque');
        }

        const combustibleAnterior = this.combustible;
        this.combustible += cantidad;

        return {
            combustibleAnterior: combustibleAnterior,
            combustibleNuevo: this.combustible
        };
    }

    /**
     * Instala una nueva pieza en el auto
     * @param {Object} pieza - Información de la pieza a instalar
     * @param {string} pieza.tipo - Tipo de pieza (motor, aerodinámica, neumáticos, suspensión)
     * @param {string} pieza.especificacion - Especificación técnica de la pieza
     * @returns {Object} Información sobre la instalación
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const resultado = auto.instalarPiezaNueva({
     *   tipo: "motor",
     *   especificacion: "nueva versión"
     * });
     * // Returns: { piezaInstalada: true, estadoActualizado: "desarrollo" }
     */
    instalarPiezaNueva(pieza) {
        // Verificar tipo de pieza
        if (!['motor', 'aerodinámica', 'neumáticos', 'suspensión'].includes(pieza.tipo)) {
            throw new Error(`El tipo de pieza debe ser uno de los siguientes: motor, aerodinámica, neumáticos, suspensión`);
        }

        // Actualizar estado del auto
        this.estado = 'desarrollo';

        // Registra la pieza en el historial
        this.piezasNuevas.push({
            tipo: pieza.tipo,
            especificacion: pieza.especificacion
        });

        return {
            piezaInstalada: true,
            estadoActualizado: this.estado,
            pieza : this.piezasNuevas
        };
    }

    /**
     * Calcula el desgaste del auto después de una vuelta
     * @param {Object} vuelta - Información de la vuelta
     * @param {number} vuelta.numero - Número de vuelta
     * @param {number} vuelta.velocidad - Velocidad promedio en km/h
     * @param {Object} vuelta.condiciones - Condiciones de la pista
     * @returns {Object} Información sobre el desgaste
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const desgaste = auto.calcularDesgaste({
     *   numero: 15,
     *   velocidad: 210,
     *   condiciones: { temperatura: 25, humedad: 40 },
     *   longitudCircuito: 5.739,
     *   tipoDeCircuito: "Alta degradacion"
     * });
     * // Returns: { desgasteNeumaticos: 2.5, desgasteMotor: 1.2, combustibleConsumido: 1.8 }
     */
    calcularDesgaste(vuelta) {

        let vueltasMaximasNeumaticos = 40;

        if(vuelta.tipoDeCircuito == "baja degradación"){
            vueltasMaximasNeumaticos *= 1.2;
        }else{
            vueltasMaximasNeumaticos *= 0.8;
        }

        let desgasteNeumaticos = (vuelta.numero/vueltasMaximasNeumaticos) * 100;
        let desgasteMotor = (vuelta.velocidad / this.velocidadMaxima);
        const combustibleConsumido = 2.5 * (vuelta.longitudCircuito/5);

        if(vuelta.condiciones.temperatura > 35){
            desgasteNeumaticos *= 1.03;
        }else if(vuelta.condiciones.temperatura < 15){
            desgasteNeumaticos *= 1.05;
        }else{
            desgasteNeumaticos *= 0.98;
        }

        if(vuelta.condiciones.humedad >= 60){
            desgasteMotor *= 1.1;
        }

        this.desgasteNeumaticos += desgasteNeumaticos;
        this.desgasteMotor += desgasteMotor;
        this.combustible -= combustibleConsumido;

        return {
            desgasteNeumaticos: this.desgasteNeumaticos,
            desgasteMotor: this.desgasteMotor,
            combustibleConsumido: combustibleConsumido,
            combustibleRestante: this.combustible
        };
    }

    /**
     * Realiza un pit stop completo
     * @param {string} tipoNeumaticos - Tipo de neumáticos a instalar
     * @param {number} combustible - Cantidad de combustible a repostar
     * @returns {Object} Información sobre el pit stop
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 50);
     * const pitStop = auto.realizarPitStop("duros", 30);
     * // Returns: { 
     * //   estado: "en_boxes",
     * //   operaciones: ["cambio_neumaticos", "repostaje"],
     * //   tiempoTotal: 4.2
     * // }
     */
    realizarPitStop({tipoNeumaticos, combustible}) {
        const operaciones = [];
        let tiempoTotal = 1.0

        if (tipoNeumaticos !== null && tipoNeumaticos !== undefined) {
            this.cambiarNeumaticos(tipoNeumaticos);
            operaciones.push("cambio_neumaticos");
            tiempoTotal += 2.5;
        }

        if (combustible !== null && combustible !== undefined) {
            this.repostarCombustible(combustible);
            operaciones.push("repostaje");
            tiempoTotal += 1.8;
        }

        this.estado = "en_boxes";


        return {
            estado: this.estado,
            operaciones: operaciones,
            tiempoTotal: tiempoTotal
        };
    }

    /**
     * Obtiene estadísticas detalladas del desgaste del auto
     * @returns {Object} Estadísticas de desgaste
     * 
     * @example
     * const auto = new Auto(44, "Mercedes", "W13", "blandos", 340, 100);
     * const estadisticas = auto.obtenerEstadisticasDesgaste();
     * // Returns: {
     * //   desgasteNeumaticos: 45,
     * //   nivelCombustible: 60,
     * //   estadoMotor: 30,
     * //   estado: "en_carrera"
     * // }
     */
    obtenerEstadisticasDesgaste() {
        return {
            desgasteNeumaticos: this.desgasteNeumaticos,
            nivelCombustible: this.combustible,
            estadoMotor: this.desgasteMotor,
            estado: this.estado
        };
    }
}

module.exports = Auto;
