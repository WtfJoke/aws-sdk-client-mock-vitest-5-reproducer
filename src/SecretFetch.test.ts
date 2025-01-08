import {
	GetSecretValueCommand,
	SecretsManager,
} from "@aws-sdk/client-secrets-manager";
import { mockClient } from "aws-sdk-client-mock";
import { expect, it } from "vitest";
import { SecretFetchImpl } from "./SecretFetch.js";

it("should return secret value object", async () => {
	// ARRANGE
	const secretManagerMock = mockClient(SecretsManager);
	const secretFetch = new SecretFetchImpl(new SecretsManager({}));

	secretManagerMock.on(GetSecretValueCommand).resolves({
		SecretString: JSON.stringify({ foo: "bar" }),
	});

	// ACT
	const secretObject = await secretFetch.getSecretValue("secret1");

	// ASSERT
	expect(secretObject).toEqual({ foo: "bar" });
	expect(secretManagerMock).toHaveReceivedCommandTimes(
		GetSecretValueCommand,
		1,
	);
});
