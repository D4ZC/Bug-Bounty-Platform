Quiero que te comportes como un developer full stock especializado en React y Node.js, La situación es la siguiente estoy haciendo un proyecto de una aplicación web, Tu trabajo es comprender completamente estas funcionalidades, antes de generar código debes de hacer todas las preguntas necesarias para aclarar cualquier duda que tengas respecto al proyecto en cuestión, posteriormente se te compartirá una serie de cards donde vendrá información de planeación del proyecto, esta información será detallada con diseños, reglas del sistema técnicos, una breve descripción del proyecto es un web app donde se presentara vulnerabilidades de unas aplicaciones, esta web app tiene como objetivo recopilar y dar puntuación a las vulnerabilidades corregidas de varias aplicaciones proporcionadas, las vulnerabilidades se pueden dividir en cuatro segmentos distintos donde se clasifican el grado de complejidad, dichas segmentaciones de la dificultad de las vulnerabilidades son las siguientes:(Criticas, Altas, Medias, Bajas), dichas dificultades de las vulnerabilidades recibirán una puntuación por la resolución de estas, donde dependiendo de la gravedad de la vulnerabilidad recibirá una puntuación, dando mas puntos a las vulnerabilidades de mayor rango(criticas). Dichas vulnerabilidades serán proporcionadas por una app externa donde se contiene todos los registros de todas las vulnerabilidades de las aplicaciones, dividas por severidad, cada app esta dada a un equipo, donde el equipo es el responsable de dar solución a las vulnerabilidades presentadas. Nuestro proyecto esta organizada en dos órganos principales para la participación de los eventos dados, dicha organización es la siguiente: Users y Teams, donde los usuarios estarán en un equipo previamente asignado por la aplicación externa, la puntuación individual de cada usuario será sumada al puntaje total al equipo donde son provenientes, dicha puntuación será útil para poder dar un ranking, dicho ranking se dividirá en dos grandes tablas(scoreboards), dicha división será en un ranking de usuarios y otro de equipos, dicho ranking llevara un orden de mayor a menor, esto lo decidirá por medio de la puntuación de los usuarios y los equipos dependiendo el caso a usar, dicho ranking estará segmentado por colores donde el color negro será otorgado a los últimos cinco lugares del ranking, el color naranja será otorgado a la mitad del ranking y de color azul serán los diez lugares hacia arriba hasta llegar al top dos, donde el top uno será pintado de color verde, los usuarios que estén en color negro(los últimos cinco dentro del ranking de usuarios) celebraran un evento de carácter obligatorio llamado gulag, dicho evento se llevara acabo un duelo entre los cinco usuarios que estén en el color negro, dicho evento se dará un tiempo para resolver tantas vulnerabilidades. y el usuario que logre tener el mayor puntaje entre los demás contrincantes será el vencedor. Luego además tenemos un sistema de duelos donde estará segmentado en dos partes, dicha segmentación será la siguiente: usuarios y equipos. Para poder llevar acabo un duelo ambas partes deberán pagar el costo de entrada, dicho costo será a proporción a la categoría seleccionada. El vencedor del duelo tomara los puntos apostadas por la contraparte y además de recibir los puntos gastados al entrar al duelo en cuestión, además para seguir fomentando la colaboración amistosa entre los equipos y no tenga represalias al vencedor los nombres de los retadores serán totalmente anónimas. En caso de la inicialización de un duelo amistoso entre equipos es necesario que el representante de ambos equipos retados acepten el duelo en nombre de todos los integrantes para poder dar la inicialización del duelo, dicho duelo seguirá el mismo patrón que los duelos individuales pero en este caso los punto ganados serán repartidos equitativamente entre los integrantes del equipo vencedor y con su contraparte en caso de perder el duelo será restado equitativamente los puntos entre todos los integrantes del equipo perdedor, dichos eventos tendrán una duración determinada por el tiempo de la categoría apostada, donde el vencedor de los duelos será determinado por la cantidad de puntos obtenidos durante el tiempo propuesto en el duelo y todo esto será actualizado en tiempo real en el ranking. El proyecto presentado contara con una integración de una tienda virtual donde los usuarios podrán comprar cosméticos para la personalización de su perfil o incluso la de su propio equipo, dichos cosméticos serán como banners, marcos, etc. Además de incluir una tienda especial para los MVP(Most Valuable Player) donde tendrán acceso a cosméticos exclusivos y acceso a la recompensa de los blue points(proporción externa). Luego se integrara un apartado para poder contribuir y fomentar el compañerismo. dentro de un nabar donde dicha integración será para que los usuarios que hayan resuelto ciertas vulnerabilidades y quieran compartir sus descubrimientos a los demás, recibirán ciertos puntos a proporción al nivel de la contribución, dicha contribución será segmentada en dos grandes rasgos, dicha segmentación es la siguiente: la carga de documentación de las vulnerabilidades resueltas por el usuario, el otro rasgo es la contribución técnica de reportes de bugs encontrados en las apps trabajadas, donde en ambos rasgos se mostrara la información del usuario en cuestión, es decir nombre y foto de perfil, además de mostrar la fecha de la publicación del documento en las ambas partes. El navbar antes mencionado deberá de contener un search para poder filtrar entre usuarios o inclusive equipos de interés. Ahora te daré mas indicaciones para que el proyecto a elaborar sea lo mas optimo posible, ahora te daré una serie de cards donde contendrán información mas detallada con respecto al proyecto. Necesito que hagas todas las preguntas referentes al proyecto en cuestión donde expreses tus inconformidades del proyecto e dudas, dichas preguntas cesaran cuando se haya asegurado que has tenido un entendimiento completo del proyecto con respecto a su funcionalidad, arquitectura y lógica.

Descripción del Proyecto
Eres un desarrollador Full Stack especializado en React y Node.js. Tu tarea es desarrollar una aplicación web que registre y puntúe actividades relacionadas con la resolución de problemas en aplicaciones, promoviendo la colaboración y la competencia amistosa entre equipos y usuarios. A continuación, se describen los requisitos funcionales, técnicos y de diseño de la aplicación. Utiliza esta información para generar la arquitectura, el frontend y el backend necesarios.
Funcionalidades Principales
1. Gestión de Problemas
Los problemas detectados provienen de una herramienta externa llamada Mendscan, que genera reportes clasificados por niveles de prioridad.
Las categorías de prioridad son:
Críticas
Altas
Medias
Bajas
Cada problema resuelto otorga una puntuación proporcional a su nivel de prioridad:
Críticas: 100 puntos
Altas: 75 puntos
Medias: 50 puntos
Bajas: 25 puntos
Los datos se integrarán mediante una API con autenticación utilizando w3id de IBM. No hay limitaciones de frecuencia para consultar los datos desde Mendscan.
2. Tablas de Clasificación (Scoreboards)
La aplicación contará con dos rankings principales:
Ranking de Usuarios: Ordena a los usuarios según los puntos acumulados.
Ranking de Equipos: Ordena a los equipos según la suma de los puntos de sus integrantes.
Los rankings se actualizan automáticamente cada 15 días.
En caso de empate:
Se prioriza al usuario o equipo que haya resuelto más problemas de prioridad crítica.
Si persiste el empate, se usa el tiempo de resolución como criterio de desempate.
Los rankings están segmentados por colores:
Últimos 5 lugares: #b2babb.
Mitad del ranking: #7f8c8d.
Top 10 (excepto el primer lugar): #424949.
Primer lugar: Verde.
3. Eventos Mensuales y Competencia Especial
Reconocimientos Mensuales (MVP):
Se otorgan títulos al usuario y equipo con mayor puntuación mensual.
Recompensas:
Acceso a una tienda especial para MVPs.
Emblemas, insignias y títulos destacados.
Si el MVP mantiene una racha de 3 meses consecutivos:
Equipo MVP: 10% extra en puntos mensuales.
Usuario MVP: 15% extra en puntos mensuales.
Si el usuario MVP pertenece al equipo MVP, el bono será del 15% (no acumulativo).
Los MVPs deben aceptar al menos un reto durante el mes.
Competencia Especial:
Los últimos 5 usuarios del ranking ingresan a una competencia especial para mejorar sus puntuaciones.
Cada participante comienza con un marcador adicional en 0.
Los problemas resueltos durante la competencia suman puntos al marcador adicional y al general.
Penalización para quienes tengan menor desempeño al finalizar:
Realizar actividades asignadas presencialmente durante una semana en horario laboral.
4. Sistema de Retos
Retos Individuales y por Equipos:
Los usuarios o equipos pueden iniciar retos apostando puntos acumulados.
El costo de entrada depende de la categoría del reto:
Críticas, Altas, Medias o Bajas.
En retos de equipos, el costo incrementa según el tamaño del equipo y la cantidad de problemas requeridos.
Reglas:
Si un participante no tiene suficientes puntos, no puede participar.
Si ningún participante logra completar los requisitos del reto, los puntos apostados se pierden.
Anonimato:
Los participantes permanecen anónimos durante el reto.
Solo se revelan los ganadores al finalizar.
5. Tienda Virtual y Personalización
Catálogo de la tienda:
Fondos de perfil (1920x1080 píxeles).
Marcos para avatares (500x500 píxeles).
Avatares animados (GIF 300x300 píxeles, máx. 2MB).
Insignias especiales (150x150 píxeles).
Diseños personalizados para perfiles.
Placas de nombre (600x100 píxeles).
Puntos Premium ("Blue Points"):
Moneda premium que se obtiene canjeando puntos estándar.
Los Blue Points pueden usarse para comprar recompensas exclusivas en la tienda.
La tienda cambiará su contenido según la temporada.
6. Contribuciones Técnicas
Documentación de Problemas Resueltos:
Los usuarios pueden subir documentación sobre cómo resolvieron problemas mediante un formulario con los campos:
Nombre del documento.
Nombre del usuario que lo resolvió.
Fecha de publicación (autogenerada).
Descripción detallada del proceso y herramientas utilizadas.
Evidencia (archivos, enlaces o imágenes).
Validación:
La comunidad vota con "me gusta" o "no me gusta".
Si hay más votos positivos, la contribución se considera válida.
Reportes de Fallos:
Los usuarios pueden reportar fallos encontrados en las aplicaciones.
Validación:
Sistema de votos similar al de la documentación.
Todos los fallos reportados reciben la misma cantidad de puntos.
7. Barra de Navegación y Búsqueda
La aplicación contará con una barra de búsqueda en la navegación principal, que permitirá filtrar usuarios y equipos por:
Nombre.
Aspectos Técnicos y de Arquitectura
1. Tecnologías Clave
Frontend: React.
Backend: Node.js.
Base de Datos: MongoDB o PostgreSQL.
2. Integración con Mendscan
Usa APIs con autenticación basada en w3id de IBM.
3. Actualización de Datos
Los rankings y las puntuaciones se actualizan cada 15 días mediante tareas programadas.
WebSockets se usarán para eventos en tiempo real, como los retos y la competencia especial.
4. Escalabilidad
Recomendación para manejar el crecimiento:
Monitoreo con herramientas como New Relic.
5. Seguridad
Encripta datos sensibles como puntuaciones y apuestas.
Usa validación automática para documentos subidos (por ejemplo, detección de archivos no válidos).
Monitoriza actividades sospechosas para prevenir abusos.
Diseño y UX
Los colores del ranking son fijos y accesibles:
Últimos 5 lugares: #b2babb.
Mitad del ranking: #7f8c8d.
Top 10: #424949.
Primer lugar: Verde.
Notificaciones:
Los usuarios en la competencia especial recibirán un correo automático y una alerta al iniciar sesión.
Extras
Métricas sugeridas:
Usuarios: Problemas resueltos, promedio de prioridad de los problemas, contribuciones técnicas.
Equipos: Puntuación acumulada, porcentaje de participación, ranking mensual.
Reportes para administradores: Estadísticas generales de la aplicación.