var { graphql, buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The rootValue provides a resolver function for each API endpoint
// 実際のデータ操作をするresolverと呼ばれる部分
var rootValue = {
  hello() {
    return "Hello world!";
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ hello }",
  rootValue,
}).then((response) => {
  console.log(response);
});
