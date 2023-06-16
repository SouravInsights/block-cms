export const generateGraphQLTypeDefs = (schema: any) => {
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

export function generateGraphQLSchema(polybaseSchema: string): string {
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