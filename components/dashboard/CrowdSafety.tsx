"use client";

import { useState } from "react";

import {
  Shield,
  MapPin,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function CrowdSafety() {
  const [reports, setReports] = useState([
  {
    icon: "🚨",
    title: "Harassment Report",
    location: "FC Road",
    time: "09:35 PM",
    color: "text-red-400",
  },
  {
    icon: "💡",
    title: "Street Light Failure",
    location: "JM Road",
    time: "09:28 PM",
    color: "text-yellow-400",
  },
  {
    icon: "🚧",
    title: "Road Accident",
    location: "MG Road",
    time: "09:16 PM",
    color: "text-orange-400",
  },
  {
    icon: "🚓",
    title: "Police Patrol",
    location: "Shivajinagar",
    time: "09:05 PM",
    color: "text-green-400",
  },
]);

const [score, setScore] = useState(74);

const [showForm, setShowForm] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);

const [type, setType] = useState("Harassment");
const [location, setLocation] = useState("");
const [description, setDescription] = useState("");
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-[#11111A] border border-[#2A2A40] rounded-3xl p-8">

        <div className="flex justify-between items-center">

          <div>

            <p className="uppercase tracking-[4px] text-xs text-gray-500">
              Community Intelligence
            </p>

            <h1 className="text-5xl font-bold mt-2">
              Crowd Safety Dashboard
            </h1>

            <p className="text-gray-400 mt-3">
              AI analyzes anonymous community reports to estimate the safety of nearby areas.
            </p>

          </div>

          <MapPin
            size={55}
            className="text-purple-500"
          />

        </div>

      </div>

      {/* Safety Score */}

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-[#11111A] rounded-3xl border border-[#2A2A40] p-8 flex flex-col items-center">

          <div className="w-40 h-40 rounded-full border-[12px] border-purple-600 flex items-center justify-center">

            <div>

             <h2 className="text-5xl font-bold text-center">
  {score}
</h2>

              <p className="text-center text-gray-400 mt-2">
                /100
              </p>

            </div>

          </div>

          <p className="mt-6 text-xl text-yellow-400 font-semibold">
            Medium Safe
          </p>

        </div>

        <div className="lg:col-span-2 bg-[#11111A] rounded-3xl border border-[#2A2A40] p-8">

          <h2 className="text-3xl font-bold">
            AI Summary
          </h2>

          <p className="text-gray-400 mt-5 leading-8">

            AI has calculated the Crowd Safety Score using anonymous community reports,
            police patrol frequency, lighting conditions,
            recent incident reports and crowd density.

          </p>

          <div className="grid grid-cols-2 gap-5 mt-8">

            <div className="bg-[#191925] rounded-xl p-5">

              <Users className="text-green-400 mb-3"/>

              <h3 className="font-semibold">
                Crowd Density
              </h3>

              <p className="text-green-400 mt-2">
                High
              </p>

            </div>

            <div className="bg-[#191925] rounded-xl p-5">

              <ShieldCheck className="text-blue-400 mb-3"/>

              <h3 className="font-semibold">
                Police Patrol
              </h3>

              <p className="text-green-400 mt-2">
                Active
              </p>

            </div>

          </div>

        </div>

      </div>
{/* AI Recommendation */}

<div className="bg-[#11111A] border border-[#2A2A40] rounded-3xl p-8">

  <div className="flex items-center gap-3 mb-6">

    <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-2xl">
      🤖
    </div>

    <div>

      <p className="uppercase tracking-[4px] text-xs text-gray-500">
        AI Analysis
      </p>

      <h2 className="text-3xl font-bold">
        Safety Recommendations
      </h2>

    </div>

  </div>

  <div className="grid md:grid-cols-2 gap-5">

    <div className="bg-[#191925] rounded-2xl p-5">

      <h3 className="text-green-400 font-semibold">
        ✅ Recommended
      </h3>

      <ul className="mt-4 space-y-3 text-gray-300">

        <li>• Use Safe Route Navigation after 9 PM</li>

        <li>• Share Live Location with trusted contacts</li>

        <li>• Walk through well-lit streets</li>

        <li>• Keep Guardian AI enabled</li>

      </ul>

    </div>

    <div className="bg-[#191925] rounded-2xl p-5">

      <h3 className="text-red-400 font-semibold">
        ⚠ AI Warning
      </h3>

      <p className="text-gray-300 mt-4 leading-7">

        Crowd Safety Score has decreased due to recent
        harassment reports and poor street lighting
        in nearby areas.

      </p>

      <div className="mt-6 inline-flex bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full">

        Risk Level : Medium

      </div>

    </div>

  </div>

</div>

<div className="mt-8 bg-[#11111A] border border-[#2A2A40] rounded-3xl p-8">

  <div className="flex justify-between items-center mb-8">

  <div>
    <p className="uppercase tracking-[4px] text-xs text-gray-500">
      Incident Timeline
    </p>

    <h2 className="text-3xl font-bold mt-2">
      Community Reports
    </h2>
  </div>

  <button
  onClick={() => setShowForm(true)}
  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold"
>
  + Report Incident
</button>

</div>

    <div>
     
    
    </div>

   

  </div>

  <div className="space-y-5">

    {reports.map((report, index) => (

      <div
        key={index}
        className="bg-[#191925] rounded-2xl border border-[#2A2A40] p-5 flex justify-between items-center"
      >

        <div className="flex gap-4">

          <div className="text-3xl">
            {report.icon}
          </div>

          <div>

            <h3 className={`text-xl font-semibold ${report.color}`}>
              {report.title}
            </h3>

            <p className="text-gray-400">
              📍 {report.location}
            </p>

          </div>

        </div>

        <div className="text-gray-500">
          {report.time}
        </div>

      </div>

    ))}

  </div>
{showForm && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-[#11111A] w-[500px] rounded-3xl border border-[#2A2A40] p-8">

      <h2 className="text-3xl font-bold mb-6">
        Report Incident
      </h2>

      <div className="space-y-5">

        <div>

          <label className="text-gray-400">
            Type
          </label>

          <select
            value={type}
            onChange={(e)=>setType(e.target.value)}
            className="mt-2 w-full bg-[#191925] rounded-xl p-3"
          >
            <option>Harassment</option>
            <option>Street Light Failure</option>
            <option>Road Accident</option>
            <option>Suspicious Activity</option>
          </select>

        </div>

        <div>

          <label className="text-gray-400">
            Location
          </label>

          <input
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            placeholder="FC Road"
            className="mt-2 w-full bg-[#191925] rounded-xl p-3"
          />

        </div>

        <div>

          <label className="text-gray-400">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Someone was following me..."
            className="mt-2 w-full bg-[#191925] rounded-xl p-3 h-28"
          />

        </div>

        <div className="flex justify-end gap-4">

          <button
            onClick={()=>setShowForm(false)}
            className="px-5 py-3 rounded-xl bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={()=>{
              setReports([
                {
                  icon:
                    type==="Harassment" ? "🚨" :
                    type==="Street Light Failure" ? "💡" :
                    type==="Road Accident" ? "🚧" : "👤",

                  title:type,

                  location,

                  time:"Just Now",

                  color:
                    type==="Harassment" ? "text-red-400" :
                    type==="Street Light Failure" ? "text-yellow-400" :
                    type==="Road Accident" ? "text-orange-400" :
                    "text-blue-400",
                },

                ...reports
              ]);

              setScore(prev=>Math.max(prev-3,40));

              setShowForm(false);
              setShowSuccess(true);

setTimeout(() => {
  setShowSuccess(false);
}, 2500);

              setLocation("");

              setDescription("");

            }}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold"
          >
            Submit Report
          </button>

        </div>

      </div>

    </div>

  </div>
)}
{showSuccess && (

<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

  <div className="bg-[#11111A] border border-green-500 rounded-3xl p-10 w-[430px] text-center shadow-2xl">

    <div className="text-6xl mb-4">
      ✅
    </div>

    <h2 className="text-3xl font-bold text-green-400">
      Report Submitted
    </h2>

    <p className="text-gray-400 mt-4 leading-7">

      Thank you for contributing to community safety.

      <br />

      AI has updated the Crowd Safety Score
      using your report.

    </p>

    <button
      onClick={() => setShowSuccess(false)}
      className="mt-8 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-semibold"
    >
      OK
    </button>

  </div>

</div>

)}
</div>
   
    
  );
}