import { cleanEnv, port } from "envalid";

cleanEnv(process.env, {
    PORT: port(),
});
