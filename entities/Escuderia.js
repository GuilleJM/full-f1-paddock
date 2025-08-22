class Escuderia {
    constructor(nombre, paisOrigen, presupuesto) {
        this.nombre = nombre;
        this.paisOrigen = paisOrigen;
        this.presupuesto = presupuesto;
        this.presupuestoInvertido = 0;
        this.autos = [];
        this.pilotos = [];
        this.desarrollo = {
            motor: { nivel: 0, estadisticas: { potencia: 0, eficiencia: 0 } },
            aerodinamica: { nivel: 0, estadisticas: { carga: 0, resistencia: 0 } },
            neumaticos: { nivel: 0, estadisticas: { durabilidad: 0, agarre: 0 } },
            suspension: { nivel: 0, estadisticas: { estabilidad: 0, respuesta: 0 } }
        };
        this.estadisticas = {
            victorias: 0,
            podios: 0,
            vueltasRapidas: 0,
            abandonos: 0
        };
    }

    /**
     * Invierte un monto en el desarrollo de un área específica
     * @param {string} area - Área de desarrollo (motor, aerodinámica, neumáticos, suspensión)
     * @param {number} monto - Cantidad a invertir
     * @returns {Object} Información sobre la inversión
     * @throws {Error} Si el presupuesto es insuficiente o el área no es válida
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * const inversion = escuderia.invertirEnDesarrollo("motor", 200000);
     * // Returns: {
     * //   area: "motor",
     * //   montoInvertido: 200000,
     * //   presupuestoRestante: 800000,
     * //   nivelAnterior: 0,
     * //   nivelNuevo: 2
     * // }
     */
    invertirEnDesarrollo(area, monto) {
        const areasValidas = ['motor', 'aerodinamica', 'neumaticos', 'suspension'];
        if (!areasValidas.includes(area)) {
            throw new Error('Área de desarrollo no válida');
        }

        if (monto > this.presupuesto) {
            throw new Error('Presupuesto insuficiente');
        }

        const mejora = this.calcularMejora(area, monto);
        const nivelAnterior = this.desarrollo[area].nivel;
        
        this.desarrollo[area].nivel = mejora.nivelAlcanzado;
        if (area === 'motor') {
            this.desarrollo.motor.estadisticas.potencia += mejora.mejoraPotencia;
            this.desarrollo.motor.estadisticas.eficiencia += mejora.mejoraEficiencia;
        } else if (area === 'aerodinamica') {
            this.desarrollo.aerodinamica.estadisticas.carga += mejora.mejoraCarga;
            this.desarrollo.aerodinamica.estadisticas.resistencia += mejora.mejoraResistencia;
        } else if (area === 'neumaticos') {
            this.desarrollo.neumaticos.estadisticas.durabilidad += mejora.mejoraDurabilidad;
            this.desarrollo.neumaticos.estadisticas.agarre += mejora.mejoraAgarre;
        } else if (area === 'suspension') {
            this.desarrollo.suspension.estadisticas.estabilidad += mejora.mejoraEstabilidad;
            this.desarrollo.suspension.estadisticas.respuesta += mejora.mejoraRespuesta;
        }

        this.presupuesto -= monto;
        this.presupuestoInvertido += monto;

        return {
            area,
            montoInvertido: monto,
            presupuestoRestante: this.presupuesto,
            nivelAnterior,
            nivelNuevo: mejora.nivelAlcanzado
        };
    }

    /**
     * Calcula la mejora esperada en un área según el monto invertido
     * @param {string} area - Área de desarrollo
     * @param {number} monto - Monto a invertir
     * @returns {Object} Cálculo de la mejora esperada
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * const mejora = escuderia.calcularMejora("motor", 200000);
     * // Returns: {
     * //   area: "motor",
     * //   mejoraPotencia: 10,
     * //   mejoraEficiencia: 10,
     * //   nivelAlcanzado: 2
     * // }
     */
    calcularMejora(area, monto) {
        const costoPorNivel = 100000;
        const nivelEsperado = Math.floor(monto / costoPorNivel);
        const nivelAlcanzado = nivelEsperado;
        const probabilidadDeError = 0.2;
        
        if(Math.random() < probabilidadDeError){
            nivelAlcanzado -= 1;
        };

        const nivelAlcanzado = Math.floor(monto / costoPorNivel);
        const mejoraBase = nivelAlcanzado * 5;
        const mejora = { area, nivelAlcanzado };
        
        if (area === 'motor') {
            mejora.mejoraPotencia = mejoraBase;
            mejora.mejoraEficiencia = mejoraBase;
        } else if (area === 'aerodinamica') {
            mejora.mejoraCarga = mejoraBase;
            mejora.mejoraResistencia = mejoraBase;
        } else if (area === 'neumaticos') {
            mejora.mejoraDurabilidad = mejoraBase;
            mejora.mejoraAgarre = mejoraBase;
        } else if (area === 'suspension') {
            mejora.mejoraEstabilidad = mejoraBase;
            mejora.mejoraRespuesta = mejoraBase;
        }

        this.esDesarrolloExitoso(nivelEsperado, nivelAlcanzado); //¿Debería ser un console log esta línea (a revisar en el futuro)?

        return mejora;
    }

    /**
     * Valida si el desarrollo en un área fue exitoso
     * @param {string} area - Área de desarrollo
     * @returns {boolean} true si el desarrollo fue exitoso
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * escuderia.desarrollo.motor.nivel = 2;
     * const esExitoso = escuderia.esDesarrolloExitoso("motor");
     * // Returns: true si el nivel de desarrollo es adecuado y el presupuesto fue bien utilizado
     */
    esDesarrolloExitoso(nivelEsperado, nivelAlcanzado) {
        //Lógica implementada: Se considera que el desarrollo fue exitoso
        //si el nivel alcanzado es igual al nivel esperado
        //(Es decir, si no hubieron errores aleatorios)
        return nivelEsperado == nivelAlcanzado
    }

    /**
     * Obtiene todas las estadísticas de la escudería
     * @returns {Object} Estadísticas completas
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * const estadisticas = escuderia.obtenerEstadisticas();
     * // Returns: {
     * //   desarrollo: {
     * //     motor: { nivel: 2, estadisticas: { potencia: 85, eficiencia: 80 } },
     * //     aerodinamica: { nivel: 1, estadisticas: { carga: 75, resistencia: 70 } },
     * //     neumaticos: { nivel: 1, estadisticas: { durabilidad: 80, agarre: 75 } },
     * //     suspension: { nivel: 1, estadisticas: { estabilidad: 75, respuesta: 80 } }
     * //   },
     * //   rendimiento: {
     * //     victorias: 5,
     * //     podios: 12,
     * //     vueltasRapidas: 3,
     * //     abandonos: 2
     * //   },
     * //   presupuesto: {
     * //     total: 1000000,
     * //     disponible: 800000,
     * //     invertido: 200000
     * //   }
     * // }
     */
    obtenerEstadisticas() {
        return {
            desarrollo: {
                motor: { ...this.desarrollo.motor },
                aerodinamica: { ...this.desarrollo.aerodinamica },
                neumaticos: { ...this.desarrollo.neumaticos },
                suspension: { ...this.desarrollo.suspension }
            },
            rendimiento: { ...this.estadisticas },
            puntosCampeonato: (this.estadisticas.victorias * 25 + this.estadisticas.podios * 18 + this.estadisticas.vueltasRapidas),
            presupuesto: {
                total: this.presupuesto + this.presupuestoInvertido,
                disponible: this.presupuesto,
                invertido: this.presupuestoInvertido
            }
        };
    }

    /**
     * Actualiza una estadística específica de la escudería
     * @param {string} tipo - Tipo de estadística (victoria, podio, vueltaRapida, abandono)
     * @param {number} cantidad - Cantidad a actualizar
     * @returns {Object} Estadísticas actualizadas
     * 
     * @example
     * const escuderia = new Escuderia("Mercedes", "Alemania", 1000000);
     * const actualizacion = escuderia.actualizarEstadisticas("victoria", 1);
     * // Returns: {
     * //   tipo: "victoria",
     * //   cantidadAnterior: 0,
     * //   cantidadNueva: 1,
     * //   estadisticasActualizadas: {
     * //     victorias: 1,
     * //     podios: 0,
     * //     vueltasRapidas: 0,
     * //     abandonos: 0
     * //   }
     * // }
     */
    actualizarEstadisticas(tipo, cantidad) {
        const tiposValidos = ['victoria', 'podio', 'vueltaRapida', 'abandono'];
        if (!tiposValidos.includes(tipo)) {
            throw new Error('Tipo de estadística no válido');
        }

        const tipoMap = {
            victoria: 'victorias',
            podio: 'podios',
            vueltaRapida: 'vueltasRapidas',
            abandono: 'abandonos'
        };
        
        const tipoInterno = tipoMap[tipo];
        const cantidadAnterior = this.estadisticas[tipoInterno];
        this.estadisticas[tipoInterno] += cantidad;

        return {
            tipo,
            cantidadAnterior,
            cantidadNueva: this.estadisticas[tipoInterno],
            estadisticasActualizadas: { ...this.estadisticas /*Copia los valores ya existentes de estaditicas en vez de ir uno por uno*/}
        };
    }
}

module.exports = Escuderia;
