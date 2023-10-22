# Fake Data Generator

This is a React project that is containerized using Docker and served using Nginx.

## Prerequisites

You need to have the following installed to work with this project:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Installation

Clone the repository and navigate to the project directory:

```sh
git clone https://github.com/loujessler/FakeDataGenerator.git
cd FakeDataGenerator
```

## Development

To run the application in development mode, run:

```sh
npm install
npm start
```
After that, open http://localhost:3000 to view the application in your browser.

## Building the Docker Image

To build a Docker image of your application, run the following command:
```sh
docker build -t fakedatagenerator .
```
This command will create a Docker image named fakedatagenerator.

## Running the App in Docker

After building the image, you can run the application in a Docker container using:
```sh
docker run -p 8080:80 fakedatagenerator
```
This command starts a container and maps port 80 inside the container to port 8080 on your host machine.

You can then open http://localhost:8080 in your browser to view the application.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.