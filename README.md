<div align="center">

## Blog API

---
## Requirements
 1. Users should have a first_name, last_name, email, password,

 2. A user should be able to sign up and sign in into the blog app

 3. Use JWT as authentication strategy and expire the token after 1 hour

 4. A blog can be in two states; draft and published

 5. Logged in and not logged in users should be able to get a list of published blogs created

 6. Logged in and not logged in users should be able to to get a published blog

 7. Logged in users should be able to create a blog.

 8. When a blog is created, it is in draft state

 9. The owner of the blog should be able to update the state of the blog to published

 10. The owner of a blog should be able to edit the blog in draft or published state

 11. The owner of the blog should be able to delete the blog in draft or published state

 12. The owner of the blog should be able to get a list of their blogs.

 14. The endpoint should be paginated

 15. It should be filterable by state

 16. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.

 17. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated:

      - default it to 20 blogs per page.

      - It should also be searchable by author, title and tags.

       - It should also be orderable by read_count, reading_time and timestamp

 18. When a single blog is requested, the api should return the user information (the author) with the blog. The read_count of the blog too should be updated by 1

 19. Come up with any algorithm for calculating the reading_time of the blog.

 20. Write tests for all endpoints


---
## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)

#### 

#### Install project dependencies

```sh
npm install
```

#### Update .env with [example.env](https://github.com/eddy1759/altschool-exam--blogging_api/blob/main/example.env)

#### Run a development server

```sh
npm run dev
```

#### For testing, run

```sh
npm run test
```

## Models
---

### User
| field  |  data_type | constraints  |
|--------|------------|--------------|
|  firstname | string  |  optional|
|  lastname  |  string |  optional  |
|  email     | string  |  optional |
|  password |   string |  required  |



### Article
| field        | data_type  | constraints                                              |
| ------------ | ---------- | -------------------------------------------------------- |
| title        | string     | required                                                 |
| description  | string     | optional                                                 |
| author       | ref - User | required                                                |
| state        | string     | required, default: 'draft', enum: ['draft', 'published'] |
| read_count   | Number     | default: 0                                               |
| reading_time | String     |                                                          |
| tags         | array      | optional                                                 |
| body         | string     | required                                                 |



## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "firstname": "jon",
  "lastname": "doe",
  "email": "doe@example.com",
  "password": "Password1"
}
```

- Responses

Success
```
{
    status: 'true',
    user: {
        "_id": "6367c296ba7522bd8561ef56v"
        "firstname": "jon",
        "lastname": "doe",
        "email": "doe@example.com",
        "password": "udsafghchjadcb./dk,nksd7dsbndv%$#.v./",
    }
}

```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "username": '"doe@example.com",",
}
```

- Responses

Success
```
{
    token: 'sjlkafjkldsfjsdhnvmjhvgh'
}
```

---
---
### Create a Blog

- Route: /blog
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  article: {
  title: "The giants",
  description: "Fall of the champions",
  tags: "Story, fairy",
  body: "The story of a Jugu hero"
}
```

- Responses

Success
```
{
    created_at: Sun Nov 06 2022 08:35:00 GMT+0100,
    status: true,
    article: { 
       title: "The giants", 
       description: "Fall of the champions", tags: ['Story', 'fairy'],
       body: "The story of a Jugu hero"},
       state: "draft",
       read_Count:0, reading_time:1, 
       author:{
          email: "doe@example.com", 
          "password": "Password1", 
          "firstname": "jon", 
          "lastname": "doe", 
          "username": 'doe@example.com"}
      }
}
```
---
### Get All Published Blogs

- Route: /articles
- Method: GET
- Header
    - Authorization: Bearer {token}
- Query params: 
    - page (default: 0)
    - skip (default: 20)
    - order_by (default: created_at)
    - order (options: asc | desc, default: asc)
    - created_at
- Responses

Success
```
{
    status: true,
    article: [{ 
       title: "The giants", 
       description: "Fall of the champions", tags: ['Story', 'fairy'],
       body: "The story of a Jugu hero"},
       state:"published"
       read_Count:0, reading_time:1, 
       author:{
          email: "doe@example.com", 
          "password": "Password1", 
          "firstname": "jon", 
          "lastname": "doe", 
          "username": 'doe@example.com"}
      }
  }]
}
```
---

### Get All Blogs for a User
- Route: /articles/user/:userID
- Method: GET
- Header
    - Authorization: Bearer {token}
- Query params:
    - page (default: 0)
    - skip (default: 20)
    - order_by (default: created_at)
    - state (default: published)
- Responses

Success
```
{
    status: true,
    article: [{ 
       title: "The giants", 
       description: "Fall of the champions", tags: ['Story', 'fairy'],
       body: "The story of a Jugu hero"},
       state:"published"
       read_Count:0, reading_time:1, 
       author:{
          email: "doe@example.com", 
          "password": "Password1", 
          "firstname": "jon", 
          "lastname": "doe", 
          "username": 'doe@example.com"}
      }
  }]
}
```
---

### Get a blog
- Route: /articles/:articleID
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    status: true,
    article: { 
       title: "The giants", 
       description: "Fall of the champions", tags: ['Story', 'fairy'],
       body: "The story of a Jugu hero"},
       state:'published'
       read_Count:0, 
       reading_time:1, 
       author:{
          email: "doe@example.com", 
          "password": "Password1", 
          "firstname": "jon", 
          "lastname": "doe", 
          "username": 'doe@example.com"}
      }
  }
}
```
---
### Update a blog

- Route: /articles/articleID
- Method: PUT
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  title: "The updated giants",
}
```

- Responses

Success
```
{
    created_at: Sun Nov 06 2022 08:35:00 GMT+0100,
    status: true,
    article: { 
       title: "The updated giants", 
       description: "Fall of the champions", tags: ['Story', 'fairy'],
       body: "The story of a Jugu hero"},
       state: "draft",
       read_Count:0, reading_time:1, 
       author:{
          email: "doe@example.com", 
          "password": "Password1", 
          "firstname": "jon", 
          "lastname": "doe", 
          "username": 'doe@example.com"}
      }
}
```
---

### Update the state

- Route: /articles/articleID
- Method: PATCH
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
  state: "published",
}
```

- Responses

Success
```
{
    created_at: Sun Nov 06 2022 08:35:00 GMT+0100,
    status: true,
    article: { 
       title: "The updated giants", 
       description: "Fall of the champions", tags: ['Story', 'fairy'],
       body: "The story of a Jugu hero"},
       state: "published",
       read_Count:0, reading_time:1, 
       author:{
          email: "doe@example.com", 
          "password": "Password1", 
          "firstname": "jon", 
          "lastname": "doe", 
          "username": 'doe@example.com"}
      }
}
```
---
### Delete a blog

- Route: /articles/:articleID
- Method: GET
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    msg: "article deleted successfully",
    article: { 
       title: "The updated giants", 
       description: "Fall of the champions", tags: ['Story', 'fairy'],
       body: "The story of a Jugu hero"},
       state: "published",
       read_Count:0, reading_time:1, 
       author:{
          email: "doe@example.com", 
          "password": "Password1", 
          "firstname": "jon", 
          "lastname": "doe", 
          "username": 'doe@example.com"}
      }
}
```
---


