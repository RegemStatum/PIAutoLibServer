import { Gpio } from "onoff";

export const LEDS_TO_CABINETS = [
  { led: 17, cabinet: 1 },
  { led: 27, cabinet: 2 },
  { led: 22, cabinet: 3 },
  { led: 5, cabinet: 4 },
  { led: 6, cabinet: 5 },
  { led: 13, cabinet: 6 },
  { led: 16, cabinet: 7 },
  { led: 20, cabinet: 8 },
  { led: 21, cabinet: 9 },
];

export const GpioLeds: Gpio[] = [];
