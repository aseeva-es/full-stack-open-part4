module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jest": true
    },
    "extends": 'eslint:recommended',
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", {"before": true, "after": true}
        ],
        "no-console": 0
    }
}
