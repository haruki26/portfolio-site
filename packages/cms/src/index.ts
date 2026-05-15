import { createMicroCMSClient } from './lib/microcms'
import type { CMSConfig } from './type'

export const createCMSClient = (config: CMSConfig) =>
  createMicroCMSClient(config)
