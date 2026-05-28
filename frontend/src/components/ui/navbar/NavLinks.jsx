import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Beranda', to: '/' },
  { label: 'Fitur', to: '/#fitur' },
  { label: 'Tentang', to: '/#tentang' },
];

export default function NavLinks() {
  const { pathname } = useLocation();

  return (
    <div className="hidden md:flex items-center gap-1">
      {links.map((link) => {
        const isActive = pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
              ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50/60'
              }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
