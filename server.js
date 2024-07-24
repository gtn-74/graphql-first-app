var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The rootValue provides a resolver function for each API endpoint
// 実際のデータ操作をするresolverと呼ばれる部分
var root = {
  hello() {
    return "Hello world!";
  },
};

var app = express();

// Create and use the GraphQL handler.

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// サーバーの実行はされるが、これだけだとクエリできてない。なんでだ？
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql")
