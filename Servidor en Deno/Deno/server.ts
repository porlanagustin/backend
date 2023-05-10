// import { Application } from 'https://deno.land/x/oak/mod.ts';

import {
  bgBrightMagenta,
  bgGreen,
  bgRed,
  bgYellow,
  blue,
  bold,
  gray,
  italic,
  red,
  white,
} from "https://deno.land/std/fmt/colors.ts";

const colors = [];

const validColors = [bgBrightMagenta, bgGreen, bgRed, bgYellow, blue, bold, gray, italic, red, white];

for (let i = 0; i < colors.length; i++) {
  if (validColors.includes(eval(colors[i]))) {
    console.log(colors[i]);
  }
}

// Como poner un color en el html
// <div style="background-color: ${bgGreen}">Este es un texto con fondo verde.</div>
