import {
	AeSdkAepp,
	BrowserWindowMessageConnection,
	Encoded,
	Node,
	SUBSCRIPTION_TYPES,
	walletDetector,
 } from '@aeternity/aepp-sdk';
import { useState, useMemo, useCallback } from 'react';

import network from '../configs/network';

/**
 * æternitySDK Hook
 *
 */
const useAeternitySDK = () => {
	const [address, setAddress] = useState<Encoded.AccountAddress | undefined>();
  const [networkId, setNetworkId] = useState<string | undefined>();
	
	const aeSdk = useMemo(
		() => new AeSdkAepp({
			name: "aepp-boilerplate",
			nodes: [{ name: network.id, instance: new Node(network.url) }],
			onAddressChange: ({ current }) => {
				setAddress(Object.keys(current)[0] as Encoded.AccountAddress);
			},
			onNetworkChange: ({ networkId }) => {
				setNetworkId(networkId);
			},
			onDisconnect: () => console.log('Wallet disconnected'),
		}),
		[],
	);

	const connectToWallet = useCallback(async (): Promise<void> => {
    type HandleWallets = Parameters<typeof walletDetector>[1];
    // TODO: remove NonNullable after releasing https://github.com/aeternity/aepp-sdk-js/pull/1801
    type Wallet = NonNullable<Parameters<HandleWallets>[0]['newWallet']>;

    const wallet = await new Promise<Wallet>((resolve) => {
      let stopScan: ReturnType<typeof walletDetector>;
      const handleWallets: HandleWallets = async ({ wallets, newWallet }) => {
        newWallet = newWallet || Object.values(wallets)[0];
        stopScan();
        resolve(newWallet);
      };
      const scannerConnection = new BrowserWindowMessageConnection();
      stopScan = walletDetector(scannerConnection, handleWallets);
    });

    await aeSdk.connectToWallet(await wallet.getConnection());
    await aeSdk.subscribeAddress(SUBSCRIPTION_TYPES.subscribe, 'current');
    // TODO: remove after releasing https://github.com/aeternity/aepp-sdk-js/issues/1802
    aeSdk.onAddressChange({ current: { [aeSdk.address]: {} }, connected: {} });
  }, [aeSdk]);

	return { aeSdk, connectToWallet, address, networkId };
}

export default useAeternitySDK;
