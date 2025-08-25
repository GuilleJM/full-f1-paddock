class Carrera {
    constructor(nombre, circuito, fecha) {
        this.nombre = nombre;
        this.circuito = circuito;
        this.fecha = new Date(fecha);
        this.autosParticipantes = [];
        this.condicionesClimaticas = null;
        this.numeroVueltas = 0;
        this.vueltaActual = 0;
        this.resultados = [];
        this.clasificacion = {
            q1: [],
            q2: [],
            q3: []
        };
        this.vueltaRapida = null;
        this.estado = "en_espera";
        this.posicionesDeSalida = [];
    }

    /**
     * Inicia la carrera validando requisitos mínimos y estableciendo condiciones iniciales
     * @returns {Object} Información sobre el inicio de la carrera
     * @throws {Error} Si no se cumplen los requisitos mínimos
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const inicio = carrera.iniciarCarrera();
     * // Returns: {
     * //   estado: "iniciada",
     * //   numeroVueltas: 78,
     * //   autosParticipantes: 20,
     * //   condicionesClimaticas: { clima: "seco", temperatura: 25, humedad: 40 }
     * // }
     */
    iniciarCarrera() {

        if(!this.esValida()){
            throw new Error('No están dadas las condiciones mínimas para iniciar la carrera');
        }

        this.estado = "iniciada";

        this.calcularNumeroVueltas();

        this.autosParticipantes.forEach((auto) => auto.estado = "en_carrera");

        for(let i = 1; i <= this.numeroVueltas; i++){
            this.vueltaActual++;
            this.autosParticipantes.forEach((auto) => this.registrarVueltaDeCarrera(auto));
            console.log("Resultados parciales en la vuelta " , i +": " , this.obtenerResultados());
        }

        return{
            estado: this.estado,
            numeroVueltas: this.numeroVueltas,
            autosParticipantes: this.autosParticipantes.length,
            condicionesClimaticas: this.condicionesClimaticas
        }

    }

    /**
     * Verifica si la carrera cumple con los requisitos mínimos
     * @returns {boolean} true si:
     * - Hay al menos 10 autos
     * - El circuito es válido
     * - Las condiciones climáticas están establecidas
     * - La fecha es válida
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * carrera.autosParticipantes = [/* 15 autos *\/];
     * carrera.condicionesClimaticas = { clima: "seco", temperatura: 25, humedad: 40 };
     * const esValida = carrera.esValida();
     * // Returns: true
     */
    esValida() {

        const autosSuficientes = (this.autosParticipantes.length >= 10);
        const circuitoValido = this.circuito.nombre != null;  //No hay método circuitoValido
        const condicionesEstablecidas = this.condicionesClimaticas != null;
        const fechaValida = !isNaN(this.fecha);

        return autosSuficientes && circuitoValido && condicionesEstablecidas && fechaValida
    }

    /**
     * Calcula el número de vueltas según la longitud del circuito y duración objetivo
     * @returns {number} Número de vueltas calculado
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const vueltas = carrera.calcularNumeroVueltas();
     * // Returns: 78 (para Mónaco)
     */
    calcularNumeroVueltas() {

        let velocidadesPromedio = [];
        velocidadesPromedio = this.autosParticipantes.map((auto) => auto.velocidadMaxima * 0.8);
        const minimaVelocidadPromedio = Math.min(...velocidadesPromedio);

        const vueltasPorTiempo = (90*60)/((this.circuito.longitudKm/minimaVelocidadPromedio) * 3600);

        const vueltasPorCombustible = 110/(2.5 * (this.circuito.longitudKm/5));

        let factorCircuito = 1.2;

        if(this.circuito.tipo == "alta_degradacion"){
            factorCircuito = 0.8;
        }

        const vueltasPorNeumaticos = 40 * factorCircuito

        this.numeroVueltas = (Math.min(vueltasPorTiempo, vueltasPorCombustible, vueltasPorNeumaticos)).toFixed(0);

        return this.numeroVueltas

    }

    /**
     * Realiza la clasificación (Q1, Q2, Q3) y asigna posiciones de salida
     * @returns {Object} Resultados de la clasificación
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const clasificacion = carrera.realizarClasificacion();
     * // Returns: {
     * //   q1: [{ piloto: "Hamilton", tiempo: "1:12.345" }, ...],
     * //   q2: [{ piloto: "Verstappen", tiempo: "1:11.234" }, ...],
     * //   q3: [{ piloto: "Leclerc", tiempo: "1:10.123" }, ...],
     * //   posicionesSalida: [{ piloto: "Leclerc", posicion: 1 }, ...]
     * // }
     */
    realizarClasificacion() {

        this.autosParticipantes.forEach((auto) => this.registrarVuelta(auto));
        const grillaOrdenadaq1 = this.autosParticipantes.sort((a,b) => a.tiempoVuelta - b.tiempoVuelta);
        this.q1 = grillaOrdenadaq1.map((auto) => {return {piloto: auto.conductor.nombre, tiempo: auto.tiempoVuelta};});

        const autosEliminadosEnq1 = this.q1.slice(-5);
        const autosEnq2 = this.autosParticipantes.slice(0, -5);

        autosEnq2.forEach((auto) => this.registrarVuelta(auto));
        const grillaOrdenadaq2 = autosEnq2.sort((a,b) => a.tiempoVuelta - b.tiempoVuelta);
        this.q2 = grillaOrdenadaq2.map((auto) => {return {piloto: auto.conductor.nombre, tiempo: auto.tiempoVuelta};});

        const autosEliminadosEnq2 = this.q2.slice(-5);
        const autosEnq3 = autosEnq2.slice(0, -5);

        autosEnq3.forEach((auto) => this.registrarVuelta(auto));
        const grillaOrdenadaq3 = autosEnq3.sort((a,b) => a.tiempoVuelta - b.tiempoVuelta);
        this.q3 = grillaOrdenadaq3.map((auto) => {return {piloto: auto.conductor.nombre, tiempo: auto.tiempoVuelta};});

        this.posicionesDeSalida = [...this.q3, ...autosEliminadosEnq2, ...autosEliminadosEnq1].map((piloto, index) => {
            const {tiempo, ...resto} = piloto;
            return {...resto, posicion: index + 1};
        });

        for(let i = 0; i < 20; i++){
            console.dir(this.posicionesDeSalida[i]);
        }

        const posicionPorPiloto = new Map(this.posicionesDeSalida.map(pos => [pos.piloto, pos.posicion]));  //Magia de grok
        this.autosParticipantes.sort((a, b) => {
            const posicionA = posicionPorPiloto.get(a.conductor.nombre) || Infinity;
            const posicionB = posicionPorPiloto.get(b.conductor.nombre) || Infinity;
            return posicionA - posicionB;
        });

        return{
            q1: this.clasificacion.q1,
            q2: this.clasificacion.q2,
            q3: this.clasificacion.q3,
            posiciones: this.posicionesDeSalida
        }
    }

    /**
     * Registra el tiempo de una vuelta para un auto específico
     * @param {Object} auto - Auto que completó la vuelta
     * @param {number} tiempo - Tiempo de la vuelta en segundos
     * @returns {Object} Información de la vuelta registrada
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const vuelta = carrera.registrarVuelta(autoHamilton, 85.432);
     * // Returns: {
     * //   numeroVuelta: 15,
     * //   piloto: "Hamilton",
     * //   tiempo: 85.432,
     * //   esVueltaRapida: false
     * // }
     */
    registrarVuelta(auto) {

        const tiempoBase = (this.circuito.longitudKm/auto.velocidadMaxima) * 3600;
        this.circuito.actualizarRecordVuelta(auto.tiempoVuelta, auto.conductor);

        //No anda el factor piloto porque probablemente no accede a los objetos: a revisar
        const factorPiloto = 1 - ((auto.conductor.habilidades.velocidad + auto.conductor.habilidades.consistencia)/200) * 0.1;

        let factorNeumaticos = 1.00;

        if((auto.neumaticos).toLowerCase() == "blandos"){
            factorNeumaticos = 0.95;
        }else if((auto.neumaticos).toLowerCase() == "duros"){
            factorNeumaticos = 1.05;
        }

        let factorClima = 1.00;

        if((this.condicionesClimaticas.clima).toLowerCase() == "mojado"){
            factorClima = 1.10;
        }else if((this.condicionesClimaticas.clima).toLowerCase() == "lluvia"){
            factorClima = 1.15;
        }

        const factorDesgaste = 1 + (auto.desgasteNeumaticos * 0.001);

        let posibleError = 0;

        if(Math.random() >= 0.7){
            posibleError = 0.7;
            auto.conductor.errores++;
        }

        const factorAleatorio = 1 + posibleError;

        auto.tiempoVuelta = tiempoBase * factorClima * factorAleatorio * factorDesgaste * factorNeumaticos * factorPiloto;


        this.circuito.actualizarRecordVuelta(auto.tiempoVuelta, auto.conductor);

        return auto.tiempoVuelta
    }

    registrarVueltaDeCarrera(auto) {

        const tiempoVuelta = this.registrarVuelta(auto);
        let esVueltaRapida = false;

        auto.kmRecorridos += this.circuito.longitudKm;
        auto.tiempoCarrera += tiempoVuelta;

        if(this.vueltaRapida == null || tiempoVuelta < this.vueltaRapida){
            this.vueltaRapida = {piloto: auto.conductor, tiempo: tiempoVuelta};
            esVueltaRapida = true;
        }
        auto.conductor.vueltasCompletadas++;

        return{
            numeroVuelta: this.vueltaActual,
            piloto: auto.conductor.nombre,
            tiempo: auto.tiempoVuelta,
            esVueltaRapida: esVueltaRapida
            }
    }

    /**
     * Finaliza la carrera y calcula los resultados finales
     * @returns {Object} Resultados finales de la carrera
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const resultados = carrera.finalizarCarrera();
     * // Returns: {
     * //   podio: [
     * //     { posicion: 1, piloto: "Leclerc", tiempo: "1:45:23.456" },
     * //     { posicion: 2, piloto: "Verstappen", tiempo: "+2.345" },
     * //     { posicion: 3, piloto: "Hamilton", tiempo: "+5.678" }
     * //   ],
     * //   vueltaRapida: { piloto: "Verstappen", tiempo: "1:10.123" },
     * //   puntos: [
     * //     { piloto: "Leclerc", puntos: 25 },
     * //     { piloto: "Verstappen", puntos: 18 },
     * //     { piloto: "Hamilton", puntos: 15 }
     * //   ]
     * // }
     */
    finalizarCarrera() {

        const posicionesFinales= this.autosParticipantes.sort((a,b) => a.tiempoCarrera - b.tiempoCarrera);

        const ganador = {piloto: posicionesFinales[0].conductor.nombre, tiempo: posicionesFinales[0].formatoTiempo(posicionesFinales[0].tiempoCarrera)};
        posicionesFinales[0].conductor.registrarVictoria();

        console.log(ganador);

        const podio = [{piloto: posicionesFinales[1].conductor.nombre, tiempo: "+" + posicionesFinales[1].formatoTiempo(posicionesFinales[1].tiempoCarrera - posicionesFinales[0].tiempoCarrera)},
                       {piloto: posicionesFinales[2].conductor.nombre, tiempo: "+" + posicionesFinales[2].formatoTiempo(posicionesFinales[2].tiempoCarrera - posicionesFinales[0].tiempoCarrera)}];
        posicionesFinales[1].conductor.registrarPodio(2);
        posicionesFinales[2].conductor.registrarPodio(3);

        this.vueltaRapida.piloto.registrarVueltaRapida();

        console.log(podio[0]);
        console.log(podio[1]);
        console.log(this.vueltaRapida);

        /*ALGUIEN QUE CALCULE LOS ADELANTAMIENTOS Y ERRORES DEL PILOTO (UN ERROR ES UNA PERDIDA DE POSICION)*/

        const posicionPorPilotoInicial = new Map(this.posicionesDeSalida.map(pos => [pos.piloto, pos.posicion]));
        const adelantamientos = posicionesFinales.map((auto, index) => {
            const posicionInicial = posicionPorPilotoInicial.get(auto.conductor.nombre) || Infinity;
            const posicionFinal = index + 1;
            auto.conductor.adelantamientos += Math.max(0, posicionInicial - posicionFinal);
        });

        return {
            podio: [ganador, ...podio],
            vueltaRapida: this.vueltaRapida,
            puntos: [{piloto: ganador.piloto, puntos: 25},
                     {piloto: podio[0].piloto, puntos: 18},
                     {piloto: podio[1].piloto, puntos: 15},
            ]
        }
    }

    /**
     * Obtiene los resultados actuales de la carrera
     * @returns {Object} Resultados actuales
     * 
     * @example
     * const carrera = new Carrera("GP de Mónaco", circuitoMonaco, "2024-05-26");
     * const resultados = carrera.obtenerResultados();
     * // Returns: {
     * //   posiciones: [
     * //     { posicion: 1, piloto: "Leclerc", tiempo: "1:45:23.456" },
     * //     { posicion: 2, piloto: "Verstappen", tiempo: "+2.345" },
     * //     ...
     * //   ],
     * //   vueltasCompletadas: 45,
     * //   vueltasRestantes: 33,
     * //   estado: "en_progreso"
     * // }
     */
    obtenerResultados() {

        const vueltasRestantes = this.numeroVueltas - this.vueltaActual;

        if(vueltasRestantes > 0){
            this.estado = "en_progreso";
        }else{
            this.estado = "finalizada";
        }

        const posiciones = this.autosParticipantes
        .sort((a, b) => a.tiempoCarrera - b.tiempoCarrera)
        .map(auto => ({
            piloto: auto.conductor.nombre,
            tiempo: auto.tiempoCarrera
        }));

        const tiempoLider = posiciones[0].tiempo;

        const posicionesFormateadas = posiciones.map((posicion, index) => ({
            piloto: posicion.piloto,
            tiempoFormateado: index === 0 
                ? this.formatoTiempo(posicion.tiempo)
                : `+${this.formatoTiempo(posicion.tiempo - tiempoLider)}`
        }));

        posicionesFormateadas.forEach((posicion) => console.log(posicion.piloto, posicion.tiempoFormateado));

        return{
            posiciones: posicionesFormateadas,
            vueltasCompletadas: this.vueltaActual,
            vueltasRestantes: vueltasRestantes,
            estado: this.estado
        }
    }

    formatoTiempo(tiempo){  
        const minutos = Math.floor(tiempo / 60);
        const segundosRestantes = Math.floor(tiempo % 60);
        const milisegundos = Math.round((tiempo % 1) * 1000);
        
        return `${minutos}:${segundosRestantes.toString().padStart(2, '0')}.${milisegundos.toString().padStart(3, '0')}`;
    }
}

module.exports = Carrera;