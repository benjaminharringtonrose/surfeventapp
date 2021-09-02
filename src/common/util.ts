import moment from "moment";
import { Division, ESA_DIVISIONS, Score } from ".";
import { getDatesBetweenDates } from "../util/dates";
import { DIVISIONS } from "./constants";

export const getDivisionById = (id?: Division) => {
  if (!id) return;
  return DIVISIONS.filter(d => d.id === id).pop();
};

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

export const getEventDaysListPickerItems = (startDate: Date, endDate: Date) => {
  const dates = getDatesBetweenDates(startDate, endDate);
  return dates.map(d => {
    return {
      id: d,
      label: moment(d).format("dddd, MMMM Do YYYY"),
    };
  });
};

export const abbreviateName = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}. ${lastName}`;
};

export const getWave = (scores: Score[], selectedKey: string, selectedWaveId?: string) => {
  if (!selectedWaveId) return;
  return scores
    .filter(score => score.key === selectedKey)
    ?.pop()
    ?.waves?.filter(wave => wave.waveId === selectedWaveId)
    .pop();
};

export const computeWaveScoreTotal = (
  scores: Score[],
  selectedKey: string,
  selectedWaveId: string,
) => {
  return (
    scores
      .filter(score => score.key === selectedKey)
      ?.pop()
      ?.waves?.filter(wave => wave.waveId !== selectedWaveId)
      .filter(wave => wave.disqualified === false)
      .sort((a, b) => b.score - a.score)
      .filter((_, index) => index < 2)
      .reduce((acc, value) => acc + value.score, 0) || 0
  );
};

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
