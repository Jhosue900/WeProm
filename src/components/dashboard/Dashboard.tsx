import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import {
  Package, Tag, Plus, Edit2, Trash2, Save, X, Upload,
  TrendingUp, Loader2, LogOut, Menu, Users, Calendar,
  Target, Award, ChevronRight, Eye, Briefcase,
  FileText, Image, Video, Megaphone, BarChart,
  Sparkles, Grid, Settings, Bell, Search,
  Home, BarChart2, Users as UsersIcon, CreditCard,
  Sun, Moon, CheckCircle, AlertCircle,
  Check, XCircle, Info, AlertTriangle,
  MessageSquare, Mail, Phone, Building, Clock, User, RefreshCw,
  Star
} from 'lucide-react';

// Reemplaza el componente StarIcon actual por este:
const StarIcon = ({ 
  filled, 
  half = false, 
  className = "w-5 h-5" 
}: { 
  filled: boolean; 
  half?: boolean;
  className?: string;
}) => {
  if (half) {
    return (
      <div className="relative">
        <svg 
          className={`${className} text-weprom-gray-300 dark:text-weprom-gray-600`} 
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
          />
        </svg>
        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
          <svg 
            className={`${className} text-weprom-yellow fill-current`} 
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <svg 
      className={`${className} ${filled ? 'text-weprom-yellow fill-current' : 'text-weprom-gray-300 dark:text-weprom-gray-600'}`} 
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
      />
    </svg>
  );
};

const API_URL = 'https://we-prom-backend.vercel.app';

// Interfaces
interface Campaign {
  id: number;
  title: string;
  description: string;
  img: string;
}

interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  img: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

interface CampaignForm {
  title: string;
  description: string;
  image: File | null;
}

interface ProjectForm {
  name: string;
  category: string;
  description: string;
  image: File | null;
}

interface DashboardProps {
  onLogout?: () => void;
}

interface CompressionOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
  maxIteration?: number;
  exifOrientation?: number;
  fileType?: string;
}

interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  location: string;
  created_at: string;
  status?: 'published' | 'pending';
}

interface ReviewForm {
  name: string;
  rating: number;
  review: string;
  location: string;
}

// Componente de Notificación
const NotificationToast = ({
  notification,
  onClose
}: {
  notification: Notification;
  onClose: () => void;
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onClose, 300);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.duration, onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-6 h-6" />;
      case 'error':
        return <XCircle className="w-6 h-6" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6" />;
      case 'info':
        return <Info className="w-6 h-6" />;
      default:
        return <Info className="w-6 h-6" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-gradient-to-r from-weprom-green to-emerald-500';
      case 'error':
        return 'bg-gradient-to-r from-weprom-red to-rose-500';
      case 'warning':
        return 'bg-gradient-to-r from-weprom-yellow to-amber-500';
      case 'info':
        return 'bg-gradient-to-r from-weprom-blue to-cyan-500';
      default:
        return 'bg-gradient-to-r from-weprom-gray-600 to-weprom-gray-700';
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-weprom-green/30';
      case 'error':
        return 'border-weprom-red/30';
      case 'warning':
        return 'border-weprom-yellow/30';
      case 'info':
        return 'border-weprom-blue/30';
      default:
        return 'border-weprom-gray-500/30';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-[100] w-96 max-w-[calc(100vw-2rem)] transform transition-all duration-300 ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
    >
      <div className={`rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-weprom-dark/95 border ${getBorderColor()}`}>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${getBgColor()} text-white`}>
              {getIcon()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                  {notification.title}
                </h4>
                <button
                  onClick={() => {
                    setIsExiting(true);
                    setTimeout(onClose, 300);
                  }}
                  className="text-weprom-gray-400 hover:text-weprom-gray-600 dark:hover:text-weprom-gray-300 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400 mt-1">
                {notification.message}
              </p>
            </div>
          </div>
        </div>
        {notification.duration && (
          <div className="h-1 w-full bg-weprom-gray-200 dark:bg-weprom-gray-800 overflow-hidden">
            <div
              className={`h-full ${getBgColor()} transition-all duration-1000`}
              style={{
                animation: `shrink ${notification.duration}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Confirmación Modal
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning'
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="w-12 h-12 text-weprom-red" />;
      case 'warning':
        return <AlertTriangle className="w-12 h-12 text-weprom-yellow" />;
      case 'info':
        return <Info className="w-12 h-12 text-weprom-blue" />;
      default:
        return <Info className="w-12 h-12 text-weprom-blue" />;
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'bg-gradient-to-r from-weprom-red to-rose-500 hover:shadow-red/30';
      case 'warning':
        return 'bg-gradient-to-r from-weprom-yellow to-amber-500 hover:shadow-yellow/30';
      case 'info':
        return 'bg-gradient-to-r from-weprom-blue to-cyan-500 hover:shadow-blue/30';
      default:
        return 'bg-gradient-to-r from-weprom-blue to-cyan-500 hover:shadow-blue/30';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md transform transition-all">
        <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl shadow-2xl overflow-hidden border border-weprom-gray-200 dark:border-weprom-gray-800">
          <div className="p-6 border-b border-weprom-gray-200 dark:border-weprom-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {getIcon()}
              </div>
              <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                {title}
              </h3>
              <p className="text-weprom-gray-600 dark:text-weprom-gray-400 mt-2">
                {message}
              </p>
            </div>
          </div>

          <div className="p-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-weprom-gray-100 dark:bg-weprom-gray-900 hover:bg-weprom-gray-200 dark:hover:bg-weprom-gray-800 text-weprom-gray-700 dark:text-weprom-gray-300 rounded-xl font-semibold transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-3 ${getConfirmButtonClass()} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal para ver mensaje de contacto
const ContactMessageModal = ({
  isOpen,
  onClose,
  message
}: {
  isOpen: boolean;
  onClose: () => void;
  message: ContactMessage | null;
}) => {
  if (!isOpen || !message) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-weprom-red/10 text-weprom-red';
      case 'read':
        return 'bg-weprom-blue/10 text-weprom-blue';
      case 'replied':
        return 'bg-weprom-green/10 text-weprom-green';
      default:
        return 'bg-weprom-gray-100 text-weprom-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unread':
        return 'No leído';
      case 'read':
        return 'Leído';
      case 'replied':
        return 'Respondido';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl transform transition-all">
        <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl shadow-2xl overflow-hidden border border-weprom-gray-200 dark:border-weprom-gray-800">
          <div className="p-6 border-b border-weprom-gray-200 dark:border-weprom-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-weprom-blue" />
                  <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                    {message.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(message.status)}`}>
                    {getStatusText(message.status)}
                  </span>
                </div>
                <p className="text-sm text-weprom-gray-500 dark:text-weprom-gray-400">
                  {formatDate(message.created_at)}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-weprom-gray-400 hover:text-weprom-gray-600 dark:hover:text-weprom-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-weprom-gray-500" />
                  <div>
                    <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">Email</p>
                    <p className="font-medium text-weprom-gray-900 dark:text-weprom-white break-all">
                      {message.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-weprom-gray-500" />
                  <div>
                    <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">Teléfono</p>
                    <p className="font-medium text-weprom-gray-900 dark:text-weprom-white">
                      {message.phone}
                    </p>
                  </div>
                </div>

                {message.company && (
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-weprom-gray-500" />
                    <div>
                      <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">Empresa</p>
                      <p className="font-medium text-weprom-gray-900 dark:text-weprom-white">
                        {message.company}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-weprom-gray-50 dark:bg-weprom-dark p-4 rounded-lg">
                <p className="text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-2">Mensaje</p>
                <p className="text-weprom-gray-600 dark:text-weprom-gray-400 whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility Functions
const sanitizeFileName = (name: string) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.\-_]/g, "");
};

const getCompressionOptions = (fileType: string): CompressionOptions => {
  const commonOptions = {
    maxSizeMB: 0.5,
    useWebWorker: true,
    maxIteration: 10
  };

  if (fileType.includes('png')) {
    return {
      ...commonOptions,
      maxWidthOrHeight: 1200,
      fileType: 'image/png'
    };
  } else if (fileType.includes('jpeg') || fileType.includes('jpg')) {
    return {
      ...commonOptions,
      maxWidthOrHeight: 1200,
      fileType: 'image/jpeg'
    };
  } else if (fileType.includes('webp')) {
    return {
      ...commonOptions,
      maxWidthOrHeight: 1200,
      fileType: 'image/webp'
    };
  } else {
    return {
      ...commonOptions,
      maxWidthOrHeight: 1200
    };
  }
};

const compressImage = async (file: File, onProgress?: (percent: number) => void): Promise<File> => {
  try {
    const options = getCompressionOptions(file.type);
    const compressedFile = await imageCompression(file, {
      ...options,
      onProgress
    });

    return new File([compressedFile], file.name, {
      type: compressedFile.type,
      lastModified: Date.now()
    });
  } catch (error) {
    console.error('Error compressing image:', error);
    return file;
  }
};

const validateFileType = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  return validTypes.includes(file.type);
};

const compressImageWithRetry = async (
  file: File,
  retries = 2,
  onProgress?: (percent: number) => void
): Promise<File> => {
  let compressedFile = file;

  for (let i = 0; i < retries; i++) {
    try {
      const options = {
        ...getCompressionOptions(file.type),
        maxSizeMB: 0.3 * (i + 1),
        maxWidthOrHeight: 1000 - (i * 200),
      };

      compressedFile = await imageCompression(file, {
        ...options,
        onProgress
      });

      if (compressedFile.size < 500 * 1024) {
        return compressedFile;
      }
    } catch (error) {
      console.warn(`Intento de compresión ${i + 1} falló:`, error);
    }
  }

  return compressedFile;
};

// File Size Info Component
const FileSizeInfo = ({ file, originalFile }: { file: File | null, originalFile?: File | null }) => {
  if (!file) return null;

  const sizeInKB = file.size / 1024;
  const sizeInMB = file.size / 1024 / 1024;
  const isOptimal = sizeInKB < 500;

  let compressionInfo = null;
  if (originalFile && originalFile !== file) {
    const originalKB = originalFile.size / 1024;
    const compressionRatio = ((1 - sizeInKB / originalKB) * 100).toFixed(0);
    compressionInfo = `(${compressionRatio}% reducido)`;
  }

  return (
    <div className="mt-2 text-xs">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${isOptimal ? 'bg-weprom-green' : 'bg-weprom-yellow'}`}></div>
        <span className="font-semibold text-weprom-gray-700 dark:text-weprom-gray-300">Tamaño final: </span>
        <span className={isOptimal ? 'text-weprom-green' : 'text-weprom-yellow'}>
          {sizeInKB < 1024
            ? `${sizeInKB.toFixed(0)} KB`
            : `${sizeInMB.toFixed(1)} MB`
          }
        </span>
        {compressionInfo && (
          <span className="text-weprom-gray-500 dark:text-weprom-gray-400 text-xs">
            {compressionInfo}
          </span>
        )}
      </div>
      {!isOptimal && (
        <p className="text-weprom-gray-500 dark:text-weprom-gray-400 italic">
          Se recomienda menos de 500KB para mejor rendimiento
        </p>
      )}
    </div>
  );
};

// Componente para mostrar estrellas
const StarRating = ({ rating, onChange, editable = false }: {
  rating: number;
  onChange?: (rating: number) => void;
  editable?: boolean;
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onChange && onChange(star)}
          disabled={!editable}
          className={`${editable ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          <StarIcon filled={star <= rating} className="w-6 h-6" />
        </button>
      ))}
      {!editable && (
        <span className="ml-2 text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300">
          {rating.toFixed(1)}/5
        </span>
      )}
    </div>
  );
};

// Main Dashboard Component
export default function Dashboard({ onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [campaignForm, setCampaignForm] = useState<CampaignForm>({ title: '', description: '', image: null });
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    name: '',
    category: '',
    description: '',
    image: null
  });
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    name: '',
    rating: 5,
    review: '',
    location: ''
  });
  const [compressionProgress, setCompressionProgress] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const [stats, setStats] = useState({
    activeCampaigns: 0,
    activeProjects: 0,
    totalClients: 0,
    completionRate: 0,
    recentActivity: [] as Array<{ id: number, action: string, time: string, type: string }>
  });

  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    type: 'warning' | 'danger' | 'info';
    confirmText?: string;
  } | null>(null);

  const getToken = () => localStorage.getItem('token');

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { ...notification, id }]);

    if (notification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showConfirmation = (config: {
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'warning' | 'danger' | 'info';
    confirmText?: string;
  }) => {
    setModalConfig({
      ...config,
      type: config.type || 'warning'
    });
    setShowConfirmModal(true);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/');
      return;
    }
    verifyTokenWithBackend(token);
  }, [navigate]);

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
    loadContacts();
    loadReviews();
  }, []);

  useEffect(() => {
    if (campaigns.length > 0 || projects.length > 0) {
      loadDashboardStats();
    }
  }, [campaigns, projects]);

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

  const resetCampaignForm = () => {
    setCampaignForm({ title: '', description: '', image: null });
    setEditingCampaign(null);
    setShowCampaignForm(false);
    setImagePreview(null);
    setCompressionProgress(0);
    setIsCompressing(false);
  };

  const resetProjectForm = () => {
    setProjectForm({ name: '', category: '', description: '', image: null });
    setEditingProject(null);
    setShowProjectForm(false);
    setImagePreview(null);
    setCompressionProgress(0);
    setIsCompressing(false);
  };

  const resetReviewForm = () => {
    setReviewForm({
      name: '',
      rating: 5,
      review: '',
      location: ''
    });
    setEditingReview(null);
    setShowReviewForm(false);
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

  const loadContacts = async () => {
    try {
      setLoadingContacts(true);
      const token = getToken();
      const response = await fetch(`${API_URL}/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        setContacts(result.data);
      }
    } catch (error) {
      console.error('Error cargando contactos:', error);
    } finally {
      setLoadingContacts(false);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/reviews`);
      const result = await response.json();
      if (result.success) {
        setReviews(result.data);
      }
    } catch (error) {
      console.error('Error cargando reseñas:', error);
    }
  };

  const updateContactStatus = async (id: number, status: 'unread' | 'read' | 'replied') => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/contacts/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      const result = await response.json();
      if (result.success) {
        setContacts(prev => prev.map(contact =>
          contact.id === id ? { ...contact, status } : contact
        ));

        addNotification({
          type: 'success',
          title: 'Estado actualizado',
          message: `El mensaje se marcó como ${status === 'read' ? 'leído' : 'respondido'}`,
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Error actualizando estado:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudo actualizar el estado',
        duration: 5000
      });
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

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'campaign' | 'project'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressionProgress(0);
    setIsCompressing(true);

    if (!validateFileType(file)) {
      addNotification({
        type: 'error',
        title: 'Formato no válido',
        message: 'Por favor selecciona una imagen (JPEG, PNG, WebP, GIF).',
        duration: 5000
      });
      e.target.value = '';
      setIsCompressing(false);
      return;
    }

    const tempReader = new FileReader();
    tempReader.onloadend = () => {
      setImagePreview(tempReader.result as string);
    };
    tempReader.readAsDataURL(file);

    try {
      const compressedFile = await compressImageWithRetry(
        file,
        2,
        (percent) => setCompressionProgress(percent)
      );

      if (type === 'campaign') {
        setCampaignForm({ ...campaignForm, image: compressedFile });
      } else {
        setProjectForm({ ...projectForm, image: compressedFile });
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsCompressing(false);
        setCompressionProgress(100);

        setTimeout(() => setCompressionProgress(0), 1500);
      };
      reader.readAsDataURL(compressedFile);

    } catch (error) {
      console.error('Error procesando imagen:', error);
      addNotification({
        type: 'error',
        title: 'Error al procesar imagen',
        message: 'Intenta con otra imagen o un formato diferente.',
        duration: 5000
      });
      setIsCompressing(false);
      setCompressionProgress(0);
      e.target.value = '';
    }
  };

  const handleSaveCampaign = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', campaignForm.title);
      formData.append('description', campaignForm.description);

      if (campaignForm.image) {
        const cleanName = sanitizeFileName(campaignForm.image.name);
        const sanitizedFile = new File(
          [campaignForm.image],
          cleanName,
          {
            type: campaignForm.image.type,
            lastModified: Date.now()
          }
        );
        formData.append('image', sanitizedFile);
      }

      const url = editingCampaign ? `${API_URL}/campaigns/${editingCampaign.id}` : `${API_URL}/campaigns`;
      const method = editingCampaign ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 413) {
          addNotification({
            type: 'error',
            title: 'Imagen demasiado grande',
            message: 'Por favor intenta con una imagen más pequeña.',
            duration: 5000
          });
          return;
        }
      }

      if (result.success) {
        await loadCampaigns();
        resetCampaignForm();
        addNotification({
          type: 'success',
          title: editingCampaign ? '✅ Campaña actualizada' : '✅ Campaña creada',
          message: editingCampaign ? 'La campaña se ha actualizado exitosamente.' : 'La campaña se ha creado exitosamente.',
          duration: 3000
        });
      } else if (response.status === 401 || response.status === 403) {
        addNotification({
          type: 'warning',
          title: 'Sesión expirada',
          message: 'Por favor inicia sesión nuevamente.',
          duration: 5000
        });
        handleLogout();
      }
    } catch (error) {
      console.error('Error guardando campaña:', error);
      addNotification({
        type: 'error',
        title: 'Error al guardar',
        message: 'No se pudo guardar la campaña. Intenta nuevamente.',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', projectForm.name);
      formData.append('category', projectForm.category || 'General');
      formData.append('description', projectForm.description || '');

      if (projectForm.image) {
        const cleanName = sanitizeFileName(projectForm.image.name);
        const sanitizedFile = new File(
          [projectForm.image],
          cleanName,
          {
            type: projectForm.image.type,
            lastModified: Date.now()
          }
        );
        formData.append('image', sanitizedFile);
      }

      const url = editingProject ? `${API_URL}/products/${editingProject.id}` : `${API_URL}/products`;
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 413) {
          addNotification({
            type: 'error',
            title: 'Imagen demasiado grande',
            message: 'Por favor intenta con una imagen más pequeña.',
            duration: 5000
          });
          return;
        }
      }

      const result = await response.json();
      if (result.success) {
        await loadProjects();
        resetProjectForm();
        addNotification({
          type: 'success',
          title: editingProject ? '✅ Proyecto actualizado' : '✅ Proyecto creado',
          message: editingProject ? 'El proyecto se ha actualizado exitosamente.' : 'El proyecto se ha creado exitosamente.',
          duration: 3000
        });
      } else if (response.status === 401 || response.status === 403) {
        addNotification({
          type: 'warning',
          title: 'Sesión expirada',
          message: 'Por favor inicia sesión nuevamente.',
          duration: 5000
        });
        handleLogout();
      }
    } catch (error) {
      console.error('Error guardando proyecto:', error);
      addNotification({
        type: 'error',
        title: 'Error al guardar',
        message: 'No se pudo guardar el proyecto. Intenta nuevamente.',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReview = async () => {
    setLoading(true);
    try {
      const reviewData = {
        name: reviewForm.name,
        rating: reviewForm.rating,
        review: reviewForm.review,
        location: reviewForm.location
      };

      const url = editingReview ? `${API_URL}/reviews/${editingReview.id}` : `${API_URL}/reviews`;
      const method = editingReview ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      const result = await response.json();
      if (result.success) {
        await loadReviews();
        resetReviewForm();
        addNotification({
          type: 'success',
          title: editingReview ? '✅ Reseña actualizada' : '✅ Reseña creada',
          message: editingReview ? 'La reseña se ha actualizado exitosamente.' : 'La reseña se ha creado exitosamente.',
          duration: 3000
        });
      } else if (response.status === 401 || response.status === 403) {
        addNotification({
          type: 'warning',
          title: 'Sesión expirada',
          message: 'Por favor inicia sesión nuevamente.',
          duration: 5000
        });
        handleLogout();
      }
    } catch (error) {
      console.error('Error guardando reseña:', error);
      addNotification({
        type: 'error',
        title: 'Error al guardar',
        message: 'No se pudo guardar la reseña. Intenta nuevamente.',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm({ title: campaign.title, description: campaign.description, image: null });
    setImagePreview(campaign.img);
    setShowCampaignForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      category: project.category || '',
      description: project.description || '',
      image: null
    });
    setImagePreview(project.img);
    setShowProjectForm(true);
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setReviewForm({
      name: review.name,
      rating: review.rating,
      review: review.review,
      location: review.location
    });
    setShowReviewForm(true);
  };

  const handleDeleteCampaign = (id: number) => {
    showConfirmation({
      title: '¿Eliminar campaña?',
      message: 'Esta acción eliminará permanentemente la campaña. ¿Estás seguro?',
      type: 'danger',
      confirmText: 'Eliminar',
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_URL}/campaigns/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
          });
          const result = await response.json();
          if (result.success) {
            await loadCampaigns();
            addNotification({
              type: 'success',
              title: '✅ Campaña eliminada',
              message: 'La campaña se ha eliminado exitosamente.',
              duration: 3000
            });
          } else if (response.status === 401 || response.status === 403) {
            addNotification({
              type: 'warning',
              title: 'Sesión expirada',
              message: 'Por favor inicia sesión nuevamente.',
              duration: 5000
            });
            handleLogout();
          }
        } catch (error) {
          console.error('Error eliminando campaña:', error);
          addNotification({
            type: 'error',
            title: 'Error al eliminar',
            message: 'No se pudo eliminar la campaña. Intenta nuevamente.',
            duration: 5000
          });
        }
      }
    });
  };

  const handleDeleteProject = (id: number) => {
    showConfirmation({
      title: '¿Eliminar proyecto?',
      message: 'Esta acción eliminará permanentemente el proyecto. ¿Estás seguro?',
      type: 'danger',
      confirmText: 'Eliminar',
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
          });
          const result = await response.json();
          if (result.success) {
            await loadProjects();
            addNotification({
              type: 'success',
              title: '✅ Proyecto eliminada',
              message: 'El proyecto se ha eliminado exitosamente.',
              duration: 3000
            });
          } else if (response.status === 401 || response.status === 403) {
            addNotification({
              type: 'warning',
              title: 'Sesión expirada',
              message: 'Por favor inicia sesión nuevamente.',
              duration: 5000
            });
            handleLogout();
          }
        } catch (error) {
          console.error('Error eliminando proyecto:', error);
          addNotification({
            type: 'error',
            title: 'Error al eliminar',
            message: 'No se pudo eliminar el proyecto. Intenta nuevamente.',
            duration: 5000
          });
        }
      }
    });
  };

  const handleDeleteReview = (id: number) => {
    showConfirmation({
      title: '¿Eliminar reseña?',
      message: 'Esta acción eliminará permanentemente la reseña. ¿Estás seguro?',
      type: 'danger',
      confirmText: 'Eliminar',
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_URL}/reviews/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
          });
          const result = await response.json();
          if (result.success) {
            await loadReviews();
            addNotification({
              type: 'success',
              title: '✅ Reseña eliminada',
              message: 'La reseña se ha eliminado exitosamente.',
              duration: 3000
            });
          } else if (response.status === 401 || response.status === 403) {
            addNotification({
              type: 'warning',
              title: 'Sesión expirada',
              message: 'Por favor inicia sesión nuevamente.',
              duration: 5000
            });
            handleLogout();
          }
        } catch (error) {
          console.error('Error eliminando reseña:', error);
          addNotification({
            type: 'error',
            title: 'Error al eliminar',
            message: 'No se pudo eliminar la reseña. Intenta nuevamente.',
            duration: 5000
          });
        }
      }
    });
  };

  const handleViewContact = (contact: ContactMessage) => {
    setSelectedContact(contact);
    setShowContactModal(true);

    if (contact.status === 'unread') {
      updateContactStatus(contact.id, 'read');
    }
  };

  const handleMobileMenuItemClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-weprom-red/10 text-weprom-red';
      case 'read':
        return 'bg-weprom-blue/10 text-weprom-blue';
      case 'replied':
        return 'bg-weprom-green/10 text-weprom-green';
      default:
        return 'bg-weprom-gray-100 text-weprom-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unread':
        return 'No leído';
      case 'read':
        return 'Leído';
      case 'replied':
        return 'Respondido';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `Hace ${diffMins} min`;
    } else if (diffHours < 24) {
      return `Hace ${diffHours} h`;
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else {
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }
  };

  const unreadCount = contacts.filter(c => c.status === 'unread').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-weprom-gray-50 via-white to-weprom-gray-50 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark">
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      {notifications.map(notification => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}

      {showConfirmModal && modalConfig && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={modalConfig.onConfirm}
          title={modalConfig.title}
          message={modalConfig.message}
          type={modalConfig.type}
          confirmText={modalConfig.confirmText}
        />
      )}

      {showContactModal && (
        <ContactMessageModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          message={selectedContact}
        />
      )}

      <header className="sticky top-0 z-50 bg-white/95 dark:bg-weprom-dark/95 backdrop-blur-sm border-b border-weprom-gray-200 dark:border-weprom-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4">
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

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-weprom-gray-100 dark:bg-weprom-gray-900 border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-yellow transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-weprom-yellow" />
                ) : (
                  <Moon className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
                )}
              </button>

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

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-weprom-red to-weprom-yellow text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg bg-weprom-gray-100 dark:bg-weprom-gray-900 border border-weprom-gray-300 dark:border-weprom-gray-700 hover:border-weprom-red transition-colors"
            >
              <Menu className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-weprom-dark-gray shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full pt-4 flex flex-col">
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

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {[
                { id: 'overview', label: 'Resumen', icon: Home, color: 'red' },
                { id: 'campaigns', label: 'Campañas', icon: Megaphone, color: 'blue' },
                { id: 'projects', label: 'Proyectos', icon: Briefcase, color: 'green' },
                { id: 'messages', label: 'Mensajes', icon: MessageSquare, color: 'purple' },
                { id: 'reviews', label: 'Reseñas', icon: Star, color: 'yellow' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileMenuItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all duration-300 relative ${activeTab === item.id
                    ? `bg-gradient-to-r from-weprom-${item.color} to-weprom-yellow text-white shadow-lg`
                    : 'text-weprom-gray-700 dark:text-weprom-gray-300 hover:bg-weprom-gray-100 dark:hover:bg-weprom-gray-800'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {item.id === 'messages' && unreadCount > 0 && (
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-weprom-red text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

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

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="hidden md:flex gap-3 mb-8 overflow-x-auto pb-4">
          {[
            { id: 'overview', label: 'Resumen', icon: Home },
            { id: 'campaigns', label: 'Campañas', icon: Megaphone },
            { id: 'projects', label: 'Proyectos', icon: Briefcase },
            {
              id: 'messages',
              label: 'Mensajes',
              icon: MessageSquare,
              badge: unreadCount > 0 ? unreadCount : undefined
            },
            { id: 'reviews', label: 'Reseñas', icon: Star }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap relative ${activeTab === tab.id
                ? 'bg-gradient-to-r from-weprom-red to-weprom-yellow text-white shadow-lg'
                : 'bg-white dark:bg-weprom-dark-gray text-weprom-gray-700 dark:text-weprom-gray-300 hover:bg-weprom-gray-100 dark:hover:bg-weprom-gray-800 shadow'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-weprom-red text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
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

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
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

                    <div className="bg-white/50 dark:bg-weprom-dark/50 backdrop-blur-sm rounded-xl p-4 border border-weprom-gray-200 dark:border-weprom-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <MessageSquare className="w-5 h-5 text-weprom-green" />
                        <span className="text-xs px-2 py-1 rounded-full bg-weprom-green/10 text-weprom-green">Mensajes</span>
                      </div>
                      <p className="text-xs text-weprom-gray-600 dark:text-weprom-gray-400">Nuevos</p>
                      <p className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mt-1">{unreadCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 shadow-lg border border-weprom-gray-200 dark:border-weprom-gray-800">
                <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-6">Acciones Rápidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

                  <button
                    onClick={() => setActiveTab('messages')}
                    className="group p-5 rounded-xl border border-weprom-gray-200 dark:border-weprom-gray-800 hover:border-weprom-green transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-weprom-green to-emerald-500 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-weprom-gray-900 dark:text-weprom-white">Ver Mensajes</h4>
                        <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">{unreadCount} sin leer</p>
                      </div>
                    </div>
                    <div className="flex items-center text-weprom-green text-sm">
                      <span>Revisar</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                  <button
                    onClick={() => { setActiveTab('reviews'); setShowReviewForm(true); }}
                    className="group p-5 rounded-xl border border-weprom-gray-200 dark:border-weprom-gray-800 hover:border-weprom-yellow transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-weprom-yellow to-weprom-orange flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-weprom-gray-900 dark:text-weprom-white">Nueva Reseña</h4>
                        <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">Agregar reseña de cliente</p>
                      </div>
                    </div>
                    <div className="flex items-center text-weprom-yellow text-sm">
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
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-white placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-400"
                          placeholder="Nombre de la campaña"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">Descripción</label>
                        <textarea
                          value={campaignForm.description}
                          onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-red focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-white placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-400 resize-none"
                          rows={4}
                          placeholder="Descripción de la campaña..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">
                          Imagen {campaignForm.image && !isCompressing && (
                            <span className="text-xs text-weprom-green ml-2">
                              ✓ Lista para subir
                            </span>
                          )}
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'campaign')}
                            className="hidden"
                            id="campaign-image"
                            disabled={isCompressing}
                          />
                          <label
                            htmlFor="campaign-image"
                            className={`flex-1 px-4 py-3.5 border-2 border-dashed rounded-xl cursor-pointer transition-all flex items-center justify-center gap-3 ${isCompressing
                              ? 'border-weprom-yellow bg-weprom-yellow/10'
                              : 'border-weprom-gray-300 dark:border-weprom-gray-800 hover:border-weprom-red'} 
                            bg-white dark:bg-weprom-dark`}
                          >
                            {isCompressing ? (
                              <>
                                <Loader2 className="w-5 h-5 text-weprom-yellow animate-spin" />
                                <div className="flex flex-col items-center">
                                  <span className="text-sm text-weprom-yellow font-semibold">
                                    Comprimiendo... {compressionProgress}%
                                  </span>
                                  <div className="w-32 h-1.5 bg-weprom-gray-200 dark:bg-weprom-gray-800 rounded-full mt-1 overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-weprom-red to-weprom-yellow transition-all duration-300"
                                      style={{ width: `${compressionProgress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <Upload className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
                                <span className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                                  Seleccionar imagen
                                </span>
                              </>
                            )}
                          </label>
                        </div>

                        {isCompressing && compressionProgress > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-weprom-gray-500 dark:text-weprom-gray-400 mb-1">
                              <span>Comprimiendo imagen...</span>
                              <span>{compressionProgress}%</span>
                            </div>
                            <div className="w-full h-2 bg-weprom-gray-200 dark:bg-weprom-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-weprom-red to-weprom-yellow transition-all duration-300"
                                style={{ width: `${compressionProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {campaignForm.image && <FileSizeInfo file={campaignForm.image} />}

                        {imagePreview && (
                          <div className="mt-4 relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded-xl border border-weprom-gray-200 dark:border-weprom-gray-800"
                            />
                            {isCompressing && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                              </div>
                            )}
                            {compressionProgress === 100 && !isCompressing && (
                              <div className="absolute top-2 right-2 bg-gradient-to-r from-weprom-green to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                                <CheckCircle className="w-3 h-3" />
                                Comprimida
                              </div>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400 mt-2">
                          La imagen será automáticamente comprimida a máximo 500KB. Formatos soportados: JPEG, PNG, WebP, GIF.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          onClick={handleSaveCampaign}
                          disabled={loading || isCompressing}
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
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">
                          Nombre del Proyecto
                        </label>
                        <input
                          type="text"
                          value={projectForm.name}
                          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-blue focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-white placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-400"
                          placeholder="Nombre del proyecto"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">
                          Categoría
                        </label>
                        <input
                          type="text"
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-blue focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-white placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-400"
                          placeholder="Ej: Diseño Gráfico, Marketing Digital, Desarrollo Web..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">
                          Descripción
                        </label>
                        <textarea
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-blue focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-white placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-400 resize-none"
                          rows={4}
                          placeholder="Descripción del proyecto..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">
                          Imagen {projectForm.image && !isCompressing && (
                            <span className="text-xs text-weprom-green ml-2">
                              ✓ Lista para subir
                            </span>
                          )}
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'project')}
                            className="hidden"
                            id="project-image"
                            disabled={isCompressing}
                          />
                          <label
                            htmlFor="project-image"
                            className={`flex-1 px-4 py-3.5 border-2 border-dashed rounded-xl cursor-pointer transition-all flex items-center justify-center gap-3 ${isCompressing
                              ? 'border-weprom-yellow bg-weprom-yellow/10'
                              : 'border-weprom-gray-300 dark:border-weprom-gray-800 hover:border-weprom-blue'} 
            bg-white dark:bg-weprom-dark`}
                          >
                            {isCompressing ? (
                              <>
                                <Loader2 className="w-5 h-5 text-weprom-yellow animate-spin" />
                                <div className="flex flex-col items-center">
                                  <span className="text-sm text-weprom-yellow font-semibold">
                                    Comprimiendo... {compressionProgress}%
                                  </span>
                                  <div className="w-32 h-1.5 bg-weprom-gray-200 dark:bg-weprom-gray-800 rounded-full mt-1 overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-weprom-blue to-weprom-green transition-all duration-300"
                                      style={{ width: `${compressionProgress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <Upload className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400" />
                                <span className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                                  Seleccionar imagen
                                </span>
                              </>
                            )}
                          </label>
                        </div>

                        {isCompressing && compressionProgress > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-weprom-gray-500 dark:text-weprom-gray-400 mb-1">
                              <span>Comprimiendo imagen...</span>
                              <span>{compressionProgress}%</span>
                            </div>
                            <div className="w-full h-2 bg-weprom-gray-200 dark:bg-weprom-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-weprom-blue to-weprom-green transition-all duration-300"
                                style={{ width: `${compressionProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {projectForm.image && <FileSizeInfo file={projectForm.image} />}

                        {imagePreview && (
                          <div className="mt-4 relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded-xl border border-weprom-gray-200 dark:border-weprom-gray-800"
                            />
                            {isCompressing && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                              </div>
                            )}
                            {compressionProgress === 100 && !isCompressing && (
                              <div className="absolute top-2 right-2 bg-gradient-to-r from-weprom-green to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                                <CheckCircle className="w-3 h-3" />
                                Comprimida
                              </div>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400 mt-2">
                          La imagen será automáticamente comprimida a máximo 500KB. Formatos soportados: JPEG, PNG, WebP, GIF.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          onClick={handleSaveProject}
                          disabled={loading || isCompressing}
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
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-weprom-blue/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                              {project.category || 'General'}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-extrabold text-lg text-weprom-gray-900 dark:text-weprom-white mb-2 truncate">{project.name}</h3>
                          {project.description && (
                            <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400 mb-4 line-clamp-2">
                              {project.description}
                            </p>
                          )}
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

          {activeTab === 'messages' && (
            <div>
              <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 shadow-lg border border-weprom-gray-200 dark:border-weprom-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="h-0.5 w-6 bg-gradient-to-r from-weprom-purple to-weprom-pink"></div>
                      <span className="text-sm font-semibold text-weprom-purple uppercase tracking-widest">
                        Mensajes de Contacto
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                      Gestión de Mensajes
                    </h2>
                    <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400 mt-2">
                      {unreadCount > 0 ? `${unreadCount} mensaje${unreadCount > 1 ? 's' : ''} sin leer` : 'Todos los mensajes han sido leídos'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={loadContacts}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-weprom-gray-600 to-weprom-gray-800 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                    >
                      <Loader2 className={`w-4 h-4 ${loadingContacts ? 'animate-spin' : ''}`} />
                      {loadingContacts ? 'Cargando...' : 'Actualizar'}
                    </button>
                  </div>
                </div>

                {loadingContacts ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-weprom-purple border-transparent"></div>
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-weprom-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-2">
                      No hay mensajes
                    </h3>
                    <p className="text-weprom-gray-500 dark:text-weprom-gray-400">
                      Aún no has recibido mensajes de contacto.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-weprom-gray-200 dark:border-weprom-gray-800">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-weprom-gray-50 dark:bg-weprom-dark border-b border-weprom-gray-200 dark:border-weprom-gray-800">
                            <th className="text-left py-4 px-6 text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">
                              Nombre
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">
                              Email
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">
                              Teléfono
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">
                              Estado
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">
                              Fecha
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-weprom-gray-900 dark:text-weprom-white">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {contacts.map((contact) => (
                            <tr
                              key={contact.id}
                              className={`border-b border-weprom-gray-100 dark:border-weprom-gray-800 hover:bg-weprom-gray-50 dark:hover:bg-weprom-dark/50 transition-colors ${contact.status === 'unread' ? 'bg-weprom-red/5 dark:bg-weprom-red/10' : ''}`}
                            >
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${contact.status === 'unread' ? 'bg-weprom-red' : 'bg-weprom-gray-400'}`}></div>
                                  <div>
                                    <p className="font-semibold text-weprom-gray-900 dark:text-weprom-white">
                                      {contact.name}
                                    </p>
                                    {contact.company && (
                                      <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">
                                        {contact.company}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-weprom-gray-700 dark:text-weprom-gray-300">
                                  {contact.email}
                                </p>
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-weprom-gray-700 dark:text-weprom-gray-300">
                                  {contact.phone}
                                </p>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
                                  {getStatusText(contact.status)}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                                  {formatDate(contact.created_at)}
                                </p>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleViewContact(contact)}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-weprom-blue/10 text-weprom-blue rounded-lg hover:bg-weprom-blue/20 transition-colors text-sm"
                                  >
                                    <Eye className="w-4 h-4" />
                                    Ver
                                  </button>
                                  {contact.status !== 'replied' && (
                                    <button
                                      onClick={() => updateContactStatus(contact.id, 'replied')}
                                      className="flex items-center gap-2 px-3 py-1.5 bg-weprom-green/10 text-weprom-green rounded-lg hover:bg-weprom-green/20 transition-colors text-sm"
                                    >
                                      <Check className="w-4 h-4" />
                                      Respondido
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {contacts.length > 0 && (
                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-weprom-gray-600 dark:text-weprom-gray-400">
                    <div>
                      Mostrando {contacts.length} mensaje{contacts.length > 1 ? 's' : ''}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-weprom-red"></div>
                        <span>No leído</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-weprom-blue"></div>
                        <span>Leído</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-weprom-green"></div>
                        <span>Respondido</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="bg-white dark:bg-weprom-dark-gray rounded-2xl p-6 shadow-lg border border-weprom-gray-200 dark:border-weprom-gray-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="h-0.5 w-6 bg-gradient-to-r from-weprom-yellow to-weprom-orange"></div>
                      <span className="text-sm font-semibold text-weprom-yellow uppercase tracking-widest">
                        Reseñas de Clientes
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                      Gestión de Reseñas
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-weprom-yellow to-weprom-orange text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    Nueva Reseña
                  </button>
                </div>

                {showReviewForm ? (
                  <div className="bg-gradient-to-br from-weprom-gray-50 to-white dark:from-weprom-dark dark:to-weprom-dark-gray rounded-2xl p-6 border-2 border-weprom-yellow/20">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white">
                        {editingReview ? 'Editar Reseña' : 'Nueva Reseña'}
                      </h3>
                      <button onClick={resetReviewForm} className="text-weprom-gray-400 hover:text-weprom-yellow transition-colors">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">
                          Nombre del Cliente
                        </label>
                        <input
                          type="text"
                          value={reviewForm.name}
                          onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-yellow focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-white placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-400"
                          placeholder="Nombre completo del cliente"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">
                          Calificación (Estrellas)
                        </label>
                        <div className="flex items-center gap-4">
                          <StarRating
                            rating={reviewForm.rating}
                            onChange={(rating) => setReviewForm({ ...reviewForm, rating })}
                            editable={true}
                          />
                          <span className="text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300">
                            {reviewForm.rating}/5
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">
                          Ubicación
                        </label>
                        <input
                          type="text"
                          value={reviewForm.location}
                          onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-yellow focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-white placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-400"
                          placeholder="Ej: Ciudad, País"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-3">
                          Reseña
                        </label>
                        <textarea
                          value={reviewForm.review}
                          onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white dark:bg-weprom-dark border border-weprom-gray-300 dark:border-weprom-gray-800 rounded-xl focus:ring-2 focus:ring-weprom-yellow focus:border-transparent outline-none transition-all hover:border-weprom-gray-400 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-white placeholder:text-weprom-gray-500 dark:placeholder:text-weprom-gray-400 resize-none"
                          rows={4}
                          placeholder="Reseña del cliente..."
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          onClick={handleSaveReview}
                          disabled={loading}
                          className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-weprom-yellow to-weprom-orange text-white px-6 py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                          {loading ? 'Guardando...' : (editingReview ? 'Actualizar' : 'Crear Reseña')}
                        </button>
                        <button
                          onClick={resetReviewForm}
                          className="px-6 py-3.5 bg-weprom-gray-100 dark:bg-weprom-gray-900 hover:bg-weprom-gray-200 dark:hover:bg-weprom-gray-800 text-weprom-gray-700 dark:text-weprom-gray-300 rounded-xl font-semibold transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="group bg-white dark:bg-weprom-dark-gray border-2 border-weprom-gray-200 dark:border-weprom-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-weprom-yellow p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-extrabold text-weprom-gray-900 dark:text-weprom-white mb-1">
                              {review.name}
                            </h3>
                            {review.location && (
                              <div className="flex items-center gap-1 text-sm text-weprom-gray-500 dark:text-weprom-gray-400">
                                <Building className="w-4 h-4" />
                                {review.location}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <StarRating rating={review.rating} />
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="text-weprom-gray-600 dark:text-weprom-gray-400 italic line-clamp-3">
                            "{review.review}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-weprom-gray-500 dark:text-weprom-gray-400">
                            {formatDate(review.created_at)}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditReview(review)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-weprom-gray-100 dark:bg-weprom-gray-900 hover:bg-weprom-gray-200 dark:hover:bg-weprom-gray-800 text-weprom-gray-700 dark:text-weprom-gray-300 rounded-lg font-semibold transition-all text-sm"
                            >
                              <Edit2 className="w-4 h-4" />
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="flex items-center justify-center bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 p-1.5 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {reviews.length === 0 && !showReviewForm && (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 text-weprom-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-weprom-gray-700 dark:text-weprom-gray-300 mb-2">
                      No hay reseñas
                    </h3>
                    <p className="text-weprom-gray-500 dark:text-weprom-gray-400 mb-6">
                      Aún no has agregado reseñas de clientes.
                    </p>
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-weprom-yellow to-weprom-orange text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      Crear Primera Reseña
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 py-6 border-t border-weprom-gray-200 dark:border-weprom-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm font-light text-weprom-gray-600 dark:text-weprom-gray-400">
                WeProm Dashboard v1.1
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