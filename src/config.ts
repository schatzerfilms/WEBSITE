/**
 * Central configuration file for SCHATZERFilms.
 * Change values here to update them across the entire site.
 */

export const siteConfig = {
    /** Contact email – used in the contact form & footer */
    contactEmail: 'kilianflawless@gmail.com',

    /**
     * EmailJS – reads from .env file (VITE_EMAILJS_*)
     */
    emailjs: {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    },

    /** Social media links */
    socials: {
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com',
        vimeo: 'https://vimeo.com',
    },
} as const;
