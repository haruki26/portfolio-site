import { createServerOnlyFn } from '@tanstack/react-start'
import { getWorkDetail, getWorkList } from '@/cms/endpoints/works'

const getWorks = createServerOnlyFn(getWorkList)
const getWork = createServerOnlyFn(getWorkDetail)

export { getWorks, getWork }
