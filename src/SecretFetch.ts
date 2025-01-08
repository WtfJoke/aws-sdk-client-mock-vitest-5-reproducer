import type { SecretsManager } from "@aws-sdk/client-secrets-manager";

export interface SecretFetch {
	getSecretValue<T>(secretName: string): Promise<T>;
}

export class SecretFetchImpl implements SecretFetch {
	private readonly secretsManager: SecretsManager;

	constructor(secretsManager: SecretsManager) {
		this.secretsManager = secretsManager;
	}

	getSecretValue = async <T>(secretId: string): Promise<T> => {
		const { SecretString } = await this.secretsManager.getSecretValue({
			SecretId: secretId,
		});
		if (!SecretString) {
			throw new Error(`Could not retrieve secret '${secretId}'.`);
		}

		return JSON.parse(SecretString) as T;
	};
}
