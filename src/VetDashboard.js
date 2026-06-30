import { useState, useEffect } from "react";

function VetDashboard({ setScreen }) {
  const [user, setUser] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [settings, setSettings] = useState({
    notifications: true,
    language: "English",
    theme: "Light",
    emailAlerts: true,
    soundEnabled: true,
    autoSave: false,
    twoFactorAuth: false,
    profileVisibility: "Public",
    timezone: "UTC+1",
    dateFormat: "DD/MM/YYYY",
  });
  const [settingsMessage, setSettingsMessage] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("VetDashboard rendered, setScreen:", setScreen);

  const [consultations] = useState([
    {
      id: 1,
      priority: "High",
      farmer: "Ahmed Bello",
      location: "Kano State",
      issue: "Weak chickens, sudden deaths",
      birdType: "Broiler",
      time: "7 days",
      status: "New",
      statusColor: "#FF9800",
      statusBg: "#FFF3E0",
      description: "Farmer reports that 5 chickens have died suddenly. The remaining chickens appear weak and are not eating properly.",
    },
    {
      id: 2,
      priority: "High",
      farmer: "Salma T.",
      location: "Kaduna State",
      issue: "Breathing difficulty, loss of appetite",
      birdType: "Layer",
      time: "25 weeks",
      status: "In Progress",
      statusColor: "#2196F3",
      statusBg: "#E3F2FD",
      description: "Chickens are showing signs of respiratory distress. Some are coughing and have nasal discharge.",
    },
    {
      id: 3,
      priority: "Medium",
      farmer: "Yusuf M.",
      location: "Nasarawa State",
      issue: "Diarrhea and weakness",
      birdType: "Broiler",
      time: "14 days",
      status: "New",
      statusColor: "#FF9800",
      statusBg: "#FFF3E0",
      description: "Multiple chickens have diarrhea. They appear weak and are drinking less water.",
    },
    {
      id: 4,
      priority: "Medium",
      farmer: "Hauwa A.",
      location: "Oyo State",
      issue: "Coughing and sneezing",
      birdType: "Local",
      time: "8 weeks",
      status: "In Progress",
      statusColor: "#2196F3",
      statusBg: "#E3F2FD",
      description: "Chickens are coughing and sneezing. Some have swollen eyes.",
    },
  ]);

  const [farmers] = useState([
    { id: 1, name: "Ahmed Bello", location: "Kano State", phone: "+234 801 234 5678", birds: "50 Broilers" },
    { id: 2, name: "Salma T.", location: "Kaduna State", phone: "+234 802 345 6789", birds: "30 Layers" },
    { id: 3, name: "Yusuf M.", location: "Nasarawa State", phone: "+234 803 456 7890", birds: "100 Broilers" },
    { id: 4, name: "Hauwa A.", location: "Oyo State", phone: "+234 804 567 8901", birds: "25 Local" },
  ]);

  const [activeChats] = useState([
    { id: 1, farmer: "Ahmed Bello", lastMessage: "My chickens are dying...", time: "10:24 AM", unread: 2 },
    { id: 2, farmer: "Salma T.", lastMessage: "They are coughing badly", time: "09:56 AM", unread: 0 },
    { id: 3, farmer: "Yusuf M.", lastMessage: "Diarrhea continues", time: "09:31 AM", unread: 1 },
  ]);

  const [reminders] = useState([
    { id: 1, title: "Follow up with Ahmed Bello", date: "Today, 2:00 PM", priority: "High" },
    { id: 2, title: "Check Salma T. case update", date: "Tomorrow, 10:00 AM", priority: "Medium" },
    { id: 3, title: "Review Yusuf M. lab results", date: "Jun 28, 9:00 AM", priority: "Low" },
  ]);

  const [reports] = useState([
    { id: 1, title: "Monthly Case Report - June 2026", date: "Jun 25, 2026", type: "PDF" },
    { id: 2, title: "Farmers Summary Report", date: "Jun 20, 2026", type: "PDF" },
    { id: 3, title: "Disease Outbreak Analysis", date: "Jun 15, 2026", type: "PDF" },
  ]);

  const [knowledgeBase] = useState([
    { id: 1, title: "How to treat Newcastle Disease", category: "Diseases", views: 245 },
    { id: 2, title: "Proper feeding for Broilers", category: "Nutrition", views: 189 },
    { id: 3, title: "Vaccination schedule for Layers", category: "Vaccination", views: 156 },
    { id: 4, title: "Signs of Avian Influenza", category: "Diseases", views: 134 },
  ]);

  const applyTheme = (theme) => {
    if (theme === "Dark") {
      setIsDark(true);
      document.body.style.backgroundColor = "#1a1a2e";
      document.body.style.color = "#ffffff";
    } else if (theme === "Light") {
      setIsDark(false);
      document.body.style.backgroundColor = "#f5f7f5";
      document.body.style.color = "#071407";
    } else if (theme === "System Default") {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(isSystemDark);
      document.body.style.backgroundColor = isSystemDark ? "#1a1a2e" : "#f5f7f5";
      document.body.style.color = isSystemDark ? "#ffffff" : "#071407";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    console.log("Token:", token);
    console.log("Stored User:", storedUser);
    
    if (!token || !storedUser) {
      if (typeof setScreen === "function") {
        console.log("Redirecting to signin");
        setScreen("signin");
      } else {
        console.log("setScreen is NOT a function");
      }
      setLoading(false);
      return;
    }
    
    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [setScreen]);

  useEffect(() => {
    const savedSettings = localStorage.getItem("vetSettings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applyTheme(parsed.theme);
    }
  }, []);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#f5f7f5",
        fontFamily: "Inter, sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🐔</div>
          <p style={{ fontSize: "18px", color: "#295F2D", fontWeight: 600 }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Remove the error check temporarily to see what's happening
  // if (typeof setScreen !== "function") {
  //   return (
  //     <div style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       minHeight: "100vh",
  //       fontFamily: "Inter, sans-serif",
  //       background: "#f5f7f5",
  //       padding: "20px",
  //     }}>
  //       <div style={{
  //         background: "white",
  //         borderRadius: "16px",
  //         padding: "40px",
  //         textAlign: "center",
  //         maxWidth: "400px",
  //         boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  //       }}>
  //         <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
  //         <h2 style={{ color: "#DC2626", margin: "0 0 8px" }}>Error</h2>
  //         <p style={{ color: "#666", margin: "0 0 20px" }}>setScreen is not available. Please go back to home.</p>
  //         <button
  //           onClick={() => window.location.reload()}
  //           style={{
  //             padding: "10px 24px",
  //             borderRadius: "8px",
  //             background: "#295F2D",
  //             color: "white",
  //             border: "none",
  //             fontSize: "14px",
  //             fontWeight: 600,
  //             cursor: "pointer",
  //           }}
  //         >
  //           Refresh
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  const translations = {
    English: {
      welcome: "Welcome back", dashboard: "Dashboard", consultations: "Consultations",
      activeChats: "Active Chats", cases: "Cases", farmers: "Farmers",
      reminders: "Reminders", reports: "Reports", knowledgeBase: "Knowledge Base",
      settings: "Settings", vetDashboard: "Vet Dashboard",
      totalConsultations: "Total Consultations", pendingCases: "Pending Cases",
      resolved: "Resolved", consultationQueue: "Consultation Queue",
      viewAll: "View All", priority: "Priority", farmer: "Farmer",
      issue: "Issue", birdType: "Bird Type", time: "Time", status: "Status",
      actions: "Actions", view: "View", online: "Online", logout: "Logout",
      allConsultations: "All Consultations", allCases: "All Cases",
      allFarmers: "All Farmers", name: "Name", location: "Location",
      phone: "Phone", birds: "Birds", download: "Download", read: "Read",
      views: "views", category: "Category", noMessages: "No messages yet",
      replyToFarmer: "Reply to farmer...", send: "Send", closeCase: "Close Case",
      caseDetails: "Case Details", new: "New", inProgress: "In Progress",
      notifications: "Notifications", sound: "Sound", emailAlerts: "Email Alerts",
      autoSave: "Auto Save", twoFactorAuth: "Two-Factor Auth",
      language: "Language", theme: "Theme", profileVisibility: "Profile Visibility",
      timezone: "Timezone", dateFormat: "Date Format", resetToDefault: "Reset to Default",
      receivePushNotifications: "Receive push notifications",
      enableSound: "Enable sound for new messages",
      receiveEmailUpdates: "Receive case updates via email",
      autoSaveNotes: "Automatically save case notes",
      extraSecurity: "Extra security layer",
      selectLanguage: "Select your preferred language",
      chooseTheme: "Choose your theme preference",
      whoCanSeeProfile: "Who can see your profile",
      yourLocalTimezone: "Your local timezone",
      preferredDateFormat: "Preferred date format",
      public: "Public", private: "Private", vetsOnly: "Vets Only",
      systemDefault: "System Default", dark: "Dark", light: "Light",
      hereAreYourConsultations: "Here are your consultations and cases",
      viewAllLowerCase: "View all",
    },
    French: {
      welcome: "Bon retour", dashboard: "Tableau de bord",
      consultations: "Consultations", activeChats: "Chats actifs",
      cases: "Cas", farmers: "Agriculteurs", reminders: "Rappels",
      reports: "Rapports", knowledgeBase: "Base de connaissances",
      settings: "Paramètres", vetDashboard: "Tableau de bord vétérinaire",
      totalConsultations: "Total des consultations",
      pendingCases: "Cas en attente", resolved: "Résolus",
      consultationQueue: "File d'attente des consultations",
      viewAll: "Voir tout", priority: "Priorité", farmer: "Agriculteur",
      issue: "Problème", birdType: "Type d'oiseau", time: "Heure",
      status: "Statut", actions: "Actions", view: "Voir",
      online: "En ligne", logout: "Déconnexion",
      allConsultations: "Toutes les consultations", allCases: "Tous les cas",
      allFarmers: "Tous les agriculteurs", name: "Nom", location: "Emplacement",
      phone: "Téléphone", birds: "Oiseaux", download: "Télécharger",
      read: "Lire", views: "vues", category: "Catégorie",
      noMessages: "Aucun message", replyToFarmer: "Répondre à l'agriculteur...",
      send: "Envoyer", closeCase: "Fermer le cas", caseDetails: "Détails du cas",
      new: "Nouveau", inProgress: "En cours", notifications: "Notifications",
      sound: "Son", emailAlerts: "Alertes email", autoSave: "Sauvegarde auto",
      twoFactorAuth: "Authentification à deux facteurs", language: "Langue",
      theme: "Thème", profileVisibility: "Visibilité du profil",
      timezone: "Fuseau horaire", dateFormat: "Format de date",
      resetToDefault: "Réinitialiser",
      receivePushNotifications: "Recevoir des notifications push",
      enableSound: "Activer le son pour les nouveaux messages",
      receiveEmailUpdates: "Recevoir les mises à jour des cas par email",
      autoSaveNotes: "Sauvegarder automatiquement les notes",
      extraSecurity: "Couche de sécurité supplémentaire",
      selectLanguage: "Choisissez votre langue préférée",
      chooseTheme: "Choisissez votre thème préféré",
      whoCanSeeProfile: "Qui peut voir votre profil",
      yourLocalTimezone: "Votre fuseau horaire local",
      preferredDateFormat: "Format de date préféré",
      public: "Public", private: "Privé", vetsOnly: "Vétérinaires uniquement",
      systemDefault: "Système par défaut", dark: "Sombre", light: "Clair",
      hereAreYourConsultations: "Voici vos consultations et cas",
      viewAllLowerCase: "Voir tout",
    },
    Swahili: {
      welcome: "Karibu tena", dashboard: "Dashibodi",
      consultations: "Mashauriano", activeChats: "Mazungumzo hai",
      cases: "Kesi", farmers: "Wakulima", reminders: "Vikumbusho",
      reports: "Ripoti", knowledgeBase: "Msingi wa Maarifa",
      settings: "Mipangilio", vetDashboard: "Dashibodi ya Daktari",
      totalConsultations: "Jumla ya Mashauriano",
      pendingCases: "Kesi zinazosubiri", resolved: "Kutatuliwa",
      consultationQueue: "Foleni ya Mashauriano", viewAll: "Tazama Zote",
      priority: "Kipaumbele", farmer: "Mkulima", issue: "Tatizo",
      birdType: "Aina ya Kuku", time: "Muda", status: "Hali",
      actions: "Vitendo", view: "Tazama", online: "Mtandaoni",
      logout: "Toka", allConsultations: "Mashauriano Yote",
      allCases: "Kesi Zote", allFarmers: "Wakulima Wote",
      name: "Jina", location: "Mahali", phone: "Simu",
      birds: "Kuku", download: "Pakua", read: "Soma",
      views: "maraoni", category: "Jamii", noMessages: "Hakuna ujumbe bado",
      replyToFarmer: "Jibu mkulima...", send: "Tuma", closeCase: "Funga Kesi",
      caseDetails: "Maelezo ya Kesi", new: "Mpya", inProgress: "Inaendelea",
      notifications: "Arifa", sound: "Sauti", emailAlerts: "Arifa za Barua Pepe",
      autoSave: "Hifadhi Kiotomatiki", twoFactorAuth: "Uthibitishaji wa Hatua Mbili",
      language: "Lugha", theme: "Mada", profileVisibility: "Monekano wa Profaili",
      timezone: "Saa za Eneo", dateFormat: "Muundo wa Tarehe",
      resetToDefault: "Rudisha Chaguo-msingi",
      receivePushNotifications: "Pokea arifa za push",
      enableSound: "Washa sauti kwa ujumbe mpya",
      receiveEmailUpdates: "Pokea sasisho za kesi kupitia barua pepe",
      autoSaveNotes: "Hifadhi maelezo kiotomatiki",
      extraSecurity: "Usalama wa ziada",
      selectLanguage: "Chagua lugha unayopendelea",
      chooseTheme: "Chagua mada unayopendelea",
      whoCanSeeProfile: "Nani anaweza kuona profaili yako",
      yourLocalTimezone: "Saa za eneo lako",
      preferredDateFormat: "Muundo wa tarehe unayopendelea",
      public: "Wazi", private: "Faragha", vetsOnly: "Madaktari Pekee",
      systemDefault: "Mfumo Msingi", dark: "Giza", light: "Mwangaza",
      hereAreYourConsultations: "Hapa kuna mashauriano na kesi zako",
      viewAllLowerCase: "Tazama zote",
    },
    Yoruba: {
      welcome: "Kaabo pada", dashboard: "Iwe Ifihan",
      consultations: "Awọn ibeere", activeChats: "Awọn ibaraẹnisọrọ ti nṣiṣe",
      cases: "Awọn ọran", farmers: "Awọn agbe", reminders: "Awọn iranti",
      reports: "Awọn ijabọ", knowledgeBase: "Ipile Imọ",
      settings: "Eto", vetDashboard: "Iwe Ifihan Oniwosan",
      totalConsultations: "Lapapọ Awọn ibeere",
      pendingCases: "Awọn ọran ti nduro", resolved: "Ti yanju",
      consultationQueue: "Isẹri Ibeere", viewAll: "Wo Gbogbo",
      priority: "Pato", farmer: "Agbe", issue: "Ọrọ",
      birdType: "Iru Ẹyẹ", time: "Akoko", status: "Ipo",
      actions: "Awọn igbese", view: "Wo", online: "Lori ayelujara",
      logout: "Jade", allConsultations: "Gbogbo Awọn ibeere",
      allCases: "Gbogbo Awọn ọran", allFarmers: "Gbogbo Awọn agbe",
      name: "Orukọ", location: "Ibi", phone: "Foonu",
      birds: "Awọn Ẹyẹ", download: "Gba lati ayelujara",
      read: "Ka", views: "awọn wiwo", category: "Ẹka",
      noMessages: "Ko si ifiranṣẹ sibẹsibẹ",
      replyToFarmer: "Dahun si agbe...", send: "Firanṣẹ",
      closeCase: "Pade Ọran", caseDetails: "Awọn Alaye Ọran",
      new: "Tuntun", inProgress: "Ti nlọ lọwọ",
      notifications: "Awọn ifitonileti", sound: "Ohun",
      emailAlerts: "Awọn itaniji imeeli", autoSave: "Fipamọ Laifọwọyi",
      twoFactorAuth: "Iduroṣinṣin Onipin Meji", language: "Ede",
      theme: "Akori", profileVisibility: "Hihan Profaili",
      timezone: "Agbegbe Aago", dateFormat: "Ọna Kika Ọjọ",
      resetToDefault: "Tunto si Aiyipada",
      receivePushNotifications: "Gba awọn ifitonileti titari",
      enableSound: "Mu ohun ṣiṣẹ fun awọn ifiranṣẹ tuntun",
      receiveEmailUpdates: "Gba awọn imudojuiwọn ọran nipasẹ imeeli",
      autoSaveNotes: "Fipamọ awọn akọsilẹ laifọwọyi",
      extraSecurity: "Aabo afikun",
      selectLanguage: "Yan ede ti o fẹran",
      chooseTheme: "Yan akori ti o fẹran",
      whoCanSeeProfile: "Tani o le rii profaili rẹ",
      yourLocalTimezone: "Agbegbe aago agbegbe rẹ",
      preferredDateFormat: "Ọna kika ọjọ ti o fẹran",
      public: "Gbangba", private: "Ikọkọ", vetsOnly: "Awọn Oniwosan Nikan",
      systemDefault: "Aiyipada Eto", dark: "Okunkun", light: "Imọlẹ",
      hereAreYourConsultations: "Eyi ni awọn ibeere ati awọn ọran rẹ",
      viewAllLowerCase: "Wo gbogbo",
    },
    Hausa: {
      welcome: "Barka da dawowa", dashboard: "Dashboard",
      consultations: "Shawarwari", activeChats: "Hira masu aiki",
      cases: "Kararraki", farmers: "Manoma", reminders: "Tunatarwa",
      reports: "Rahotanni", knowledgeBase: "Tushen Ilimi",
      settings: "Saituna", vetDashboard: "Dashboard na Likitan Dabbobi",
      totalConsultations: "Jimlar Shawarwari",
      pendingCases: "Kararraki masu jira", resolved: "An warware",
      consultationQueue: "Layin Shawarwari", viewAll: "Duba Duka",
      priority: "Mahimmanci", farmer: "Manomi", issue: "Matsala",
      birdType: "Nau'in Tsuntsu", time: "Lokaci", status: "Matsayi",
      actions: "Ayyuka", view: "Duba", online: "Kan layi",
      logout: "Fita", allConsultations: "Duk Shawarwari",
      allCases: "Duk Kararraki", allFarmers: "Duk Manoma",
      name: "Suna", location: "Wuri", phone: "Waya",
      birds: "Tsuntsaye", download: "Saukar", read: "Karanta",
      views: "ra'ayoyi", category: "Rukuni",
      noMessages: "Babu saƙo tukuna", replyToFarmer: "Amsa manomi...",
      send: "Aika", closeCase: "Rufe Karar", caseDetails: "Bayanan Karar",
      new: "Sabo", inProgress: "Ana ci gaba",
      notifications: "Sanarwa", sound: "Sauti",
      emailAlerts: "Faɗakarwar Imel", autoSave: "Ajiye Ta atomatik",
      twoFactorAuth: "Tabbatar da Mataki Biyu", language: "Harshe",
      theme: "Jigo", profileVisibility: "Ganewar Bayanin",
      timezone: "Yankin Lokaci", dateFormat: "Tsarin Kwanan Wata",
      resetToDefault: "Sake saita zuwa Asali",
      receivePushNotifications: "Karɓi sanarwar turawa",
      enableSound: "Kunna sauti don sabbin saƙonni",
      receiveEmailUpdates: "Karɓi sabunta kararraki ta imel",
      autoSaveNotes: "Ajiye bayanan kula ta atomatik",
      extraSecurity: "Ƙarin tsaro",
      selectLanguage: "Zaɓi harshen da kuka fi so",
      chooseTheme: "Zaɓi jigon da kuka fi so",
      whoCanSeeProfile: "Wanene zai iya ganin bayanin ku",
      yourLocalTimezone: "Yankin lokacin ku",
      preferredDateFormat: "Tsarin kwanan wata da kuka fi so",
      public: "Jama'a", private: "Keɓaɓɓe", vetsOnly: "Likitocin Dabbobi Kawai",
      systemDefault: "Tsarin Asali", dark: "Duhu", light: "Haske",
      hereAreYourConsultations: "Ga shawarwari da kararrakin ku",
      viewAllLowerCase: "Duba duka",
    },
  };

  const t = translations[settings.language] || translations.English;

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("vetSettings", JSON.stringify(newSettings));
    if (key === "theme") {
      applyTheme(value);
    }
    setSettingsMessage(`${key} updated successfully! ✅`);
    setTimeout(() => setSettingsMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (typeof setScreen === "function") {
      setScreen("splash");
    }
  };

  const caseChats = {
    1: [
      { from: "farmer", text: "My chickens are dying suddenly. What should I do?", time: "10:20 AM" },
      { from: "vet", text: "How many have died so far?", time: "10:22 AM" },
      { from: "farmer", text: "5 chickens since yesterday", time: "10:24 AM" },
    ],
    2: [
      { from: "farmer", text: "My chickens are having trouble breathing", time: "09:50 AM" },
      { from: "vet", text: "Are they coughing too?", time: "09:52 AM" },
      { from: "farmer", text: "Yes, they are coughing a lot", time: "09:54 AM" },
    ],
    3: [
      { from: "farmer", text: "My chickens have diarrhea", time: "09:25 AM" },
    ],
    4: [
      { from: "farmer", text: "My chickens are coughing and sneezing", time: "09:10 AM" },
      { from: "vet", text: "Have you noticed any eye swelling?", time: "09:12 AM" },
      { from: "farmer", text: "Yes, some have swollen eyes", time: "09:14 AM" },
    ],
  };

  const openCase = (caseItem) => {
    setSelectedCase(caseItem);
    setChatMessages(caseChats[caseItem.id] || []);
  };

  const closeCase = () => {
    setSelectedCase(null);
    setChatMessages([]);
    setChatInput("");
  };

  const updateStatus = (newStatus) => {
    setSettingsMessage(`Case status updated to ${newStatus} ✅`);
    setTimeout(() => setSettingsMessage(""), 3000);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const newMessage = {
      from: "vet",
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput("");
  };

  const vetName = user?.name || "Dr. Musa";
  const vetInitials = vetName.split(" ").map(n => n[0]).join("");

  const sidebarItems = [
    { icon: "📊", label: t.dashboard },
    { icon: "💬", label: t.consultations },
    { icon: "💭", label: t.activeChats },
    { icon: "📋", label: t.cases },
    { icon: "👨‍🌾", label: t.farmers },
    { icon: "🔔", label: t.reminders },
    { icon: "📈", label: t.reports },
    { icon: "📚", label: t.knowledgeBase },
    { icon: "⚙️", label: t.settings },
  ];

  const ToggleSwitch = ({ checked, onChange }) => (
    <label style={{ position: "relative", display: "inline-block", width: "48px", height: "24px", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: checked ? "#295F2D" : "#ccc",
        borderRadius: "24px",
        transition: "0.3s",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
      }}>
        <span style={{
          position: "absolute",
          height: "18px",
          width: "18px",
          left: checked ? "26px" : "3px",
          bottom: "3px",
          background: "white",
          borderRadius: "50%",
          transition: "0.3s",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}></span>
      </span>
    </label>
  );

  const themeStyles = {
    background: isDark ? "#1a1a2e" : "#f5f7f5",
    cardBg: isDark ? "#16213e" : "white",
    cardBorder: isDark ? "#2a3a5e" : "#e8ece8",
    textColor: isDark ? "#ffffff" : "#071407",
    textSecondary: isDark ? "#a0aec0" : "#888",
    sidebarBg: isDark ? "#0f3460" : "#ffffff",
    sidebarBorder: isDark ? "#2a3a5e" : "#e8ece8",
    inputBg: isDark ? "#1a1a2e" : "white",
    hoverBg: isDark ? "#2a3a5e" : "#f0f7f0",
  };

  const renderContent = () => {
    switch(activeTab) {
      case t.dashboard:
        return (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              marginBottom: "30px",
            }}>
              <div style={{ background: themeStyles.cardBg, borderRadius: "12px", padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: `1px solid ${themeStyles.cardBorder}` }}>
                <p style={{ color: themeStyles.textSecondary, fontSize: "12px", margin: 0 }}>{t.totalConsultations}</p>
                <p style={{ fontSize: "28px", fontWeight: 700, color: "#295F2D", margin: "4px 0 0" }}>{consultations.length}</p>
              </div>
              <div style={{ background: themeStyles.cardBg, borderRadius: "12px", padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: `1px solid ${themeStyles.cardBorder}` }}>
                <p style={{ color: themeStyles.textSecondary, fontSize: "12px", margin: 0 }}>{t.activeChats}</p>
                <p style={{ fontSize: "28px", fontWeight: 700, color: "#08F071", margin: "4px 0 0" }}>{activeChats.length}</p>
              </div>
              <div style={{ background: themeStyles.cardBg, borderRadius: "12px", padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: `1px solid ${themeStyles.cardBorder}` }}>
                <p style={{ color: themeStyles.textSecondary, fontSize: "12px", margin: 0 }}>{t.pendingCases}</p>
                <p style={{ fontSize: "28px", fontWeight: 700, color: "#FF9800", margin: "4px 0 0" }}>
                  {consultations.filter(c => c.status === "New").length}
                </p>
              </div>
              <div style={{ background: themeStyles.cardBg, borderRadius: "12px", padding: "18px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: `1px solid ${themeStyles.cardBorder}` }}>
                <p style={{ color: themeStyles.textSecondary, fontSize: "12px", margin: 0 }}>{t.farmers}</p>
                <p style={{ fontSize: "28px", fontWeight: 700, color: "#295F2D", margin: "4px 0 0" }}>{farmers.length}</p>
              </div>
            </div>

            <div style={{
              background: themeStyles.cardBg,
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: `1px solid ${themeStyles.cardBorder}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: themeStyles.textColor, margin: 0 }}>{t.consultationQueue}</h3>
                <button 
                  onClick={() => setActiveTab(t.consultations)}
                  style={{ padding: "8px 20px", borderRadius: "8px", background: "#295F2D", color: "white", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  {t.viewAll}
                </button>
              </div>

              <div style={{ overflowX: "auto" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "0.7fr 1.3fr 1.6fr 0.8fr 0.7fr 0.8fr 0.7fr",
                  padding: "12px 0",
                  borderBottom: `2px solid ${themeStyles.cardBorder}`,
                  fontSize: "11px",
                  fontWeight: 700,
                  color: themeStyles.textSecondary,
                  textTransform: "uppercase",
                }}>
                  <span>{t.priority}</span>
                  <span>{t.farmer}</span>
                  <span>{t.issue}</span>
                  <span>{t.birdType}</span>
                  <span>{t.time}</span>
                  <span>{t.status}</span>
                  <span>{t.actions}</span>
                </div>

                {consultations.slice(0, 3).map((row, i) => (
                  <div key={i} style={{
                    display: "grid",
                    gridTemplateColumns: "0.7fr 1.3fr 1.6fr 0.8fr 0.7fr 0.8fr 0.7fr",
                    padding: "14px 0",
                    borderBottom: i < 2 ? `1px solid ${themeStyles.cardBorder}` : "none",
                    alignItems: "center",
                    fontSize: "13px",
                    color: themeStyles.textColor,
                  }}>
                    <span style={{ color: row.priority === "High" ? "#F43F3F" : "#FF9800", fontWeight: 700, fontSize: "12px" }}>
                      {row.priority}
                    </span>
                    <div>
                      <p style={{ fontWeight: 600, margin: 0, fontSize: "14px", color: themeStyles.textColor }}>{row.farmer}</p>
                      <p style={{ fontSize: "11px", color: themeStyles.textSecondary, margin: 0 }}>{row.location}</p>
                    </div>
                    <span style={{ fontSize: "13px" }}>{row.issue}</span>
                    <span style={{ fontSize: "13px" }}>{row.birdType}</span>
                    <span style={{ fontSize: "13px" }}>{row.time}</span>
                    <span style={{
                      background: row.statusBg,
                      color: row.statusColor,
                      padding: "4px 14px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 600,
                      width: "fit-content",
                    }}>
                      {row.status === "New" ? t.new : t.inProgress}
                    </span>
                    <button
                      onClick={() => openCase(row)}
                      style={{
                        padding: "6px 16px",
                        borderRadius: "6px",
                        background: "#295F2D",
                        color: "white",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        width: "fit-content",
                      }}
                    >
                      {t.view}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case t.consultations:
        return (
          <div style={{
            background: themeStyles.cardBg,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: `1px solid ${themeStyles.cardBorder}`,
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: themeStyles.textColor, margin: "0 0 20px" }}>{t.allConsultations}</h3>
            <div style={{ overflowX: "auto" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "0.7fr 1.3fr 1.6fr 0.8fr 0.7fr 0.8fr 0.7fr",
                padding: "12px 0",
                borderBottom: `2px solid ${themeStyles.cardBorder}`,
                fontSize: "11px",
                fontWeight: 700,
                color: themeStyles.textSecondary,
                textTransform: "uppercase",
              }}>
                <span>{t.priority}</span>
                <span>{t.farmer}</span>
                <span>{t.issue}</span>
                <span>{t.birdType}</span>
                <span>{t.time}</span>
                <span>{t.status}</span>
                <span>{t.actions}</span>
              </div>

              {consultations.map((row, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "0.7fr 1.3fr 1.6fr 0.8fr 0.7fr 0.8fr 0.7fr",
                  padding: "14px 0",
                  borderBottom: i < consultations.length - 1 ? `1px solid ${themeStyles.cardBorder}` : "none",
                  alignItems: "center",
                  fontSize: "13px",
                  color: themeStyles.textColor,
                }}>
                  <span style={{ color: row.priority === "High" ? "#F43F3F" : "#FF9800", fontWeight: 700, fontSize: "12px" }}>
                    {row.priority}
                  </span>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0, fontSize: "14px", color: themeStyles.textColor }}>{row.farmer}</p>
                    <p style={{ fontSize: "11px", color: themeStyles.textSecondary, margin: 0 }}>{row.location}</p>
                  </div>
                  <span>{row.issue}</span>
                  <span>{row.birdType}</span>
                  <span>{row.time}</span>
                  <span style={{
                    background: row.statusBg,
                    color: row.statusColor,
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: 600,
                    width: "fit-content",
                  }}>
                    {row.status === "New" ? t.new : t.inProgress}
                  </span>
                  <button
                    onClick={() => openCase(row)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "6px",
                      background: "#295F2D",
                      color: "white",
                      border: "none",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      width: "fit-content",
                    }}
                  >
                    {t.view}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case t.activeChats:
        return (
          <div style={{
            background: themeStyles.cardBg,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: `1px solid ${themeStyles.cardBorder}`,
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: themeStyles.textColor, margin: "0 0 20px" }}>💭 {t.activeChats}</h3>
            {activeChats.map((chat, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderBottom: i < activeChats.length - 1 ? `1px solid ${themeStyles.cardBorder}` : "none",
                cursor: "pointer",
                borderRadius: "12px",
                transition: "background 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#295F2D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}>{chat.farmer.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0, fontSize: "14px", color: themeStyles.textColor }}>{chat.farmer}</p>
                    <p style={{ fontSize: "13px", color: themeStyles.textSecondary, margin: 0 }}>{chat.lastMessage}</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "11px", color: themeStyles.textSecondary, margin: 0 }}>{chat.time}</p>
                  {chat.unread > 0 && (
                    <span style={{
                      background: "#F43F3F",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "12px",
                    }}>{chat.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case t.cases:
        return (
          <div style={{
            background: themeStyles.cardBg,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: `1px solid ${themeStyles.cardBorder}`,
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: themeStyles.textColor, margin: "0 0 20px" }}>📋 {t.allCases}</h3>
            <div style={{ display: "grid", gap: "12px" }}>
              {consultations.map((row, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  background: isDark ? "#1a1a2e" : "#f5f7f5",
                  borderRadius: "12px",
                  borderLeft: `4px solid ${row.priority === "High" ? "#F43F3F" : "#FF9800"}`,
                }}>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0, fontSize: "14px", color: themeStyles.textColor }}>{row.farmer}</p>
                    <p style={{ fontSize: "13px", color: themeStyles.textSecondary, margin: "4px 0 0" }}>{row.issue}</p>
                    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                      <span style={{ fontSize: "11px", color: themeStyles.textSecondary }}>{row.birdType}</span>
                      <span style={{ fontSize: "11px", color: themeStyles.textSecondary }}>•</span>
                      <span style={{ fontSize: "11px", color: themeStyles.textSecondary }}>{row.time}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{
                      background: row.statusBg,
                      color: row.statusColor,
                      padding: "4px 14px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 600,
                      display: "inline-block",
                    }}>
                      {row.status === "New" ? t.new : t.inProgress}
                    </span>
                    <br />
                    <button
                      onClick={() => openCase(row)}
                      style={{
                        padding: "6px 16px",
                        borderRadius: "6px",
                        background: "#295F2D",
                        color: "white",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        marginTop: "4px",
                      }}
                    >
                      {t.view}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case t.farmers:
        return (
          <div style={{
            background: themeStyles.cardBg,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: `1px solid ${themeStyles.cardBorder}`,
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: themeStyles.textColor, margin: "0 0 20px" }}>👨‍🌾 {t.allFarmers}</h3>
            <div style={{ overflowX: "auto" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                padding: "12px 0",
                borderBottom: `2px solid ${themeStyles.cardBorder}`,
                fontSize: "11px",
                fontWeight: 700,
                color: themeStyles.textSecondary,
                textTransform: "uppercase",
              }}>
                <span>{t.name}</span>
                <span>{t.location}</span>
                <span>{t.phone}</span>
                <span>{t.birds}</span>
              </div>
              {farmers.map((farmer, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  padding: "14px 0",
                  borderBottom: i < farmers.length - 1 ? `1px solid ${themeStyles.cardBorder}` : "none",
                  fontSize: "14px",
                  alignItems: "center",
                  color: themeStyles.textColor,
                }}>
                  <span style={{ fontWeight: 500 }}>{farmer.name}</span>
                  <span>{farmer.location}</span>
                  <span>{farmer.phone}</span>
                  <span>{farmer.birds}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case t.reminders:
        return (
          <div style={{
            background: themeStyles.cardBg,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: `1px solid ${themeStyles.cardBorder}`,
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: themeStyles.textColor, margin: "0 0 20px" }}>🔔 {t.reminders}</h3>
            {reminders.map((reminder, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderBottom: i < reminders.length - 1 ? `1px solid ${themeStyles.cardBorder}` : "none",
              }}>
                <div>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: "14px", color: themeStyles.textColor }}>{reminder.title}</p>
                  <p style={{ fontSize: "13px", color: themeStyles.textSecondary, margin: "4px 0 0" }}>📅 {reminder.date}</p>
                </div>
                <span style={{
                  padding: "4px 14px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: reminder.priority === "High" ? "#FEE2E2" : reminder.priority === "Medium" ? "#FFF3E0" : "#E8F5E9",
                  color: reminder.priority === "High" ? "#DC2626" : reminder.priority === "Medium" ? "#FF9800" : "#4CAF50",
                }}>
                  {reminder.priority}
                </span>
              </div>
            ))}
          </div>
        );

      case t.reports:
        return (
          <div style={{
            background: themeStyles.cardBg,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: `1px solid ${themeStyles.cardBorder}`,
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: themeStyles.textColor, margin: "0 0 20px" }}>📈 {t.reports}</h3>
            {reports.map((report, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderBottom: i < reports.length - 1 ? `1px solid ${themeStyles.cardBorder}` : "none",
              }}>
                <div>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: "14px", color: themeStyles.textColor }}>{report.title}</p>
                  <p style={{ fontSize: "13px", color: themeStyles.textSecondary, margin: "4px 0 0" }}>📅 {report.date}</p>
                </div>
                <button style={{
                  padding: "6px 16px",
                  borderRadius: "6px",
                  background: "#295F2D",
                  color: "white",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}>
                  📥 {t.download}
                </button>
              </div>
            ))}
          </div>
        );

      case t.knowledgeBase:
        return (
          <div style={{
            background: themeStyles.cardBg,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: `1px solid ${themeStyles.cardBorder}`,
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: themeStyles.textColor, margin: "0 0 20px" }}>📚 {t.knowledgeBase}</h3>
            {knowledgeBase.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderBottom: i < knowledgeBase.length - 1 ? `1px solid ${themeStyles.cardBorder}` : "none",
              }}>
                <div>
                  <p style={{ fontWeight: 600, margin: 0, fontSize: "14px", color: themeStyles.textColor }}>{item.title}</p>
                  <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                    <span style={{ fontSize: "12px", color: themeStyles.textSecondary }}>📂 {item.category}</span>
                    <span style={{ fontSize: "12px", color: themeStyles.textSecondary }}>•</span>
                    <span style={{ fontSize: "12px", color: themeStyles.textSecondary }}>👁️ {item.views} {t.views}</span>
                  </div>
                </div>
                <button style={{
                  padding: "6px 16px",
                  borderRadius: "6px",
                  background: "#295F2D",
                  color: "white",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}>
                  {t.read}
                </button>
              </div>
            ))}
          </div>
        );

      case t.settings:
        return (
          <div style={{
            background: themeStyles.cardBg,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: `1px solid ${themeStyles.cardBorder}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: themeStyles.textColor, margin: 0 }}>⚙️ {t.settings}</h3>
              {settingsMessage && (
                <span style={{
                  background: "#E8F5E9",
                  color: "#4CAF50",
                  padding: "6px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                }}>{settingsMessage}</span>
              )}
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>🔔 {t.notifications}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.receivePushNotifications}</p>
                </div>
                <ToggleSwitch
                  checked={settings.notifications}
                  onChange={() => handleSettingChange("notifications", !settings.notifications)}
                />
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>🔊 {t.sound}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.enableSound}</p>
                </div>
                <ToggleSwitch
                  checked={settings.soundEnabled}
                  onChange={() => handleSettingChange("soundEnabled", !settings.soundEnabled)}
                />
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>📧 {t.emailAlerts}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.receiveEmailUpdates}</p>
                </div>
                <ToggleSwitch
                  checked={settings.emailAlerts}
                  onChange={() => handleSettingChange("emailAlerts", !settings.emailAlerts)}
                />
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>💾 {t.autoSave}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.autoSaveNotes}</p>
                </div>
                <ToggleSwitch
                  checked={settings.autoSave}
                  onChange={() => handleSettingChange("autoSave", !settings.autoSave)}
                />
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>🔐 {t.twoFactorAuth}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.extraSecurity}</p>
                </div>
                <ToggleSwitch
                  checked={settings.twoFactorAuth}
                  onChange={() => handleSettingChange("twoFactorAuth", !settings.twoFactorAuth)}
                />
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>🌐 {t.language}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.selectLanguage}</p>
                </div>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange("language", e.target.value)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${themeStyles.cardBorder}`,
                    fontSize: "13px",
                    background: isDark ? "#1a1a2e" : "white",
                    color: themeStyles.textColor,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option>English</option>
                  <option>French</option>
                  <option>Swahili</option>
                  <option>Yoruba</option>
                  <option>Hausa</option>
                </select>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>🎨 {t.theme}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.chooseTheme}</p>
                </div>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange("theme", e.target.value)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${themeStyles.cardBorder}`,
                    fontSize: "13px",
                    background: isDark ? "#1a1a2e" : "white",
                    color: themeStyles.textColor,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option>{t.light}</option>
                  <option>{t.dark}</option>
                  <option>{t.systemDefault}</option>
                </select>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>👁️ {t.profileVisibility}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.whoCanSeeProfile}</p>
                </div>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleSettingChange("profileVisibility", e.target.value)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${themeStyles.cardBorder}`,
                    fontSize: "13px",
                    background: isDark ? "#1a1a2e" : "white",
                    color: themeStyles.textColor,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option>{t.public}</option>
                  <option>{t.private}</option>
                  <option>{t.vetsOnly}</option>
                </select>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>🕐 {t.timezone}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.yourLocalTimezone}</p>
                </div>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange("timezone", e.target.value)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${themeStyles.cardBorder}`,
                    fontSize: "13px",
                    background: isDark ? "#1a1a2e" : "white",
                    color: themeStyles.textColor,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option>UTC-12</option>
                  <option>UTC-6</option>
                  <option>UTC-5</option>
                  <option>UTC+0</option>
                  <option>UTC+1</option>
                  <option>UTC+2</option>
                  <option>UTC+3</option>
                  <option>UTC+5:30</option>
                  <option>UTC+8</option>
                  <option>UTC+10</option>
                </select>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: isDark ? "#1a1a2e" : "#f8faf8",
                borderRadius: "12px",
                border: `1px solid ${themeStyles.cardBorder}`,
              }}>
                <div>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: themeStyles.textColor }}>📅 {t.dateFormat}</span>
                  <p style={{ fontSize: "12px", color: themeStyles.textSecondary, margin: "2px 0 0" }}>{t.preferredDateFormat}</p>
                </div>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => handleSettingChange("dateFormat", e.target.value)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: `1px solid ${themeStyles.cardBorder}`,
                    fontSize: "13px",
                    background: isDark ? "#1a1a2e" : "white",
                    color: themeStyles.textColor,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "12px",
              }}>
                <button
                  onClick={() => {
                    const defaultSettings = {
                      notifications: true,
                      language: "English",
                      theme: "Light",
                      emailAlerts: true,
                      soundEnabled: true,
                      autoSave: false,
                      twoFactorAuth: false,
                      profileVisibility: "Public",
                      timezone: "UTC+1",
                      dateFormat: "DD/MM/YYYY",
                    };
                    setSettings(defaultSettings);
                    localStorage.setItem("vetSettings", JSON.stringify(defaultSettings));
                    applyTheme("Light");
                    setSettingsMessage("All settings reset to default! ✅");
                    setTimeout(() => setSettingsMessage(""), 3000);
                  }}
                  style={{
                    padding: "12px 32px",
                    borderRadius: "10px",
                    background: "#FEE2E2",
                    color: "#DC2626",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  🔄 {t.resetToDefault}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      display: "flex",
      fontFamily: "Inter, sans-serif",
      background: isDark ? "#1a1a2e" : "#f5f7f5",
      minHeight: "100vh",
      color: isDark ? "#ffffff" : "#071407",
    }}>
      <div style={{
        width: "240px",
        background: isDark ? "#0f3460" : "#ffffff",
        padding: "30px 0",
        minHeight: "100vh",
        boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
        borderRight: `1px solid ${isDark ? "#2a3a5e" : "#e8ece8"}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ padding: "0 24px", marginBottom: "32px" }}>
            <h2 style={{
              color: isDark ? "#A6C78E" : "#295F2D",
              fontSize: "22px",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "1px",
            }}>🌿 AGRICARE</h2>
            <p style={{ color: isDark ? "#a0aec0" : "#888", fontSize: "11px", margin: "4px 0 0" }}>{t.vetDashboard}</p>
          </div>

          {sidebarItems.map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveTab(item.label)}
              style={{
                padding: "12px 24px",
                backgroundColor: activeTab === item.label ? (isDark ? "#2a3a5e" : "#f0f7f0") : "transparent",
                borderRight: activeTab === item.label ? "4px solid #295F2D" : "none",
                color: activeTab === item.label ? (isDark ? "#A6C78E" : "#295F2D") : (isDark ? "#a0aec0" : "#666"),
                fontWeight: activeTab === item.label ? 600 : 400,
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.2s",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "0 24px 24px", borderTop: `1px solid ${isDark ? "#2a3a5e" : "#e8ece8"}`, paddingTop: "20px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
            padding: "8px 12px",
            borderRadius: "10px",
            background: isDark ? "#1a1a2e" : "#f5f7f5",
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #295F2D, #A6C78E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "16px",
            }}>{vetInitials}</div>
            <div>
              <p style={{ fontWeight: 600, margin: 0, fontSize: "14px", color: isDark ? "#ffffff" : "#071407" }}>{vetName}</p>
              <p style={{ fontSize: "11px", color: "#08F071", margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#08F071" }}></span>
                {t.online}
              </p>
            </div>
          </div>
          <div onClick={handleLogout} style={{
            padding: "12px 16px",
            borderRadius: "10px",
            backgroundColor: "#FEE2E2",
            color: "#DC2626",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <span>🚪</span>
            <span>{t.logout}</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "30px 40px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: isDark ? "#ffffff" : "#071407", margin: 0 }}>
              {activeTab === t.dashboard ? `${t.welcome}, ${vetName} 👋` : activeTab}
            </h1>
            <p style={{ color: isDark ? "#a0aec0" : "#888", fontSize: "14px", margin: "4px 0 0" }}>
              {activeTab === t.dashboard ? t.hereAreYourConsultations : `${t.viewAllLowerCase} ${activeTab.toLowerCase()}`}
            </p>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: isDark ? "#1a1a2e" : "white",
            padding: "8px 20px 8px 16px",
            borderRadius: "50px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            border: `1px solid ${isDark ? "#2a3a5e" : "#e8ece8"}`,
          }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #295F2D, #A6C78E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "18px",
            }}>{vetInitials}</div>
            <div>
              <p style={{ fontWeight: 700, margin: 0, fontSize: "14px", color: isDark ? "#ffffff" : "#071407" }}>{vetName}</p>
              <p style={{ fontSize: "12px", color: "#08F071", margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#08F071" }}></span>
                {t.online}
              </p>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>

      {selectedCase && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px",
        }}>
          <div style={{
            background: isDark ? "#1a1a2e" : "white",
            borderRadius: "24px",
            maxWidth: "700px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "32px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
            color: isDark ? "#ffffff" : "#071407",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "20px", color: isDark ? "#ffffff" : "#071407" }}>📋 {t.caseDetails}</h2>
                <p style={{ color: isDark ? "#a0aec0" : "#888", fontSize: "13px", margin: "4px 0 0" }}>
                  {selectedCase.farmer} • {selectedCase.location}
                </p>
              </div>
              <button onClick={closeCase} style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: isDark ? "#a0aec0" : "#888",
              }}>✕</button>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "20px",
              padding: "16px",
              background: isDark ? "#16213e" : "#f5f7f5",
              borderRadius: "12px",
            }}>
              <div style={{ color: isDark ? "#ffffff" : "#071407" }}><strong>{t.issue}:</strong> {selectedCase.issue}</div>
              <div style={{ color: isDark ? "#ffffff" : "#071407" }}><strong>{t.birdType}:</strong> {selectedCase.birdType}</div>
              <div style={{ color: isDark ? "#ffffff" : "#071407" }}><strong>{t.time}:</strong> {selectedCase.time}</div>
              <div style={{ color: isDark ? "#ffffff" : "#071407" }}><strong>{t.priority}:</strong> <span style={{ color: selectedCase.priority === "High" ? "#F43F3F" : "#FF9800" }}>{selectedCase.priority}</span></div>
            </div>

            <p style={{ marginBottom: "16px", color: isDark ? "#a0aec0" : "#555", fontSize: "14px" }}>
              {selectedCase.description}
            </p>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <button
                onClick={() => updateStatus("New")}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: selectedCase.status === "New" ? "2px solid #FF9800" : `1px solid ${isDark ? "#2a3a5e" : "#ddd"}`,
                  background: selectedCase.status === "New" ? "#FFF3E0" : "transparent",
                  color: selectedCase.status === "New" ? "#FF9800" : (isDark ? "#a0aec0" : "#666"),
                  fontWeight: selectedCase.status === "New" ? 600 : 400,
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                🟡 {t.new}
              </button>
              <button
                onClick={() => updateStatus("In Progress")}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: selectedCase.status === "In Progress" ? "2px solid #2196F3" : `1px solid ${isDark ? "#2a3a5e" : "#ddd"}`,
                  background: selectedCase.status === "In Progress" ? "#E3F2FD" : "transparent",
                  color: selectedCase.status === "In Progress" ? "#2196F3" : (isDark ? "#a0aec0" : "#666"),
                  fontWeight: selectedCase.status === "In Progress" ? 600 : 400,
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                🔵 {t.inProgress}
              </button>
              <button
                onClick={() => updateStatus("Resolved")}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: selectedCase.status === "Resolved" ? "2px solid #4CAF50" : `1px solid ${isDark ? "#2a3a5e" : "#ddd"}`,
                  background: selectedCase.status === "Resolved" ? "#E8F5E9" : "transparent",
                  color: selectedCase.status === "Resolved" ? "#4CAF50" : (isDark ? "#a0aec0" : "#666"),
                  fontWeight: selectedCase.status === "Resolved" ? 600 : 400,
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                ✅ {t.resolved}
              </button>
            </div>

            <div style={{ borderTop: `1px solid ${isDark ? "#2a3a5e" : "#e8ece8"}`, paddingTop: "16px" }}>
              <h4 style={{ margin: "0 0 12px", fontSize: "14px", color: isDark ? "#ffffff" : "#071407" }}>💬 {t.activeChats}</h4>
              <div style={{
                background: isDark ? "#16213e" : "#f5f7f5",
                borderRadius: "12px",
                padding: "12px",
                maxHeight: "200px",
                overflowY: "auto",
                marginBottom: "10px",
              }}>
                {chatMessages.length === 0 ? (
                  <p style={{ color: isDark ? "#a0aec0" : "#888", fontSize: "13px", textAlign: "center" }}>{t.noMessages}</p>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div key={i} style={{
                      display: "flex",
                      justifyContent: msg.from === "vet" ? "flex-end" : "flex-start",
                      marginBottom: "8px",
                    }}>
                      <div style={{
                        maxWidth: "80%",
                        padding: "8px 14px",
                        borderRadius: "12px",
                        background: msg.from === "vet" ? "#295F2D" : (isDark ? "#2a3a5e" : "white"),
                        color: msg.from === "vet" ? "white" : (isDark ? "#ffffff" : "#071407"),
                        fontSize: "13px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                      }}>
                        {msg.text}
                        <span style={{
                          fontSize: "9px",
                          display: "block",
                          color: msg.from === "vet" ? "rgba(255,255,255,0.5)" : (isDark ? "#a0aec0" : "#888"),
                          marginTop: "2px",
                        }}>{msg.time || "Just now"}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                  placeholder={t.replyToFarmer}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: "10px",
                    border: `1px solid ${isDark ? "#2a3a5e" : "#ddd"}`,
                    fontSize: "13px",
                    outline: "none",
                    background: isDark ? "#1a1a2e" : "white",
                    color: isDark ? "#ffffff" : "#071407",
                  }}
                />
                <button onClick={sendChatMessage} style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  background: "#295F2D",
                  color: "white",
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "13px",
                }}>
                  {t.send}
                </button>
              </div>
            </div>

            <button onClick={closeCase} style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              background: isDark ? "#2a3a5e" : "#e8ece8",
              color: isDark ? "#ffffff" : "#555",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "16px",
              fontSize: "14px",
            }}>
              {t.closeCase}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VetDashboard;