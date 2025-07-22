import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  es: {
    translation: {
      settingsMenu: 'Configuración',
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
          title: 'Perfil',
          description: 'Gestiona tu información personal, avatar y nickname.',
          personalInfo: 'Información personal',
          personalInfoDescription: 'Actualiza tu nombre, apellido, nickname y avatar.',
          firstName: 'Nombre',
          lastName: 'Apellido',
          nickname: 'Nickname',
          nicknameDescription: 'Tu apodo público y único en la plataforma.',
          avatar: 'Avatar (URL)',
          memberSince: 'Miembro desde',
          saved: 'Perfil actualizado exitosamente.',
          error: 'Error al actualizar el perfil.',
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
        profile: {
          title: 'Información personal',
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
        activity: {
          title: 'Actividad',
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
          title: 'Información General',
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
          title: 'Personalización',
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
          title: 'Equipo',
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
        admin: {
          title: 'Panel de Administración',
          subtitle: 'Gestiona usuarios, equipos, vulnerabilidades y configuración del sistema',
          dashboard: {
            title: 'Dashboard',
            description: 'Vista general del sistema',
            stats: {
              users: 'Usuarios',
              teams: 'Equipos',
              vulnerabilities: 'Vulnerabilidades',
              challenges: 'Retos',
              total: 'Total',
              active: 'Activos'
            },
            recentActivity: 'Actividad Reciente',
            newUser: 'Nuevo usuario registrado',
            vulnResolved: 'Vulnerabilidad resuelta',
            newChallenge: 'Nuevo reto creado',
            hoursAgo: 'hace {{hours}} horas'
          },
          users: {
            title: 'Usuarios',
            description: 'Gestionar usuarios y permisos',
            search: 'Buscar usuarios...',
            allRoles: 'Todos los roles',
            member: 'Miembro',
            teamLeader: 'Líder',
            admin: 'Admin',
            activate: 'Activar',
            deactivate: 'Desactivar',
            export: 'Exportar',
            bulkActions: 'Acciones Masivas',
            selectItems: 'Selecciona al menos un elemento',
            user: 'Usuario',
            role: 'Rol',
            points: 'Puntos',
            status: 'Estado',
            lastLogin: 'Último Login',
            actions: 'Acciones',
            active: 'Activo',
            inactive: 'Inactivo',
            never: 'Nunca',
            view: 'Ver',
            edit: 'Editar',
            delete: 'Eliminar',
            confirmDelete: '¿Estás seguro de que quieres eliminar este usuario?',
            userDeleted: 'Usuario eliminado correctamente',
            userUpdated: 'Usuario actualizado correctamente',
            bulkActionSuccess: '{{count}} usuarios actualizados'
          },
          teams: {
            title: 'Equipos',
            description: 'Administrar equipos y líderes',
            createTeam: 'Crear Equipo',
            manageTeams: 'Gestionar Equipos',
            leader: 'Líder',
            members: 'Miembros',
            points: 'Puntos',
            view: 'Ver',
            edit: 'Editar',
            delete: 'Eliminar',
            confirmDelete: '¿Estás seguro de que quieres eliminar este equipo?',
            teamDeleted: 'Equipo eliminado correctamente',
            teamUpdated: 'Equipo actualizado correctamente'
          },
          vulnerabilities: {
            title: 'Vulnerabilidades',
            description: 'Supervisar vulnerabilidades',
            search: 'Buscar vulnerabilidades...',
            allSeverities: 'Todas las severidades',
            critical: 'Crítica',
            high: 'Alta',
            medium: 'Media',
            low: 'Baja',
            severity: 'Severidad',
            status: 'Estado',
            points: 'Puntos',
            assigned: 'Asignado',
            unassigned: 'Sin asignar',
            actions: 'Acciones',
            view: 'Ver',
            resolve: 'Resolver',
            reject: 'Rechazar',
            export: 'Exportar',
            vulnResolved: 'Vulnerabilidad resuelta',
            vulnRejected: 'Vulnerabilidad rechazada',
            vulnUpdated: 'Vulnerabilidad actualizada'
          },
          challenges: {
            title: 'Retos',
            description: 'Gestionar retos y competencias',
            createChallenge: 'Crear Reto',
            manageChallenges: 'Gestionar Retos',
            category: 'Categoría',
            participants: 'Participantes',
            entryCost: 'Costo entrada',
            prize: 'Premio',
            view: 'Ver',
            edit: 'Editar',
            delete: 'Eliminar',
            confirmDelete: '¿Estás seguro de que quieres eliminar este reto?',
            challengeDeleted: 'Reto eliminado correctamente',
            challengeUpdated: 'Reto actualizado correctamente'
          },
          common: {
            loading: 'Cargando...',
            error: 'Error al cargar datos',
            noData: 'No hay datos disponibles',
            confirm: 'Confirmar',
            cancel: 'Cancelar',
            save: 'Guardar',
            delete: 'Eliminar',
            edit: 'Editar',
            view: 'Ver',
            export: 'Exportar',
            search: 'Buscar',
            filter: 'Filtrar',
            all: 'Todos',
            active: 'Activo',
            inactive: 'Inactivo',
            pending: 'Pendiente',
            resolved: 'Resuelto',
            success: 'Éxito',
            warning: 'Advertencia',
            info: 'Información'
          },
          menu: {
            home: 'Inicio',
            personalInfo: 'Información Personal',
            privacy: 'Datos Y Privacidad',
            security: 'Seguridad',
            activity: 'Actividad',
            languageTheme: 'Idioma y tema',
            general: 'Información General',
          },
          quickAccess: {
            welcome: 'Te damos la bienvenida',
            description: 'Gestiona tu información, la privacidad y la seguridad para mejorar tu experiencia en la plataforma.',
            searchPlaceholder: 'Buscar en tu cuenta...',
            myPassword: 'Mi contraseña',
            devices: 'Dispositivos',
            myActivity: 'Mi actividad',
            email: 'Correo electrónico',
            reportStorage: 'Almacenamiento de reportes',
            inUse: 'en uso',
            viewDetails: 'Ver detalles',
            privacyAndPersonalization: 'Privacidad y personalización',
            privacyAndPersonalizationDesc: 'Consulta los datos almacenados y elige qué actividad se debe guardar para personalizar tu experiencia.',
            managePrivacy: 'Gestionar privacidad',
            quickAccess: 'Accesos rápidos',
          },
          welcome: {
            welcome: 'Bienvenido',
            description: 'Gestiona tu información, privacidad y seguridad para mejorar tu experiencia en la plataforma.',
          },
        }
      }
    },
    en: {
      translation: {
        settingsMenu: 'Settings',
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
            title: 'Profile',
            description: 'Manage your personal information, avatar, and nickname.',
            personalInfo: 'Personal Information',
            personalInfoDescription: 'Update your name, surname, nickname, and avatar.',
            firstName: 'First Name',
            lastName: 'Last Name',
            nickname: 'Nickname',
            nicknameDescription: 'Your public nickname and unique on the platform.',
            avatar: 'Avatar (URL)',
            memberSince: 'Member since',
            saved: 'Profile updated successfully.',
            error: 'Error updating profile.',
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
          profile: {
            title: 'Personal Information',
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
          activity: {
            title: 'Activity',
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
            title: 'General Information',
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
            title: 'Personalization',
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
            title: 'Team',
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
          admin: {
            title: 'Admin Panel',
            subtitle: 'Manage users, teams, vulnerabilities, and system configuration',
            dashboard: {
              title: 'Dashboard',
              description: 'General system view',
              stats: {
                users: 'Users',
                teams: 'Teams',
                vulnerabilities: 'Vulnerabilities',
                challenges: 'Challenges',
                total: 'Total',
                active: 'Active'
              },
              recentActivity: 'Recent Activity',
              newUser: 'New user registered',
              vulnResolved: 'Vulnerability resolved',
              newChallenge: 'New challenge created',
              hoursAgo: '{{hours}} hours ago'
            },
            users: {
              title: 'Users',
              description: 'Manage users and permissions',
              search: 'Search users...',
              allRoles: 'All Roles',
              member: 'Member',
              teamLeader: 'Leader',
              admin: 'Admin',
              activate: 'Activate',
              deactivate: 'Deactivate',
              export: 'Export',
              bulkActions: 'Bulk Actions',
              selectItems: 'Select at least one item',
              user: 'User',
              role: 'Role',
              points: 'Points',
              status: 'Status',
              lastLogin: 'Last Login',
              actions: 'Actions',
              active: 'Active',
              inactive: 'Inactive',
              never: 'Never',
              view: 'View',
              edit: 'Edit',
              delete: 'Delete',
              confirmDelete: 'Are you sure you want to delete this user?',
              userDeleted: 'User deleted successfully',
              userUpdated: 'User updated successfully',
              bulkActionSuccess: '{{count}} users updated'
            },
            teams: {
              title: 'Teams',
              description: 'Manage teams and leaders',
              createTeam: 'Create Team',
              manageTeams: 'Manage Teams',
              leader: 'Leader',
              members: 'Members',
              points: 'Points',
              view: 'View',
              edit: 'Edit',
              delete: 'Delete',
              confirmDelete: 'Are you sure you want to delete this team?',
              teamDeleted: 'Team deleted successfully',
              teamUpdated: 'Team updated successfully'
            },
            vulnerabilities: {
              title: 'Vulnerabilities',
              description: 'Monitor vulnerabilities',
              search: 'Search vulnerabilities...',
              allSeverities: 'All Severities',
              critical: 'Critical',
              high: 'High',
              medium: 'Medium',
              low: 'Low',
              severity: 'Severity',
              status: 'Status',
              points: 'Points',
              assigned: 'Assigned',
              unassigned: 'Unassigned',
              actions: 'Actions',
              view: 'View',
              resolve: 'Resolve',
              reject: 'Reject',
              export: 'Export',
              vulnResolved: 'Vulnerability resolved',
              vulnRejected: 'Vulnerability rejected',
              vulnUpdated: 'Vulnerability updated'
            },
            challenges: {
              title: 'Challenges',
              description: 'Manage challenges and competitions',
              createChallenge: 'Create Challenge',
              manageChallenges: 'Manage Challenges',
              category: 'Category',
              participants: 'Participants',
              entryCost: 'Entry Cost',
              prize: 'Prize',
              view: 'View',
              edit: 'Edit',
              delete: 'Delete',
              confirmDelete: 'Are you sure you want to delete this challenge?',
              challengeDeleted: 'Challenge deleted successfully',
              challengeUpdated: 'Challenge updated successfully'
            },
            common: {
              loading: 'Loading...',
              error: 'Error loading data',
              noData: 'No data available',
              confirm: 'Confirm',
              cancel: 'Cancel',
              save: 'Save',
              delete: 'Delete',
              edit: 'Edit',
              view: 'View',
              export: 'Export',
              search: 'Search',
              filter: 'Filter',
              all: 'All',
              active: 'Active',
              inactive: 'Inactive',
              pending: 'Pending',
              resolved: 'Resolved',
              success: 'Success',
              warning: 'Warning',
              info: 'Info'
            },
            menu: {
              home: 'Home',
              personalInfo: 'Personal Information',
              privacy: 'Privacy & Data',
              security: 'Security',
              activity: 'Activity',
              languageTheme: 'Language & Theme',
              general: 'General Information',
            },
            quickAccess: {
              welcome: 'Welcome',
              description: 'Manage your information, privacy, and security to improve your experience on the platform.',
              searchPlaceholder: 'Search your account...',
              myPassword: 'My password',
              devices: 'Devices',
              myActivity: 'My activity',
              email: 'Email',
              reportStorage: 'Report storage',
              inUse: 'in use',
              viewDetails: 'View details',
              privacyAndPersonalization: 'Privacy and personalization',
              privacyAndPersonalizationDesc: 'Check stored data and choose what activity to save to personalize your experience.',
              managePrivacy: 'Manage privacy',
              quickAccess: 'Quick access',
            },
            welcome: {
              welcome: 'Welcome',
              description: 'Manage your information, privacy, and security to improve your experience on the platform.',
            },
          }
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
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}; 