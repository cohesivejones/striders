# striders
## purpose
display stride sponsee/sponser information using drag and drop tree component.
build application using following microservices 
- bambo integration creating ACL for future implementations
- sponser service for storing sponser/sponsee association data

## setup instructions
1. Install docker
2. Modify BAMBOO_API_KEY in docker-compose.yml to use valid API key.
3. Run `docker-compose up`

## using the app
navigate to http://localhost to tree representation of data.

navigate to http://localhost:4001/sponsers to see sponser data

navigate to http://localhost:4000/people to see employee data
