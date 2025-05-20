import React from 'react';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-dark-background shadow-sm mt-8">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-light-primary dark:text-dark-primary">Achapromo</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Seu site para encontrar as melhores promoções de hardware e periféricos de informática.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" title="Inicio" className="text-sm text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/categoria/todos" title='Categorias' className="text-sm text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200">
                  Categorias
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Contato</h4>
            <div className="space-y-2">
              <a
                href="mailto:contatoachapromo@gmail.com"
                title='Email'
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200 flex items-center gap-2"
              >
                contatoachapromo@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/achapromo.com.br"
                target="_blank"
                rel="noopener noreferrer"
                title='instagram achapromo'
                className="text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/achapromo.br"
                title='Facebook'
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://x.com/CAchapromo91665"
                target="_blank"
                rel="noopener noreferrer"
                title='X'
                className="text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                <FaXTwitter size={24} />
              </a>
              <a
                href="https://discord.gg/sjwGPPyhUJ"
                target="_blank"
                title='Discord'
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                <FaDiscord size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Achapromo - Todos os direitos reservados
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy" title='Privacidade' className="text-sm text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200">
                Política de Privacidade
              </Link>
              <Link href="/terms" title="Termos de uso" className="text-sm text-gray-600 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;