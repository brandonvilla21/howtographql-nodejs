const { GraphQLServer } = require('graphql-yoga')
let links =  [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

// Resolvers
const resolvers = {
  Query: {
    info: () => 'Resolver for info',
    feed: () => links,
    link: (parent, args) => links.find(e => e.id === args.id)
  },
  Mutation: {
    post: (parent, args) => {
      console.log(args)
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      const index = links.findIndex(e => e.id === args.id)
      links[index] = {
        ...links[index],
        ...args
      }
      return links[index]
    },
    deleteLink: (parent, args) => {
      const index = links.findIndex(e => e.id === args.id)
      const nextLinks = [
        ...links.slice(0, index),
        ...links.slice(index + 1)
      ]
      const returnLink = links[index]
      links = nextLinks
      return returnLink
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
