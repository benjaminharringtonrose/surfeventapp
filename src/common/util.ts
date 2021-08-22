import { ESA_DIVISIONS } from ".";

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
