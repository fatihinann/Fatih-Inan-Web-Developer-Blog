'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Brain, Heart, GraduationCap, Award } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export function PortfolioSection() {
  const { t } = useTranslation();

  const portfolioItems = [
    {
      id: 'gunnur-teksen',
      title: t('portfolio.projects.gunnurTeksen.title'),
      description: t('portfolio.projects.gunnurTeksen.description'),
      tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'React'],
      link: 'https://pskgunnurteksen.vercel.app/',
      image: '/assets/portfolio/gunnur-teksen.png',
      accentColor: '#1d391e',
      badge: t('portfolio.projects.gunnurTeksen.badge'),
      features: [
        { icon: <Brain className="w-5 h-5" />, text: t('portfolio.projects.gunnurTeksen.features.therapy1') },
        { icon: <Heart className="w-5 h-5" />, text: t('portfolio.projects.gunnurTeksen.features.therapy2') },
        { icon: <GraduationCap className="w-5 h-5" />, text: t('portfolio.projects.gunnurTeksen.features.education') },
        { icon: <Award className="w-5 h-5" />, text: t('portfolio.projects.gunnurTeksen.features.certificates') }
      ]
    }
  ];

  return (
    <section className="py-24 px-4 bg-muted/30 dark:bg-background/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
            {t('portfolio.title')}
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-border"
            >
              <div className="flex flex-col lg:flex-row items-center">
                {/* Image Container */}
                <div className="lg:w-3/5 w-full relative h-[300px] lg:h-[500px] overflow-hidden bg-muted">
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: item.accentColor }}
                  />
                  {/* Actual project preview would go here */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full h-full rounded-xl shadow-2xl overflow-hidden border border-border transform group-hover:scale-[1.02] transition-transform duration-500 bg-background flex flex-col">
                      <div className="h-8 bg-muted border-b border-border flex items-center px-4 gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                        <h3 className="text-2xl font-serif text-foreground">{item.title}</h3>
                        <div className="flex gap-4">
                          {item.features.map((f, i) => (
                            <div key={i} className="p-3 rounded-full bg-secondary dark:bg-muted text-muted-foreground">
                              {f.icon}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.badge}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className="lg:w-2/5 w-full p-8 lg:p-12 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500 dark:bg-amber-200/30 dark:text-amber-500 border border-amber-200 dark:border-amber-800/50">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-serif text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-4">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-foreground/80">
                        <div className="text-amber-500">{feature.icon}</div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-foreground text-background hover:opacity-90 rounded-xl py-6 flex items-center justify-center gap-2 group/btn shadow-lg">
                        {t('portfolio.viewProject')}
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground mb-6">{t('portfolio.comingSoon')}</p>
          <a href='https://github.com/fatihinann/Psikolog-Gunnur-Teksen' target='_blank' rel='noopener noreferrer'>
            <Button variant="outline" className="rounded-full px-8 py-6 border-border hover:bg-muted flex items-center gap-2 mx-auto">
              {t('portfolio.exploreMore')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
