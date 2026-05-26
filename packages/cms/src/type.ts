import type {
  Article,
  ArticleOverview,
  Blog,
  Certification,
  Hobby,
  Work,
} from '@/schema'

interface CMSConfig {
  serviceDomain: string
  apiKey: string
}

type PagingSchema = Blog | Work
type ListResponseSchema<TSchema> = TSchema extends Article
  ? ArticleOverview<TSchema>
  : TSchema

interface ListResponse<TSchema extends {}> {
  contents: ListResponseSchema<TSchema>[]
  totalCount: number
}

type PagingOptions =
  | {
      currentPage?: undefined
      limit?: number
    }
  | {
      currentPage: number
      limit: number
    }

type GetListFn<TSchema extends {}> = TSchema extends PagingSchema
  ? (options?: PagingOptions) => Promise<ListResponse<TSchema>>
  : () => Promise<ListResponse<TSchema>>

type GetDetailFn<TSchema extends {}> = (id: string) => Promise<TSchema | null>

interface GetableListEndpoint<TSchema extends {}> {
  getList: GetListFn<TSchema>
}

interface GetableDetailEndpoint<TSchema extends {}> {
  getDetail: GetDetailFn<TSchema>
}

interface CMSClient {
  articles: {
    blogs: GetableListEndpoint<Blog> & GetableDetailEndpoint<Blog>
    works: GetableListEndpoint<Work> & GetableDetailEndpoint<Work>
  }
  certifications: GetableListEndpoint<Certification>
  hobbies: GetableListEndpoint<Hobby>
}

export type {
  CMSConfig,
  CMSClient,
  GetListFn,
  ListResponse,
  GetDetailFn,
  PagingOptions,
}
