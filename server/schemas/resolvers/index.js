const readerResolvers = require('./readerResolvers');
const passageResolvers = require('./passageResolvers');
const sessionResolvers = require('./sessionResolvers');

const resolvers = {
    Query: {
        ...sessionResolvers.Query,
        ...passageResolvers.Query,
        ...readerResolvers.Query
    },
    Mutation: {
        ...sessionResolvers.Mutation,
        ...passageResolvers.Mutation,
        ...readerResolvers.Mutation
    }
};

module.exports = resolvers;