import { map, filter } from 'lodash';
import { makeExecutableSchema, addResolversToSchema } from '@graphql-tools/schema';

// Utility function to generate resolvers for a GraphQL schema

interface Field {
  name: string;
  type: string;
}

const getFieldDefinitions = (schema: string): Field[] => {
  const fieldRegex = /(\w+): (\[?(\w+!?)+\]?[!]?)/g;
  const matches = schema.matchAll(fieldRegex);
  return Array.from(matches, ([, name, type]) => ({ name, type }));
};

export const generateGqlResolvers = (schema: string): any => {
  const resolvers: any = {};

  const types = schema.split('type ').slice(1);
  const typeDefs = map(types, (type) => {
    const [typeNameWithSpace, typeSchema] = type.trim().split('{');
    const typeName = typeNameWithSpace.replace(/\s/g, '');
    if (!typeName) {
      throw new Error('Invalid schema type: Missing type name');
    }

    const fields = getFieldDefinitions(typeSchema);
    console.log('fields:', fields);
    const filteredFields = filter(fields, (field) => field.name !== 'id');
    console.log('filteredFields:', filteredFields);

    const inputTypeFields = filteredFields
    .map((field) => {
      const fieldType = field.type.replace(/[\[\]!]/g, '');
      return generateInputType(field.name, fieldType);
    })
    .join('\n');

    console.log('inputTypeFields:', inputTypeFields);
    
    const queryTypeName = 'Query';
    const mutationTypeName = 'Mutation';
    
    const typeDef = `
      type ${typeName} {
        ${filteredFields.map((field) => `${field.name}: ${field.type}`).join('\n')}
      }
    
      type ${queryTypeName} {
        ${typeName.toLowerCase()}: ${typeName}
      }
    
      type ${mutationTypeName} {
        create${typeName}(input: ${typeName}Input!): ${typeName}
        update${typeName}(id: ID!, input: ${typeName}Input!): ${typeName}
        delete${typeName}(id: ID!): Boolean
      }
    
      input ${typeName}Input {
        ${inputTypeFields}
      }
    `;

    resolvers[queryTypeName] = {
      ...(resolvers[queryTypeName] || {}),
      [typeName.toLowerCase()]: () => {
        // Implement logic to fetch data for the specific type here
        // Return the data based on the query
      },
    };
    
    resolvers[mutationTypeName] = {
      ...(resolvers[mutationTypeName] || {}),
      [`create${typeName}`]: (_, args) => {
        // Implement logic to create a new item of the specific type here
        // Access the input arguments from the `args` parameter
        // Return the created item
        return {};
      },
      [`update${typeName}`]: (_, args) => {
        // Implement logic to update an existing item of the specific type here
        // Access the input arguments from the `args` parameter
        // Return the updated item
        return {};
      },
      [`delete${typeName}`]: (_, args) => {
        // Implement your logic to delete an item of the specific type here
        // Access the input arguments from the `args` parameter
        // Return a success message or boolean indicating the deletion status
        return true;
      },
    };    

    return typeDef;
  });

  const typeDefsString = typeDefs.join('\n');
  console.log('typeDefsString:', typeDefsString);

  const executableSchema = makeExecutableSchema({ typeDefs: typeDefsString });
  const schemaWithResolvers = addResolversToSchema({
    schema: executableSchema,
    resolvers,
  });

  return schemaWithResolvers;
};

const generateInputType = (fieldName: string, fieldType: string): string => {
  if (fieldType.endsWith('!')) {
    fieldType = fieldType.slice(0, -1);
  }

  if (fieldType.startsWith('[') && fieldType.endsWith(']')) {
    const innerType = fieldType.slice(1, -1);
    const nestedInputType = generateInputType(fieldName, innerType);
    return `[${nestedInputType}]`;
  }

  return `${fieldName}: ${fieldType}Input`;
};

const sampleSchema = `
  type Author {
    name: String!
    bio: String!
    posts: [Post!]!
  }

  type Query {
    author: Author
  }

  type Mutation {
    createAuthor(input: AuthorInput!): Author
    updateAuthor(id: ID!, input: AuthorInput!): Author
    deleteAuthor(id: ID!): Boolean
  }

  input AuthorInput {
    name: String
    bio: String
    posts: PostInput
  }


  type Post {
    title: String!
    content: String!
    author: Author!
  }

  type Query {
    post: Post
  }

  type Mutation {
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Boolean
  }

  input PostInput {
    title: String
    content: String
    author: AuthorInput
  }
`