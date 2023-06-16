// Define resolvers
const resolvers = {
  Query: {
    contentTypes: async () => {
      // Fetch content types from Polybase collection
      const contentTypes = await polybaseSDK.query('ContentTypes');
      return contentTypes;
    },
    fields: async (parent, args) => {
      // Fetch fields based on the content type ID from Polybase collection
      const fields = await polybaseSDK.query('Fields', { content_type_id: args.contentTypeId });
      return fields;
    },
    entries: async (parent, args) => {
      // Fetch entries based on the content type ID from Polybase collection
      const entries = await polybaseSDK.query('Entries', { content_type_id: args.contentTypeId });
      return entries;
    },
  },
  Mutation: {
    createEntry: async (parent, args) => {
      // Create a new entry in the Entries collection
      const entry = await polybaseSDK.create('Entries', {
        content_type_id: args.contentTypeId,
        field_values: args.fieldValues,
        created_at: Date.now(),
        created_by: 'user_public_key',
      });
      return entry;
    },
    updateEntry: async (parent, args) => {
      // Update an existing entry in the Entries collection
      const entry = await polybaseSDK.update('Entries', args.entryId, {
        field_values: args.fieldValues,
        updated_at: Date.now(),
      });
      return entry;
    },
    deleteEntry: async (parent, args) => {
      // Delete an entry from the Entries collection
      const deleted = await polybaseSDK.delete('Entries', args.entryId);
      return deleted;
    },
  },
};