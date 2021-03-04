module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/index.ts",
        "!src/functions/proxy.ts",
        "!src/functions/postAsset.ts",
    ],
    coverageThreshold: {
        global: {
            branches: 5,
            functions: 7,
            lines: 0,
            statements: 6,
        },
    },
};
