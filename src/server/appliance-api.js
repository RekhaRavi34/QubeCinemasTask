import express, { json } from 'express';
import { v4 as uuidv4 } from 'uuid';
import data from './data.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data
const appliances = data;

// Middleware
app.use(json());
app.use(cors());

// Routes
// Get all appliances info
app.get('/api/v1/appliances', (req, res) => {
  const { deviceStatus, downloadStatus } = req.query;

  let filteredAppliances = appliances;

  if (deviceStatus) {
    filteredAppliances = filteredAppliances.filter(appliance => appliance.deviceStatus.toLowerCase() === deviceStatus.toLowerCase());
  }

  if (downloadStatus) {
    filteredAppliances = filteredAppliances.filter(appliance => appliance.downloadStatus.toLowerCase() === downloadStatus.toLowerCase());
  }

  res.status(200).json({ appliances: filteredAppliances });
});

// Get info about an appliance
app.get('/api/v1/appliance/:applianceId/info', (req, res) => {
  const applianceId = req.params.applianceId;
  const appliance = appliances.find(appliance => appliance.serialNo === applianceId);

  if (!appliance) {
    return res.status(404).json({
      httpStatus: 404,
      httpCode: "Not Found",
      requestId: uuidv4(),
      errors: [{ code: "APPLIANCE_NOT_FOUND", message: "Appliance not found" }]
    });
  }

  res.status(200).json(appliance);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const errorResponse = {
      httpStatus: 500,
      httpCode: "Internal Server Error",
      requestId: uuidv4(),
      errors: [{ code: "INTERNAL_SERVER_ERROR", message: "An internal server error occurred" }]
    };
  
    // Check if it's a JSON syntax error
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      errorResponse.httpStatus = 400;
      errorResponse.httpCode = "Bad Request";
      errorResponse.errors = [{ code: "INVALID_JSON", message: "Invalid JSON" }];
    }
  
    res.status(errorResponse.httpStatus).json(errorResponse);
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
