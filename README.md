# Graphbook
An app using React, GraphQL and node.js.

## How to run server
Run client only: `npm run client`
Run client + server: `npm run server`

## Install dependencies
### React and react-dom
```
npm install --save react react-dom
```

### Webpack
Module boundler
```
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react clean-webpack-plugin css-loader file-loader html-webpack-plugin style-loader url-loader webpack webpack-cli webpack-dev-server
```

### React Helmet
For overriding multiple headers and server-side rendering
```
npm install --save react-helmet
```

### MiniCss
To bundle css files
```
npm install --save-dev mini-css-extract-plugin
```

### Chrome Extension
Search in chrome web store: React Developer Tools

### Express
Web server
```
npm install --save express
```

### Nodemon
Restart server when source changes
```
npm install --save nodemon
```

### Babel
```
npm install --save-dev @babel/node
```

### Middlewares
compression - compress and save user bandwidth
cors - Middleware for cross origin source sharing
helmet - allow to set HTTP headers for security
```
npm install --save compression cors helmet
```

### winston
Dependency for logging
```
npm install --save winston
```

### Sequelize
Sequelize is an ORM for Node.js. It supports the PostgreSQL, MySQL, SQLite, and MSSQL standards.
```
npm install --save sequelize
npm install --save pg pg-hstore
```

### sequelize-cli
To generate db models.
```
npm install -g sequelize-cli
```

### Babel hook
```
npm install --save-dev babel-plugin-require-context-hook
```

## Graphql queries
### Query posts
```
curl --location --request POST 'http://localhost:8000/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"{\n    posts {\n        id\n        text\n        user {\n            avatar\n            username\n        }\n\n    }\n}","variables":{}}'
```

#### Mutation - add post
```
curl --location --request POST 'http://localhost:8000/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"mutation addPost($post : PostInput!, $user: UserInput!) {\n    addPost(post : $post, user: $user) {\n      id\n      text\n      user {\n        username\n        avatar\n      }\n    }\n  }\n  ","variables":{"post":{"text":"You just added a post."},"user":{"avatar":"/uploads/avatar3.png","username":"Fake User"}}}'
```

## sequelize commands
### Generate models
```
sequelize model:generate --models-path src/server/models --migrations-path src/server/migrations --name Post --attributes text:text
```
### Create models in database:
```
sequelize db:migrate --migrations-path src/server/migrations --config src/server/config/index.js
```
### Create seeds to fill empty database table with fake data
```
sequelize seed:generate --name fake-posts --seeders-path src/server/seeders
```
### Execute seeds
```
sequelize db:seed:all --seeders-path src/server/seeders --config src/server/config/index.js
```

## Env variables - required
- `NODE_ENV`: `poduction` or `development`

### Env setup
open envs file:
```
open ~/.bash_profile
```
set value:
```
export name="value"
```
apply changes:
```
source ~/.bash_profile
```

## References
- Book: Full-Stack Web Development with GraphQL and React - Second Edition, by Sebastian Grebe
