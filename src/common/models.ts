export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  createdOn: string;
  chatRooms?: string[];
  surfHeats?: string[];
  surfEvents?: string[];
  providers?: string[];
}
