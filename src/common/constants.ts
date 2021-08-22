import { ESA_DIVISIONS } from ".";

export const DIVISIONS = [
  { id: ESA_DIVISIONS.BOYSU12, label: "11 & Under" },
  { id: ESA_DIVISIONS.BOYSU14, label: "13 & Under" },
  { id: ESA_DIVISIONS.BOYSU16, label: "15 & Under" },
  { id: ESA_DIVISIONS.JMENU18, label: "17 & Under" },
  { id: ESA_DIVISIONS.MEN, label: "18-29" },
  { id: ESA_DIVISIONS.GIRLSU12, label: "11 & Under" },
  { id: ESA_DIVISIONS.GIRLSU14, label: "13 & Under" },
  { id: ESA_DIVISIONS.GIRLSU16, label: "15 & Under" },
  { id: ESA_DIVISIONS.JWOMENU18, label: "17 & Under" },
  { id: ESA_DIVISIONS.WOMEN, label: "18-39" },
  { id: ESA_DIVISIONS.LADIES, label: "Ladies (40 & Over)" },
  { id: ESA_DIVISIONS.MASTERS, label: "Masters (30-39)" },
  { id: ESA_DIVISIONS.SMEN, label: "Senior Men (40-49)" },
  { id: ESA_DIVISIONS.LEGENDS, label: "Legends (50 & Over)" },
  { id: ESA_DIVISIONS.GLEGENDS, label: "Grand Legends (60 & Over)" },
];

export const DIVISIONS_SECTIONS = [
  {
    title: "Boys",
    data: [
      { id: ESA_DIVISIONS.BOYSU12, label: "11 & Under" },
      { id: ESA_DIVISIONS.BOYSU14, label: "13 & Under" },
      { id: ESA_DIVISIONS.BOYSU16, label: "15 & Under" },
    ],
  },
  {
    title: "Girls",
    data: [
      { id: ESA_DIVISIONS.GIRLSU12, label: "11 & Under" },
      { id: ESA_DIVISIONS.GIRLSU14, label: "13 & Under" },
      { id: ESA_DIVISIONS.GIRLSU16, label: "15 & Under" },
    ],
  },
  {
    title: "Junior Men",
    data: [{ id: ESA_DIVISIONS.JMENU18, label: "17 & Under" }],
  },
  {
    title: "Junior Women",
    data: [{ id: ESA_DIVISIONS.JWOMENU18, label: "17 & Under" }],
  },
  {
    title: "Men",
    data: [{ id: ESA_DIVISIONS.MEN, label: "18-29" }],
  },
  {
    title: "Women",
    data: [{ id: ESA_DIVISIONS.WOMEN, label: "18-39" }],
  },
  {
    title: "Other",
    data: [
      { id: ESA_DIVISIONS.LADIES, label: "Ladies (40 & Over)" },
      { id: ESA_DIVISIONS.MASTERS, label: "Masters (30-39)" },
      { id: ESA_DIVISIONS.SMEN, label: "Senior Men (40-49)" },
      { id: ESA_DIVISIONS.LEGENDS, label: "Legends (50 & Over)" },
      { id: ESA_DIVISIONS.GLEGENDS, label: "Grand Legends (60 & Over)" },
    ],
  },
];
