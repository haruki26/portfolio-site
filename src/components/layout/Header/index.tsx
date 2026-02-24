import { MarkGithubIcon } from '@primer/octicons-react'
import { Link } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import Glass from '@/components/ui/Glass'
import Hamburger from '@/components/ui/HamburgerButton'
import { MY_INFO } from '@/configs/myInfo'
import { PAGE } from '@/configs/page'
import { toUpperFirst } from '@/libs/toUpperFirst'

const Header: React.FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  return (
    <header>
      <Glass className="z-50 flex flex-row items-center justify-between px-5 py-4 md:px-12">
        <div className="flex flex-row items-center gap-4">
          <span className="md:hidden">
            <Hamburger
              onClick={() => setIsOpenSidebar((prev) => !prev)}
              isOpen={isOpenSidebar}
            />
          </span>
          <span className="font-bold font-orbitron text-lg text-shadow-edge text-shadow-lg/40 md:text-3xl">
            yosei&#46;dev
          </span>
        </div>
        <div className="flex flex-row items-center gap-5 md:gap-10">
          <div className="hidden md:block">
            <nav>
              <ul className="flex gap-5 font-bold font-orbitron text-2xl">
                {Object.entries(PAGE)
                  .filter(([p, _]) => p !== 'contact')
                  .map(([page, conf]) => (
                    <li key={page}>
                      <Link {...conf.path}>{toUpperFirst(page)}</Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
          <div className="flex gap-3 md:gap-5">
            <a href={MY_INFO.sns.github} target="_blank">
              <MarkGithubIcon className="size-8" />
            </a>
            <Link to="/contact">
              <Mail className="size-8" />
            </Link>
          </div>
        </div>
      </Glass>
    </header>
  )
}

export default Header
