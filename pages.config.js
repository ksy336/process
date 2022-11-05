/*
 * Подключение чанков (page: [module|style, module])
 * Если не указано для страницы, то по-умолчанию подключается только index
 */

const chunksConfig = {
	// '_style-guide': ['future.sass', 'index'],
	// 'index-projects': ['future.sass', 'index'],
	// index: ['future.sass', 'index'],
	// 'index': ['verstka.sass', 'index'],
	//  main: ['parallax', 'index'],
};

//------------------------------------------------------------------------------
const normalizeChunksConfig = config => {
	const result = {};
	for (let row in config) {
		result[row] = config[row].map(entry => entry.replace(/.(j|sas)s$/, ''));
	}
	return result;
};

const chunksEntries = [...new Set(Object.values(chunksConfig).flat())].reduce(
	(r, v) => ({
		...r,
		[v.replace(/.(j|sas)s$/, '')]: v.match(/.sass$/)
			? `./src/styles/${v}`
			: `./src/scripts/${v.replace(/.js$/, '')}.js`,
	}),
	{}
);

const chunks = {
	config: normalizeChunksConfig(chunksConfig),
	entries: chunksEntries,
};

module.exports = chunks;
