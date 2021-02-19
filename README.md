This is a backend project for a React chat webpage (https://github.com/mabopoi/chat-react).

## Used tools

- Mongoose
- PassportJs
- Socket.io

## Requirements

- NodeJS
- MongoDB

# Installation

    git clone https://github.com/mabopoi/chat-backend-node
    npm install

## Setup .env file

    ORIGIN
    PORT

    #Database
    MONGO_URL

    #Cookie
    COOKIE_SECRET

## Running development environment

    npm run dev

## Running production environment with Docker

    docker-compose up -d --build

### Then you can start fetching http://localhost:PORT !
