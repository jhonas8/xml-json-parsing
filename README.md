# XML-JSON Parsing Project

This project fetches vehicle data from the NHTSA vPIC API, stores it in a MongoDB database, and provides both GraphQL and REST APIs to access the data.

## Technology Stack

- Node.js
- TypeScript
- Express.js
- MongoDB
- GraphQL (with Apollo Server)
- Axios for HTTP requests
- Docker

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.4 or later)
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/jhonas8/xml-json-parsing.git
   cd xml-json-parsing
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/vehicle_data
   ```

4. Run the database migration:
   ```
   npm run migrate
   ```

5. Start the server:
   ```
   npm start
   ```

## Running with docker-compose
1. Spin up the whole application:
    ```
    docker-compose -f ./docker-compose.yaml up
    ```

The server should now be running on `http://localhost:3000`.

## API Endpoints

- GraphQL API: `http://localhost:3000/graphql`
- REST API: `http://localhost:3000/rest`
- Private GraphQL API: `http://localhost:3000/graphql-private`

## Running Tests

To run the unit tests:
    ```
    yarn test
    ```

### REST Endpoints

1. Fetch vehicle data by makeId:
   
   GET `http://localhost:3000/rest/vehicle/{makeId}`

   Example: `http://localhost:3000/rest/vehicle/440`

### Comparison: Fetching Make by MakeId

1. Using GraphQL:
   
   Endpoint: `http://localhost:3000/graphql`
   
   Query:
   ```graphql
   query {
     vehicleDataByMakeId(makeId: "440") {
       makeId
       makeName
       vehicleTypes {
         typeId
         typeName
       }
     }
   }
   ```

2. Using REST:
   
   Endpoint: `http://localhost:3000/rest/vehicle/440`

Both methods will return the same data structure for the specified make.
