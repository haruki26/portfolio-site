import { BookHeart, Cake, type LucideIcon, UserPen } from 'lucide-react'
import { MY_INFO } from '@/configs/myInfo'
import { toUpperFirst } from '@/libs/toUpperFirst'

const LabelWithIcon: React.FC<{
  Icon: LucideIcon
  children: React.ReactNode
}> = ({ Icon, children }) => {
  return (
    <div className="col-span-2 grid grid-cols-subgrid items-center">
      <Icon className="col-span-1 size-10" />
      <div className="col-span-1 mx-auto">{children}</div>
    </div>
  )
}

const Profile: React.FC = () => {
  return (
    <div className="mx-auto grid auto-cols-max grid-rows-3 gap-x-5 gap-y-2 text-3xl">
      <LabelWithIcon Icon={UserPen}>
        <div className="flex flex-col items-center justify-center gap-0.5">
          <h3 className="sr-only">名前</h3>
          <div className="flex flex-row gap-2">
            <span>{MY_INFO.lastName}</span>
            <span>{MY_INFO.firstName}</span>
          </div>
          <div className="flex flex-row gap-2 text-xl">
            <span>{toUpperFirst(MY_INFO.lastNameEn)}</span>
            <span>{toUpperFirst(MY_INFO.firstNameEn)}</span>
          </div>
        </div>
      </LabelWithIcon>
      <LabelWithIcon Icon={Cake}>
        <div className="flex flex-row items-center gap-2 text-4xl">
          <h3 className="sr-only">誕生日</h3>
          <span>{MY_INFO.birthday.month}</span>
          <span>&frasl;</span>
          <span>{MY_INFO.birthday.day}</span>
        </div>
      </LabelWithIcon>
      <LabelWithIcon Icon={BookHeart}>
        <div className="flex flex-row items-center gap-1">
          <h3 className="sr-only">MBTI</h3>
          <span>ISTP</span>
          <span className="text-xl">&ndash;</span>
          <span>T</span>
        </div>
      </LabelWithIcon>
    </div>
  )
}

export default Profile
