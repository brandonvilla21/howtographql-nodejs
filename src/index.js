const { GraphQLServer } = require('graphql-yoga')
const links = require('./dummy-data')

let idCount = links.length

// Resolvers
const resolvers = {
  Query: {
    info: () => 'Resolver for info',
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    }
  },
  
  // Not needed since this is trivial and GraphQL infer these resolvers
  // Leaving here as a reminder
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

// Server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
