const { prisma } = require('./src/generated/prisma-client')

async function main() {
  // Create a new Link
  const newLink = await prisma.createLink({
    url: 'www.graphql.com',
    description: 'Best GraphQL tutorial'
  })

  console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`)
  // Read all links from the database and print them to console
  const allLinks = await prisma.links()
  console.log(allLinks)
}

main().catch(err => console.error(err))