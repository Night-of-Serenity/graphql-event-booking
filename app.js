const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const crypto = require("crypto");

const app = express();

app.use(express.json());

const events = [];

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type RootQuery {
        events: [Event!]! 
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const { title, description, price, date } = args.eventInput;
        console.log({ args });
        const event = {
          _id: crypto.randomBytes(20).toString("hex"),
          title: title,
          description: description,
          price: +price,
          date: new Date(date).toISOString(),
        };
        events.push(event);
        console.log({ events });
        return event;
      },
    },
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server runing on port 3000");
});
