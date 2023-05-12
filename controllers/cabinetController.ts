import { Request, Response } from "express";
import { Gpio } from "onoff";
import { GpioLeds, LEDS_TO_CABINETS } from "../constants/index.js";

LEDS_TO_CABINETS.forEach((ledObj) => {
  GpioLeds.push(new Gpio(ledObj.led, "out"));
});

const openCabinets = (req: Request, res: Response) => {
  const body = req.body;
  const cabinets = body.cabinets;

  // find leds corresponding to cabinets
  const leds = LEDS_TO_CABINETS.filter((obj) =>
    cabinets.includes(obj.cabinet)
  ).map((obj) => obj.led);

  leds.forEach((led) => {
    const newLed = new Gpio(led, "high");
    GpioLeds.push(newLed);
  });

  res.status(200).json({ msg: "Cabinets opened", cabinets });
};

const closeCabinets = (req: Request, res: Response) => {
  const body = req.body;
  const cabinets = body.cabinets;

  // find leds corresponding to cabinets
  const leds = LEDS_TO_CABINETS.filter((obj) =>
    cabinets.includes(obj.cabinet)
  ).map((obj) => obj.led);

  leds.forEach((led) => {
    const newLed = new Gpio(led, "low");
    GpioLeds.push(newLed);
  });

  res.status(200).json({ msg: "Cabinets closed", cabinets });
};

export { openCabinets, closeCabinets };
