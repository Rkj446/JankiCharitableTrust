import { Card } from './ui/card';
import { Heart, MapPin, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import site from '../data/site';

export default function Projects() {
  const slugify = (text: string) =>
    encodeURIComponent(
      text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    );
  const projects = [
    { icon: <Heart className="w-8 h-8" />, title: "Social Welfare & Community Support", summary: site.programs.socialWelfare.join(' • ') },
    { icon: <Info className="w-8 h-8" />, title: "Health & Safety Awareness", summary: site.programs.healthSafety.join(' • ') },
    { icon: <MapPin className="w-8 h-8" />, title: "Cultural & Spiritual Upliftment", summary: site.programs.culturalSpiritual.join(' • ') },
  ];
  return (
    <section className="py-16 px-4">
      <h2 className="text-4xl font-bold mb-8 text-gradient text-center">Our Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p, i) => {
          const to = `/projects/${slugify(p.title)}`;
          return (
            <Link key={i} to={to} className="block focus-ring rounded-2xl">
              <Card className="p-8 h-full rounded-2xl shadow-card dark:shadow-card-dark gradient-card border border-border/50 hover-lift group">
                <div className="h-full flex flex-col">
                  <div className="mb-4 text-primary group-hover:text-accent transition-colors duration-300">{p.icon}</div>
                  <div className="font-bold text-xl mb-3 text-foreground truncate break-words">{p.title}</div>
                  <div className="text-foreground/80 leading-relaxed break-words overflow-hidden text-ellipsis max-h-24">
                    {p.summary}
                  </div>
                  <div className="mt-4 text-primary group-hover:text-accent underline font-semibold transition-colors duration-300">
                    Know more →
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
