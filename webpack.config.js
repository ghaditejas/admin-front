const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'], // cual es la entrada de nuestra aplicacion
  output: {
    filename: 'build.js', // donde colocará los archivos al terminar
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: { // opciones para el servidor de desarrollo
    inline: true, // para que se recargue automáticamente cuando cambie un archivo
    port: 3333, // puerto donde funcionará el servidor
    historyApiFallback: true,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};

