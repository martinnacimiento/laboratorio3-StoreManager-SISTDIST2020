# Destroy data
Remueve un nodo del cluster.

**URL** : `/nodes:id`

**URL Parameters**: id=[integer] donde id es el ID de un nodo del cluster.

**Method** : `DELETE`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "id": "3003",
    "message": "Nodo eliminado!"
}
```

## Error Response

**Condition** : Si 'id' no existe en la base de datos.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "error": "No existe el nodo con id: 'id'"
}
```
