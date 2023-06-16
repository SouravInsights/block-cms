export const typeDefs = `#graphql
  type ContentType {
    id: ID!
    name: String!
    api_id: String!
    description: String!
    schema: JSON!
    created_at: Int
    updated_at: Int
    created_by: String!
  }

  type Field {
    id: ID!
    content_type_id: String!
    name: String!
    api_id: String!
    type: JSON!
    field_options: FieldOptions!
  }

  type FieldOptions {
    required: Boolean!
    max_length: String
  }

  type Entry {
    id: ID!
    content_type_id: String!
    field_values: JSON!
    created_at: Int
    updated_at: Int
    created_by: String!
  }

  type Query {
    contentTypes: [ContentType!]!
    fields(contentTypeId: ID!): [Field!]!
    entries(contentTypeId: ID!): [Entry!]!
  }

  type Mutation {
    createEntry(contentTypeId: ID!, fieldValues: JSON!): Entry!
    updateEntry(entryId: ID!, fieldValues: JSON!): Entry!
    deleteEntry(entryId: ID!): Boolean!
  }
`;