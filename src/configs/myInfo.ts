import avatarImage from '/avatar.webp?url'
import iconImage from '/icon.svg?url'

export const MY_INFO = {
  firstName: '陽生',
  firstNameEn: 'haruki',
  lastName: '久保',
  lastNameEn: 'kubo',
  birthday: {
    year: 2005,
    month: 8,
    day: 26,
  },
  avatarImage: avatarImage,
  iconImage: iconImage,
  sns: {
    github: 'https://github.com/haruki26',
  },
} as const
