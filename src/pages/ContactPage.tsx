import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { siteConfig } from '../config';

function ScrollReveal({
    children,
    delay = 0,
    className = '',
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+43',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const countryCodes = [
        { code: '+93', label: 'AF +93' }, { code: '+355', label: 'AL +355' }, { code: '+213', label: 'DZ +213' },
        { code: '+376', label: 'AD +376' }, { code: '+244', label: 'AO +244' }, { code: '+1', label: 'AG +1' },
        { code: '+54', label: 'AR +54' }, { code: '+374', label: 'AM +374' }, { code: '+297', label: 'AW +297' },
        { code: '+61', label: 'AU +61' }, { code: '+43', label: 'AT +43' }, { code: '+994', label: 'AZ +994' },
        { code: '+1', label: 'BS +1' }, { code: '+973', label: 'BH +973' }, { code: '+880', label: 'BD +880' },
        { code: '+1', label: 'BB +1' }, { code: '+375', label: 'BY +375' }, { code: '+32', label: 'BE +32' },
        { code: '+501', label: 'BZ +501' }, { code: '+229', label: 'BJ +229' }, { code: '+1', label: 'BM +1' },
        { code: '+975', label: 'BT +975' }, { code: '+591', label: 'BO +591' }, { code: '+387', label: 'BA +387' },
        { code: '+267', label: 'BW +267' }, { code: '+55', label: 'BR +55' }, { code: '+246', label: 'IO +246' },
        { code: '+673', label: 'BN +673' }, { code: '+359', label: 'BG +359' }, { code: '+226', label: 'BF +226' },
        { code: '+257', label: 'BI +257' }, { code: '+855', label: 'KH +855' }, { code: '+237', label: 'CM +237' },
        { code: '+1', label: 'CA +1' }, { code: '+238', label: 'CV +238' }, { code: '+1', label: 'KY +1' },
        { code: '+236', label: 'CF +236' }, { code: '+235', label: 'TD +235' }, { code: '+56', label: 'CL +56' },
        { code: '+86', label: 'CN +86' }, { code: '+61', label: 'CX +61' }, { code: '+61', label: 'CC +61' },
        { code: '+57', label: 'CO +57' }, { code: '+269', label: 'KM +269' }, { code: '+242', label: 'CG +242' },
        { code: '+243', label: 'CD +243' }, { code: '+682', label: 'CK +682' }, { code: '+506', label: 'CR +506' },
        { code: '+225', label: 'CI +225' }, { code: '+385', label: 'HR +385' }, { code: '+53', label: 'CU +53' },
        { code: '+357', label: 'CY +357' }, { code: '+420', label: 'CZ +420' }, { code: '+45', label: 'DK +45' },
        { code: '+253', label: 'DJ +253' }, { code: '+1', label: 'DM +1' }, { code: '+1', label: 'DO +1' },
        { code: '+593', label: 'EC +593' }, { code: '+20', label: 'EG +20' }, { code: '+503', label: 'SV +503' },
        { code: '+240', label: 'GQ +240' }, { code: '+291', label: 'ER +291' }, { code: '+372', label: 'EE +372' },
        { code: '+251', label: 'ET +251' }, { code: '+500', label: 'FK +500' }, { code: '+298', label: 'FO +298' },
        { code: '+679', label: 'FJ +679' }, { code: '+358', label: 'FI +358' }, { code: '+33', label: 'FR +33' },
        { code: '+594', label: 'GF +594' }, { code: '+689', label: 'PF +689' }, { code: '+241', label: 'GA +241' },
        { code: '+220', label: 'GM +220' }, { code: '+995', label: 'GE +995' }, { code: '+49', label: 'DE +49' },
        { code: '+233', label: 'GH +233' }, { code: '+350', label: 'GI +350' }, { code: '+30', label: 'GR +30' },
        { code: '+299', label: 'GL +299' }, { code: '+1', label: 'GD +1' }, { code: '+590', label: 'GP +590' },
        { code: '+1', label: 'GU +1' }, { code: '+502', label: 'GT +502' }, { code: '+224', label: 'GN +224' },
        { code: '+245', label: 'GW +245' }, { code: '+592', label: 'GY +592' }, { code: '+509', label: 'HT +509' },
        { code: '+504', label: 'HN +504' }, { code: '+852', label: 'HK +852' }, { code: '+36', label: 'HU +36' },
        { code: '+354', label: 'IS +354' }, { code: '+91', label: 'IN +91' }, { code: '+62', label: 'ID +62' },
        { code: '+98', label: 'IR +98' }, { code: '+964', label: 'IQ +964' }, { code: '+353', label: 'IE +353' },
        { code: '+972', label: 'IL +972' }, { code: '+39', label: 'IT +39' }, { code: '+1', label: 'JM +1' },
        { code: '+81', label: 'JP +81' }, { code: '+962', label: 'JO +962' }, { code: '+7', label: 'KZ +7' },
        { code: '+254', label: 'KE +254' }, { code: '+686', label: 'KI +686' }, { code: '+850', label: 'KP +850' },
        { code: '+82', label: 'KR +82' }, { code: '+965', label: 'KW +965' }, { code: '+996', label: 'KG +996' },
        { code: '+856', label: 'LA +856' }, { code: '+371', label: 'LV +371' }, { code: '+961', label: 'LB +961' },
        { code: '+266', label: 'LS +266' }, { code: '+231', label: 'LR +231' }, { code: '+218', label: 'LY +218' },
        { code: '+423', label: 'LI +423' }, { code: '+370', label: 'LT +370' }, { code: '+352', label: 'LU +352' },
        { code: '+853', label: 'MO +853' }, { code: '+389', label: 'MK +389' }, { code: '+261', label: 'MG +261' },
        { code: '+265', label: 'MW +265' }, { code: '+60', label: 'MY +60' }, { code: '+960', label: 'MV +960' },
        { code: '+223', label: 'ML +223' }, { code: '+356', label: 'MT +356' }, { code: '+692', label: 'MH +692' },
        { code: '+596', label: 'MQ +596' }, { code: '+222', label: 'MR +222' }, { code: '+230', label: 'MU +230' },
        { code: '+262', label: 'YT +262' }, { code: '+52', label: 'MX +52' }, { code: '+691', label: 'FM +691' },
        { code: '+373', label: 'MD +373' }, { code: '+377', label: 'MC +377' }, { code: '+976', label: 'MN +976' },
        { code: '+382', label: 'ME +382' }, { code: '+1', label: 'MS +1' }, { code: '+212', label: 'MA +212' },
        { code: '+258', label: 'MZ +258' }, { code: '+95', label: 'MM +95' }, { code: '+264', label: 'NA +264' },
        { code: '+674', label: 'NR +674' }, { code: '+977', label: 'NP +977' }, { code: '+31', label: 'NL +31' },
        { code: '+687', label: 'NC +687' }, { code: '+64', label: 'NZ +64' }, { code: '+505', label: 'NI +505' },
        { code: '+227', label: 'NE +227' }, { code: '+234', label: 'NG +234' }, { code: '+683', label: 'NU +683' },
        { code: '+672', label: 'NF +672' }, { code: '+1', label: 'MP +1' }, { code: '+47', label: 'NO +47' },
        { code: '+968', label: 'OM +968' }, { code: '+92', label: 'PK +92' }, { code: '+680', label: 'PW +680' },
        { code: '+970', label: 'PS +970' }, { code: '+507', label: 'PA +507' }, { code: '+675', label: 'PG +675' },
        { code: '+595', label: 'PY +595' }, { code: '+51', label: 'PE +51' }, { code: '+63', label: 'PH +63' },
        { code: '+48', label: 'PL +48' }, { code: '+351', label: 'PT +351' }, { code: '+1', label: 'PR +1' },
        { code: '+974', label: 'QA +974' }, { code: '+262', label: 'RE +262' }, { code: '+40', label: 'RO +40' },
        { code: '+7', label: 'RU +7' }, { code: '+250', label: 'RW +250' }, { code: '+590', label: 'BL +590' },
        { code: '+290', label: 'SH +290' }, { code: '+1', label: 'KN +1' }, { code: '+1', label: 'LC +1' },
        { code: '+590', label: 'MF +590' }, { code: '+508', label: 'PM +508' }, { code: '+1', label: 'VC +1' },
        { code: '+685', label: 'WS +685' }, { code: '+378', label: 'SM +378' }, { code: '+239', label: 'ST +239' },
        { code: '+966', label: 'SA +966' }, { code: '+221', label: 'SN +221' }, { code: '+381', label: 'RS +381' },
        { code: '+248', label: 'SC +248' }, { code: '+232', label: 'SL +232' }, { code: '+65', label: 'SG +65' },
        { code: '+421', label: 'SK +421' }, { code: '+386', label: 'SI +386' }, { code: '+677', label: 'SB +677' },
        { code: '+252', label: 'SO +252' }, { code: '+27', label: 'ZA +27' }, { code: '+500', label: 'GS +500' },
        { code: '+34', label: 'ES +34' }, { code: '+94', label: 'LK +94' }, { code: '+249', label: 'SD +249' },
        { code: '+597', label: 'SR +597' }, { code: '+47', label: 'SJ +47' }, { code: '+268', label: 'SZ +268' },
        { code: '+46', label: 'SE +46' }, { code: '+41', label: 'CH +41' }, { code: '+963', label: 'SY +963' },
        { code: '+886', label: 'TW +886' }, { code: '+992', label: 'TJ +992' }, { code: '+255', label: 'TZ +255' },
        { code: '+66', label: 'TH +66' }, { code: '+670', label: 'TL +670' }, { code: '+228', label: 'TG +228' },
        { code: '+690', label: 'TK +690' }, { code: '+676', label: 'TO +676' }, { code: '+1', label: 'TT +1' },
        { code: '+216', label: 'TN +216' }, { code: '+90', label: 'TR +90' }, { code: '+993', label: 'TM +993' },
        { code: '+1', label: 'TC +1' }, { code: '+688', label: 'TV +688' }, { code: '+256', label: 'UG +256' },
        { code: '+380', label: 'UA +380' }, { code: '+971', label: 'AE +971' }, { code: '+44', label: 'UK +44' },
        { code: '+598', label: 'UY +598' }, { code: '+998', label: 'UZ +998' }, { code: '+678', label: 'VU +678' },
        { code: '+58', label: 'VE +58' }, { code: '+84', label: 'VN +84' }, { code: '+1', label: 'VI +1' },
        { code: '+681', label: 'WF +681' }, { code: '+212', label: 'EH +212' }, { code: '+967', label: 'YE +967' },
        { code: '+260', label: 'ZM +260' }, { code: '+263', label: 'ZW +263' }, { code: '+1', label: 'US +1' }
    ].sort((a, b) => a.label.localeCompare(b.label));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent duplicate submissions
        if (status === 'sending' || status === 'sent') return;

        // 1-HOUR RATE LIMIT CHECK (Client-side via LocalStorage)
        const lastSent = localStorage.getItem('schatzer_last_contact');
        if (lastSent) {
            const timeSinceLastSent = Date.now() - parseInt(lastSent, 10);
            const oneHour = 60 * 60 * 1000;
            if (timeSinceLastSent < oneHour) {
                const minutesLeft = Math.ceil((oneHour - timeSinceLastSent) / 60000);
                setErrorMessage(`Please wait ${minutesLeft} minutes before sending another message.`);
                setTimeout(() => setErrorMessage(null), 8000);
                return;
            }
        }

        setErrorMessage(null);

        setStatus('sending');

        const emailjsConfigured =
            siteConfig.emailjs.serviceId &&
            siteConfig.emailjs.templateId &&
            siteConfig.emailjs.publicKey;

        if (emailjsConfigured) {
            // Real email sending via EmailJS
            try {
                await emailjs.send(
                    siteConfig.emailjs.serviceId,
                    siteConfig.emailjs.templateId,
                    {
                        from_name: `${formData.firstName} ${formData.lastName}`,
                        from_email: formData.email,
                        phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : '–',
                        message: formData.message,
                        to_email: siteConfig.contactEmail,
                    },
                    siteConfig.emailjs.publicKey
                );

                // Record the successful send time to enforce the 1-hour cooldown
                localStorage.setItem('schatzer_last_contact', Date.now().toString());

                setStatus('sent');
                setFormData({ firstName: '', lastName: '', email: '', countryCode: '+43', phone: '', message: '' });
            } catch {
                setStatus('error');
            }
        } else {
            // Fallback: open mailto
            const subject = encodeURIComponent(
                `Contact from ${formData.firstName} ${formData.lastName}`
            );
            const phoneDisplay = formData.phone ? `${formData.countryCode} ${formData.phone}` : '–';
            const body = encodeURIComponent(
                `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${phoneDisplay}\n\n${formData.message}`
            );
            window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;

            // Record the successful send time for fallback as well
            localStorage.setItem('schatzer_last_contact', Date.now().toString());

            setStatus('sent');
        }

        setTimeout(() => setStatus('idle'), 5000);
    };

    const inputClasses =
        'w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder-white/20 outline-none transition-all duration-300 focus:border-white/30 focus:bg-[#111] focus:ring-1 focus:ring-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]';

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Hero area */}
            <section className="pt-40 pb-8 px-6 md:px-12">
                <div className="max-w-2xl mx-auto text-center">
                    <ScrollReveal>
                        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/40 font-semibold mb-6">
                            Contact Us
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6">
                            Get in touch
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-white/40 text-base md:text-lg font-light max-w-md mx-auto">
                            We'd love to hear from you. Please fill out this form and we will get back to you shortly.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Contact Form */}
            <section className="pb-32 px-6 md:px-12 relative">
                <ScrollReveal delay={0.3}>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-3xl mx-auto mt-12 space-y-6 md:space-y-8 bg-[#050505] p-6 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative"
                    >
                        {/* Error UI Toast */}
                        <div className="absolute -top-16 left-0 right-0 flex justify-center pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: errorMessage ? 1 : 0, y: errorMessage ? 0 : 10, scale: errorMessage ? 1 : 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-xl text-sm font-medium shadow-[0_0_30px_rgba(239,68,68,0.1)] backdrop-blur-md"
                            >
                                {errorMessage}
                            </motion.div>
                        </div>

                        {/* Name Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-semibold text-white/40 mb-3 pl-1">
                                    First name <span className="text-white/20">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Jane"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-semibold text-white/40 mb-3 pl-1">
                                    Last name <span className="text-white/20">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Doe"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-semibold text-white/40 mb-3 pl-1">
                                Email <span className="text-white/20">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@company.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClasses}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-semibold text-white/40 mb-3 pl-1">
                                Phone number
                            </label>
                            <div className="flex gap-4">
                                {/* Custom Country Code Select */}
                                <div className="relative w-[120px] shrink-0" ref={dropdownRef}>
                                    <div
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`${inputClasses} cursor-pointer flex items-center justify-between select-none`}
                                    >
                                        <span className="font-mono text-sm">{countryCodes.find(c => c.code === formData.countryCode)?.label || 'AT +43'}</span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-white/40 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </div>

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-3 w-[200px] bg-[#0a0a0a] border border-white/10 rounded-xl overflow-y-auto overflow-x-hidden shadow-2xl z-50 max-h-64 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                                            {countryCodes.map((country) => (
                                                <div
                                                    key={country.code}
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, countryCode: country.code }));
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="px-5 py-3 text-sm font-mono text-white/60 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                                                >
                                                    {country.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Phone Input */}
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="(000) 000-0000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`${inputClasses} flex-1 font-mono`}
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-xs uppercase tracking-widest font-semibold text-white/40 mb-3 pl-1">
                                Message <span className="text-white/20">*</span>
                            </label>
                            <textarea
                                name="message"
                                placeholder="Tell us about your project..."
                                required
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                className={`${inputClasses} resize-none`}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                disabled={status === 'sending' || status === 'sent'}
                                className={`w-full py-5 rounded-xl text-sm font-bold tracking-[0.2em] uppercase transition-all duration-500
                    ${status === 'sent'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default shadow-[0_0_30px_rgba(34,197,94,0.1)]'
                                        : status === 'error'
                                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            : status === 'sending'
                                                ? 'bg-white/10 text-white/50 cursor-wait'
                                                : 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]'
                                    }`}
                                whileTap={status === 'idle' ? { scale: 0.98 } : undefined}
                            >
                                {status === 'sending'
                                    ? 'Sending securely...'
                                    : status === 'sent'
                                        ? '✓ Message Successfully Sent'
                                        : status === 'error'
                                            ? '✕ Delivery Failed – Please Try Again'
                                            : 'Send Message'}
                            </motion.button>
                        </div>

                        {/* Hint if EmailJS is not configured */}
                        {!siteConfig.emailjs.serviceId && (
                            <p className="text-center text-white/20 text-xs mt-6 font-mono">
                                System Notice: EmailJS is not configured in config.ts. Fallback to Mailto protocol active.
                            </p>
                        )}
                    </form>
                </ScrollReveal>
            </section>
        </div>
    );
}
