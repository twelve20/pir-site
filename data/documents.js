// Массив документов
const documents = [
    {
        icon: '/icons/pdf-icon.svg',
        name: 'Сертификат пожарной безопасности',
        link: '/files/fire-safety.pdf'
    },
    {
        icon: '/icons/pdf-icon.svg',
        name: 'Экологический сертификат',
        link: '/files/eco-certificate.pdf'
    },
    {
        icon: '/icons/pdf-icon.svg',
        name: 'Техническое описание PIR-плит',
        link: '/files/technical-description.pdf'
    }
];

// Ссылка на архив со всеми документами
const allDocumentsLink = '/files/all-documents.zip';

module.exports = { documents, allDocumentsLink };