import { useState } from 'react'
import Glass from '@/components/ui/Glass'
import Hamburger from '@/components/ui/HamburgerButton'

const Header: React.FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  return (
    <header>
      <Glass className="flex flex-row items-center gap-3 px-5 py-4 shadow-accent/10 shadow-xl">
        <Hamburger
          onClick={() => setIsOpenSidebar((prev) => !prev)}
          isOpen={isOpenSidebar}
        />
        <span className="text-primary-100">This is header content.</span>
      </Glass>
    </header>
  )
}

export default Header
