import Glass from '@/components/ui/Glass'
import { MY_INFO } from '@/configs/myInfo'
import { toUpperFirst } from '@/libs/toUpperFirst'

const AboutCard: React.FC = () => {
  return (
    <Glass className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-5">
        <img
          src={MY_INFO.iconImage}
          alt={`${MY_INFO.lastName} ${MY_INFO.firstName}のプロフィール画像`}
          className="h-18 w-18 rounded-2xl bg-slate-200"
        />
        <div className="grid grid-cols-2 grid-rows-2 pt-2">
          <div className="col-span-2 grid grid-cols-subgrid gap-2 text-3xl">
            <span>{MY_INFO.lastName}</span>
            <span>{MY_INFO.firstName}</span>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid text-base-content-muted text-xl">
            <span className="pl-1">{toUpperFirst(MY_INFO.lastNameEn)}</span>
            <span className="pl-1.5">{toUpperFirst(MY_INFO.firstNameEn)}</span>
          </div>
        </div>
      </div>
      <p className="flex flex-col gap-0.5 text-xl">
        <span>TypeScriptやPythonなど様々な言語について学んでいます。</span>
        <span>主にWebフロントの技術に興味があります。</span>
      </p>
    </Glass>
  )
}

export default AboutCard
