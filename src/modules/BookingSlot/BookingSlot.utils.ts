export const TimesToMinutes=(time:string):number=>{
    const [hours,minutes]=time.split(":").map(elem=>Number(elem))

return hours*60+minutes
}
export const minutesToTime=(minutes:number):string=>{
    const hours=Math.floor(minutes/60)
    const mins=minutes%60
    const newTime=`${hours.toString().padStart(2,"0")}:${mins.toString().padStart(2,"0")}`
    return newTime
}