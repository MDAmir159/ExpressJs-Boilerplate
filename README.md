
# ExpressJs Boilerplate

A brief description of what this project does and who it's for


## Run Locally

Clone the project

```bash
  git clone https://github.com/MDAmir159/ExpressJs-Boilerplate.git
```

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run devStart
```
Add .env file to root server directory. An example .env file is available named as `.env.example` for understanding. However, you can use it according to your own sysem.
```
API_HOST = localhost
API_USER = root
API_PASSWORD =
API_DATABASE = expressjs_boilerplate
API_CONNECTION_LIMIT = 100
API_PORT = 5000
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
API_EMAIL =
API_EMAIL_PASSWORD =
BASE_LINK = http://localhost:5000
JWT_SECRET_KEY= 
NODE_ENV=development
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```




## API Reference

At first you need to seed info  for the super admin role. This is done by this `POST` request.
#### Seed the empty database

```http
  POST /startUp/seed-data
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Super Admin Email |
| `password` | `string` | **Required**. Super Admin Password |

### User Management
#### User Login

```http
  POST /user/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User Email |
| `password` | `string` | **Required**. User Password |

Upon successful login with HTTP Status code 200(OK)
```
{
    "message": "SUCCESSFULLY LOGGED IN",
    "accessToken": <Bearer Auth Key>
}
```
For wrong credentials will leave this response with 403(FORBIDDEN)
```
{
    "message": "Invalid login credential"
}
```

#### User Sign Up

```HTTP
  POST /user/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** User Email |
| `password` | `string` | **Required** User Password |

Upon successful login with HTTP Status code 201(CREATED)
```
{
    "message": "SUCCESSFULLY LOGGED IN",
    "accessToken": <Bearer Auth Key>
}
```
If the user with this email already exists then we will leave this response with 409(CONFLICT).
```
{
    "message": "USER ALREADY EXISTS"
}
```
#### User Profile Update

```HTTP
  POST /user/update-profile
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userName` | `string` | User Name |
| `name` | `string` | User's full name |
| `email` | `string` | **Required** User email |
| `phoneNumber` | `string` | User's phone number |
| `id` | `string` | **Required** User Id |

Upon successful login with HTTP Status code 200(OK)
```
{
    "message": "Updated Successfully"
}
```
If the user is not found with this email status, this response will be left with 404 (NOT FOUND).
```
{
    "message": "User Not Found"
}
```
If the user's info is not updated with this request, this response will be left with 304 (NOT MODIFIED).
```
{
    "message": "No record is updated"
}
```

#### Delete User

```HTTP
  POST /user/delete
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User Email |

Upon successful deletion with HTTP Status code 200 (OK)
```
{
    "message": "Deleted Successfully"
}
```
If the user is not found with this email sts then will leave this response with 404 (NOT FOUND).
```
{
    "message": "User Not Found"
}
```
If the user's info is not deleted with this request then will leave this response with 304 (NOT MODIFIED).
```
{
    "message": "No record is deleted"
}
```
#### Forgot Password

```HTTP
  POST /user/forgot-password
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** User Email |

Upon successful deletion with HTTP Status code 200 (OK)
```
{
    "message": "message sent"
}
```
#### Update Password

```HTTP
  POST /user/update-password
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** User Email |
| `currentPassword` | `string` | **Required** Current Password |
| `newPassword` | `string` | **Required** New Password |


Upon successful update with HTTP Status code 200 (OK)
```
{
    "message": "Updated Successfully"
}
```
For wrong credentials i.e. current password will leave this response with 403 (FORBIDDEN)
```
{
    "message": "Wrong Credentials are provided"
}
```

### Role Management

#### Create Role (Authorized)
*Super Admin Only*
    

```HTTP
  POST /roles/create-role
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `roleName` | `string` | **Required** Name of new role |


Upon successful update with HTTP Status code 201 (CREATED).
```
{
    "message": "Added role successfully"
}
```
If the role already exists on the database, then it will be a CONFLICT (409).
```
{
    "message": "Role Already exists"
}
```
#### Get All Roles
    

```HTTP
  GET /roles
```

Upon successful request, a response with HTTP Status code 200 (OK).
```
[
    {
        "id": string,
        "name": string,
        "normalizedName": string,
        "isDefault": int,
        "isStatic": int,
        "isPublic": int,
        "entityVersion": int,
        "concurrencyStamp": string
    }
]
```
## Authors

- [MD Amirul Islam](https://www.github.com/MDAmir159)
- [Shihab Ahmed Efty](https://github.com/shihab17)
- [Golam Mostafa Shuvo](https://github.com/Gm-shuvo)



## License

[MIT](https://choosealicense.com/licenses/mit/)

