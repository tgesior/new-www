const path = require('path');
const fs = require('fs');

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const isDev = process.argv[1].indexOf('webpack-dev-server') !== -1;
const PublicPath = '';

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
            { test: /\.(sv|pn|jp)g$/, loader: 'file-loader?name=[path][name].[ext]&context=./src'},
            { test: /CNAME$/, loader: 'file-loader?name=[path][name]&context=./src'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))},
            { test: /\.html$/, loader: StringReplacePlugin.replace({
                replacements: [
                    {
                        pattern: /<!-- @header\((.*)\) -->/ig,
                        replacement: function (fullMatch, p1) {
                            return fs.readFileSync('./src/_header.html', {encoding: 'UTF-8'})
                                .replace(/{{PUBLIC_PATH}}/g, PublicPath)
                                .replace(/{{BODY_CLASS}}/g, p1 || 'standard'); 
                        }
                    },
                    {
                        pattern: /<!-- @footer\(\) -->/ig,
                        replacement: function () {
                            return fs.readFileSync('./src/_footer.html', {encoding: 'UTF-8'})
                                .replace(/{{PUBLIC_PATH}}/g, PublicPath);
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
            browsers: ['>1%', 'last 2 versions']
        })
    ]
};