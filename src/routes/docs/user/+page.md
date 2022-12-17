# User API

## Signup

### Request

|                  |                                                                  |
| ---------------- | ---------------------------------------------------------------- |
| **Endpoint URL** | https://w90wttueb3.execute-api.us-east-1.amazonaws.com/v1/signup |
| **Method**       | POST                                                             |
| **Content-Type** | application/json                                                 |
| **Body**         | `{ email: string, password: string}`                             |

### Response

|                  |               |
| ---------------- | ------------- |
| **Status Code**  | 200, 400, 500 |
| **Content-Type** | text/plain    |
