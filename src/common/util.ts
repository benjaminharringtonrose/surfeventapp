import { Division, ESA_DIVISIONS } from ".";

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

export const getDivisionById = (id?: Division) => {
  if (!id) return;
  return DIVISIONS.filter(d => d.id === id).pop();
};

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
    title: "Junior Men",
    data: [{ id: ESA_DIVISIONS.JMENU18, label: "17 & Under" }],
  },
  {
    title: "Men",
    data: [{ id: ESA_DIVISIONS.MEN, label: "18-29" }],
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
    title: "Junior Women",
    data: [{ id: ESA_DIVISIONS.JWOMENU18, label: "17 & Under" }],
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

export const getHeatDivisionLabel = (id: string) => {
  switch (id) {
    case ESA_DIVISIONS.BOYSU12:
      return "Boys (11 & Under)";
    case ESA_DIVISIONS.BOYSU14:
      return "Boys (13 & Under)";
    case ESA_DIVISIONS.BOYSU16:
      return "Boys (15 & Under)";
    case ESA_DIVISIONS.JMENU18:
      return "Junior Men (17 & Under)";
    case ESA_DIVISIONS.MEN:
      return "Men (18-29)";
    case ESA_DIVISIONS.GIRLSU12:
      return "Girls (11 & Under)";
    case ESA_DIVISIONS.GIRLSU14:
      return "Girls (13 & Under)";
    case ESA_DIVISIONS.GIRLSU16:
      return "Girls (15 & Under)";
    case ESA_DIVISIONS.JWOMENU18:
      return "Junior Women (17 & Under)";
    case ESA_DIVISIONS.WOMEN:
      return "Women (18-39)";
    case ESA_DIVISIONS.LADIES:
      return "Ladies (40 & Over)";
    case ESA_DIVISIONS.MASTERS:
      return "Masters (30-39)";
    case ESA_DIVISIONS.SMEN:
      return "Senior Men (40-49)";
    case ESA_DIVISIONS.LEGENDS:
      return "Legends (50 & Over)";
    case ESA_DIVISIONS.GLEGENDS:
      return "Grand Legends (60 & Over)";
  }
};
