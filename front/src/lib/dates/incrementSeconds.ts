export default function incrementSeconds(date: Date) {
  return new Date(date.setSeconds(date.getSeconds() + 1));
}
