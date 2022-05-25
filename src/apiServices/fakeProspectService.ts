import { faker } from "@faker-js/faker";
import { Prospect } from "../types/prospect";

const withLeadingZero = (number: number): string => {
  if (Math.abs(number) < 10) {
    return `0${number}`;
  }
  return `${number}`;
};

const getDateString = (date: Date) => {
  const day = date.getDay() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${withLeadingZero(month)}/${withLeadingZero(day)}/${withLeadingZero(
    year
  )}`;
};

type ProspectOptions = { email: string };

const RACES = [
  "WHITE",
  "BLACK_AFRICAN_AMERICAN",
  "ASIAN",
  "AMERICAN_INDIAN_ALASKA_NATIVE",
  "NATIVE_HAWAIIAN_OTHER_PACIFIC_ISLANDER",
  "",
];

const LOCATIONS = [
  "AVISO.HARRIS",
  "AVISO.MERANCAS",
  "AVISO.WTVI",
  "AVISO.SOUTH_CAMPUS",
  "AVISO.WARREN_COUNTY",
  "AVISO.LEVINE",
  "",
];

const ETHNICITIES = ["HISPANIC", "NON_HISPANIC", ""];

const pickRandom = <T>(array: T[]): T => {
  // get random index
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

export const createProspect = ({ email }: ProspectOptions): Prospect => {
  const gender = faker.name.gender(true);
  const isMale = gender === "Male";

  const prospect: Prospect = {
    firstName: faker.name.firstName(isMale ? "male" : "female"),
    lastName: faker.name.lastName(),
    middleName: faker.name.middleName(),
    nickName: "",
    emailAddress: email,
    birthDate: getDateString(faker.date.birthdate({ min: 1980, max: 2005 })),
    gender: isMale ? "M" : "F",
    personId: faker.unique(faker.random.numeric, [10]),
    location: pickRandom(LOCATIONS),
    ethnicity: pickRandom(ETHNICITIES),
    race: pickRandom(RACES),
  };
  return prospect;
};

export const createProspects = (
  numProspects: number,
  options: ProspectOptions
): Prospect[] =>
  new Array(numProspects).fill(0).map(() => createProspect(options));
