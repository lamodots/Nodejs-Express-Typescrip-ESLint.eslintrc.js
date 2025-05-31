# Nodejs-Express-Typescrip-ESLint.eslintrc.js
This configuration will enforce Node.js best practices while leveraging TypeScript's type safety for backend development. The rules specifically address server-side concerns like process management, stream handling, and production security.


## Required Dependencies:

```bash

npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-node \
eslint-plugin-unicorn eslint-plugin-sonarjs eslint-plugin-promise \
eslint-plugin-jest eslint-plugin-express eslint-plugin-security \
eslint-plugin-no-relative-import-paths eslint-config-prettier

```
This configuration balances Express' flexibility with production robustness. It enforces error handling patterns critical for Node.js services while allowing Express-specific conventions like route param patterns and middleware signatures.

# Key Features for Express/Node.js:
## Recommended tsconfig.json Settings:

```bash
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    },
    "esModuleInterop": true,
    "strict": true
  }
}

```

## Express-Specific Setup Tips:

    Error Handling Pattern
    Create src/middleware/errorHandler.ts:

```js

import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Your error handling logic
};
export default errorHandler;

```

## Route File Convention
Use src/routes/[feature].routes.ts pattern:

```js
import { Router } from 'express';
import { createUser } from '@/controllers/user.controller';

const router = Router();

router.post('/', createUser); // Will be linted with route-specific rules

export default router;

```

## Controller Structure
Example user.controller.ts:

```js
import type { RequestHandler } from 'express';

// Linter allows 5+ params in controllers
export const updateUser: RequestHandler = async (
  req,  // Allowed as abbreviation
  res,  // Allowed as abbreviation
  next
) => {
  // Controller logic
};

```


## Test File Exceptions
Jest test files get special treatment:

```js

// tests/user.test.ts
import request from 'supertest';
import app from '@/app'; // Absolute import allowed

// No lint errors for test-specific patterns

```

## 🛠 Where Should I Put the Config?

```bash
my-project/
├── .eslintrc.js    # or .json or .yml
├── tsconfig.json
├── package.json
└── src/

```
## You can test that ESLint works manually from the terminal:

```batch
npx eslint 

If it shows errors/warnings, then ESLint is working — now tell VSCode to respect it.
```


## Configure VSCode Settings to Respect ESLint

Go to File > Preferences > Settings  (or press Ctrl + ,), and search for eslint. 

Ensure these settings are enabled: 
settings.json Directly
Open the command palette (Ctrl+Shift+P) → type Preferences: Open User Settings (JSON) → Add the following:
```json
{
  "eslint.enable": true,
  "eslint.autoFixOnSave": true,
  "eslint.options": {
    "configFile": ".eslintrc.js"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}

```

## If you're working in a team or want to enforce settings per-project, create a folder:


```bash
.vscode/settings.json
```
And put the same settings as above there. This ensures everyone uses the same linting setup.

```json

{
  "eslint.enable": true,
  "eslint.autoFixOnSave": true,
  "eslint.options": {
    "configFile": ".eslintrc.js"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
