import type { CMSClient, CMSConfig } from '@/type'
import { createClient } from './client'
import { createBlogsEndpoint } from './endpoints/articles/blogs'
import { createWorksEndpoint } from './endpoints/articles/works'
import { createCertificationsEndpoint } from './endpoints/certifications'
import { createHobbiesEndpoint } from './endpoints/hobbies'

export const createMicroCMSClient = (config: CMSConfig) => {
  const getClient = createClient(config)

  return {
    articles: {
      blogs: createBlogsEndpoint(getClient),
      works: createWorksEndpoint(getClient),
    },
    certifications: createCertificationsEndpoint(getClient),
    hobbies: createHobbiesEndpoint(getClient),
  } satisfies CMSClient
}
