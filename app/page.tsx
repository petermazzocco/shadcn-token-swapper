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
import {
  useAccount,
} from "wagmi";
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

export default function Page() {
  // Chain & Account
  const { address, isConnected } = useAccount();

  // Form validation for token swap form
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

  // Form state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: zeroAddress,
      amount: 0, // This value needs to be formatted depending on the tokens decimals
      minOutValue: "0.99",
    },
  });

  // Submit the form
  function onSubmit(values: z.infer<typeof formSchema>) {
    // enter the logic to swap the token via wagmi here
    console.log("the token", values)
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
                            <SelectValue placeholder="Select a verified email to display" />
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
                        <FormLabel>
                          From Amount:
                        </FormLabel>
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
                  <FormLabel>
                    To Amount:
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="100" disabled />
                  </FormControl>
                  <FormDescription className="text-xs flex flex-row justify-between">
                    <span>Estimated Amount</span>
                    <span>0.00</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
                {/* if the token is native, we do not need the slippage tolerance */}
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
                {/* if the token is native, we do not need the Approve button*/}
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