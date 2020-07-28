# Add node
Agrega un nodo al cluster.

**URL** : `/nodes`

**Method** : `POST`

**Data example**

```json
{
    "ip": "localhost",
    "port": 3004
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "id": 3004,
    "message": "Nodo agregado!"
}
```

## Error Response

**Condition** : Si 'port' ya existe en el cluster.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "error": "Ya existe un nodo con el puerto 'port'"
}
```
