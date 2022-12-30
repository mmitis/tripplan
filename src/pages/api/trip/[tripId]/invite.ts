// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { prisma, TripUser, User } from "@prisma/client";
import { ErrorResponse } from "../../../../types";
import { parseBookingSite } from "../../../../backend/parsers/bookings";
import { validateEmail } from "../../../../utils/email";
import {
  createTripInvitation,
  getTripUsers,
} from "../../../../backend/services/prisma";

type UserData = {
  user: TripUser;
};

type UserPayloadInvite = {
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = process.env.SECRET;
  const token = await getToken({ req, secret });
  if (token) {
    // Signed in
  } else {
    // Not Signed in
    res.status(401);
  }

  const tripId = req.query.tripId as string;
  switch (req.method) {
    case "POST": {
      try {
        const body = req.body as UserPayloadInvite;
        if (!body.email || !validateEmail(body.email)) {
          return res.status(400).json({
            error: "Invalid email",
          });
        }

        const tripUsers = await getTripUsers(tripId);
        // check if it exists
        const isExisting = (tripUsers || []).some(
          (tripUser) =>
            body.email === tripUser.email || body.email === tripUser.user?.email
        );
        if (isExisting) {
          return res.status(403).json({
            error: "Invitation already exist",
          });
        }
        const user = await createTripInvitation(tripId, body.email);
        return res.status(403).json({
          user,
        });
      } catch (err) {}
    }
  }
}
