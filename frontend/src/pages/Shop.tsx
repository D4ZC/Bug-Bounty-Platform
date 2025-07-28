import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCircle, FaSearch, FaCoins } from 'react-icons/fa';
import { usePoints } from '../contexts/PointsContext';
import { useInventory } from '../contexts/InventoryContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
}

const ACCENT = '#00BFFF';
const DARK_BG = '#181A20';
const HEADER_BG = 'linear-gradient(90deg, #23263a 0%, #181A20 100%)';
const FONT = 'Inter, Roboto, Arial, sans-serif';

const userMock = {
  name: 'D4ZC',
  avatar: 'https://via.placeholder.com/40x40/00BFFF/FFFFFF?text=D',
  points: 50000,
  bluePoints: 0,
};

const categories = [
  { id: 'backgrounds', name: 'Fondos de perfil' },
  { id: 'miniprofiles', name: 'Miniperfiles' },
  { id: 'frames', name: 'Marcos de avatar' },
  { id: 'animated', name: 'Avatares animados' },
  { id: 'badges', name: 'Insignias especiales' },
  { id: 'season', name: 'Perfiles de temporada/juego' },
  { id: 'plates', name: 'Placas de nombre' },
  { id: 'bluepoints', name: 'Blue Points' },
];

const BADGES = ['Nuevo', 'Exclusivo', 'Limitado', 'Popular', 'Oferta', 'Recomendado', 'En Promoción', null];

const mockProducts: Record<string, Product[]> = {
  backgrounds: [
    { id: 'bg1', name: 'Galaxia', price: 300, image: '/src/assets/Galaxia.png', description: 'Fondo espacial espectacular con estrellas brillantes.' },
    { id: 'bg2', name: 'Ciudad', price: 250, image: '/src/assets/Ciudad.png', description: 'Fondo urbano moderno con rascacielos.' },
    { id: 'bg3', name: 'Montañas', price: 320, image: '/src/assets/Montañas.png', description: 'Paisaje de montaña nevada majestuoso.' },
    { id: 'bg4', name: 'Ciberespacio', price: 350, image: '/src/assets/Ciberespacio.png', description: 'Fondo digital futurista con efectos neon.' },
    { id: 'bg5', name: 'Fondo 1', price: 280, image: '/src/assets/bg1.png', description: 'Fondo exclusivo con efectos especiales.' },
    { id: 'bg6', name: 'Fondo 2', price: 260, image: '/src/assets/bg2.png', description: 'Fondo premium con diseño único.' },
    { id: 'bg7', name: 'Fondo 3', price: 310, image: '/src/assets/bg3.png', description: 'Fondo de alta calidad con efectos visuales.' },
    { id: 'bg8', name: 'Fondo 4', price: 380, image: '/src/assets/bg4.png', description: 'Fondo especial con animaciones.' },
    { id: 'bg9', name: 'Fondo 5', price: 360, image: '/src/assets/bg5.png', description: 'Fondo exclusivo con efectos neon.' },
    { id: 'bg10', name: 'Fondo 6', price: 290, image: '/src/assets/bg6.jpg', description: 'Fondo premium con diseño futurista.' },
    { id: 'bg11', name: 'Fondo 7', price: 400, image: '/src/assets/bg7.jpg', description: 'Fondo de edición limitada.' },
    { id: 'bg12', name: 'Fondo 8', price: 420, image: '/src/assets/bg8.jpg', description: 'Fondo legendario exclusivo.' },
    { id: 'bg13', name: 'Fondo 9', price: 450, image: '/src/assets/bg9.jpg', description: 'Fondo épico con efectos especiales.' },
    { id: 'bg14', name: 'Fondo 10', price: 470, image: '/src/assets/bg10.jpg', description: 'Fondo mítico con animaciones.' },
    { id: 'bg15', name: 'Fondo 11', price: 490, image: '/src/assets/bg11.jpg', description: 'Fondo de colección exclusiva.' },
    { id: 'bg16', name: 'Fondo 12', price: 520, image: '/src/assets/bg12.jpg', description: 'Fondo premium con efectos únicos.' },
    { id: 'bg17', name: 'Fondo 13', price: 550, image: '/src/assets/bg13.jpg', description: 'Fondo legendario de edición limitada.' },
  ],
  miniprofiles: [
    { id: 'mp1', name: 'Avatar 1', price: 400, image: '/src/assets/avatar1.png', description: 'Avatar exclusivo con diseño único.' },
    { id: 'mp2', name: 'Avatar 4', price: 420, image: '/src/assets/avatar4.png', description: 'Avatar premium con efectos especiales.' },
    { id: 'mp3', name: 'Avatar 6', price: 410, image: '/src/assets/avatar6.png', description: 'Avatar de alta calidad con animaciones.' },
    { id: 'mp4', name: 'Avatar 7', price: 430, image: '/src/assets/avatar7.png', description: 'Avatar exclusivo con efectos neon.' },
    { id: 'mp5', name: 'Avatar 8', price: 440, image: '/src/assets/avatar8.png', description: 'Avatar premium con diseño futurista.' },
    { id: 'mp6', name: 'Avatar 9', price: 390, image: '/src/assets/avatar9.png', description: 'Avatar de edición limitada.' },
    { id: 'mp7', name: 'Avatar 10', price: 450, image: '/src/assets/avatar10.png', description: 'Avatar legendario exclusivo.' },
    { id: 'mp8', name: 'Avatar 11', price: 480, image: '/src/assets/avatar11.png', description: 'Avatar épico con efectos especiales.' },
    { id: 'mp9', name: 'Avatar 12', price: 460, image: '/src/assets/avatar12.png', description: 'Avatar mítico con animaciones.' },
    { id: 'mp10', name: 'Avatar 13', price: 470, image: '/src/assets/avatar13.png', description: 'Avatar de colección exclusiva.' },
    { id: 'mp11', name: 'Avatar 14', price: 420, image: '/src/assets/avatar14.png', description: 'Avatar premium con efectos únicos.' },
    { id: 'mp12', name: 'Ninja', price: 490, image: '/src/assets/Ninja2.png', description: 'Avatar ninja con movimientos fluidos.' },
  ],
  frames: [
    { id: 'fr1', name: 'Marco Dorado', price: 200, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Gold', description: 'Marco elegante dorado con detalles.' },
    { id: 'fr2', name: 'Marco Azul', price: 180, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Blue', description: 'Marco con acento azul eléctrico.' },
    { id: 'fr3', name: 'Marco Pixel', price: 210, image: 'https://via.placeholder.com/120x120/23263a/FFD700?text=Pixel', description: 'Marco estilo pixel art retro.' },
    { id: 'fr4', name: 'Marco Diamante', price: 250, image: 'https://via.placeholder.com/120x120/B9F2FF/23263a?text=Diamond', description: 'Marco de diamante con brillos.' },
    { id: 'fr5', name: 'Marco Fuego', price: 220, image: 'https://via.placeholder.com/120x120/FF4500/23263a?text=Fuego', description: 'Marco con efectos de fuego animado.' },
    { id: 'fr6', name: 'Marco Hielo', price: 230, image: 'https://via.placeholder.com/120x120/00CED1/23263a?text=Hielo', description: 'Marco de hielo cristalino.' },
    { id: 'fr7', name: 'Marco Arcoíris', price: 240, image: 'https://via.placeholder.com/120x120/FF69B4/23263a?text=Rainbow', description: 'Marco multicolor con arcoíris.' },
    { id: 'fr8', name: 'Marco Neon', price: 260, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Neon', description: 'Marco con efectos neon brillantes.' },
    { id: 'fr9', name: 'Marco Gótico', price: 270, image: 'https://via.placeholder.com/120x120/4B0082/23263a?text=Gotico', description: 'Marco gótico con detalles oscuros.' },
    { id: 'fr10', name: 'Marco Cibernético', price: 280, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Cyber', description: 'Marco con diseño cibernético.' },
    { id: 'fr11', name: 'Marco Mágico', price: 290, image: 'https://via.placeholder.com/120x120/9932CC/23263a?text=Magico', description: 'Marco con efectos mágicos.' },
    { id: 'fr12', name: 'Marco Legendario', price: 300, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Legend', description: 'Marco legendario exclusivo.' },
  ],
  animated: [
    { id: 'an1', name: 'Ninja', price: 500, image: '/src/assets/Ninja2.png', description: 'Avatar animado ninja con movimientos fluidos.' },
    { id: 'an2', name: 'Robot', price: 520, image: '/src/assets/Robot2.png', description: 'Avatar animado robot con efectos mecánicos.' },
    { id: 'an3', name: 'Dragón', price: 540, image: '/src/assets/Dragon.png', description: 'Avatar animado dragón legendario.' },
    { id: 'an4', name: 'Samurái', price: 530, image: '/src/assets/Samurai.png', description: 'Avatar de samurái con katana.' },
    { id: 'an5', name: 'Mago', price: 550, image: '/src/assets/Mago.png', description: 'Avatar de mago con varita mágica.' },
    { id: 'an6', name: 'Pirata', price: 510, image: '/src/assets/Pirata.png', description: 'Avatar de pirata con parche.' },
    { id: 'an7', name: 'Vampiro', price: 560, image: '/src/assets/Vampiro.png', description: 'Avatar de vampiro elegante.' },
    { id: 'an8', name: 'Avatar 1', price: 570, image: '/src/assets/avatar1.png', description: 'Avatar exclusivo con diseño único.' },
    { id: 'an9', name: 'Avatar 4', price: 540, image: '/src/assets/avatar4.png', description: 'Avatar premium con efectos especiales.' },
    { id: 'an10', name: 'Avatar 6', price: 580, image: '/src/assets/avatar6.png', description: 'Avatar de alta calidad con animaciones.' },
    { id: 'an11', name: 'Avatar 7', price: 520, image: '/src/assets/avatar7.png', description: 'Avatar exclusivo con efectos neon.' },
    { id: 'an12', name: 'Avatar 8', price: 530, image: '/src/assets/avatar8.png', description: 'Avatar premium con diseño futurista.' },
  ],
  badges: [
    { id: 'bd1', name: 'Insignia Hacker', price: 150, image: 'https://via.placeholder.com/100x100/00BFFF/23263a?text=H', description: 'Insignia para expertos en seguridad.' },
    { id: 'bd2', name: 'Insignia MVP', price: 170, image: 'https://via.placeholder.com/100x100/FFD700/23263a?text=MVP', description: 'Insignia para jugadores destacados.' },
    { id: 'bd3', name: 'Insignia Legendaria', price: 200, image: 'https://via.placeholder.com/100x100/23263a/FFD700?text=Legend', description: 'Insignia de edición limitada.' },
    { id: 'bd4', name: 'Insignia Pro', price: 180, image: 'https://via.placeholder.com/100x100/00FF00/23263a?text=Pro', description: 'Insignia para profesionales.' },
    { id: 'bd5', name: 'Insignia Elite', price: 220, image: 'https://via.placeholder.com/100x100/FF4500/23263a?text=Elite', description: 'Insignia para la élite.' },
    { id: 'bd6', name: 'Insignia Gamer', price: 160, image: 'https://via.placeholder.com/100x100/9932CC/23263a?text=Gamer', description: 'Insignia para gamers hardcore.' },
    { id: 'bd7', name: 'Insignia Creador', price: 190, image: 'https://via.placeholder.com/100x100/FF69B4/23263a?text=Creador', description: 'Insignia para creadores de contenido.' },
    { id: 'bd8', name: 'Insignia Mentor', price: 210, image: 'https://via.placeholder.com/100x100/00CED1/23263a?text=Mentor', description: 'Insignia para mentores de la comunidad.' },
    { id: 'bd9', name: 'Insignia Innovador', price: 230, image: 'https://via.placeholder.com/100x100/FFD700/23263a?text=Innovador', description: 'Insignia para innovadores.' },
    { id: 'bd10', name: 'Insignia Líder', price: 240, image: 'https://via.placeholder.com/100x100/4B0082/23263a?text=Lider', description: 'Insignia para líderes de equipo.' },
    { id: 'bd11', name: 'Insignia Campeón', price: 250, image: 'https://via.placeholder.com/100x100/FF0000/23263a?text=Campeon', description: 'Insignia para campeones.' },
    { id: 'bd12', name: 'Insignia Maestro', price: 260, image: 'https://via.placeholder.com/100x100/FFFFFF/23263a?text=Maestro', description: 'Insignia para maestros del juego.' },
  ],
  season: [
    { id: 'ss1', name: 'Perfil Invierno', price: 350, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Winter', description: 'Perfil de temporada invernal con nieve.' },
    { id: 'ss2', name: 'Perfil Verano', price: 340, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Summer', description: 'Perfil de temporada veraniega soleado.' },
    { id: 'ss3', name: 'Perfil Halloween', price: 370, image: 'https://via.placeholder.com/120x120/23263a/FFD700?text=Halloween', description: 'Perfil de temporada de Halloween.' },
    { id: 'ss4', name: 'Perfil Navidad', price: 360, image: 'https://via.placeholder.com/120x120/FF0000/23263a?text=Navidad', description: 'Perfil festivo de Navidad.' },
    { id: 'ss5', name: 'Perfil Primavera', price: 330, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Primavera', description: 'Perfil de primavera con flores.' },
    { id: 'ss6', name: 'Perfil Otoño', price: 340, image: 'https://via.placeholder.com/120x120/FFA500/23263a?text=Otono', description: 'Perfil de otoño con hojas doradas.' },
    { id: 'ss7', name: 'Perfil San Valentín', price: 380, image: 'https://via.placeholder.com/120x120/FF69B4/23263a?text=Valentin', description: 'Perfil romántico de San Valentín.' },
    { id: 'ss8', name: 'Perfil Año Nuevo', price: 390, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=2024', description: 'Perfil festivo de Año Nuevo.' },
    { id: 'ss9', name: 'Perfil Pascua', price: 350, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Pascua', description: 'Perfil de Pascua con huevos.' },
    { id: 'ss10', name: 'Perfil Día de Muertos', price: 370, image: 'https://via.placeholder.com/120x120/FFA500/23263a?text=Muertos', description: 'Perfil del Día de Muertos.' },
    { id: 'ss11', name: 'Perfil Independencia', price: 360, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Independencia', description: 'Perfil patriótico de independencia.' },
    { id: 'ss12', name: 'Perfil Carnaval', price: 400, image: 'https://via.placeholder.com/120x120/FF69B4/23263a?text=Carnaval', description: 'Perfil colorido de carnaval.' },
  ],
  plates: [
    { id: 'pl1', name: 'Placa Pro', price: 100, image: 'https://via.placeholder.com/120x60/00BFFF/23263a?text=Pro', description: 'Placa de nombre profesional.' },
    { id: 'pl2', name: 'Placa Elite', price: 120, image: 'https://via.placeholder.com/120x60/FFD700/23263a?text=Elite', description: 'Placa de nombre para élite.' },
    { id: 'pl3', name: 'Placa Gamer', price: 110, image: 'https://via.placeholder.com/120x60/23263a/00BFFF?text=Gamer', description: 'Placa de nombre para gamers.' },
    { id: 'pl4', name: 'Placa Hacker', price: 130, image: 'https://via.placeholder.com/120x60/00FF00/23263a?text=Hacker', description: 'Placa de nombre para hackers.' },
    { id: 'pl5', name: 'Placa Legend', price: 150, image: 'https://via.placeholder.com/120x60/FFD700/23263a?text=Legend', description: 'Placa de nombre legendaria.' },
    { id: 'pl6', name: 'Placa Master', price: 140, image: 'https://via.placeholder.com/120x60/9932CC/23263a?text=Master', description: 'Placa de nombre para maestros.' },
    { id: 'pl7', name: 'Placa Champion', price: 160, image: 'https://via.placeholder.com/120x60/FF4500/23263a?text=Champion', description: 'Placa de nombre para campeones.' },
    { id: 'pl8', name: 'Placa VIP', price: 170, image: 'https://via.placeholder.com/120x60/FF69B4/23263a?text=VIP', description: 'Placa de nombre VIP exclusiva.' },
    { id: 'pl9', name: 'Placa Boss', price: 180, image: 'https://via.placeholder.com/120x60/4B0082/23263a?text=Boss', description: 'Placa de nombre para jefes.' },
    { id: 'pl10', name: 'Placa Hero', price: 190, image: 'https://via.placeholder.com/120x60/00CED1/23263a?text=Hero', description: 'Placa de nombre para héroes.' },
    { id: 'pl11', name: 'Placa Warrior', price: 200, image: 'https://via.placeholder.com/120x60/FF0000/23263a?text=Warrior', description: 'Placa de nombre para guerreros.' },
    { id: 'pl12', name: 'Placa King', price: 250, image: 'https://via.placeholder.com/120x60/FFD700/23263a?text=King', description: 'Placa de nombre real.' },
  ],
  bluepoints: [
    { id: 'bp1', name: '10 Blue Points', price: 1000, originalPrice: 1500, image: '💎', description: 'Paquete básico de 10 Blue Points.' },
    { id: 'bp2', name: '25 Blue Points', price: 2200, image: '💎', description: 'Paquete estándar de 25 Blue Points.' },
    { id: 'bp3', name: '50 Blue Points', price: 4000, originalPrice: 5500, image: '💎', description: 'Paquete premium de 50 Blue Points.' },
    { id: 'bp4', name: '100 Blue Points', price: 7500, image: '💎', description: 'Paquete profesional de 100 Blue Points.' },
    { id: 'bp5', name: '200 Blue Points', price: 14000, originalPrice: 18000, image: '💎', description: 'Paquete elite de 200 Blue Points.' },
    { id: 'bp6', name: '500 Blue Points', price: 32000, image: '💎', description: 'Paquete legendario de 500 Blue Points.' },
    { id: 'bp7', name: '1000 Blue Points', price: 60000, image: '💎', description: 'Paquete mítico de 1000 Blue Points.' },
  ],
};

// Productos específicos para Teams
const teamProducts: Record<string, Product[]> = {
  backgrounds: [
    { id: 'tbg1', name: 'Fondo Team Elite', price: 500, image: '/src/assets/Galaxia.png', description: 'Fondo exclusivo para equipos de élite.' },
    { id: 'tbg2', name: 'Fondo Team Pro', price: 450, image: '/src/assets/Ciudad.png', description: 'Fondo profesional para equipos pro.' },
    { id: 'tbg3', name: 'Fondo Team Champions', price: 600, image: '/src/assets/Montañas.png', description: 'Fondo para campeones de equipos.' },
    { id: 'tbg4', name: 'Fondo Team Legends', price: 700, image: '/src/assets/Ciberespacio.png', description: 'Fondo legendario para equipos míticos.' },
    { id: 'tbg5', name: 'Fondo Team Warriors', price: 550, image: '/src/assets/bg1.png', description: 'Fondo para guerreros de equipo.' },
    { id: 'tbg6', name: 'Fondo Team Masters', price: 650, image: '/src/assets/bg2.png', description: 'Fondo para maestros de equipo.' },
  ],
  miniprofiles: [
    { id: 'tmp1', name: 'Mini Team Leader', price: 600, image: '/src/assets/avatar1.png', description: 'Miniperfil para líderes de equipo.' },
    { id: 'tmp2', name: 'Mini Team Captain', price: 580, image: '/src/assets/avatar4.png', description: 'Miniperfil para capitanes de equipo.' },
    { id: 'tmp3', name: 'Mini Team Strategist', price: 620, image: '/src/assets/avatar6.png', description: 'Miniperfil para estrategas de equipo.' },
    { id: 'tmp4', name: 'Mini Team Defender', price: 570, image: '/src/assets/avatar7.png', description: 'Miniperfil para defensores de equipo.' },
    { id: 'tmp5', name: 'Mini Team Attacker', price: 590, image: '/src/assets/avatar8.png', description: 'Miniperfil para atacantes de equipo.' },
    { id: 'tmp6', name: 'Mini Team Support', price: 560, image: '/src/assets/avatar9.png', description: 'Miniperfil para soporte de equipo.' },
  ],
  frames: [
    { id: 'tfr1', name: 'Marco Team Gold', price: 350, image: '/src/assets/avatar10.png', description: 'Marco dorado para equipos.' },
    { id: 'tfr2', name: 'Marco Team Silver', price: 320, image: '/src/assets/avatar11.png', description: 'Marco plateado para equipos.' },
    { id: 'tfr3', name: 'Marco Team Bronze', price: 300, image: '/src/assets/avatar12.png', description: 'Marco bronce para equipos.' },
    { id: 'tfr4', name: 'Marco Team Diamond', price: 400, image: '/src/assets/avatar13.png', description: 'Marco diamante para equipos.' },
    { id: 'tfr5', name: 'Marco Team Platinum', price: 450, image: '/src/assets/avatar14.png', description: 'Marco platino para equipos.' },
    { id: 'tfr6', name: 'Marco Team Elite', price: 500, image: '/src/assets/Ninja2.png', description: 'Marco élite para equipos.' },
  ],
  animated: [
    { id: 'tan1', name: 'Avatar Team Leader', price: 700, image: '/src/assets/Robot2.png', description: 'Avatar animado para líderes de equipo.' },
    { id: 'tan2', name: 'Avatar Team Captain', price: 680, image: '/src/assets/Dragon.png', description: 'Avatar animado para capitanes.' },
    { id: 'tan3', name: 'Avatar Team Warrior', price: 720, image: '/src/assets/Samurai.png', description: 'Avatar animado para guerreros de equipo.' },
    { id: 'tan4', name: 'Avatar Team Mage', price: 750, image: '/src/assets/Mago.png', description: 'Avatar animado para magos de equipo.' },
    { id: 'tan5', name: 'Avatar Team Archer', price: 730, image: '/src/assets/Pirata.png', description: 'Avatar animado para arqueros de equipo.' },
    { id: 'tan6', name: 'Avatar Team Knight', price: 710, image: '/src/assets/Vampiro.png', description: 'Avatar animado para caballeros de equipo.' },
  ],
  badges: [
    { id: 'tbd1', name: 'Insignia Team Leader', price: 250, image: '/src/assets/avatar1.png', description: 'Insignia para líderes de equipo.' },
    { id: 'tbd2', name: 'Insignia Team Captain', price: 230, image: '/src/assets/avatar4.png', description: 'Insignia para capitanes de equipo.' },
    { id: 'tbd3', name: 'Insignia Team MVP', price: 280, image: '/src/assets/avatar6.png', description: 'Insignia MVP para equipos.' },
    { id: 'tbd4', name: 'Insignia Team Champion', price: 300, image: '/src/assets/avatar7.png', description: 'Insignia para campeones de equipo.' },
    { id: 'tbd5', name: 'Insignia Team Elite', price: 320, image: '/src/assets/avatar8.png', description: 'Insignia para élite de equipos.' },
    { id: 'tbd6', name: 'Insignia Team Legend', price: 350, image: '/src/assets/avatar9.png', description: 'Insignia legendaria para equipos.' },
  ],
  season: [
    { id: 'tss1', name: 'Perfil Team Winter', price: 450, image: '/src/assets/avatar10.png', description: 'Perfil de invierno para equipos.' },
    { id: 'tss2', name: 'Perfil Team Summer', price: 440, image: '/src/assets/avatar11.png', description: 'Perfil de verano para equipos.' },
    { id: 'tss3', name: 'Perfil Team Spring', price: 430, image: '/src/assets/avatar12.png', description: 'Perfil de primavera para equipos.' },
    { id: 'tss4', name: 'Perfil Team Autumn', price: 440, image: '/src/assets/avatar13.png', description: 'Perfil de otoño para equipos.' },
    { id: 'tss5', name: 'Perfil Team Championship', price: 500, image: '/src/assets/avatar14.png', description: 'Perfil de campeonato para equipos.' },
    { id: 'tss6', name: 'Perfil Team Tournament', price: 480, image: '/src/assets/Ninja2.png', description: 'Perfil de torneo para equipos.' },
  ],
  plates: [
    { id: 'tpl1', name: 'Placa Team Elite', price: 200, image: '/src/assets/avatar1.png', description: 'Placa para equipos de élite.' },
    { id: 'tpl2', name: 'Placa Team Pro', price: 180, image: '/src/assets/avatar4.png', description: 'Placa para equipos profesionales.' },
    { id: 'tpl3', name: 'Placa Team Champion', price: 250, image: '/src/assets/avatar6.png', description: 'Placa para equipos campeones.' },
    { id: 'tpl4', name: 'Placa Team Legend', price: 300, image: '/src/assets/avatar7.png', description: 'Placa legendaria para equipos.' },
    { id: 'tpl5', name: 'Placa Team Master', price: 220, image: '/src/assets/avatar8.png', description: 'Placa para maestros de equipo.' },
    { id: 'tpl6', name: 'Placa Team Warrior', price: 240, image: '/src/assets/avatar9.png', description: 'Placa para guerreros de equipo.' },
  ],
  bluepoints: [
    { id: 'tbp1', name: 'Team Blue Points 10', price: 800, originalPrice: 1200, image: '💎', description: 'Paquete básico de 10 Blue Points para equipos.' },
    { id: 'tbp2', name: 'Team Blue Points 25', price: 1800, image: '💎', description: 'Paquete estándar de 25 Blue Points para equipos.' },
    { id: 'tbp3', name: 'Team Blue Points 50', price: 3200, originalPrice: 4500, image: '💎', description: 'Paquete premium de 50 Blue Points para equipos.' },
    { id: 'tbp4', name: 'Team Blue Points 100', price: 6000, image: '💎', description: 'Paquete profesional de 100 Blue Points para equipos.' },
    { id: 'tbp5', name: 'Team Blue Points 200', price: 11000, originalPrice: 14000, image: '💎', description: 'Paquete elite de 200 Blue Points para equipos.' },
    { id: 'tbp6', name: 'Team Blue Points 500', price: 25000, image: '💎', description: 'Paquete legendario de 500 Blue Points para equipos.' },
  ],
};

const getBadge = (id: string) => {
  // Badges especiales para Blue Points (solo algunos)
  if (id.startsWith('bp') || id.startsWith('tbp')) {
    if (id.endsWith('1')) return 'Oferta';
    if (id.endsWith('3')) return 'En Promoción';
    if (id.endsWith('5')) return 'Oferta';
    return null; // Sin badge para la mayoría de Blue Points
  }
  
  // Deterministic badge for demo para otros productos
  if (id.endsWith('1')) return 'Nuevo';
  if (id.endsWith('2')) return 'Exclusivo';
  if (id.endsWith('3')) return 'Limitado';
  if (id.endsWith('4')) return 'Popular';
  if (id.endsWith('5')) return 'Oferta';
  if (id.endsWith('6')) return 'Recomendado';
  if (id.endsWith('7')) return 'Nuevo';
  if (id.endsWith('8')) return 'Exclusivo';
  if (id.endsWith('9')) return 'Limitado';
  if (id.endsWith('10')) return 'Popular';
  if (id.endsWith('11')) return 'Oferta';
  if (id.endsWith('12')) return 'Recomendado';
  return null;
};

const getUserPoints = () => {
  const points = localStorage.getItem('userPoints');
  return points ? parseInt(points, 10) : 0;
};

const getUserBluePoints = () => {
  const bluePoints = localStorage.getItem('userBluePoints');
  return bluePoints ? parseInt(bluePoints, 10) : 0;
};

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('backgrounds');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('default');
  const [cart, setCart] = useState<Product[]>([]);
  const { userPoints, subtractPoints } = usePoints();
  const { addToInventory } = useInventory();
  const [userBluePoints, setUserBluePoints] = useState(() => {
    const saved = localStorage.getItem('userBluePoints');
    return saved ? parseInt(saved, 10) : userMock.bluePoints;
  });
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  
  // Función para agregar Blue Points
  const addBluePoints = (amount: number) => {
    setUserBluePoints(prev => {
      const newAmount = prev + amount;
      localStorage.setItem('userBluePoints', newAmount.toString());
      return newAmount;
    });
  };
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showTeamProducts, setShowTeamProducts] = useState(false);



  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalProduct) {
        setModalProduct(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalProduct]);

  // Filtrado y orden
  let userProducts: Product[] = mockProducts[selectedCategory] || [];
  let teamProductsList: Product[] = teamProducts[selectedCategory] || [];
  
  if (search) {
    userProducts = userProducts.filter((p: Product) => p.name.toLowerCase().includes(search.toLowerCase()));
    teamProductsList = teamProductsList.filter((p: Product) => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  
  if (order === 'price-asc') {
    userProducts = [...userProducts].sort((a, b) => a.price - b.price);
    teamProductsList = [...teamProductsList].sort((a, b) => a.price - b.price);
  } else if (order === 'price-desc') {
    userProducts = [...userProducts].sort((a, b) => b.price - a.price);
    teamProductsList = [...teamProductsList].sort((a, b) => b.price - a.price);
  }
  
  const products = showTeamProducts ? teamProductsList : userProducts;

  // Comprar desde modal
  const handleBuy = (product: Product) => {
    if (userPoints >= product.price) {
      subtractPoints(product.price);
      
      // Agregar al inventario
      addToInventory({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: selectedCategory,
      });
      
      // Mensaje especial para Blue Points
      if (product.id.startsWith('bp') || product.id.startsWith('tbp')) {
        const bluePointsAmount = parseInt(product.name.match(/\d+/)?.[0] || '0', 10);
        addBluePoints(bluePointsAmount);
        setSuccessMessage(`¡${product.name} adquirido! Has obtenido ${bluePointsAmount} Blue Points.`);
      } else {
        setSuccessMessage(`¡${product.name} adquirido!`);
      }
      setTimeout(() => setSuccessMessage(null), 2500);
      setModalProduct(null);
    } else {
      setErrorMessage('No tienes suficientes puntos');
      setTimeout(() => setErrorMessage(null), 2500);
    }
  };

  return (
    <div style={{ background: DARK_BG, minHeight: '100vh', fontFamily: FONT }}>
      {/* Header */}
      <header style={{ background: HEADER_BG }} className="w-full px-0 py-0 shadow-lg">
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div />
          {/* Search */}
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full max-w-md px-4 py-2 rounded-lg bg-[#23263a] text-white placeholder-gray-400 border-2 border-transparent focus:border-blue-400 outline-none transition"
              style={{ fontSize: 18 }}
            />
          </div>
          {/* User info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#23263a] px-3 py-1 rounded-full">
              <FaCoins color={ACCENT} size={20} />
              <span className="text-lg font-bold text-white">{userPoints}</span>
              <span className="text-xs text-blue-400 ml-1">Puntos</span>
            </div>
            <div className="flex items-center gap-2 bg-[#23263a] px-3 py-1 rounded-full">
              <FaCoins color={'#3af0ff'} size={20} />
              <span className="text-lg font-bold text-white">{userBluePoints}</span>
              <span className="text-xs text-cyan-400 ml-1">Blue-points</span>
            </div>
            <img src={userMock.avatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-blue-400" />
          </div>
        </div>
        {/* Categorías */}
        <nav className="flex gap-2 px-8 pb-2 border-b border-[#23263a]">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-200 text-sm md:text-base focus:outline-none ${selectedCategory === cat.id ? 'bg-[#23263a] text-blue-400 border-b-2 border-blue-400' : 'text-gray-300 hover:text-blue-300 hover:bg-[#23263a]'}`}
              style={{ letterSpacing: 0.5 }}
          >
            {cat.name}
          </button>
        ))}
        </nav>
      </header>
      {/* Mensajes de éxito/error */}
          {successMessage && (
        <div className="fixed top-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold animate-fade-in" style={{ background: ACCENT }}>
              {successMessage}
            </div>
          )}
      {errorMessage && (
        <div className="fixed top-6 right-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold animate-fade-in">
          {errorMessage}
        </div>
      )}
      {/* Main content con filtros y grid de productos */}
      <main className="max-w-7xl mx-auto px-4 py-10" style={{ background: DARK_BG }}>
        {/* Filtros y ordenamiento */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="text-white text-lg font-semibold">
            {products.length} productos encontrados
          </div>
          <div className="flex gap-4">
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="bg-[#23263a] text-white px-4 py-2 rounded-lg border border-[#181A20] focus:border-blue-400 outline-none"
            >
              <option value="default">Ordenar por</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
        
        {/* Selector de tipo de producto */}
        <div className="mb-6 flex justify-center">
          <div className="bg-[#23263a] rounded-xl p-1 flex">
            <button
              onClick={() => setShowTeamProducts(false)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                !showTeamProducts 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              👤 Productos para Usuario
            </button>
            <button
              onClick={() => setShowTeamProducts(true)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                showTeamProducts 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              🏆 Productos para Equipo
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" style={{ background: DARK_BG }}>
          {products.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 text-xl mb-4">🔍</div>
              <div className="text-gray-300 text-lg font-semibold mb-2">No se encontraron productos</div>
              <div className="text-gray-500 text-sm">
                {search ? `No hay productos que coincidan con "${search}"` : 'No hay productos disponibles en esta categoría'}
              </div>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            products.map(product => {
            const badge = getBadge(product.id);
            const canBuy = userPoints >= product.price;
            return (
            <div
              key={product.id}
              className="relative bg-[#23263a] rounded-2xl shadow-lg border border-[#23263a] flex flex-col items-center p-6 transition-all duration-300 hover:scale-105 hover:border-blue-400 group cursor-pointer"
              style={{ minHeight: 340, boxShadow: '0 4px 24px rgba(0,191,255,0.08)' }}
              onClick={() => setModalProduct(product)}
            >
              {/* Badge */}
              {badge && (
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide z-10 ${
                  badge === 'Nuevo' ? 'bg-blue-500 text-white' : 
                  badge === 'Exclusivo' ? 'bg-purple-600 text-white' : 
                  badge === 'Limitado' ? 'bg-yellow-500 text-black' :
                  badge === 'Popular' ? 'bg-green-500 text-white' :
                  badge === 'Oferta' ? 'bg-red-500 text-white' :
                  badge === 'Recomendado' ? 'bg-cyan-500 text-white' :
                  badge === 'En Promoción' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
                  'bg-cyan-500 text-white'
                }`}>
                  {badge}
                </span>
              )}
              
              {/* Indicador de Blue Points */}
              {product.id.startsWith('bp') || product.id.startsWith('tbp') && (
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  💎 Blue Points
                </span>
              )}
              
              {/* Imagen con overlay */}
              <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                {product.id.startsWith('bp') || product.id.startsWith('tbp') ? (
                  // Icono grande para Blue Points
                  <div className="w-44 h-28 flex items-center justify-center rounded-xl border-2 border-[#181A20] bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,191,255,0.15)' }}>
                    <span className="text-6xl z-10 relative">{product.image}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                  </div>
                ) : (
                  // Imagen normal para otros productos
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-44 h-28 object-cover rounded-xl border-2 border-[#181A20]" 
                    style={{ boxShadow: '0 4px 16px rgba(0,191,255,0.15)' }} 
                  />
                )}
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-blue-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-2">
                    <FaSearch color="white" size={20} />
                  </div>
                </div>
              </div>
              
              {/* Nombre */}
              <div className="font-bold text-lg text-white mb-2 text-center group-hover:text-blue-400 transition-colors duration-300" style={{ letterSpacing: 0.5 }}>
                {product.name}
                {(product.id.startsWith('bp') || product.id.startsWith('tbp')) && (
                  <div className="text-sm text-blue-400 mt-1">
                    {product.name.match(/\d+/)?.[0] || '0'} Blue Points
                  </div>
                )}
              </div>
              
              {/* Descripción */}
              <div className="text-gray-400 text-xs mb-3 text-center leading-relaxed" style={{ minHeight: 40 }}>
                {product.description}
              </div>
              
              {/* Precio */}
              <div className="flex flex-col items-center gap-1 mb-4 bg-[#181A20] px-3 py-2 rounded-lg">
                {product.id.startsWith('bp') || product.id.startsWith('tbp') ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💎</span>
                      <span className="font-semibold text-blue-400 text-base">{product.price}</span>
                      <span className="text-xs text-gray-400">Puntos</span>
                    </div>
                    {product.originalPrice && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                        <span className="text-xs text-green-400 font-semibold">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <FaCoins color={ACCENT} size={18} />
                      <span className="font-semibold text-blue-400 text-base">{product.price}</span>
                      <span className="text-xs text-gray-400">Puntos</span>
                    </div>
                    {product.originalPrice && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                        <span className="text-xs text-green-400 font-semibold">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Botón Comprar */}
              <button
                className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 mt-auto ${
                  canBuy 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : 'bg-gray-700 cursor-not-allowed opacity-60'
                }`}
                style={{ fontSize: 16, letterSpacing: 1 }}
                disabled={!canBuy}
                onClick={(e) => {
                  e.stopPropagation();
                  setModalProduct(product);
                }}
                title={canBuy ? 'Ver detalles y comprar' : 'Puntos insuficientes'}
              >
                {canBuy ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaShoppingCart size={16} />
                    Ver detalles
                  </span>
                ) : (
                  'Puntos insuficientes'
                )}
                              </button>
              </div>
            );
          })
          )}
        </div>
        
        {/* Sección de productos para Teams (cuando se ven productos de usuario) */}
        {!showTeamProducts && teamProductsList.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">🏆 Productos para Equipos</h2>
              <p className="text-gray-400 text-lg">Personaliza el perfil de tu equipo con estos productos exclusivos</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" style={{ background: DARK_BG }}>
              {teamProductsList.slice(0, 10).map(product => {
                const canBuy = userPoints >= product.price;
                return (
                  <div
                    key={product.id}
                    className="relative bg-[#23263a] rounded-2xl shadow-lg border border-[#23263a] flex flex-col items-center p-6 transition-all duration-300 hover:scale-105 hover:border-blue-400 group cursor-pointer"
                    style={{ minHeight: 340, boxShadow: '0 4px 24px rgba(0,191,255,0.08)' }}
                    onClick={() => setModalProduct(product)}
                  >
                    {/* Badge especial para productos de equipo */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        🏆 Equipo
                      </span>
                    </div>
                    
                    {/* Imagen con overlay */}
                    <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-44 h-28 object-cover rounded-xl border-2 border-[#181A20]" 
                        style={{ boxShadow: '0 4px 16px rgba(0,191,255,0.15)' }} 
                      />
                      {/* Overlay hover */}
                      <div className="absolute inset-0 bg-blue-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-2">
                          <FaSearch color="white" size={20} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Nombre */}
                    <div className="font-bold text-lg text-white mb-2 text-center group-hover:text-blue-400 transition-colors duration-300" style={{ letterSpacing: 0.5 }}>
                      {product.name}
                    </div>
                    
                    {/* Descripción */}
                    <div className="text-gray-400 text-xs mb-3 text-center leading-relaxed" style={{ minHeight: 40 }}>
                      {product.description}
                    </div>
                    
                    {/* Precio */}
                    <div className="flex items-center gap-2 mb-4 bg-[#181A20] px-3 py-2 rounded-lg">
                      <FaCoins color={ACCENT} size={18} />
                      <span className="font-semibold text-blue-400 text-base">{product.price}</span>
                      <span className="text-xs text-gray-400">Puntos</span>
                    </div>
                    
                    {/* Botón Comprar */}
                    <button
                      className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 mt-auto ${
                        canBuy 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105' 
                          : 'bg-gray-700 cursor-not-allowed opacity-60'
                      }`}
                      style={{ fontSize: 16, letterSpacing: 1 }}
                      disabled={!canBuy}
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalProduct(product);
                      }}
                      title={canBuy ? 'Ver detalles y comprar' : 'Puntos insuficientes'}
                    >
                      {canBuy ? (
                        <span className="flex items-center justify-center gap-2">
                          <FaShoppingCart size={16} />
                          Ver detalles
                        </span>
                      ) : (
                        'Puntos insuficientes'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            

          </div>
        )}
      </main>
        {/* Modal de detalles */}
        {modalProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setModalProduct(null)}
        >
                      <div 
              className="bg-[#23263a] rounded-3xl shadow-2xl p-8 w-full max-w-lg relative border-2 border-blue-400 overflow-hidden animate-fade-in" 
              style={{ boxShadow: '0 20px 60px #00BFFF33' }}
              onClick={(e) => e.stopPropagation()}
            >
            {/* Botón cerrar */}
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold z-10 transition-colors duration-200" 
              onClick={() => setModalProduct(null)}
            >
              &times;
            </button>
            
            {/* Badge del producto */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              {getBadge(modalProduct.id) && (
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                  getBadge(modalProduct.id) === 'Nuevo' ? 'bg-blue-500 text-white' : 
                  getBadge(modalProduct.id) === 'Exclusivo' ? 'bg-purple-600 text-white' : 
                  getBadge(modalProduct.id) === 'Limitado' ? 'bg-yellow-500 text-black' :
                  getBadge(modalProduct.id) === 'Popular' ? 'bg-green-500 text-white' :
                  getBadge(modalProduct.id) === 'Oferta' ? 'bg-red-500 text-white' :
                  'bg-cyan-500 text-white'
                }`}>
                  {getBadge(modalProduct.id)}
                </span>
              )}
              {/* Badge de tipo de producto */}
              {(modalProduct.id.startsWith('bp') || modalProduct.id.startsWith('tbp')) ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  💎 Blue Points
                </span>
              ) : modalProduct.id.startsWith('t') ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  🏆 Equipo
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  👤 Usuario
                </span>
              )}
            </div>
            
            {/* Imagen del producto */}
            {!(modalProduct.id.startsWith('bp') || modalProduct.id.startsWith('tbp')) && (
              <div className="relative mb-6">
                <img 
                  src={modalProduct.image} 
                  alt={modalProduct.name} 
                  className="w-full h-64 object-contain rounded-2xl border-2 border-[#181A20] shadow-lg" 
                  style={{ boxShadow: '0 8px 32px rgba(0,191,255,0.2)' }}
                />
                {/* Overlay de gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#23263a]/50 to-transparent rounded-2xl"></div>
              </div>
            )}
            
            {/* Icono grande para Blue Points */}
            {(modalProduct.id.startsWith('bp') || modalProduct.id.startsWith('tbp')) && (
              <div className="relative mb-6 flex justify-center">
                <div className="w-32 h-32 flex items-center justify-center rounded-2xl border-2 border-[#181A20] bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg" style={{ boxShadow: '0 8px 32px rgba(0,191,255,0.2)' }}>
                  <span className="text-8xl">{modalProduct.image}</span>
                </div>
              </div>
            )}
            
            {/* Información del producto */}
            <div className="space-y-4">
              {/* Nombre */}
              <div className="text-center">
                <h2 className="font-bold text-3xl text-white mb-2" style={{ letterSpacing: 1 }}>
                  {modalProduct.name}
                </h2>
                <div className="w-16 h-1 bg-blue-400 mx-auto rounded-full"></div>
              </div>
              
              {/* Precio */}
              <div className="flex flex-col items-center gap-2 bg-[#181A20] rounded-xl p-4">
                {(modalProduct.id.startsWith('bp') || modalProduct.id.startsWith('tbp')) ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">💎</span>
                      <span className="font-bold text-2xl text-blue-400">{modalProduct.price}</span>
                      <span className="text-sm text-gray-400 font-medium">Puntos</span>
                    </div>
                    {modalProduct.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 line-through">{modalProduct.originalPrice}</span>
                        <span className="text-sm text-green-400 font-semibold">
                          -{Math.round(((modalProduct.originalPrice - modalProduct.price) / modalProduct.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <FaCoins color={ACCENT} size={24} />
                      <span className="font-bold text-2xl text-blue-400">{modalProduct.price}</span>
                      <span className="text-sm text-gray-400 font-medium">Puntos</span>
                    </div>
                    {modalProduct.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 line-through">{modalProduct.originalPrice}</span>
                        <span className="text-sm text-green-400 font-semibold">
                          -{Math.round(((modalProduct.originalPrice - modalProduct.price) / modalProduct.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Descripción */}
              <div className="bg-[#181A20] rounded-xl p-4">
                <h3 className="text-blue-400 font-semibold mb-2 text-center">Descripción</h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {modalProduct.description}
                </p>
              </div>
              
              {/* Información adicional */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#181A20] rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Tus puntos</div>
                  <div className="text-lg font-bold text-white">{userPoints}</div>
                </div>
                <div className="bg-[#181A20] rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Después de compra</div>
                  <div className="text-lg font-bold text-white">{userPoints - modalProduct.price}</div>
                </div>
              </div>
              
              {/* Botón de compra */}
              <button
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 text-lg ${
                  userPoints >= modalProduct.price 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105' 
                    : 'bg-gray-700 cursor-not-allowed opacity-60'
                }`}
                style={{ letterSpacing: 1 }}
                disabled={userPoints < modalProduct.price}
                onClick={() => handleBuy(modalProduct)}
              >
                {userPoints >= modalProduct.price ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaShoppingCart size={20} />
                    Confirmar compra
                  </span>
                ) : (
                  'Puntos insuficientes'
                )}
              </button>
              
              {/* Información adicional */}
              <div className="text-center text-xs text-gray-500">
                * Este producto se agregará a tu inventario inmediatamente después de la compra
                {modalProduct.id.startsWith('t') && (
                  <div className="mt-2 text-yellow-400 font-semibold">
                    🏆 Producto exclusivo para equipos
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  );
}

export default Shop; 