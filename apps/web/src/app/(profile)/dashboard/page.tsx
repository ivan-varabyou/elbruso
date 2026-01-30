'use client';

import React from 'react';

export default function DashboardPage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-zinc-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                    <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Total Indicators</h3>
                    <p className="text-3xl font-bold text-zinc-900">124</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                    <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Active Workspaces</h3>
                    <p className="text-3xl font-bold text-zinc-900">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                    <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Recent Updates</h3>
                    <p className="text-3xl font-bold text-zinc-900">8</p>
                </div>
            </div>
            
            <div className="mt-8 bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <span className="text-2xl">📊</span>
                </div>
                <h2 className="text-xl font-semibold text-zinc-800 mb-2">Welcome to your Dashboard</h2>
                <p className="text-zinc-500 max-w-md">
                    This is a placeholder for your Elbruso dashboard. Real-time data and analytics will appear here soon.
                </p>
            </div>
        </div>
    );
}
