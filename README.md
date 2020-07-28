# Gestor de almacénes

## Integrantes
- Nacimiento, Francisco Martin
- Senghaas, Evelin Yaneth

## Vision
El gestor de almacénes consiste en ser un nodo especial encargado de:
- **Particionar** el almacenamiento de claves-valores en nodos de forma aproximadamente uniforme.
- **Conocer** a los demás nodos del cluster que realizan tareas de almacenamiento clave-valor.
- **Enrutar** las solicitudes de los clientes a los nodos correspondientes según la clave enviada para poder realizar operaciones en los almacenes.
- **Equilibrar** de forma aproximadamente uniforme las claves-valores ante eventos de agregado o salida de un nodo en el cluster.

## Requisitos
- Node.js o Docker
- Proyecto de almacenes

## Comenzar
Para utilizar el proyecto usted debe:

- Clonar el repositorio.
- Una vez clonado el repo ejecuta en tu consola (bash) `npm install` para instalar las dependencias del proyecto.
- Ejecutar `npm run dev` para poner en funcionamiento el proyecto.

## Estructura del proyecto
```
services/
    StoreManager.js
index.js
```
- En `index.js` puede encontrar algunas configuraciones del proyecto y los endpoints o rutas del gestor de almacenes.
- En `StoreManager.js` puede encontrar toda la lógica del gestor de almacenes.

## API

- [Get data](docs/get_data.md): `GET /`
- [Save data](docs/save_data.md): `POST /`
- [Destroy data](docs/destroy_data.md): `DELETE /`
- [Get nodes](docs/get_nodes.md): `GET /nodes`
- [Add node](docs/add_node.md): `POST /nodes`
- [Remove node](docs/remove_node): `DELETE /nodes/:id`

## Store Manager
Una breve descripción de como esta construido el gestor de almacenes.

### Properties
- **range**: rango claves hash individual para cada partición
- **nodes**: todos los nodos registrados en el cluster
- **stores**: todos los datos persistidos en la base de datos distribuida. Solo contiene datos durante el balanceo del cluster.

### Methods
- **addNode(ip, port)**: agrega un nodo al cluster.
- **deleteNode(id)**: remueve un nodo del cluster.
- **destroyData(key)**: elimina una clave-valor del almacenamiento correspondiente mediante un mapeo hash de clave.
- **getData(key)**: recupera el valor de una clave del almacenamiento correspondiente mediante un mapeo hash de clave.
- **getNodes()**: recupera todos los nodos registrados en el cluster.
- **getStores()**: recupera todas las claves-valores de todos los nodos del cluster.
- **hash(key)**: obtiene el hash de un clave mediante el algoritmo MD5.
- **map(key)**: mapea una clave a una partición o nodo, retorna el indice de la partición o nodo.
- **saveData(key, value)**: crea o actualiza una clave-valor del almacenamiento correspondiente mediante un mapeo hash de clave.
- **setStores()**: actualiza los almacenes (nodos) con los datos ya balanceados.
- **swing()**: balancea los rangos de hash de clave de cada partición (nodo).

## Disclaimer
- Al retirar un nodo del cluster, se realiza un copia de sus datos para ser distribuidos en los nodos que aun pertenecen al mismo. Pero los datos del nodo retirado siguen permaneciendo en el nodo, por lo que volver a agregar ese nodo puede causar redundancia de datos, queda bajo responsabilidad del administrador de bases de datos eliminar los datos de ese antes de volverlo a agregar al cluster.

