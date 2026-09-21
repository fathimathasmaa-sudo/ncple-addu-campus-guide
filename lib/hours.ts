import type { Hour } from "@/data/campusGuide";
const mins=(v:string)=>{const [h,m]=v.split(":").map(Number);return h*60+m};
export function getHourStatus(item:Hour,date=new Date()){const now=date.getHours()*60+date.getMinutes();for(const w of item.windows){const s=mins(w.start),e=mins(w.end);if(now>=s&&now<e)return {isOpen:true,label:"Open now"};if(now<s){const d=s-now;return {isOpen:false,label:d<60?`Opens in ${d} minutes`:`Opens at ${w.start}`}}}return {isOpen:false,label:`Closed — opens at ${item.windows[0].start}`};}
