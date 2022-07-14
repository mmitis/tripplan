import { TripTransport, TripTransportProvider } from "@prisma/client";
import { Fragment, useState } from "react";
import { FlightImportModal } from "./FlightImportModal";
import { EmptyState } from "../../EmptyState";
import { useTransports } from "../hooks/useTransports";
import { Loader } from "components/Loader";
import { TransportPayload } from "../types/transport";
import {
  CalendarIcon,
  CashIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import { Button } from "components/Button";
import { ContainerTitle } from "components/ContainerTitle";
import { ListItem } from "components/ListItem";
import { StockImages } from "constants/mockImages";

type TransportsProps = {
  transports: TripTransport[];
  locale: string;
  currency: string;
  tripId: string;
};

export const Transports = ({
  transports,
  locale,
  currency,
  tripId,
}: TransportsProps) => {
  const [addModal, setAddModal] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const {
    transports: transportsList,
    addTransport,
    removeTransport,
    isAdding,
    isLoading,
  } = useTransports(tripId, transports);

  const onAccept = (transportData: TransportPayload) => {
    setAddModal(false);
    addTransport(transportData);
  };

  return (
    <>
      <ContainerTitle>Transport</ContainerTitle>
      <FlightImportModal
        open={addModal}
        onClose={() => setAddModal(false)}
        onAccept={onAccept}
      />

      {!transportsList.length && (
        <EmptyState
          cta="Import transport"
          label="No transport"
          subtitle="Click button to import new transport"
          onClick={() => setAddModal(true)}
        />
      )}

      {Boolean(transportsList.length) && (
        <ul role="list" className="divide-y divide-gray-200">
          {(transportsList || []).map((transport) => (
            <ListItem
              key={transport.id}
              id={transport.id}
              locale={locale}
              currency={currency}
              description={transport.provider}
              dateStart={transport.dateStart}
              dateEnd={transport.dateEnd}
              image={StockImages.Transport}
              name={`${transport.origin} - ${transport.destination}`}
              price={transport.price}
              onClickRemove={(id) => {
                setRemoving(id);
                removeTransport(id);
              }}
              isRemoving={removing === transport.id}
            />
          ))}
        </ul>
      )}

      <div className="mt-4 mb-2">
        <Button
          isLoading={isAdding || isLoading}
          onClick={() => setAddModal(true)}
        >
          Import flights
        </Button>
      </div>
    </>
  );
};
