const neo4j = require('neo4j-driver').v1;


const driver = neo4j.driver('bolt://hobby-ohmdodfghkjagbkemhkmcfbl.dbs.graphenedb.com:24786', 
neo4j.auth.basic('admin', 'b.xiLYIxT1grWi.YxWAjdJoufQvgZ3D'));