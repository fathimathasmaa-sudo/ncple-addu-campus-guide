"use client";
import {useEffect,useState} from "react";import type {Hour} from "@/data/campusGuide";import {getHourStatus} from "@/lib/hours";
export function LiveStatus({item}:{item:Hour}){const [now,setNow]=useState(()=>new Date());useEffect(()=>{const id=setInterval(()=>setNow(new Date()),60000);return()=>clearInterval(id)},[]);const s=getHourStatus(item,now);return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s.isOpen?'bg-emerald-50 text-emerald-700':'bg-slate-100 text-slate-600'}`}>{s.label}</span>}
