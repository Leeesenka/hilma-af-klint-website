import { motion } from 'framer-motion'

const SourcesSection = () => {
  const museums = [
    {
      name: 'Guggenheim Museum',
      location: 'New York, USA',
      description: 'Крупнейшая коллекция работ Хильмы аф Клинт. Выставка 2018 года стала прорывом в признании художницы.',
      link: 'https://www.guggenheim.org',
      icon: '🏛️',
    },
    {
      name: 'Moderna Museet',
      location: 'Stockholm, Sweden',
      description: 'Шведский музей современного искусства, хранящий значительную часть наследия аф Клинт.',
      link: 'https://www.modernamuseet.se',
      icon: '🎨',
    },
    {
      name: 'Art Gallery of NSW',
      location: 'Sydney, Australia',
      description: 'Австралийская коллекция, включающая работы из серии "Paintings for the Temple".',
      link: 'https://www.artgallery.nsw.gov.au',
      icon: '🖼️',
    },
  ]

  const resources = [
    {
      title: 'Каталоги и публикации',
      items: [
        'Hilma af Klint: Paintings for the Future (Guggenheim, 2018)',
        'Hilma af Klint: The Complete Catalogue Raisonné',
        'The Five: The Spiritual Art of Hilma af Klint',
      ],
    },
    {
      title: 'Выставки',
      items: [
        'Hilma af Klint: Paintings for the Future (Guggenheim, 2018-2019)',
        'Hilma af Klint: The Secret Pictures (Moderna Museet, 2013)',
        'Hilma af Klint: A Pioneer of Abstraction (Moderna Museet, 2013)',
      ],
    },
  ]

  return (
    <section
      id="sources"
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
            Sources & Further Reading
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Основные источники информации о творчестве Хильмы аф Клинт и серии
            "Paintings for the Temple".
          </p>
        </motion.div>

        {/* Museums */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-serif font-semibold mb-8 text-temple-dark">
            Основные коллекции
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {museums.map((museum, index) => (
              <motion.a
                key={museum.name}
                href={museum.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 hover:border-temple-gold transition-all"
              >
                <div className="text-4xl mb-4">{museum.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-temple-dark">
                  {museum.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{museum.location}</p>
                <p className="text-gray-700 text-sm">{museum.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200"
              >
                <h4 className="text-xl font-semibold mb-4 text-temple-dark">
                  {resource.title}
                </h4>
                <ul className="space-y-2">
                  {resource.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-700 text-sm flex items-start"
                    >
                      <span className="text-temple-gold mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image rights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl border-2 border-gray-200"
        >
          <h3 className="text-2xl font-serif font-semibold mb-4 text-temple-dark">
            Image Rights
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Все изображения работ Хильмы аф Клинт защищены авторским правом. Права на
            воспроизведение принадлежат соответствующим музеям и фондам. При использовании
            изображений необходимо проверять лицензии и получать разрешения от правообладателей.
            Для коммерческого использования требуется специальное разрешение.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default SourcesSection

