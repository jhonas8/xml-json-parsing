export const productTypeDefs = `
  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  input CreateProductInput {
    name: String!
    price: Float!
  }

  input UpdateProductInput {
    name: String
    price: Float
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): ID!
  }
`;
