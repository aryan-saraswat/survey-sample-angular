const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// let samples = [{
//     id: 1,
//     name: "SamplePerson",
//     email: "SampleEmail",
//     howOften: "MODERATE",
//     choice: "FASTFOOD"
// }]

// let idCount = samples.length;
// 2
const resolvers = {
  Query: {
    info: () => `This is the API of the survey challenge database`,
    allPersons: async(parent, args, context) => {
        return context.prisma.person.findMany()
    },
  },

  Mutation: {
    createPerson: (parent, args, context, info) => {
        const newPerson = context.prisma.person.create({
          data: {
            name: args.name,
            email: args.email,
            howOften: args.howOften,
            choice: args.choice
          },
        })
        return newPerson
      },
  }
}

const fs = require('fs');
const path = require('path');

// 3
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
      ),
  resolvers,
  context: {
      prisma
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );