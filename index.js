require("dotenv").config()
const express = require("express")
const app = express()
const StoreManager = require("./services/StoreManager")
const storeManager = new StoreManager()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", async (req, res) => {
  const { body: data } = req
  try {
    res.json(await storeManager.getData(data.key))
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.post("/", async (req, res) => {
  const { body: data } = req
  try {
    res.json(await storeManager.saveData(data.key, data.value))
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.delete("/", async (req, res) => {
  const { body: data } = req
  try {
    res.json(await storeManager.destroyData(data.key))
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.get("/nodes", (req, res) => {
  res.json({ nodes: storeManager.getNodes() })
})

app.post("/nodes", (req, res) => {
  const { body: data } = req
  try {
    let port = storeManager.addNode(data.ip, data.port)
    res.json({ id: port, message: "Nodo agregado!" })
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.delete("/nodes/:id", (req, res) => {
  const { id } = req.params
  try {
    storeManager.deleteNode(id)
    res.json({ id, message: "Nodo eliminado!" })
  } catch (error) {
    res.json({ error: error.message })
  }
})

app.listen(4000, function () {
  console.log("Example app listening on port 4000!")
})
