import { Link } from 'react-router-dom';

export default function NavLogo({ size = '22', height = '22', text }) {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0 group">
      <svg
        width={size}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className="text-blue-600"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          fill="currentColor"
        />
      </svg>
      <span
        className={`text-[18px] font-bold tracking-tight text-blue-950 ${text}`}
      >
        Cardio<span className="text-blue-600">Care</span>
      </span>
    </Link>
  );
}
