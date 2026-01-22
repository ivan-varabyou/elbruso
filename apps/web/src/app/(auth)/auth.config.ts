/**
 * Authentication configuration
 * Centralized config for auth pages styling and assets
 */

export const authConfig = {
    // Background images
    backgrounds: {
        login: '/assets/img/login-bg.jpg',
        register: '/assets/img/login-bg.jpg', // Can use different image for register
    },

    // Gradient overlay (applied over background image)
    gradientOverlay: {
        enabled: false,
        opacity: 0.85,
        colors: {
            start: 'rgba(102, 126, 234, 0.85)',
            end: 'rgba(118, 75, 162, 0.85)',
        },
    },

    // Decorative circles
    decorations: {
        enabled: true,
        circles: [
            { size: 400, top: -100, right: -100, animation: '20s' },
            { size: 300, bottom: -50, left: '10%', animation: '15s' },
            { size: 200, top: '50%', left: '50%', animation: '25s' },
        ],
    },

    // Layout
    layout: {
        leftPanelWidth: '40%', // Form panel
        rightPanelWidth: '60%', // Background panel
    },
} as const;

export type AuthConfig = typeof authConfig;
