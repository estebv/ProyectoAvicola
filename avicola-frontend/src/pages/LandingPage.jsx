import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Users, 
  Globe, 
  Award 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-200 rounded-xl flex items-center justify-center shadow-lg shadow-brand-100">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900">
                AVICOLA<span className="text-brand-200">PRO</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-semibold hover:text-brand-200 transition-colors">Inicio</a>
              <a href="#nosotros" className="text-sm font-semibold hover:text-brand-200 transition-colors">Nosotros</a>
              <a href="#servicios" className="text-sm font-semibold hover:text-brand-200 transition-colors">Servicios</a>
              <Link to="/login" className="text-sm font-semibold hover:text-brand-200 transition-colors">Iniciar Sesión</Link>
              <Link 
                to="/login?mode=register" 
                className="bg-brand-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-800 transition-all active:scale-95 shadow-lg shadow-brand-900/20"
              >
                Empezar Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs font-bold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-200"></span>
                </span>
                TECNOLOGÍA AVÍCOLA 2026
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8">
                El futuro de la <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-200 to-brand-400">
                  Gestión Avícola
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
                Optimiza tu producción, controla la salud de tus aves y maximiza tus beneficios con nuestra plataforma inteligente de gestión integral.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/login?mode=register" 
                  className="group flex items-center justify-center gap-2 bg-brand-200 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-brand-400 transition-all shadow-xl shadow-brand-200/30"
                >
                  Comenzar ahora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/login" 
                  className="flex items-center justify-center gap-2 bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-2xl text-lg font-bold hover:border-brand-100 transition-all"
                >
                  Ver Demo
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-10"></div>
              <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 rotate-2">
                <img 
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=1000" 
                  alt="Dashboard Preview" 
                  className="rounded-[2rem] w-full"
                />
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 max-w-[200px] -rotate-6 hidden md:block">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-400">Eficiencia</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">+45%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Usuarios Activos', value: '2.5k+' },
              { label: 'Granjas Digitalizadas', value: '500+' },
              { label: 'Aves Monitoreadas', value: '1M+' },
              { label: 'Países', value: '12+' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-brand-200 font-bold tracking-widest text-sm uppercase mb-4">Sobre Nosotros</h2>
            <h3 className="text-4xl lg:text-5xl font-black mb-6 text-gray-900">
              Liderando la revolución tecnológica en la avicultura
            </h3>
            <p className="text-lg text-gray-600">
              AvicolaPro nació con la misión de empoderar a los productores avícolas mediante herramientas digitales de última generación. Creemos en una industria más eficiente, sostenible y rentable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-brand-200" />,
                title: "Control Total",
                desc: "Monitorea cada aspecto de tu granja en tiempo real, desde el alimento hasta la salud de cada lote."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-brand-200" />,
                title: "Análisis Inteligente",
                desc: "Utilizamos IA para predecir tendencias de producción y detectar anomalías antes de que ocurran."
              },
              {
                icon: <Users className="w-8 h-8 text-brand-200" />,
                title: "Soporte Experto",
                desc: "Un equipo de especialistas siempre disponible para ayudarte a optimizar tus procesos."
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-brand-100 hover:shadow-2xl hover:shadow-brand-100/10 transition-all group">
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section id="servicios" className="py-24 lg:py-32 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-800 skew-x-12 translate-x-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
                ¿Por qué elegir <br />
                AvicolaPro?
              </h2>
              <div className="space-y-6">
                {[
                  "Interfaz intuitiva diseñada para el trabajo en campo",
                  "Reportes automatizados listos para descargar",
                  "Integración con sensores IoT de temperatura y humedad",
                  "Gestión multi-galpón centralizada",
                  "Alertas instantáneas ante cualquier emergencia"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-200 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-medium text-brand-50">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link 
                  to="/login?mode=register" 
                  className="inline-flex items-center gap-2 bg-white text-brand-900 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-brand-50 transition-all shadow-xl shadow-black/20"
                >
                  Empieza hoy mismo
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                  <Award className="w-10 h-10 text-brand-100 mb-4" />
                  <div className="text-sm font-bold opacity-60 mb-2">Premios 2025</div>
                  <div className="text-xl font-bold">Líder en Agrotech</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                  <Globe className="w-10 h-10 text-brand-100 mb-4" />
                  <div className="text-sm font-bold opacity-60 mb-2">Presencia</div>
                  <div className="text-xl font-bold">Alcance Global</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-brand-200 p-8 rounded-3xl shadow-2xl">
                  <div className="text-5xl font-black mb-4">99%</div>
                  <div className="text-lg font-bold">Satisfacción de clientes</div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                  <div className="text-3xl font-black mb-2">24/7</div>
                  <div className="text-sm font-bold opacity-60">Monitoreo constante y soporte técnico</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-brand-200 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="text-2xl font-black tracking-tight text-gray-900">
                  AVICOLA<span className="text-brand-200">PRO</span>
                </span>
              </div>
              <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                Transformando la industria avícola con innovación digital y compromiso con la excelencia operativa.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                <div className="w-10 h-10 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center hover:bg-brand-50 hover:border-brand-100 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">FB</span>
                </div>
                <div className="w-10 h-10 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center hover:bg-brand-50 hover:border-brand-100 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">X</span>
                </div>
                <div className="w-10 h-10 bg-gray-50 rounded-full border border-gray-100 flex items-center justify-center hover:bg-brand-50 hover:border-brand-100 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">LN</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Plataforma</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-brand-200 transition-colors">Características</a></li>
                <li><a href="#" className="text-gray-500 hover:text-brand-200 transition-colors">Precios</a></li>
                <li><a href="#" className="text-gray-500 hover:text-brand-200 transition-colors">Seguridad</a></li>
                <li><a href="#" className="text-gray-500 hover:text-brand-200 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Empresa</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-brand-200 transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-500 hover:text-brand-200 transition-colors">Contacto</a></li>
                <li><a href="#" className="text-gray-500 hover:text-brand-200 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-500 hover:text-brand-200 transition-colors">Carreras</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-gray-100">
            <p className="text-gray-400 text-sm">
              © 2026 AvicolaPro. Todos los derechos reservados.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 text-xs hover:text-gray-900 transition-colors">Términos y Condiciones</a>
              <a href="#" className="text-gray-400 text-xs hover:text-gray-900 transition-colors">Privacidad</a>
              <a href="#" className="text-gray-400 text-xs hover:text-gray-900 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
