import { DateTime } from "luxon";

export function randomNumberRange(
  config: { count: number; min: number; max: number },
): number[] {
  const data: number[] = [];
  let value: number = (config.max + config.min) / 2;
  for (let i = 0; i < config.count; i++) {
    value += Math.max(
      Math.min(5 - Math.random() * 10, config.max),
      config.min,
    );
    data.push(value);
  }
  return data;
}
export function dateRangeByHertzOffset(
  config: { count: number; hertz: number },
): string[] {
  const offset: number = 1000 / config.hertz; // Offset between dates in ms
  const dates: string[] = [];
  let date = DateTime.now();
  for (let i = 0; i < config.count; i++) {
    dates.push(date.toISO());
    date = date.plus({ milliseconds: offset });
  }
  return dates;
}

export function exampleTimeSeriesData(
  config: { count: number; min: number; max: number; hertz: number },
): TimeSeriesDataType[] {
  const numbers = randomNumberRange({
    count: config.count,
    min: config.min,
    max: config.max,
  });
  const dates = dateRangeByHertzOffset({
    count: config.count,
    hertz: config.hertz,
  });
  const data: TimeSeriesDataType[] = [];
  for (let i = 0; i < config.count; i++) {
    data.push({ x: dates[i], y: numbers[i] });
  }
  return data;
}

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
  buffer.push({ x: nowIso, y: newValue });
}

export function startTimeSeriesDataGeneration(
  buffer: TimeSeriesDataType[],
  xAxisRange: { min: string; max: string },
  config: { count: number; min: number; max: number; hertz: number },
) {
  const timeout: number = 1000 / config.hertz; // Offset between intervals in ms
  const handler: { (): void } = () => {
    addExampleTimeSeriesData(buffer, config);
    const lastItem: TimeSeriesDataType = buffer[buffer.length - 1];
    xAxisRange.max = lastItem.x;
    const window = 30 * 1000; // 30s window
    const numItemsPerWindow: number = Math.floor(window / timeout);
    const indexMin: number = Math.max(buffer.length - numItemsPerWindow, 0);
    const oldestItem: TimeSeriesDataType = buffer[indexMin];
    xAxisRange.min = oldestItem.x;
  };
  setInterval(handler, timeout);
}
