'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import profile from '../public/assets/images/fatih.jpg'
import Image from "next/image";
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();
  const technologies = [
    { name: 'React', category: 'about.technologies.react', icon: '⚛️' },
    { name: 'TypeScript', category: 'about.technologies.ts', icon: '🔷' },
    { name: 'Next.js', category: 'about.technologies.nextjs', icon: '▲' },
    { name: 'Tailwind CSS', category: 'about.technologies.tailwind', icon: '🎨' },
    { name: 'Node.js', category: 'about.technologies.nodejs', icon: '💚' },
    { name: 'PostgreSQL', category: 'about.technologies.postgresql', icon: '🐘' },
    { name: 'Figma', category: 'about.technologies.figma', icon: '🎯' },
    { name: 'Git', category: 'about.technologies.git', icon: '📂' },
  ];

  return (
    <div className="min-h-screen bg-gradient-theme">

      <div className="container mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto pt-20"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
              {t('about.title')}
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>

          {/* Biography Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="md:col-span-1 text-center"
            >
              <Avatar className="w-48 h-48 mx-auto mb-6">
                <AvatarFallback className="text-4xl bg-muted text-muted-foreground">
                  <Image src={profile} alt="Fatih İnan" width={192} height={192} />
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="md:col-span-2"
            >
              <Card className="border-border bg-card shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl text-foreground font-serif mb-4">
                    {t('about.hello')}
                  </h2>
                  <div className="space-y-4 leading-relaxed text-muted-foreground">
                    <p>{t('about.description.part1')}</p>
                    <p>{t('about.description.part2')}</p>
                    <p>{t('about.description.part3')}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Technologies Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-serif text-center mb-8 text-foreground">
              {t('about.usedTechnologies')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="border-border bg-card hover:shadow-md transition-all duration-200 hover:border-primary">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{tech.icon}</div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {tech.name}
                      </h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs border-primary/20">
                        {t(tech.category)}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
