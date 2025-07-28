import React, { useState } from 'react';

const sections = [
  'Usuarios',
  'Beneficios',
  'Tienda',
  'Duelos',
  'Puntos',
  'Gulag',
];

const sectionContent: Record<string, React.ReactNode> = {
  Usuarios: (
    <div className="space-y-4 text-left">
      <p>
        Dentro del ecosistema de Matt los usuarios o players se enfrentaran en torneos mensuales los cuales se basaran en arreglar la mayor cantidad de vulnerabilidades de la categoría aceptada.<br/>
        Los usuarios podrán contar con un perfil en el cual se lograra visualizar tus estadísticas junto con un Feedback mensual.<br/>
        Los usuarios no solamente podrán derrotar a los otros equipos mediante resoluciones normales, los usuarios pueden dar o cazar las recompensas para la resolución de las vulnerabilidades.
      </p>
      <h2 className="font-bold text-lg mt-6">¿Qué puede ganar el usuario?</h2>
      <ul className="list-disc ml-6">
        <li>Ofertar o cazar puntos para la resolución de vulnerabilidades de otros equipos.</li>
        <li>Ganar la etiqueta de MVP.</li>
        <li>Derrotar a otros mediante duelos.</li>
        <li>Ganar BluePoints mediante otros medios.</li>
      </ul>
      <h2 className="font-bold text-lg mt-6">¿Qué puedo perder?</h2>
      <ul className="list-disc ml-6">
        <li>Si eres un player inactivo, no puedes ganar puntos ni BluePoints y obtendrás la derrota automática del Gulag.</li>
      </ul>
      <h2 className="font-bold text-lg mt-6">MVP</h2>
      <p>
        El MVP es el usuario o el equipo con el mejor desempeño en un mes, disfrutando de diferentes recompensas y privilegios. Teniendo una racha de 3 meses siendo MVP (Teams, User o ambos) se obtiene acceso a una tienda exclusiva.
      </p>
    </div>
  ),
  Beneficios: (
    <div className="space-y-4 text-left">
      <h2 className="font-bold text-lg">Beneficios</h2>
      <ul className="list-disc ml-6">
        <li>Acceso a la tienda de puntos</li>
        <li>Emblema de temporada</li>
        <li>Insignia</li>
        <li>Título</li>
      </ul>
      <h2 className="font-bold text-lg mt-6">Recompensas si el MVP tiene una racha de tres meses seguidos:</h2>
      <ul className="list-disc ml-6">
        <li>Desbloqueará todas las ofertas de la tienda.</li>
        <li>MVP Team: 10% extra en puntos totales al mes.</li>
        <li>MVP User: 15% extra en puntos al mes.</li>
        <li>Si el MVP Team y MVP User están en el mismo equipo, los puntos extra no son acumulativos; solo se premia con el 15% extra.</li>
        <li>El MVP está obligado a aceptar un duelo.</li>
      </ul>
    </div>
  ),
  Tienda: (
    <div className="space-y-4 text-left">
      <h2 className="font-bold text-lg">Tienda</h2>
      <ul className="list-disc ml-6">
        <li>La tienda de MVP team y user tendrán objetos diferentes.</li>
        <li>Por tener racha de 3 meses siendo MVP tanto de team como en user, podrán comprar objetos exclusivos dentro de la tienda.</li>
        <li>Al no ser MVP no tendrá acceso a la tienda del MVP.</li>
      </ul>
    </div>
  ),
  Duelos: (
    <div className="space-y-4 text-left">
      <h2 className="font-bold text-lg">Duelos</h2>
      <p>
        Enfrentamientos de usuarios y equipos: Los duelos consisten en un enfrentamiento amistoso entre usuarios o equipos. Al entrar a un duelo será necesario pagar con puntos de la misma web, el costo depende de la sección aceptada, donde se dará un tiempo límite para resolver la mayor cantidad de vulnerabilidades de la categoría aceptada. El usuario o equipo que resuelva más vulnerabilidades ganaría el enfrentamiento. Los enfrentamientos son opcionales y deben ser aceptados por ambas partes (si un integrante no está en el evento grupal aún se le considerará al momento de perder o ganar). En caso de los equipos, el representante debe aceptar el enfrentamiento en nombre de todo el equipo.
      </p>
      <h2 className="font-bold text-lg mt-6">¿Qué podrías ganar?</h2>
      <ul className="list-disc ml-6">
        <li>Los ganadores de los enfrentamientos obtendrán los puntos del perdedor a proporción de la categoría de entrada y se les devolverá el costo de entrada.</li>
        <li>En el modo por equipo, se dará una porción equitativa a todos los miembros del equipo ganador y se ganarán puntos para el equipo.</li>
      </ul>
      <h2 className="font-bold text-lg mt-6">¿Qué puedes perder?</h2>
      <ul className="list-disc ml-6">
        <li>Los puntos perdidos serán a proporción de la categoría aceptada.</li>
      </ul>
    </div>
  ),
  Puntos: (
    <div className="space-y-4 text-left">
      <h2 className="font-bold text-lg">¿Qué es?</h2>
      <p>Un sistema que reconoce tu esfuerzo y aprendizaje, premiando cada acción con puntos que reflejan tu progreso.</p>
      <h2 className="font-bold text-lg mt-6">¿Cómo ganas puntos?</h2>
      <ul className="list-disc ml-6">
        <li>Corrigiendo vulnerabilidades</li>
        <li>Participando en torneos</li>
        <li>Documentando las soluciones</li>
      </ul>
      <h2 className="font-bold text-lg mt-6">¿Cómo pierdes puntos?</h2>
      <ul className="list-disc ml-6">
        <li>No cumplir tareas</li>
        <li>Perder batallas</li>
        <li>Entregar reportes falsos</li>
      </ul>
      <h2 className="font-bold text-lg mt-6">Blue-Points (BP)</h2>
      <ul className="list-disc ml-6">
        <li>Mérito técnico canjeable por premios</li>
        <li>Se obtienen al convertir puntos normales</li>
        <li><b>¡Canjéalos a tiempo o los perderás!</b></li>
      </ul>
      <h2 className="font-bold text-lg mt-6">Documentación</h2>
      <p>Es clave para obtener puntos extra y BP:<br/>Explica qué se resolvió, cómo y las dificultades enfrentadas.</p>
      <h2 className="font-bold text-lg mt-6">¿Qué ganas?</h2>
      <ul className="list-disc ml-6">
        <li>Puntos</li>
        <li>Blue-Points</li>
        <li>Recompensas</li>
        <li>Subir en el ranking</li>
      </ul>
    </div>
  ),
  Gulag: (
    <div className="space-y-4 text-left">
      <h2 className="font-bold text-lg">¿Qué es el Gulag?</h2>
      <p>
        El gulag será una competencia obligatoria para los 5 usuarios que estén más abajo en el posicionamiento. ¿En qué consiste? Estos 5 usuarios competirán durante 15 días seguidos, tendrán que resolver la mayor cantidad de vulnerabilidades.
      </p>
      <ul className="list-disc ml-6">
        <li>El que resuelva la mayor cantidad de vulnerabilidades durante esos 15 días se salvará del gulag y los otros 4 usuarios tendrán que cumplir con el castigo.</li>
        <li>El usuario que ingrese al gulag y corrija la mayor cantidad de vulnerabilidades será exento del castigo.</li>
        <li>Los 4 usuarios con menor número de vulnerabilidades resueltas en la finalización del gulag tendrán que acudir al campus durante una semana seguida en su horario laboral completo.</li>
      </ul>
      <h2 className="font-bold text-lg mt-6">Casos excepcionales:</h2>
      <ul className="list-disc ml-6">
        <li>Si un usuario pierde el gulag 2 veces consecutivas, su castigo será acudir 2 semanas seguidas al campus en su horario laboral completo.</li>
        <li>Si un usuario pierde el gulag por 3 vez consecutiva, el usuario y el equipo donde dicho usuario pertenece tendrán que asistir un mes completo al campus en su horario laboral completo.</li>
      </ul>
    </div>
  ),
};

const Rules: React.FC = () => {
  const [selected, setSelected] = useState(sections[0]);
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="w-full h-full flex bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl shadow-2xl border-2 border-purple-500 overflow-hidden mx-auto max-w-7xl max-h-[calc(100vh-2rem)]">
        {/* Sidebar */}
        <nav className="flex flex-col gap-6 bg-gradient-to-b from-gray-800 to-gray-900 border-r-2 border-purple-500 py-12 px-6 min-w-[220px] h-full">
          {sections.map((sec) => (
            <button
              key={sec}
              className={`text-lg rounded-xl px-4 py-3 text-left font-semibold transition-all w-full ${selected === sec ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-800'}`}
              onClick={() => setSelected(sec)}
            >
              {sec}
            </button>
          ))}
        </nav>
        {/* Área de contenido */}
        <main className="flex-1 flex flex-col p-12 h-full overflow-y-auto">
          <h1 className="text-4xl font-bold mb-8 text-white w-full text-left">{selected}</h1>
          <div className="text-xl text-gray-300 max-w-4xl w-full pb-8">
            {sectionContent[selected]}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Rules; 