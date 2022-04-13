import icon01 from '../imgs/weather-icons/sunny.gif';
import icon02 from '../imgs/weather-icons/m-cloudy.gif';
import icon05 from '../imgs/weather-icons/hazy.gif';
import icon06 from '../imgs/weather-icons/partly-cloudy.gif';
import icon08 from '../imgs/weather-icons/smoke.gif';
import icon12 from '../imgs/weather-icons/showers.gif';
import icon14 from '../imgs/weather-icons/m-c-rain.gif';
import icon15 from '../imgs/weather-icons/thunder-storm.gif';
import icon18 from '../imgs/weather-icons/rainy.gif';
import icon21 from '../imgs/weather-icons/m-cloudy.gif';
import icon22 from '../imgs/weather-icons/snow.gif';

const iconImages = {
  1: icon01,
  2: icon02,
  3: icon06,
  4: icon21,
  5: icon05,
  6: icon06,
  7: icon08,
  8: icon08,
  9: icon08,
  10: icon08,
  11: icon08,
  12: icon12,
  13: icon12,
  14: icon14,
  15: icon15,
  18: icon18,
  21: icon21,
  22: icon22,
};

export default function getIconImage(iconNumber) {
  return iconImages[iconNumber];
}
