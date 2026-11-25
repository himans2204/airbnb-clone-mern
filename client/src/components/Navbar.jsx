import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { APP_NAME } from '../config';

const links = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Log in' },
  { to: '/register', label: 'Sign up' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      isActive ? 'bg-brand-100 text-brand-700' : 'text-stone-600 hover:text-brand-700'
    }`;

  return (
    <header className="border-b border-sand-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-brand-700">
          {APP_NAME}
        </Link>

        <div className="hidden gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-sand-200 px-4 py-2 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
