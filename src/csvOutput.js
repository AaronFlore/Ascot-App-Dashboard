import * as firebase from "./firebaseConfig.js";
import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

function exportToCsv(filename, rows) {
  var processRow = function (row) {
    var finalVal = "";
    for (var j = 0; j < row.length; j++) {
      var innerValue = row[j] === null ? "" : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      }
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
      if (j > 0) finalVal += ",";
      finalVal += result;
    }
    return finalVal + "\n";
  };

  var csvFile = "";
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

const all_rows = [];

function add_to_csv_list(doc) {
  const current_row = Object.values(doc);
  all_rows.push(current_row);
}

async function fetchFirebaseData() {
  try {
    const collRef = collection(db, "plantsData");
    const snapshot = await getDocs(collRef);
    snapshot.docs.forEach((doc) => {
      add_to_csv_list(doc.data());
    });
    return all_rows;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
}

function download_export() {
  var today = new Date();
  var date = today.toISOString().split("T")[0];
  var time = today.toTimeString().split(" ")[0];
  var dateTime = date + "_" + time;
  exportToCsv(dateTime + ".csv", all_rows);
}

// Usage
export async function fetchDataAndDownload() {
  await fetchFirebaseData();
  download_export();
}
