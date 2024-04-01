import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const DataPreview = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'plantsData'));
        const docs = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // Check if 'timestamp' exists and is a valid Firestore timestamp
          if (data.timestamp?.toDate) {
            // Convert Firestore timestamp to JavaScript Date object
            const date = data.timestamp.toDate();
            // Format the date to a readable string ('MM/DD/YYYY')
            data.timestamp = date.toLocaleDateString('en-US');
          }
          return data;
        });
        setData(docs);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full bg-[#D9D9D9] rounded-[25px] p-4 overflow-hidden">
      <div className="overflow-y-auto max-h-[230px]">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="mb-4 p-2 bg-white rounded-lg">
              <p>Dead: {item.dead ? 'Yes' : 'No'}</p>
              <p>Email: {item.email}</p>
              <p>Plant Health: {item.plantHealth}</p>
              <p>Plant ID: {item.plantID}</p>
              <p>Species ID: {item.speciesID}</p>
              <p>Timestamp: {item.timestamp || 'Unknown'}</p> {/* Display the formatted date or 'Unknown' */}
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};

export default DataPreview;
