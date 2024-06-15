'use client'

import { ConnectButton } from "./connect-wallet";
import { ToggleTheme } from "./toggle-theme";
import { Coins } from "lucide-react";

export const Nav = () => {
    return (
        <nav className="flex items-center justify-between p-4">
            <Coins size={32} />
            <div className="flex items-center space-x-4">
                <ConnectButton />
                <ToggleTheme />
            </div>
        </nav>
    );
}