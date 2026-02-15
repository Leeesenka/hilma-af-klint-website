import { motion } from 'framer-motion'

const TimelineSection = () => {
  const events = [
    { year: 1862, event: 'Рождение Хильмы аф Клинт', type: 'life' },
    { year: 1882, event: 'Начало обучения в Королевской академии искусств', type: 'education' },
    { year: 1896, event: 'Создание группы "Пять" (De Fem)', type: 'spiritual' },
    { year: 1906, event: 'Начало работы над "Paintings for the Temple"', type: 'temple', highlight: true },
    { year: 1907, event: 'Создание серии "The Ten Largest"', type: 'temple', highlight: true },
    { year: 1915, event: 'Завершение "Paintings for the Temple"', type: 'temple', highlight: true },
    { year: 1944, event: 'Смерть Хильмы аф Клинт', type: 'life' },
  ]

  const getEventColor = (type: string) => {
    switch (type) {
      case 'temple':
        return 'bg-temple-gold'
      case 'spiritual':
        return 'bg-purple-500'
      case 'education':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <section
      id="timeline"
      className="relative min-h-screen py-32 px-6" style={{ backgroundColor: '#C1C0B6' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-temple-dark">
            Timeline
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            1862–1944: Путь художницы и духовного исследователя. Особенно важный период —
            1906–1915, время создания "Paintings for the Temple".
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-temple-gold to-gray-400 transform md:-translate-x-1/2"></div>

          {/* Events */}
          <div className="space-y-12">
            {events.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Year marker */}
                <div className="flex-shrink-0 w-16 md:w-24 text-right md:text-center">
                  <div
                    className={`inline-block px-4 py-2 rounded-lg font-bold text-white ${getEventColor(
                      item.type
                    )} ${item.highlight ? 'ring-4 ring-temple-gold/50 scale-110' : ''}`}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-temple-gold rounded-full z-10"></div>

                {/* Event card */}
                <div
                  className={`flex-1 bg-white p-6 rounded-xl shadow-lg border-2 ${
                    item.highlight
                      ? 'border-temple-gold bg-temple-gold/5'
                      : 'border-gray-200'
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2 text-temple-dark">
                    {item.event}
                  </h3>
                  {item.highlight && (
                    <span className="inline-block px-3 py-1 bg-temple-gold/20 text-temple-dark rounded-full text-sm font-medium">
                      Paintings for the Temple
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highlight period */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-temple-gold/20 to-purple-500/20 p-8 md:p-12 rounded-2xl border-2 border-temple-gold"
        >
          <h3 className="text-2xl font-serif font-semibold mb-4 text-temple-dark">
            Период 1906–1915: Создание "Paintings for the Temple"
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Это десятилетие стало кульминацией духовного и художественного пути Хильмы аф Клинт.
            В этот период она создала более 190 картин, которые должны были стать частью
            спиралевидного храма. Работы создавались под руководством духовных наставников,
            которых художница называла "Высшими Учителями". Серия включает в себя несколько
            групп: "Primordial Chaos", "The Ten Largest", "Altarpieces" и другие.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default TimelineSection

