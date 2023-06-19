import { map, filter, reduce, camelCase } from 'lodash';
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

interface Field {
  name: string;
  type: string;
}

/* 
  The getFieldDefinitions function takes a schema string as input and returns an array of Field objects. 
  Here's how it works:

    1. The function starts by defining a regular expression pattern using the fieldRegex variable. The 
    pattern (\w+): (\w+)! captures two groups: the field name and the field type.

      - (\w+) matches one or more word characters (alphanumeric characters and underscores) and captures them as 
        the field name.
      - : matches a colon character.
      - (\w+) matches one or more word characters and captures them as the field type.
      - ! matches an exclamation mark, indicating that the field is non-nullable.

    2. The function uses the matchAll method of the schema string to find all matches of the fieldRegex pattern. 
    This method returns an iterator of match results.

    3. The Array.from function is used to convert the iterator into an array. For each match, the callback function 
    ([, name, type]) => ({ name, type }) is executed, which extracts the captured name and type values and creates 
    a new Field object with those values.

    4. Finally, the function returns the array of Field objects.

  The purpose of the getFieldDefinitions function is to extract the field definitions from a given schema string. 
  It uses regular expressions to find matches for field names and types in the schema and creates an array of 
  Field objects that represent the extracted information.
*/

const getFieldDefinitions = (schema: string): Field[] => {
  const fieldRegex = /(\w+): (\w+)!/g;
  const matches = schema.matchAll(fieldRegex);
  return Array.from(matches, ([, name, type]) => ({ name, type }));
};

const getTypeRelationships = (schema: string): string[] => {

  /* Regular expression to match field definitions in the schema
    This regex captures field definitions of the form "fieldName: fieldType"
    where the fieldType can be a scalar type, list type, non-null type, or a combination of them
  */
  const relationshipRegex = /(\w+): (\[?(\w+!?)+\]?[!]?)/g;

  /* Matches array stores the extracted relationship types
    - The `matches` array is obtained by executing the regex pattern on the schema string using `schema.matchAll(relationshipRegex)`.
    - The `matchAll` method returns an iterator containing all the matches found in the schema string based on the provided regex pattern.
    - Each match is represented as an array with the full match as the first element,
      followed by capture group matches defined in the regex pattern.
    - In this case, the capture group only captures the type portion of the field definition.
    - By using destructuring assignment with an empty first element, [, , type],
    - we extract the type from each match and store it in the `matches` array.

  For example if we have a schema that looks like this:
  const schema = `
    type Author {
      id: ID!
      name: String!
      bio: String!
      posts: [Post!]!
    }

    type Post {
      id: ID!
      title: String!
      content: String!
      author: Author!
    }
  `; 

  The matches variable will store the extracted relationship types like this: 

  [
    '[Post!]!', // The "posts" field in Author type (list of non-null Post)
    'Author!'   // The "author" field in Post type (non-null Author)
  ]
  */
  const matches = Array.from(schema.matchAll(relationshipRegex), ([, , type]) => type);
  
  /* The `relationships` array is constructed by iterating over each element in the `matches`
    array using the `map` method. The type represents each extracted relationship type from the field definitions.

    Inside the `map` callback function, we perform the following steps:

    1. Determine if the relationship type is a list type:
      - We check if the `type` starts with `[` and ends with `]` using the `startsWith` and `endsWith` methods.
      - If it satisfies both conditions, then it indicates a list type.
    2. Determine if the relationship type is non-null:
      - We check if the `type` ends with `!` using the `endsWith` method.
      - If it ends with !, then it indicates a non-null type.
    3. Extract the type name:
      - We remove any square brackets `[ ]` and exclamation marks `!` from the `type` using the `replace` method. 
      This gives us the actual type name.
    4. Construct the relationship type string:
      - Based on the conditions determined in steps 1 and 2, we append appropriate symbols to the `typeName`.
      - If it's a list type, we append `[]` to indicate it.
      - If it's a non-null type, we append `!` to indicate it.
    5. Return the constructed relationship type.

    The `map` function iterates over each extracted `type` in the `matches` array, performs the steps outlined 
    above, and constructs the corresponding `relationship` type string. The resulting relationship types are stored 
    in the relationships array, which is then returned by the `getTypeRelationships` function.   
  */
 
  const relationships = matches.map((type) => {
    const isList = type.startsWith('[') && type.endsWith(']');
    const isNonNull = type.endsWith('!');
    const typeName = type.replace(/[\[\]!]/g, '');
      // Exclude scalar types
      if (typeName !== 'String' && typeName !== 'Int' && typeName !== 'Float' && typeName !== 'Boolean' && typeName !== 'ID') {
        return `${typeName}${isList ? '[]' : ''}${isNonNull ? '!' : ''}`;
      }
    });
  
  // Remove undefined values
  const filteredRelationships = relationships.filter((relationship): relationship is string => typeof relationship === 'string');
  return filteredRelationships; 
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

    const queryTypeName = 'Query';
    const mutationTypeName = 'Mutation';

    const fields = getFieldDefinitions(typeSchema);
    const relationships = getTypeRelationships(typeSchema);
    const relatedTypes = relationships.filter((relationship) =>
      types.some((t) => t.includes(relationship))
    );

    const filteredFields = filter(fields, (field) => field.name !== 'id');

    const relatedFields = relatedTypes.map((relatedType) => {
      const fieldName = camelCase(relatedType);
      return `${fieldName}: ${relatedType}`;
    });

    // const inputTypeFields = filteredFields.map((field) => `${field.name}: ${field.type}`).join('\n');
    // const createInputFields = `
    //   ${inputTypeFields}
    //   ${relatedTypes.map((relatedType) => {
    //     const fieldName = camelCase(relatedType);
    //     const inputTypeName = `Create${relatedType.replace(/!/g, '')}Input`;
    //     return `${fieldName}: ${inputTypeName}`;
    //   }).join('\n')}
    // `;
    // const updateInputFields = `
    //   id: ID!
    //   ${inputTypeFields}
    //   ${relatedTypes.map((relatedType) => {
    //     const fieldName = camelCase(relatedType);
    //     const inputTypeName = `Create${relatedType.replace(/!/g, '')}Input`;
    //     return `${fieldName}: ${inputTypeName}`;
    //   }).join('\n')}
    // `;

    const inputTypeFields = filteredFields.map((field) => `${field.name}: ${field.type}`).join('\n');
    const createInputFields = `
      ${inputTypeFields}
      ${relatedTypes.map((relatedType) => {
        const fieldName = camelCase(relatedType);
        const inputTypeName = `${relatedType.replace(/!/g, '')}Input`;
        return `${fieldName}: ${inputTypeName}`;
      }).join('\n')}
    `;
    const updateInputFields = `
      id: ID!
      ${inputTypeFields}
      ${relatedTypes.map((relatedType) => {
        const fieldName = camelCase(relatedType);
        const inputTypeName = `${relatedType.replace(/!/g, '')}Input`;
        return `${fieldName}: ${inputTypeName}`;
      }).join('\n')}
    `;

    console.log('createInputFields modified:', createInputFields);
    console.log('updateInputFields modified:', updateInputFields);

    const createInputTypeName = `${typeName}Input`;
    const updateInputTypeName = `${typeName}Input`;

    const typeDef = `
      type ${typeName} {
        ${map(filteredFields, (field) => `${field.name}: ${field.type}`).join('\n')}
        ${relatedFields.join('\n')}
      }

      type ${queryTypeName} {
        ${typeName.toLowerCase()}: ${typeName}
      }

      type ${mutationTypeName} {
        create${typeName}(input: ${createInputTypeName}!): ${typeName}
        update${typeName}(id: ID!, input: ${updateInputTypeName}!): ${typeName}
        delete${typeName}(id: ID!): Boolean
      }

      input ${createInputTypeName} {
        ${createInputFields}
      }

      input ${updateInputTypeName} {
        ${updateInputFields}
      }
    `;

    const typeResolvers = reduce(
      relationships,
      (acc, relationship) => {
        return {
          ...acc,
          [relationship]: () => {
            // Implement logic to fetch the related data for the specific relationship here
            // Return the related data based on the query
          },
        };
      },
      {}
    );

    resolvers[typeName] = {
      ...typeResolvers,
    };

    resolvers.Query = {
      ...(resolvers.Query || {}),
      [typeName.toLowerCase()]: () => {
        // Implement logic to fetch data for the specific type here
        // Return the data based on the query
      },
    };

    resolvers.Mutation = {
      ...(resolvers.Mutation || {}),
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
