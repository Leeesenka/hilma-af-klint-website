import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const TempleSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const levels = [
    {
      name: 'Ground Level',
      series: 'Paintings for the Temple',
      description: 'Основание храма — серия работ, создающих фундамент духовного путешествия',
      color: 'from-purple-500/30 to-blue-500/30',
    },
    {
      name: 'First Level',
      series: 'The Ten Largest',
      description: 'Четыре этапа жизни человека: детство, юность, зрелость, старость',
      color: 'from-pink-500/30 to-rose-500/30',
    },
    {
      name: 'Top Level',
      series: 'Altarpieces',
      description: 'Алтарные работы — кульминация храма, высшая точка духовного пути',
      color: 'from-yellow-500/30 to-orange-500/30',
    },
  ]

  return (
    <section
      id="temple"
      ref={ref}
      className="relative min-h-screen py-32 px-6" style={{ backgroundColor: '#C1C0B6' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-temple-dark">
            The Temple
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Концепция храма — центральная идея творчества Хильмы аф Клинт.
            Картины как архитектура невидимого мира, где каждая серия занимает
            свой уровень в духовном здании.
          </p>
        </motion.div>

        {/* Temple concept */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20 bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200"
        >
          <h3 className="text-3xl font-serif font-semibold mb-6 text-temple-dark">
            Что такое Paintings for the Temple
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Идея единства за пределами дуальностей. Хильма аф Клинт создавала
            картины как части единого храма — места, где материальное и духовное,
            видимое и невидимое встречаются в гармонии.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Каждая работа — это не просто изображение, а карта невидимого мира,
            проводник в пространство, где формы, цвета и символы говорят на языке,
            который превосходит слова.
          </p>
        </motion.div>

        {/* Temple architecture with levels */}
        <div className="relative">
          <h3 className="text-3xl font-serif font-semibold mb-12 text-center text-temple-dark">
            Храм как архитектура
          </h3>

          <div className="space-y-8">
            {levels.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative bg-gradient-to-r ${level.color} p-8 rounded-xl backdrop-blur-sm border border-white/30`}
                style={{ y }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h4 className="text-2xl font-serif font-semibold mb-2 text-temple-dark">
                      {level.name}
                    </h4>
                    <p className="text-xl font-medium text-gray-800 mb-2">
                      {level.series}
                    </p>
                    <p className="text-gray-700">{level.description}</p>
                  </div>
                  <div className="w-32 h-32 bg-white/50 rounded-lg flex items-center justify-center border-2 border-temple-gold/30">
                    <span className="text-4xl">🏛️</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="/gallery"
            className="inline-block px-8 py-4 bg-temple-gold text-white font-semibold rounded-lg hover:bg-temple-dark transition-colors shadow-lg"
          >
            Explore by level
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default TempleSection

