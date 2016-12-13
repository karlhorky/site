const path = require('path');

const React = require('react');
const _ = require('lodash');
const rssPlugin = require('antwar-rss-plugin');
const prevnextPlugin = require('antwar-prevnext-plugin');

const reactHeaders = require('./headers/react');
const webpackHeaders = require('./headers/webpack');

const sections = require('./sections');

module.exports = {
  template: {
    title: 'SurviveJS',
    file: path.join(__dirname, 'template.ejs')
  },
  title: 'SurviveJS',
  author: 'Juho Vepsäläinen',
  template: {
    title: 'SurviveJS',
    // RSS settings if you want to expose a RSS feed
    rss: {
      title: 'SurviveJS',
      href: '/atom.xml'
    }
  },
  blog: {
    author: function() {
      return React.createElement(
        "span",
        null,
        "Published by Juho ",
        React.createElement(
          "a",
          { href: "https://twitter.com/bebraw", className: "twitter" },
          "@bebraw"
        ),
        " Vepsäläinen"
      );
    }
  },
  keywords: ['webpack', 'react', 'javascript', 'programming', 'web development'],
  pageTitle: function(config, pageTitle) {
    var siteName = config.name;

    if(pageTitle === 'index') {
      return siteName;
    }

    return siteName + ' - ' + pageTitle;
  },
  plugins: [
    rssPlugin({
      baseUrl: 'http://survivejs.com/',
      sections: ['blog']
    }),
    prevnextPlugin()
  ],
  layout: function() {
    return require('./layouts/Site.jsx').default;
  },
  style: function() {
    require('./styles/custom.scss');
    require('./styles/prism.css');
    require('./styles/fontello-codes.css');
    require('./styles/fontello-embedded.css');
  },
  paths: {
    '/': {
      path: function() {
        return require('./pages/index.jsx');
      }
    },
    blog: sections.blog(),
    react: sections.react(reactHeaders),
    webpack_react: sections.webpackReact(),
    webpack: sections.webpack(webpackHeaders)
  }
};
