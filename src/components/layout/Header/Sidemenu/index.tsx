import { Link, MatchRoute } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import Glass from '@/components/ui/Glass'
import { PAGE } from '@/configs/page'
import { toUpperFirst } from '@/libs/toUpperFirst'

interface Props {
  onClose: () => void
}

const Sidemenu: React.FC<Props> = ({ onClose }) => {
  return (
    <aside>
      <button
        type="button"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
        className="-z-10 fixed top-0 left-0 flex h-full w-full animate-fade-in bg-slate-800/50"
      >
        <Glass className="m-auto bg-surface/50 py-10 pr-10 backdrop-blur-sm">
          <nav>
            <ul className="col-auto grid items-center gap-x-3 gap-y-4">
              {Object.entries(PAGE).map(([page, conf]) => (
                <li
                  key={`side-${page}`}
                  className="col-span-3 grid grid-cols-subgrid text-white"
                >
                  <span className="col-span-1 mt-1 grid items-center">
                    <MatchRoute to={conf.path.to} fuzzy>
                      <ChevronRight className="size-5 animate-bounce text-accent" />
                    </MatchRoute>
                  </span>
                  <Link
                    {...conf.path}
                    className="col-span-2 grid grid-cols-subgrid items-center gap-5"
                    onClick={() => onClose()}
                  >
                    <conf.Icon className="size-8" />
                    <span className="font-extrabold font-orbitron text-3xl">
                      {toUpperFirst(page)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Glass>
      </button>
    </aside>
  )
}

export default Sidemenu
