"use client";

import { useAuth } from "@elbruso/modules/auth/lib";
import React from "react";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-zinc-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const userName = user
    ? [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(" ")
    : "Guest";

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Welcome back, {userName}!</h1>
        <p className="text-zinc-500">
          {isAuthenticated
            ? "Your Elbruso dashboard is ready."
            : "Please sign in to access your dashboard."}
        </p>
      </div>

      {isAuthenticated && user && (
        <div className="mb-8 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-heroui-primary/10 rounded-full flex items-center justify-center">
              <span className="text-heroui-primary font-semibold text-lg">
                {user.first_name?.[0] || user.email[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-zinc-900">{userName}</p>
              <p className="text-sm text-zinc-500">{user.email}</p>
            </div>
            <div className="ml-auto px-3 py-1 bg-heroui-primary/10 text-heroui-primary text-sm rounded-full">
              {user.role || "User"}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
            Total Indicators
          </h3>
          <p className="text-3xl font-bold text-zinc-900">124</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
            Active Workspaces
          </h3>
          <p className="text-3xl font-bold text-zinc-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
            Recent Updates
          </h3>
          <p className="text-3xl font-bold text-zinc-900">8</p>
        </div>
      </div>

      <div className="mt-8 bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <h2 className="text-xl font-semibold text-zinc-800 mb-2">Your Dashboard</h2>
        <p className="text-zinc-500 max-w-md">
          {isAuthenticated
            ? "Real-time data and analytics will appear here. Your WebSocket connection is active."
            : "Please sign in to access your dashboard."}
        </p>
        {isAuthenticated && (
          <div className="mt-4 flex items-center gap-2 text-sm text-heroui-success">
            <span className="w-2 h-2 bg-heroui-success rounded-full animate-pulse"></span>
            Connected via WebSocket
          </div>
        )}
      </div>
    </div>
  );
}
