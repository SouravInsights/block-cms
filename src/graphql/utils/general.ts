import { makeExecutableSchema, addResolversToSchema } from '@graphql-tools/schema';

export const generateGqlTypeDefs = (schema: any) => {
  const fields = Object.entries(schema).map(([fieldName, fieldData]) => {
    console.log(schema);
    const { type, required } = fieldData;
    return `${fieldName}: ${type}${required ? '!' : ''}`;
  });

  return gql`
    type ${schema.name} {
      ${fields.join('\n')}
    }

    type Query {
      ${schema.api_id}: ${schema.name}
    }

    type Mutation {
      create${schema.name}(${schema.name.toLowerCase()}: ${schema.name}Input): ${schema.name}
    }

    input ${schema.name}Input {
      ${fields.join('\n')}
    }
  `;
};

export function generateGqlSchema(polybaseSchema: string): string {
  // Input validation: Ensure polybaseSchema is a string
  if (typeof polybaseSchema !== 'string') {
    throw new Error('Polybase schema must be a string');
  }

  // Extract collection name using regex
  const collectionName = polybaseSchema.match(/collection (\w+)/)?.[1];

  // Input validation: Ensure collectionName is present
  if (!collectionName) {
    throw new Error('Invalid Polybase schema: Missing collection name');
  }

  /* 
    - Extract fields using regex and matchAll
    - Uses a regular expression to match and extract all 
    occurrences of fields in the Polybase schema
  */
  const fieldsMatch = polybaseSchema.match(/(\w+): (\w+);/g) || [];
  const fields = fieldsMatch.map((field: string) => {
    /* Removes the semicolon from the field declaration and splits it into 
      an array containing the field name and type. 
    */
    const [name, type] = field.replace(';', '').split(': ');
    return { name, type };
  });

  /* Generate GraphQL type definitions 
    It iiterates over the extracted fields and generates the corresponding GraphQL 
    field definitions based on the field names and types. The switch statement maps Polybase 
    types to GraphQL types.
  */
  const typeDefs = `type ${collectionName} {\n${fields
    .map((field: any) => {
      // Input validation: Ensure field name and type are present
      if (!field.name || !field.type) {
        throw new Error('Invalid Polybase schema: Missing field name or type');
      }
      let gqlType;
      switch (field.type) {
        case 'string':
          gqlType = 'String';
          break;
        case 'number':
          gqlType = 'Int';
          break;
        case 'boolean':
          gqlType = 'Boolean';
          break;
        case 'bytes':
          gqlType = 'String'; // Assuming bytes are represented as strings in GraphQL
          break;
        case 'PublicKey':
          gqlType = 'String'; // Assuming PublicKey is represented as string in GraphQL
          break;
        default:
          gqlType = field.type; // For custom types like 'Author'
      }
      return `  ${field.name}: ${gqlType}`;
    })
    .join('\n')}\n}`;

  return typeDefs;
}

// Utility function to generate resolvers for a GraphQL schema
interface Type {
  schema: string;
}

interface Field {
  name: string;
  type: string;
}

const getFieldDefinitions = (schema: string): Field[] => {
  const fieldRegex = /(\w+): (\w+)!/g;
  const matches = schema.matchAll(fieldRegex);
  const fields: Field[] = Array.from(matches, ([, name, type]) => ({ name, type }));
  return fields;
};

const getTypeRelationships = (schema: string): string[] => {
  const relationshipRegex = /@refersTo\((\w+)\)/g;
  const matches = schema.matchAll(relationshipRegex);
  const relationships: string[] = Array.from(matches, ([, typeName]) => typeName);
  return relationships;
};

export const generateGqlResolvers = (type: Type): any => {
  const typeName = type.schema.match(/type (\w+)/)?.[1];
  if (!typeName) {
    throw new Error('Invalid schema type: Missing type name');
  }

  const queryTypeName = 'Query';
  const mutationTypeName = 'Mutation';

  const fields = getFieldDefinitions(type.schema);
  const relationships = getTypeRelationships(type.schema);

  const createInputTypeName = `Create${typeName}Input`;
  const updateInputTypeName = `Update${typeName}Input`;

  const filteredFields = fields.filter(field => field.name !== 'id');

  const typeDefs = `
    type ${typeName} {
      ${filteredFields.map(field => `${field.name}: ${field.type}`).join('\n')}
    }

    type ${queryTypeName} {
      ${typeName.toLowerCase()}: ${typeName}
    }

    type ${mutationTypeName} {
      create${typeName}(input: ${createInputTypeName}): ${typeName}
      update${typeName}(input: ${updateInputTypeName}): ${typeName}
      delete${typeName}(id: ID!): Boolean
    }

    input ${createInputTypeName} {
      ${filteredFields.map(field => `${field.name}: ${field.type}`).join('\n')}
    }

    input ${updateInputTypeName} {
      id: ID!
      ${filteredFields.map(field => `${field.name}: ${field.type}`).join('\n')}
    }
  `;

  const resolvers = {
    Query: {
      [typeName.toLowerCase()]: () => {
        // Implement your logic to fetch data for the specific type here
        // Return the data based on the query
      },
    },
    Mutation: {
      [`create${typeName}`]: (_, args) => {
        // Implement your logic to create a new item of the specific type here
        // Access the input arguments from the `args` parameter
        // Return the created item
        return {};
      },
      [`update${typeName}`]: (_, args) => {
        // Implement your logic to update an existing item of the specific type here
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
    },
  };

  const executableSchema = makeExecutableSchema({ typeDefs: [typeDefs] });
  const schemaWithResolvers = addResolversToSchema({
    schema: executableSchema,
    resolvers,
  });

  return schemaWithResolvers;
};
