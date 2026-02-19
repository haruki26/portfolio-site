import type {
  GetListRequest as MicroCMSGetListRequest,
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'

// endpoints
interface Tags extends MicroCMSListContent {
  name: string
}

interface BaseContents extends MicroCMSListContent {
  title: string
  description: string
  body: string
  thumbnail?: MicroCMSImage
  tags: Tags[]
}

interface Blogs extends BaseContents {}

interface Works extends BaseContents {}

interface Certifications extends MicroCMSListContent {
  name: string
}

interface Hobbies {
  name: string
  description: string
  images: MicroCMSImage[]
}

interface Endpoints {
  works: Works
  blogs: Blogs
  certifications: Certifications
  hobbies: Hobbies
}

// MicroCMS Types
interface GetQueries<TField> extends Omit<MicroCMSQueries, 'fields'> {
  fields?: Array<TField>
}

interface GetListRequest<
  TListEndpoints extends keyof Endpoints,
  TSchema extends Endpoints[TListEndpoints],
  TField extends keyof TSchema,
> extends Omit<MicroCMSGetListRequest, 'endpoint' | 'queries'> {
  endpoint: TListEndpoints
  queries?: GetQueries<TField>
}

interface GetListResponse<TSchema, TField extends keyof TSchema>
  extends Omit<MicroCMSListResponse<TSchema>, 'contents'> {
  contents: Array<Pick<TSchema, TField>>
  totalCount: number
  offset: number
  limit: number
}

type GetObjectResponse<
  TSchema,
  TField extends keyof TSchema,
> = MicroCMSObjectContent & Pick<TSchema, TField>

export type {
  GetQueries,
  GetListRequest,
  GetListResponse,
  GetObjectResponse,
  Endpoints,
  Works,
  Blogs,
  Tags,
  Hobbies,
  Certifications,
}
