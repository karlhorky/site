const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const webpack = require('webpack');

const cwd = process.cwd();
const componentPaths = [
  path.join(cwd, 'components'),
  path.join(cwd, 'layouts'),
  path.join(cwd, 'pages')
];
const stylePaths = [
  path.join(cwd, 'styles')
];

const commonConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  // XXX: Is this needed?
  resolveLoader: {
    alias: {
      markdown: path.join(cwd, 'loaders/markdown')
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: componentPaths
      },
      {
        test: /\.woff2?$/,
        loaders: ['url-loader?prefix=font/&limit=10000&mimetype=application/font-woff']
      },
      {
        test: /\.jpg$/,
        loaders: ['file-loader']
      },
      {
        test: /\.png$/,
        loaders: ['file-loader']
      },
      {
        test: /\.svg$/,
        loaders: ['file-loader']
      },
      {
        test: /\.html$/,
        loaders: ['raw-loader']
      }
    ]
  },
  postcss: function() {
    return [ Autoprefixer ];
  },
  sassLoader: {
    includePaths: [ path.join('./styles') ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '../react/manuscript/images',
        to: 'react/images',
      },
      {
        from: '../webpack/manuscript/images',
        to: 'webpack/images',
      },
      {
        from: '../react/project_source/builds',
        to: 'demos',
      },
      {
        from: './assets',
        to: './assets'
      },
      {
        from: './extra',
        to: '.'
      }
    ])
  ]
};

const interactiveConfig = {
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

const developmentConfig = {
  module: {
    loaders: [
      {
        test: /\.font.js$/,
        loaders: ['style-loader', 'css-loader', 'fontgen-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: stylePaths
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        include: stylePaths
      }
    ]
  }
};

const buildConfig = {
  plugins: [
    new ExtractTextPlugin('[chunkhash].css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.font.js$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!fontgen-loader?embed'
        )
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        ),
        include: stylePaths
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss-loader!sass-loader'
        ),
        include: stylePaths
      }
    ]
  }
};

module.exports = function(env) {
  switch(env) {
    case 'start':
      return merge(
        commonConfig,
        developmentConfig
      );
    case 'interactive':
      return merge(
        commonConfig,
        interactiveConfig
      );
    case 'build':
    case 'lint:links':
      return merge(
        commonConfig,
        buildConfig
      );
  }
};
