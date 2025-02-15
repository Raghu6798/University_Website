import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

const footerLinks = {
  'Quick Links': [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Student Portal', href: '/portal' },
  ],
  'Resources': [
    { name: 'Library', href: '/library' },
    { name: 'Research', href: '/research' },
    { name: 'Publications', href: '/publications' },
    { name: 'Academic Calendar', href: '/calendar' },
  ],
  'Contact': [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Campus Map', href: '/map' },
    { name: 'Directory', href: '/directory' },
    { name: 'Emergency Info', href: '/emergency' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-2xl font-bold">Universe</Link>
            <p className="mt-4 text-sm text-slate-400">
              Empowering minds, shaping futures, and creating tomorrow's leaders through excellence in education.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-400 hover:text-slate-300"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-slate-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="text-center text-sm text-slate-400">
            © {new Date().getFullYear()} Universe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}