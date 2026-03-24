// // DogMoodTracker.js
// import React, { useState, useEffect } from "react";

// const DogMoodTracker = () => {
//   const [walks, setWalks] = useState(0);
//   const [playTime, setPlayTime] = useState(0);
//   const [aloneTime, setAloneTime] = useState(0);
//   const [affection, setAffection] = useState(0); 
//   const [mood, setMood] = useState("Unknown");

//   useEffect(() => {
//     calculateMood();
//   }, [walks, playTime, aloneTime, affection]);

//   const calculateMood = () => {
//     let score = 0;

//     if (walks >= 2) score += 2;
//     else if (walks === 1) score += 1;

//     if (playTime >= 30) score += 2;
//     else if (playTime >= 15) score += 1;

//     if (aloneTime <= 2) score += 2;
//     else if (aloneTime <= 5) score += 1;

//     if (affection >= 3) score += 2;
//     else if (affection >= 1) score += 1;

//     if (score >= 7) setMood("😄 Happy");
//     else if (score >= 5) setMood("🙂 Content");
//     else if (score >= 3) setMood("😐 Bored");
//     else setMood("😢 Sad");
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>🐶 Dog Mood Tracker</h2>
//       <div style={styles.inputGroup}>
//         <label>Walks Today: {walks}</label>
//         <input
//           type="range"
//           min="0"
//           max="3"
//           value={walks}
//           onChange={(e) => setWalks(parseInt(e.target.value))}
//         />
//       </div>

//       <div style={styles.inputGroup}>
//         <label>Play Time (minutes): {playTime}</label>
//         <input
//           type="range"
//           min="0"
//           max="60"
//           step="5"
//           value={playTime}
//           onChange={(e) => setPlayTime(parseInt(e.target.value))}
//         />
//       </div>

//       <div style={styles.inputGroup}>
//         <label>Alone Time (hours): {aloneTime}</label>
//         <input
//           type="range"
//           min="0"
//           max="8"
//           value={aloneTime}
//           onChange={(e) => setAloneTime(parseInt(e.target.value))}
//         />
//       </div>

//       <div style={styles.inputGroup}>
//         <label>Affection Level (1–5): {affection}</label>
//         <input
//           type="range"
//           min="0"
//           max="5"
//           value={affection}
//           onChange={(e) => setAffection(parseInt(e.target.value))}
//         />
//       </div>

//       <div style={styles.result}>
//         <h3>Current Mood: {mood}</h3>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "500px",
//     margin: "2rem auto",
//     padding: "2rem",
//     borderRadius: "10px",
//     background: "#fff8f2",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     fontFamily: "Segoe UI, sans-serif",
//   },
//   heading: {
//     textAlign: "center",
//     color: "#444",
//     marginBottom: "1.5rem",
//   },
//   inputGroup: {
//     marginBottom: "1rem",
//     display: "flex",
//     flexDirection: "column",
//   },
//   result: {
//     textAlign: "center",
//     fontSize: "1.5rem",
//     color: "#333",
//     marginTop: "2rem",
//   },
// };

// export default DogMoodTracker;
