# AWS SDK Client Mock Vitest Reproducer #5

Minimal reproducer project for https://github.com/stschulte/aws-sdk-client-mock-vitest/issues/5.

To reproduce:

1. npm install
2. npm run build
3. 🧨

```
Argument of type 'typeof GetSecretValueCommand' is not assignable to parameter of type 'AwsCommandConstructur<GetSecretValueCommandInput, MetadataBearer>'.
  Construct signature return types 'GetSecretValueCommand' and 'AwsCommand<GetSecretValueCommandInput, MetadataBearer>' are incompatible.
```

Works with `"@aws-sdk/client-secrets-manager": "3.721.0"` (verify it by reverting the latest commit and redo the reproducible steps, but this time it wont crash).

Does not work with `"@aws-sdk/client-secrets-manager": "3.723.0"` (latest commit).
