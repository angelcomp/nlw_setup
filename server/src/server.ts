import Fastify from "fastify";
import cors from "@fastify/cors"
import { appRoutes } from "./routes";

const app = Fastify()

app.register(cors)
app.register(appRoutes)

const host = "192.168.0.106"
let port = 8080

app.listen({ port: port, host: host }).then(() => {
    console.log("HTTP Server Running on "+ host + ":" + port)
})
