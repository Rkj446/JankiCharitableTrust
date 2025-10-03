import { useParams } from 'react-router-dom';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import site from '../data/site';

const sections = [
  { slug: 'social-welfare-community-support', title: 'Social Welfare & Community Support', items: site.programs.socialWelfare },
  { slug: 'health-safety-awareness', title: 'Health & Safety Awareness', items: site.programs.healthSafety },
  { slug: 'cultural-spiritual-upliftment', title: 'Cultural & Spiritual Upliftment', items: site.programs.culturalSpiritual },
];

export default function ProjectDetails() {
  const { slug } = useParams();
  const section = sections.find(s => s.slug === slug);

  if (!section) {
    return (
      <section className="py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Project Not Found</h1>
        <p className="text-foreground/70">The project you are looking for does not exist.</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-4xl font-bold mb-6 text-gradient">
          {section.title}
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Card className="p-6 md:p-8 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="font-bold text-xl mb-3 text-primary">Overview</h2>
                <p className="text-foreground/80 leading-relaxed">Here’s how we make impact in this area:</p>
                <ul className="mt-4 list-disc pl-6 space-y-2 text-foreground/80">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-muted/30 border border-border/50 p-4">
                <div className="text-sm text-muted-foreground mb-2">Impact Snapshot</div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-card shadow-sm border border-border/50">
                    <div className="text-2xl font-bold text-primary">36+ hrs</div>
                    <div className="text-xs text-muted-foreground">Hari Kirtan </div>
                  </div>
                  <div className="p-3 rounded-lg bg-card shadow-sm border border-border/50">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-xs text-muted-foreground">Meals served every year</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card shadow-sm border border-border/50">
                    <div className="text-2xl font-bold text-primary">6000+</div>
                    <div className="text-xs text-muted-foreground">Plants donated</div>
                  </div>
                  <div className="p-3 rounded-lg bg-card shadow-sm border border-border/50">
                    <div className="text-2xl font-bold text-primary">3+</div>
                    <div className="text-xs text-muted-foreground">Camps this year</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}


