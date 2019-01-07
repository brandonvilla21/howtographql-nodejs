async function feed (root, args, context, info) {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter },
    ]
  }: {}

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })
  return links
}

function link (root, args, context) {
  return context.prisma.link({ id: args.id })
}

function info () {
  return 'resolver info'
}

module.exports = {
  feed,
  link,
  info
}