"use client"

import React, { ReactNode } from "react"
import { useServerInsertedHTML } from "next/navigation"
import { getCssText } from "@ignite-ui/react"
import { globalStyles } from "./../styles/global"

interface IServerStylesheetProps {
  children: ReactNode
}

export function ServerStylesheet({ children }: IServerStylesheetProps) {
  globalStyles()
  useServerInsertedHTML(() => {
    return <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
  })

  return children
}