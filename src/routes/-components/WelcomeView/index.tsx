import { MY_INFO } from '@/configs/myInfo'
import { toUpperFirst } from '@/libs/toUpperFirst'

const WelcomeView: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-8 py-3 font-orbitron text-shadow-lg/40 text-shadow-secondary-100">
      <div className="flex flex-col items-center gap-3">
        <span className="text-3xl">Welcome</span>
        <h1 className="flex flex-row gap-3 text-5xl">
          <span>{toUpperFirst(MY_INFO.firstNameEn)}</span>
          <span>{toUpperFirst(MY_INFO.lastNameEn)}</span>
        </h1>
      </div>
      <p className="wrap-break-word flex flex-col gap-0.5 bg-base-300/5 text-center text-lg">
        <span>このサイトでは</span>
        <span>私のプロフィールや</span>
        <span>作品についてまとめています</span>
      </p>
    </div>
  )
}

export default WelcomeView
