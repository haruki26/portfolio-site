import type {
  MicroCMSDate,
  GetListRequest as MicroCMSGetListRequest,
  GetObjectRequest as MicroCMSGetObjectRequest,
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'

// endpoints
interface Tag extends MicroCMSListContent {
  name: string
}

interface BaseContents extends MicroCMSListContent {
  title: string
  description: string
  body: string
  tags: Tag[]
}

interface Blogs extends BaseContents { }

interface Works extends BaseContents { }

interface Certification extends MicroCMSListContent {
  name: string
}

interface AboutMe {
  firstName: string
  lastName: string
  firstNameEn: string
  lastNameEn: string
  avatar: MicroCMSImage
  icon: MicroCMSImage
  birthday: MicroCMSDate
  certifications: Certification[]
}

interface Endpoints {
  object: {
    aboutme: AboutMe
  }
  list: {
    works: Works
    Blogs: Blogs
  }
}

// MicroCMS Types
interface GetQueries<TField> extends Omit<MicroCMSQueries, 'fields'> {
  fields?: Array<TField>
}

interface GetListRequest<
  TListEndpoints extends keyof Endpoints['list'],
  TSchema extends Endpoints['list'][TListEndpoints],
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

interface GetObjectRequest<
  TObjectEndpoints extends keyof Endpoints['object'],
  TSchema extends Endpoints['object'][TObjectEndpoints],
  TField extends keyof TSchema,
> extends Omit<MicroCMSGetObjectRequest, 'endpoint' | 'queries'> {
  endpoint: TObjectEndpoints
  queries?: GetQueries<TField>
}

type GetObjectResponse<
  TSchema,
  TField extends keyof TSchema,
> = MicroCMSObjectContent & Pick<TSchema, TField>

export type {
  GetQueries,
  GetListRequest,
  GetListResponse,
  GetObjectRequest,
  GetObjectResponse,
  Endpoints,
  Works,
}
