import type {
  Blog,
  BlogOverview,
  Certification,
  Hobby,
  Work,
  WorkOverview,
} from '@/schema'
import type { GetDetailFn, GetListFn } from '@/type'

type Schema = Blog | BlogOverview | Certification | Hobby | Work | WorkOverview

const endpointBuilder = <TClient, TState extends {}>(
  client: TClient,
  state: TState,
) => ({
  addGetListFn: <TSchema extends Schema>(
    handler: (client: TClient) => GetListFn<TSchema>,
  ) => {
    const { addGetListFn: _, ...rest } = endpointBuilder(client, {
      ...state,
      getList: handler(client),
    })
    return rest
  },

  addGetDetailFn: <TSchema extends Schema>(
    handler: (client: TClient) => GetDetailFn<TSchema>,
  ) => {
    const { addGetDetailFn: _, ...rest } = endpointBuilder(client, {
      ...state,
      getDetail: handler(client),
    })
    return rest
  },

  build: () => state,
})

export const createEndpointBuilder = <TClient>(getClient: () => TClient) =>
  endpointBuilder(getClient(), {})
