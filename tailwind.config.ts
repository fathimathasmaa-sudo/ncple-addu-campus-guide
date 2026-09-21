import type { Config } from "tailwindcss";
const config: Config = { content:["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./data/**/*.{js,ts,jsx,tsx,mdx}"], theme:{extend:{colors:{ncple:{950:"#00172F",900:"#00244D",700:"#365985",500:"#4969A0",50:"#F4F7FB"}},boxShadow:{soft:"0 10px 30px rgba(0,36,77,.08)"}}},plugins:[]};
export default config;
