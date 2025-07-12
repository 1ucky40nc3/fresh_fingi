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
