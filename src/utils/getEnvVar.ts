import { config } from 'dotenv';

config();

export const getEnvVar = (key: string, defaultValue?: string): string => {
    const variableValue = process.env[key] ?? defaultValue;

    if (!variableValue) {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return variableValue;
}
