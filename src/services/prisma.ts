import {
  PrismaClient,
  Trip,
  TripAccomodation,
  TripAccomodationProvider,
  TripUser,
  TripUserRole,
  TripUserType,
  User,
} from "@prisma/client";
import { ParserBooking } from "../parsers/general";

export const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  return next(params);
});

export const getTrip = async (
  id: string
): Promise<
  | (Trip & {
      users: (TripUser & { user: User })[];
      accomodation: TripAccomodation[];
    })
  | null
> => {
  try {
    const trip = await prisma.trip.findFirst({
      include: {
        accomodation: true,
        users: {
          include: {
            user: true,
          },
        },
      },
      where: {
        id,
      },
    });
    if (!trip) {
      return null;
    }
    return JSON.parse(JSON.stringify(trip));
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getTripUsers = async (tripId: string) => {
  try {
    const users = await prisma.tripUser.findMany({
      include: { user: true },
      where: {
        tripId,
      },
    });
    return users;
  } catch (err) {
    return null;
  }
};

export const createTripInvitation = async (tripId: string, email: string) => {
  return prisma.tripUser.create({
    data: {
      role: TripUserRole.CREATOR,
      tripId,
      email,
      userType: TripUserType.INVITE,
    },
  });
};

export const createTripAccomodation = async (
  tripId: string,
  provider: TripAccomodationProvider,
  confirmationLink: string,
  bookingData: ParserBooking
) => {
  const {
    coverPhoto,
    dateEnd,
    dateStart,
    price,
    propertyAddress,
    propertyName,
    propertyLink,
    propertyPhone,
  } = bookingData;
  return prisma.tripAccomodation.create({
    data: {
      tripId,
      confirmationLink,
      coverPhoto: bookingData.coverPhoto,
      dateStart: new Date(dateStart),
      dateEnd: new Date(dateEnd),
      name: propertyName,
      price,
      propertyAddress,
      propertyLink,
      propertyPhone,
      provider,
    },
  });
};
