import { createServerOnlyFn } from '@tanstack/react-start'
import { cmsClient } from '@/integrations/cms/client'

const getWorks = createServerOnlyFn(cmsClient.articles.works.getList)
const getWork = createServerOnlyFn(cmsClient.articles.works.getDetail)

export { getWorks, getWork }
