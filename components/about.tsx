'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import profile from '../assets/images/fatih.jpg'
import Image from "next/image";
export function About() {
  const technologies = [
    { name: 'React', category: 'Frontend', icon: '⚛️' },
    { name: 'TypeScript', category: 'Language', icon: '🔷' },
    { name: 'Next.js', category: 'Framework', icon: '▲' },
    { name: 'Tailwind CSS', category: 'Styling', icon: '🎨' },
    { name: 'Node.js', category: 'Backend', icon: '💚' },
    { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
    { name: 'Figma', category: 'Design', icon: '🎯' },
    { name: 'Git', category: 'Version Control', icon: '📂' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      <div className="container mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto pt-20"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-serif text-amber-900 mb-6 leading-tight">
              Hakkımda
            </h1>
            <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
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
                <AvatarFallback className="text-4xl bg-amber-100 text-amber-800">
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
              <Card className="border-amber-200 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif text-slate-700 mb-4">
                    Merhaba! Ben Fatih İnan
                  </h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      Ben Fatih İnan, 23 yaşındayım, 2002 doğumluyum. Çocukluğumdan beri bilgisayarlara meraklıyım; liseden itibaren bilişim ve web tasarımıyla ilgileniyorum. 11. sınıfta ASP.NET, 12. sınıfta PHP öğrendim ve ardından Eskişehir Osmangazi Üniversitesi’nde Bilgisayar Programcılığı eğitimi aldım. Yaklaşık 2 yıl POS uzmanı olarak çalıştım ve bu süreç bana güzel bir deneyim kazandırdı.
                    </p>
                    <p>
                      Teknoloji hayatımın büyük bir parçası, ama sadece bu değil. Motor, gitar, fotoğraf makinesi, kamp ekipmanları gibi tutkularım var. Rock/Metal konserlerine gidiyorum; ama diğer tutkularımı gerçekleştirmek için maddi kaynak gerektiği için iş hayatına geri dönmek artık önceliğim.
                    </p>
                    <p>
                      Daldan dala atlamak yerine, sağlam bir başlangıç yapabilmek için bu blog sitesini oluşturdum. Öğrendiklerimi uygulayarak kendimi geliştirmeye devam ediyorum ve uzun vadede e-ticaret projeleriyle hem deneyim kazanmayı hem de tutkularımı gerçekleştirebileceğim gelirler elde etmeyi hedefliyorum.
                    </p>
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
            <h2 className="text-3xl font-serif text-amber-900 text-center mb-8">
              Kullandığım Teknolojiler
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
                  <Card className="border-orange-200 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{tech.icon}</div>
                      <h3 className="font-semibold text-slate-700 mb-1">
                        {tech.name}
                      </h3>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                        {tech.category}
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
