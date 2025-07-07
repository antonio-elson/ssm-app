import type { CollectionConfig } from 'payload'

export const Custumers: CollectionConfig = {
  slug: 'custumers',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
  },
  auth: true,
  fields: [],
}
