// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      "vendor.js": /^(?!app)/, // Files that are not in `app` dir.
      "app.js": /^app/
    }
  },
  templates: {
    joinTo: 'app.js'
  },
  stylesheets: { joinTo: "app.css" }
};

exports.npm = {
  styles: {
    "font-awesome": ["css/font-awesome.css"]
  }
};

// Turn off growl
exports.notifications = false;

const postCssProcessors = [
  require('autoprefixer')(["last 2 versions"])
]

// Because vueify does not check for ENV
if(process.env.NODE_ENV === 'production') {
  postCssProcessors.push(require('csswring')())
}

const vueComponentStylesDir = "public/components.css"

exports.plugins = {
  postcss: {
    postCssProcessors
  },
  vue: {
    extractCSS: true,
    postcss: postCssProcessors,
    out: vueComponentStylesDir
  },
  copycat: {
    fonts: [
      "node_modules/font-awesome/fonts"
    ],
    onlyChanged: true
  }
};
