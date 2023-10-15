export default function getDayDifference(date1:any, date2:any){
      // Convert date strings or objects to Date objects
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();

  // Calculate the time difference in milliseconds
  const timeDiff = Math.abs(d2 - d1);

  // Calculate the number of days
  const dayDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return dayDifference
}