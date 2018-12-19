const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
// Resolvers
const resolvers = {
  Query: {
    info: () => 'Resolver for info',
    feed: (root, args, context, info) => context.prisma.links(),
    link: (root, args, context) => context.prisma.link({ id: args.id })
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      })
    },
    updateLink: (root, args, context) => {
      return context.prisma.updateLink({
        data: {
          url: args.url,
          description: args.description
        },
        where: {
          id: args.id
        }
      })
    },
    deleteLink: (root, args, context) => {
      return context.prisma.deleteLink({ id: args.id  })
    }
  }
}

// Server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
