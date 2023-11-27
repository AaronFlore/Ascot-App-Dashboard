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

const convertTimestamp = (value) =>
  isTimestamp(value)
    ? value.toDate().toISOString().split("T").join(" ").split(".")[0]
    : value;

const mapDocToRow = (headers, identifier, doc) =>
  headers.map((header) => {
    if (header === "ID") return identifier;

    const headerParts = header.split("_");
    const field = headerParts[0];
    const subfield = headerParts[1];
    const docValue = doc[field];

    if (field === "evidenceOf") {
      // Check if the evidenceOf array contains the subfield
      return docValue && docValue.includes(subfield) ? 1 : 0;
    } else if (field === "dead") {
      return docValue ? 1 : 0;
    } else if (docValue !== undefined) {
      return convertTimestamp(docValue) || "";
    }
    return "";
  });

const addCSVRow = (identifier, doc, headers) =>
  allRows.push(mapDocToRow(headers, identifier, doc));

const fetchFirebaseData = async () => {
  const collRef = collection(db, "plantsData");
  const snapshot = await getDocs(collRef);

  if (snapshot.empty) return;

  const arrayFields = ["evidenceOf"];
  const headers = ["ID"];

  // Get the first document to determine the structure of the fields
  const firstDocData = snapshot.docs[0].data();

  // Add normal fields to headers
  Object.keys(firstDocData)
    .filter((key) => !arrayFields.includes(key)) // Exclude array fields
    .forEach((key) => headers.push(key));

  // Add array fields to headers
  arrayFields.forEach((field) => {
    snapshot.docs
      .flatMap((doc) => doc.data()[field] || [])
      .forEach((value) => {
        const header = `${field}_${value}`;
        if (!headers.includes(header)) {
          headers.push(header);
        }
      });
  });

  allRows.push(headers);

  snapshot.docs.forEach((doc, index) =>
    addCSVRow(index + 1, doc.data(), headers)
  );
};

const downloadCsv = () => {
  const today = new Date();
  const date = today.toISOString().split("T")[0];
  const time = today.toTimeString().split(" ")[0].replace(/:/g, "-");
  const dateTime = `${date}_${time}`;
  exportToCsv(`${dateTime}.csv`, allRows);
};

const allRows = [];

export const fetchDataAndDownload = async () => {
  allRows.length = 0;
  await fetchFirebaseData();
  downloadCsv();
};
