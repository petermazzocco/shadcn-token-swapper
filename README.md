# Token Swapper Component for Next.js

This guide will help you set up and use the Token Swapper component in a Next.js project. The component allows users to swap tokens using Wagmi and Viem libraries. Follow the instructions below to get started.

## Prerequisites

Ensure you have already initialized a Next.js project with the latest versions of Wagmi and Viem. You can use any wallet provider you wish with this method.

## Token Swapper Component

Copy the following code into your component file:

```ts
"use client";

import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAccount } from "wagmi";
import { ArrowUpDownIcon } from "lucide-react";
import { zeroAddress } from "viem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export const Swapper = () => {
  const { address, isConnected } = useAccount();

  const formSchema = z.object({
    token: z
      .string()
      .min(42, { message: "Invalid token address" })
      .max(42, { message: "Invalid token address" })
      .includes("0x", {
        message: "Invalid token address. Please include 0x prefix.",
      }),
    amount: z
      .number()
      .min(0.0001, { message: "Minimum amount is 0.0001" }),
    minOutValue: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: zeroAddress,
      amount: 0,
      minOutValue: "0.99",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("the token", values);
  }

  return (
    <div className="grid justify-center pt-24">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Token Swapper</CardTitle>
          <p className="text-xs">{isConnected && `Connected Account: ${address}`}</p>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select A Token To Swap:</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a token" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={zeroAddress}>Native</SelectItem>
                          <SelectItem value="stable_token_address">
                            Stable Coin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row justify-between">
                        <FormLabel>From Amount:</FormLabel>
                      </div>
                      <FormControl>
                        <Input placeholder="100" type="number" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs flex flex-row justify-between">
                        <span>Current Price</span>
                        <span>0.00</span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid justify-center items-center">
                  <ArrowUpDownIcon className="w-6 h-6" />
                </div>
                <FormItem>
                  <FormLabel>To Amount:</FormLabel>
                  <FormControl>
                    <Input placeholder="100" disabled />
                  </FormControl>
                  <FormDescription className="text-xs flex flex-row justify-between">
                    <span>Estimated Amount</span>
                    <span>0.00</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
                {form.getValues("token") !== zeroAddress && (
                  <FormField
                    control={form.control}
                    name="minOutValue"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Select A Slippage Tolerance</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="0.99" />
                              </FormControl>
                              <FormLabel className="font-normal">1%</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="0.95" />
                              </FormControl>
                              <FormLabel className="font-normal">5%</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="0.90" />
                              </FormControl>
                              <FormLabel className="font-normal">10%</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {form.getValues("token") !== zeroAddress && (
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="w-full"
                    disabled={form.formState.isDirty || !isConnected}
                  >
                    Approve Stable Coin To Swap
                  </Button>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    form.formState.isDirty || !isConnected
                  }
                >
                  Swap For Token
                </Button>
              </form>
            </Form>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link href="https://github.com/petermazzocco/shadcn-token-swapper" target="_blank" className="text-primary">
            View on Github
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
```

## Starting a New Project

If you haven't initialized a Next.js project and would like to start fresh with Wagmi, Viem, Tanstack, ConnectKit, and Shadcn, follow these steps:

**Clone the Repository:**

```sh
git clone https://github.com/your-repo/token-swapper.git
cd token-swapper
```

**Install Dependencies:**
```sh
npm install
```

**Update the env**

Update the .env file with your WalletConnect project ID:
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
```


## Custom Wallet Provider

If you clone the repository but want to implement your own wallet provider, you can do so in the `web3-provider.tsx` component. Modify it to fit your specific wallet provider requirements.

## Useful Links

- **Shadcn Documentation:** [Shadcn UI](https://ui.shadcn.com/docs)
- **Viem Documentation:** [Viem](https://viem.sh/)
- **Wagmi Documentation:** [Wagmi](https://wagmi.sh/)
- **Tanstack Documentation:** [Tanstack](https://tanstack.com/)
- **ConnectKit Documentation:** [ConnectKit](https://docs.family.co/connectkit)