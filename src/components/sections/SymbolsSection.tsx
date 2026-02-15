import { motion } from 'framer-motion'
import { useState } from 'react'

const SymbolsSection = () => {
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null)

  const dualities = [
    {
      name: 'Свет / Тьма',
      description: 'Фундаментальная дуальность, пронизывающая все работы. Не противопоставление, а взаимодополнение.',
      icon: '⚡',
    },
    {
      name: 'Дух / Материя',
      description: 'Взаимосвязь невидимого и видимого миров. Материя как проявление духа.',
      icon: '✨',
    },
    {
      name: 'Женское / Мужское',
      description: 'Единство противоположностей, создающее целостность. Баланс энергий.',
      icon: '⚖️',
    },
  ]

  const forms = [
    {
      name: 'Круг',
      description: 'Символ единства, целостности, бесконечности. Форма без начала и конца.',
      examples: ['Единство', 'Цикличность', 'Завершенность'],
    },
    {
      name: 'Спираль',
      description: 'Развитие, эволюция, движение от центра наружу и обратно. Путь духовного роста.',
      examples: ['Эволюция', 'Рост', 'Трансформация'],
    },
    {
      name: 'Диаграммы',
      description: 'Схемы невидимых связей, карты духовного мира. Визуализация абстрактных концепций.',
      examples: ['Связи', 'Структура', 'Карта'],
    },
  ]

  return (
    <section
      id="symbols"
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
            Symbols & Language
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Словарь форм и смыслов. Как читать картины Хильмы аф Клинт без обещаний
            точной расшифровки — каждый символ открыт для интерпретации.
          </p>
        </motion.div>

        {/* Dualities */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-serif font-semibold mb-8 text-temple-dark">
            Дуальности
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {dualities.map((duality, index) => (
              <motion.div
                key={duality.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredSymbol(duality.name)}
                onMouseLeave={() => setHoveredSymbol(null)}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                  hoveredSymbol === duality.name
                    ? 'border-temple-gold bg-temple-gold/10 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-4">{duality.icon}</div>
                <h4 className="text-xl font-semibold mb-3 text-temple-dark">
                  {duality.name}
                </h4>
                <p className="text-gray-700">{duality.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Forms */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-serif font-semibold mb-8 text-temple-dark">
            Формы
          </h3>
          <div className="space-y-6">
            {forms.map((form, index) => (
              <motion.div
                key={form.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredSymbol(form.name)}
                onMouseLeave={() => setHoveredSymbol(null)}
                className={`p-8 rounded-xl border-2 transition-all ${
                  hoveredSymbol === form.name
                    ? 'border-temple-gold bg-temple-gold/10 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h4 className="text-2xl font-semibold mb-3 text-temple-dark">
                      {form.name}
                    </h4>
                    <p className="text-gray-700 mb-4">{form.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {form.examples.map((example) => (
                        <span
                          key={example}
                          className="px-3 py-1 bg-temple-gold/20 text-temple-dark rounded-full text-sm"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-temple-gold/30">
                    <span className="text-4xl">
                      {form.name === 'Круг' && '⭕'}
                      {form.name === 'Спираль' && '🌀'}
                      {form.name === 'Диаграммы' && '📊'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reading guide */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 md:p-12 rounded-2xl border border-yellow-200"
        >
          <h3 className="text-2xl font-serif font-semibold mb-6 text-temple-dark">
            Как читать
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Хильма аф Клинт не оставила точного словаря символов. Каждая работа —
            это открытое послание, которое каждый может интерпретировать по-своему.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Важно не искать единственно правильное значение, а позволить формам и цветам
            говорить с вами напрямую. Символы работают на интуитивном уровне, создавая
            мост между видимым и невидимым мирами.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default SymbolsSection

