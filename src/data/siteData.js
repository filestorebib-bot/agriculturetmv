
export const school = {
  name: "Triveni Secondary School",
  department: "Department of Plant Science",
  address: "Katari-4, Udayapur, Koshi Province, Nepal",
  phone: "035-450-154",
  email: "",
  website: "https://tankanath.com.np",
  theme: {
    primary: "#166534",
    secondary: "#65a30d",
    accent: "#d9f99d",
    background: "#f5faf3"
  }
};

export const navigation = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "OJT", path: "/ojt" },
  { label: "Classes", path: "/classes" },
  { label: "Notices", path: "/notices" },
  { label: "Contact Us", path: "/contact" }
];

export const leadership = [
  {
    role: "Principal",
    name: "Gyanendra Bahadur Karki",
    phone: "",
    qualification: "",
    image: "/images/principal.jpg"
  },
  {
    role: "Plant Science Coordinator",
    name: "Kailash Rayamajhi",
    phone: "",
    qualification: "",
    image: "/images/coordinator.jpg"
  }
];

export const classes = [
  {
    grade: 9,
    title: "Class 9",
    description: "Foundation studies and introduction to agriculture.",
    subjects: []
  },
  {
    grade: 10,
    title: "Class 10",
    description: "Secondary-level studies and agricultural foundations.",
    subjects: []
  },
  {
    grade: 11,
    title: "Class 11",
    description: "Plant Science theory and practical learning.",
    subjects: []
  },
  {
    grade: 12,
    title: "Class 12",
    description: "Advanced Plant Science and practical preparation.",
    subjects: []
  }
];

export const programs = [
  {
    id: "plant-nursery",
    title: "Plant Nursery Management",
    category: "Practical Agriculture",
    description:
      "Learn seedling production, nursery preparation, watering and plant care.",
    image: "/images/programs/nursery.jpg",
    date: "",
    gallery: []
  },
  {
    id: "crop-production",
    title: "Crop Production",
    category: "Crop Science",
    description:
      "Explore land preparation, crop establishment, field management and harvesting.",
    image: "/images/programs/crops.jpg",
    date: "",
    gallery: []
  },
  {
    id: "student-awareness",
    title: "Agricultural Awareness",
    category: "Community Outreach",
    description:
      "Promote sustainable agriculture and share practical farming knowledge.",
    image: "/images/programs/agriculture-awareness.jpg",
    date: "",
    gallery: []
  }
];

export const ojtPrograms = [
  {
    id: "ojt-10",
    title: "Class 10 OJT",
    description:
      "Practical exposure to basic agricultural activities and farm operations.",
    duration: "",
    image: "/images/ojt/ojt-10.jpg",
    gallery: []
  },
  {
    id: "ojt-11",
    title: "Class 11 OJT",
    description:
      "Supervised agricultural project work, field practice and activity reporting.",
    duration: "",
    image: "/images/ojt/ojt-11.jpg",
    gallery: []
  },
  {
    id: "ojt-12",
    title: "Class 12 OJT",
    description:
      "Advanced practical project work, record keeping and agricultural experience.",
    duration: "",
    image: "/images/ojt/ojt-12.jpg",
    gallery: []
  }
];

export const teachers = [
  {
    id: "teacher-1",
    name: "Teacher Name",
    designation: "Plant Science Teacher",
    qualification: "Add verified qualification",
    phone: "",
    image: "/images/teachers/teacher-1.jpg",
    subjects: []
  }
];

export const alumniTestimonials = [
  {
    id: "alumni-1",
    name: "Former Student",
    batch: "",
    quote:
      "Add an approved testimonial from a former Plant Science student.",
    image: "/images/alumni/alumni-1.jpg"
  }
];

export const notices = [
  {
    id: "welcome-notice",
    title: "Welcome to the Department of Plant Science",
    date: "2026-10-09",
    type: "text",
    summary:
      "Official announcements and academic updates will be published here.",
    content:
      "Please check this section regularly for school notices, examination schedules, admission information and program updates.",
    file: "",
    image: "",
    pinned: true
  }
];

export const contact = {
  phone: school.phone,
  email: school.email,
  address: school.address,
  mapQuery: "Triveni Secondary School, Katari-4, Udayapur, Nepal",
  spokesperson: {
    name: "",
    role: "Official Spokesperson",
    phone: ""
  },
  administration: {
    name: "",
    phone: "",
    email: ""
  },
  department: {
    name: school.department,
    coordinator: "Kailash Rayamajhi",
    phone: ""
  }
};

export const developer = {
  name: "Bibash Lamichhane",
  role: "Website Designer & Developer",
  image: "/images/developer/bibash-lamichhane.jpg",
  bio:
    "Add your verified biography, education, skills and projects here.",
  skills: [
    "Web Development",
    "UI/UX Design",
    "Responsive Website Design"
  ],
  github: "",
  portfolio: "",
  email: ""
};

export const homeContent = {
  eyebrow: "Learn • Cultivate • Grow",
  title: "Growing Knowledge, Cultivating the Future",
  subtitle:
    "Discover agricultural education, practical Plant Science, student activities and opportunities at Triveni Secondary School.",
  heroImage: "/images/school-campus.jpg"
};

export const siteFeatures = {
  enableNoticeTicker: true,
  noticeTickerDirection: "left-to-right",
  noticeTickerSpeed: "normal",
  enableProgramSharing: true,
  enableGallery: true,
  enableNoticeDownloads: true,
  enableMobileNavigation: true
};
