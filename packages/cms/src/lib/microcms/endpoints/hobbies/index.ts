import { createEndpointBuilder } from '@/lib/shared/createEndpoint'
import type { Hobby } from '@/schema'
import { imageMapper } from '../../shared/mapper'
import type { GetMicroCMSClient } from '../../shared/type'

export const createHobbiesEndpoint = (getClient: GetMicroCMSClient) =>
  createEndpointBuilder(getClient)
    .addGetListFn<Hobby>((client) => async () => {
      const res = await client.getList({
        endpoint: 'hobbies',
      })

      return {
        contents: res.contents.map((hobby) => ({
          name: hobby.name,
          description: hobby.description,
          images: hobby.images.map(imageMapper),
        })),
        totalCount: res.totalCount,
      }
    })
    .build()
