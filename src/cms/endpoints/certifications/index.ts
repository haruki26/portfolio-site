import { tryAsync } from '@/lib/result'
import { fetchCertifications } from './functions'
import { certificationMapper } from './mapper'

const getCertificatons = async () =>
  tryAsync(async () => {
    const res = await fetchCertifications()
    return res.contents.map(certificationMapper)
  })

export { getCertificatons }
