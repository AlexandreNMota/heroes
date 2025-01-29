import type { JestConfigWithTsJest } from "ts-jest";
import { defaults } from "ts-jest/presets";

const config: JestConfigWithTsJest = {
  ...defaults,
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

export default config;
