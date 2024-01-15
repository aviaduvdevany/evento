import Link from "next/link";

const routes = [
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    name: "Terms and Conditions",
    path: "/terms-conditions",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto flex justify-between px-6 text-white/25 border-t border-white/10 h-16 items-center">
      <small>&copy; 2024 aviaduvdevany all rights reserved</small>
      <small className="space-x-6">
        {routes.map((route) => (
          <Link key={route.path} href={route.path}>
            {route.name}
          </Link>
        ))}
      </small>
    </footer>
  );
}
