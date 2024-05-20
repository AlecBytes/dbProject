// This is the main server file that will run the backend code

// Environment variables for db connection
require("dotenv").config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// Oracle connection parameters
const oracledb = require("oracledb");
let connectionConfig = {
  user: dbUser,
  password: dbPassword,
  connectString: "rjbt2da7d3zjitl6_high",
};

// EXPRESS
const express = require("express");
const app = express();
app.use(express.json());

// Allow cross-origin requests
const cors = require("cors");

// Configure allowed origins
const allowedOrigins = [
  "http://localhost:9000", // Development
  "https://www.baseballdatatrends.com", // Production
];

// Set CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Set additional headers for all responses
app.use(function (req, res, next) {
  const origin = req.header("Origin");
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  next();
});
async function testDB() {
  console.log("Testing DB connection...");
  oracledb.initOracleClient({ libDir: "/usr/lib/oracle/21/client64/lib/" });
  let connection;
  let result;
  try {
    console.log("attempting connection...");	  
    connection = await oracledb.getConnection(connectionConfig);
    console.log(connection);
    console.log("attempting test query...")
    result = await connection.execute("SELECT COUNT(*) FROM player");
    console.log("Successfully connected to Oracle!");
    console.log(result.rows);

  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Successfully closed connection");
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
}

const debug = true;
if (debug) {testDB()};

const fs = require("fs");

async function runQuery1(start, end) {
  let connection;
  connection = await oracledb.getConnection(connectionConfig);
  let result;
  try {
    console.log("Successfully connected to Oracle!");

    let sql;
    try {
      sql = fs.readFileSync("../Queries/query1.sql").toString();
    } catch (err) {
      console.error('Error reading SQL file', err);
    }

    result = await connection.execute(sql, { startYear: start, endYear: end });
    // console.log(result.rows);
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result.rows;
};

async function getTeamsInRange(start, end) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle!");
    const sql = fs.readFileSync("../Queries/getTeamsInRange.sql").toString();
    result = await connection.execute(sql, { startYear: start, endYear: end });
    // console.log(result.rows);
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result.rows;
}

async function runQuery2(start, end, tID) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle!");
    const sql = fs.readFileSync("../Queries/query2.sql").toString();
    result = await connection.execute(sql, {
      startYear: start,
      endYear: end,
      team: tID,
    });
    // console.log(result.rows);
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result.rows;
}

async function runQuery3(start, end, tID) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle!");
    const sql = fs.readFileSync("../Queries/query3.sql").toString();
    result = await connection.execute(sql, {
      startYear: start,
      endYear: end,
      team: tID,
    });
    // console.log(result.rows);
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result.rows;
}

async function runQuery4obp(start, end) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle!");

    let sql;
    try {
      sql = fs.readFileSync("../Queries/query4obp.sql").toString();
    } catch (err) {
      console.error('Error reading SQL file', err);
    }

    result = await connection.execute(sql, { startYear: start, endYear: end });
    // console.log(result.rows);
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result.rows;
}

async function runQuery4obpa(start, end) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle!");

    let sql;
    try {
      sql = fs.readFileSync("../Queries/query4obpa.sql").toString();
    } catch (err) {
      console.error('Error reading SQL file', err);
    }

    result = await connection.execute(sql, { startYear: start, endYear: end });
    console.log(result.rows);
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result.rows;
}

async function runQuery4rf(start, end) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle!");

    let sql;
    try {
      sql = fs.readFileSync("../Queries/query4rf.sql").toString();
    } catch (err) {
      console.error('Error reading SQL file', err);
    }

    result = await connection.execute(sql, { startYear: start, endYear: end });
    console.log(result.rows);
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result.rows;
}

async function runQuery5(percentile, start, end) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle!");
    const sql = fs.readFileSync("../Queries/query5.sql").toString();
    result = await connection.execute(sql, { percentile: percentile, startYear: start, endYear: end });
    console.log(result.rows);
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result.rows;
}

async function submitFeedback(email, name, q1, q2, q3, q4, q5, feedback) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle!");
    const sql = fs.readFileSync("../Queries/submitFeedback.sql").toString();
    console.log(sql);
    result = await connection.execute(
      sql,
      {
        email: email,
        name: name,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5,
        feedback: feedback,
      },
      { autoCommit: true }
    );
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result;
}

app.post("/feedback", async (req, res) => {
  const { email, name, q1, q2, q3, q4, q5, feedback } = req.body;
  await submitFeedback(email, name, q1, q2, q3, q4, q5, feedback);

  res.send("Feedback received");
});

async function countTuples() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(connectionConfig);
    console.log("Successfully connected to Oracle!");

    let sql;
    try {
      sql = fs.readFileSync("../Queries/count.sql").toString();
    } catch (err) {
      console.error('Error reading SQL file', err);
    }

    result = await connection.execute(sql);
    console.log(result.rows);
  } catch (err) {
    console.error("Error connecting to the database", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the database connection", err);
      }
    }
  }
  return result.rows;
}

app.use(express.static("../client/dist/spa/"));
const server = app.listen(3000, '0.0.0.0', () => {
  console.log("server started at localhost:3000");
});

app.get("/q3/teams_in_range", async (req, res) => {
  const rows = await getTeamsInRange(req.query.startYear, req.query.endYear);
  res.send(rows);
});

app.get("/q3", async (req, res) => {
  const rows = await runQuery3(
    req.query.startYear,
    req.query.endYear,
    req.query.team
  );
  res.send(rows);
});

app.get("/q2", async (req, res) => {
  const rows = await runQuery2(
    req.query.startYear,
    req.query.endYear,
    req.query.team
  );
  res.send(rows);
});

app.get("/q5", async (req, res) => {
  const rows = await runQuery5(req.query.percentile, req.query.startYear, req.query.endYear);
  res.send(rows);
});

app.get("/q2/teams_in_range", async (req, res) => {
  const rows = await getTeamsInRange(req.query.startYear, req.query.endYear);
  res.send(rows);
});

app.get("/q1", async (req, res) => {
  const rows = await runQuery1(req.query.startYear, req.query.endYear);
  res.send(rows);
});

app.get("/q4/obp", async (req, res) => {
  const rows = await runQuery4obp(req.query.startYear, req.query.endYear);
  res.send(rows);
});
app.get("/q4/obpa", async (req, res) => {
  const rows = await runQuery4obpa(req.query.startYear, req.query.endYear);
  res.send(rows);
});
app.get("/q4/rf", async (req, res) => {
  const rows = await runQuery4rf(req.query.startYear, req.query.endYear);
  res.send(rows);
});

app.get("/count", async (req, res) => {
  const rows = await countTuples();
  res.send(rows);
});
