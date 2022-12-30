export const DEFAULT_PARSER_RESPONSE = {
  coverPhoto: "",
  price: 0,
  dateStart: new Date().getTime(),
  dateEnd: new Date().getTime(),
  propertyAddress: "",
  propertyPhone: "",
  propertyName: "",
  propertyLink: "",
};

export type ParserBooking = typeof DEFAULT_PARSER_RESPONSE;
