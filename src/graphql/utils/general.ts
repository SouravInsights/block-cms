const generateGraphQLTypeDefs = (schema: any) => {
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
