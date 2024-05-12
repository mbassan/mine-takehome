import { formatDate } from "@angular/common";
import { DATE_FORMAT, DATE_LOCALE } from "../constants";

export function timestampToDateString(timestamp?: number) {
  if (timestamp === undefined) {
    return "";
  }
  return formatDate(timestamp, DATE_FORMAT, DATE_LOCALE);
}

export function dateStringToTimestamp(dateString?: string) {
  if (dateString === undefined) {
    return 0;
  }
  return new Date(dateString).valueOf();
}
