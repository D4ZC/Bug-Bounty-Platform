import React, { useState, useEffect } from 'react';
import { useTranslation } from '../utils/useTranslation';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import lowlight from 'lowlight/lib/core';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import dayjs from 'dayjs';
import SubmissionSuccess from '../components/ui/SubmissionSuccess';

import { useNotifications } from '../contexts/NotificationContext';
import { usePoints } from '../contexts/PointsContext';

// Simulación de explicaciones aprobadas
const mockExplanations = [
  {
    id: 'e1',
    title: 'Mitigación de SQL Injection',
    vulnerability: 'SQL Injection',
    author: 'Juan Pérez',
    date: '2024-06-01',
    tags: ['sql', 'injection', 'database'],
    content: 'Para mitigar SQL Injection, utilicé consultas preparadas con parámetros bindeados y validación estricta de entrada...'
  },
  {
    id: 'e2',
    title: 'Prevención de XSS',
    vulnerability: 'XSS Reflected',
    author: 'Ana Gómez',
    date: '2024-06-02',
    tags: ['xss', 'javascript'],
    content: 'La clave fue sanitizar la entrada del usuario usando DOMPurify y Content Security Policy...'
  },
  {
    id: 'e3',
    title: 'Protección contra CSRF',
    vulnerability: 'CSRF',
    author: 'Carlos Ruiz',
    date: '2024-06-03',
    tags: ['csrf', 'tokens'],
    content: 'Implementé tokens CSRF únicos por sesión y validación de origen en todas las operaciones críticas...'
  },
  {
    id: 'e4',
    title: 'Prevención de LFI/RFI',
    vulnerability: 'LFI/RFI',
    author: 'María López',
    date: '2024-06-04',
    tags: ['lfi', 'rfi', 'path-traversal'],
    content: 'Utilicé whitelist de archivos permitidos y validación estricta de rutas para prevenir inclusiones maliciosas...'
  },
  {
    id: 'e5',
    title: 'Mitigación de IDOR',
    vulnerability: 'IDOR',
    author: 'Pedro Sánchez',
    date: '2024-06-05',
    tags: ['idor', 'authorization'],
    content: 'Implementé verificación de autorización en cada endpoint y validación de propiedad de recursos...'
  },
  {
    id: 'e6',
    title: 'Protección contra SSRF',
    vulnerability: 'SSRF',
    author: 'Laura Torres',
    date: '2024-06-06',
    tags: ['ssrf', 'network'],
    content: 'Utilicé whitelist de URLs permitidas y validación de esquemas de protocolo para prevenir ataques SSRF...'
  },
  {
    id: 'e7',
    title: 'Prevención de Open Redirect',
    vulnerability: 'Open Redirect',
    author: 'Diego Morales',
    date: '2024-06-07',
    tags: ['redirect', 'url-validation'],
    content: 'Implementé validación estricta de URLs de destino y whitelist de dominios permitidos...'
  },
  {
    id: 'e8',
    title: 'Mitigación de RCE',
    vulnerability: 'RCE',
    author: 'Sofia Vargas',
    date: '2024-06-08',
    tags: ['rce', 'command-injection'],
    content: 'Evité el uso de funciones de ejecución de comandos y utilicé APIs seguras para operaciones del sistema...'
  },
  {
    id: 'e9',
    title: 'Protección contra XXE',
    vulnerability: 'XXE',
    author: 'Roberto Silva',
    date: '2024-06-09',
    tags: ['xxe', 'xml'],
    content: 'Deshabilité la expansión de entidades externas en el parser XML y utilicé configuraciones seguras...'
  },
  {
    id: 'e10',
    title: 'Prevención de SSTI',
    vulnerability: 'SSTI',
    author: 'Carmen Rojas',
    date: '2024-06-10',
    tags: ['ssti', 'templates'],
    content: 'Utilicé motores de plantillas seguros y sanitización de variables antes de la renderización...'
  },
  {
    id: 'e11',
    title: 'Mitigación de Deserialización',
    vulnerability: 'Deserialización',
    author: 'Alejandro Castro',
    date: '2024-06-11',
    tags: ['deserialization', 'json'],
    content: 'Implementé validación de tipos y utilizé serializadores seguros con configuración estricta...'
  },
  {
    id: 'e12',
    title: 'Protección contra Race Conditions',
    vulnerability: 'Race Condition',
    author: 'Natalia Herrera',
    date: '2024-06-12',
    tags: ['race-condition', 'concurrency'],
    content: 'Utilicé locks distribuidos y transacciones atómicas para prevenir condiciones de carrera...'
  }
];

// Umbral configurable para aprobación de explicaciones
const APPROVAL_THRESHOLD = 5; // Cambia este valor según lo necesario

const mockVulnerabilities = [
  { id: 'v1', name: 'SQL Injection' },
  { id: 'v2', name: 'XSS Reflected' },
  { id: 'v3', name: 'CSRF' },
];

// Simulación de explicaciones pendientes
const mockPendingExplanations = [
  {
    id: 'p1',
    title: 'Prevención de Ataques CSRF',
    vulnerability: 'CSRF',
    author: 'Carlos Ruiz',
    date: '2024-06-03',
    content: 'Para mitigar CSRF, implementé tokens únicos por sesión y validación de origen en todas las operaciones críticas...',
    likes: 19, // Iniciar con 19 likes - ¡UN LIKE MÁS Y SE APRUEBA!
    dislikes: 9, // Iniciar con 9 dislikes
    feedback: [
      { user: 'Ana', text: 'Podrías agregar ejemplos de código.' },
    ],
    status: 'pending', // Estado inicial
  },
  {
    id: 'p0',
    title: 'Mi Explicación de Prueba',
    vulnerability: 'XSS',
    author: 'Nicole Hunt', // Usuario actual
    date: '2024-06-15',
    content: 'Esta es una explicación de prueba que puedes borrar para probar la funcionalidad...',
    likes: 5,
    dislikes: 2,
    feedback: [
      { user: 'Juan', text: 'Buena explicación inicial.' },
    ],
    status: 'pending',
  },
  {
    id: 'p2',
    title: 'Prevención de XSS',
    vulnerability: 'XSS',
    author: 'María López',
    date: '2024-06-04',
    content: 'Esta explicación tiene demasiados dislikes y será deshabilitada...',
    likes: 5,
    dislikes: 10, // Alcanzó el límite de dislikes
    feedback: [
      { user: 'Juan', text: 'Falta información técnica.' },
      { user: 'Ana', text: 'No está bien explicado.' },
    ],
    status: 'disabled', // Estado deshabilitado
  },
  {
    id: 'p3',
    title: 'Mitigación de SQL Injection Avanzada',
    vulnerability: 'SQL Injection',
    author: 'Pedro Sánchez',
    date: '2024-06-05',
    content: 'Implementé ORM con consultas preparadas, validación de entrada y escape de caracteres especiales...',
    likes: 15,
    dislikes: 3,
    feedback: [
      { user: 'Laura', text: 'Excelente explicación técnica.' },
    ],
    status: 'pending',
  },
  {
    id: 'p4',
    title: 'Protección contra LFI/RFI',
    vulnerability: 'LFI/RFI',
    author: 'Diego Morales',
    date: '2024-06-06',
    content: 'Utilicé whitelist de archivos permitidos y validación estricta de rutas para prevenir inclusiones maliciosas...',
    likes: 12,
    dislikes: 7,
    feedback: [
      { user: 'Sofia', text: 'Necesita más ejemplos prácticos.' },
    ],
    status: 'pending',
  },
  {
    id: 'p5',
    title: 'Prevención de IDOR',
    vulnerability: 'IDOR',
    author: 'Carmen Rojas',
    date: '2024-06-07',
    content: 'Implementé verificación de autorización en cada endpoint y validación de propiedad de recursos...',
    likes: 18,
    dislikes: 2,
    feedback: [
      { user: 'Roberto', text: 'Muy buena explicación de autorización.' },
    ],
    status: 'pending',
  },
  {
    id: 'p6',
    title: 'Mitigación de SSRF',
    vulnerability: 'SSRF',
    author: 'Alejandro Castro',
    date: '2024-06-08',
    content: 'Utilicé whitelist de URLs permitidas y validación de esquemas de protocolo para prevenir ataques SSRF...',
    likes: 8,
    dislikes: 11, // Cerca del límite de dislikes
    feedback: [
      { user: 'Natalia', text: 'Falta profundidad técnica.' },
      { user: 'Juan', text: 'No explica bien los vectores de ataque.' },
    ],
    status: 'disabled',
  },
  {
    id: 'p13',
    title: 'Mi Explicación Rechazada',
    vulnerability: 'XSS',
    author: 'Nicole Hunt', // Usuario actual
    date: '2024-06-16',
    content: 'Esta explicación será deshabilitada para probar las notificaciones...',
    likes: 3,
    dislikes: 9, // Cerca del límite de dislikes
    feedback: [
      { user: 'Carlos', text: 'Necesita más ejemplos prácticos.' },
      { user: 'Ana', text: 'Falta información técnica.' },
    ],
    status: 'pending',
  },
  {
    id: 'p14',
    title: 'Mi Explicación Aprobada',
    vulnerability: 'SQL Injection',
    author: 'Nicole Hunt', // Usuario actual
    date: '2024-06-17',
    content: 'Esta explicación será aprobada para probar las notificaciones de éxito...',
    likes: 19, // Cerca de ser aprobada
    dislikes: 1,
    feedback: [
      { user: 'Carlos', text: 'Excelente explicación técnica.' },
      { user: 'Ana', text: 'Muy bien estructurada.' },
    ],
    status: 'pending',
  },
  {
    id: 'p7',
    title: 'Protección contra Open Redirect',
    vulnerability: 'Open Redirect',
    author: 'Roberto Silva',
    date: '2024-06-09',
    content: 'Implementé validación estricta de URLs de destino y whitelist de dominios permitidos...',
    likes: 14,
    dislikes: 6,
    feedback: [
      { user: 'Laura', text: 'Buen enfoque en validación.' },
    ],
    status: 'pending',
  },
  {
    id: 'p8',
    title: 'Prevención de RCE',
    vulnerability: 'RCE',
    author: 'Natalia Herrera',
    date: '2024-06-10',
    content: 'Evité el uso de funciones de ejecución de comandos y utilicé APIs seguras para operaciones del sistema...',
    likes: 16,
    dislikes: 4,
    feedback: [
      { user: 'Carmen', text: 'Excelente explicación de mitigación.' },
    ],
    status: 'pending',
  },
  {
    id: 'p9',
    title: 'Mitigación de XXE',
    vulnerability: 'XXE',
    author: 'Sofia Vargas',
    date: '2024-06-11',
    content: 'Deshabilité la expansión de entidades externas en el parser XML y utilicé configuraciones seguras...',
    likes: 11,
    dislikes: 8,
    feedback: [
      { user: 'Diego', text: 'Necesita más ejemplos de configuración.' },
    ],
    status: 'pending',
  },
  {
    id: 'p10',
    title: 'Protección contra SSTI',
    vulnerability: 'SSTI',
    author: 'Laura Torres',
    date: '2024-06-12',
    content: 'Utilicé motores de plantillas seguros y sanitización de variables antes de la renderización...',
    likes: 13,
    dislikes: 5,
    feedback: [
      { user: 'Pedro', text: 'Buena explicación de sanitización.' },
    ],
    status: 'pending',
  },
  {
    id: 'p11',
    title: 'Prevención de Deserialización',
    vulnerability: 'Deserialización',
    author: 'Carmen Rojas',
    date: '2024-06-13',
    content: 'Implementé validación de tipos y utilizé serializadores seguros con configuración estricta...',
    likes: 17,
    dislikes: 3,
    feedback: [
      { user: 'Alejandro', text: 'Muy técnica y completa.' },
    ],
    status: 'pending',
  },
  {
    id: 'p12',
    title: 'Mitigación de Race Conditions',
    vulnerability: 'Race Condition',
    author: 'Roberto Silva',
    date: '2024-06-14',
    content: 'Utilicé locks distribuidos y transacciones atómicas para prevenir condiciones de carrera...',
    likes: 10,
    dislikes: 9, // Cerca del límite de dislikes
    feedback: [
      { user: 'Natalia', text: 'Falta explicar mejor los locks.' },
      { user: 'Sofia', text: 'No está claro el concepto.' },
    ],
    status: 'pending',
  }
];

const getUserVote = (votes: Record<string, 'like' | 'dislike'>, userId: string) => votes[userId] || null;

const INITIAL_USER_POINTS = 100;
const POINTS_PER_APPROVAL = 20;

const showToast = (msg: string, setToast: React.Dispatch<React.SetStateAction<string>>) => {
  setToast(msg);
  setTimeout(() => setToast(''), 3000);
};

const ACCENT_PURPLE = '#a259f7';
const DARK_BG = '#181A1A';
const PANEL_BG = '#23263a';

const VULN_TYPES = [
  'SQL Injection', 'XSS', 'CSRF', 'RCE', 'IDOR', 'LFI', 'RFI', 'SSRF', 'Open Redirect', 'Other'
];

const Documentation: React.FC = () => {
  const { t } = useTranslation();
  const { addNotification } = useNotifications();
  const { userPoints, addPoints } = usePoints();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'documentation' | 'redaccion' | 'solicitudes'>('documentation');

  // Estado para redacción
  const [title, setTitle] = useState('');
  const [vulnId, setVulnId] = useState('');
  const [submitMsg, setSubmitMsg] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: '',
  });

  // Estado para solicitudes
  const [pending, setPending] = useState(mockPendingExplanations);
  const [votes, setVotes] = useState<Record<string, Record<string, 'like' | 'dislike'>>>({}); // {expId: {userId: 'like'|'dislike'}}
  const [feedbackInput, setFeedbackInput] = useState<Record<string, string>>({}); // {expId: feedbackText}
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({}); // {expId: bool}
  const userId = 'usuario-demo'; // Simulación de usuario actual
  const [expandedPending, setExpandedPending] = useState<string | null>(null);


  const [approvalMsg, setApprovalMsg] = useState('');
  const [explanations, setExplanations] = useState(mockExplanations);

  // Filtros simulados (solo búsqueda por palabra clave)
  const filtered = explanations.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.vulnerability.toLowerCase().includes(search.toLowerCase()) ||
    e.author.toLowerCase().includes(search.toLowerCase()) ||
    e.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedExplanation = filtered.find(e => e.id === selected);
  const [toast, setToast] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Pre-llenar el autor con el nombre del usuario
  const getAuthorName = () => {
    return 'Nicole Hunt'; // Usuario por defecto
  };

  const [author, setAuthor] = useState(getAuthorName());
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [vulnType, setVulnType] = useState('');
  const [vulnSpecific, setVulnSpecific] = useState('');
  const [brief, setBrief] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [refs, setRefs] = useState<string[]>([]);
  const [refInput, setRefInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDisabled, setShowDisabled] = useState(true); // Filtro para explicaciones deshabilitadas
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteExpId, setDeleteExpId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que todos los campos requeridos estén completos
    if (!title || !author || !vulnType || !brief || !editor?.getHTML()) {
      setSubmitMsg('Completa todos los campos requeridos.');
      return;
    }

    // Crear nueva explicación pendiente con el formato correcto
    const htmlContent = editor.getHTML();
    // Extraer texto plano del HTML para mostrar en la tarjeta
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const plainTextContent = tempDiv.textContent || tempDiv.innerText || '';
    
    const newExplanation = {
      id: `p${Date.now()}`, // ID único basado en timestamp
      title: title,
      vulnerability: vulnType,
      author: author,
      date: date,
      content: plainTextContent,
      likes: 19, // Iniciar con 19 likes
      dislikes: 9, // Iniciar con 9 dislikes
      feedback: [],
      status: 'pending', // Estado: pending, approved, disabled
    };

    // Agregar a la lista de pendientes
    setPending(prev => [newExplanation, ...prev]);
    
    // Mostrar mensaje de éxito
    setSubmitMsg('¡Explicación enviada para revisión!');
    showToast('¡Explicación enviada exitosamente!', setToast);
    
    // Limpiar formulario
    setTitle('');
    setAuthor('');
    setVulnType('');
    setVulnSpecific('');
    setBrief('');
    setTags([]);
    setTagInput('');
    setRefs([]);
    setRefInput('');
    setFiles([]);
    editor?.commands.setContent('');
    
    // Mostrar animación de éxito y cambiar a solicitudes
    setShowSuccess(true);
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
    setTab('solicitudes');
    setSubmitMsg('');
  };

  // Lógica de voto mejorada con validación de sugerencias
  const handleVote = (expId: string, type: 'like' | 'dislike', skipValidation = false) => {
    // Si es dislike, validar que haya sugerencia (a menos que se salte la validación)
    if (type === 'dislike' && !skipValidation) {
      const currentFeedback = feedbackInput[expId]?.trim();
      if (!currentFeedback) {
        // Abrir automáticamente la sección de sugerencias
        setShowFeedback(prev => ({ ...prev, [expId]: true }));
        showToast('Debes escribir una sugerencia para registrar el dislike', setToast);
        return; // Cancelar el voto si no hay sugerencia
      }
    }

    setVotes((prev: Record<string, Record<string, 'like' | 'dislike'>>) => {
      const prevVotes = prev[expId] || {};
      return {
        ...prev,
        [expId]: { ...prevVotes, [userId]: type },
      };
    });

    setPending((prev: typeof mockPendingExplanations) => prev
      .map((e: any) => {
        if (e.id !== expId) return e;
        
        let likes = e.likes;
        let dislikes = e.dislikes;
        const prevVote = votes[expId]?.[userId];
        
        if (prevVote === type) return e; // No cambio
        
        if (type === 'like') {
          likes += 1;
          if (prevVote === 'dislike') dislikes -= 1;
        } else {
          dislikes += 1;
          if (prevVote === 'like') likes -= 1;
        }

        // Verificar si alcanza 20 likes (aprobación)
        if (likes >= 20) {
          console.log('¡Explicación aprobada!', e.title, 'con', likes, 'likes'); // Debug
          setApprovalMsg(`¡Explicación aprobada! Se otorgaron ${POINTS_PER_APPROVAL} puntos a ${e.author}.`);
          addPoints(POINTS_PER_APPROVAL);
          
          // Agregar notificación si es la explicación del usuario actual
          if (e.author === getAuthorName()) {
            addNotification({
              type: 'success',
              title: '¡Tu solicitud de documentación ha sido aprobada!',
              detail: `La explicación "${e.title}" ha sido aprobada por la comunidad. Has ganado ${POINTS_PER_APPROVAL} puntos por tu contribución.`,
              context: 'Documentación',
              link: '/documentation',
            });
          }
          
          setExplanations((prevExps: typeof mockExplanations) => {
            // Verificar si ya existe para evitar duplicados
            const exists = prevExps.some(exp => exp.id === e.id);
            if (exists) {
              console.log('La explicación ya existe en documentación:', e.title);
              return prevExps;
            }
            const newExplanations = [
              {
                id: e.id,
                title: e.title,
                vulnerability: e.vulnerability,
                author: e.author,
                date: e.date,
                tags: [],
                content: e.content,
              },
              ...prevExps, // Las nuevas van al principio
            ];
            console.log('Nuevas explicaciones aprobadas:', newExplanations); // Debug
            return newExplanations;
          });
          setTimeout(() => setApprovalMsg(''), 4000);
          return null; // Marcar para filtrar (mover a documentación)
        }

        // Verificar si alcanza 10 dislikes (deshabilitación)
        if (dislikes >= 10) {
          setApprovalMsg(`Explicación deshabilitada por demasiados dislikes.`);
          setTimeout(() => setApprovalMsg(''), 4000);
          
          // Agregar notificación si es la explicación del usuario actual
          if (e.author === getAuthorName()) {
            addNotification({
              type: 'error',
              title: 'Tu solicitud de documentación no ha sido aceptada',
              detail: `La explicación "${e.title}" ha sido deshabilitada por recibir demasiados dislikes. Revisa el feedback de la comunidad para mejorar tu explicación.`,
              context: 'Documentación',
              link: '/documentation',
            });
          }
          
          return { ...e, likes, dislikes, status: 'disabled' };
        }

        return { ...e, likes, dislikes };
      })
      .filter((e): e is typeof mockPendingExplanations[0] => e !== null)
    );
  };

  // Lógica de feedback mejorada
  const handleFeedback = (expId: string) => {
    const text = feedbackInput[expId]?.trim();
    if (!text) return;
    
    // Agregar la sugerencia
    setPending((prev: typeof mockPendingExplanations) => prev.map((e: any) =>
      e.id === expId ? { ...e, feedback: [...e.feedback, { user: userId, text }] } : e
    ));
    setFeedbackInput((prev: Record<string, string>) => ({ ...prev, [expId]: '' }));
    setShowFeedback((prev: Record<string, boolean>) => ({ ...prev, [expId]: false }));
    
    // Registrar automáticamente el dislike después de enviar la sugerencia
    // Usar setTimeout para asegurar que el estado se actualice primero
    setTimeout(() => {
      handleVote(expId, 'dislike', true); // skipValidation = true
    }, 100);
    
    showToast('¡Sugerencia enviada y dislike registrado!', setToast);
  };

  // Función para abrir modal de confirmación de borrado
  const handleDeleteExplanation = (expId: string) => {
    setDeleteExpId(expId);
    setShowDeleteModal(true);
  };

  // Función para confirmar borrado
  const confirmDelete = () => {
    if (deleteExpId) {
      setPending((prev: typeof mockPendingExplanations) => prev.filter((e: any) => e.id !== deleteExpId));
      showToast('¡Explicación borrada exitosamente!', setToast);
      setShowDeleteModal(false);
      setDeleteExpId(null);
    }
  };

  // Función para cancelar borrado
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteExpId(null);
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const handleTagRemove = (tag: string) => setTags(tags.filter((t: string) => t !== tag));
  const handleRefAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && refInput.trim()) {
      e.preventDefault();
      if (!refs.includes(refInput.trim())) setRefs([...refs, refInput.trim()]);
      setRefInput('');
    }
  };
  const handleRefRemove = (ref: string) => setRefs(refs.filter((r: string) => r !== ref));
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
  };
  const handleFileRemove = (idx: number) => setFiles(files.filter((_: File, i: number) => i !== idx));

  return (
    <div className="min-h-screen w-full" style={{ background: DARK_BG }}>
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded shadow-lg z-50 font-bold text-lg animate-fade-in border-2 border-purple-400">
          {toast}
        </div>
      )}
      {/* Tabs Header */}
      <div className="flex gap-2 mb-6 border-b-2 border-[#23263a] sticky top-0 z-10 bg-[#181A1A] px-2 pt-6">
        <button
          className={`px-6 py-2 font-semibold rounded-t-lg transition-all duration-150 ${tab === 'documentation' ? 'bg-[#23263a] text-white border-b-4 border-[#a259f7] shadow' : 'text-gray-400 hover:text-white hover:bg-[#23263a]'}`}
          onClick={() => setTab('documentation')}
        >
          Documentación
        </button>
        <button
          className={`px-6 py-2 font-semibold rounded-t-lg transition-all duration-150 ${tab === 'redaccion' ? 'bg-[#23263a] text-white border-b-4 border-[#a259f7] shadow' : 'text-gray-400 hover:text-white hover:bg-[#23263a]'}`}
          onClick={() => setTab('redaccion')}
        >
          Redacción
        </button>
        <button
          className={`px-6 py-2 font-semibold rounded-t-lg transition-all duration-150 ${tab === 'solicitudes' ? 'bg-[#23263a] text-white border-b-4 border-[#a259f7] shadow' : 'text-gray-400 hover:text-white hover:bg-[#23263a]'}`}
          onClick={() => setTab('solicitudes')}
        >
          Solicitudes
        </button>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-2">
              {tab === 'documentation' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Documentación</h2>
            {approvalMsg && <div className="mb-2 text-green-400 font-bold">{approvalMsg}</div>}
          <div className="mb-4 flex gap-2">
            <input
              className="border-2 border-[#a259f7] rounded-lg px-3 py-2 w-full bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
              placeholder={t('search') + '...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.length === 0 && (
              <div className="col-span-2 text-gray-500">{t('noExplanations')}</div>
            )}
            {filtered.map(e => (
              <div
                key={e.id}
                className={`rounded-2xl p-5 cursor-pointer transition-all border-2 ${selected === e.id ? 'border-[#a259f7] shadow-lg' : 'border-[#23263a]'} bg-[#23263a] hover:shadow-xl hover:border-[#a259f7]`}
                onClick={() => { setSelected(e.id); setShowModal(true); }}
              >
                <div className="font-bold text-lg text-white mb-1">{e.title}</div>
                <div className="text-sm text-gray-300">{t('vulnerability')}: <span className="text-purple-300">{e.vulnerability}</span></div>
                <div className="text-sm text-gray-400">{t('author')}: {e.author}</div>
                <div className="text-xs text-gray-500">{t('publishedOn')}: {e.date}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {e.tags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold">#{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Modal de explicación */}
          {showModal && selectedExplanation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-[#23263a] rounded-2xl shadow-2xl border-2 border-[#a259f7] max-w-2xl w-full p-8 relative flex flex-col">
                <button
                  className="absolute top-4 right-4 text-purple-300 hover:text-white text-2xl font-bold focus:outline-none"
                  onClick={() => setShowModal(false)}
                  aria-label="Cerrar"
                >×</button>
                <h3 className="text-3xl font-extrabold text-white mb-2">{selectedExplanation.title}</h3>
                <div className="mb-2 text-sm text-gray-300">Vulnerabilidad: <span className="text-purple-300">{selectedExplanation.vulnerability}</span></div>
                <div className="mb-2 text-sm text-gray-400">Autor: {selectedExplanation.author}</div>
                <div className="mb-2 text-xs text-gray-500">Publicado el: {selectedExplanation.date}</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedExplanation.tags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold">#{tag}</span>
                  ))}
                </div>
                <div className="text-gray-200 text-base whitespace-pre-line">
                  {selectedExplanation.content}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {tab === 'redaccion' && (
        <div className="bg-[#23263a] rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Redacción de Explicación</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-1">Autor</label>
                <input
                  className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7] w-full"
                  placeholder="Nombre del autor"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                />

              </div>
              <input
                type="date"
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <input
              className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
              placeholder="Título de la explicación"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                value={vulnType}
                onChange={e => setVulnType(e.target.value)}
              >
                <option value="">Tipo de vulnerabilidad</option>
                {VULN_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <input
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                placeholder="Vulnerabilidad específica (ej. endpoint, parámetro, etc.)"
                value={vulnSpecific}
                onChange={e => setVulnSpecific(e.target.value)}
              />
            </div>
            <input
              className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
              placeholder="Descripción breve (1-2 líneas)"
              value={brief}
              onChange={e => setBrief(e.target.value)}
            />
            <div className="bg-[#181A1A] border-2 border-[#a259f7] rounded-lg p-2">
              <EditorContent editor={editor} />
            </div>
            {/* Tags */}
            <div>
              <label className="block text-white font-semibold mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1">#{tag} <button type="button" className="text-purple-400 hover:text-red-500" onClick={() => handleTagRemove(tag)}>×</button></span>
                ))}
              </div>
              <input
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                placeholder="Agregar tag y presiona Enter"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
              />
            </div>
            {/* Referencias externas */}
            <div>
              <label className="block text-white font-semibold mb-1">Referencias externas</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {refs.map(ref => (
                  <span key={ref} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1">{ref} <button type="button" className="text-purple-400 hover:text-red-500" onClick={() => handleRefRemove(ref)}>×</button></span>
                ))}
              </div>
              <input
                className="border-2 border-[#a259f7] rounded-lg px-3 py-2 bg-[#181A1A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a259f7]"
                placeholder="Agregar referencia y presiona Enter"
                value={refInput}
                onChange={e => setRefInput(e.target.value)}
                onKeyDown={handleRefAdd}
              />
            </div>
            {/* Archivos adjuntos (simulado) */}
            <div>
              <label className="block text-white font-semibold mb-1">Archivos adjuntos</label>
              <input
                type="file"
                multiple
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                onChange={handleFileChange}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {files.map((file, idx) => (
                  <span key={file.name + idx} className="bg-purple-100 text-[#a259f7] text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1">{file.name} <button type="button" className="text-purple-400 hover:text-red-500" onClick={() => handleFileRemove(idx)}>×</button></span>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all text-lg mt-2"
            >Enviar Explicación</button>
            {submitMsg && (
              <div className="text-green-400 font-semibold mt-2 text-center">
                ✅ {submitMsg}
              </div>
            )}
          </form>
        </div>
      )}
      {tab === 'solicitudes' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Solicitudes de Explicaciones</h2>
          
          {/* Filtro para explicaciones deshabilitadas */}
          <div className="mb-4 flex items-center gap-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={showDisabled}
                onChange={(e) => setShowDisabled(e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm">Mostrar explicaciones deshabilitadas</span>
            </label>
          </div>

          {pending.length > 0 && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="text-green-400 font-semibold">
                📝 {pending.length} solicitud{pending.length !== 1 ? 'es' : ''} pendiente{pending.length !== 1 ? 's' : ''} de revisión
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pending.length === 0 && (
              <div className="col-span-2 text-gray-500">No hay solicitudes pendientes.</div>
            )}
            {pending
              .filter(e => showDisabled || e.status !== 'disabled')
              .map(e => (
              <div 
                key={e.id} 
                className={`rounded-2xl p-5 border-2 transition-all shadow-lg flex flex-col gap-2 ${
                  e.status === 'disabled' 
                    ? 'bg-gray-800 border-red-500 opacity-60' 
                    : 'bg-[#23263a] border-[#23263a] hover:border-[#a259f7]'
                }`}
              >
                <div className="font-bold text-lg text-white mb-1">
                  {e.title}
                  {e.status === 'disabled' && (
                    <span className="ml-2 text-red-400 text-sm">🚫 DESHABILITADA</span>
                  )}
                </div>
                <div className="text-sm text-gray-300">Vulnerabilidad: <span className="text-purple-300">{e.vulnerability}</span></div>
                <div className="text-sm text-gray-400">Autor: {e.author}</div>
                <div className="text-xs text-gray-500">Publicado el: {e.date}</div>
                <div className="text-gray-200 mt-2">
                  {e.content.length > 100 
                    ? `${e.content.substring(0, 100)}...` 
                    : e.content
                  }
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => handleVote(e.id, 'like')} className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-white ${votes[e.id]?.[userId] === 'like' ? 'bg-green-600' : 'bg-gray-700 hover:bg-green-700'} transition`}>
                    <FaThumbsUp /> {e.likes}
                  </button>
                  <button onClick={() => handleVote(e.id, 'dislike')} className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-white ${votes[e.id]?.[userId] === 'dislike' ? 'bg-red-600' : 'bg-gray-700 hover:bg-red-700'} transition`}>
                    <FaThumbsDown /> {e.dislikes}
                  </button>
                  {/* Botón de borrar para el autor */}
                  {e.author === getAuthorName() && (
                    <button 
                      onClick={() => handleDeleteExplanation(e.id)} 
                      className="flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition"
                      title="Borrar mi explicación"
                    >
                      🗑️ Borrar
                    </button>
                  )}
                </div>
                {/* Feedback */}
                <div className="mt-2">
                  <button onClick={() => setShowFeedback(prev => ({ ...prev, [e.id]: !prev[e.id] }))} className="text-purple-400 hover:underline font-semibold text-sm">{showFeedback[e.id] ? 'Ocultar' : 'Agregar sugerencia'}</button>
                  {showFeedback[e.id] && (
                    <div className="mt-2 flex flex-col gap-2">
                      <textarea
                        className="w-full h-16 rounded-lg border-2 border-[#a259f7] bg-[#181A1A] text-white p-2"
                        placeholder="Escribe tu sugerencia..."
                        value={feedbackInput[e.id] || ''}
                        onChange={e2 => setFeedbackInput(prev => ({ ...prev, [e.id]: e2.target.value }))}
                      />
                      <button onClick={() => handleFeedback(e.id)} className="w-full py-1.5 rounded-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all">Enviar sugerencia</button>
                    </div>
                  )}
                  {/* Mostrar feedback existente */}
                  {e.feedback && e.feedback.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-400 mb-1">Sugerencias previas:</div>
                      <ul className="list-disc pl-5 text-gray-300 text-sm">
                        {e.feedback.map((f, idx) => (
                          <li key={idx}><span className="text-purple-300 font-semibold">{f.user}:</span> {f.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
      
      {/* Componente de éxito */}
      <SubmissionSuccess 
        isVisible={showSuccess}
        onComplete={handleSuccessComplete}
      />

      {/* Modal de confirmación de borrado */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border-2 border-red-500/30 max-w-md w-full p-8 relative">
            {/* Icono de advertencia */}
            <div className="text-center mb-6">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-white mb-2">Confirmar Borrado</h3>
              <p className="text-gray-300 text-sm">
                ¿Estás seguro de que quieres borrar esta explicación?
              </p>
              <p className="text-red-400 text-xs mt-2 font-semibold">
                Esta acción no se puede deshacer
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={cancelDelete}
                className="px-6 py-3 rounded-xl font-bold text-white bg-gray-600 hover:bg-gray-700 transition-all border-2 border-gray-500/30"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-all border-2 border-red-500/30 shadow-lg shadow-red-500/20"
              >
                🗑️ Borrar Definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Documentation; 