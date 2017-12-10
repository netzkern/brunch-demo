const sass = require('node-sass')
const postcss = require('postcss')
const csswring = require('csswring')

const production = process.env.NODE_ENV === 'production'

// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  },
  templates: {
    joinTo: 'app.js'
  },
  stylesheets: {
    joinTo: {
      'app.css': /^(?!app\/components)/,
      'global-components.css': /^app\/components/
    }
  }
}

exports.npm = {
  styles: {
    'font-awesome': ['css/font-awesome.css']
  }
}

exports.paths = {
  public: './public',
  watched: ['app']
}

// Turn off growl
exports.notifications = false

const postCssProcessors = [require('autoprefixer')(['last 2 versions'])]

if(production) {
  postCssProcessors.push(csswring())
}

exports.plugins = {
  postcss: {
    processors: postCssProcessors
  },
  sveltejs: {
    css: false,
    extractCSS: true,
    out: './public/components.css',
    preprocess: {
      style: ({ content, attributes }) => {
        if (attributes.type !== 'text/scss') return

        const sassResult = sass.renderSync({
          data: content,
          outputStyle: production ? 'compressed' : 'expanded',
          includePaths: ['app'],
          sourceMap: true,
          outFile: 'x' // this is necessary, but is ignored
        })

        const css = sassResult.css.toString()

        const postcssResult = postcss(postCssProcessors).process(css).css

        return {
          code: postcssResult,
          map: postcssResult.map
        }
      }
    }
  },
  copycat: {
    fonts: ['node_modules/font-awesome/fonts'],
    onlyChanged: true
  }
}
