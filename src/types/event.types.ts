type User = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
};

type EventDetails = {
  id: string;
  name: string;
  details: string;
  hosts: string[];
  location : string;
  price?: number | null;
  category?: string;
  tags?: string[] | null;
  seats?: number | null;
  occupancy?: number | null;
  eventLink?: string | null;
  createdAt: string;
  startAt: string;
  endAt: string;
  userId: string;
  creator: User;
};
