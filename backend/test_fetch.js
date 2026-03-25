fetch("http://localhost:4000/api/dogs")
  .then(res => res.json())
  .then(data => console.log("Full data:", data))
  .catch(err => console.error("Fetch error:", err.message));
