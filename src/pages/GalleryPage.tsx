import { useState } from 'react'
import { motion } from 'framer-motion'

const GalleryPage = () => {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
  const [filterYear, setFilterYear] = useState<string>('all')
  const [filterColor, setFilterColor] = useState<string>('all')

  const series = [
    {
      id: 'temple',
      name: 'Paintings for the Temple',
      description: 'Основная серия работ, создававшаяся с 1906 по 1915 год. Более 190 картин, объединенных идеей духовного храма.',
      works: [
        { id: 1, title: 'Group I, Primordial Chaos, No. 7', year: 1906, color: 'purple', image: 'https://www.art-prints-on-demand.com/kunst/afklint/Group-I-No-7-Primordial-Chaos.jpg' },
        { id: 2, title: 'Group I, Primordial Chaos, No. 2', year: 1906, color: 'blue' },
        { id: 3, title: 'Group I, Primordial Chaos, No. 3', year: 1906, color: 'purple' },
        { id: 4, title: 'Group IV, The Ten Largest, No. 1', year: 1907, color: 'pink' },
        { id: 5, title: 'Group IV, The Ten Largest, No. 2', year: 1907, color: 'rose' },
        { id: 6, title: 'Group X, Altarpieces, No. 1', year: 1915, color: 'yellow' },
        { id: 7, title: 'Group X, Altarpieces, No. 2', year: 1915, color: 'orange' },
        { id: 8, title: 'Group X, Altarpieces, No. 3', year: 1915, color: 'yellow' },
      ],
    },
    {
      id: 'ten-largest',
      name: 'The Ten Largest',
      description: 'Серия из десяти монументальных работ, исследующих четыре этапа жизни человека.',
      works: [
        { id: 9, title: 'No. 1, Childhood', year: 1907, color: 'pink' },
        { id: 10, title: 'No. 2, Childhood', year: 1907, color: 'pink' },
        { id: 11, title: 'No. 3, Childhood', year: 1907, color: 'rose' },
        { id: 12, title: 'No. 4, Youth', year: 1907, color: 'purple' },
        { id: 13, title: 'No. 5, Youth', year: 1907, color: 'blue' },
        { id: 14, title: 'No. 6, Youth', year: 1907, color: 'purple' },
        { id: 15, title: 'No. 7, Adulthood', year: 1907, color: 'yellow' },
        { id: 16, title: 'No. 8, Adulthood', year: 1907, color: 'orange' },
        { id: 17, title: 'No. 9, Old Age', year: 1907, color: 'blue' },
        { id: 18, title: 'No. 10, Old Age', year: 1907, color: 'purple' },
      ],
    },
    {
      id: 'altarpieces',
      name: 'Altarpieces',
      description: 'Алтарные работы — кульминация храма, высшая точка духовного пути.',
      works: [
        { id: 19, title: 'Altarpiece No. 1', year: 1915, color: 'yellow' },
        { id: 20, title: 'Altarpiece No. 2', year: 1915, color: 'orange' },
        { id: 21, title: 'Altarpiece No. 3', year: 1915, color: 'yellow' },
      ],
    },
  ]

  const allWorks = series.flatMap((s) => s.works)
  const years = Array.from(new Set(allWorks.map((w) => w.year.toString()))).sort()
  const colors = Array.from(new Set(allWorks.map((w) => w.color)))

  const filteredWorks = allWorks.filter((work) => {
    const yearMatch = filterYear === 'all' || work.year.toString() === filterYear
    const colorMatch = filterColor === 'all' || work.color === filterColor
    return yearMatch && colorMatch
  })

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      purple: 'from-purple-100 to-purple-200',
      blue: 'from-blue-100 to-blue-200',
      pink: 'from-pink-100 to-pink-200',
      rose: 'from-rose-100 to-rose-200',
      yellow: 'from-yellow-100 to-yellow-200',
      orange: 'from-orange-100 to-orange-200',
    }
    return colorMap[color] || 'from-gray-100 to-gray-200'
  }

  return (
    <div className="min-h-screen py-32 px-6 relative" style={{ backgroundColor: '#C1C0B6' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-temple-dark">
            Gallery
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Исследуйте коллекцию работ Хильмы аф Клинт из серии "Paintings for the Temple"
          </p>
        </motion.div>

        {/* Series selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedSeries(null)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedSeries === null
                ? 'bg-temple-gold text-white shadow-lg'
                : 'bg-white text-temple-dark hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Works
          </button>
          {series.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSeries(s.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedSeries === s.id
                  ? 'bg-temple-gold text-white shadow-lg'
                  : 'bg-white text-temple-dark hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-temple-dark focus:outline-none focus:border-temple-gold"
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-temple-dark focus:outline-none focus:border-temple-gold"
          >
            <option value="all">All Colors</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Series description */}
        {selectedSeries && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl mb-8 border border-gray-200"
          >
            <h3 className="text-2xl font-serif font-semibold mb-2 text-temple-dark">
              {series.find((s) => s.id === selectedSeries)?.name}
            </h3>
            <p className="text-gray-700">
              {series.find((s) => s.id === selectedSeries)?.description}
            </p>
          </motion.div>
        )}

        {/* Works grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredWorks
            .filter((work) => !selectedSeries || series.find((s) => s.works.includes(work))?.id === selectedSeries)
            .map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:border-temple-gold transition-all cursor-pointer"
              >
                {work.image ? (
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="aspect-square object-cover w-full"
                    loading="lazy"
                  />
                ) : (
                  <div className={`aspect-square bg-gradient-to-br ${getColorClass(work.color)} flex items-center justify-center`}>
                    <span className="text-6xl">🎨</span>
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-semibold text-sm mb-1 text-temple-dark line-clamp-2">
                    {work.title}
                  </h4>
                  <p className="text-xs text-gray-600">{work.year}</p>
                </div>
              </motion.div>
            ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No works found matching the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GalleryPage

