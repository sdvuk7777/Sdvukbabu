const express = require("express");
const axios = require("axios");
const https = require("https");
const cors = require("cors"); // Import CORS package

const app = express();
const PORT = 3000;

// Static Token (Replace with your actual token)
const TOKEN = "Bearer 57464258|gUlT5JbLAjLLLqJf6VETioZMx8rp0ukB6jxJiwoyac635fd1";

// HTTPS Agent to handle SSL issues (optional)
const agent = new https.Agent({ rejectUnauthorized: false });

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Fetch course lessons by batch ID
app.get("/api/courses/:batchid", async (req, res) => {
    const { batchid } = req.params;

    try {
        console.log("Fetching lessons for batch ID:", batchid);

        const response = await axios.get(
            `https://khanglobalstudies.com/api/user/courses/${batchid}/v2-lessons`,
            {
                headers: {
                    "Host": "khanglobalstudies.com",
                    "Authorization": TOKEN,
                    "Accept-Encoding": "gzip",
                    "User-Agent": "okhttp/3.9.1",
                },
                httpsAgent: agent,
            }
        );

        console.log("Course lessons fetched successfully:", response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching course lessons:", error.message);
        res.status(error.response?.status || 500).json({
            error: "Failed to fetch course lessons",
            details: error.response?.data || "No additional details available",
        });
    }
});

// Fetch specific lesson details by lesson ID
app.get("/api/lessons/:lessonid", async (req, res) => {
    const { lessonid } = req.params;

    try {
        console.log("Fetching details for lesson ID:", lessonid);

        const response = await axios.get(
            `https://khanglobalstudies.com/api/lessons/${lessonid}`, // Corrected URL
            {
                headers: {
                    "Host": "khanglobalstudies.com",
                    "Authorization": TOKEN,
                    "Accept-Encoding": "gzip",
                    "User-Agent": "okhttp/3.9.1",
                },
                httpsAgent: agent,
            }
        );

        console.log("Lesson details fetched successfully:", response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching lesson details:", error.message);
        res.status(error.response?.status || 500).json({
            error: "Failed to fetch lesson details",
            details: error.response?.data || "No additional details available",
        });
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("API is working! Use /api/courses/:batchid or /api/lessons/:lessonid");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});