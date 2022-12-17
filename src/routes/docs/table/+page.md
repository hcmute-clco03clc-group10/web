# Table API

## Create a table

### Request

|                   |                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Endpoint URL**  | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/table                                                                                                                    |
| **Method**        | POST                                                                                                                                                                               |
| **Authorization** | `Bearer {accessToken}`                                                                                                                                                             |
| **Content-Type**  | application/json                                                                                                                                                                   |
| **Body**          | `{ tableName: string, partitionKey: string, partitionKeyType: string, sortKey?: string, sortKeyType?: string, provisionedReadCapacity: number, provisionedWriteCapacity: number }` |

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 201, 400, 403, 500, 502                  |
| **Content-Type** | text/plain                               |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |

---

## Delete some tables

### Request

|                   |                                                                        |
| ----------------- | ---------------------------------------------------------------------- |
| **Endpoint URL**  | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/table/delete |
| **Method**        | POST                                                                   |
| **Authorization** | `Bearer {accessToken}`                                                 |
| **Content-Type**  | application/json                                                       |
| **Body**          | `string[]`                                                             |

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 200, 400                                 |
| **Content-Type** | text/plain                               |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |

---

## Describe one table

### Request

|                     |                                                                          |
| ------------------- | ------------------------------------------------------------------------ |
| **Endpoint URL**    | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/table?name=... |
| **Method**          | GET                                                                      |
| **Authorization**   | `Bearer {accessToken}`                                                   |
| **Query Parameter** | `name=...`                                                               |

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 200, 400, 403, 500                       |
| **Content-Type** | application/json                         |
| **Body**         | `DescribeTableCommandOutput`             |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |

---

## Describe all tables

### Request

|                   |                                                                 |
| ----------------- | --------------------------------------------------------------- |
| **Endpoint URL**  | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/table |
| **Method**        | GET                                                             |
| **Authorization** | `Bearer {accessToken}`                                          |

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 200, 400, 403, 500                       |
| **Content-Type** | application/json                         |
| **Body**         | `DescribeTableCommandOutput[]`           |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |
