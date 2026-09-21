import type {Metadata} from "next";import "./globals.css";import {BottomNav} from "@/components/BottomNav";
export const metadata:Metadata={title:"NCPLE Addu Campus — Welcome Guide",description:"Your digital guide to a comfortable, safe and enjoyable stay.",applicationName:"NCPLE Addu Campus",manifest:"/manifest.webmanifest"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><div className="min-h-screen safe-bottom">{children}</div><BottomNav/></body></html>}
