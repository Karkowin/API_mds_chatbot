# API MDS CHATBOT

This repository contains an Express.js API that is designed to be run with Docker. It aim to chat with a chatbot and to store the conversation in a database.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Requirements

- Docker
- Docker Compose

## Installation

1. Clone this repository:

```bash
git clone https://github.com/Karkowin/API_mds_chatbot.git
```

2. Navigate to the project directory:

```bash
cd API_mds_chatbot
```

3. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

4. Edit the `.env` file and set the required variables (see [Configuration](#configuration)).

5. Start the API:

```bash
docker compose up -d
```

## Usage

The API is now running on port 3000. You can acces the documentation on [http://localhost:3000/api-docs] (endpoints list made with copilot so it's not perfect).

There i also an Insomnia collection in the repository to test the API.

## Configuration

The `.env` file contains the following variables:

- `MYSQL_HOST`: The hostname of the MySQL server.
- `MYSQL_ROOT_PASSWORD`: The password of the MySQL root user.
- `MYSQL_DATABASE`: The name of the MySQL database.
- `MYSQL_USER`: The name of the MySQL user.
- `MYSQL_PASSWORD`: The password of the MySQL user.
- `SERVER_PORT`: The port on which the API will run.
- `SECRET`: The secret key used to sign the JWT tokens.

You can customize other variables according to your requirements.
