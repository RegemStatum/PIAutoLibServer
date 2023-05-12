import { Request, Response } from "express";
import { Gpio } from "onoff";
import { LEDS_TO_CABINETS } from "../constants/index.js";

// onoff Gpio class type declaration is not full.
// Instances of this class have keys such as "gpio" key.
// To fix issue you can add keys declarations to Gpio class in onoff.d.ts or use type "any" below
let gpioLeds: any[] = [];

// initialize leds
LEDS_TO_CABINETS.forEach((ledObj) => {
  gpioLeds.push(new Gpio(ledObj.led, "out"));
});

// turn off and unexport leds when server is terminated
process.on("SIGINT", () => {
  gpioLeds.forEach((led) => {
    led.writeSync(0);
    led.unexport();
  });
  process.exit();
});

const findLedNumbersMatchedToCabinets = (cabinets: number[]) => {
  return LEDS_TO_CABINETS.filter((obj) => cabinets.includes(obj.cabinet)).map(
    (obj) => obj.led
  );
};

const setLedsToNewState = (
  leds: any[],
  ledNumbersToChange: number[],
  newLedsState: 0 | 1
) => {
  leds.forEach((gpioLed) => {
    if (ledNumbersToChange.includes(gpioLed.gpio))
      gpioLed.writeSync(newLedsState);
  });
};

const openCabinets = (req: Request, res: Response) => {
  const body = req.body;
  const cabinetsToOpen = body.cabinets;

  const ledNumbers = findLedNumbersMatchedToCabinets(cabinetsToOpen);
  setLedsToNewState(gpioLeds, ledNumbers, 1);

  res.status(200).json({ msg: "Cabinets opened", cabinets: cabinetsToOpen });
};

const closeCabinets = (req: Request, res: Response) => {
  const body = req.body;
  const cabinetsToClose = body.cabinets;

  const ledNumbers = findLedNumbersMatchedToCabinets(cabinetsToClose);
  setLedsToNewState(gpioLeds, ledNumbers, 0);

  res.status(200).json({ msg: "Cabinets closed", cabinets: cabinetsToClose });
};

export { openCabinets, closeCabinets };
