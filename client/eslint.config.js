import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import promise from 'eslint-plugin-promise'
import react from 'eslint-plugin-react'
import tailwind from 'eslint-plugin-tailwindcss'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const baseConfig = [
  { files: ['**/*.{js,jsx,ts,tsx}'] },
  {
    languageOptions: {
      globals: {
        // Add browser globals (window, document, etc.) so ESLint does not flag them as undefined.
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
]

const tailwindConfig = [
  ...tailwind.configs['flat/recommended'],
  {
    rules: {
      // Check class ordering inside 'cva' (class-variance-authority) calls so variant styles stay consistent.
      // Also check 'at' (custom class prefix utility) calls for selector-prefixed classes.
      'tailwindcss/classnames-order': ['error', { callees: ['cva', 'at'], classRegex: '^(class|classOverride)$' }],
    },
  },
]

const a11yConfig = [
  jsxA11y.flatConfigs.recommended,
]

// JSX-correctness rules formerly provided transitively by neostandard's react plugin.
// We keep only the handful that apply to this TSX codebase and drop the React-DOM-specific rules.
const reactConfig = [
  {
    plugins: {
      react,
    },
    rules: {
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': ['error', { allowGlobals: true }],
      'react/jsx-uses-vars': 'error',
    },
  },
]

const unusedImportsConfig = [
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
    },
  },
]

// Promise executor params must be named resolve/reject.
// Formerly provided by neostandard's promise plugin, re-added directly so this rule stays in coverage.
const promiseConfig = [
  {
    plugins: {
      promise,
    },
    rules: {
      'promise/param-names': 'error',
    },
  },
]

// Core ESLint rules formerly provided by neostandard, inlined directly so this config owns its full rule set.
// Rules already covered by @eslint/js recommended or typescript-eslint strict are intentionally omitted here.
const coreConfig = [
  {
    rules: {
      'accessor-pairs': ['error', { setWithoutGet: true, enforceForClassMembers: true }],
      'array-callback-return': ['error', { allowImplicit: false, checkForEach: false }],
      camelcase: ['error', { allow: ['^UNSAFE_'], properties: 'never', ignoreGlobals: true }],
      curly: ['error', 'multi-line'],
      'default-case-last': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
      'no-caller': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-return-assign': ['error', 'always'],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-unreachable-loop': 'error',
      'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      // Allow void as a statement so it can mark intentional fire-and-forget promises.
      // void inside an expression stays banned, matching the team convention for unawaited calls.
      'no-void': ['error', { allowAsStatement: true }],
      'object-shorthand': ['error', 'properties'],
      'one-var': ['error', { initialized: 'never' }],
      // Flag any destructuring where a member could be const, stricter than the 'all' default.
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      'symbol-description': 'error',
      'unicode-bom': ['error', 'never'],
      // Require the compared value to be a string literal, e.g. typeof x === 'string'.
      'valid-typeof': ['error', { requireStringLiterals: true }],
      yoda: ['error', 'never'],
    },
  },
]

const importConfig = [
  // eslint-plugin-import's recommended base, which must precede the block below so our overrides land.
  // Flat config merges last-wins, so this enables the defaults we then disable or tune.
  importPlugin.flatConfigs.recommended,
  {
    rules: {
      // Disable ESLint's import resolution in favor of TypeScript's more accurate module resolution.
      // TypeScript handles aliases, types, and dynamic imports correctly.
      'import/no-unresolved': 0,

      // Import-correctness rules formerly provided by neostandard's import-x plugin.
      // Folded into the eslint-plugin-import surface we already depend on.
      'import/export': 'error',
      'import/first': 'error',
      'import/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
      'import/no-duplicates': 'error',
      'import/no-named-default': 'error',
      'import/no-webpack-loader-syntax': 'error',

      // Promote these footgun catchers from the recommended set's warn to error.
      // They flag importing a named export as if it were the default.
      'import/no-named-as-default': 'error',
      'import/no-named-as-default-member': 'error',

      // Enforce consistent import ordering by grouping imports into categories.
      // Order is built-ins, external packages, internal modules, relative imports, then type imports.
      'import/order': ['error', {
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
          orderImportKind: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      }],

      // Sort named imports within each import declaration, e.g. import { aaa, bbb, ccc } from 'module'.
      'sort-imports': ['error', {
        ignoreDeclarationSort: true, // Let import/order handle declaration sorting
        allowSeparatedGroups: false,
        ignoreCase: true,
      }],
    },
  },
]

const stylisticConfig = [
  // The recommended-flat base adds rules like trailing commas.
  // It must precede the block below so our per-rule overrides win under flat config's last-wins merge.
  stylistic.configs['recommended-flat'],
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/jsx-one-expression-per-line': 0,
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always', {
        arraysInObjects: true,
        objectsInObjects: true,
      }],
      '@stylistic/jsx-curly-spacing': ['error', {
        when: 'never',
        children: true,
      }],
      '@stylistic/jsx-newline': ['error', {
        prevent: true,
      }],
      '@stylistic/jsx-sort-props': ['error', {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        reservedFirst: true,
      }],
      '@stylistic/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'never',
        afterOpening: 'never',
        beforeClosing: 'never',
      }],
      // Prefer single quotes in JSX attributes to match the rest of the codebase.
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    },
  },
]

// Must be last in the export order so its strict rules override any conflicting rule set above.
// TypeScript's type system handles import resolution, type checking, and variable usage
// more accurately than the equivalent ESLint rules.
const typeScriptConfig = [
  ...tseslint.configs.strict,
  {
    rules: {
      // Allow unused variables and parameters prefixed with _ (e.g. _value, _ctx).
      // Required for emit validators whose param exists purely for type inference.
      // Also allows destructuring to omit props: const { status: _, ...rest } = obj.
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      // Use type aliases over interfaces in app code, matching the team convention.
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  {
    // TypeScript requires interface for module and global augmentation merging.
    // Declaration files and global augmentations are exempt from consistent-type-definitions here.
    files: ['**/*.d.ts', 'src/apps/website/gtag.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
]

// Type-aware bug catchers that need full type information from the TypeScript project.
// projectService discovers the right tsconfig per file, including across project references.
const typeAwareConfig = [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-base-to-string': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true, allowBoolean: true }],
    },
  },
  {
    // Type-aware rules cannot run on plain JS, which has no type information.
    files: ['**/*.{js,jsx}'],
    ...tseslint.configs.disableTypeChecked,
  },
]

// Flat config merges rules last-wins across the flattened array, so the order here is load-bearing.
// Each section places its plugin's recommended base first and its overrides after.
// typeScriptConfig stays last so it wins the final say over conflicting rules.
export default [
  { ignores: ['node_modules/', 'dist/'] },
  ...baseConfig,
  ...tailwindConfig,
  ...a11yConfig,
  ...reactConfig,
  ...unusedImportsConfig,
  ...promiseConfig,
  ...coreConfig,
  ...importConfig,
  ...stylisticConfig,
  ...typeScriptConfig,
  ...typeAwareConfig,
]
