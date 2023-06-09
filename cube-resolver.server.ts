import express from "express";

import { Request, Response, Router } from "express";

import fs from "fs";
import path from "path";
import TwoPhase from "./resolvers/node-two-phase-algorithm/index";

const TABLE_DIR = path.join(
  __dirname,
  "../resolvers/node-two-phase-algorithm/tables/"
);

const server = express();

const route = Router();

server.use(express.json());

server.use("/dist", express.static(path.join(__dirname)));

route.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

route.get(
  "/cube-resolver/:kociembaString",
  (
    { params: { kociembaString } }: Request<{ kociembaString: string }>,
    res: Response
  ) => {
    if (!fs.existsSync(TABLE_DIR)) {
      fs.mkdirSync(TABLE_DIR);
    }
    for (const file of fs.readdirSync(TABLE_DIR)) {
      fs.unlinkSync(path.join(TABLE_DIR, file));
    }

    console.clear();

    console.log("\nInitiating algorithm...", { kociembaString }, "\n");

    TwoPhase.initialize(function () {
      TwoPhase.solve(
        kociembaString,
        30,
        60,
        false,
        function (err: Error, solution: string) {
          if (err) {
            console.error(err);
            throw err;
          }

          console.log("\nSolution:", solution, "\n");

          TwoPhase.close();

          res.send(solution);
        }
      );
    });
  }
);

server.use(route);

server.listen(3333, () => "server running on port 3333");

console.log("\nhttp://localhost:3333/\n");
