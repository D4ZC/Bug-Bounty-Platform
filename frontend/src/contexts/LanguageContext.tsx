import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      // Claves globales para menú y topbar
      settingsMenu: 'Configuración',
      team: 'Equipo',
      gulag: 'Gulag',
      shop: 'Tienda',
      contributions: 'Contribuciones',
      mvp: 'MVP',
      list: 'Listado de reportes',
      report: 'Reportes',
      notifications: 'Notificaciones',
      profile: 'Perfil',
      vulnerabilities: 'Vulnerabilidades',
      challenges: 'Retos y desafíos',
      manageAccount: 'Administrar cuenta',
      logout: 'Cerrar sesión',
      logs: 'Logs',
      admin: 'Panel de Administración',
      dashboard: 'Panel General',
      rankings: { title: 'Rankings' },
      chat: { title: 'Chat' },
      search: { title: 'Buscar' },
      error_occurred: 'Algo salió mal',
      error_description: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
      settings: {
        title: 'Configuración',
        description: 'Gestiona tu cuenta, preferencias, seguridad y personalización.',
        profile: {
          profileTitle: 'Información personal', // Cambiado para evitar duplicado
          description: 'Información sobre ti y tus preferencias en la plataforma',
          personalInfo: 'La información de tu perfil en la plataforma',
          personalInfoDescription: 'Información personal y opciones para gestionarla. Puedes hacer que parte de esta información, como tus detalles de contacto, esté visible para otros usuarios. De este modo, les resultará más fácil ponerse en contacto contigo.',
          basicInfo: 'Información básica',
          basicInfoDescription: 'Es posible que otros usuarios puedan ver parte de la información al usar la plataforma.',
          avatar: 'Imagen de perfil',
          firstName: 'Nombre',
          birthDate: 'Fecha de nacimiento',
          gender: 'Género',
          contactInfo: 'Información de contacto',
          email: 'Correo electrónico',
          phone: 'Teléfono',
          fullName: 'Nombre completo',
          nickname: 'Nickname',
          editProfile: 'Editar perfil',
          changePassword: 'Cambiar contraseña',
        },
        security: {
          title: 'Seguridad',
          description: 'Gestiona tu contraseña y acciones de cuenta.',
          changePassword: 'Cambiar contraseña',
          changePasswordDescription: 'Actualiza tu contraseña para mantener tu cuenta segura.',
          currentPassword: 'Contraseña actual',
          newPassword: 'Nueva contraseña',
          confirmPassword: 'Confirmar nueva contraseña',
          passwordMismatch: 'Las contraseñas no coinciden.',
          passwordChanged: 'Contraseña cambiada exitosamente.',
          passwordError: 'Error al cambiar la contraseña.',
          accountActions: 'Acciones de cuenta',
          exportData: 'Exportar datos',
          exportDataDescription: 'Descarga una copia de tus datos personales.',
          deleteAccount: 'Eliminar cuenta',
          deleteAccountDescription: 'Elimina tu cuenta y todos tus datos de la plataforma.',
          logout: 'Cerrar sesión',
          logoutDescription: 'Cierra tu sesión en todos los dispositivos.',
        },
        preferences: {
          title: 'Preferencias',
          description: 'Idioma, tema y notificaciones.',
          language: 'Idioma',
          languageDescription: 'Selecciona el idioma de la plataforma.',
          save: 'Guardar cambios',
          saved: 'Idioma actualizado exitosamente.',
          theme: 'Tema',
          lightTheme: 'Claro',
          darkTheme: 'Oscuro',
          notificationsLabel: 'Notificaciones',
          notificationsDescriptionLabel: 'Gestiona tus preferencias de notificación.',
          notifications: {
            email: 'Notificaciones por email',
            emailDescription: 'Recibe notificaciones importantes por correo electrónico.',
            push: 'Notificaciones push',
            pushDescription: 'Recibe notificaciones en tu dispositivo.',
            challenges: 'Retos y duelos',
            challengesDescription: 'Recibe alertas sobre nuevos retos y duelos.',
            gulag: 'Evento Gulag',
            gulagDescription: 'Recibe notificaciones sobre el evento Gulag.',
            saved: 'Preferencias de notificaciones actualizadas.',
            error: 'Error al actualizar preferencias de notificaciones.'
          },
          saved: 'Preferencias actualizadas.',
          error: 'Error al actualizar preferencias.',
        },
        activity: {
          activityTitle: 'Actividad', // Cambiado para evitar duplicado
          description: 'Resumen de tu actividad reciente en la plataforma: vulnerabilidades reportadas, retos completados y progreso semanal.',
          weeklyActivity: 'Actividad semanal',
          barsDescription: 'Barras: acciones realizadas cada día (reportes, soluciones, comentarios, etc.)',
          reportedVulnerabilities: 'Vulnerabilidades reportadas',
          id: 'ID',
          status: 'Estado',
          date: 'Fecha',
          resolved: 'Resuelta',
          pending: 'Pendiente',
          completedChallenges: 'Retos completados',
          challenge: 'Reto',
          category: 'Categoría',
          points: 'Puntos',
        },
        general: {
          generalTitle: 'Información General', // Cambiado para evitar duplicado
          description: 'Resumen general de tu cuenta: notificaciones, mensajes del sistema y uso de la plataforma.',
          platformUsage: 'Uso de la plataforma (últimos 7 días)',
          barsDescription: 'Barras: sesiones iniciadas, páginas visitadas, interacciones, etc.',
          recentNotifications: 'Notificaciones recientes',
          date: 'Fecha',
          type: 'Tipo',
          message: 'Mensaje',
          system: 'Sistema',
          alert: 'Alerta',
          info: 'Info',
          platformUpdateApplied: 'Actualización de plataforma aplicada correctamente.',
          newChallengeAvailable: 'Nuevo reto disponible: Crypto101.',
          yourReport1023Resolved: 'Tu reporte #1023 fue resuelto.',
          systemMessages: 'Mensajes del sistema',
          scheduledMaintenance: 'Mantenimiento programado el 10 de julio de 2:00 a 4:00 AM.',
          newFeature: 'Nueva funcionalidad: gestor de contraseñas disponible.',
        },
        personalization: {
          personalizationTitle: 'Personalización', // Cambiado para evitar duplicado
          description: 'Gestiona tus cosméticos y Blue Points.',
          currentCosmetics: 'Cosméticos equipados',
          currentCosmeticsDescription: 'Estos son los cosméticos que tienes activos en tu perfil.',
          background: 'Fondo',
          frame: 'Marco',
          avatar: 'Avatar',
          badge: 'Insignia',
          nameplate: 'Placa',
          none: 'Ninguno',
          bluePoints: 'Blue Points',
          bluePointsDescription: 'Moneda premium para comprar cosméticos exclusivos.',
          availableBluePoints: 'Blue Points disponibles',
          bluePointsBalance: 'Tu saldo actual de Blue Points.'
        },
        team: {
          teamTitle: 'Equipo', // Cambiado para evitar duplicado
          description: 'Información y estadísticas de tu equipo.',
          teamInfo: 'Información del equipo',
          teamInfoDescription: 'Detalles de tu equipo actual.',
          noTeam: 'Sin equipo',
          role: 'Rol',
          roles: {
            member: 'Miembro',
            team_leader: 'Líder',
            admin: 'Administrador'
          },
          memberSince: 'Miembro desde',
          teamStats: 'Estadísticas del equipo',
          totalPoints: 'Puntos totales',
          vulnerabilities: 'Vulnerabilidades',
          rank: 'Ranking'
        },
        privacy: {
          title: 'Privacidad',
          description: 'Controla la visibilidad de tu perfil y datos.',
          privacySettings: 'Configuración de privacidad',
          privacySettingsDescription: 'Elige quién puede ver tu información.',
          profileVisibility: 'Visibilidad del perfil',
          profileVisibilityDescription: 'Controla quién puede ver tu perfil.',
          public: 'Público',
          private: 'Privado',
          teamOnly: 'Solo equipo',
          showEmail: 'Mostrar email',
          showEmailDescription: 'Permite que otros vean tu email.',
          showTeam: 'Mostrar equipo',
          showTeamDescription: 'Permite que otros vean tu equipo.',
          showStats: 'Mostrar estadísticas',
          showStatsDescription: 'Permite que otros vean tus estadísticas.'
        },
        logout: {
          success: 'Sesión cerrada exitosamente.',
          error: 'Error al cerrar sesión.'
        },
        // Admin Panel
        // Elimina el objeto anidado 'admin' y sus subclaves bajo el bloque español
      }
    },
    en: {
      translation: {
        // Claves globales para menú y topbar en inglés (asegúrate que estén al nivel raíz)
        settingsMenu: 'Settings',
        team: 'Team',
        gulag: 'Gulag',
        shop: 'Shop',
        contributions: 'Contributions',
        mvp: 'MVP',
        list: 'Report List',
        report: 'Report',
        notifications: 'Notifications',
        profile: 'Profile',
        vulnerabilities: 'Vulnerabilities',
        challenges: 'Challenges',
        manageAccount: 'Manage account',
        logout: 'Logout',
        logs: 'Logs',
        admin: 'Admin Panel',
        dashboard: 'Dashboard',
        rankings: { title: 'Rankings' },
        chat: { title: 'Chat' },
        search: { title: 'Search' },
        error_occurred: 'Something went wrong',
        error_description: 'An unexpected error has occurred. Please try again.',
        settings: {
          title: 'Settings',
          description: 'Manage your account, preferences, security, and personalization.',
          profile: {
            profileTitle: 'Personal Information', // Cambiado para evitar duplicado
            description: 'Information about you and your preferences on the platform',
            personalInfo: 'Your profile information on the platform',
            personalInfoDescription: 'Personal information and options to manage it. You can make some of this information, such as your contact details, visible to other users. This way, it will be easier for them to contact you.',
            basicInfo: 'Basic Information',
            basicInfoDescription: 'Other users may be able to see some of this information when using the platform.',
            avatar: 'Profile picture',
            firstName: 'First Name',
            birthDate: 'Birth Date',
            gender: 'Gender',
            contactInfo: 'Contact Information',
            email: 'Email',
            phone: 'Phone',
            fullName: 'Full Name',
            nickname: 'Nickname',
            editProfile: 'Edit profile',
            changePassword: 'Change password',
          },
          security: {
            title: 'Security',
            description: 'Manage your password and account actions.',
            changePassword: 'Change Password',
            changePasswordDescription: 'Update your password to keep your account secure.',
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            confirmPassword: 'Confirm New Password',
            passwordMismatch: 'Passwords do not match.',
            passwordChanged: 'Password changed successfully.',
            passwordError: 'Error changing password.',
            accountActions: 'Account Actions',
            exportData: 'Export Data',
            exportDataDescription: 'Download a copy of your personal data.',
            deleteAccount: 'Delete Account',
            deleteAccountDescription: 'Delete your account and all your data from the platform.',
            logout: 'Logout',
            logoutDescription: 'Close your session on all devices.',
          },
          preferences: {
            title: 'Preferences',
            description: 'Language, theme, and notifications.',
            language: 'Language',
            languageDescription: 'Select the language of the platform.',
            save: 'Save changes',
            saved: 'Language updated successfully.',
            theme: 'Theme',
            lightTheme: 'Light',
            darkTheme: 'Dark',
            notificationsLabel: 'Notifications',
            notificationsDescriptionLabel: 'Manage your notification preferences.',
            notifications: {
              email: 'Email Notifications',
              emailDescription: 'Receive important notifications by email.',
              push: 'Push Notifications',
              pushDescription: 'Receive notifications on your device.',
              challenges: 'Challenges and Duels',
              challengesDescription: 'Receive alerts about new challenges and duels.',
              gulag: 'Gulag Event',
              gulagDescription: 'Receive notifications about the Gulag event.',
              saved: 'Notification preferences updated.',
              error: 'Error updating notification preferences.'
            },
            saved: 'Preferences updated.',
            error: 'Error updating preferences.',
          },
          activity: {
            activityTitle: 'Activity', // Cambiado para evitar duplicado
            description: 'Summary of your recent activity on the platform: reported vulnerabilities, completed challenges, and weekly progress.',
            weeklyActivity: 'Weekly Activity',
            barsDescription: 'Bars: actions performed each day (reports, solutions, comments, etc.)',
            reportedVulnerabilities: 'Reported Vulnerabilities',
            id: 'ID',
            status: 'Status',
            date: 'Date',
            resolved: 'Resolved',
            pending: 'Pending',
            completedChallenges: 'Completed Challenges',
            challenge: 'Challenge',
            category: 'Category',
            points: 'Points',
          },
          general: {
            generalTitle: 'General Information', // Cambiado para evitar duplicado
            description: 'General summary of your account: notifications, system messages, and platform usage.',
            platformUsage: 'Platform usage (last 7 days)',
            barsDescription: 'Bars: sessions started, pages visited, interactions, etc.',
            recentNotifications: 'Recent notifications',
            date: 'Date',
            type: 'Type',
            message: 'Message',
            system: 'System',
            alert: 'Alert',
            info: 'Info',
            platformUpdateApplied: 'Platform update applied successfully.',
            newChallengeAvailable: 'New challenge available: Crypto101.',
            yourReport1023Resolved: 'Your report #1023 was resolved.',
            systemMessages: 'System messages',
            scheduledMaintenance: 'Scheduled maintenance on July 10 from 2:00 to 4:00 AM.',
            newFeature: 'New feature: password manager available.',
          },
          personalization: {
            personalizationTitle: 'Personalization', // Cambiado para evitar duplicado
            description: 'Manage your cosmetics and Blue Points.',
            currentCosmetics: 'Cosmetics equipped',
            currentCosmeticsDescription: 'These are the cosmetics you have active in your profile.',
            background: 'Background',
            frame: 'Frame',
            avatar: 'Avatar',
            badge: 'Badge',
            nameplate: 'Nameplate',
            none: 'None',
            bluePoints: 'Blue Points',
            bluePointsDescription: 'Premium currency to buy exclusive cosmetics.',
            availableBluePoints: 'Available Blue Points',
            bluePointsBalance: 'Your current Blue Points balance.'
          },
          team: {
            teamTitle: 'Team', // Cambiado para evitar duplicado
            description: 'Information and statistics of your team.',
            teamInfo: 'Team Information',
            teamInfoDescription: 'Details of your current team.',
            noTeam: 'No Team',
            role: 'Role',
            roles: {
              member: 'Member',
              team_leader: 'Leader',
              admin: 'Admin'
            },
            memberSince: 'Member since',
            teamStats: 'Team Statistics',
            totalPoints: 'Total Points',
            vulnerabilities: 'Vulnerabilities',
            rank: 'Ranking'
          },
          privacy: {
            title: 'Privacy',
            description: 'Control the visibility of your profile and data.',
            privacySettings: 'Privacy Settings',
            privacySettingsDescription: 'Choose who can see your information.',
            profileVisibility: 'Profile Visibility',
            profileVisibilityDescription: 'Control who can see your profile.',
            public: 'Public',
            private: 'Private',
            teamOnly: 'Team Only',
            showEmail: 'Show Email',
            showEmailDescription: 'Allow others to see your email.',
            showTeam: 'Show Team',
            showTeamDescription: 'Allow others to see your team.',
            showStats: 'Show Statistics',
            showStatsDescription: 'Allow others to see your statistics.'
          },
          logout: {
            success: 'Session closed successfully.',
            error: 'Error closing session.'
          },
          // Admin Panel
          // Elimina el objeto anidado 'admin' y sus subclaves bajo el bloque inglés
        }
      }
    }
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'es',
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
      },
    });
}

const LanguageContext = createContext({
  language: 'es',
  setLanguage: (_: string) => {}, // o
  // setLanguage: (lng: string) => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    return savedLanguage || 'es';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    console.log(`🌍 Language changed to: ${language}`);
  }, [language, i18n]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && savedLanguage !== language) {
      setLanguageState(savedLanguage);
    }
    
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (lng !== language) {
        setLanguageState(lng);
        localStorage.setItem('i18nextLng', lng);
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, language]);

  const setLanguage = (lng: string) => {
    console.log(`🔄 Setting language to: ${lng}`);
    setLanguageState(lng);
    i18n.changeLanguage(lng); // Cambio inmediato de idioma
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}; 