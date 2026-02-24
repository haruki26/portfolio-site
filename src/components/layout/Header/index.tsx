import { MarkGithubIcon } from '@primer/octicons-react'
import { Link } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import Glass from '@/components/ui/Glass'
import Hamburger from '@/components/ui/HamburgerButton'
import { MY_INFO } from '@/configs/myInfo'

const Header: React.FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  return (
    <header>
      <Glass className="z-50 flex flex-row items-center justify-between px-5 py-4">
        <div className="flex flex-row items-center gap-4">
          <Hamburger
            onClick={() => setIsOpenSidebar((prev) => !prev)}
            isOpen={isOpenSidebar}
          />
          <span className="font-bold font-orbitron text-lg text-shadow-edge text-shadow-lg/40">
            yosei.dev
          </span>
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="flex gap-3">
            <a href={MY_INFO.sns.github} target="_blank">
              <MarkGithubIcon className="size-6" />
            </a>
            <Link to="/contact">
              <Mail className="size-6" />
            </Link>
          </div>
        </div>
      </Glass>
    </header>
  )
}

export default Header
