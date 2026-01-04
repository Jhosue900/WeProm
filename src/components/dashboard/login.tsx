import { useState, FormEvent, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2, Sparkles, Shield, Zap, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://we-prom-backend.vercel.app';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        navigate('/dashboard');
        
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-weprom-gray-50 via-white to-weprom-gray-100 dark:from-weprom-dark dark:via-weprom-dark-gray dark:to-weprom-dark">
      {/* Selector de tema flotante */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-xl bg-white/80 dark:bg-weprom-dark/80 backdrop-blur-sm border border-weprom-gray-200 dark:border-weprom-gray-700 hover:border-weprom-yellow shadow-lg transition-all duration-300 group"
          aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-weprom-yellow group-hover:rotate-12 transition-transform" />
          ) : (
            <Moon className="w-5 h-5 text-weprom-gray-600 dark:text-weprom-gray-400 group-hover:rotate-12 transition-transform" />
          )}
        </button>
      </div>

      {/* Elementos decorativos de fondo mejorados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradientes animados */}
        <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-weprom-red/20 via-weprom-yellow/20 to-transparent dark:from-weprom-red/10 dark:via-weprom-yellow/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-weprom-blue/20 via-weprom-green/20 to-transparent dark:from-weprom-blue/10 dark:via-weprom-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-weprom-purple/10 to-transparent dark:from-weprom-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-12">
        <div className="max-w-[480px] mx-auto">
          {/* Tarjeta del formulario mejorada */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue rounded-3xl opacity-30 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative bg-white dark:bg-weprom-dark-gray rounded-3xl shadow-2xl overflow-hidden border border-weprom-gray-200/50 dark:border-weprom-gray-800/50 backdrop-blur-xl">
              {/* Header con gradiente mejorado */}
              <div className="relative p-8 text-center bg-gradient-to-br from-weprom-red via-weprom-yellow to-weprom-red overflow-hidden">
                {/* Selector de tema en header (solo móvil) */}
                <div className="md:hidden absolute top-4 right-4">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 transition-colors"
                    aria-label={isDarkMode ? "Modo claro" : "Modo oscuro"}
                  >
                    {isDarkMode ? (
                      <Sun className="w-4 h-4 text-white" />
                    ) : (
                      <Moon className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>

                {/* Efectos de fondo */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.2),transparent_50%)]"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 transform hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-xl">
                    <LogIn className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                  
                  <h2 className="text-3xl font-black mb-2 text-white drop-shadow-md">
                    ¡Bienvenido de vuelta!
                  </h2>
                  
                  <div className="flex items-center justify-center gap-2 text-white/95 font-medium">
                    <Zap className="w-4 h-4" />
                    <p className="text-sm">Acceso exclusivo para administradores</p>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <div className="p-8 space-y-6">
                {/* Indicador de tema (solo desktop) */}
                <div className="hidden md:flex items-center justify-center gap-3 p-3 bg-weprom-gray-100 dark:bg-weprom-gray-900 rounded-xl">
                  <div className="flex items-center gap-2">
                    {isDarkMode ? (
                      <Sun className="w-4 h-4 text-weprom-yellow" />
                    ) : (
                      <Moon className="w-4 h-4 text-weprom-gray-600 dark:text-weprom-gray-400" />
                    )}
                    <span className="text-sm font-medium text-weprom-gray-700 dark:text-weprom-gray-300">
                      Tema: {isDarkMode ? 'Oscuro' : 'Claro'}
                    </span>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className="ml-2 text-sm font-semibold text-weprom-blue hover:text-weprom-red transition-colors"
                  >
                    Cambiar
                  </button>
                </div>

                {/* Mensaje de error mejorado */}
                {error && (
                  <div className="relative overflow-hidden bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-300 dark:border-red-700 rounded-2xl p-4 animate-shake">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">!</span>
                      </div>
                      <p className="text-red-700 dark:text-red-300 text-sm font-medium pt-1">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Campo Email mejorado */}
                  <div className="space-y-2 animate-fade-in">
                    <label className="block text-sm font-bold text-weprom-gray-700 dark:text-weprom-gray-300 ml-1">
                      Correo Electrónico
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-weprom-red/20 to-weprom-yellow/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-weprom-gray-400 group-focus-within:text-weprom-red transition-colors duration-300" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@weprom.com"
                          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-weprom-dark border-2 border-weprom-gray-200 dark:border-weprom-gray-800 rounded-xl focus:ring-4 focus:ring-weprom-red/20 focus:border-weprom-red outline-none transition-all duration-300 hover:border-weprom-gray-300 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-weprom-white placeholder:text-weprom-gray-400 dark:placeholder:text-weprom-gray-600 font-medium"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Campo Contraseña mejorado */}
                  <div className="space-y-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <label className="block text-sm font-bold text-weprom-gray-700 dark:text-weprom-gray-300 ml-1">
                      Contraseña
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-weprom-red/20 to-weprom-yellow/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-weprom-gray-400 group-focus-within:text-weprom-red transition-colors duration-300" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••"
                          className="w-full pl-12 pr-14 py-4 bg-white dark:bg-weprom-dark border-2 border-weprom-gray-200 dark:border-weprom-gray-800 rounded-xl focus:ring-4 focus:ring-weprom-red/20 focus:border-weprom-red outline-none transition-all duration-300 hover:border-weprom-gray-300 dark:hover:border-weprom-gray-700 text-weprom-gray-900 dark:text-weprom-white font-medium"
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg text-weprom-gray-400 hover:text-weprom-red hover:bg-weprom-red/10 transition-all duration-300"
                          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Botón de Login mejorado */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-red bg-[length:200%_100%] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:bg-[position:100%_0] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none animate-fade-in flex items-center justify-center gap-3 mt-8"
                    style={{ animationDelay: '200ms' }}
                  >
                    <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                        <span className="relative z-10 text-lg">Verificando acceso...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                        <span className="relative z-10 text-lg">Acceder al Panel</span>
                        <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform duration-300 relative z-10" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center pt-4">
                  <p className="text-xs text-weprom-gray-500 dark:text-weprom-gray-500 font-medium">
                    © 2025 WeProm Marketing
                  </p>
                  <p className="text-xs text-weprom-gray-400 dark:text-weprom-gray-600 mt-1">
                    Acceso restringido a personal autorizado
                  </p>
                </div>
              </div>

              {/* Barra decorativa inferior */}
              <div className="w-full h-1 bg-gradient-to-r from-weprom-red via-weprom-yellow to-weprom-blue"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}