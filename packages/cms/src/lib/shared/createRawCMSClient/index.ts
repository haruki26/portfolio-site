export const createRawCMSClient = <TClient, TArgs extends readonly unknown[]>(
  factory: (...args: TArgs) => TClient,
  ...args: TArgs
): (() => TClient) =>
  (() => {
    let client: TClient | null = null
    return () => {
      if (client === null) {
        client = factory(...args)
      }

      return client ?? factory(...args)
    }
  })()
