export interface Prospect {
  firstName: string;
  lastName: string;
  middleName: string;
  nickName: string;
  emailAddress: string;
  birthDate: string;
  gender: "M" | "F" | null;
  personId: string;
  location: string;
  ethnicity: string;
  race: string;
}
