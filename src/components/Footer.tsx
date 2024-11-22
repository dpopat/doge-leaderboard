import { FaInstagram, FaXTwitter, FaTiktok, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaInstagram className="w-6 h-6" />,
      href: "https://instagram.com/dogeleaderboard",
      label: "Follow us on Instagram",
    },
    {
      icon: <FaXTwitter className="w-6 h-6" />,
      href: "https://x.com/dogeleaderboard",
      label: "Follow us on X",
    },
    {
      icon: <FaTiktok className="w-6 h-6" />,
      href: "https://tiktok.com/@dogeleaderboard",
      label: "Follow us on TikTok",
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      href: "mailto:dogeleaderboard@gmail.com",
      label: "Email us at dogeleaderboard@gmail.com",
    },
  ];

  return (
    <footer className="mt-auto py-8">
      <div className="w-4/5 mx-auto">
        <hr className="border-gray-200" />
        <div className="flex justify-center gap-6 mt-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label={link.label}
              tabIndex={0}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
