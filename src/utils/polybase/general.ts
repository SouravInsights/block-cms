import { CollectionMeta, CollectionRecordResponse } from '@polybase/client'

export function getNamespaces(data: CollectionRecordResponse<CollectionMeta>[]): string[] {
  const cache: Record<string, true> = {}
  const namespaces: string[] = []
  data.forEach((item) => {
    const namespace = getNamespace(item.data.id)
    if (namespace && !cache[namespace]) {
      cache[namespace] = true
      namespaces.push(namespace)
    }
  })
  return namespaces
}

export function getNamespace(id: string) {
  return id.split('/').slice(0, -1).join('/')
}

export function shortName(namespace: string): string {
  return namespace.split('/').slice(-1)[0]
}

export function getCollections(namespace: string, data?: CollectionRecordResponse<CollectionMeta>[] | null) {
  if (!data) return []
  return data.filter((item) => getNamespace(item.data.id) === namespace)
}

export function isSchemaMismatch(collections: CollectionRecordResponse<CollectionMeta>[]) {
  const code = collections[0]?.data.code
  return collections.length > 0 && collections.some((item) => item.data?.code !== code)
}

export function generatePolybaseSchema(collectionName: string, fields: any) {
  const fieldDefinitions = fields
    .map((field: any) => field.field_options.required ? `${field.api_id}: ${field.type};` : `${field.api_id}?: ${field.type};`)
    .join("\n      ");
    
  const constructorParams = fields
    .map((field: any, i: number) => 
      i === fields.length - 1 ? `${field.api_id}: ${field.type}` : `${field.api_id}: ${field.type},`
    )
    .join("\n    ");

  return `
    @public
    collection ${collectionName} {
      id: string;
      ${fieldDefinitions}

      constructor (id: string, ${constructorParams}) {
        this.id = id;
        ${fieldDefinitions}
      }
    }
  `;
}