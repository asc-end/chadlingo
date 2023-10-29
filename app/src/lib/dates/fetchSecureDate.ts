export const fetchSecureDate = async () => {
    try {
        const resp = await fetch(
          "https://timeapi.io/api/Time/current/zone?timeZone=UTC"
        );
        const { dateTime } = await resp.json();
        // 'Z' is the zone designator for the zero UTC offset. 
        // UTC time is also known as 'Zulu' time, hence the 'Z'.
        return new Date(dateTime + 'Z');
      } catch (e) {
        return null
      }
}