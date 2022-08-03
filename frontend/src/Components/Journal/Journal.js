// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export function Journal() {
//   const [entries, setEntries] = useState([]);
//   const navigate = useNavigate();

//   const updateJournal = async (body) => {
//     const res = await fetch('/journals', {
//       method: 'PUT',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(body),
//     });
//     const json = await res.json();

//     if (res.ok) {
//       return true;
//     }
//     throw { status: res.status, message: json.message };
//   };

//   const getEntriesFromDatabase = () => 
  
// };