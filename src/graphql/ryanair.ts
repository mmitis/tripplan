export const ryanairFlightDetails = `
query GetBookingByReservationNumber($bookingInfo: GetBookingByReservationNumberInputType!) {
  getBookingByReservationNumber(bookingInfo: $bookingInfo) {
    info {
      bookingId
      pnr
    }
    journeys {
      arrive
      arriveUTC
      depart
      departUTC
      dest
      destCountry
      duration
      fareClass
      fareOption
      journeyNum
      mobilebp
      orig
      origCountry
      seatsLeft
    }
    payments {
      amt
      currency
    }
    tripId
    sessionToken
    serverTimeUTC
  }
}`;
