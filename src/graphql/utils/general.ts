import { map, filter, reduce, camelCase, flatMap } from 'lodash';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
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

export function isCustomObjectType(type: any): boolean {
  if (type.ofType) {
    return isCustomObjectType(type.ofType);
  }

  return type.constructor.name !== 'GraphQLScalarType';
}

export function filterCustomObjectFields(schema: GraphQLSchema): string[] {
  return flatMap(schema.getTypeMap(), (type) => {
    if (type instanceof GraphQLObjectType) {
      return Object.keys(type.getFields())
        .filter((fieldName) => {
          const fieldType = type.getFields()[fieldName].type;
          return isCustomObjectType(fieldType);
        })
        .map((fieldName) => `${type.name}.${fieldName}`);
    }
    return [];
  });
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
  const fieldRegex = /(\w+): (\[?(\w+!?)+\]?[!]?)/g;
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

    const fields = getFieldDefinitions(typeSchema);
    console.log('fields:', fields);
    const filteredFields = filter(fields, (field) => field.name !== 'id');
    console.log('filteredFields:', filteredFields);

    // Filter out related fields and assign then their respective Input Type..
    // use getTypeRelationships();
    // ${typeName}Input!
    const inputTypeFields = filteredFields
      .map((field) => {
        const fieldType = field.type.replace(/[\[\]!]/g, '');
        return `${field.name}: ${fieldType}`;
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