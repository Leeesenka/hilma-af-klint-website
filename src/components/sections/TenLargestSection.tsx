import { motion } from 'framer-motion'
import { useState } from 'react'

const TenLargestSection = () => {
  const [activeStage, setActiveStage] = useState<'childhood' | 'youth' | 'adulthood' | 'old-age'>('childhood')

  const stages = {
    childhood: {
      title: 'Childhood',
      years: '1907',
      description: 'Первые работы серии — исследование начала жизни, чистоты и невинности. Формы просты и ясны, цвета светлые и прозрачные.',
      works: [
        { id: 1, title: 'No. 1', year: 1907 },
        { id: 2, title: 'No. 2', year: 1907 },
        { id: 3, title: 'No. 3', year: 1907 },
      ],
    },
    youth: {
      title: 'Youth',
      years: '1907',
      description: 'Энергия и рост — период становления личности. Композиции становятся более сложными, появляются динамичные формы.',
      works: [
        { id: 4, title: 'No. 4', year: 1907 },
        { id: 5, title: 'No. 5', year: 1907 },
        { id: 6, title: 'No. 6', year: 1907 },
      ],
    },
    adulthood: {
      title: 'Adulthood',
      years: '1907',
      description: 'Зрелость и баланс — период полной реализации потенциала. Гармония форм и цветов достигает пика.',
      works: [
        { id: 7, title: 'No. 7', year: 1907 },
        { id: 8, title: 'No. 8', year: 1907 },
      ],
    },
    'old-age': {
      title: 'Old Age',
      years: '1907',
      description: 'Мудрость и завершение цикла — возвращение к простоте, но с глубоким пониманием. Формы снова упрощаются, но несут в себе весь опыт пути.',
      works: [
        { id: 9, title: 'No. 9', year: 1907 },
        { id: 10, title: 'No. 10', year: 1907 },
      ],
    },
  }

  return (
    <section
      id="ten-largest"
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
            The Ten Largest
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Серия из десяти монументальных работ, исследующих четыре этапа жизни человека.
            Каждая работа — это медитация на тему развития и трансформации.
          </p>
        </motion.div>

        {/* Stage tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(Object.keys(stages) as Array<keyof typeof stages>).map((stageKey) => (
            <button
              key={stageKey}
              onClick={() => setActiveStage(stageKey)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeStage === stageKey
                  ? 'bg-temple-gold text-white shadow-lg'
                  : 'bg-white text-temple-dark hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {stages[stageKey].title}
            </button>
          ))}
        </div>

        {/* Active stage content */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 mb-12"
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <h3 className="text-3xl font-serif font-semibold mb-2 text-temple-dark">
                {stages[activeStage].title}
              </h3>
              <p className="text-lg text-gray-600">{stages[activeStage].years}</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {stages[activeStage].description}
          </p>

          {/* Works grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {stages[activeStage].works.map((work) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg p-6 border border-gray-200 hover:border-temple-gold transition-all cursor-pointer"
              >
                <div className="aspect-square bg-white/50 rounded mb-4 flex items-center justify-center">
                  <span className="text-4xl">🎨</span>
                </div>
                <h4 className="font-semibold mb-1">{work.title}</h4>
                <p className="text-sm text-gray-600">{work.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Deep dive section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 md:p-12 rounded-2xl border border-purple-200"
        >
          <h3 className="text-2xl font-serif font-semibold mb-6 text-temple-dark">
            Deep Dive: Ключевые работы
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="aspect-video bg-white/50 rounded-lg mb-4"></div>
              <h4 className="font-semibold mb-2">Композиция и форма</h4>
              <p className="text-gray-700 text-sm">
                Исследование того, как геометрические формы взаимодействуют с органическими,
                создавая визуальный язык трансформации.
              </p>
            </div>
            <div>
              <div className="aspect-video bg-white/50 rounded-lg mb-4"></div>
              <h4 className="font-semibold mb-2">Цветовая палитра</h4>
              <p className="text-gray-700 text-sm">
                Каждый этап жизни имеет свою цветовую характеристику, отражающую
                эмоциональное и духовное состояние.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TenLargestSection

