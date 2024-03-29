import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

import type { GetServerSidePropsContext, NextPage } from "next";
import { getTrip, TripOverall } from "../../backend/services/prisma";
import { getSessionProps } from "../../utils/access";
import { Restricted } from "../../components/Restricted";
import { UserList } from "../../components/UserList";
import { Footer } from "../../components/Footer";
import { Accommodations } from "components/Accommodations";
import { Transports } from "components/Transport/components/Transports";
import { Container } from "components/Container";
import { Estimations } from "components/Estimations";
import { useQuery } from "react-query";
import { QueryKey } from "constants/queryKeys";
import axios from "axios";
import { Polls } from "components/Polls";
import { Header } from "components/Header";
import { Poll } from "components/Polls/components/Poll";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const tripId = (context?.query?.tripId || "").toString();
  const sessionProps = await getSessionProps(context, tripId);

  const tripSSR = await getTrip(tripId);
  return { props: { tripSSR, ...sessionProps } };
}

type TripPageProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export const TripPage: NextPage<TripPageProps> = ({
  tripSSR,
  isAccess,
  isInvited,
}) => {
  const { data: tripData } = useQuery(
    [QueryKey.Trip, tripSSR?.id],
    () => axios.get<{ trip: TripOverall }>(`/api/trip/${tripSSR?.id}`),
    {
      enabled: false,
    }
  );

  const trip = tripData?.data.trip || tripSSR;

  if ((!isAccess && !isInvited) || !trip) {
    return <Restricted />;
  }

  const locale = trip.locale || "pl-PL";
  const currency = trip.currency || "PLN";

  return (
    <>
      <div className="min-h-full">
        <Header trip={trip} />
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <Poll poll={trip.poll[0]} />

                <Container>
                  <Estimations trip={trip} />
                </Container>
                <Container>
                  <Accommodations
                    tripId={trip.id}
                    accommodations={trip.accommodation}
                    currency={currency}
                    locale={locale}
                  />
                </Container>
                <Container>
                  <Transports
                    tripId={trip.id}
                    transports={trip.transport}
                    currency={currency}
                    locale={locale}
                  />
                </Container>
                <Container>
                  <Polls
                    tripId={trip.id}
                    polls={trip.poll}
                    currency={currency}
                    locale={locale}
                  />
                </Container>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <div className="px-6 py-3">
                    <UserList users={trip?.users} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TripPage;
