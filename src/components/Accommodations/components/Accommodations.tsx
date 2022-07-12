import { TripAccommodation } from "@prisma/client";
import { useState } from "react";
import { AccommodationModal } from "./AccommodationModal";
import { EmptyState } from "../../EmptyState";
import { useAccommodations } from "../hooks/useAccommodations";
import { ListItem } from "components/ListItem";
import { Button } from "components/Button";
import { ContainerTitle } from "components/ContainerTitle";

type AccommodationsProps = {
  accommodations: TripAccommodation[];
  locale: string;
  currency: string;
  tripId: string;
};

export const Accommodations = ({
  accommodations,
  locale,
  currency,
  tripId,
}: AccommodationsProps) => {
  const [addModal, setAddModal] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const {
    accommodations: accommodationsList,
    addAccommodation,
    removeAccommodation,
    isAdding,
    isLoading,
  } = useAccommodations(tripId, accommodations);

  const onAccept = (confirmationUrl: string) => {
    setAddModal(false);
    addAccommodation(confirmationUrl);
  };

  return (
    <>
      <ContainerTitle>Bookings</ContainerTitle>
      <AccommodationModal
        open={addModal}
        onClose={() => setAddModal(false)}
        onAccept={onAccept}
      />

      {!accommodationsList.length && (
        <EmptyState
          cta="Import booking"
          label="No bookings"
          subtitle="Click button to import new booking"
          onClick={() => setAddModal(true)}
        />
      )}

      {Boolean(accommodationsList.length) && (
        <ul role="list" className="divide-y divide-gray-200">
          {accommodationsList.map((accommodation) => (
            <ListItem
              key={accommodation.id}
              id={accommodation.id}
              locale={locale}
              currency={currency}
              description={accommodation.propertyAddress}
              dateStart={accommodation.dateStart}
              dateEnd={accommodation.dateEnd}
              image={accommodation.coverPhoto}
              name={accommodation.name}
              previewLink={accommodation.confirmationLink}
              price={accommodation.price}
              onClickRemove={(id) => setRemoving(id)}
              isRemoving={removing === accommodation.id}
            />
          ))}
        </ul>
      )}

      <div className="mt-4 mb-2">
        <Button
          isLoading={isAdding || isLoading}
          onClick={() => setAddModal(true)}
        >
          Import booking
        </Button>
      </div>
    </>
  );
};
