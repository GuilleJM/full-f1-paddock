class Estrategia {
    constructor(numeroParadas, tiposNeumaticos, vueltasParada, agresividad) {
        this.numeroParadas = numeroParadas;
        this.tiposNeumaticos = tiposNeumaticos;
        this.vueltasParada = vueltasParada;
        this.agresividad = agresividad;
        this.paradasRealizadas = 0;
        this.tiempoTotalPitStops = 0;
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
     *   2, // número de paradas
     *   ["blandos", "duros", "duros"], // tipos de neumáticos
     *   [20, 40], // vueltas de parada
     *   "media" // agresividad
     * );
     * const esOptima = estrategia.esOptima();
     * // Returns: true si la estrategia es óptima para una carrera de 60 vueltas
     */
    esOptima() {
        if ( this.numeroParadas <= 4 && this.numeroParadas >= 2 &&  this.agresividadConsistente() && this.paradasDistribuidasUniformemente()){
            return true;}
        return false;}

    /**
     * Verifica si las paradas están distribuidas uniformemente
     * @returns {boolean} true si:
     * - Los intervalos entre paradas son similares
     * - Las vueltas de parada están bien espaciadas
     * - No hay acumulación de paradas
     * 
     * @example
     * const estrategia = new Estrategia(
     *   2,
     *   ["blandos", "duros", "duros"],
     *   [20, 40],
     *   "media"
     * );
     * const distribucion = estrategia.paradasDistribuidasUniformemente();
     * // Returns: true si los intervalos entre paradas son similares (la diferencia no es mayor a 3 vueltas) 
     * //               y hay mas de 15 vueltas de diferencia
     */
    paradasDistribuidasUniformemente() {
        for (let i = 1; i < this.numeroParadas.length; i++) {
            if (this.vueltasParada[i] % this.vueltasParada[0] > 3 || (this.vueltasParada[i] - this.vueltasParada[i - 1]) > 15 ) {
                return false;}}
        return true;}

    /**
     * Valida si el nivel de agresividad es consistente
     * @returns {boolean} true si:
     * - La agresividad es consistente con el tipo de neumáticos
     * - El nivel es apropiado para las condiciones
     * - No hay cambios bruscos de agresividad
     * 
     * @example
     * const estrategia = new Estrategia(
     *   2,
     *   ["blandos", "duros", "duros"],
     *   [20, 40],
     *   "media"
     * );
     * const agresividad = estrategia.agresividadConsistente();
     * // Returns: true si la agresividad es consistente con la estrategia
     */
    agresividadConsistente() {
        if (this.agresividad == "Alta"){
            if (this.tiposNeumaticos[this.paradasRealizadas] != "duros"){
                return false}}
        // if (this.agresividad == "Media"){
        //     if (this.tiposNeumaticos[this.paradasRealizadas] != "medios"){
        //         return false}}
        if (this.agresividad == "Baja"){
            if (this.tiposNeumaticos[this.paradasRealizadas] != "blandos"){
                return false}}
            
            }

    /**
     * Registra una parada en boxes con su tiempo
     * @param {number} tiempo - Tiempo de la parada en segundos
     * @returns {Object} Información de la parada registrada
     * 
     * @example
     * const estrategia = new Estrategia(
     *   2,
     *   ["blandos", "duros", "duros"],
     *   [20, 40],
     *   "media"
     * );
     * const parada = estrategia.registrarParada(2.5);
     * // Returns: {
     * //   numeroParada: 1,
     * //   tiempo: 2.5,
     * //   vuelta: 20,
     * //   neumaticos: "duros",
     * //   tiempoTotalPitStops: 2.5
     * // }
     */
    registrarParada(tiempo) {
        this.paradasRealizadas = this.paradasRealizadas + 1;
        return({
            numeroParada: this.paradasRealizadas,
            tiempo: tiempo,
            vuelta: this.vueltasParada[this.paradasRealizadas],
            neumaticos: this.tiposNeumaticos[this.paradasRealizadas],
            tiempoTotalPitStops: this.tiempoTotalPitStops + tiempo})}

    /**
     * Obtiene información sobre la próxima parada programada
     * @returns {Object} Detalles de la próxima parada
     * 
     * @example
     * const estrategia = new Estrategia(
     *   2,
     *   ["blandos", "duros", "duros"],
     *   [20, 40],
     *   "media"
     * );
     * const siguienteParada = estrategia.obtenerSiguienteParada();
     * // Returns: {
     * //   vuelta: 20,
     * //   neumaticos: "duros",
     * //   tiempoEstimado: 2.5,
     * //   paradaNumero: 1
     * // }
     */
    obtenerSiguienteParada() {
        return({
            vuelta: this.vueltasParada[this.paradasRealizadas],
            neumaticos: this.tiposNeumaticos[this.paradasRealizadas + 1],
            tiempoEstimado: 2.5,
            numeroParada: this.paradasRealizadas + 1})}}

module.exports = Estrategia; 