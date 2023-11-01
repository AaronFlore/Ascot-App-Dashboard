import { db } from "./firebaseConfig.js";
import { collection, getDocs, Timestamp } from "firebase/firestore";

const exportToCsv = (filename, rows) => {
  const processRow = (row) =>
    row
      .map((val) => {
        const result = (val === null ? "" : String(val)).replace(/"/g, '""');
        return result.search(/("|,|\n)/g) >= 0 ? `"${result}"` : result;
      })
      .join(",") + "\n";

  const csvFile = rows.map(processRow).join("");
  const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const isTimestamp = (value) => value instanceof Timestamp;

// The following is a ISO String so more reliable and consistent (use for data analysis if possible)
// const convertTimestamp = (value) =>
//   isTimestamp(value) ? value.toDate().toISOString() : value;

// converts Firebase Timestamp to human readable version
const convertTimestamp = (value) =>
  isTimestamp(value) ? value.toDate().toLocaleString() : value;

// goes through each row and separates into each value for consistent rows
const mapDocToRow = (headers, identifier, doc) =>
  headers.map((header) => {
    if (header === "ID") return identifier;

    const [field, value] = header.split("_");
    const docValue = doc[field];

    if (field === "dead" || field.startsWith("evidenceOf")) {
      return docValue
        ? Array.isArray(docValue)
          ? docValue.includes(value)
            ? "TRUE"
            : "FALSE"
          : "TRUE"
        : "FALSE";
    }

    if (docValue !== undefined) {
      const formattedValue = Array.isArray(docValue)
        ? docValue.includes(value)
          ? "TRUE"
          : ""
        : convertTimestamp(docValue) || "";
      return formattedValue;
    }
    return "";
  });

const addCSVRow = (identifier, doc, headers) =>
  // add the row to the csv
  allRows.push(mapDocToRow(headers, identifier, doc));

const fetchFirebaseData = async () => {
  // get the collection, can switch plantsData with a specialized {documentName}
  // for modularity in future
  const collRef = collection(db, "plantsData");
  const snapshot = await getDocs(collRef);

  // no snapshot, we done
  if (snapshot.empty) return;

  // get the evidenceOf values
  const arrayFields = ["evidenceOf"];
  // setup the headers with our custom ID value
  const headers = [
    "ID",
    ...Object.keys(snapshot.docs[0].data()),
    ...new Set(
      arrayFields.flatMap((field) =>
        snapshot.docs
          .flatMap((doc) => doc.data()[field] || [])
          .map((value) => `${field}_${value}`)
      )
    ),
  ];
  allRows.push(headers);

  snapshot.docs.forEach((doc, index) =>
    addCSVRow(index + 1, doc.data(), headers)
  );
};

const downloadCsv = () => {
  // sets up time stamp for document name
  const today = new Date();
  const date = today.toISOString().split("T")[0];
  const time = today.toTimeString().split(" ")[0].replace(/:/g, "-");
  const dateTime = `${date}_${time}`;
  exportToCsv(`${dateTime}.csv`, allRows);
};

const allRows = [];

export const fetchDataAndDownload = async () => {
  // Clear the allRows array
  allRows.length = 0;
  // setup allRows
  await fetchFirebaseData();
  // download the csv with the rows
  downloadCsv();
};
