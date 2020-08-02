const breakpoints = {
  sm: '768px',
  md: '1024px',
  lg: '1440px',
}

module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['src']
    }),
    require('postcss-preset-env')({
      importFrom: [{
        customMedia: {
          '--breakpoint-not-small': `screen and (min-width: ${breakpoints.sm})`,
          '--breakpoint-medium': `screen and (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`,
          '--breakpoint-large': `screen and (min-width: ${breakpoints.md})`,
          '--notPhone': '(width >= 320px)',
          '--phone': `(width < ${breakpoints.sm})`,
          '--tablet': `(width >= ${breakpoints.sm})`,
          '--notTablet': `(width < ${breakpoints.sm}) and (width >= ${breakpoints.md})`,
          '--desktop': `(width >= ${breakpoints.md})`,
          '--notDesktop': `(width < ${breakpoints.md}) and (width >= ${breakpoints.lg})`,
          '--desktopXL': `(width >= ${breakpoints.lg})`,
          '--notDesktopXL': `(width < ${breakpoints.lg})`,
          '--minAspect': '(min-aspect-ratio: 16/9)',
          '--maxAspect': '(max-aspect-ratio: 16/9)',
        }
      }],
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'color-functional-notation': true,
        'color-mod-function': true
      }
    })
  ]
};
