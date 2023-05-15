# Field Support for Batteries

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run tests:

```bash
npm run test
# or
yarn test
```

## Technologies Used

- React
- Next.js
- Tailwind CSS
- TypeScript
- Ant Design (Antd)
- Jest
- eslint-config-airbnb

### React

React was chosen for its declarative programming model, which can make it easier to build complex UI components and manage state in our application.

### Next.js

Next.js was chosen for its built-in support for server-side rendering, static site generation, and automatic code splitting, which can help improve the performance and SEO of our application.

### Tailwind CSS

Tailwind CSS was chosen for for its utility-first approach to styling, which can help us write less CSS code and be more productive. Its pre-defined classes and responsive design system can also make it easier to create a consistent and responsive UI.

### TypeScript

TypeScript was chosen to add static type checking to our JavaScript code, which can help catch errors at compile time and improve the reliability of our code. Its better tooling support and IDE integration can also enhance our development workflow.

### Ant Design

Ant Design  was chosen for its wide range of pre-built UI components that can help us quickly build a professional-looking UI without having to create each component from scratch.

### Jest

Jest was chosen as testing framework for its simplicity and ease of use. Its built-in support for snapshot testing, mocking, and code coverage can also help us write reliable tests for our code.

### eslint-config-airbnb

eslint-config-airbnb was chosen as ESLint configuration for its strict adherence to a widely-used coding style guide, which can help enforce consistency and readability across our codebase. Its support for advanced ES6 features and React-specific linting rules can also help us catch common coding mistakes and improve the quality of our code.

## Cutted scope

- E2E tests, integration tests
- Unit tests coverage 100%
- More flexible list components, render props
- Optimization with data aggregation, cache/memoization
- Move aggregation to backend or backend for frontend

### E2E tests, integration tests

For E2E and integration testing, we may want to consider using a testing framework like Cypress or Selenium. These frameworks allow us to automate interactions between different parts of our application and test the end-to-end functionality of our application. We can also integrate these tests into our CI/CD pipeline to ensure that our application is functioning correctly in different environments.

### Unit tests coverage 100%

To achieve 100% unit test coverage, we can write additional unit tests for our code to ensure that each function, component, and module is tested thoroughly.

### More flexible list components, render props

To make our list components more flexible, we may want to consider using render props to abstract away the implementation details of our components. This can help us create more reusable and composable components that can be easily customized for dif
ferent use cases.

### Optimization with data aggregation, cache/memoization

To optimize our application with memoization and caching, we can use techniques like memoization and caching to reduce the number of computations. Memoization can help us avoid recomputing the same data multiple times, while caching can help us store frequently accessed data in memory.

### Move aggregation to backend or backend for frontend

Moving aggregation to the backend or implementing a Backend for Frontend (BFF) architecture can help optimize our application performance by reducing the amount of data transferred between the frontend and backend. This approach involves moving the logic that aggregates and manipulates data from the frontend to the backend, where it can be performed more efficiently.
We can use framework like Express.js or a serverless architecture like AWS Lambda.
