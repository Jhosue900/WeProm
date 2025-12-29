import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Tag, Plus, Edit2, Trash2, Save, X, Upload, 
  TrendingUp, Loader2, LogOut, Menu, Users, Calendar, 
  Target, Award, ChevronRight, Eye, Briefcase, 
  FileText, Image, Video, Megaphone, BarChart
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

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/');
      return;
    }
    verifyTokenWithBackend(token);
  }, [navigate]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">WeProm</h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Panel de administración</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              {user && (
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-900">Menú</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {user && (
              <div className="mb-8 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            )}

            <nav className="space-y-2 mb-8">
              {[
                { id: 'overview', label: 'Resumen', icon: TrendingUp },
                { id: 'campaigns', label: 'Campañas', icon: Tag },
                { id: 'projects', label: 'Proyectos', icon: Briefcase }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileMenuItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="hidden md:flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Resumen', icon: TrendingUp },
            { id: 'campaigns', label: 'Campañas', icon: Tag },
            { id: 'projects', label: 'Proyectos', icon: Briefcase }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">¡Bienvenido de nuevo, {user?.name || 'Admin'}! 👋</h2>
                    <p className="text-pink-100 text-sm sm:text-base">Panel de control de WeProm - Agencia de Publicidad</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <Target className="w-6 h-6" />
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/30 text-green-200">Activas</span>
                    </div>
                    <p className="text-xs text-pink-100 mt-2">Campañas Activas</p>
                    <p className="text-xl font-bold mt-1">{stats.activeCampaigns}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <Briefcase className="w-6 h-6" />
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/30 text-green-200">Activos</span>
                    </div>
                    <p className="text-xs text-pink-100 mt-2">Proyectos Activos</p>
                    <p className="text-xl font-bold mt-1">{stats.activeProjects}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Acciones Rápidas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {[
                  { 
                    icon: Megaphone, 
                    label: 'Campañas', 
                    description: 'Publicar campaña',
                    color: 'bg-gradient-to-r from-pink-500 to-purple-600', 
                    onClick: () => { setActiveTab('campaigns'); setShowCampaignForm(true); } 
                  },
                  { 
                    icon: Image, 
                    label: 'Proyectos', 
                    description: 'Publicar proyecto',
                    color: 'bg-gradient-to-r from-blue-500 to-cyan-600', 
                    onClick: () => { setActiveTab('projects'); setShowProjectForm(true); } 
                  },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className={`flex flex-col items-start p-5 rounded-xl text-white font-semibold transition-all transform hover:scale-[1.02] hover:shadow-lg ${action.color}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <action.icon className="w-6 h-6" />
                      <span className="text-lg">{action.label}</span>
                    </div>
                    <p className="text-sm text-white/90 text-left">{action.description}</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span>Ir</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Campaigns & Projects Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Campaigns Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Campañas Recientes</h3>
                    <p className="text-gray-500 text-sm">Tus campañas publicitarias más recientes</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('campaigns')}
                    className="text-pink-500 hover:text-pink-600 text-sm font-semibold flex items-center gap-1"
                  >
                    Ver todas <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {campaigns.slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                      <div className="relative flex-shrink-0">
                        <img src={campaign.img} alt={campaign.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">{campaign.title}</h4>
                        <p className="text-sm text-gray-500 truncate">{campaign.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">En ejecución</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {campaigns.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Megaphone className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No hay campañas activas</p>
                      <button 
                        onClick={() => { setActiveTab('campaigns'); setShowCampaignForm(true); }}
                        className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Crear primera campaña
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Projects Preview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Proyectos Recientes</h3>
                    <p className="text-gray-500 text-sm">Tus proyectos gráficos más recientes</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('projects')}
                    className="text-blue-500 hover:text-blue-600 text-sm font-semibold flex items-center gap-1"
                  >
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                      <div className="relative flex-shrink-0">
                        <img src={project.img} alt={project.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">{project.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">Diseño gráfico</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No hay proyectos activos</p>
                      <button 
                        onClick={() => { setActiveTab('projects'); setShowProjectForm(true); }}
                        className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar primer proyecto
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Agency Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Métricas</h3>
                  <p className="text-gray-500 text-sm">Métricas clave de WeProm</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900">Campañas</h4>
                  <p className="text-sm text-gray-600 mt-1">Campañas en ejecución</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeCampaigns}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900">Proyectos</h4>
                  <p className="text-sm text-gray-600 mt-1">Proyectos activos</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeProjects}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Tag className="w-5 sm:w-6 h-5 sm:h-6 text-pink-500" />
                  Gestión de Campañas
                </h2>
                <button
                  onClick={() => setShowCampaignForm(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Nueva Campaña
                </button>
              </div>

              {showCampaignForm ? (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-pink-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {editingCampaign ? 'Editar Campaña' : 'Nueva Campaña'}
                    </h3>
                    <button onClick={resetCampaignForm} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Título</label>
                      <input
                        type="text"
                        value={campaignForm.title}
                        onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                        placeholder="Ej: Campaña de lanzamiento 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                      <textarea
                        value={campaignForm.description}
                        onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none"
                        rows={3}
                        placeholder="Describe la estrategia de la campaña..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen</label>
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, 'campaign')}
                          className="hidden"
                          id="campaign-image"
                        />
                        <label
                          htmlFor="campaign-image"
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-pink-500 transition-colors flex items-center justify-center gap-2 bg-white"
                        >
                          <Upload className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-gray-600">Seleccionar imagen</span>
                        </label>
                      </div>
                      {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-xl" />
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={handleSaveCampaign}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {loading ? 'Guardando...' : 'Guardar'}
                      </button>
                      <button
                        onClick={resetCampaignForm}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                      <img src={campaign.img} alt={campaign.title} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{campaign.title}</h3>
                        <p className="text-gray-200 text-sm mb-4">{campaign.description}</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleEditCampaign(campaign)}
                            className="flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="flex items-center justify-center gap-2 bg-red-500/90 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
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

        {activeTab === 'projects' && (
          <div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500" />
                  Gestión de Proyectos
                </h2>
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Nuevo Proyecto
                </button>
              </div>

              {showProjectForm ? (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
                    </h3>
                    <button onClick={resetProjectForm} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                      <input
                        type="text"
                        value={projectForm.name}
                        onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="Ej: Branding Corporativo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'project')}
                        className="hidden"
                        id="project-image"
                      />
                      <label
                        htmlFor="project-image"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center gap-2 bg-white"
                      >
                        <Upload className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-600">Seleccionar</span>
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                      )}
                    </div>
                    <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={handleSaveProject}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {loading ? 'Guardando...' : 'Guardar'}
                      </button>
                      <button
                        onClick={resetProjectForm}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 group hover:border-blue-200">
                      <div className="relative overflow-hidden">
                        <img src={project.img} alt={project.name} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{project.name}</h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-semibold transition-all text-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-all"
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
    </div>
  );
}