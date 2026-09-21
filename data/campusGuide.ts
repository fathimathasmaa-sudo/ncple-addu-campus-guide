export type Hour = { id:string; name:string; timeLabel:string; windows:{start:string;end:string}[]; featured?:boolean; location?:string };
export type Contact = { category:string; name:string; phone:string; emergency?:boolean };
export const guide = {
  hours:[
    {id:"breakfast",name:"Breakfast",timeLabel:"07:00 – 09:00",windows:[{start:"07:00",end:"09:00"}],featured:true,location:"Edhuru Hiya 1 Mess"},
    {id:"lunch",name:"Lunch",timeLabel:"12:00 – 14:00",windows:[{start:"12:00",end:"14:00"}],featured:true,location:"Admin Building Cafeteria During the Session"},
    {id:"dinner",name:"Dinner",timeLabel:"19:00 – 21:00",windows:[{start:"19:00",end:"21:00"}],featured:true,location:"Edhuru Hiya 1 Mess"},
    {id:"pool",name:"Swimming Pool",timeLabel:"06:00 – 19:00",windows:[{start:"06:00",end:"19:00"}],featured:true},
    {id:"entertainment",name:"Entertainment Room",timeLabel:"08:00 – 23:00",windows:[{start:"08:00",end:"23:00"}],featured:true},
    {id:"shop",name:"Police Shop",timeLabel:"09:00 – 13:00 • 21:00 – 23:00",windows:[{start:"09:00",end:"13:00"},{start:"21:00",end:"23:00"}],featured:true}
  ] satisfies Hour[],
  facilities:[
    {id:"accommodation",name:"Accommodation",description:"Edhuru Hiya & Guest House"},
    {id:"dining",name:"Dining",description:"Dining facilities"},
    {id:"pool",name:"Swimming Pool",description:"06:00 – 19:00 daily"},
    {id:"sports",name:"Sports & Recreation",description:"Football, badminton, running track and general recreational spaces"},
    {id:"entertainment",name:"Entertainment & Common Room",description:"Pool, karaoke, carrom and other games"},
    {id:"mosque",name:"Mosque",description:"Campus mosque"},
    {id:"shop",name:"Police Shop",description:"Everyday essentials including cosmetics, toiletries, snacks and more"}
  ],
  contacts:[
    {category:"Campus Contact",name:"Inspector of Police Ibrahim Naeem",phone:"+9609795077"},
    {category:"Campus Security",name:"Sub Inspector of Police Haneef Hussain",phone:"+9609992719"},
    {category:"Programme Coordinator",name:"Thameem, IPSG",phone:"[To be confirmed]"},
    {category:"Accommodation Support",name:"Inspector of Police Ibrahim Naeem",phone:"+9609795077"},
    {category:"Medical Assistance",name:"SubInspector of Police Ahmed Ashraf",phone:"+9609193038"},
    {category:"Emergency Contacts",name:"Superintendent of Police Ameen Abdul Gayoom",phone:"+9609992670",emergency:true},
    {category:"Emergency Contacts",name:"Dr. Hassan Miushad",phone:"+9609920326",emergency:true},
    {category:"Emergency Contacts",name:"Technical Director Ismail Safhath",phone:"+9609937979",emergency:true}
  ] satisfies Contact[],
  accommodationChecklist:["Keep your room and personal belongings secure","Switch off lights when leaving your room","Help conserve electricity and water","Respect the privacy and comfort of other residents","Report maintenance issues to campus staff"],
  dining:[{meal:"BREAKFAST",time:"07:00 – 09:00",location:"Edhuru Hiya 1 Mess"},{meal:"LUNCH",time:"12:00 – 14:00",location:"Admin Building Cafeteria During the Session"},{meal:"DINNER",time:"19:00 – 21:00",location:"Edhuru Hiya 1 Mess"}],
  poolRules:["Use the pool only during authorised hours.","Follow instructions provided by campus staff, and wear appropriate swimming attire.","Do not enter the pool if you are unwell.","Avoid dangerous behaviour or rough play.","Keep the pool area clean.","Report any safety concern to staff immediately.","Always swim with a buddy; do not swim alone."],
  entertainmentRules:["Respect other users and keep noise at an appropriate level.","Take care of all equipment and facilities.","Leave the room clean and tidy after use."],
  dressCode:[{title:"Classes & Official Activities",body:"Neat, professional clothing suitable for a learning environment and scheduled activity."},{title:"Sports & Recreation",body:"Appropriate sportswear, worn with regard for the professional environment of the campus."},{title:"Dining Area",body:"Do not wear shorts and slippers during meal times."}],
  smoking:{message:"Smoking is permitted only in the designated smoking area.",location:"Edhuru Hiya 1 Hut",rules:["Do not smoke inside accommodation rooms, classrooms or offices.","Do not smoke in dining areas.","Dispose of cigarette waste responsibly."]},
  campusAccess:["Inform the gate officer.","Carry appropriate identification wherever possible.","Use authorised entry and exit points only.","Sign the entry/exit register at the campus gate if you are resident on campus."],
  gates:["Gate 1 — Main Gate","Gate 2 — Emergency Gate"],
  safety:"Please remain aware of your surroundings at all times and follow any instructions given by campus staff and security personnel.",
  wifi:{network:"PII-Guest",password:"Provided in the guest room information envelope"},
  checkout:["Your personal belongings have been packed.","Your accommodation room is left in good condition.","Any borrowed items have been returned.","Room keys/access cards have been returned or left in the door.","Your departure arrangements have been confirmed."],
  mapLocations:["Admin Building","Edhuru Hiya","Guest House","Dining facilities","Swimming pool","Sports/recreational areas","Entertainment/common room","Smoking area","Mosque","Police Shop","Main entrance/exit"]
} as const;
