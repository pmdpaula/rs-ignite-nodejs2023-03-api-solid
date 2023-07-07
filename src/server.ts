import { app } from "./app";
import { env } from "./env";

const port = 3333;

app.listen({ port: env.PORT, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`🥁🥁🥁 Server listening on ${address}`);
});
