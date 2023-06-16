export const schemas = `
@public
collection User {
  id: string;
  publicKey?: PublicKey;

  constructor (id: string) {
    this.id = ctx.publicKey.toHex();
    if (ctx.publicKey)
      this.publicKey = ctx.publicKey;
  }

  del () {
    if (this.publicKey != ctx.publicKey) {
      throw error('You do not have permission to delete this record');
    }
    selfdestruct();
  }
}

@public
collection users {
  id: string;
  publicKey?: PublicKey;

  @index(id);

  constructor () {
    this.id = ctx.publicKey.toHex();
    this.publicKey = ctx.publicKey;
  }
}

@public
collection ContentTypes {
  id: string;
  name: string;
  api_id: string;
  description: string;
  schema: map<string, any>;
  created_at?: number;
  updated_at?: number;
  created_by: PublicKey;

  @index(id, name, api_id);

  constructor (
    id: string, 
    name: string, 
    api_id: string, 
    description: string, 
    schema: map<string, any>,
    created_at?: number,
    updated_at?: number,
    created_by: PublicKey
  ) {
    this.id = id;
    this.name = name;
    this.content_type_slug = content_type_slug;
    this.description = description;
    this.schema = schema;
    this.created_at = created_by;
    this.updated_at = updated_at;
    this.created_by = created_by;
  }

  updateData (updated_at: number) {
    this.updated_at = updated_at;
  }
}

@public
collection Entries {
  id: string;
  content_type_id: ContentTypes;
  field_values: map<string, any>;
  created_at?: number;
  updated_at?: number;
  created_by: PublicKey;

  @index(id, content_type_id);

  constructor (
    id: string, 
    content_type_id: ContentTypes,
    field_values: map<string, any>,
    created_at?: number,
    updated_at?: number,
    created_by: PublicKey,
    created_by: PublicKey
  ) {
    this.id = id;
    this.content_type_id = content_type_id;
    this.field_values = field_values;
    this.created_at = created_by;
    this.updated_at = updated_at;
    this.created_by = created_by;
  }

  updateData (updated_at: number) {
    this.updated_at = updated_at;
  }
}

@public
collection Fields {
  id: string;
  content_type_id: ContentTypes;
  name: string;
  api_id: string;
  type: map<string, string>;
  field_options: {
    required: boolean;
    max_length: string;
  };
 
  constructor (
    id: string, 
    content_type_id: ContentTypes,
    name: string,
    api_id: string,
    type: map<string, string>,
    maxLength: number, 
    required: boolean
  ) {
    this.id = id;
    this.content_type_id = content_type_id;
    this.name = name;
    this.api_id = api_id;
    this.type = type;

    this.field_options = {
      maxLength: maxLength,
      required: required
    };

    if (name.length > maxLength) {
      error("Name must be ' + maxLength + ' characters or less.");
    }
  }

  updateName(newName: string) {
    if (newName.length > maxLength) {
      error("Name must be ' + maxLength + ' characters or less.");
    }

    this.name = newName;
  }
}
`