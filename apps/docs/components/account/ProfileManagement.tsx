
"use client";

import React from "react";

const profiles = [
  { name: "Profile 1", imgSrc: "https://via.placeholder.com/50" },
  { name: "Profile 2", imgSrc: "https://via.placeholder.com/50" },
  { name: "Profile 3", imgSrc: "https://via.placeholder.com/50" },
  { name: "Profile 4", imgSrc: "https://via.placeholder.com/50" },
  { name: "Profile 5", imgSrc: "https://via.placeholder.com/50" },
];

export default function ProfileManagement() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-6 flex items-center space-x-4">
      <div className="text-lg font-semibold">Manage profiles</div>
      <div className="flex space-x-3">
        {profiles.map((profile) => (
          <div key={profile.name} className="relative">
            <img
              src={profile.imgSrc}
              alt={profile.name}
              className="w-12 h-12 rounded-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
