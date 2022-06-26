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
    var re = new RegExp(String.fromCharCode(160), "g");
    const splitted = priceValue.replace(re, " ").split(" ");
    splitted.pop();
    if (priceValue) {
      data["price"] = Number(splitted.join(""));
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const times = cheerioParse("time");
    const dateStartField = text([times[0].childNodes[0]]);
    const dateEndField = text([times[1].childNodes[0]]);
    data.dateStart = parse(dateStartField, "EEEE, d MMMM yyyy", new Date(), {
      locale: locale as unknown as Locale,
    }).getTime();
    data.dateEnd = parse(dateEndField, "EEEE, d MMMM yyyy", new Date(), {
      locale: locale as unknown as Locale,
    }).getTime();
  } catch (err) {}

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
