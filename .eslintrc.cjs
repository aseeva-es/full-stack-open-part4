module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jest": true,
        "cypress/globals": true
    },
    "extends": 'eslint:recommended',
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react", "jest", "cypress"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": [
            "error"
        ],
        "arrow-spacing": [
            "error", {"before": true, "after": true}
        ],
        "no-console": 0
    }
}
