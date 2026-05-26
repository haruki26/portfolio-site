import type { CMSClient } from '@repo/cms'
import type { Article } from '@/features/article/shared/types'

type GetWorkListOptions = Parameters<CMSClient['articles']['works']['getList']>
interface Work extends Article {}

export type { Work, GetWorkListOptions }
