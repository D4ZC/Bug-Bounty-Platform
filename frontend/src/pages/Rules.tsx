import React, { useState } from 'react';

const rules = [
  {
    title: 'Equipos',
    content: `Equipos...En el ecosistema de Matt, los equipos compiten con un objetivo claro: conquistar la Corona Dorada. Matt funciona como la organización principal, una especie de núcleo o "cabeza", dentro del cual operan múltiples equipos especializados. Cada uno de estos equipos se dedica a resolver vulnerabilidades de páginas web, enfrentándose a desafíos técnicos que ponen a prueba sus habilidades en análisis y toma de decisiones bajo presión.

¿Qué podrías ganar?
-Customiza a tu equipo
-Insignias Grupales
-Obtención de premios
-Ser top one en tu área
-Ser MVP en el torneo

¿Qué podrías perder?
-Penalizaciones grupales
-No ingresar a torneos
-Oportunidad de ganar puntos
-Si no resuelven al menos una vulnerabilidad al mes, se les otorgara una penalización en la cual perderán puntos por equipo.`
  },
  {
    title: 'Usuarios',
    content: `Usuarios
Dentro del ecosistema de Matt los usuarios o players se enfrentaran en torneos mensuales los cuales se basaran en arreglar la mayor cantidad de vulnerabilidades de la categoría aceptada. Los usuarios podrán contar con un perfil en el cual se lograra visualzar tus estadisticas junto con un FeedBack mensual. Los usuarios no solamente podran derrotar a los otros equipos mediante resolucciones normales, los usuarios pueden dar o cazar las recopensas para la resolución de las vulnerabilidades.

¿Qué puede ganar el usuario?
Como player puedes ofertar o cazar puntos para la resolución de vulnerabilidades de otros equipos, también puedes ganar la etiqueta de MVP, ser capaz de derrotar a otros mediante duelos y ganar BluePoints mediante otros medios.

¿Qué puedo perder?
Si eres un player inactivo, no pedes ganar puntos, ni Bluepoints y obtendras la derrota automatica del Gulag.`
  },
  {
    title: 'MVP',
    content: `MVP: El MVP es el usuario o el equipo con el mejor desempeño en un mes, disfrutando de diferentes recompensas yb privilegios teniendo una racha de 3 meses siendo MVP(Teams, User ó los 2) teniendo acceso a una tienda exclusiva.

BENEFICIOS:
-Acceso a la tienda de puntos
-Emblema de temporada
-Insignia
-Titulo
Recompensas si el MVP tiene una racha de tres meses seguidos:
-Desbloqueará todas las ofertas de la tienda.
-MVP Team 10% extra en puntos totales al mes.
-MVP User 15% extra en puntos al mes.
-En caso de que el MVP Team y MVP User estén en el mismo equipo los puntos extra no son acumulativos en este caso se premiaría únicamente con el 15% extra.
-El MVP está obligado de aceptar un duelo.
TIENDA:
-La tienda de MVP team y user tendrán objetos diferentes
-Por tener racha de 3 meses siendo MVP tanto de team como en user, podrán comprar objetos exclusivos dentro de la tienda

Al no ser MVP no tendra acceso a la tienda del MVP`
  },
  {
    title: 'Duelos',
    content: `DUELOS: Enfrentamientos de usuarios y equipos: Los duelos consisten en un enfrentamiento amistoso entre usuarios o equipos, al entrar un duelo seria necesario pagar con puntos de la misma web, el costo depende de la sección aceptada, donde se dará un tiempo limite para resolver la mayor cantidad de vulnerabilidades de la categoría aceptada, el usuario o equipo que resuelva mas vulnerabilidades ganaría el enfrentamiento, los enfrentamientos son opcionales y deben de ser aceptados por ambas partes(si un integrante no esta en el evento grupal aun se le considerara al momento de perder o ganar), en caso de los equipos el representante debe de aceptar el enfrentamiento en nombre del todo el equipo.

¿QUE PODRIAS GANAR?
Los ganadores de los enfrentamientos obtendrá los puntos del perdedor a proporción a la categoría entrada y se les devolverá el costo de entrada, en caso del modo por equipo se dará una porción equitativa a todos los miembros del equipo ganador y se ganara puntos para el quipo.

¿QUE PUEDES PERDER?
Los puntos perdidos serán a proporción de la categoría aceptada.`
  },
  {
    title: 'Puntos',
    content: `Puntos: Nuestro sistema de puntos está pensado para reconocer algo que muchas veces pasa desapercibido: tu esfuerzo, tu dedicación y esas ganas reales de aprender y mejorar cada día. Cada paso que das, cada reto que enfrentas y cada nuevo conocimiento que adquieres suma puntos. Y no son solo números: son una forma de medir tu progreso, tu constancia y tu compromiso. A medida que avanzas, también creces en el ranking, compitiendo de forma sana con otros que, como tú, están dando lo mejor de sí. Es una experiencia que mezcla aprendizaje con motivación, donde superarte se vuelve parte del juego.

¿Qué puedo ganar?
Los usuarios pueden ganar puntos al participar activamente en la plataforma. Los puntos se otorgan por:
-Corregir vulnerabilidades
-Competir en torneos
Además, los puntos pueden ser canjeados por blue-points.

¿Qué puedes perder?
Los puntos se pueden perder por las siguientes razones:
-No cumplir las tareas asignadas
-Ser derrotado en batallas individuales o grupales
-Entregar reportes o documentos falsos o no confiables`
  },
  {
    title: 'Blue Points',
    content: `Blue-Points
Dentro del ecosistema de recompensas, los Blue-Points representan el símbolo de reconocimiento al ingenio y compromiso técnico. Funcionan como una moneda de mérito, otorgada exclusivamente a quienes enfrentan y resuelven vulnerabilidades con precisión y disciplina. Cada Blue-Point acumulado es un reflejo del esfuerzo invertido en superar retos complejos, y forma parte de un sistema donde la constancia, el análisis crítico y la excelencia técnica se convierten en valores fundamentales.

Sistema de Canje
Los puntos normales son el primer paso para ganar Blue-Points, una moneda simbólica que se obtiene al superar varios desafíos técnicos. Los Blue-Points se pueden canjear por premios y recompensas tangibles.

Si los blue-points no son canjeados te quedaras sin tener interesantes premios`
  },
  {
    title: 'Puntos por documentación',
    content: `Puntos por documentación
Debe haber una sección que detalle las vulnerabilidades resueltas, incluyendo una explicación de cómo se corrigieron. Además, si hubo algún caso complicado, debe quedar registrado, explicando las dificultades y cómo se resolvieron.

¿Que ganas?
Cada publisher realizado será acreedor a BP

Si no se realiza la documentación, no se podrán obtener puntos extra. Es importante detallar las vulnerabilidades resueltas, cómo se solucionaron y, en caso de haber enfrentado algún desafío, describirlo junto con la solución implementada.`
  },
  {
    title: 'Gulag',
    content: `Gulag:
¿Que es el gulag?
El gulag sera una competencia obligatoria para los 5 usuarios que esten mas abajo en el posicionamiento, en que consiste: Estos 5 usuarios competiran durante 15 dias seguidos, tendran que resolver la mayor cantidad de vulnerabilidades. El que resuelva la mayor cantidad de vulnerabilidades durante esos 15 dias se salvara del gulag y los otros 4 usuarios tendran que cumplir con el castigo.

El usuario que ingrese al gulag y corriga la mayor cantidad de vulnerabilidades sera exento del castigo.

-Los 4 usuarios con menor numero de vulnerabilidades resueltas en la finalización del gulag tendran que acudir al campus durante una semana seguida en su horario laboral completo.
-Casos excepcionales:
Si un usuario que pierde el gulag 2 veces consecutivas su castigo sera acudir 2 semanas seguidas al campus en su horario laboral completo.
Si un usuario pierde el gulag por 3 vez consecutivas, el usuario y el equipo donde dicho usuario pertenece tendran que asistir un mes completo al campus en su horario laboral completo.`
  }
];

const Rules: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="w-full h-full bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Reglamento</h2>
      <div className="flex w-full h-[65vh] min-h-[65vh] bg-gray-100 overflow-hidden">
        {/* Sidebar de reglas */}
        <aside className="w-64 bg-gray-100 rounded-l-2xl p-6 flex flex-col gap-2 max-h-[65vh] overflow-y-auto scrollbar-none sticky top-0 border-none shadow-none">
          {rules.map((rule, idx) => (
            <button
              key={rule.title}
              onClick={() => setActiveIdx(idx)}
              className={`text-left px-4 py-2 rounded-lg font-semibold text-lg transition border-none shadow-none ${activeIdx === idx ? 'bg-gray-200 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-blue-700'}`}
            >
              {rule.title}
            </button>
          ))}
        </aside>
        {/* Contenido de la regla seleccionada */}
        <main className="flex-1 bg-white rounded-2xl p-8 ml-4 max-h-[65vh] overflow-y-auto scrollbar-none">
          <h1 className="text-3xl font-bold mb-6 text-blue-900">{rules[activeIdx].title}</h1>
          <pre className="text-gray-800 whitespace-pre-wrap text-lg">{rules[activeIdx].content}</pre>
        </main>
      </div>
      <style>{`
        body { background-color: #f9fafb !important; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Rules; 