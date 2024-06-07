import dayjs from "dayjs";

export function filteredRecord(records, datetime) {
  const filter_date = datetime?.format("YYYY-MM-DD");
  const rec_datetime = records.map((rec) =>
    rec?.datetime?.format("YYYY-MM-DD")
  );

  if (rec_datetime.includes(filter_date)) {
    return records.filter(
      (rec) =>
        rec.datetime.format("YYYY-MM-DD") == datetime.format("YYYY-MM-DD")
    );
  } else {
    return null;
  }
}
