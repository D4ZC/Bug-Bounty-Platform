import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCircle, FaSearch, FaCoins } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  price: number;
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
];

const BADGES = ['Nuevo', 'Exclusivo', 'Limitado', 'Popular', 'Oferta', 'Recomendado', null];

const mockProducts: Record<string, Product[]> = {
  backgrounds: [
    { id: 'bg1', name: 'Galaxia', price: 3000, image: '/src/assets/Galaxia.png', description: 'Fondo espacial espectacular con estrellas brillantes.' },
    { id: 'bg2', name: 'Ciudad', price: 2500, image: '/src/assets/Ciudad.png', description: 'Fondo urbano moderno con rascacielos.' },
    { id: 'bg3', name: 'Montaña', price: 3200, image: '/src/assets/Montañas.png', description: 'Paisaje de montaña nevada majestuoso.' },
    { id: 'bg4', name: 'Ciberespacio', price: 3500, image: '/src/assets/Ciberespacio.png', description: 'Fondo digital futurista con efectos neon.' },
    { id: 'bg5', name: 'Bosque Mágico', price: 2800, image: 'https://via.placeholder.com/300x200/228B22/FFFFFF?text=Bosque', description: 'Bosque encantado con luces mágicas.' },
    { id: 'bg6', name: 'Desierto Dorado', price: 2600, image: 'https://via.placeholder.com/300x200/FFD700/8B4513?text=Desierto', description: 'Desierto infinito con dunas doradas.' },
    { id: 'bg7', name: 'Océano Profundo', price: 3100, image: 'https://via.placeholder.com/300x200/000080/00BFFF?text=Oceano', description: 'Fondos marinos con criaturas abisales.' },
    { id: 'bg8', name: 'Aurora Boreal', price: 3800, image: 'https://via.placeholder.com/300x200/00FF7F/000080?text=Aurora', description: 'Aurora boreal en el cielo nocturno.' },
    { id: 'bg9', name: 'Volcán Activo', price: 3600, image: 'https://via.placeholder.com/300x200/FF4500/8B0000?text=Volcan', description: 'Volcán en erupción con lava ardiente.' },
    { id: 'bg10', name: 'Cascada Cristalina', price: 2900, image: 'https://via.placeholder.com/300x200/00CED1/006400?text=Cascada', description: 'Cascada de agua cristalina en la jungla.' },
    { id: 'bg11', name: 'Castillo Gótico', price: 4000, image: 'https://via.placeholder.com/300x200/4B0082/FFFFFF?text=Castillo', description: 'Castillo gótico en la cima de una montaña.' },
    { id: 'bg12', name: 'Estación Espacial', price: 4200, image: 'https://via.placeholder.com/300x200/696969/00BFFF?text=Estacion', description: 'Estación espacial orbitando la Tierra.' },
  ],
  miniprofiles: [
    { id: 'mp1', name: 'Mini Hacker', price: 4000, image: 'https://via.placeholder.com/120x120/23263a/00BFFF?text=Hacker', description: 'Miniperfil hacker con efectos de código.' },
    { id: 'mp2', name: 'Mini Ninja', price: 4200, image: 'https://via.placeholder.com/120x120/23263a/00BFFF?text=Ninja', description: 'Miniperfil ninja veloz y sigiloso.' },
    { id: 'mp3', name: 'Mini Cyborg', price: 4100, image: 'https://via.placeholder.com/120x120/23263a/00BFFF?text=Cyborg', description: 'Miniperfil mitad humano, mitad máquina.' },
    { id: 'mp4', name: 'Mini Samurái', price: 4300, image: 'https://via.placeholder.com/120x120/23263a/FFD700?text=Samurai', description: 'Miniperfil de guerrero samurái honorable.' },
    { id: 'mp5', name: 'Mini Mago', price: 4400, image: 'https://via.placeholder.com/120x120/23263a/9932CC?text=Mago', description: 'Miniperfil de mago con poderes arcanos.' },
    { id: 'mp6', name: 'Mini Pirata', price: 3900, image: 'https://via.placeholder.com/120x120/23263a/FF4500?text=Pirata', description: 'Miniperfil de pirata del Caribe.' },
    { id: 'mp7', name: 'Mini Robot', price: 4500, image: 'https://via.placeholder.com/120x120/23263a/C0C0C0?text=Robot', description: 'Miniperfil de robot futurista.' },
    { id: 'mp8', name: 'Mini Dragón', price: 4800, image: 'https://via.placeholder.com/120x120/23263a/FF0000?text=Dragon', description: 'Miniperfil de dragón legendario.' },
    { id: 'mp9', name: 'Mini Vampiro', price: 4600, image: 'https://via.placeholder.com/120x120/23263a/8B0000?text=Vampiro', description: 'Miniperfil de vampiro elegante.' },
    { id: 'mp10', name: 'Mini Alien', price: 4700, image: 'https://via.placeholder.com/120x120/23263a/00FF00?text=Alien', description: 'Miniperfil de extraterrestre misterioso.' },
    { id: 'mp11', name: 'Mini Caballero', price: 4200, image: 'https://via.placeholder.com/120x120/23263a/C0C0C0?text=Caballero', description: 'Miniperfil de caballero medieval.' },
    { id: 'mp12', name: 'Mini Superhéroe', price: 4900, image: 'https://via.placeholder.com/120x120/23263a/FFD700?text=Heroe', description: 'Miniperfil de superhéroe con poderes.' },
  ],
  frames: [
    { id: 'fr1', name: 'Marco Dorado', price: 2000, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Gold', description: 'Marco elegante dorado con detalles.' },
    { id: 'fr2', name: 'Marco Azul', price: 1800, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Blue', description: 'Marco con acento azul eléctrico.' },
    { id: 'fr3', name: 'Marco Pixel', price: 2100, image: 'https://via.placeholder.com/120x120/23263a/FFD700?text=Pixel', description: 'Marco estilo pixel art retro.' },
    { id: 'fr4', name: 'Marco Diamante', price: 2500, image: 'https://via.placeholder.com/120x120/B9F2FF/23263a?text=Diamond', description: 'Marco de diamante con brillos.' },
    { id: 'fr5', name: 'Marco Fuego', price: 2200, image: 'https://via.placeholder.com/120x120/FF4500/23263a?text=Fuego', description: 'Marco con efectos de fuego animado.' },
    { id: 'fr6', name: 'Marco Hielo', price: 2300, image: 'https://via.placeholder.com/120x120/00CED1/23263a?text=Hielo', description: 'Marco de hielo cristalino.' },
    { id: 'fr7', name: 'Marco Arcoíris', price: 2400, image: 'https://via.placeholder.com/120x120/FF69B4/23263a?text=Rainbow', description: 'Marco multicolor con arcoíris.' },
    { id: 'fr8', name: 'Marco Neon', price: 2600, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Neon', description: 'Marco con efectos neon brillantes.' },
    { id: 'fr9', name: 'Marco Gótico', price: 2700, image: 'https://via.placeholder.com/120x120/4B0082/23263a?text=Gotico', description: 'Marco gótico con detalles oscuros.' },
    { id: 'fr10', name: 'Marco Cibernético', price: 2800, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Cyber', description: 'Marco con diseño cibernético.' },
    { id: 'fr11', name: 'Marco Mágico', price: 2900, image: 'https://via.placeholder.com/120x120/9932CC/23263a?text=Magico', description: 'Marco con efectos mágicos.' },
    { id: 'fr12', name: 'Marco Legendario', price: 3000, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Legend', description: 'Marco legendario exclusivo.' },
  ],
  animated: [
    { id: 'an1', name: 'Avatar Ninja', price: 5000, image: '/src/assets/Ninja2.png', description: 'Avatar animado ninja con movimientos fluidos.' },
    { id: 'an2', name: 'Avatar Robot', price: 5200, image: '/src/assets/Robot2.png', description: 'Avatar animado robot con efectos mecánicos.' },
    { id: 'an3', name: 'Avatar Dragón', price: 5400, image: '/src/assets/Dragon.png', description: 'Avatar animado dragón legendario.' },
    { id: 'an4', name: 'Avatar Samurái', price: 5300, image: '/src/assets/Samurai.png', description: 'Avatar de samurái con katana.' },
    { id: 'an5', name: 'Avatar Mago', price: 5500, image: '/src/assets/Mago.png', description: 'Avatar de mago con varita mágica.' },
    { id: 'an6', name: 'Avatar Pirata', price: 5100, image: '/src/assets/Pirata.png', description: 'Avatar de pirata con parche.' },
    { id: 'an7', name: 'Avatar Vampiro', price: 5600, image: '/src/assets/Vampiro.png', description: 'Avatar de vampiro elegante.' },
    { id: 'an8', name: 'Avatar Alien', price: 5700, image: 'https://via.placeholder.com/120x120/23263a/00FF00?text=Alien', description: 'Avatar de extraterrestre misterioso.' },
    { id: 'an9', name: 'Avatar Caballero', price: 5400, image: 'https://via.placeholder.com/120x120/23263a/C0C0C0?text=Caballero', description: 'Avatar de caballero medieval.' },
    { id: 'an10', name: 'Avatar Superhéroe', price: 5800, image: 'https://via.placeholder.com/120x120/23263a/FFD700?text=Heroe', description: 'Avatar de superhéroe con capa.' },
    { id: 'an11', name: 'Avatar Zombie', price: 5200, image: 'https://via.placeholder.com/120x120/23263a/00FF00?text=Zombie', description: 'Avatar de zombie espeluznante.' },
    { id: 'an12', name: 'Avatar Fantasma', price: 5300, image: 'https://via.placeholder.com/120x120/23263a/FFFFFF?text=Fantasma', description: 'Avatar de fantasma transparente.' },
  ],
  badges: [
    { id: 'bd1', name: 'Insignia Hacker', price: 1500, image: 'https://via.placeholder.com/100x100/00BFFF/23263a?text=H', description: 'Insignia para expertos en seguridad.' },
    { id: 'bd2', name: 'Insignia MVP', price: 1700, image: 'https://via.placeholder.com/100x100/FFD700/23263a?text=MVP', description: 'Insignia para jugadores destacados.' },
    { id: 'bd3', name: 'Insignia Legendaria', price: 2000, image: 'https://via.placeholder.com/100x100/23263a/FFD700?text=Legend', description: 'Insignia de edición limitada.' },
    { id: 'bd4', name: 'Insignia Pro', price: 1800, image: 'https://via.placeholder.com/100x100/00FF00/23263a?text=Pro', description: 'Insignia para profesionales.' },
    { id: 'bd5', name: 'Insignia Elite', price: 2200, image: 'https://via.placeholder.com/100x100/FF4500/23263a?text=Elite', description: 'Insignia para la élite.' },
    { id: 'bd6', name: 'Insignia Gamer', price: 1600, image: 'https://via.placeholder.com/100x100/9932CC/23263a?text=Gamer', description: 'Insignia para gamers hardcore.' },
    { id: 'bd7', name: 'Insignia Creador', price: 1900, image: 'https://via.placeholder.com/100x100/FF69B4/23263a?text=Creador', description: 'Insignia para creadores de contenido.' },
    { id: 'bd8', name: 'Insignia Mentor', price: 2100, image: 'https://via.placeholder.com/100x100/00CED1/23263a?text=Mentor', description: 'Insignia para mentores de la comunidad.' },
    { id: 'bd9', name: 'Insignia Innovador', price: 2300, image: 'https://via.placeholder.com/100x100/FFD700/23263a?text=Innovador', description: 'Insignia para innovadores.' },
    { id: 'bd10', name: 'Insignia Líder', price: 2400, image: 'https://via.placeholder.com/100x100/4B0082/23263a?text=Lider', description: 'Insignia para líderes de equipo.' },
    { id: 'bd11', name: 'Insignia Campeón', price: 2500, image: 'https://via.placeholder.com/100x100/FF0000/23263a?text=Campeon', description: 'Insignia para campeones.' },
    { id: 'bd12', name: 'Insignia Maestro', price: 2600, image: 'https://via.placeholder.com/100x100/FFFFFF/23263a?text=Maestro', description: 'Insignia para maestros del juego.' },
  ],
  season: [
    { id: 'ss1', name: 'Perfil Invierno', price: 3500, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Winter', description: 'Perfil de temporada invernal con nieve.' },
    { id: 'ss2', name: 'Perfil Verano', price: 3400, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Summer', description: 'Perfil de temporada veraniega soleado.' },
    { id: 'ss3', name: 'Perfil Halloween', price: 3700, image: 'https://via.placeholder.com/120x120/23263a/FFD700?text=Halloween', description: 'Perfil de temporada de Halloween.' },
    { id: 'ss4', name: 'Perfil Navidad', price: 3600, image: 'https://via.placeholder.com/120x120/FF0000/23263a?text=Navidad', description: 'Perfil festivo de Navidad.' },
    { id: 'ss5', name: 'Perfil Primavera', price: 3300, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Primavera', description: 'Perfil de primavera con flores.' },
    { id: 'ss6', name: 'Perfil Otoño', price: 3400, image: 'https://via.placeholder.com/120x120/FFA500/23263a?text=Otono', description: 'Perfil de otoño con hojas doradas.' },
    { id: 'ss7', name: 'Perfil San Valentín', price: 3800, image: 'https://via.placeholder.com/120x120/FF69B4/23263a?text=Valentin', description: 'Perfil romántico de San Valentín.' },
    { id: 'ss8', name: 'Perfil Año Nuevo', price: 3900, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=2024', description: 'Perfil festivo de Año Nuevo.' },
    { id: 'ss9', name: 'Perfil Pascua', price: 3500, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Pascua', description: 'Perfil de Pascua con huevos.' },
    { id: 'ss10', name: 'Perfil Día de Muertos', price: 3700, image: 'https://via.placeholder.com/120x120/FFA500/23263a?text=Muertos', description: 'Perfil del Día de Muertos.' },
    { id: 'ss11', name: 'Perfil Independencia', price: 3600, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Independencia', description: 'Perfil patriótico de independencia.' },
    { id: 'ss12', name: 'Perfil Carnaval', price: 4000, image: 'https://via.placeholder.com/120x120/FF69B4/23263a?text=Carnaval', description: 'Perfil colorido de carnaval.' },
  ],
  plates: [
    { id: 'pl1', name: 'Placa Pro', price: 1000, image: 'https://via.placeholder.com/120x60/00BFFF/23263a?text=Pro', description: 'Placa de nombre profesional.' },
    { id: 'pl2', name: 'Placa Elite', price: 1200, image: 'https://via.placeholder.com/120x60/FFD700/23263a?text=Elite', description: 'Placa de nombre para élite.' },
    { id: 'pl3', name: 'Placa Gamer', price: 1100, image: 'https://via.placeholder.com/120x60/23263a/00BFFF?text=Gamer', description: 'Placa de nombre para gamers.' },
    { id: 'pl4', name: 'Placa Hacker', price: 1300, image: 'https://via.placeholder.com/120x60/00FF00/23263a?text=Hacker', description: 'Placa de nombre para hackers.' },
    { id: 'pl5', name: 'Placa Legend', price: 1500, image: 'https://via.placeholder.com/120x60/FFD700/23263a?text=Legend', description: 'Placa de nombre legendaria.' },
    { id: 'pl6', name: 'Placa Master', price: 1400, image: 'https://via.placeholder.com/120x60/9932CC/23263a?text=Master', description: 'Placa de nombre para maestros.' },
    { id: 'pl7', name: 'Placa Champion', price: 1600, image: 'https://via.placeholder.com/120x60/FF4500/23263a?text=Champion', description: 'Placa de nombre para campeones.' },
    { id: 'pl8', name: 'Placa VIP', price: 1700, image: 'https://via.placeholder.com/120x60/FF69B4/23263a?text=VIP', description: 'Placa de nombre VIP exclusiva.' },
    { id: 'pl9', name: 'Placa Boss', price: 1800, image: 'https://via.placeholder.com/120x60/4B0082/23263a?text=Boss', description: 'Placa de nombre para jefes.' },
    { id: 'pl10', name: 'Placa Hero', price: 1900, image: 'https://via.placeholder.com/120x60/00CED1/23263a?text=Hero', description: 'Placa de nombre para héroes.' },
    { id: 'pl11', name: 'Placa Warrior', price: 2000, image: 'https://via.placeholder.com/120x60/FF0000/23263a?text=Warrior', description: 'Placa de nombre para guerreros.' },
    { id: 'pl12', name: 'Placa King', price: 2500, image: 'https://via.placeholder.com/120x60/FFD700/23263a?text=King', description: 'Placa de nombre real.' },
  ],
};

// Productos específicos para Teams
const teamProducts: Record<string, Product[]> = {
  backgrounds: [
    { id: 'tbg1', name: 'Fondo Team Elite', price: 5000, image: 'https://via.placeholder.com/300x200/FFD700/23263a?text=Team+Elite', description: 'Fondo exclusivo para equipos de élite.' },
    { id: 'tbg2', name: 'Fondo Team Pro', price: 4500, image: 'https://via.placeholder.com/300x200/00BFFF/23263a?text=Team+Pro', description: 'Fondo profesional para equipos pro.' },
    { id: 'tbg3', name: 'Fondo Team Champions', price: 6000, image: 'https://via.placeholder.com/300x200/FF4500/23263a?text=Champions', description: 'Fondo para campeones de equipos.' },
    { id: 'tbg4', name: 'Fondo Team Legends', price: 7000, image: 'https://via.placeholder.com/300x200/9932CC/23263a?text=Legends', description: 'Fondo legendario para equipos míticos.' },
    { id: 'tbg5', name: 'Fondo Team Warriors', price: 5500, image: 'https://via.placeholder.com/300x200/00FF00/23263a?text=Warriors', description: 'Fondo para guerreros de equipo.' },
    { id: 'tbg6', name: 'Fondo Team Masters', price: 6500, image: 'https://via.placeholder.com/300x200/FF69B4/23263a?text=Masters', description: 'Fondo para maestros de equipo.' },
  ],
  miniprofiles: [
    { id: 'tmp1', name: 'Mini Team Leader', price: 6000, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Leader', description: 'Miniperfil para líderes de equipo.' },
    { id: 'tmp2', name: 'Mini Team Captain', price: 5800, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Captain', description: 'Miniperfil para capitanes de equipo.' },
    { id: 'tmp3', name: 'Mini Team Strategist', price: 6200, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Strategy', description: 'Miniperfil para estrategas de equipo.' },
    { id: 'tmp4', name: 'Mini Team Defender', price: 5700, image: 'https://via.placeholder.com/120x120/FF4500/23263a?text=Defender', description: 'Miniperfil para defensores de equipo.' },
    { id: 'tmp5', name: 'Mini Team Attacker', price: 5900, image: 'https://via.placeholder.com/120x120/FF0000/23263a?text=Attacker', description: 'Miniperfil para atacantes de equipo.' },
    { id: 'tmp6', name: 'Mini Team Support', price: 5600, image: 'https://via.placeholder.com/120x120/00CED1/23263a?text=Support', description: 'Miniperfil para soporte de equipo.' },
  ],
  frames: [
    { id: 'tfr1', name: 'Marco Team Gold', price: 3500, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Team+Gold', description: 'Marco dorado para equipos.' },
    { id: 'tfr2', name: 'Marco Team Silver', price: 3200, image: 'https://via.placeholder.com/120x120/C0C0C0/23263a?text=Team+Silver', description: 'Marco plateado para equipos.' },
    { id: 'tfr3', name: 'Marco Team Bronze', price: 3000, image: 'https://via.placeholder.com/120x120/CD7F32/23263a?text=Team+Bronze', description: 'Marco bronce para equipos.' },
    { id: 'tfr4', name: 'Marco Team Diamond', price: 4000, image: 'https://via.placeholder.com/120x120/B9F2FF/23263a?text=Team+Diamond', description: 'Marco diamante para equipos.' },
    { id: 'tfr5', name: 'Marco Team Platinum', price: 4500, image: 'https://via.placeholder.com/120x120/E5E4E2/23263a?text=Team+Platinum', description: 'Marco platino para equipos.' },
    { id: 'tfr6', name: 'Marco Team Elite', price: 5000, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Team+Elite', description: 'Marco élite para equipos.' },
  ],
  animated: [
    { id: 'tan1', name: 'Avatar Team Leader', price: 7000, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Team+Leader', description: 'Avatar animado para líderes de equipo.' },
    { id: 'tan2', name: 'Avatar Team Captain', price: 6800, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Team+Captain', description: 'Avatar animado para capitanes.' },
    { id: 'tan3', name: 'Avatar Team Warrior', price: 7200, image: 'https://via.placeholder.com/120x120/FF4500/23263a?text=Team+Warrior', description: 'Avatar animado para guerreros de equipo.' },
    { id: 'tan4', name: 'Avatar Team Mage', price: 7500, image: 'https://via.placeholder.com/120x120/9932CC/23263a?text=Team+Mage', description: 'Avatar animado para magos de equipo.' },
    { id: 'tan5', name: 'Avatar Team Archer', price: 7300, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Team+Archer', description: 'Avatar animado para arqueros de equipo.' },
    { id: 'tan6', name: 'Avatar Team Knight', price: 7100, image: 'https://via.placeholder.com/120x120/C0C0C0/23263a?text=Team+Knight', description: 'Avatar animado para caballeros de equipo.' },
  ],
  badges: [
    { id: 'tbd1', name: 'Insignia Team Leader', price: 2500, image: 'https://via.placeholder.com/100x100/FFD700/23263a?text=TL', description: 'Insignia para líderes de equipo.' },
    { id: 'tbd2', name: 'Insignia Team Captain', price: 2300, image: 'https://via.placeholder.com/100x100/00BFFF/23263a?text=TC', description: 'Insignia para capitanes de equipo.' },
    { id: 'tbd3', name: 'Insignia Team MVP', price: 2800, image: 'https://via.placeholder.com/100x100/FF4500/23263a?text=TMVP', description: 'Insignia MVP para equipos.' },
    { id: 'tbd4', name: 'Insignia Team Champion', price: 3000, image: 'https://via.placeholder.com/100x100/FFD700/23263a?text=TChamp', description: 'Insignia para campeones de equipo.' },
    { id: 'tbd5', name: 'Insignia Team Elite', price: 3200, image: 'https://via.placeholder.com/100x100/9932CC/23263a?text=TElite', description: 'Insignia para élite de equipos.' },
    { id: 'tbd6', name: 'Insignia Team Legend', price: 3500, image: 'https://via.placeholder.com/100x100/FFD700/23263a?text=TLegend', description: 'Insignia legendaria para equipos.' },
  ],
  season: [
    { id: 'tss1', name: 'Perfil Team Winter', price: 4500, image: 'https://via.placeholder.com/120x120/00BFFF/23263a?text=Team+Winter', description: 'Perfil de invierno para equipos.' },
    { id: 'tss2', name: 'Perfil Team Summer', price: 4400, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Team+Summer', description: 'Perfil de verano para equipos.' },
    { id: 'tss3', name: 'Perfil Team Spring', price: 4300, image: 'https://via.placeholder.com/120x120/00FF00/23263a?text=Team+Spring', description: 'Perfil de primavera para equipos.' },
    { id: 'tss4', name: 'Perfil Team Autumn', price: 4400, image: 'https://via.placeholder.com/120x120/FFA500/23263a?text=Team+Autumn', description: 'Perfil de otoño para equipos.' },
    { id: 'tss5', name: 'Perfil Team Championship', price: 5000, image: 'https://via.placeholder.com/120x120/FFD700/23263a?text=Team+Champ', description: 'Perfil de campeonato para equipos.' },
    { id: 'tss6', name: 'Perfil Team Tournament', price: 4800, image: 'https://via.placeholder.com/120x120/FF4500/23263a?text=Team+Tourney', description: 'Perfil de torneo para equipos.' },
  ],
  plates: [
    { id: 'tpl1', name: 'Placa Team Elite', price: 2000, image: 'https://via.placeholder.com/120x60/FFD700/23263a?text=Team+Elite', description: 'Placa para equipos de élite.' },
    { id: 'tpl2', name: 'Placa Team Pro', price: 1800, image: 'https://via.placeholder.com/120x60/00BFFF/23263a?text=Team+Pro', description: 'Placa para equipos profesionales.' },
    { id: 'tpl3', name: 'Placa Team Champion', price: 2500, image: 'https://via.placeholder.com/120x60/FF4500/23263a?text=Team+Champ', description: 'Placa para equipos campeones.' },
    { id: 'tpl4', name: 'Placa Team Legend', price: 3000, image: 'https://via.placeholder.com/120x60/FFD700/23263a?text=Team+Legend', description: 'Placa legendaria para equipos.' },
    { id: 'tpl5', name: 'Placa Team Master', price: 2200, image: 'https://via.placeholder.com/120x60/9932CC/23263a?text=Team+Master', description: 'Placa para maestros de equipo.' },
    { id: 'tpl6', name: 'Placa Team Warrior', price: 2400, image: 'https://via.placeholder.com/120x60/00FF00/23263a?text=Team+Warrior', description: 'Placa para guerreros de equipo.' },
  ],
};

const getBadge = (id: string) => {
  // Deterministic badge for demo
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

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('backgrounds');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('default');
  const [cart, setCart] = useState<Product[]>([]);
  const [userPoints, setUserPoints] = useState(getUserPoints());
  const [userBluePoints] = useState(userMock.bluePoints);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showTeamProducts, setShowTeamProducts] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserPoints(getUserPoints());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      setUserPoints((pts) => pts - product.price);
      setSuccessMessage(`¡${product.name} adquirido!`);
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
                  'bg-cyan-500 text-white'
                }`}>
                  {badge}
                </span>
              )}
              
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
            
            {/* Botón para ver más productos de equipo */}
            <div className="text-center mt-8">
              <button
                onClick={() => setShowTeamProducts(true)}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver todos los productos para equipos
              </button>
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
              {modalProduct.id.startsWith('t') ? (
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
              <div className="flex items-center justify-center gap-3 bg-[#181A20] rounded-xl p-4">
                <FaCoins color={ACCENT} size={24} />
                <span className="font-bold text-2xl text-blue-400">{modalProduct.price}</span>
                <span className="text-sm text-gray-400 font-medium">Puntos</span>
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