import { PrismaClient, ExtensionStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.extension.createMany({
    data: [
      {
        name: "Image Optimizer",
        description: "Optimizes uploaded images for faster loading.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/image-optimizer.png",
      },
      {
        name: "SEO Booster",
        description: "Helps improve your website SEO rankings.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/seo-booster.png",
      },
      {
        name: "Dark Mode Toggle",
        description: "Adds dark mode support to the application.",
        status: ExtensionStatus.inactive,
        avatarURL: "https://example.com/extensions/dark-mode.png",
      },
      {
        name: "Analytics Dashboard",
        description: "Provides traffic and user analytics.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/analytics-dashboard.png",
      },
      {
        name: "Email Notifications",
        description: "Sends email notifications for key events.",
        status: ExtensionStatus.inactive,
        avatarURL: "https://example.com/extensions/email-notifications.png",
      },
      {
        name: "File Uploader",
        description: "Drag and drop file uploads with validation.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/file-uploader.png",
      },
      {
        name: "Multi-Language Support",
        description: "Adds internationalization and translation features.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/i18n.png",
      },
      {
        name: "Payment Gateway",
        description: "Enables credit card and PayPal payments.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/payment.png",
      },
      {
        name: "Live Chat",
        description: "Enables real-time customer support chat.",
        status: ExtensionStatus.inactive,
        avatarURL: "https://example.com/extensions/live-chat.png",
      },
      {
        name: "Push Notifications",
        description: "Send push notifications to users’ devices.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/push.png",
      },
      {
        name: "Social Media Share",
        description: "Adds sharing buttons for popular social networks.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/share.png",
      },
      {
        name: "User Roles & Permissions",
        description: "Granular access control for users and admins.",
        status: ExtensionStatus.inactive,
        avatarURL: "https://example.com/extensions/roles.png",
      },
      {
        name: "Two-Factor Authentication",
        description: "Adds 2FA security via SMS or authenticator apps.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/2fa.png",
      },
      {
        name: "PDF Exporter",
        description: "Export reports and pages as PDF documents.",
        status: ExtensionStatus.inactive,
        avatarURL: "https://example.com/extensions/pdf.png",
      },
      {
        name: "Calendar Integration",
        description: "Integrates with Google Calendar and Outlook.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/calendar.png",
      },
      {
        name: "Survey Builder",
        description: "Create and share user surveys easily.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/survey.png",
      },
      {
        name: "Theme Customizer",
        description: "Lets users customize themes and color palettes.",
        status: ExtensionStatus.inactive,
        avatarURL: "https://example.com/extensions/theme.png",
      },
      {
        name: "Video Player",
        description: "Embed and play videos with custom controls.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/video.png",
      },
      {
        name: "Form Builder",
        description: "Drag-and-drop form builder with validation.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/form.png",
      },
      {
        name: "Data Backup",
        description: "Automated backups to cloud storage.",
        status: ExtensionStatus.inactive,
        avatarURL: "https://example.com/extensions/backup.png",
      },
      {
        name: "AI Recommendations",
        description: "Suggests personalized content to users.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/ai.png",
      },
      {
        name: "Task Manager",
        description: "Organize projects, tasks, and deadlines.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/task.png",
      },
      {
        name: "Weather Widget",
        description: "Displays live weather data on dashboard.",
        status: ExtensionStatus.inactive,
        avatarURL: "https://example.com/extensions/weather.png",
      },
      {
        name: "Stock Tracker",
        description: "Track live stock and crypto prices.",
        status: ExtensionStatus.active,
        avatarURL: "https://example.com/extensions/stocks.png",
      },
    ],
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
