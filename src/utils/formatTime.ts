/**
 * Formats a given time in seconds into a string in the format "MM:SS".
 *
 * @param time - The time in seconds to format.
 * @returns A string representing the formatted time, with minutes and seconds
 *          padded to two digits (e.g., "05:30").
 */
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default formatTime;
