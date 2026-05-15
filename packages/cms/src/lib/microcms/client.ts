import type {
  MicroCMSClient,
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'
import { createClient as _createClient } from 'microcms-js-sdk'
import { createRawCMSClient } from '../shared/createRawCMSClient'
import type {
  Endpoints,
  GetListRequest,
  GetListResponse,
  GetQueries,
} from './type'

const _queriesParser = <T>(queries: GetQueries<T>): MicroCMSQueries => ({
  ...queries,
  fields: queries.fields?.map((v) => String(v)),
})

const createClient_ = (clientArg: MicroCMSClient) => {
  const client = _createClient(clientArg)

  const getList = <
    TListEndpoint extends keyof Endpoints,
    TSchema extends Endpoints[TListEndpoint] & MicroCMSListContent,
    TField extends keyof TSchema,
  >({
    endpoint,
    queries = {},
    ...args
  }: GetListRequest<TListEndpoint, TSchema, TField>): Promise<
    GetListResponse<TSchema, TField>
  > => {
    return client.getList<TSchema>({
      endpoint: String(endpoint),
      queries: _queriesParser(queries),
      ...args,
    })
  }

  const getListDetail = <
    TListEndpoints extends keyof Endpoints,
    TSchema extends Endpoints[TListEndpoints] &
      MicroCMSContentId &
      MicroCMSDate,
    TField extends keyof Endpoints[TListEndpoints],
  >({
    endpoint,
    contentId,
    queries = {},
    ...args
  }: GetListRequest<TListEndpoints, TSchema, TField> & {
    contentId: string
  }): Promise<TSchema> => {
    return client.getListDetail<TSchema>({
      endpoint: String(endpoint),
      contentId,
      queries: _queriesParser(queries),
      ...args,
    })
  }

  return { getListDetail, getList }
}

export const createClient = (config: MicroCMSClient) =>
  createRawCMSClient(createClient_, config)
