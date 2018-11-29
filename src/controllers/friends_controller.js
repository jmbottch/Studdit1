const neo4j = require('neo4j-driver').v1;
const neo = require('./neo4j_setup');





const driver = neo4j.driver('https://hobby-ccflbaaccbcogbkemkneffbl.dbs.graphenedb.com:24780/db/data/',
  neo4j.auth.basic('jeroen', 'b.m1mQSF3xsOsB.5LbY3TnSpyUejZ6B'), console.log("Neo4j is running on port 3000"));

const session = driver.session(() => {
  console.log("Neo4j is connected")
});

module.exports = {

  create(req, res, next) {

    const userProps = req.body;
    const username = req.body.username;
    const session = driver.session();

    User.create(userProps);
    const addResult = session.run(
      'CREATE (a:User{username: $username}) RETURN a',
      { username: username }
    );
    addResult.then(result => {
      session.close();
      driver.close();
    });

    console.log('User has been added');
  },

  createRelation(req, res, next) {

    const userProps = req.body;
    const username = req.body.username;
    const session = driver.session();

    User.create(userProps);
    const addResult = session.run(
      'MATCH (a:Person), (b:Person) WHERE a.username = $username AND b.username = $username CREATE (a)-[r:RELTYPE]->(b) RETURN type(r)',
      { username: username }
    );
    addResult.then(result => {
      session.close();
      driver.close();
    });

    console.log('User has been added');
  }
};