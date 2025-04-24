// index.js
const app = require('./app'); // 👉 Import the Express app setup from app.js
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
