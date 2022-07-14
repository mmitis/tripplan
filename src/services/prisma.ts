import { PollCreateValues } from "./../components/Polls/components/PollsCreateModal";
import {
  PrismaClient,
  TripAccommodationProvider,
  TripUserRole,
  TripUserType,
  User,
} from "@prisma/client";
import { ParserBooking } from "../parsers/general";

export const prisma = new PrismaClient();

prisma.$on("beforeExit", async () => {
  prisma.$disconnect();
});

prisma.$use(async (params, next) => {
  return next(params);
});

const PollItem = (tripId?: string) => ({
  where: {
    ...(tripId ? { tripId } : {}),
    deleted: false,
  },
  include: {
    answer: {
      include: {
        vote: {
          include: {
            user: true,
          },
        },
      },
    },
  },
});

export type TripOverall = Awaited<ReturnType<typeof getTrip>>;

export const getTrip = async (id: string) => {
  try {
    const trip = await prisma.trip.findFirst({
      include: {
        accommodation: true,
        transport: true,
        poll: PollItem(),
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
    const transformed: typeof trip = JSON.parse(JSON.stringify(trip));
    return transformed;
  } catch (err) {
    console.error(err);
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
  provider: TripAccommodationProvider,
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
  return prisma.tripAccommodation.create({
    data: {
      tripId,
      confirmationLink,
      coverPhoto,
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

export const createPoll = async (
  tripId: string,
  pollData: PollCreateValues
) => {
  const { description, name, options, type, validity } = pollData;
  const poll = await prisma.tripPoll.create({
    data: {
      tripId,
      dateStart: new Date(),
      dateEnd: new Date(new Date().getTime() + validity * 1000 * 60 * 60),
      type: type,
      name,
      description,
    },
  });
  await prisma.tripPollAnswer.createMany({
    data: options.map((option) => ({
      name: option.value,
      description: option.description,
      tripPollId: poll.id,
    })),
  });
  return poll;
};

export const removeTripTransport = async (
  tripId: string,
  transportId: string
) => {
  try {
    const transports = await prisma.tripTransport.deleteMany({
      where: {
        tripId,
        id: transportId,
      },
    });
    return transports;
  } catch (err) {
    return null;
  }
};

export const removeTripPoll = async (tripId: string, pollId: string) => {
  try {
    const polls = await prisma.tripPoll.updateMany({
      where: {
        tripId,
        id: pollId,
      },
      data: {
        deleted: true,
      },
    });
    return polls;
  } catch (err) {
    return null;
  }
};

export const createTripTransport = async (transportInput: any) => {
  return prisma.tripTransport.create({
    data: transportInput,
  });
};

export const getTripAccomodations = async (tripId: string) => {
  try {
    const places = await prisma.tripAccommodation.findMany({
      where: {
        tripId,
      },
    });
    return places;
  } catch (err) {
    return null;
  }
};

export const removeTripAccomodation = async (
  tripId: string,
  placeId: string
) => {
  try {
    const places = await prisma.tripAccommodation.deleteMany({
      where: {
        tripId,
        id: placeId,
      },
    });
    return places;
  } catch (err) {
    return null;
  }
};
export type TripPollOverall = Awaited<ReturnType<typeof getTripPolls>>[number];

export const getTripPolls = async (tripId: string) => {
  try {
    const polls = await prisma.tripPoll.findMany(PollItem(tripId));
    if (!polls) {
      return [];
    }
    const transformed: typeof polls = JSON.parse(JSON.stringify(polls));
    return transformed;
  } catch (err) {
    return [];
  }
};

export const getTripTransports = async (tripId: string) => {
  try {
    const transports = await prisma.tripTransport.findMany({
      where: {
        tripId,
      },
    });
    return transports;
  } catch (err) {
    return null;
  }
};

export const updatePollVotes = async (
  pollId: string,
  userId: string,
  answers: string[]
) => {
  await prisma.tripVote.deleteMany({
    where: {
      tripUserId: userId,
      answer: {
        poll: {
          id: pollId,
        },
      },
    },
  });
  const votes = await prisma.tripVote.createMany({
    data: answers.map((answer) => ({
      tripAnswerId: answer,
      tripUserId: userId,
    })),
  });
  return votes;
};
