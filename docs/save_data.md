# Save data
Guarda una clave y un valor en la base de datos.

**URL** : `/`

**Method** : `POST`

**Data constraints**

```json
{
    "key": "[valid key]",
    "value": "[valid value]"
}
```

**Data example**

```json
{
    "key": "sistemas",
    "value": "distribuidos"
}
```

## Success Response

**Condition**: Si no existe la 'key' en la base de datos.

**Code** : `200 OK`

**Content example**

```json
{
    "value": 0,
    "ip": "localhost",
    "port": 3000
}
```
**Condition**: Si existe la 'key' en la base de datos.

**Code** : `200 OK`

**Content example**

```json
{
    "value": 1,
    "ip": "localhost",
    "port": 3000
}
```

**value*: Si retorna 0, significa que fue creado una nueva clave-valor, si es 1 fue actualizado el valor de la clave proporcionada.

## Error Response

**Condition** : Si 'key' no cumple con el formato correcto.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "error": "Error en formato"
}
```
