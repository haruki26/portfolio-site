import { tryAsync } from '@/libs/result'
import { fetchCertifications } from './functions'
import { certificationMapper } from './mapper'

const getCertifications = async () =>
  tryAsync(async () => {
    const res = await fetchCertifications()
    return res.contents.map(certificationMapper)
  })

export { getCertifications }
