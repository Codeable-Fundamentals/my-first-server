import http from "node:http";
import { notes } from "./notes.js";
import { routes } from "./routes.js";

// true or false
function isValidPath(_req) {
  const urlPrincipalPath = _req.url.split("/")[1];
  return routes.includes(urlPrincipalPath);
}

const requestListener = (_req, response) => {
  const pathvalid = isValidPath(_req);
  if (pathvalid) {
    if (_req.url === "/notes") {
      response.setHeader("Content-Type", "application/json");
      response.setHeader("code", "200");

      // responde toda la lista de notas
      response.end(
        JSON.stringify({
          data: notes,
        })
      );
    } else if (_req.url.startsWith("/notes/")) {
      const id = _req.url.split("/")[2]; // paso 1 : encontramos el id
      const note = notes.find((note) => note.id === parseInt(id)); // paso 2: encontramos el objeto correspondinete al id

      if (note) {
        response.end(JSON.stringify(note));
      } else {
        response.end(JSON.stringify({
          code: 404,
          message: "el ID es invalido",
          errorID: "NOT_FOUND"
        }));
      }
    } else {
      response.end(
        JSON.stringify({
          status: 400,
          message: "Esta ruta aun no esta habilitada, estamos trabajando....",
        })
      );
    }
  } else {
    response.end(
      JSON.stringify({
        status: 404,
        message: "El path no fue encontrado!",
      })
    );
  }

  // caso en que no haya ruta
  if (_req.url === undefined) {
    response.end(
      JSON.stringify({
        code: 404,
        status: "error",
        error: "Not Found",
      })
    );
  }
};

const server = http.createServer(requestListener); // instancia de un Servidor Web HTTP

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
