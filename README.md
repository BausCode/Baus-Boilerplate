GitBaus-Client
------

This client side application for interacting with GitBaus.

## Requirements
Recommended use with docker and build should handle dependencies
* [Docker and Docker Machine](https://docs.docker.com/machine/install-machine/)
Without Docker:
* [Node.js v5](https://nodejs.org/en/download/)


## Quickstart
* `docker build -t gitbaus-client:{version} .`
* `docker run -it -v $(pwd):/var/www/app gitbaus-client:{version}`
