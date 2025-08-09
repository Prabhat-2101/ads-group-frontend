import { NavLink, Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';

export default function Navbar() {
  const linkClass ="link";
  const activeClass = "active-link";
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center nav-container">
      <div className="text-xl font-bold left">
        <AppBar position="static" className="bg-blue-600">
          <Toolbar className="flex justify-between">
            <div className="flex items-center text-center gap-2 text-white font-semibold text-lg">
              <BuildIcon />
              <span> ADS Group SpareParts</span>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <ul className="flex gap-6 text-sm font-medium navbar">
        <li>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Add Item
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Show Items
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bill"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Generate Bill
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/show-bills"
            className={({ isActive }) =>
              isActive ? `${linkClass} ${activeClass}` : linkClass
            }
          >
            Show Bills
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
