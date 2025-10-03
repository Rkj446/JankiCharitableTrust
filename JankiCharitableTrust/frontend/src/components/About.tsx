import { Card } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import site from '../data/site';

export default function About() {
  const [open, setOpen] = useState<{[k: string]: boolean}>({
    social: false,
    health: false,
    culture: false,
  });

  const toggle = (key: 'social' | 'health' | 'culture') => setOpen((o) => ({ ...o, [key]: !o[key] }));

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-1 text-center text-gradient">About Us – {site.name}</h2>
        <div className="text-center text-sm text-muted-foreground mb-4">Founded in 2013</div>
        <p className="max-w-3xl mx-auto text-center text-lg text-foreground/80 mb-8 leading-relaxed break-words">
          {site.description}
        </p>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 mb-10 bg-card/80">
            <div className="text-center">
              <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed">
                “{site.inspiration.quote}”
              </blockquote>
              <div className="mt-2 text-sm text-muted-foreground">— {site.inspiration.author}</div>
              <div className="mt-1 text-foreground/80">{site.inspiration.translation}</div>
            </div>
          </Card>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80">
            <div className="font-bold text-2xl text-primary mb-3">Our Vision</div>
            <p className="text-foreground/80 leading-relaxed">{site.vision}</p>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>
            <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80">
            <div className="font-bold text-2xl text-primary mb-3">Our Mission</div>
            <p className="text-foreground/80 leading-relaxed">{site.mission}</p>
            </Card>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-lg text-primary">Social Welfare & Community Support</div>
                <button onClick={() => toggle('social')} className="text-sm underline text-primary hover:text-accent focus-ring">
                  {open.social ? 'Show less' : 'Know more'}
                </button>
              </div>
              <AnimatePresence initial={false}>
                {open.social && (
                  <motion.ul key="social" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden list-disc pl-6 space-y-2 text-foreground/80 break-words">
                    {site.programs.socialWelfare.map((item) => (
                      <li key={item} className="break-words">{item}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
              <AnimatePresence initial={false}>
                {open.social && (
                  <motion.div key="social-desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-4 text-sm text-muted-foreground leading-relaxed break-words">
                    We support families with essentials in winters and crises, organize inclusive community feasts (Bhadora),
                    and run ongoing plantation drives for a greener Mithilanchal.
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">6000+</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Plants donated</div>
                      </div>
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">1000+</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Meals served</div>
                      </div>
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">200+</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Blankets distributed</div>
                      </div>
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">Ongoing</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Medical fundraising</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>
            <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-lg text-primary">Health & Safety Awareness</div>
                <button onClick={() => toggle('health')} className="text-sm underline text-primary hover:text-accent focus-ring">
                  {open.health ? 'Show less' : 'Know more'}
                </button>
              </div>
              <AnimatePresence initial={false}>
                {open.health && (
                  <motion.ul key="health" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden list-disc pl-6 space-y-2 text-foreground/80 break-words">
                    {site.programs.healthSafety.map((item) => (
                      <li key={item} className="break-words">{item}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
              <AnimatePresence initial={false}>
                {open.health && (
                  <motion.div key="health-desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-4 text-sm text-muted-foreground leading-relaxed break-words">
                    We collaborate with trusted partners for blood donation camps and conduct safety literacy with Indian Gas
                    to prevent household accidents. Medical aid is raised for patients in need so finances never block care.
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">Multi-org</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Partnered camps</div>
                      </div>
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">6 Jul</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Recent blood camp</div>
                      </div>
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">Awareness</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Safe gas stove usage</div>
                      </div>
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">On-going</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Patient fundraising</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className="p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 md:col-span-2 bg-card/80 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-lg text-primary">Cultural & Spiritual Upliftment</div>
                <button onClick={() => toggle('culture')} className="text-sm underline text-primary hover:text-accent focus-ring">
                  {open.culture ? 'Show less' : 'Know more'}
                </button>
              </div>
              <AnimatePresence initial={false}>
                {open.culture && (
                  <motion.ul key="culture" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden list-disc pl-6 space-y-2 text-foreground/80 break-words">
                    {site.programs.culturalSpiritual.map((item) => (
                      <li key={item} className="break-words">{item}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
              <AnimatePresence initial={false}>
                {open.culture && (
                  <motion.div key="culture-desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-4 text-sm text-muted-foreground leading-relaxed break-words">
                    We celebrate Maithili literature and spirituality—hosting Hari Na Kirtan marathons, Saraswati Puja with
                    youth participation, and Maithili Diwas with poets and artists.
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">36+ hrs</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Continuous kirtan</div>
                      </div>
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">Youth</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">JSS participation</div>
                      </div>
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">Guests</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Cultural icons</div>
                      </div>
                      <div className="p-4 rounded-xl bg-card border border-border/50 text-center min-w-0 flex flex-col items-center justify-center h-24">
                        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">Tradition</div>
                        <div className="text-[11px] md:text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">Sanatan values</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Card className="mt-10 p-6 rounded-2xl shadow-card dark:shadow-card-dark border border-border/50 bg-card/80">
            <div className="font-bold text-lg text-primary mb-3">Where We Are</div>
            <div className="text-foreground/80">{site.address}</div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
