# Enhanced Music Library Management API

## Overview

**Music Library Management API** that allows users within an organization to manage their collection of **Artists**, **Tracks**, and **Albums**. Each organization has a single Admin who oversees the system and its users. The API also provides functionality for users to mark their favorite Artists, Albums, and Tracks for quick access and personalization.

> ### Key Points:
>
> - **One Organization, One Admin**: Each organization has a single Admin with full control over the system.
> - **Role-Based Access Control**: Users have distinct roles (Admin, Editor, Viewer), with permissions tailored to their responsibilities.
> - **Entity Relationships**: Albums belong to Artists, and Tracks are associated with Albums and Artists.
> - **Favorites**: Users can personalize their experience by marking items as favorites for easy retrieval.

## Features

### Authentication and Authorization

- Implement **authentication** and **role-based access control** using a method of your choice.
- **Roles**:
  - **Admin**: Full CRUD operations on all entities, including user management.
  - **Editor**: Can edit and delete Artists, Albums, Tracks, and their own details (e.g., updating their password).
  - **Viewer**: Read-only access to all entities.
- The first user registered in the system automatically becomes an **Admin**.

### Entity Management

1. **Users**:  
   Admins can manage users by adding, deleting, and updating their roles (except for other Admins).
2. **Artists, Albums, Tracks**:  
   Full CRUD operations based on role permissions.
3. **Favorites**:  
   Users can add or remove their favorite Artists, Albums, and Tracks.

## Database Schema

### 1. User Table

| Column Name | Type    | Description                     |
| ----------- | ------- | ------------------------------- |
| `user_id`   | UUID    | Unique identifier for the user. |
| `email`     | VARCHAR | User's email address.           |
| `password`  | VARCHAR | Encrypted password.             |
| `role`      | ENUM    | Role (Admin, Editor, Viewer).   |

### 2. Artist Table

| Column Name | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| `artist_id` | UUID    | Unique identifier for the artist. |
| `name`      | VARCHAR | Name of the artist.               |
| `grammy`    | BOOLEAN | Indicates Grammy award status.    |
| `hidden`    | BOOLEAN | Visibility toggle.                |

### 3. Album Table

| Column Name | Type    | Description                      |
| ----------- | ------- | -------------------------------- |
| `album_id`  | UUID    | Unique identifier for the album. |
| `artist_id`  | UUID    | Unique identifier for the album. |
| `name`      | VARCHAR | Album name.                      |
| `year`      | INTEGER | Release year.                    |
| `hidden`    | BOOLEAN | Visibility toggle.               |

### 4. Track Table

| Column Name | Type    | Description                      |
| ----------- | ------- | -------------------------------- |
| `track_id`  | UUID    | Unique identifier for the track. |
| `album_id`  | UUID    | Unique identifier for the album. |
| `name`      | VARCHAR | Track name.                      |
| `duration`  | INTEGER | Track duration in seconds.       |
| `hidden`    | BOOLEAN | Visibility toggle.               |
| `artist_id` | UUID    | Unique identifier for the artist. |

### 5. Favorites Table

| Column Name   | Type | Description                       |
| ------------- | ---- | --------------------------------- |
| `favorite_id` | UUID | Reference to the favorite entity. |
| `category`    |string| artist, album or track.           |
| `item_id`     | UUID | Reference to the item.            |
| `user_id`     | UUID | Reference to the user.            |

## Quick Summary of Endpoints:

### Response Format

- All responses are in **JSON format**.

### Status Codes

Below is a brief summary of all the endpoints and their key response codes:

0. [**GET https://enhanced-music-library-management-api-z77c.onrender.com/Logout**](#0-get-logout---logout-a-user): 200, 400
1. [**POST https://enhanced-music-library-management-api-z77c.onrender.com/signup**](#1-post-signup---register-a-new-user): 201, 400, 409
2. [**POST https://enhanced-music-library-management-api-z77c.onrender.com/login**](#2-post-login---login-a-user): 200, 400, 404
3. [**GET https://enhanced-music-library-management-api-z77c.onrender.com/users**](#3-get-users---retrieve-all-users): 200, 400, 401
4. [**POST https://enhanced-music-library-management-api-z77c.onrender.com/users/add-user**](#4-post-usersadd-user---create-a-new-user): 201, 400, 401, 403, 409
5. [**DELETE https://enhanced-music-library-management-api-z77c.onrender.com/users/:id**](#5-delete-usersid---delete-a-user): 200, 400, 401, 403, 404
6. [**PUT https://enhanced-music-library-management-api-z77c.onrender.com/users/update-password**](#6-put-usersupdate-password---update-user-password): 204, 400, 401, 403, 404
7. [**GET https://enhanced-music-library-management-api-z77c.onrender.com/artists**](#7-get-artists---retrieve-all-artists): 200, 400, 401
8. [**GET https://enhanced-music-library-management-api-z77c.onrender.com/artists/:id**](#8-get-artistsid---retrieve-an-artist): 200, 401, 403, 404
9. [**POST https://enhanced-music-library-management-api-z77c.onrender.com/artists/add-artist**](#9-post-artistsadd-artist---create-a-new-artist): 201, 400, 401
10. [**PUT https://enhanced-music-library-management-api-z77c.onrender.com/artists/:id**](#10-put-artistsid---update-an-artist): 204, 400, 401, 403, 404
11. [**DELETE https://enhanced-music-library-management-api-z77c.onrender.com/artists/:id**](#11-delete-artistsid---delete-an-artist): 200, 400, 401, 403, 404
12. [**GET https://enhanced-music-library-management-api-z77c.onrender.com/albums**](#12-get-albums---retrieve-all-albums): 200, 400, 401, 403, 404
13. [**GET https://enhanced-music-library-management-api-z77c.onrender.com/albums/:id**](#13-get-albumsid---retrieve-an-album): 200, 401, 403, 404
14. [**POST https://enhanced-music-library-management-api-z77c.onrender.com/albums/add-album**](#14-post-albumsadd-album---create-a-new-album): 201, 400, 401, 403, 400
15. [**PUT https://enhanced-music-library-management-api-z77c.onrender.com/albums/:id**](#15-put-albumsid---update-an-album): 204, 400, 401, 403, 404
16. [**DELETE https://enhanced-music-library-management-api-z77c.onrender.com/albums/:id**](#16-delete-albumsid---delete-an-album): 200, 400, 401, 403, 404
17. [**GET https://enhanced-music-library-management-api-z77c.onrender.com/tracks**](#17-get-tracks---retrieve-all-tracks): 200, 400, 401, 403, 404
18. [**GET https://enhanced-music-library-management-api-z77c.onrender.com/tracks/:id**](#18-get-tracksid---retrieve-a-track): 200, 400, 401, 403, 404
19. [**POST https://enhanced-music-library-management-api-z77c.onrender.com/tracks/add-track**](#19-post-tracksadd-track---create-a-new-track): 201, 400, 401, 403, 404
20. [**PUT https://enhanced-music-library-management-api-z77c.onrender.com/tracks/:id**](#20-put-tracksid---update-a-track): 204, 400, 401, 403, 404
21. [**DELETE https://enhanced-music-library-management-api-z77c.onrender.com/tracks/:id**](#21-delete-tracksid---delete-a-track): 200, 400, 401, 403, 404
22. [**GET https://enhanced-music-library-management-api-z77c.onrender.com/favorites/:category**](#22-get-favoritescategory---retrieve-favorites): 200, 400, 401, 403
23. [**POST https://enhanced-music-library-management-api-z77c.onrender.com/favorites/add-favorite**](#23-post-favoritesadd-favorite---add-a-favorite): 201, 400, 401, 403, 404
24. [**DELETE https://enhanced-music-library-management-api-z77c.onrender.com/favorites/remove-favorite/:id**](#24-delete-favoritesremove-favoriteid---remove-a-favorite): 200, 400, 401, 403, 404

## Endpoints

#### Base URL: `your-hosted-url/api/v1`

### 0. GET /logout - Logout a user

- **Description**: This endpoint is used to logout a user from the system.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/logout
```

#### Responses:

- **a. 200 - User Logged Out Successfully**

```json
{
  "status": 200,
  "data": null,
  "message": "User logged out successfully.",
  "error": null
}
```

- **b. 400 - Bad Request**

```json
{
  "status": 400,
  "data": null,
  "message": "Bad Request",
  "error": null
}
```

### 1. POST /signup - Register a new user

- **Description**: This endpoint is used to register a new user in the system.

#### Request Endpoint:

```http
POST https://enhanced-music-library-management-api-z77c.onrender.com/signup
```

#### Request Body:

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

#### Responses:

- **a. 201 - User Created Successfully**

  ```json
  {
    "status": 201,
    "data": null,
    "message": "User created successfully.",
    "error": null
  }
  ```

- **b. 400 - Bad Request**

  ```json
  {
    "status": 400,
    "data": null,
    "message": "Bad Request, Reason:${Missing Field}",
    "error": null
  }
  ```

- **c. 409 - Email Already Exists**

  ```json
  {
    "status": 409,
    "data": null,
    "message": "Email already exists.",
    "error": null
  }
  ```

### 2. POST /login - Login a user

- **Description**: This endpoint is used to login a user in the system.

#### Request Endpoint:

```http
POST https://enhanced-music-library-management-api-z77c.onrender.com/login
```

#### Request Body:

```json
{
  "email": "admin@example.com",
  "password": "securePassword123"
}
```

#### Responses:

- **a. 200 - User Logged In Successfully**

```json
{
  "status": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful.",
  "error": null
}
```

- **b. 400 - Bad Request**

```json
{
  "status": 400,
  "data": null,
  "message": "Bad Request, Reason:${Missing Field}",
  "error": null
}
```

- **c. 404 - User Not Found**

```json
{
  "status": 404,
  "data": null,
  "message": "User not found.",
  "error": null
}
```

### 3. GET /users - Retrieve All Users

- **Description**: Retrieve a list of all users under the same Admin. This endpoint can only be accessed by the Admin user. Pagination is supported using `limit` and `offset`.

#### Query Parameters:

- `limit` (optional): Number of records to fetch. Default is 5.
- `offset` (optional): Number of records to skip. Default is 0.
- `role` (optional): Filter users by role (`Editor` or `Viewer`).

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/users?limit=5&offset=0&role=Editor
```

or

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/users
```

#### Responses:

- **a. 200 - Users Fetched Successfully**

```json
{
  "status": 200,
  "data": [
    {
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "editor1@example.com",
      "role": "editor",
      "created_at": "2024-12-03T10:00:00Z"
    },
    ...4 more
  ],
  "message": "Users retrieved successfully.",
  "error": null
}
```

- **b. 400 - Bad Request**

```json
{
  "status": 400,
  "data": null,
  "message": "Bad Request",
  "error": null
}
```

- **c. 401 - Unauthorized Access**

```json
{
  "status": 401,
  "data": null,
  "message": "Unauthorized Access",
  "error": null
}
```

### 4. POST /users/add-user - Add a new user

- **Description**: Only the Admin can create new users by providing their email, password, and role. The role cannot be "admin" when creating a new user, and users can only create other users with the "editor" or "viewer" roles.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
POST https://enhanced-music-library-management-api-z77c.onrender.com/users/add-user
```

#### Request Body:

```json
{
  "status": 409,
  "data": null,
  "message": null,
  "error": "Email already exists."
}
```

#### Responses:

- **a. 201 - User Created Successfully**

```json
{
  "status": 201,
  "data": null,
  "message": "User created successfully.",
  "error": null
}
```

- **b. 400 - Bad Request**

```json
{
  "status": 400,
  "data": null,
  "message": "Bad Request",
  "error": null
}
```

- **c. 401 - Unauthorized Access**

```json
{
  "status": 401,
  "data": null,
  "message": "Unauthorized Access",
  "error": null
}
```

- **d. 403 - Forbidden Access**

```json
{
  "status": 403,
  "data": null,
  "message": "Forbidden Access/Operation not allowed.",
  "error": null
}
```

- **e. 409 - Email Already Exists**

```json
{
  "status": 409,
  "data": null,
  "message": "Email already exists.",
  "error": null
}
```

### 5. DELETE /users/:id - Delete a user

- **Description**: Only the Admin can delete a user by providing their user ID.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
DELETE https://enhanced-music-library-management-api-z77c.onrender.com/users/:user_id
```

or

```http
DELETE https://enhanced-music-library-management-api-z77c.onrender.com/users/123e4567-e89b-12d3-a456-426614174000
```

#### Responses:

- **a. 200 - User Deleted Successfully**

```json
{
  "status": 200,
  "data": null,
  "message": "User deleted successfully.",
  "error": null
}
```

```json
{
  "status": 404,
  "data": null,
  "message": "User not found.",
  "error": null
}
```

### 6. PUT /users/update-password - Update user password

- **Description**: The user of any role can update their password by providing the old password and a new password.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
PUT https://enhanced-music-library-management-api-z77c.onrender.com/users/update-password
```

#### Request Body:

```json
{
  "old_password": "oldPassword",
  "new_password": "newPassword"
}
```

#### Responses:

- **a. 204 - Password Updated Successfully**

```json
// No response body
```

or

```
<empty response>
```

### 7. GET /artists - Retrieve All Artists

- **Description**: Retrieve a list of all artists.

You can filter artists by Grammy status, visibility, and control the number of records returned using limit and offset.

#### Query Parameters:

- `limit` : Number of records to fetch. Default is 5.
- `offset` : Number of records to skip. Default is 0.
- `grammy` : Filter artists by number of Grammy awards artist has won(0 or 10).
- `hidden` : Filter artists by visibility status(true or false).

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/artists?limit=5&offset=0&grammy=10&hidden=false
```

or

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/artists
```

#### Responses:

- **a. 200 - Artists Fetched Successfully**

```json
{
  "status": 200,
  "data": [
    {
      "artist_id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Adele",
      "grammy": 5,
      "hidden": false,
    },
    ...4 more
  ],
  "message": "Artists retrieved successfully.",
  "error": null
}
```

### 8. GET /artists/:id - Retrieve an Artist

- **Description**: Retrieve a single artist by providing their artist ID.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/artists/:artist_id
```

or

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/artists/123e4567-e89b-12d3-a456-426614174000
```

#### Responses:

- **a. 200 - Artist Fetched Successfully**

```json
{
  "status": 200,
  "data": {
    "artist_id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Adele",
    "grammy": 5,
    "hidden": false
  },
  "message": "Artist retrieved successfully.",
  "error": null
}
```

### 9. POST /artists/add-artist - Add a new Artist

- **Description**: Add a new artist to the system.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
POST https://enhanced-music-library-management-api-z77c.onrender.com/artists/add-artist
```

#### Request Body:

```json
{
  "name": "Eminem",
  "grammy": 15,
  "hidden": false
}
```

#### Responses:

- **a. 201 - Artist Created Successfully**

```json
{
  "status": 201,
  "data": null,
  "message": "Artist created successfully.",
  "error": null
}
```

### 10. PUT /artists/:id - Update an Artist

- **Description**: Update an artist by providing their artist ID, details such as name, Grammy status, and visibility(hidden).

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
PUT https://enhanced-music-library-management-api-z77c.onrender.com/artists/:artist_id
```

or

```http
PUT https://enhanced-music-library-management-api-z77c.onrender.com/artists/123e4567-e89b-12d3-a456-426614174000
```

#### Request Body:

```json
{
  "name": "Eminem",
  "grammy": 18,
  "hidden": false
}
```

or any of the fields you want to update.

```json
{
  "name": "Eminem (Slim Shady)"
}
```

### 11. DELETE /artists/:id - Delete an Artist

- **Description**: Delete an artist by providing their artist ID.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
DELETE https://enhanced-music-library-management-api-z77c.onrender.com/artists/:artist_id
```

#### Responses:

- **a. 200 - Artist Deleted Successfully**

  ```json
  {
    "status": 200,
    "data": {
      "artist_id": "123e4567-e89b-12d3-a456-426614174000"
    },
    "message": "Artist:${artist_name} deleted successfully.",
    "error": null
  }
  ```

### 12. GET /albums - Retrieve All Albums

- **Description**: Retrieve a list of all albums, can filter the albums by artist and visibility(hidden), and control the number of records returned using limit and offset.

#### Query Parameters:

- `limit` : Number of records to fetch. Default is 5.
- `offset` : Number of records to skip. Default is 0.
- `artist_id` : Filter albums by artist ID.
- `hidden` : Filter albums by visibility status(true or false).

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/albums?limit=5&offset=0&artist_id=123e4567-e89b-12d3-a456-426614174000&hidden=false
```

or

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/albums
```

#### Responses:

- **a. 200 - Albums Fetched Successfully**

```json
{
  "status": 200,
  "data": [
    {
      "album_id": "123e4567-e89b-12d3-a456-426614174000",
      "artist_name": "Eminem",
      "name": "Recovery",
      "year": 2010,
      "hidden": false,
    },
    ...4 more
  ],
  "message": "Albums retrieved successfully.",
  "error": null
}
```

### 13. GET /albums/:id - Retrieve an Album

- **Description**: Retrieve a single album by providing its album ID.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/albums/:album_id
```

or

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/albums/123e4567-e89b-12d3-a456-426614174000
```

#### Responses:

- **a. 200 - Album Fetched Successfully**

```json
{
  "status": 200,
  "data": {
    "album_id": "123e4567-e89b-12d3-a456-426614174000",
    "artist_name": "Eminem",
    "name": "Recovery",
    "year": 2010,
    "hidden": false
  },
  "message": "Album retrieved successfully.",
  "error": null
}
```

### 14. POST /albums/add-album - Add a new Album

- **Description**: Add a new album to the system.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
POST https://enhanced-music-library-management-api-z77c.onrender.com/albums/add-album
```

#### Request Body:

```json
{
  "artist_id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Marshall Mathers LP",
  "year": 2000,
  "hidden": false
}
```

#### Responses:

- **a. 201 - Album Created Successfully**

```json
{
  "status": 201,
  "data": null,
  "message": "Album created successfully.",
  "error": null
}
```

### 15. PUT /albums/:id - Update an Album

- **Description**: Update an album by providing its album ID, details such as name, year, and visibility(hidden).

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
PUT https://enhanced-music-library-management-api-z77c.onrender.com/albums/:album_id
```

or

```http
PUT https://enhanced-music-library-management-api-z77c.onrender.com/albums/123e4567-e89b-12d3-a456-426614174000
```

#### Request Body:

```json
{
  "name": "Marshall Mathers LP 2",
  "year": 2013,
  "hidden": false
}
```

or any of the fields you want to update.

```json
{
  "name": "Marshall Mathers LP 2"
}
```

### 16. DELETE /albums/:id - Delete an Album

- **Description**: Delete an album by providing its album ID.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http

DELETE https://enhanced-music-library-management-api-z77c.onrender.com/albums/:album_id
```

or

```http

DELETE https://enhanced-music-library-management-api-z77c.onrender.com/albums/123e4567-e89b-12d3-a456-426614174000
```

#### Responses:

- **a. 200 - Album Deleted Successfully**

```json
{
  "status": 200,
  "data": null,
  "message": "Album:${album_name} deleted successfully.",
  "error": null
}
```

### 17. GET /tracks - Retrieve All Tracks

- **Description**: Retrieve a list of all tracks, can filter the tracks by artist, album, and visibility(hidden), and control the number of records returned using limit and offset.

#### Query Parameters:

- `limit` : Number of records to fetch. Default is 5.
- `offset` : Number of records to skip. Default is 0.
- `artist_id` : Filter tracks by artist ID.
- `album_id` : Filter tracks by album ID.
- `hidden` : Filter tracks by visibility status(true or false).

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/tracks?limit=5&offset=0&artist_id=123e4567-e89b-12d3-a456-426614174000&album_id=123e4567-e89b-12d3-a456-426614174000&hidden=false
```

or

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/tracks
```

#### Responses:

- **a. 200 - Tracks Fetched Successfully**

```json
{
  "status": 200,
  "data": [
    {
      "track_id": "123e4567-e89b-12d3-a456-426614174000",
      "artist_name": "Eminem",
      "album_name": "Recovery",
      "name": "Not Afraid",
      "duration": 263,
      "hidden": false,
    },
    ...4 more
  ],
  "message": "Tracks retrieved successfully.",
  "error": null
}
```

### 18. GET /tracks/:id - Retrieve a Track

- **Description**: Retrieve a single track by providing its track ID.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/tracks/:track_id
```

or

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/tracks/123e4567-e89b-12d3-a456-426614174000
```

#### Responses:

- **a. 200 - Track Fetched Successfully**

```json
{
  "status": 200,
  "data": {
    "track_id": "123e4567-e89b-12d3-a456-426614174000",
    "artist_name": "Eminem",
    "album_name": "Recovery",
    "name": "Not Afraid",
    "duration": 263,
    "hidden": false
  },
  "message": "Track retrieved successfully.",
  "error": null
}
```

### 19. POST /tracks/add-track - Add a new Track

- **Description**: Add a new track to the system.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
POST https://enhanced-music-library-management-api-z77c.onrender.com/tracks/add-track
```

#### Request Body:

```json
{
  "artist_id": "123e4567-e89b-12d3-a456-426614174000",
  "album_id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Not Afraid",
  "duration": 263,
  "hidden": false
}
```

#### Responses:

- **a. 201 - Track Created Successfully**

```json
{
  "status": 201,
  "data": null,
  "message": "Track created successfully.",
  "error": null
}
```

### 20. PUT /tracks/:id - Update a Track

- **Description**: Update a track by providing its track ID, details such as name, duration, and visibility(hidden).

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
PUT https://enhanced-music-library-management-api-z77c.onrender.com/tracks/:track_id
```

or

```http
PUT https://enhanced-music-library-management-api-z77c.onrender.com/tracks/123e4567-e89b-12d3-a456-426614174000
```

#### Request Body:

```json
{
  "name": "Not Afraid (Explicit)",
  "duration": 263,
  "hidden": false
}
```

or any of the fields you want to update.

```json
{
  "name": "Not Afraid (Explicit)"
}
```

### 21. DELETE /tracks/:id - Delete a Track

- **Description**: Delete a track by providing its track ID.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http

DELETE https://enhanced-music-library-management-api-z77c.onrender.com/tracks/:track_id
```

or

```http
DELETE https://enhanced-music-library-management-api-z77c.onrender.com/tracks/123e4567-e89b-12d3-a456-426614174000
```

#### Responses:

- **a. 200 - Track Deleted Successfully**

```json
{
  "status": 200,
  "data": null,
  "message": "Track:${track_name} deleted successfully.",
  "error": null
}
```

### 22. GET /favorites/:category - Retrieve Favorites

- **Description**: Retrieve the user's favorite items based on the category(artist, album, or track) provided.

#### Query Parameters:

- `category` : Category of favorites to retrieve (artist, album, track).
- `limit` : Number of records to fetch. Default is 5.
- `offset` : Number of records to skip. Default is 0.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/favorites/:category?limit=5&offset=0
```

or

```http
GET https://enhanced-music-library-management-api-z77c.onrender.com/favorites/artist
```

#### Responses:

- **a. 200 - Favorites Fetched Successfully**

```json
{
  "status": 200,
  "data": [
    {
      "favorite_id": "123e4567-e89b-12d3-a456-426614174000",
      "category": "artist",
      "item_id": "123e4567-e89b-12d3-a456-426614174000", // item_id based on category type (artist_id, album_id, track_id)
      "name": "Eminem",
      "created_at": "2024-12-03T10:00:00Z"
    },
    ...4 more
  ],
  "message": "Favorites retrieved successfully.",
  "error": null
}
```

### 23. POST /favorites/add-favorite - Add a Favorite

- **Description**: Add a new favorite item to the user's list.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
POST https://enhanced-music-library-management-api-z77c.onrender.com/favorites/add-favorite
```

#### Request Body:

```json
{
  "category": "artist", // artist, album, track
  "item_id": "123e4567-e89b-12d3-a456-426614174000" // item_id based on category type (artist_id, album_id, track_id)
}
```

#### Responses:

- **a. 201 - Favorite Added Successfully**

```json
{
  "status": 201,
  "data": null,
  "message": "Favorite added successfully.",
  "error": null
}
```

### 24. DELETE /favorites/remove-favorite/:id - Remove a Favorite

- **Description**: Remove a favorite item from the user's list by providing its favorite ID.

#### Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```

#### Request Endpoint:

```http
DELETE https://enhanced-music-library-management-api-z77c.onrender.com/favorites/remove-favorite/:favorite_id
```

or

```http
DELETE https://enhanced-music-library-management-api-z77c.onrender.com/favorites/remove-favorite/123e4567-e89b-12d3-a456-426614174000
```

#### Responses:

- **a. 200 - Favorite Removed Successfully**

```json
{
  "status": 200,
  "data": null,
  "message": "Favorite removed successfully.",
  "error": null
}
```