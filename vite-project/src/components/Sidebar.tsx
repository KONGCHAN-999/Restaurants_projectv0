import { NavLink } from 'react-router-dom'
import {
  ChefHat,
  Users,
  ShoppingCart,
  Menu,
  Grid3X3,
  LogOut,
} from "lucide-react"
const navClasses = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-2 rounded-xl transition
   ${isActive ? 'bg-black/5 dark:bg-white/10 font-medium' : 'hover:bg-black/5 dark:hover:bg-white/10'}`

export default function Sidebar() {
  return (
    <>
      <aside className="w-64 bg-gray-50 dark:bg-gray-900 dark:border-gray-800 p-6 transition-colors duration-200">
        <nav className="space-y-2">
          <NavLink to="/dashboard" className={navClasses}><ChefHat className="w-4 h-4 mr-3" />Dashboard</NavLink>
          <NavLink to="/orders" className={navClasses}><ShoppingCart className="w-4 h-4 mr-3" />Orders</NavLink>
          <NavLink to="/menus" className={navClasses}><Menu className="w-4 h-4 mr-3" />Menus</NavLink>
          <NavLink to="/tables" className={navClasses}><Grid3X3 className="w-4 h-4 mr-3" />Tables</NavLink>
          <NavLink to="/staffs" className={navClasses}><Users className="w-4 h-4 mr-3" />Staffs</NavLink>
          <NavLink to="/logout" className={navClasses}><LogOut className="w-4 h-4 mr-3" />Log out</NavLink>
        </nav>
      </aside>
    </>
  )
}
