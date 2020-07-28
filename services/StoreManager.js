const hash = require("object-hash")
const axios = require("axios")

/**
 * El termino "nodes" o nodo en espanol puede ser entendido como partición, ya que cada uno tendrá una
 * única partición de toda la base de datos, asi que el uso de ambos son indistintos
 */

class StoreManager {
  constructor() {
    this.range = 0 //rango claves hash individual para cada partición
    this.nodes = []
    this.stores = [] //datos de todos los almacenes
  }

  /**
   * Balancea los rangos de cada partición
   */
  swing() {
    let q_nodes = this.nodes.length
    this.range = parseInt(16777215 / this.nodes.length)
    let from = 0
    this.nodes.forEach(n => {
      n.from = from
      n.to = from + this.range - 1
      from += this.range
    })
    this.nodes[q_nodes - 1].to += (16777215 % q_nodes) + 1 // Para cubrir bien el rango de hashes posibles
  }

  /**
   * Recupera todos los datos de los almacenes para balancear
   */
  getStores() {
    return new Promise(async (resolve, reject) => {
      let promises = this.nodes.map(async n => {
        const { data } = await axios.get(`${n.address}/db`)
        this.stores = this.stores.concat(data)
      })
      await Promise.all(promises)
      console.log(`stores: ${this.stores}`)
      resolve()
    })
  }

  /**
   * Actualiza los almacenes con los datos ya balanceados
   */
  async setStores() {
    let aux

    this.nodes.map(async (n, index) => {
      aux = this.stores.filter(data => this.map(data.key) == index)

      await axios.put(`${n.address}/db`, {
        newStore: aux,
      })
    })
    this.stores = []
  }

  /**
   * Particionamiento por clave-valor hash MD5
   * @param {String} key
   */
  hash(key) {
    let h = hash.MD5(key) // Devuelve un string de 32bytes
    h = h.slice(0, 6) // Tomamos los 6 primeros bytes del hash
    return parseInt(h, 16) // Regresamos el valor decimal
  }

  /**
   * Mapea una clave a una partición, retorna el indice de la partición o nodo
   * @param {String} key
   */
  map(key) {
    const hash = this.hash(key)
    return this.nodes.findIndex(e => e.from <= hash && hash <= e.to)
  }

  /**
   * Agrega un nodo al cluster
   * @param {String} ip
   * @param {Number} port
   */
  async addNode(ip, port) {
    let index = this.nodes.findIndex(n => n.id == port)
    if (index !== -1) throw new Error(`Ya existe un nodo con el puerto ${port}`)

    this.nodes.push({
      id: port,
      address: `http://${ip}:${port}`,
      from: null,
      to: null,
    })

    await this.getStores()

    this.swing()

    // Si hay al menos un dato que rebalancear
    if (this.stores.length > 0) this.setStores()

    return port
  }

  /**
   * Elimina un nodo del cluster
   * @param {String} ip
   * @param {Number} port
   */
  async deleteNode(id) {
    let index = this.nodes.findIndex(n => n.id == id)
    if (index === -1) throw new Error(`No existe el nodo con id: ${id}`)

    await this.getStores() //Recupera los datos de todos los nodos
    this.nodes.splice(index, 1) //Eliminar nodo de la lista
    this.swing()

    if (this.stores.length > 0) this.setStores() // Si hay al menos un nodo en el cluster
  }

  getNodes() {
    return this.nodes
  }

  async getData(key) {
    const node = this.nodes[this.map(key)]
    const { data } = await axios.get(`${node.address}`, { data: { key } })
    return data
  }
  async saveData(key, value) {
    const node = this.nodes[this.map(key)]
    const { data } = await axios.post(`${node.address}`, { key, value })
    return data
  }
  async destroyData(key) {
    const node = this.nodes[this.map(key)]
    const { data } = await axios.delete(`${node.address}`, { data: { key } })
    return data
  }
}

module.exports = StoreManager
