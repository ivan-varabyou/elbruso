"use client";

import { useAdminAuth } from "@frontend/modules/admin-auth";
import { ProfilePageLayout } from "@frontend/ui";
import { LayoutDashboard, Users, Shield, Activity, Settings } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAdminAuth();

  return (
    <ProfilePageLayout
      title="Dashboard"
      icon={LayoutDashboard}
      description="Основные показатели системы и активность администраторов."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#EEF2FF",
                borderRadius: "0.5rem",
              }}
            >
              <Users size={24} color="#4F7CFF" />
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#64748B" }}>Total Users</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>1,234</p>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#ECFDF5",
                borderRadius: "0.5rem",
              }}
            >
              <Activity size={24} color="#10B981" />
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#64748B" }}>Active Sessions</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>56</p>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#FEF3C7",
                borderRadius: "0.5rem",
              }}
            >
              <Shield size={24} color="#F59E0B" />
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#64748B" }}>Admin Users</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>5</p>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#FEE2E2",
                borderRadius: "0.5rem",
              }}
            >
              <Settings size={24} color="#EF4444" />
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#64748B" }}>System Status</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#10B981" }}>Healthy</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>
          Recent Activity
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { action: "User login", user: "john@example.com", time: "2 minutes ago" },
            { action: "Settings updated", user: "admin@elbruso.ru", time: "15 minutes ago" },
            { action: "New user registered", user: "new@elbruso.ru", time: "1 hour ago" },
            { action: "Password reset", user: "support@elbruso.ru", time: "3 hours ago" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 0",
                borderBottom: index < 3 ? "1px solid #E2E8F0" : "none",
              }}
            >
              <div>
                <p style={{ fontWeight: 500 }}>{item.action}</p>
                <p style={{ fontSize: "0.875rem", color: "#64748B" }}>{item.user}</p>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#64748B" }}>{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </ProfilePageLayout>
  );
}
