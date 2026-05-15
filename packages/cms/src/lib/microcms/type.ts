import type {
  GetListRequest as MicroCMSGetListRequest,
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'
import type { Article, Certification, Hobby, Tag } from '@/schema'

interface Tags extends Tag, MicroCMSListContent {}

type ListContentKeys = keyof MicroCMSListContent

type Articles = Omit<Article, ListContentKeys> & {
  thumbnail?: MicroCMSImage
  tags: Tags[]
} & MicroCMSListContent

interface Works extends Articles {}
interface Blogs extends Articles {}

type Certifications = Certification &
  MicroCMSListContent & {
    date: string | undefined
  }

type Hobbies = Hobby &
  MicroCMSListContent & {
    images: MicroCMSImage[]
  }

// endpoints
interface Endpoints {
  works: Works
  blogs: Blogs
  certifications: Certifications
  hobbies: Hobbies
}

// MicroCMS Types
interface GetQueries<TField> extends Omit<MicroCMSQueries, 'fields'> {
  fields?: Readonly<Array<TField>>
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
  Articles,
}
