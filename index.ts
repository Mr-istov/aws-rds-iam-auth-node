import { createConnection } from "any-db";
import AWS from "aws-sdk";
import { exit } from "process";
import { readFileSync } from "fs";

require("dotenv").config();

const signer = new AWS.RDS.Signer({
  hostname: process.env.DB_HOST,
  username: process.env.DB_USER,
  region: "us-east-1",
  port: 5432,
});

signer.getAuthToken({}, (err, token) => {
  if (err) {
    console.error("Couldn't retrieve auth token...");
    console.log(err);
    exit(255);
  } else {
    const dbUrl = {
      adapter: "postgres",
      user: process.env.DB_USER,
      password: token,
      database: "testdb",
      host: process.env.DB_HOST,
      port: 5432,
      ssl: {
        ca: readFileSync(__dirname + "/rds-ca-2019-root.pem").toString(),
        rejectUnauthorized: true,
      },
    };

    let db = createConnection(dbUrl);

    let sql = "SELECT * FROM movies";

    db.query(sql).on("data", (row: any): void => {
      console.log(row);
    });
  }
});
