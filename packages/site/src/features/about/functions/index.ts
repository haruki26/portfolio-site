import { createServerFn } from '@tanstack/react-start'
import { toSerializableResult } from '@/libs/result'
import {
  getCertifications as _getCertifications,
  getHobbies as _getHobbies,
} from './index.server'

const getCertifications = createServerFn().handler(async () =>
  toSerializableResult(await _getCertifications()),
)

const getHobbies = createServerFn().handler(async () =>
  toSerializableResult(await _getHobbies()),
)

export { getCertifications, getHobbies }
