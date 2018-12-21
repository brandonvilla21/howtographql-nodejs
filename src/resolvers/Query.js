function feed (root, args, context, info) {
  return context.prisma.links()
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