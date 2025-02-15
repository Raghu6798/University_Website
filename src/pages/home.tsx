import { ArrowRight, GraduationCap, Users, BookOpen, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { name: 'Students Enrolled', value: '15,000+', icon: Users },
  { name: 'Academic Programs', value: '200+', icon: GraduationCap },
  { name: 'Research Publications', value: '5,000+', icon: BookOpen },
  { name: 'Awards & Recognition', value: '100+', icon: Trophy },
];

const news = [
  {
    title: 'Universe Ranks #1 in Research Innovation',
    date: 'March 15, 2024',
    description: 'Our university has been recognized for groundbreaking research in sustainable technology.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2866&q=80',
  },
  {
    title: 'New AI & Machine Learning Center Opens',
    date: 'March 10, 2024',
    description: 'State-of-the-art facility to advance artificial intelligence research and education.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
  },
];

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
            alt="University Campus"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to Universe
            </h1>
            <p className="mt-6 text-lg leading-8">
              Discover a world of opportunities at Universe. We're committed to academic excellence, 
              innovative research, and preparing students for success in a rapidly evolving world.
            </p>
            <div className="mt-10 flex gap-x-6">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.name} className="flex flex-col items-center">
                  <Icon className="h-12 w-12 text-slate-900" />
                  <div className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-600">
                    {stat.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Latest News & Announcements
            </h2>
            <p className="mt-2 text-lg leading-8 text-slate-600">
              Stay updated with the latest happenings at Universe
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {news.map((article) => (
              <article key={article.title} className="flex flex-col items-start">
                <div className="relative w-full">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[3/2]"
                  />
                </div>
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={article.date} className="text-slate-500">
                      {article.date}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {article.title}
                      </a>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-slate-600">
                      {article.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}