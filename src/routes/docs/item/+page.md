# Item API

## Create an item

### Request

|                    |                                                                                |
| ------------------ | ------------------------------------------------------------------------------ |
| **Endpoint URL**   | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/table/tableName/item |
| **Method**         | POST                                                                           |
| **Authorization**  | `Bearer {accessToken}`                                                         |
| **Content-Type**   | application/json                                                               |
| **Body**           | `Record<string, AttributeValue>`                                               |
| **Path Parameter** | `tableName`                                                                    |

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 200, 400, 403, 500                       |
| **Content-Type** | text/plain                               |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |

---

## Get an item

### Request

|                    |                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Endpoint URL**   | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/table/tableName/item/base64UrlBody |
| **Method**         | POST                                                                                         |
| **Authorization**  | `Bearer {accessToken}`                                                                       |
| **Content-Type**   | application/json                                                                             |
| **Path Parameter** | `tableName`, `base64UrlBody`                                                                 |

`base64UrlBody`: Encode body sử dụng base64url, với body thuộc kiểu `Record<string, AttributeValue>`.

```
{
	id: { N: '1' },
	name: { S: 'ABC' }
}
```

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 200, 400, 403, 404, 500                  |
| **Content-Type** | application/json, text/plain             |
| **Body**         | `Record<string, AttributeValue>`         |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |

---

## Get all items

### Request

|                    |                                                                                |
| ------------------ | ------------------------------------------------------------------------------ |
| **Endpoint URL**   | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/table/tableName/item |
| **Method**         | POST                                                                           |
| **Authorization**  | `Bearer {accessToken}`                                                         |
| **Content-Type**   | application/json                                                               |
| **Path Parameter** | `tableName`                                                                    |

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 200, 400, 403, 404, 500                  |
| **Content-Type** | application/json, text/plain             |
| **Body**         | `Record<string, AttributeValue>[]`       |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |

---

## Update an item

### Request

|                    |                                                                                |
| ------------------ | ------------------------------------------------------------------------------ |
| **Endpoint URL**   | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/table/tableName/item |
| **Method**         | PUT                                                                            |
| **Authorization**  | `Bearer {accessToken}`                                                         |
| **Content-Type**   | application/json                                                               |
| **Path Parameter** | `tableName`                                                                    |
| **Body**           | `Record<string, AttributeValue>`                                               |
| **Path Parameter** | `tableName`                                                                    |

Mẫu cho body:

```
{
	id: { N: '1' },
	name: { S: 'ABC' },
	price: { N: '1000' }
}
```

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 200, 400, 403, 500                       |
| **Content-Type** | text/plain                               |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |

---

## Delete some items

### Request

|                    |                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------- |
| **Endpoint URL**   | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/table/tableName/item/delete |
| **Method**         | POST                                                                                  |
| **Authorization**  | `Bearer {accessToken}`                                                                |
| **Content-Type**   | application/json                                                                      |
| **Path Parameter** | `tableName`                                                                           |
| **Body**           | `Record<string, AttributeValue>[]`                                                    |
| **Path Parameter** | `tableName`                                                                           |

Mẫu cho body:

```
[
	{ id: { N: '1' }, name: { S: 'ABC' }},
	{ id: { N: '2' }, name: { S: 'XYZ' }}
]
```

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 200, 400, 403, 500                       |
| **Content-Type** | application/json                         |
| **Body**         | `{ deletedCount: number }`               |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |
