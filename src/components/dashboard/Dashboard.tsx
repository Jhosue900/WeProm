import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Tag, Plus, Edit2, Trash2, Save, X, Upload, 
  TrendingUp, Loader2, LogOut, Menu, Users, Calendar, 
  Target, Award, ChevronRight, Eye, Briefcase, 
  FileText, Image, Video, Megaphone, BarChart,
  Sparkles, Grid, Settings, Bell, Search,
  Home, BarChart2, Users as UsersIcon, CreditCard,
  Sun, Moon
} from 'lucide-react';

const API_URL = 'https://we-prom-backend.vercel.app';

interface Campaign {
  id: number;
  title: string;
  description: string;
  img: string;
}

interface Project {
  id: number;
  name: string;
  img: string;
}

interface CampaignForm {
  title: string;
  description: string;
  image: File | null;
}

interface ProjectForm {
  name: string;
  image: File | null;
}

interface DashboardProps {
  onLogout?: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [campaignForm, setCampaignForm] = useState<CampaignForm>({ title: '', description: '', image: null });
  const [projectForm, setProjectForm] = useState<ProjectForm>({ name: '', image: null });
  
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    activeProjects: 0,
    totalClients: 0,
    completionRate: 0,
    recentActivity: [] as Array<{id: number, action: string, time: string, type: string}>
  });
  
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/');
      return;
    }
    verifyTokenWithBackend(token);
  }, [navigate]);

  // Verificar tema al cargar
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const verifyTokenWithBackend = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        return;
      }
      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error verificando token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    loadCampaigns();
    loadProjects();
  }, []);

  useEffect(() => {
    if (campaigns.length > 0 || projects.length > 0) {
      loadDashboardStats();
    }
  }, [campaigns, projects]);

  // Toggle tema oscuro/claro
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = async () => {
    try {
      const token = getToken();
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
      if (onLogout) {
        onLogout();
      }
    }
  };

  const loadCampaigns = async () => {
    try {
      const response = await fetch(`${API_URL}/campaigns`);
      const result = await response.json();
      if (result.success) {
        setCampaigns(result.data);
      }
    } catch (error) {
      console.error('Error cargando campañas:', error);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const result = await response.json();
      if (result.success) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error('Error cargando proyectos:', error);
    }
  };

  const loadDashboardStats = async () => {
    setIsLoadingStats(true);
    try {
      setTimeout(() => {
        setStats({
          activeCampaigns: campaigns.length,
          activeProjects: projects.length,
          totalClients: 15,
          completionRate: 92,
          recentActivity: [
            { id: 1, action: 'Nueva campaña de marketing creada', time: 'Hace 2 horas', type: 'campaign' },
            { id: 2, action: 'Proyecto gráfico completado', time: 'Hace 5 horas', type: 'project' },
            { id: 3, action: 'Reunión con cliente confirmada', time: 'Ayer', type: 'meeting' },
            { id: 4, action: 'Reporte de campaña generado', time: 'Ayer', type: 'report' },
          ]
        });
        setIsLoadingStats(false);
      }, 1000);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
      setIsLoadingStats(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'campaign' | 'project') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (type === 'campaign') {
        setCampaignForm({ ...campaignForm, image: file });
      } else {
        setProjectForm({ ...projectForm, image: file });
      }
    }
  };

  const handleSaveCampaign = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', campaignForm.title);
      formData.append('description', campaignForm.description);
      if (campaignForm.image) {
        formData.append('image', campaignForm.image);
      }
      const url = editingCampaign ? `${API_URL}/campaigns/${editingCampaign.id}` : `${API_URL}/campaigns`;
      const method = editingCampaign ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        await loadCampaigns();
        resetCampaignForm();
        alert(editingCampaign ? 'Campaña actualizada' : 'Campaña creada');
      } else if (response.status === 401 || response.status === 403) {
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        handleLogout();
      }
    } catch (error) {
      console.error('Error guardando campaña:', error);
      alert('Error al guardar la campaña');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', projectForm.name);
      if (projectForm.image) {
        formData.append('image', projectForm.image);
      }
      const url = editingProject ? `${API_URL}/products/${editingProject.id}` : `${API_URL}/products`;
      const method = editingProject ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        await loadProjects();
        resetProjectForm();
        alert(editingProject ? 'Proyecto actualizado' : 'Proyecto creado');
      } else if (response.status === 401 || response.status === 403) {
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        handleLogout();
      }
    } catch (error) {
      console.error('Error guardando proyecto:', error);
      alert('Error al guardar el proyecto');
    } finally {
      setLoading(false);
    }
  };

  const resetCampaignForm = () => {
    setCampaignForm({ title: '', description: '', image: null });
    setEditingCampaign(null);
    setShowCampaignForm(false);
    setImagePreview(null);
  };

  const resetProjectForm = () => {
    setProjectForm({ name: '', image: null });
    setEditingProject(null);
    setShowProjectForm(false);
    setImagePreview(null);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm({ title: campaign.title, description: campaign.description, image: null });
    setImagePreview(campaign.img);
    setShowCampaignForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({ name: project.name, image: null });
    setImagePreview(project.img);
    setShowProjectForm(true);
  };

  const handleDeleteCampaign = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta campaña?')) return;
    try {
      const response = await fetch(`${API_URL}/campaigns/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const result = await response.json();
      if (result.success) {
        await loadCampaigns();
        alert('Campaña eliminada');
      } else if (response.status === 401 || response.status === 403) {
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        handleLogout();
      }
    } catch (error) {
      console.error('Error eliminando campaña:', error);
      alert('Error al eliminar la campaña');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const result = await response.json();
      if (result.success) {
        await loadProjects();
        alert('Proyecto eliminado');
      } else if (response.status === 401 || response.status === 403) {
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        handleLogout();
      }
    } catch (error) {
      console.error('Error eliminando proyecto:', error);
      alert('Error al eliminar el proyecto');
    }
  };

  const handleMobileMenuItemClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark">
      {/* Header principal */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-weprom-dark/95 backdrop-blur-sm border-b border-weprom-gray-200 dark:border-weprom-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo y branding */}
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-weprom-red to-weprom-yellow rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-extrabold">W</span>
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                  WeProm
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-weprom-red to-weprom-yellow ml-2">
                    Dashboard
                  </span>
                </h1>
                <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400 hidden sm:block">
                  Panel de administración
                </p>
              </div>
            </div>

            {/* Barra superior derecha - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {/* Selector de tema */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-weprom-gray-100 dark:bg-weprom-gray-900 border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-yellow transition-colors"
                aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-weprom-yellow" />
                ) : (
                  <Moon className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
                )}
              </button>

              {/* Usuario */}
              {user && (
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-weprom-gray-100 dark:bg-weprom-gray-900">
                  <div className="w-8 h-8 bg-gradient-to-r from-weprom-red to-weprom-yellow rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {user.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">{user.name}</p>
                    <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">Administrador</p>
                  </div>
                </div>
              )}

              {/* Botón logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>

            {/* Menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-weprom-gray-100 dark:bg-weprom-gray-900 border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-red transition-colors"
            >
              <Menu className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-weprom-dark-gray shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full pt-4 flex flex-col">
          {/* Header mobile menu */}
          <div className="p-6 border-b border-weprom-gray-200 dark:border-weprom-gray-800 bg-gradient-to-r from-weprom-gray-50 to-white dark:from-weprom-dark dark:to-weprom-dark-gray">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-weprom-red to-weprom-yellow rounded-xl flex items-center justify-center">
                  <span className="text-white font-extrabold">W</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">Dashboard</p>
                  <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">Panel Admin</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-white dark:bg-weprom-gray-900 border border-weprom-gray-300 dark:border-weprom-gray-700"
              >
                <X className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
              </button>
            </div>

            {/* Selector de tema en mobile */}
            <div className="mb-6">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-weprom-gray-100 dark:bg-weprom-gray-900 rounded-xl hover:bg-weprom-gray-200 dark:hover:bg-weprom-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-weprom-yellow" />
                  ) : (
                    <Moon className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
                  )}
                  <span className="text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">
                    {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
                  </span>
                </div>
                <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${isDarkMode ? 'bg-weprom-yellow/20' : 'bg-weprom-gray-300'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform ${isDarkMode ? 'translate-x-6' : ''}`}></div>
                </div>
              </button>
            </div>

            {/* Usuario en mobile */}
            {user && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-weprom-gray-100 dark:bg-weprom-gray-900">
                <div className="w-10 h-10 bg-gradient-to-r from-weprom-red to-weprom-yellow rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">{user.name}</p>
                  <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">Administrador</p>
                </div>
              </div>
            )}
          </div>

          {/* Navegación móvil - SOLO las 3 pestañas principales */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {[
                { id: 'overview', label: 'Resumen', icon: Home, color: 'red' },
                { id: 'campaigns', label: 'Campañas', icon: Megaphone, color: 'blue' },
                { id: 'projects', label: 'Proyectos', icon: Briefcase, color: 'green' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileMenuItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 ${activeTab === item.id
                    ? `bg-gradient-to-r from-weprom-${item.color} to-weprom-yellow text-white shadow-lg`
                    : 'text-weprom-gray-700 dark:text-weprom-gray-300 hover:bg-weprom-gray-100 dark:hover:bg-weprom-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Logout mobile */}
            <div className="mt-8">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Tabs de navegación - Desktop - SOLO las 3 pestañas principales */}
        <div className="hidden md:flex gap-3 mb-8 overflow-x-auto pb-4">
          {[
            { id: 'overview', label: 'Resumen', icon: Home },
            { id: 'campaigns', label: 'Campañas', icon: Megaphone },
            { id: 'projects', label: 'Proyectos', icon: Briefcase }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${activeTab === tab.id
                ? 'bg-gradient-to-r from-weprom-red to-weprom-yellow text-white shadow-lg'
                : 'bg-white dark:bg-weprom-dark-gray text-weprom-gray-700 dark:text-weprom-gray-300 hover:bg-weprom-gray-100 dark:hover:bg-weprom-gray-800 shadow'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido según pestaña activa */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Tarjeta de bienvenida */}
              <div className="relative overflow-hidden bg-gradient-to-br from-weprom-red/20 via-weprom-yellow/20 to-weprom-blue/20 dark:from-weprom-red/10 dark:via-weprom-yellow/10 dark:to-weprom-blue/10 rounded-2xl p-6 sm:p-8 border border-weprom-gray-200 dark:border-weprom-gray-800">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rainbow"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-weprom-yellow animate-pulse" />
                        <span className="text-sm font-semibold bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue bg-clip-text text-transparent uppercase tracking-widest">
                          Dashboard
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-3">
                        ¡Hola, {user?.name || 'Administrador'}! 👋
                      </h2>
                      <p className="text-weprom-gray-600 dark:text-weprom-gray-400">
                        Bienvenido al panel de control de WeProm Marketing
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 dark:bg-weprom-dark/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-weprom-gray-200 dark:border-weprom-gray-800">
                      <Calendar className="w-4 h-4 text-weprom-gray-600 dark:text-weprom-gray-400" />
                      <span className="text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">
                        {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </span>
                    </div>
                  </div>

                  {/* Estadísticas rápidas */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="bg-white/50 dark:bg-weprom-dark/50 backdrop-blur-sm rounded-xl p-4 border border-weprom-gray-200 dark:border-weprom-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <Target className="w-5 h-5 text-weprom-red" />
                        <span className="text-xs px-2 py-1 rounded-full bg-weprom-red/10 text-weprom-red">Activas</span>
                      </div>
                      <p className="text-xs text-weprom-gray-600 dark:text-weprom-gray-400">Campañas</p>
                      <p className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mt-1">{stats.activeCampaigns}</p>
                    </div>

                    <div className="bg-white/50 dark:bg-weprom-dark/50 backdrop-blur-sm rounded-xl p-4 border border-weprom-gray-200 dark:border-weprom-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <Briefcase className="w-5 h-5 text-weprom-blue" />
                        <span className="text-xs px-2 py-1 rounded-full bg-weprom-blue/10 text-weprom-blue">Activos</span>
                      </div>
                      <p className="text-xs text-weprom-gray-600 dark:text-weprom-gray-400">Proyectos</p>
                      <p className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mt-1">{stats.activeProjects}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones rápidas */}
              <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 shadow-lg border border-weprom-gray-200 dark:border-weprom-gray-800">
                <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-6">Acciones Rápidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => { setActiveTab('campaigns'); setShowCampaignForm(true); }}
                    className="group p-5 rounded-xl border border-weprom-gray-200 dark:border-weprom-gray-800 hover:border-weprom-red transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-weprom-red to-weprom-yellow flex items-center justify-center">
                        <Megaphone className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-weprom-gray-900 dark:text-weprom-white">Crear Campaña</h4>
                        <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Nueva campaña publicitaria</p>
                      </div>
                    </div>
                    <div className="flex items-center text-weprom-red text-sm">
                      <span>Iniciar</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveTab('projects'); setShowProjectForm(true); }}
                    className="group p-5 rounded-xl border border-weprom-gray-200 dark:border-weprom-gray-800 hover:border-weprom-blue transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-weprom-blue to-weprom-green flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-weprom-gray-900 dark:text-weprom-white">Nuevo Proyecto</h4>
                        <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Proyecto gráfico</p>
                      </div>
                    </div>
                    <div className="flex items-center text-weprom-blue text-sm">
                      <span>Iniciar</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div>
              <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 shadow-lg border border-weprom-gray-200 dark:border-weprom-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="h-0.5 w-6 bg-gradient-to-r from-weprom-red to-weprom-yellow"></div>
                      <span className="text-sm font-semibold text-weprom-red uppercase tracking-widest">
                        Campañas
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                      Gestión de Campañas
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowCampaignForm(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    Nueva Campaña
                  </button>
                </div>

                {showCampaignForm ? (
                  <div className="bg-gradient-to-br from-weprom-gray-50 to-white dark:from-weprom-dark dark:to-weprom-dark-gray rounded-2xl p-6 border-2 border-weprom-red/20">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                        {editingCampaign ? 'Editar Campaña' : 'Nueva Campaña'}
                      </h3>
                      <button onClick={resetCampaignForm} className="text-weprom-gray-400 hover:text-weprom-red transition-colors">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">Título</label>
                        <input
                          type="text"
                          value={campaignForm.title}
                          onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700"
                          placeholder="Nombre de la campaña"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">Descripción</label>
                        <textarea
                          value={campaignForm.description}
                          onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 resize-none"
                          rows={4}
                          placeholder="Descripción de la campaña..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">Imagen</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'campaign')}
                            className="hidden"
                            id="campaign-image"
                          />
                          <label
                            htmlFor="campaign-image"
                            className="flex-1 px-4 py-3.5 border-2 border-dashed border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl cursor-pointer hover:border-weprom-red transition-colors flex items-center justify-center gap-3 bg-white dark:bg-weprom-dark"
                          >
                            <Upload className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
                            <span className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Seleccionar imagen</span>
                          </label>
                        </div>
                        {imagePreview && (
                          <img src={imagePreview} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-xl border border-weprom-gray-200 dark:border-weprom-gray-800" />
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          onClick={handleSaveCampaign}
                          disabled={loading}
                          className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                          {loading ? 'Guardando...' : (editingCampaign ? 'Actualizar' : 'Crear Campaña')}
                        </button>
                        <button
                          onClick={resetCampaignForm}
                          className="px-6 py-3.5 bg-weprom-gray-100 dark:bg-weprom-gray-900 hover:bg-weprom-gray-200 dark:hover:bg-weprom-gray-800 text-weprom-gray-700 dark:text-weprom-gray-300 rounded-xl font-semibold transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-weprom-gray-50 dark:from-weprom-dark-gray dark:to-weprom-dark border border-weprom-gray-200 dark:border-weprom-gray-800">
                        <div className="relative h-56 overflow-hidden">
                          <img src={campaign.img} alt={campaign.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          <div className="absolute top-4 right-4">
                            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-weprom-red to-weprom-yellow text-white text-xs font-bold shadow-lg">
                              ✨ Destacada
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-3">{campaign.title}</h3>
                          <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400 mb-6 line-clamp-2">{campaign.description}</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEditCampaign(campaign)}
                              className="flex-1 flex items-center justify-center gap-2 bg-weprom-gray-100 dark:bg-weprom-gray-900 hover:bg-weprom-gray-200 dark:hover:bg-weprom-gray-800 text-weprom-gray-700 dark:text-weprom-gray-300 px-4 py-2.5 rounded-lg font-semibold transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteCampaign(campaign.id)}
                              className="flex items-center justify-center bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 p-2.5 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-weprom-red to-weprom-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 shadow-lg border border-weprom-gray-200 dark:border-weprom-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="h-0.5 w-6 bg-gradient-to-r from-weprom-blue to-weprom-green"></div>
                      <span className="text-sm font-semibold text-weprom-blue uppercase tracking-widest">
                        Proyectos
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                      Gestión de Proyectos
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowProjectForm(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-weprom-blue to-weprom-green text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    Nuevo Proyecto
                  </button>
                </div>

                {showProjectForm ? (
                  <div className="bg-gradient-to-br from-weprom-gray-50 to-white dark:from-weprom-dark dark:to-weprom-dark-gray rounded-2xl p-6 border-2 border-weprom-blue/20">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                        {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                      </h3>
                      <button onClick={resetProjectForm} className="text-weprom-gray-400 hover:text-weprom-blue transition-colors">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">Nombre del Proyecto</label>
                        <input
                          type="text"
                          value={projectForm.name}
                          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-blue focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700"
                          placeholder="Nombre del proyecto"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">Imagen</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'project')}
                            className="hidden"
                            id="project-image"
                          />
                          <label
                            htmlFor="project-image"
                            className="flex-1 px-4 py-3.5 border-2 border-dashed border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl cursor-pointer hover:border-weprom-blue transition-colors flex items-center justify-center gap-3 bg-white dark:bg-weprom-dark"
                          >
                            <Upload className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
                            <span className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Seleccionar imagen</span>
                          </label>
                        </div>
                        {imagePreview && (
                          <img src={imagePreview} alt="Preview" className="mt-4 w-full h-48 object-cover rounded-xl border border-weprom-gray-200 dark:border-weprom-gray-800" />
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          onClick={handleSaveProject}
                          disabled={loading}
                          className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-weprom-blue to-weprom-green text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                          {loading ? 'Guardando...' : (editingProject ? 'Actualizar' : 'Crear Proyecto')}
                        </button>
                        <button
                          onClick={resetProjectForm}
                          className="px-6 py-3.5 bg-weprom-gray-100 dark:bg-weprom-gray-900 hover:bg-weprom-gray-200 dark:hover:bg-weprom-gray-800 text-weprom-gray-700 dark:text-weprom-gray-300 rounded-xl font-semibold transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <div key={project.id} className="group bg-white dark:bg-weprom-dark-gray border-2 border-weprom-gray-200 dark:border-weprom-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-weprom-blue">
                        <div className="relative h-48 overflow-hidden">
                          <img src={project.img} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-extrabold text-lg text-weprom-gray-900 dark:text-weprom-white mb-4 truncate">{project.name}</h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="flex-1 flex items-center justify-center gap-2 bg-weprom-gray-100 dark:bg-weprom-gray-900 hover:bg-weprom-gray-200 dark:hover:bg-weprom-gray-800 text-weprom-gray-700 dark:text-weprom-gray-300 px-3 py-2 rounded-lg font-semibold transition-all text-sm"
                            >
                              <Edit2 className="w-4 h-4" />
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="flex items-center justify-center bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 p-2 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer del dashboard */}
      <footer className="mt-12 py-6 border-t border-weprom-gray-200 dark:border-weprom-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm font-light text-weprom-gray-600 dark:text-weprom-gray-400">
                WeProm Dashboard v1.0
              </p>
              <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-500 mt-1">
                &copy; 2025 WeProm Marketing. Panel administrativo.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-xs text-weprom-gray-600 dark:text-weprom-gray-400 hover:text-weprom-red transition-colors">
                Ayuda
              </a>
              <a href="#" className="text-xs text-weprom-gray-600 dark:text-weprom-gray-400 hover:text-weprom-blue transition-colors">
                Contacto
              </a>
              <a href="#" className="text-xs text-weprom-gray-600 dark:text-weprom-gray-400 hover:text-weprom-green transition-colors">
                Documentación
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}