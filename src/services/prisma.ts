import { PrismaClient, Trip } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  return next(params);
});

export const getTrip = async (id: string): Promise<Trip | null> => {
  try {
    const trip = await prisma.trip.findFirst({
      include: { TripAccomodation: true, TripAttachedPeople: true },
      where: {
        id,
      },
    });
    if (!trip) {
      return null;
    }
    return JSON.parse(JSON.stringify(trip));
  } catch (err) {
    return null;
  }
};
