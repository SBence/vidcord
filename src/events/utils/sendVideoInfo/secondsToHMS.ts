export default function secondsToHMS(seconds: string) {
  const secondsNumber = Number(seconds);

  const h = Math.floor(secondsNumber / 3600);
  const m = Math.floor((secondsNumber % 3600) / 60);
  const s = Math.floor((secondsNumber % 3600) % 60);

  const hDisplay = h > 0 ? h.toString() + ":" : "";
  const mDisplay = m.toString().padStart(1, "0") + ":";
  const sDisplay = s.toString().padStart(2, "0");

  return hDisplay + mDisplay + sDisplay;
}
