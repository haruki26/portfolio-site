import { createEndpointBuilder } from '@/lib/shared/createEndpoint'
import type { Certification } from '@/schema'
import { dateMapper } from '../../shared/mapper'
import type { GetMicroCMSClient } from '../../shared/type'

export const createCertificationsEndpoint = (getClient: GetMicroCMSClient) =>
  createEndpointBuilder(getClient)
    .addGetListFn<Certification>((client) => async () => {
      const res = await client.getList({
        endpoint: 'certifications',
      })

      return res.contents.map((cert) => ({
        name: cert.name,
        date: dateMapper(cert.date),
      }))
    })
    .build()
