const readerResolvers = require('./readerResolvers');
const passageResolvers = require('./passageResolvers');
const readingResolvers = require('./readingResolvers');

const resolvers = {
    Query: {
        ...readingResolvers.Query,
        ...passageResolvers.Query,
        ...readerResolvers.Query
    },
    Mutation: {
        ...readingResolvers.Mutation,
        ...passageResolvers.Mutation,
        ...readerResolvers.Mutation
    }
};

module.exports = resolvers;