import { load, text } from "cheerio";
import { Locale, parse } from "date-fns";
import { DEFAULT_PARSER_RESPONSE, ParserBooking } from "./general";

const BOOKING_COVER_PHOTO_REGEX = new RegExp(
  /background-image: url\('(\S+)'\)/
);

export const parseBookingSite = (
  html: string,
  locale: string
): ParserBooking => {
  let data = { ...DEFAULT_PARSER_RESPONSE };

  const cheerioParse = load(html);

  try {
    const cover = cheerioParse("#mb-hotel-cover");
    const styles = cover.attr("style");
    const coverPhotoExec = BOOKING_COVER_PHOTO_REGEX.exec(styles || "");
    if (coverPhotoExec && coverPhotoExec?.length >= 2) {
      data["coverPhoto"] = coverPhotoExec[1];
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const price = cheerioParse(".mb-price__unit--primary");
    const priceValue = text(price);
    const re = new RegExp(String.fromCharCode(160), "g");
    const splitted = priceValue.replace(re, " ").replace(",", "").split(" ");
    console.log(splitted);
    splitted.pop();
    if (priceValue) {
      data["price"] = Number(splitted.join(""));
    }
  } catch (err) {
    console.log(err);
  }
  try {
    const times = cheerioParse(
      "div[data-testid='PostBookingCheckinCheckout'] > span"
    );
    const formattedTimes = times.toArray().map((element) => text([element]));
    const dateStart = formattedTimes[0].substring(
      0,
      formattedTimes[0].length - 13
    );
    const dateEnd = formattedTimes[1].substring(
      0,
      formattedTimes[1].length - 13
    );
    data.dateStart = Date.parse(dateStart.split(",")[1].trim());
    data.dateEnd = Date.parse(dateEnd.split(",")[1].trim());
    console.log(data);
  } catch (err) {
    console.log(err);
  }

  try {
    const address = cheerioParse(".mb-hotel-info__address-details");
    const addressField = text(address);
    data.propertyAddress = addressField.replaceAll("\n", " ").trim();
  } catch (err) {
    console.log(err);
  }

  try {
    const phone = cheerioParse(".u-phone");
    const phoneField = text([phone[0]]).replaceAll("\n", " ").trim();
    data.propertyPhone = phoneField;
  } catch (err) {
    console.log(err);
  }

  try {
    const propertyName = cheerioParse("a[data-testid='name-archor']");
    const propertyNameField = text(propertyName).replaceAll("\n", " ").trim();
    const propertyLinkField = propertyName.attr("href");
    data.propertyName = propertyNameField;
    data.propertyLink = propertyLinkField || "";
  } catch (err) {
    console.log(err);
  }
  return data;
};
