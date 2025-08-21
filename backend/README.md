## User Registration Endpoint

## POST `/users/register`

Registers a new user in the system.

### Description

This endpoint allows a new user to create an account by providing their first name, last name, email, and password. Upon successful registration, a JWT token and the user object are returned.

### Request Body

Send a JSON object with the following fields:

| Field                | Type   | Required | Description                        |
|----------------------|--------|----------|------------------------------------|
| fullname.firstname   | String | Yes      | User's first name (min 3 chars)    |
| fullname.lastname    | String | No       | User's last name (min 3 chars)     |
| email                | String | Yes      | User's email (must be valid email) |
| password             | String | Yes      | Password (min 8 characters)        |

#### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword123"
}
```

### Responses

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| 201         | User registered successfully                     |
| 400         | Validation error or email already exists         |

---

# User Login Endpoint

## POST `/users/login`

Authenticates a user and returns a JWT token and user object.

### Request Body

| Field    | Type   | Required | Description                        |
|----------|--------|----------|------------------------------------|
| email    | String | Yes      | User's email (must be valid email) |
| password | String | Yes      | Password (min 8 characters)        |

#### Example

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword123"
}
```

### Responses

| Status Code | Description                         |
|-------------|-------------------------------------|
| 200         | Login successful                    |
| 400         | Validation error                    |
| 401         | Invalid email or password           |

---

# Get User Profile Endpoint

## GET `/users/profile`

Returns the authenticated user's profile.

### Headers

- Requires authentication via JWT token (as cookie or `Authorization: Bearer <token>` header).

### Responses

| Status Code | Description                |
|-------------|----------------------------|
| 200         | Returns user profile       |
| 401         | Unauthorized               |

---

# User Logout Endpoint

## GET `/users/logout`

Logs out the authenticated user by blacklisting the token and clearing the cookie.

### Headers

- Requires authentication via JWT token (sent as cookie or `Authorization: Bearer <token>` header).

### Responses

| Status Code | Description                |
|-------------|----------------------------|
| 200         | Logged out successfully     |

---

# Captain Registration Endpoint

## POST `/captains/register`

Registers a new captain (driver) in the system.

### Request Body

| Field                   | Type   | Required | Description                                 |
|-------------------------|--------|----------|---------------------------------------------|
| fullname.firstname      | String | Yes      | Captain's first name (min 3 chars)          |
| fullname.lastname       | String | No       | Captain's last name (min 3 chars)           |
| email                   | String | Yes      | Captain's email (must be valid email)       |
| password                | String | Yes      | Password (min 6 characters)                 |
| vehicle.color           | String | Yes      | Vehicle color (min 3 chars)                 |
| vehicle.plate           | String | Yes      | Vehicle plate (min 3 chars)                 |
| vehicle.capacity        | Int    | Yes      | Vehicle capacity (min 1)                    |
| vehicle.vehicleType     | String | Yes      | Vehicle type: 'car', 'motorcycle', or 'auto'|

#### Example

```json
{
  "fullname": {
    "firstname": "Ali",
    "lastname": "Khan"
  },
  "email": "ali.khan@example.com",
  "password": "securepass123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses

| Status Code | Description                        |
|-------------|------------------------------------|
| 201         | Captain registered successfully    |
| 400         | Validation error or missing fields |

---

# Captain Login Endpoint

## POST `/captains/login`

Authenticates a captain and returns a JWT token and captain object.

### Request Body

| Field    | Type   | Required | Description                        |
|----------|--------|----------|------------------------------------|
| email    | String | Yes      | Captain's email (must be valid)    |
| password | String | Yes      | Password (min 6 characters)        |

#### Example

```json
{
  "email": "ali.khan@example.com",
  "password": "securepass123"
}
```

### Responses

| Status Code | Description                         |
|-------------|-------------------------------------|
| 200         | Login successful                    |
| 400         | Validation error                    |
| 401         | Invalid email or password           |

---

# Get Captain Profile Endpoint

## GET `/captains/profile`

Returns the authenticated captain's profile.

### Headers

- Requires authentication via JWT token (as cookie or `Authorization: Bearer <token>` header).

### Responses

| Status Code | Description                |
|-------------|----------------------------|
| 200         | Returns captain profile    |
| 401         | Unauthorized               |

---

# Captain Logout Endpoint

## GET `/captains/logout`

Logs out the authenticated captain by blacklisting the token and clearing the cookie.

### Headers

- Requires authentication via JWT token (sent as cookie or `Authorization: Bearer <token>` header).

### Responses

| Status Code | Description                |
|-------------|----------------------------|
| 200         | Logged out successfully     |