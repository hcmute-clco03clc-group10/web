# Token API

## Login

### Request

|                  |                                                                 |
| ---------------- | --------------------------------------------------------------- |
| **Endpoint URL** | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/login |
| **Method**       | POST                                                            |
| **Content-Type** | application/json                                                |
| **Body**         | `{ email: string, password: string}`                            |

### Response

|                  |                                                 |
| ---------------- | ----------------------------------------------- |
| **Status Code**  | 200, 400, 500                                   |
| **Content-Type** | application/json, text/plain                    |
| **Body**         | `{ accessToken: string, refreshToken: string }` |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure`        |
| **Set-Cookie**   | `refreshToken=...; SameSite=None; Secure`       |
| **HttpOnly**     | true                                            |
| **Secure**       | true                                            |
| **Path**         | /                                               |

---

## Refresh token

### Request

|                   |                                                                 |
| ----------------- | --------------------------------------------------------------- |
| **Endpoint URL**  | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/token |
| **Method**        | GET                                                             |
| **Authorization** | `Bearer {refreshToken}`                                         |

### Response

|                  |                                          |
| ---------------- | ---------------------------------------- |
| **Status Code**  | 200, 400                                 |
| **Content-Type** | application/json, text/plain             |
| **Body**         | `{ accessToken: string }`                |
| **Set-Cookie**   | `accessToken=...; SameSite=None; Secure` |
| **HttpOnly**     | true                                     |
| **Secure**       | true                                     |
| **Path**         | /                                        |

---

## Delete token

### Request

|                  |                                                                 |
| ---------------- | --------------------------------------------------------------- |
| **Endpoint URL** | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/token |
| **Method**       | DELETE                                                          |

### Response

|                  |            |
| ---------------- | ---------- |
| **Status Code**  | 200        |
| **Content-Type** | text/plain |
