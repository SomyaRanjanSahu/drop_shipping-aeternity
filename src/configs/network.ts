/**
 * Testnet & Mainnet nodeConfig
 *
 * @returns {Object} æ node config
 */
const networks = {
	development: {
		id: "ae_uat",
		url: "https://testnet.aeternity.io",
		compilerUrl: "https://compiler.aepps.com",

	},
	production: {
		id: "ae_mainnet",
		url: "https://mainnet.aeternity.io",
		compilerUrl: "https://compiler.aepps.com",
	},
} as const;

const mode = (process.env.REACT_APP_NODE_ENV ?? 'development') as keyof typeof networks;

export default networks[mode];
