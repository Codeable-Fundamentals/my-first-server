import http from "node:http";
import { notes } from "./notes.js";

const requestListener = (_req, response) => {

  if(_req.url === "/notes"){
    response.setHeader("Content-Type", "application/json");
    response.setHeader("code", "200");

    response.end(JSON.stringify({
      data: notes
    }));
  } else {
    response.end(JSON.stringify({
      code: 404,
      status: "error",
      error: "Not Found"
    }));
  }
};

const server = http.createServer(requestListener); // instancia de un Servidor Web HTTP

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
