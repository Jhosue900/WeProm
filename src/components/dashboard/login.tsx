import { useState, FormEvent } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onLoginSuccess, onSwitchToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    
    // Simulación de proceso de login
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      alert('¡Inicio de sesión exitoso!');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      alert('Inicio de sesión con Google simulado');
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 px-4">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Card de Login */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 hover:shadow-3xl transition-all duration-500 group">
          {/* Header con gradiente */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-weprom-pink to-purple-600 text-white text-center overflow-hidden">
            {/* Elementos decorativos animados */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse animation-delay-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-500">
                <LogIn className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Bienvenido de vuelta</h2>
              <p className="text-sm sm:text-base opacity-90">
                Inicia sesión en el Dashboard de WeProm
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Campo Email */}
              <div className="animate-fade-in animation-delay-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-weprom-pink transition-colors duration-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-weprom-pink focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="animate-fade-in animation-delay-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-weprom-pink transition-colors duration-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-weprom-pink focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-weprom-pink transition-colors duration-300"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              

              {/* Botón de Login */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-weprom-pink to-purple-600 text-white font-bold py-3 sm:py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed animate-fade-in animation-delay-500 flex items-center justify-center gap-3 shine-effect"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300" />
                    <span>Iniciar Sesión</span>
                  </>
                )}
                <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              
            </form>

            {/* Enlaces adicionales */}
            <div className="text-center mt-6 pt-6 border-t border-gray-100 animate-fade-in animation-delay-800">
              <p className="text-xs text-gray-500">
                Al iniciar sesión, aceptas nuestros{' '}
                <button 
                  type="button" 
                  className="text-weprom-pink hover:underline transition-colors duration-300"
                  onClick={() => alert('Términos y condiciones simulados')}
                >
                  Términos
                </button>{' '}
                y{' '}
                <button 
                  type="button" 
                  className="text-weprom-pink hover:underline transition-colors duration-300"
                  onClick={() => alert('Política de privacidad simulada')}
                >
                  Privacidad
                </button>
              </p>
            </div>
          </div>

          {/* Efectos decorativos */}
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-weprom-pink/10 to-purple-600/10 rounded-full blur-2xl"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-cyan-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>
  );
}