import { cleanEnv, port } from "envalid";

function validateEnv(): void {
    cleanEnv(process.env, {
        PORT: port(),
    });
}

export default validateEnv;
