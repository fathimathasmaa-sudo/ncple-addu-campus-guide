export type Announcement={id:string;active:boolean;title:string;message:string;dateTime?:string;link?:string};
export type Facility={id:string;name:string;description:string;icon?:string};
export type Contact={category:string;name:string;phone:string;emergency?:boolean};
export type OpeningHour={id:string;name:string;timeLabel:string;windows:{start:string;end:string}[]};
export type GuideContent={facilities:Facility[];hours:OpeningHour[];contacts:Contact[];rules:Record<string,string[]>;wifi:{network:string;password:string};checkout:string[];announcements:Announcement[]};
