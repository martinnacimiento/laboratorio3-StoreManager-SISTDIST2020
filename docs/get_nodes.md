# Get nodes
Recuperar los nodos registrados en el cluster.

**URL** : `/nodes`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "nodes": [
        {
            "id": 3000,
            "address": "http://localhost:3000",
            "from": 0,
            "to": 4194302
        },
        {
            "id": 3001,
            "address": "http://localhost:3001",
            "from": 4194303,
            "to": 8388605
        },
        {
            "id": 3002,
            "address": "http://localhost:3002",
            "from": 8388606,
            "to": 12582908
        },
        {
            "id": 3003,
            "address": "http://localhost:3003",
            "from": 12582909,
            "to": 16777215
        }
    ]
}
```