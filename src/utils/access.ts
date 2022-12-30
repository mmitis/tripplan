import { getTripUsers } from "../backend/services/prisma";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

import { nextAuthOptions } from "../pages/api/auth/[...nextauth]";
import { TripUserType } from "@prisma/client";

export const getSessionAPIProps = async (
  tripId: string,
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => {
  return getSessionProps(
    {
      req,
      res,
      query: {},
      resolvedUrl: "",
    },
    tripId
  );
};

export const getSessionProps = async (
  context: GetServerSidePropsContext,
  tripId: string
) => {
  const session = await unstable_getServerSession(
    context.req as any,
    context.res as any,
    nextAuthOptions as any
  );
  if (!session) {
    return { isAccess: false, isInvited: false };
  }

  const users = await getTripUsers(tripId);
  const { user } = session;
  const userInTrip = (users || []).find(
    (listUser) =>
      listUser.email === user?.email || listUser.user?.email === user?.email
  );

  if (!userInTrip) {
    return { isAccess: false, isInvited: false };
  }
  if (userInTrip.userType == TripUserType.INVITE) {
    return { isAccess: false, isInvited: true };
  }

  return { isAccess: true, isInvited: false };
};
