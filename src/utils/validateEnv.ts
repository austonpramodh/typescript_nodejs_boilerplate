import { cleanEnv, str, port, num } from "envalid";

function validateEnv(): void {
    cleanEnv(process.env, {
        PORT: port(),
    });
}

export default validateEnv;
