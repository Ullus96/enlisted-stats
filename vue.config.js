const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	chainWebpack: (config) => {
		// Существующая настройка для vue-loader
		config.module
			.rule('vue')
			.use('vue-loader')
			.tap((options) => {
				if (!options.compilerOptions) {
					options.compilerOptions = {};
				}
				options.compilerOptions.isCustomElement = (tag) => tag === 'search';
				return options;
			});

		// Новая настройка для Terser (удаление комментариев и минимизация)
		config.optimization.minimizer('terser').tap((args) => {
			args[0].terserOptions = {
				...args[0].terserOptions,
				compress: {
					drop_console: true, // Не удаляем console.log (можно поставить true, если не нужны)
					drop_debugger: true, // Удаляем debugger
				},
				mangle: true, // Сокращаем имена переменных
				output: {
					comments: false, // Удаляем все комментарии, включая лицензии
				},
			};
			return args;
		});
	},
});
