import { createServerFn } from '@tanstack/react-start'
import { tryAsync } from '@/libs/result'
import {
  getCertifications as _getCertifications,
  getHobbies as _getHobbies,
} from './index.server'

const getCertifications = createServerFn().handler(async () =>
  tryAsync(_getCertifications),
)
const getHobbies = createServerFn().handler(async () => tryAsync(_getHobbies))

export { getCertifications, getHobbies }
