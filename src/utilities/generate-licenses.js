const licenseChecker = require('license-checker');
const fs = require('fs');
const path = require('path');

// Инициализация license-checker
licenseChecker.init(
	{
		start: path.resolve(__dirname, '../../'), // Начать с корня проекта
		production: true, // Только зависимости продакшена
		json: true, // Вывод в формате JSON
	},
	(err, packages) => {
		if (err) {
			console.error('Error:', err);
			process.exit(1);
		}

		// Фильтруем поля, оставляем только нужные
		const filteredPackages = {};
		for (const [name, info] of Object.entries(packages)) {
			filteredPackages[name] = {
				licenses: info.licenses,
				publisher: info.publisher,
				repository: info.repository,
				url: info.url,
			};
		}

		// Сохраняем результат в public/licenses.json
		const outputPath = path.resolve(__dirname, '../../public/licenses.json');
		fs.writeFileSync(outputPath, JSON.stringify(filteredPackages, null, 2));
		console.log('Filtered licenses.json generated successfully!');
	}
);
