import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../config';
import { useAuth } from '../context/authContext';

const guestLinks = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Log in' },
  { to: '/register', label: 'Sign up' },
];

const userLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = user ? userLinks : guestLinks;

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      isActive ? 'bg-brand-100 text-brand-700' : 'text-stone-600 hover:text-brand-700'
    }`;

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/');
  }

  return (
    <header className="border-b border-sand-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-brand-700">
          {APP_NAME}
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          {user && (
            <>
              <span className="px-2 text-sm text-stone-500">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 hover:text-brand-700"
              >
                Log out
              </button>
            </>
          )}
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
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-md px-3 py-2 text-left text-sm font-medium text-stone-600"
            >
              Log out
            </button>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
