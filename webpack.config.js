const path = require('path');
const fs = require('fs');

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
];

module.exports = {
    entry:  './src/index.ts',
    output: {
        path: './dist',
        filename: 'bundle.js',
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },

    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader'},
            { test: /\.(sv|pn|jp)g$/, loader: 'file-loader'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))},
            { test: /\.html$/, loader: StringReplacePlugin.replace({
                replacements: [
                    {
                        pattern: /<!-- @header\((.*)\) -->/ig,
                        replacement: function (fullMatch, p1) {
                            return fs.readFileSync('./src/_header.html', {encoding: 'UTF-8'}).replace('{{BODY_CLASS}}', p1 || 'standard'); 
                        }
                    },
                    {
                        pattern: /<!-- @footer\(\) -->/ig,
                        replacement: function () {
                            return fs.readFileSync('./src/_footer.html', {encoding: 'UTF-8'});
                        }
                    }
                ]
            })}
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new StringReplacePlugin()
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ]
};