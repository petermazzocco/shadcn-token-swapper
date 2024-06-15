"use client";

import { WalletIcon } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { Button } from "@/components/ui/button";

export const ConnectButton = () => {
    return (
        <ConnectKitButton.Custom>
            {({ isConnected, truncatedAddress, show }) => {
                return (
                    <Button onClick={show} variant={"default"}>
                        {isConnected ? truncatedAddress : <WalletIcon size={16} />}
                    </Button>
                );
            }}
        </ConnectKitButton.Custom>
    );
};