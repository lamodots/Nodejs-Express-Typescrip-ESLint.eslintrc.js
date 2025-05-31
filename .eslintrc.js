// ESLint Configuration File (JavaScript API)

module.exports = {
  // Root configuration file (stops looking up for parent configs)
  root: true,

  // Use TypeScript parser for type-aware linting
  parser: '@typescript-eslint/parser',

  // Parser options specific to @typescript-eslint/parser
  parserOptions: {
    // Path to tsconfig.json for type checking support
    project: './tsconfig.json',
    
    // ECMAScript version to support
    ecmaVersion: 2022,
    
    // Treat files as ES modules
    sourceType: 'module',
    
    // Directory containing tsconfig.json
    tsconfigRootDir: __dirname,
  },

  // Extends recommended configurations from various plugins
  extends: [
    'airbnb-typescript/base', // Airbnb style guide with TypeScript support
    'plugin:@typescript-eslint/recommended', // Base @typescript-eslint rules
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // Rules requiring type info
    'plugin:node/recommended-module', // Node.js best practices
    'plugin:unicorn/recommended', // Stylistic improvements and modern JS practices
    'plugin:sonarjs/recommended', // Code quality and complexity checks
    'plugin:promise/recommended', // Promise-related linting
    'plugin:jest/recommended', // Jest testing support
    'plugin:express/recommended', // Express.js middleware & routing linting
    'prettier' // Disable conflicting rules from Prettier integration
  ],

  // Explicitly register additional plugins
  plugins: [
    '@typescript-eslint',
    'express',
    'no-relative-import-paths' // Enforces absolute paths in imports
  ],

  // Define global environments
  env: {
    node: true, // Enable Node.js globals
    es2022: true, // Enable ES2022 features
    jest: true // Enable Jest globals
  },

  // Custom rule overrides
  rules: {
    //
    // === Core Express/Node Rules ===
    //
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
    'node/no-missing-import': 'off', // Let TypeScript handle import resolution
    'node/file-extension-in-import': ['error', 'always', { '.ts': 'never' }], // No .ts in imports
    'express/use-error-handler': 'error', // Must use error-handling middleware

    //
    // === TypeScript Enhancements ===
    //
    '@typescript-eslint/consistent-type-imports': 'error', // Prefer type-only imports
    '@typescript-eslint/no-unnecessary-type-assertion': 'error', // Discourage unnecessary assertions
    '@typescript-eslint/prefer-nullish-coalescing': 'error', // Encourage ?? over ||
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } }
    ], // Prevent misuse of async functions in event handlers

    //
    // === Security Rules ===
    //
    'security/detect-object-injection': 'off', // False positives are common here
    'security/detect-non-literal-fs-filename': 'error', // Prevent unsafe fs usage

    //
    // === Express-specific Patterns ===
    //
    'express/avoid-unused-params': 'warn', // Unused route params are discouraged
    'express/require-error-handling': 'error', // Require proper error handling in routes

    //
    // === Import Organization ===
    //
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: true, prefix: '@' }
    ], // Absolute imports only (e.g., @/services instead of ../services)
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in Node modules
          'external', // External packages
          'internal', // Internal modules (based on resolver settings)
          'parent', // ../
          'sibling', // ./file
          'index' // ./index
        ],
        'newlines-between': 'always'
      }
    ], // Enforce consistent import order

    //
    // === Production Optimization & Complexity Control ===
    //
    'sonarjs/cognitive-complexity': ['error', 15], // Limit function cognitive complexity
    'complexity': ['error', 10], // Cyclomatic complexity limit
    'max-depth': ['error', 4], // Max nested blocks allowed
    'max-params': ['error', 5], // Functions should not have too many parameters

    //
    // === Unicorn Adjustments for Express ===
    //
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          req: true,
          res: true,
          err: true,
          env: true,
          params: true,
          config: true
        }
      }
    ], // Allow common Express abbreviations
    'unicorn/no-array-reduce': 'off', // Reduce is useful in Express contexts
    'unicorn/prefer-module': 'off', // Allow CJS if needed
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true
        },
        ignore: ['*.d.ts', '*.config.ts', 'express.ts']
      }
    ], // Enforce filename casing but allow exceptions

    //
    // === Overrides for Airbnb Style Guide in Express Contexts ===
    //
    'import/prefer-default-export': 'off', // Named exports preferred in Express apps
    'class-methods-use-this': 'off', // Common to have methods without `this` in controllers
    'no-underscore-dangle': ['error', { allowAfterThis: true }], // Allow _private fields
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement'
    ] // Restrict problematic language constructs
  },

  // Override rules for specific file types or directories
  overrides: [
    {
      files: ['**/*.controller.ts'],
      rules: {
        'max-classes-per-file': 'off', // Controllers often export one class per file
        'class-methods-use-this': 'off' // Controller methods don't always need `this`
      }
    },
    {
      files: ['**/*.test.ts', '**/__tests__/**'],
      rules: {
        'sonarjs/no-identical-functions': 'off', // Duplicates are common in tests
        'sonarjs/cognitive-complexity': 'off', // Relax complexity for test code
        'jest/no-mocks-import': 'off', // Allow importing mocks
        '@typescript-eslint/no-unsafe-assignment': 'off', // Allow any typing in tests
        '@typescript-eslint/no-unsafe-member-access': 'off', // Allow deep property access
        'node/no-unpublished-import': 'off' // Allow devDependencies in tests
      }
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicates': 'off' // Allow duplicate imports in declaration files
      }
    },
    {
      files: ['src/routes/**/*.ts'],
      rules: {
        'max-params': 'off', // Route handlers may require more than 5 parameters
        'express/use-error-handler': 'off' // Handled by centralized middleware
      }
    }
  ],

  // Configuration for plugin-specific behaviors
  settings: {
    // Import resolver settings for path resolution
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true // Try .d.ts files even when no source file exists
      },
      node: {
        extensions: ['.ts', '.js'] // Resolve both TS and JS imports
      }
    },
    // Express plugin settings
    'express/ignore': [
      'middleware/errorHandler.ts' // Skip double-checking this known error handler
    ]
  }
};
