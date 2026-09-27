module.exports = {
  ci: {
    collect: {
      url: ["http://127.0.0.1:3109/"],
      numberOfRuns: 1,
      startServerCommand:
        "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3109",
      startServerReadyPattern: "Ready",
      settings: { chromeFlags: "--no-sandbox" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 1 }],
      },
    },
    upload: { target: "filesystem", outputDir: "lighthouse-report" },
  },
};
