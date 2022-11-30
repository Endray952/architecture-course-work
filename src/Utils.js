// import colorLib from '@kurkle/color';
// import {DateTime} from 'luxon';
// import 'chartjs-adapter-luxon';
// import {valueOrDefault} from '../../dist/helpers.esm';

// // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
// var _seed = Date.now();

// export function srand(seed) {
//   _seed = seed;
// }

// export function rand(min, max) {
//   min = valueOrDefault(min, 0);
//   max = valueOrDefault(max, 0);
//   _seed = (_seed * 9301 + 49297) % 233280;
//   return min + (_seed / 233280) * (max - min);
// }

// export function numbers(config) {
//   var cfg = config || {};
//   var min = valueOrDefault(cfg.min, 0);
//   var max = valueOrDefault(cfg.max, 100);
//   var from = valueOrDefault(cfg.from, []);
//   var count = valueOrDefault(cfg.count, 8);
//   var decimals = valueOrDefault(cfg.decimals, 8);
//   var continuity = valueOrDefault(cfg.continuity, 1);
//   var dfactor = Math.pow(10, decimals) || 0;
//   var data = [];
//   var i, value;

//   for (i = 0; i < count; ++i) {
//     value = (from[i] || 0) + this.rand(min, max);
//     if (this.rand() <= continuity) {
//       data.push(Math.round(dfactor * value) / dfactor);
//     } else {
//       data.push(null);
//     }
//   }

//   return data;
// }

// export function points(config) {
//   const xs = this.numbers(config);
//   const ys = this.numbers(config);
//   return xs.map((x, i) => ({x, y: ys[i]}));
// }

// export function bubbles(config) {
//   return this.points(config).map(pt => {
//     pt.r = this.rand(config.rmin, config.rmax);
//     return pt;
//   });
// }

// export function labels(config) {
//   var cfg = config || {};
//   var min = cfg.min || 0;
//   var max = cfg.max || 100;
//   var count = cfg.count || 8;
//   var step = (max - min) / count;
//   var decimals = cfg.decimals || 8;
//   var dfactor = Math.pow(10, decimals) || 0;
//   var prefix = cfg.prefix || '';
//   var values = [];
//   var i;

//   for (i = min; i < max; i += step) {
//     values.push(prefix + Math.round(dfactor * i) / dfactor);
//   }

//   return values;
// }

// const MONTHS = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December'
// ];

// export function months(config) {
//   var cfg = config || {};
//   var count = cfg.count || 12;
//   var section = cfg.section;
//   var values = [];
//   var i, value;

//   for (i = 0; i < count; ++i) {
//     value = MONTHS[Math.ceil(i) % 12];
//     values.push(value.substring(0, section));
//   }

//   return values;
// }

// const COLORS = [
//   '#4dc9f6',
//   '#f67019',
//   '#f53794',
//   '#537bc4',
//   '#acc236',
//   '#166a8f',
//   '#00a950',
//   '#58595b',
//   '#8549ba'
// ];

// export function color(index) {
//   return COLORS[index % COLORS.length];
// }

// export function transparentize(value, opacity) {
//   var alpha = opacity === undefined ? 0.5 : 1 - opacity;
//   return colorLib(value).alpha(alpha).rgbString();
// }

// export const CHART_COLORS = {
//   red: 'rgb(255, 99, 132)',
