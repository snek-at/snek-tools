module.exports = {
  config: (entry = []) => {
    return [...entry, require.resolve('./preview')]
  },
  managerEntries: function (entry = []) {
    return [...entry, require.resolve('./register')]
  },
  webpackFinal: async (config: any) => {
    // WA due to: https://github.com/storybookjs/storybook/pull/13300
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': '@emotion/react',
          'emotion-theming': '@emotion/react'
        }
      }
    }
  }
}
