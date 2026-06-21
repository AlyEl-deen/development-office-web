import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { Project } from "./utils";

type ProjectData = Partial<Omit<Project, "id">> & {
  sortOrder?: number;
};

const projectCategories: Project["category"][] = ["Website", "Mobile App", "System"];

const fallbackProjects: Project[] = [
  {
    id: "fc-academy",
    name: "FC Academy System",
    shortDescription: "The Complete Management Solution for Modern Training & Courses Centers",
    fullDescription: "FC Academy is a powerful desktop management system designed to help educational centers streamline operations, manage students efficiently, and scale with confidence. Built using Tauri, React, and TypeScript, the platform delivers enterprise-level performance in a fast, secure, and visually modern desktop experience.",
    imageUrl: "/images/FC-Academy-1.png",
    galleryImages: [
      "/images/FC-Academy-2.png",
      "/images/FC-Academy-3.png",
      "/images/FC-Academy-4.png",
      "/images/FC-Academy-5.png",
      "/images/FC-Academy-6.png",
      "/images/FC-Academy-7.png",
    ],
    category: "System",
    features: [
      "Complete student profiles and records",
      "Attendance and performance tracking",
      "Enrollment and registration management",
      "Instructor scheduling and coordination",
      "Course, class, and group organization",
      "Payment tracking, invoicing, and analytics",
      "Smart dashboard with real-time insights",
      "Modern desktop UI with smooth animations",
    ],
    techStack: ["Tauri", "React", "TypeScript", "Tailwind CSS"],
    priceRange: "20,000 - 25,000 EGP",
  },
  {
    id: "future-dental",
    name: "FC Dental Management",
    shortDescription: "A complete clinic command center for appointments, patients, procedure costs, collections, and profit tracking.",
    fullDescription: "FC Dental Management is a focused desktop management system built for dental clinics that need live operational control without spreadsheet chaos. The system brings patient records, appointment booking, procedure pricing, payment collection, treatment sessions, cost breakdowns, and profit visibility into one polished dashboard.",
    imageUrl: "/images/future-dental-logo.png",
    galleryImages: [
      "/images/future-dental-dashboard.png",
      "/images/future-dental-booking.png",
      "/images/future-dental-breakdown.png",
      "/images/future-dental-login.png",
    ],
    category: "System",
    features: [
      "Clinic dashboard with live account and collection metrics",
      "Patient and appointment booking workflow",
      "Procedure pricing with costs, profit, and margin tracking",
      "Daily bookings overview with payment progress",
      "Secure login screen and clinic-branded desktop experience",
    ],
    techStack: ["Tauri", "React", "TypeScript", "Tailwind CSS"],
    priceRange: "25,000 - 30,000 EGP",
  },
  {
    id: "fc-stadium",
    name: "FC Stadiom V.I.P. POS System",
    shortDescription: "A professional desktop POS application for managing a PlayStation Lounge gaming center.",
    fullDescription: "FC Stadiom V.I.P. POS System is a professional desktop Point of Sale application built for PlayStation Lounge gaming centers. The app combines a real-time room monitor, flexible session billing, product sales, stock tracking, admin controls, and revenue analytics in one maintainable desktop system. It is structured with a clear separation between React UI components, business logic controllers, Zustand-powered state, and SQLite persistence for rooms, products, sessions, transactions, and transaction items.",
    imageUrl: "/images/fc-stadiom-vip-logo.png",
    galleryImages: [
      "/images/fc-stadium-room-start.png",
      "/images/fc-stadium-room-monitor.png",
      "/images/fc-stadium-pos.png",
      "/images/fc-stadium-invoice.png",
    ],
    category: "System",
    features: [
      "Grid-based dashboard for PS4, PS5, Xbox, and Switch room status",
      "Real-time session tracking with Available, Busy, and Cleaning indicators",
      "Pay-as-you-go and fixed-time billing with persistent countdown timers",
      "Single-player and multi-player pricing modes per room",
      "Audio alerts when fixed-time sessions expire",
      "POS catalog for Food, Beverage, and Snack products",
      "Shopping cart, automatic cash change calculation, and multiple payment methods",
      "Stock management with low stock alerts",
      "Admin CRUD tools for rooms, products, categories, prices, stock, and room rates",
      "Analytics for room performance, revenue trends, payment methods, and utilization",
      "Controller layer for sessions, rooms, products, transactions, and analytics",
    ],
    techStack: ["React 18", "TypeScript", "Tauri", "Tailwind CSS", "SQLite", "Vite", "Zustand"],
    priceRange: "22,000 - 28,000 EGP",
  },
  {
    id: "dentlistmax",
    name: "Dentlistmax.com",
    shortDescription: "A dental education app hub for course discovery, professional registration, audience growth, and launch capture.",
    fullDescription: "Dentlistmax.com is a dental education web platform created as the public launch and registration hub for the DentlistMax mobile app. The experience introduces the brand, captures early interest through a coming-soon registration form, explains the platform for dental professionals, and presents upcoming accredited courses led by field experts.",
    imageUrl: "/images/dentlistmax-logo.jpeg",
    galleryImages: [
      "/images/dentlistmax-coming-soon.png",
      "/images/dentlistmax-stats.png",
      "/images/dentlistmax-courses.png",
      "/images/dentlistmax-roles.png",
    ],
    category: "Website",
    features: [
      "Coming-soon registration flow",
      "Dental education brand introduction",
      "Upcoming courses showcase",
      "Audience metrics and social proof",
      "Role-based registration paths",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Responsive UI"],
    priceRange: "65,000 - 80,000 EGP",
    liveUrl: "https://dentlistmax.com",
  },
];

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normalizeProject(id: string, data: ProjectData): Project {
  const category = projectCategories.includes(data.category as Project["category"])
    ? data.category as Project["category"]
    : "System";

  return {
    id,
    name: data.name || "Untitled Project",
    shortDescription: data.shortDescription || "",
    fullDescription: data.fullDescription || "",
    imageUrl: data.imageUrl || "",
    galleryImages: normalizeStringArray(data.galleryImages),
    category,
    features: normalizeStringArray(data.features),
    techStack: normalizeStringArray(data.techStack),
    priceRange: data.priceRange || "",
    liveUrl: data.liveUrl,
  };
}

export function subscribeProjects(
  onProjects: (projects: Project[]) => void,
  onError: (error: Error) => void,
) {
  return onSnapshot(
    collection(db, "projects"),
    (snapshot) => {
      const projects = snapshot.docs
        .map((projectDoc) => {
          const data = projectDoc.data() as ProjectData;
          return {
            project: normalizeProject(projectDoc.id, data),
            sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : Number.MAX_SAFE_INTEGER,
          };
        })
        .sort((a, b) => a.sortOrder - b.sortOrder || a.project.name.localeCompare(b.project.name))
        .map(({ project }) => project);

      onProjects(projects.length > 0 ? projects : fallbackProjects);
    },
    (error) => {
      if (fallbackProjects.length > 0) {
        onProjects(fallbackProjects);
        return;
      }

      onError(error);
    },
  );
}

export function subscribeProject(
  projectId: string,
  onProject: (project: Project | null) => void,
  onError: (error: Error) => void,
) {
  return onSnapshot(
    doc(db, "projects", projectId),
    (snapshot) => {
      const fallbackProject = fallbackProjects.find((project) => project.id === projectId) || null;
      onProject(snapshot.exists() ? normalizeProject(snapshot.id, snapshot.data() as ProjectData) : fallbackProject);
    },
    (error) => {
      const fallbackProject = fallbackProjects.find((project) => project.id === projectId) || null;

      if (fallbackProject) {
        onProject(fallbackProject);
        return;
      }

      onError(error);
    },
  );
}
