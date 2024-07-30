var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");

var { ruruHTML } = require("ruru/server");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    quoteOfTheDay:String
    random:Float!
    rollThreeDice:[Int]
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
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

//   graphqlを用いたpost方法
//   fetch("/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify({ query: "{ hello }" }),
//   })
//     .then(r => r.json())
//     .then(data => console.log("data returned:", data))

// チュートリアルURL
// https://graphql.org/graphql-js/