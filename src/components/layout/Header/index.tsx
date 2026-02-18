import { useState } from 'react'
import Glass from '@/components/ui/Glass'
import Hamburger from '@/components/ui/HamburgerButton'

const Header: React.FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  return (
    <header>
      <Glass className="flex flex-row items-center gap-3 px-5 py-4">
        <Hamburger
          onClick={() => setIsOpenSidebar((prev) => !prev)}
          isOpen={isOpenSidebar}
        />
        <span className="font-orbitron text-lg text-shadow-edge">
          yosei.dev
        </span>
      </Glass>
    </header>
  )
}

export default Header
