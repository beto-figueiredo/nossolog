import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Check, Truck, CreditCard, Trash2, MapPin, ChevronRight, Star, Filter, Instagram, Linkedin, Facebook, Phone, Mail } from 'lucide-react';

// --- BRAND ASSETS & COMPONENTS ---

// O Logo Aprovado (Versão Aumentada e Ajustada)
const Logo = ({ className = "" }) => (
  <div className={`flex items-center font-brand ${className}`}>
    <span className="text-3xl text-slate-600 font-medium tracking-wide mr-0.5">nosso</span>
    <span className="text-3xl text-slate-900 font-black tracking-tight">log</span>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="ml-1.5 mb-1.5">
        <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" stroke="#F97316" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// --- MOCK DATA ---

const PRODUCTS = [
  {
    id: 1,
    name: "Sanitizante Hospitalar Pro 5L",
    category: "Saneantes",
    price: 149.90,
    image: "/api/placeholder/400/400", 
    rating: 4.9,
    reviews: 128,
    badge: "Mais Vendido"
  },
  {
    id: 2,
    name: "Scanner Código de Barras Wireless",
    category: "Tecnologia",
    price: 289.00,
    image: "/api/placeholder/400/400",
    rating: 4.7,
    reviews: 54,
    badge: "Tech"
  },
  {
    id: 3,
    name: "Caixa Organizadora Logística 50L",
    category: "Logística",
    price: 45.50,
    image: "/api/placeholder/400/400",
    rating: 4.8,
    reviews: 210,
    badge: null
  },
  {
    id: 4,
    name: "Kit Higiene Corporativa (50 un)",
    category: "Saneantes",
    price: 890.00,
    image: "/api/placeholder/400/400",
    rating: 5.0,
    reviews: 12,
    badge: "B2B"
  },
  {
    id: 5,
    name: "Impressora Térmica de Etiquetas",
    category: "Tecnologia",
    price: 1250.00,
    image: "/api/placeholder/400/400",
    rating: 4.6,
    reviews: 89,
    badge: "Frete Grátis"
  },
  {
    id: 6,
    name: "Filme Stretch 500mm x 200m",
    category: "Logística",
    price: 32.90,
    image: "/api/placeholder/400/400",
    rating: 4.9,
    reviews: 340,
    badge: "Promoção"
  }
];

// --- APP COMPONENT ---

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Cart Logic
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // Filtering
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white sticky top-0 z-40 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo & Menu Trigger */}
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Abrir Menu"
              >
                <Menu size={28} />
              </button>
              
              <div onClick={() => setCurrentView('home')} className="cursor-pointer hover:opacity-90 transition-opacity">
                 {/* Ajuste de escala do logo no mobile para não quebrar layout */}
                 <div className="scale-90 md:scale-100 origin-left">
                    <Logo />
                 </div>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="O que sua empresa precisa hoje?"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
               <button 
                className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors group"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={28} className="text-slate-700 group-hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        
        {currentView === 'home' && (
          <>
            {/* Mobile Search Bar (Ergonomic Fix: Visible on Mobile) */}
            <div className="md:hidden mb-6">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Hero Section */}
            <div className="mb-10 space-y-8">
              <div className="bg-slate-900 rounded-2xl p-6 md:p-12 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between min-h-[300px] md:min-h-[400px]">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                 
                 <div className="relative z-10 max-w-xl flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Logística & Tecnologia <br/><span className="text-orange-500">Unificadas.</span></h1>
                    <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto md:mx-0">De saneantes profissionais a hardware de ponta. Tudo para sua operação rodar suave.</p>
                    <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                      Ver Catálogo B2B
                    </button>
                 </div>

                 <div className="hidden md:flex relative z-10 flex-1 h-full items-center justify-center mt-8 md:mt-0">
                    <img 
                      src="/api/placeholder/500/500" 
                      alt="Personagem Nosso Log com produtos" 
                      className="object-contain max-h-[350px] drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 animate-bounce delay-700">
                        <Truck size={24} className="text-orange-400" />
                    </div>
                    <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 animate-bounce delay-1000">
                        <Check size={24} className="text-green-400" />
                    </div>
                 </div>
              </div>

              {/* Category Pills - ERGONOMIC UPDATE */}
              <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {['Todos', 'Saneantes', 'Tecnologia', 'Logística', 'EPIs'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-8 py-3 rounded-full text-lg font-bold whitespace-nowrap transition-all flex-shrink-0 touch-manipulation ${
                      selectedCategory === cat 
                        ? 'bg-slate-900 text-white shadow-lg transform scale-105' 
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 flex flex-col overflow-hidden">
                  
                  <div className="aspect-square bg-slate-100 relative overflow-hidden">
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider backdrop-blur-sm z-10 shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-500">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 mix-blend-multiply" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-sm text-orange-600 font-bold uppercase tracking-wider mb-2">{product.category}</div>
                    
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-6">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-slate-500 font-medium">{product.rating} ({product.reviews})</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                      <div>
                        <span className="block text-xs text-slate-400 uppercase tracking-wide">Preço un.</span>
                        <span className="text-2xl font-black text-slate-900">R$ {product.price.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 p-4 rounded-xl transition-all duration-300 shadow-sm active:scale-95 touch-manipulation"
                      >
                        <ShoppingCart size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ... Checkout and Success Views remain the same structure ... */}
        {currentView === 'checkout' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <button onClick={() => setCurrentView('home')} className="flex items-center text-slate-500 hover:text-orange-600 mb-6 font-medium p-2">
              <ChevronRight className="rotate-180 mr-1" size={20} /> Voltar as compras
            </button>
            <div className="flex flex-col md:flex-row gap-8">
               {/* Form ... */}
               <div className="flex-1 space-y-8">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm">1</span>
                    Identificação & Entrega
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                       <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ / CPF</label>
                       <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="00.000.000/0001-91" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                       <label className="block text-sm font-medium text-slate-700 mb-1">CEP</label>
                       <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="00000-000" />
                    </div>
                     <div className="col-span-2 md:col-span-1">
                       <label className="block text-sm font-medium text-slate-700 mb-1">Número</label>
                       <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="123" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm">2</span>
                    Pagamento
                  </h2>
                   <div className="space-y-3">
                      <label className="flex items-center p-4 border border-orange-500 bg-orange-50 rounded-lg cursor-pointer transition-all active:bg-orange-100">
                        <input type="radio" name="payment" className="w-5 h-5 text-orange-600 focus:ring-orange-500" defaultChecked />
                        <span className="ml-3 font-medium text-slate-900">Pix (5% de desconto)</span>
                        <div className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Recomendado</div>
                      </label>
                      <label className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-all active:bg-slate-100">
                        <input type="radio" name="payment" className="w-5 h-5 text-orange-600 focus:ring-orange-500" />
                        <span className="ml-3 font-medium text-slate-900">Cartão de Crédito Corporativo</span>
                      </label>
                   </div>
                </div>
              </div>
              {/* Order Summary ... */}
              <div className="w-full md:w-96">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 md:sticky md:top-24">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">Resumo do Pedido</h3>
                  <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex gap-3">
                           <div className="w-10 h-10 bg-slate-100 rounded-md overflow-hidden"><img src={item.image} className="w-full h-full object-cover" /></div>
                           <div><span className="block font-medium text-slate-700">{item.qty}x {item.name}</span><span className="text-slate-400 text-xs">{item.category}</span></div>
                        </div>
                        <span className="font-semibold text-slate-900">R$ {(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                    <div className="flex justify-between text-slate-500"><span>Total</span><span>R$ {(cartTotal * 0.95).toFixed(2)}</span></div>
                  </div>
                  <button onClick={() => setCurrentView('success')} className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 touch-manipulation"><Check size={20} /> Confirmar Pedido</button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentView === 'success' && (
           <div className="flex flex-col items-center justify-center py-20 animate-fadeIn px-4">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8"><Check size={48} className="text-green-600" /></div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 text-center">Pedido Recebido!</h2>
              <button onClick={() => { setCart([]); setCurrentView('home'); }} className="bg-slate-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-800 transition-colors w-full md:w-auto">Voltar para a Loja</button>
           </div>
        )}

      </main>

      {/* --- FOOTER (NOVO) --- */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-12 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Coluna 1: Marca */}
                <div className="col-span-1 md:col-span-1">
                     <div className="flex items-center font-brand mb-6">
                        <span className="text-2xl text-slate-400 font-medium tracking-wide mr-0.5">nosso</span>
                        <span className="text-2xl text-white font-black tracking-tight">log</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1.5 mb-1.5">
                            <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" stroke="#F97316" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        A plataforma B2B que une a eficiência da logística com a inovação tecnológica. Do estoque à entrega.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"><Instagram size={24} /></a>
                        <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Linkedin size={24} /></a>
                        <a href="#" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-800 hover:text-white transition-all"><Facebook size={24} /></a>
                    </div>
                </div>

                {/* Coluna 2: Links */}
                <div>
                    <h4 className="text-white font-bold mb-6">Navegação</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-orange-400 transition-colors py-1 block">Início</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition-colors py-1 block">Catálogo Completo</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition-colors py-1 block">Para Indústrias</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition-colors py-1 block">Blog Logística</a></li>
                    </ul>
                </div>

                {/* Coluna 3: Suporte */}
                <div>
                    <h4 className="text-white font-bold mb-6">Suporte B2B</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-orange-400 transition-colors py-1 block">Central de Ajuda</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition-colors py-1 block">Rastrear Pedido</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition-colors py-1 block">Política de Privacidade</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition-colors py-1 block">Termos de Uso</a></li>
                    </ul>
                </div>

                {/* Coluna 4: Contato */}
                <div>
                    <h4 className="text-white font-bold mb-6">Fale Conosco</h4>
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-orange-500" />
                            <span>0800 123 4567</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-orange-500" />
                            <span>comercial@nossolog.com.br</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-orange-500 mt-1" />
                            <span>Av. Tecnologia, 1000<br/>São Paulo - SP</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                <p>&copy; 2025 Nosso Log Tecnologia e Logística Ltda. Todos os direitos reservados.</p>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span>Segurança:</span>
                    <div className="flex gap-2 opacity-50">
                        <div className="h-6 w-10 bg-slate-700 rounded"></div>
                        <div className="h-6 w-10 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
      </footer>

      {/* --- MENU DRAWER (SIDEBAR) --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-start">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          
          <div className="relative w-80 bg-white h-full shadow-2xl flex flex-col animate-slideInLeft transform transition-transform">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
               <div className="flex items-center font-brand">
                    <span className="text-xl text-slate-400 font-medium tracking-wide mr-0.5">nosso</span>
                    <span className="text-xl text-white font-black tracking-tight">log</span>
               </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
               {/* Seção Usuário */}
               <div className="px-6 pb-6 mb-6 border-b border-slate-100">
                   <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                           NL
                       </div>
                       <div>
                           <p className="font-bold text-slate-900">Olá, Visitante</p>
                           <p className="text-xs text-slate-500">Faça login para ver preços especiais</p>
                       </div>
                   </div>
                   <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 rounded-lg text-sm transition-colors">
                       Entrar / Cadastrar
                   </button>
               </div>

               {/* Links de Menu (Simulados) - Aumentados para toque */}
               <div className="px-2 space-y-1">
                   <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 mt-4">Departamentos</p>
                   {['Saneantes Profissionais', 'Tecnologia & Automação', 'Logística & Embalagem', 'EPIs & Segurança', 'Escritório & Papelaria'].map((item) => (
                       <a key={item} href="#" className="block px-4 py-4 text-slate-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg font-medium transition-colors text-base">
                           {item}
                       </a>
                   ))}

                   <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 mt-6">Minha Conta</p>
                   {['Meus Pedidos', 'Faturas', 'Central de Devoluções', 'Configurações'].map((item) => (
                       <a key={item} href="#" className="block px-4 py-4 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors text-base">
                           {item}
                       </a>
                   ))}
               </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100">
                <button className="flex items-center justify-center gap-2 text-slate-500 hover:text-orange-600 font-medium w-full p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <Phone size={18} /> Central de Vendas
                </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CART DRAWER (SIDEBAR) --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingCart size={20} className="text-orange-500" /> 
                Seu Carrinho ({cartCount})
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <ShoppingCart size={64} strokeWidth={1} />
                  <p>Seu carrinho está vazio.</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-orange-600 font-bold hover:underline">Começar a comprar</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200"><img src={item.image} className="w-full h-full object-cover mix-blend-multiply" /></div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{item.name}</h4>
                      <p className="text-xs text-slate-400 mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">R$ {item.price.toFixed(2)}</span>
                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-2 py-1 border border-slate-200">
                          <button onClick={() => updateQty(item.id, -1)} className="text-slate-400 hover:text-slate-900 p-2">-</button>
                          <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="text-slate-400 hover:text-slate-900 p-2">+</button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 self-start p-2 transition-colors"><Trash2 size={20} /></button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between items-center mb-6"><span className="text-slate-500">Subtotal</span><span className="text-2xl font-black text-slate-900">R$ {cartTotal.toFixed(2)}</span></div>
                <button onClick={() => { setIsCartOpen(false); setCurrentView('checkout'); }} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 touch-manipulation">Finalizar Compra <ChevronRight size={20} /></button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}