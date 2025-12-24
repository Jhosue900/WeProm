import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Tag, Plus, Edit2, Trash2, Save, X, Upload, TrendingUp, ShoppingBag, Loader2, LogOut } from 'lucide-react';

// Configuración de la API
const API_URL = 'https://we-prom-backend.vercel.app';

interface Campaign {
  id: number;
  title: string;
  description: string;
  img: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  img: string;
}

interface CampaignForm {
  title: string;
  description: string;
  image: File | null;
}

interface ProductForm {
  name: string;
  price: string;
  stock: string;
  image: File | null;
}

interface DashboardProps {
  onLogout?: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const [campaignForm, setCampaignForm] = useState<CampaignForm>({ title: '', description: '', image: null });
  const [productForm, setProductForm] = useState<ProductForm>({ name: '', price: '', stock: '', image: null });

  // Obtener token del localStorage
  const getToken = () => localStorage.getItem('token');

  // Verificar token al montar el componente
  useEffect(() => {
    const token = getToken();
    
    // Si no hay token, redirigir al home
    if (!token) {
      navigate('/');
      return;
    }

    // Verificar que el token sea válido
    verifyTokenWithBackend(token);
  }, [navigate]);

  // Verificar token con el backend
  const verifyTokenWithBackend = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // Token inválido o expirado
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

  // Cargar datos al montar
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    loadCampaigns();
    loadProducts();
  }, []);

  // Función para manejar logout
  const handleLogout = async () => {
    try {
      const token = getToken();
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirigir al home
      navigate('/');
      
      // Llamar callback de logout si existe
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

  const loadProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const result = await response.json();
      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'campaign' | 'product') => {
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
        setProductForm({ ...productForm, image: file });
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

      const url = editingCampaign 
        ? `${API_URL}/campaigns/${editingCampaign.id}`
        : `${API_URL}/campaigns`;
      
      const method = editingCampaign ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
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

  const handleSaveProduct = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', productForm.name);
      formData.append('price', productForm.price);
      formData.append('stock', productForm.stock);
      if (productForm.image) {
        formData.append('image', productForm.image);
      }

      const url = editingProduct 
        ? `${API_URL}/products/${editingProduct.id}`
        : `${API_URL}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        await loadProducts();
        resetProductForm();
        alert(editingProduct ? 'Producto actualizado' : 'Producto creado');
      } else if (response.status === 401 || response.status === 403) {
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        handleLogout();
      }
    } catch (error) {
      console.error('Error guardando producto:', error);
      alert('Error al guardar el producto');
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

  const resetProductForm = () => {
    setProductForm({ name: '', price: '', stock: '', image: null });
    setEditingProduct(null);
    setShowProductForm(false);
    setImagePreview(null);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm({ title: campaign.title, description: campaign.description, image: null });
    setImagePreview(campaign.img);
    setShowCampaignForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({ name: product.name, price: product.price, stock: product.stock.toString(), image: null });
    setImagePreview(product.img);
    setShowProductForm(true);
  };

  const handleDeleteCampaign = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta campaña?')) return;
    
    try {
      const response = await fetch(`${API_URL}/campaigns/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
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

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const result = await response.json();
      
      if (result.success) {
        await loadProducts();
        alert('Producto eliminado');
      } else if (response.status === 401 || response.status === 403) {
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        handleLogout();
      }
    } catch (error) {
      console.error('Error eliminando producto:', error);
      alert('Error al eliminar el producto');
    }
  };

  const totalProducts = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard WeProm</h1>
                <p className="text-sm text-gray-500">Panel de administración</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-right mr-4">
                  <p className="text-sm font-semibold text-gray-900">{user.email}</p>
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Resumen', icon: TrendingUp },
            { id: 'campaigns', label: 'Campañas', icon: Tag },
            { id: 'products', label: 'Productos', icon: Package }
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Campañas Activas', value: campaigns.length, icon: Tag, color: 'from-pink-500 to-purple-600' },
                { label: 'Total Productos', value: products.length, icon: Package, color: 'from-blue-500 to-cyan-600' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Tag className="w-6 h-6 text-pink-500" />
                  Gestión de Campañas
                </h2>
                <button
                  onClick={() => setShowCampaignForm(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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
                        placeholder="Ej: Colección Verano"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                      <textarea
                        value={campaignForm.description}
                        onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none"
                        rows={3}
                        placeholder="Describe tu campaña..."
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
                    <div className="flex gap-3 pt-2">
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
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCampaign(campaign)}
                            className="flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="flex items-center gap-2 bg-red-500/90 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
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

        {activeTab === 'products' && (
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-6 h-6 text-pink-500" />
                  Gestión de Productos
                </h2>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Nuevo Producto
                </button>
              </div>

              {showProductForm ? (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-pink-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                    </h3>
                    <button onClick={resetProductForm} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                        placeholder="Ej: Bolso Canvas"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Precio</label>
                      <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                        placeholder="45000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
                      <input
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'product')}
                        className="hidden"
                        id="product-image"
                      />
                      <label
                        htmlFor="product-image"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-pink-500 transition-colors flex items-center justify-center gap-2 bg-white"
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
                    <div className="md:col-span-2 flex gap-3 pt-2">
                      <button
                        onClick={handleSaveProduct}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {loading ? 'Guardando...' : 'Guardar'}
                      </button>
                      <button
                        onClick={resetProductForm}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 group hover:border-pink-200">
                      <div className="relative overflow-hidden">
                        <img src={product.img} alt={product.name} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-2 right-2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Stock: {product.stock}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">{product.name}</h3>
                        <p className="text-2xl font-bold text-pink-500 mb-4">
                          ${parseInt(product.price).toLocaleString()}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-semibold transition-all text-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
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