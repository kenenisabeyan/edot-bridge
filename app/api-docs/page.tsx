"use client";

import { useState } from "react";

const apiEndpoints = [
  { method: "GET", path: "/api/health", description: "Backend health check & PostgreSQL latency metrics", auth: false },
  { method: "GET", path: "/api/courses", description: "Fetch all active courses and lessons", auth: false },
  { method: "GET", path: "/api/jobs", description: "Fetch active job postings from employers", auth: false },
  { method: "POST", path: "/api/auth/register", description: "Register new user (Student / Employer)", auth: false, samplePayload: { name: "Test User", email: "test@example.com", password: "password123", role: "STUDENT" } },
  { method: "POST", path: "/api/auth/login", description: "Authenticate user and issue JWT token", auth: false, samplePayload: { email: "student@edotbridge.com", password: "password123" } },
  { method: "GET", path: "/api/user/profile", description: "Get authenticated user profile details", auth: true },
  { method: "GET", path: "/api/enrollment/my-courses", description: "Get enrolled courses for student", auth: true },
  { method: "GET", path: "/api/match-jobs", description: "Match job postings against user skills", auth: true },
  { method: "POST", path: "/api/translate", description: "Translate lesson text into Amharic/Somali/Swahili", auth: false, samplePayload: { text: "Welcome to full stack development", targetLang: "am" } },
];

export default function ApiDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(apiEndpoints[0]);
  const [responseOutput, setResponseOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleTestApi = async (endpoint: any) => {
    setLoading(true);
    setResponseOutput("Fetching data from PERN Express server...");
    try {
      const baseUrl = "http://localhost:5000";
      const token = localStorage.getItem("token");

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token && endpoint.auth) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const options: RequestInit = {
        method: endpoint.method,
        headers,
      };

      if (endpoint.method === "POST" && endpoint.samplePayload) {
        options.body = JSON.stringify(endpoint.samplePayload);
      }

      const res = await fetch(`${baseUrl}${endpoint.path}`, options);
      const data = await res.json();
      setResponseOutput(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseOutput(`Error connecting to PERN API: ${err.message}\nMake sure 'npm run server:dev' is running on http://localhost:5000`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PERN Stack API Documentation & Explorer</h1>
          <p className="text-gray-600 mt-1">Interactive API testing suite for Express endpoints & PostgreSQL backend.</p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-300">
          11 Active Routes
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Endpoint Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Available Endpoints</h2>
          {apiEndpoints.map((ep, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedEndpoint(ep);
                handleTestApi(ep);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedEndpoint?.path === ep.path
                  ? "border-indigo-600 bg-indigo-50/60 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                    ep.method === "GET" ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {ep.method}
                </span>
                <span className="font-mono text-xs font-bold text-gray-800">{ep.path}</span>
                {ep.auth && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-semibold ml-auto">JWT Required</span>}
              </div>
              <p className="text-xs text-gray-500">{ep.description}</p>
            </div>
          ))}
        </div>

        {/* Live Test Console */}
        <div className="lg:col-span-7 bg-gray-900 rounded-2xl p-6 text-white font-mono border border-gray-800 shadow-2xl flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center pb-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              <span className="text-xs text-gray-400 font-sans ml-2">Console output - {selectedEndpoint?.path}</span>
            </div>
            <button
              onClick={() => handleTestApi(selectedEndpoint)}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-sans font-semibold px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? "Executing..." : "Run Test ▶"}
            </button>
          </div>

          <div className="mt-4 flex-1 overflow-auto bg-black/50 p-4 rounded-xl text-xs text-emerald-400 font-mono whitespace-pre-wrap">
            {responseOutput || "// Click 'Run Test ▶' to inspect real-time JSON responses from the Express PERN server."}
          </div>
        </div>
      </div>
    </div>
  );
}
