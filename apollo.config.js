module.exports = {
  client: {
    service: {
      name: 'clash',
      // URL to the GraphQL API
      url: 'http://localhost:3000/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.tsx', 'src/**/*.ts'],
  },
};
