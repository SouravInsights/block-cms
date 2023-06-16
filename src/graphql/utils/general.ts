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
  // Extract collection name
  const collectionName = polybaseSchema.match(/collection (\w+)/)?.[1];

  // Extract fields
  const fields = (polybaseSchema.match(/(\w+): (\w+);/g) || [])
    .map((field: string) => {
      const [name, type] = field.replace(';', '').split(': ');
      return { name, type };
    });

  // Generate GraphQL types
  const typeDefs = `type ${collectionName} {\n${fields
    .map((field: any) => {
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