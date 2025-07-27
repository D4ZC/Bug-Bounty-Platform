import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto h-screen">
        {/* Grid principal con 4 contenedores */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          
          {/* Contenedor izquierdo - Rectángulo alto gris oscuro */}
          <div className="lg:col-span-1 bg-gray-50 rounded-lg shadow-lg p-4">
            {/* Div 1 - 290px de alto */}
            <div 
              className="w-full h-[290px] bg-[#000000] rounded-lg mb-4 border-[7px] border-gray-300 pixel-card flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => navigate('/profile')}
            >
              {/* Diseño de perfil - Avatar con engranajes */}
              <div className="mb-4 relative">
                {/* Avatar circular central */}
                <div className="w-16 h-16 bg-white opacity-90 rounded-full relative z-10">
                  {/* Ojos */}
                  <div className="absolute top-4 left-3 w-2 h-2 bg-black opacity-80 rounded-full"></div>
                  <div className="absolute top-4 right-3 w-2 h-2 bg-black opacity-80 rounded-full"></div>
                  {/* Nariz */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black opacity-80"></div>
                  {/* Boca */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-black opacity-80 rounded-full"></div>
                </div>
                
                {/* Engranaje superior */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-600 opacity-90 rounded-full">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-white opacity-80"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-white opacity-80"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-1 bg-white opacity-80"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-1 bg-white opacity-80"></div>
                  <div className="absolute top-1 left-1 w-1 h-1 bg-white opacity-80"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white opacity-80"></div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-white opacity-80"></div>
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-white opacity-80"></div>
                </div>
                
                {/* Engranaje izquierdo */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-full -translate-y-1/2 w-6 h-6 bg-gray-600 opacity-90 rounded-full">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1.5 bg-white opacity-80"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1.5 bg-white opacity-80"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1 bg-white opacity-80"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1 bg-white opacity-80"></div>
                </div>
                
                {/* Engranaje derecho */}
                <div className="absolute right-1/2 top-1/2 transform translate-x-full -translate-y-1/2 w-6 h-6 bg-gray-600 opacity-90 rounded-full">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1.5 bg-white opacity-80"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1.5 bg-white opacity-80"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1 bg-white opacity-80"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1 bg-white opacity-80"></div>
                </div>
                
                {/* Engranaje inferior */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-gray-600 opacity-90 rounded-full">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-white opacity-80"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-white opacity-80"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-1 bg-white opacity-80"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-1 bg-white opacity-80"></div>
                  <div className="absolute top-1 left-1 w-1 h-1 bg-white opacity-80"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white opacity-80"></div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-white opacity-80"></div>
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-white opacity-80"></div>
                </div>
                
                {/* Líneas de conexión */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-500 opacity-60"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-500 opacity-60"></div>
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-500 opacity-60"></div>
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-500 opacity-60"></div>
              </div>
              <h2 className="text-white text-3xl font-bold pixel-text">PERFIL</h2>
            </div>
            
            {/* Div 2 - 160px de alto */}
            <div 
              className="w-full h-[160px] bg-[#8A3FFC] rounded-lg mb-4 border-[7px] border-gray-300 pixel-card flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => navigate('/mvp')}
            >
              <h2 className="text-white text-3xl font-bold pixel-text">MVP</h2>
            </div>
            
            {/* Div 3 - 100px de alto */}
            <div 
              className="w-full h-[100px] bg-[#24A148] rounded-lg border-[7px] border-gray-300 pixel-card flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => navigate('/gulag')}
            >
              <h2 className="text-white text-3xl font-bold pixel-text">GULAG</h2>
            </div>
          </div>
          
          {/* Contenedor derecho - Dividido en 2 filas */}
          <div className="lg:col-span-2 grid grid-rows-3 gap-4">
            
            {/* Fila superior - 2 cuadrados (más altos) */}
            <div className="row-span-2 grid grid-cols-2 gap-4">
              {/* Cuadrado púrpura */}
              <div className="bg-gray-50 rounded-lg shadow-lg p-4">
                {/* Div 1 del contenedor púrpura */}
                <div 
                  className="w-full h-[180px] bg-[#FF832B] rounded-lg mb-4 border-[7px] border-gray-300 pixel-card flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/users-score')}
                >
                  {/* Gráfica de 3 barras */}
                  <div className="flex items-end gap-3 mb-4">
                    <div className="w-6 bg-white rounded-sm" style={{ height: '30px' }}></div>
                    <div className="w-6 bg-white rounded-sm" style={{ height: '50px' }}></div>
                    <div className="w-6 bg-white rounded-sm" style={{ height: '40px' }}></div>
                  </div>
                  <h2 className="text-white text-3xl font-bold pixel-text">RANKING</h2>
                </div>
                
                {/* Div 2 del contenedor púrpura */}
                <div 
                  className="w-full h-[180px] bg-[#DA1E28] rounded-lg border-[7px] border-gray-300 pixel-card flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/shop')}
                >
                  {/* Carrito de compras pixel art */}
                  <div className="mb-4">
                    <div className="w-16 h-8 bg-white opacity-90 relative">
                      {/* Ruedas */}
                      <div className="absolute -bottom-1 left-1 w-3 h-3 bg-gray-600 opacity-90 rounded-full"></div>
                      <div className="absolute -bottom-1 right-1 w-3 h-3 bg-gray-600 opacity-90 rounded-full"></div>
                      {/* Mango */}
                      <div className="absolute -top-2 right-0 w-1 h-4 bg-white opacity-90"></div>
                      {/* Productos */}
                      <div className="absolute top-1 left-2 w-2 h-2 bg-yellow-400 opacity-90"></div>
                      <div className="absolute top-1 left-5 w-2 h-2 bg-green-400 opacity-90"></div>
                      <div className="absolute top-3 left-3 w-2 h-2 bg-blue-400 opacity-90"></div>
                    </div>
                  </div>
                  <h2 className="text-white text-3xl font-bold pixel-text">TIENDA</h2>
                </div>
              </div>
              
              {/* Cuadrado rojo */}
              <div className="bg-gray-50 rounded-lg shadow-lg p-4">
                {/* Div 1 del contenedor rojo */}
                <div 
                  className="w-full h-[180px] bg-[#161616] rounded-lg mb-4 border-[7px] border-gray-300 pixel-card flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/equipos')}
                >
                  {/* Diseño de equipos pixel art - Castillo con banderas */}
                  <div className="mb-4 relative">
                    {/* Castillo base */}
                    <div className="w-20 h-12 bg-white opacity-90 rounded-sm relative">
                      {/* Torres laterales */}
                      <div className="absolute -top-2 left-0 w-4 h-4 bg-white opacity-90 rounded-sm">
                        <div className="w-full h-1 bg-white opacity-60 mt-1"></div>
                        <div className="w-full h-1 bg-white opacity-60 mt-1"></div>
                      </div>
                      <div className="absolute -top-2 right-0 w-4 h-4 bg-white opacity-90 rounded-sm">
                        <div className="w-full h-1 bg-white opacity-60 mt-1"></div>
                        <div className="w-full h-1 bg-white opacity-60 mt-1"></div>
                      </div>
                      {/* Torre central */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-5 bg-white opacity-90 rounded-sm">
                        <div className="w-full h-1 bg-white opacity-60 mt-1"></div>
                        <div className="w-full h-1 bg-white opacity-60 mt-1"></div>
                        <div className="w-full h-1 bg-white opacity-60 mt-1"></div>
                      </div>
                      {/* Puerta */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-black opacity-80 rounded-t-sm"></div>
                      {/* Ventanas */}
                      <div className="absolute top-2 left-2 w-1 h-1 bg-black opacity-80"></div>
                      <div className="absolute top-2 right-2 w-1 h-1 bg-black opacity-80"></div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black opacity-80"></div>
                    </div>
                    {/* Banderas en las torres */}
                    <div className="absolute -top-4 left-1">
                      <div className="w-1 h-3 bg-red-500 opacity-90"></div>
                      <div className="w-2 h-2 bg-red-500 opacity-90 transform rotate-45 origin-bottom-left"></div>
                    </div>
                    <div className="absolute -top-4 right-1">
                      <div className="w-1 h-3 bg-blue-500 opacity-90"></div>
                      <div className="w-2 h-2 bg-blue-500 opacity-90 transform rotate-45 origin-bottom-left"></div>
                    </div>
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-4 bg-green-500 opacity-90"></div>
                      <div className="w-2 h-2 bg-green-500 opacity-90 transform rotate-45 origin-bottom-left"></div>
                    </div>
                    {/* Escudo del equipo en la base */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-white opacity-80 rounded-sm">
                      <div className="w-full h-0.5 bg-black opacity-60 mt-1"></div>
                      <div className="w-full h-0.5 bg-black opacity-60 mt-1"></div>
                    </div>
                  </div>
                  <h2 className="text-white text-3xl font-bold pixel-text">EQUIPOS</h2>
                </div>
                
                {/* Div 2 del contenedor rojo */}
                <div 
                  className="w-full h-[180px] bg-[#0F62FE] rounded-lg border-[7px] border-gray-300 pixel-card flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/duelos')}
                >
                  {/* Diseño de duelos - Arena circular con espadas */}
                  <div className="mb-4 relative">
                    {/* Arena circular */}
                    <div className="w-16 h-16 bg-white opacity-90 rounded-full relative">
                      {/* Líneas de la arena */}
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-600 opacity-80"></div>
                      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-600 opacity-80"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-gray-600 opacity-80 rounded-full"></div>
                    </div>
                    {/* Espada 1 - diagonal superior */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-1 h-12 bg-white opacity-90 transform rotate-45 relative">
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-1 border-r-1 border-b-2 border-l-transparent border-r-transparent border-b-white"></div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gray-600 opacity-90"></div>
                      </div>
                    </div>
                    {/* Espada 2 - diagonal inferior */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-1 h-12 bg-white opacity-90 transform -rotate-45 relative">
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-1 border-r-1 border-b-2 border-l-transparent border-r-transparent border-b-white"></div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gray-600 opacity-90"></div>
                      </div>
                    </div>
                    {/* Puntos de luz */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-1 bg-yellow-400 opacity-90 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-1 bg-yellow-400 opacity-90 rounded-full"></div>
                    </div>
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <div className="w-1 h-1 bg-yellow-400 opacity-90 rounded-full"></div>
                    </div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <div className="w-1 h-1 bg-yellow-400 opacity-90 rounded-full"></div>
                    </div>
                  </div>
                  <h2 className="text-white text-3xl font-bold pixel-text">DUELOS</h2>
                </div>
              </div>
            </div>
            
            {/* Fila inferior - Rectángulo ancho gris claro (menos alto) */}
            <div className="row-span-1 bg-gray-50 rounded-lg shadow-lg p-4">
              {/* Grid horizontal para los divs del contenedor gris claro */}
              <div className="flex gap-4 h-full">
                {/* Div 1 del contenedor gris claro */}
                <div 
                  className="w-[300px] h-full bg-[#000000] rounded-lg border-[7px] border-gray-300 pixel-card flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/reglas')}
                >
                  <h2 className="text-white text-3xl font-bold pixel-text">REGLAS</h2>
                </div>
                
                {/* Div 2 del contenedor gris claro - DOCUMENTACIÓN */}
                <div 
                  className="flex-1 h-full bg-[#8A3FFC] rounded-lg border-[7px] border-gray-300 pixel-card flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate('/formulario/crear')}
                >
                  {/* Diseño de documentación - Libro abierto */}
                  <div className="mb-4 relative">
                    {/* Libro abierto */}
                    <div className="flex">
                      {/* Página izquierda */}
                      <div className="w-8 h-10 bg-white opacity-90 relative">
                        {/* Líneas de texto */}
                        <div className="absolute top-2 left-1 right-1 h-0.5 bg-gray-600 opacity-80"></div>
                        <div className="absolute top-4 left-1 right-1 h-0.5 bg-gray-600 opacity-80"></div>
                        <div className="absolute top-6 left-1 right-1 h-0.5 bg-gray-600 opacity-80"></div>
                        <div className="absolute top-8 left-1 right-1 h-0.5 bg-gray-600 opacity-80"></div>
                        {/* Marcador */}
                        <div className="absolute top-1 right-0 w-1 h-3 bg-red-400 opacity-90"></div>
                      </div>
                      {/* Página derecha */}
                      <div className="w-8 h-10 bg-white opacity-90 relative">
                        {/* Líneas de texto */}
                        <div className="absolute top-2 left-1 right-1 h-0.5 bg-gray-600 opacity-80"></div>
                        <div className="absolute top-4 left-1 right-1 h-0.5 bg-gray-600 opacity-80"></div>
                        <div className="absolute top-6 left-1 right-1 h-0.5 bg-gray-600 opacity-80"></div>
                        <div className="absolute top-8 left-1 right-1 h-0.5 bg-gray-600 opacity-80"></div>
                        {/* Imagen pequeña */}
                        <div className="absolute bottom-2 left-1 right-1 h-2 bg-blue-400 opacity-80 rounded-sm"></div>
                      </div>
                    </div>
                    {/* Lápiz */}
                    <div className="absolute -top-1 -right-2 w-1 h-6 bg-yellow-400 opacity-90 transform rotate-45">
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-1 border-r-1 border-b-2 border-l-transparent border-r-transparent border-b-gray-600"></div>
                    </div>
                  </div>
                  <h2 className="text-white text-3xl font-bold pixel-text">DOCUMENTACIÓN</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 