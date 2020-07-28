# Destroy data
Elimina una clave-valor de la base de datos.

**URL** : `/`

**Method** : `DELETE`

**Data constraints**

```json
{
    "key": "[valid key]"
}
```

**Data example**

```json
{
    "key": "sistemas"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "value": "sistemas",
    "ip": "localhost",
    "port": 3000
}
```

## Error Response

**Condition** : Si 'key' no existe en la base de datos.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "error": "No existe la clave ingresada"
}
```
