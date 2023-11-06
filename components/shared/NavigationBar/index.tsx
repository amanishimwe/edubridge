"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

export default function NavigationBar({ children }) {
  return (
    <>
      <div className="h-20 border-b fixed w-full  bg-white">
        <div className=" container flex items-center h-full justify-between">
          <div className="flex space-x-3">
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>
                <Image
                  alt="logo"
                  src="/imgs/un_logo.svg"
                  width={40}
                  height={40}
                />
              </div>
              <Separator orientation="vertical" />
              <div>
                <Image alt="logo" src="/imgs/logo.svg" width={40} height={40} />
              </div>
            </div>
          </div>

          <h3 className="scroll-m-20 text-3xl font-bold tracking-tight">
            EduBridge
          </h3>

          <Button className="rounded-full " variant={"secondary"} size={"sm"}>
            share
          </Button>
        </div>
      </div>
      <div className="bg-[red] pt-20">{children}</div>
    </>
  );
}
