import {
    Address,
    Avatar,
    Name,
    Identity,
    EthBalance,
} from '@coinbase/onchainkit/identity';
import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';

export function WalletComponents() {
    return (
        <div className="flex flex-col gap-8 mx-auto p-8">
            <Wallet>
                <ConnectWallet>
                    <CoinbaseWalletLogo />
                    <Name />
                </ConnectWallet>
                <WalletDropdown>
                    <WalletDropdownDisconnect className="justify-center"/>
                </WalletDropdown>
            </Wallet>
        </div>
    );
}