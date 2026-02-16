import type {
  MicroCMSClient,
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListContent,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'
import { createClient as _createClient } from 'microcms-js-sdk'
import { appEnv } from '@/lib/env'
import type {
  Endpoints,
  GetListRequest,
  GetListResponse,
  GetObjectResponse,
  GetQueries,
} from './type'

const _queriesParser = <T>(queries: GetQueries<T>): MicroCMSQueries => ({
  ...queries,
  fields: queries.fields?.map((v) => String(v)),
})

export const createClient = (
  clientArg: MicroCMSClient = {
    serviceDomain: appEnv.MICROCMS_SERVICE_DOMAIN,
    apiKey: appEnv.MICROCMS_API_KEY,
  },
) => {
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
