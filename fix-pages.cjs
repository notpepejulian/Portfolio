const fs = require('fs');

function fixFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.astro')) {
            const path = dir + '/' + file;
            let content = fs.readFileSync(path, 'utf8');
            
            const badBlockEs = /import { useTranslations, defaultLang } from "\.\.\/\.\.\/utils\/i18n";\nimport { getRelativeLocaleUrl } from "astro:i18n";\nconst lang = Astro\.currentLocale \|\| defaultLang;\nconst t = useTranslations\(lang\);\n/g;
            const badBlockEn = /import { useTranslations, defaultLang } from "\.\.\/\.\.\/\.\.\/utils\/i18n";\nimport { getRelativeLocaleUrl } from "astro:i18n";\nconst lang = Astro\.currentLocale \|\| defaultLang;\nconst t = useTranslations\(lang\);\n/g;

            content = content.replace(badBlockEs, '');
            content = content.replace(badBlockEn, '');

            const esImport = `import { useTranslations, defaultLang } from "../../utils/i18n";\nimport { getRelativeLocaleUrl } from "astro:i18n";\nconst lang = Astro.currentLocale || defaultLang;\nconst t = useTranslations(lang);\n`;
            const enImport = `import { useTranslations, defaultLang } from "../../../utils/i18n";\nimport { getRelativeLocaleUrl } from "astro:i18n";\nconst lang = Astro.currentLocale || defaultLang;\nconst t = useTranslations(lang);\n`;

            if (dir.includes('/en/')) {
                content = content.replace(/^---\n/, `---\n${enImport}`);
            } else {
                content = content.replace(/^---\n/, `---\n${esImport}`);
            }

            fs.writeFileSync(path, content);
        }
    }
}

fixFiles('./src/pages/proyectos');
fixFiles('./src/pages/en/proyectos');
