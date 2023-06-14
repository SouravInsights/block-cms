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

  constructor () {
    this.id = ctx.publicKey.toHex();
    this.publicKey = ctx.publicKey;
  }
}

@public
collection ContentTypes {
  id: string;
  name: string;
  content_type_slug: string;
  description: string;
  schema: map<string, any>;
  created_at?: number;
  updated_at?: number;
  created_by: PublicKey;

  constructor (
    id: string, 
    name: string, 
    content_type_slug: string, 
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
}`