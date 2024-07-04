# FoodTrucks

[![Watch the video](https://i.sstatic.net/Vp2cE.png)](https://www.loom.com/share/c4a84ae0cb6044fcb57e5b04169d6197?sid=076a11fb-8b03-468d-b539-28d811c849fa)

> ## Resources

- Docker
- Docker Compose
- Node v18
- Typescript
- Apollo Server
- PostgreSQL
- GraphQL
- Vitest
- React
- Material UI
- Leaflet

> ## Local Dependencies

- Docker
- Docker Compose
- Node v18

> ## Available Scripts

In the project backend directory, you can run:

### `npm install`

Install the dependencies listed on `package.json` file

### `npm start`

In the project frontend directory, you can run:

### `npm install`

Install the dependencies listed on `package.json` file

### `npm run dev`

> ## Tests

To run the tests, execute the following command in the root of the frontend project:

```
npm run test
```

> ## Considerations

Given the time constraints, I aimed to follow best practices for scalability and to demonstrate my knowledge.

In the backend, I implemented some robust configurations, adapting the CSV data reading for batch processing with the potential to handle massive amounts of data. Additionally, I added a routine to update the database daily using a Cronjob.

In the frontend, I worked with stateless components, keeping the logic separate from the UI.

I chose to use GraphQL with Apollo for better typing and to have well-implemented loading and error handling in the frontend.

> ## ToDo

###### Backend

- Implement tests in the backend;
- Add a caching layer with TTL (Redis) to optimize backend queries;
- Configure a logger in the application (Sentry, Datadog);
- Fetch more detailed information from the data source;

###### Frontend

- Move configurations to environment variables;
- Add search functionality by name and food type;
- UI improvements;
- Integration tests (Playwright)
