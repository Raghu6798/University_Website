import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { useTranslation } from 'react-i18next';

const navigation = [
  { 
    name: 'Home', 
    href: '/' 
  },
  { 
    name: 'About Us',
    href: '/about',
    submenu: [
      { name: 'Mission & Vision', href: '/about/mission' },
      { name: 'History', href: '/about/history' },
      { name: 'Accreditation', href: '/about/accreditation' }
    ]
  },
  { 
    name: 'Admissions',
    href: '/admissions',
    submenu: [
      { name: 'Programs', href: '/admissions/programs' },
      { name: 'How to Apply', href: '/admissions/apply' },
      { name: 'Scholarships', href: '/admissions/scholarships' },
      { name: 'Fees', href: '/admissions/fees' }
    ]
  },
  { 
    name: 'Academics',
    href: '/academics',
    submenu: [
      { name: 'Departments', href: '/academics/departments' },
      { name: 'Courses', href: '/academics/courses' },
      { name: 'Research', href: '/academics/research' },
      { name: 'Faculty', href: '/academics/faculty' }
    ]
  },
  { 
    name: 'Student Life',
    href: '/student-life',
    submenu: [
      { name: 'Hostels', href: '/student-life/hostels' },
      { name: 'Clubs', href: '/student-life/clubs' },
      { name: 'Events', href: '/student-life/events' },
      { name: 'Sports', href: '/student-life/sports' }
    ]
  },
  { 
    name: 'Placement Center',
    href: '/placement',
    submenu: [
      { name: 'Internships', href: '/placement/internships' },
      { name: 'Job Listings', href: '/placement/jobs' },
      { name: 'Recruiters', href: '/placement/recruiters' }
    ]
  },
  { 
    name: 'Contact Us',
    href: '/contact'
  }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(8px)']
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0 1px 3px rgba(0,0,0,0.1)']
  );

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
    
    // Smooth scroll to top on navigation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = navigation
      .flatMap(item => item.submenu || [{ name: item.name, href: item.href }])
      .filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    setSearchResults(results);
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        boxShadow,
      }}
    >
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <motion.div 
          className="flex lg:flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
              Universe
            </span>
          </Link>
        </motion.div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <motion.div 
          className="hidden lg:flex lg:gap-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {navigation.map((item, index) => (
            <motion.div
              key={item.name}
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setOpenSubmenu(item.name)}
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              <Link
                to={item.href}
                className="group inline-flex items-center text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-300"
              >
                {t(item.name)}
                {item.submenu && (
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </Link>
              
              <AnimatePresence>
                {item.submenu && openSubmenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-48 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    <div className="py-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <motion.div
                          key={subItem.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                        >
                          <Link
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                          >
                            {t(subItem.name)}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="search"
              placeholder={t('Search...')}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-64 rounded-full border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-slate-800/80 py-2 pl-10 pr-4 text-gray-900 dark:text-gray-100 focus:border-slate-500 dark:focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:focus:ring-slate-400 transition-all duration-300"
            />
            <AnimatePresence>
              {searchQuery && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 rounded-md bg-white/80 dark:bg-slate-800/80 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg"
                >
                  <div className="py-1">
                    {searchResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          to={result.href}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                          onClick={() => setSearchQuery('')}
                        >
                          {result.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-300"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            ) : (
              <Moon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            )}
          </motion.button>

          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-transparent text-gray-900 dark:text-gray-100 border-none focus:ring-0 transition-colors duration-300"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="default"
              size="sm"
              className="ml-4 transition-all duration-300"
              onClick={() => {/* Implement login logic */}}
            >
              {t('Login')}
            </Button>
          </motion.div>
        </motion.div>
      </nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">Universe</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          to={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {t(item.name)}
                        </Link>
                        {item.submenu && (
                          <div className="ml-4 space-y-1">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {t(subItem.name)}
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full transition-all duration-300"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        /* Implement login logic */
                      }}
                    >
                      {t('Login')}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}