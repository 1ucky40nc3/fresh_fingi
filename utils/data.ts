import { DateTime } from "luxon";

export function randomOffset(value: number, min: number, max: number): number {
  const offset: number = 2 * Math.random() - 1;
  return value + offset;
}

export function addExampleTimeSeriesData(
  buffer: TimeSeriesDataType[],
  config: { count: number; min: number; max: number },
): void {
  const avg: number = (config.max + config.min) / 2;
  const lastValue: number = buffer[buffer.length - 1]?.y || avg;
  const newValue: number = randomOffset(lastValue, 0.5, 10);
  const nowIso: string = DateTime.now().toISO();
  if (buffer.length - 1 >= config.count) {
    buffer.shift();
  }
  buffer.push({ x: nowIso, y: newValue });
}
