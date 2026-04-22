const fs = require('fs');
const glob = require('glob'); // Not using glob, will use fs.readdirSync
const path = require('path');

function removeLegacyLangFromFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.astro')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Find the end of frontmatter and remove the legacy block inside it
            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
            if (frontmatterMatch) {
                let frontmatter = frontmatterMatch[1];

                // Regex to remove the exact duplication block
                const duplicateImportsRegexEs = /import { useTranslations, defaultLang } from "\.\.\/\.\.\/utils\/i18n";\nimport { getRelativeLocaleUrl } from 'astro:i18n';\n\nconst url = new URL\(Astro\.request\.url\);\nconst lang = url\.searchParams\.get\('lang'\) \|\| defaultLang;\nconst t = useTranslations\(lang\);\n/g;
                const duplicateImportsRegexEn = /import { useTranslations, defaultLang } from "\.\.\/\.\.\/\.\.\/utils\/i18n";\nimport { getRelativeLocaleUrl } from 'astro:i18n';\n\nconst url = new URL\(Astro\.request\.url\);\nconst lang = url\.searchParams\.get\('lang'\) \|\| defaultLang;\nconst t = useTranslations\(lang\);\n/g;

                let modified = false;
                if (frontmatter.match(duplicateImportsRegexEs) || frontmatter.match(duplicateImportsRegexEn)) {
                    frontmatter = frontmatter.replace(duplicateImportsRegexEs, '');
                    frontmatter = frontmatter.replace(duplicateImportsRegexEn, '');
                    modified = true;
                }
                
                // Also catch single lines
                const oldUrlLang = /const url = new URL\(Astro\.request\.url\);\nconst lang = url\.searchParams\.get\('lang'\) \|\| defaultLang;\n/g;
                if (frontmatter.match(oldUrlLang)) {
                    frontmatter = frontmatter.replace(oldUrlLang, '');
                    modified = true;
                }
                
                const duplicateUseTranslationsEs = /import { useTranslations, defaultLang } from "\.\.\/\.\.\/utils\/i18n";\nimport { getRelativeLocaleUrl } from 'astro:i18n';\n\n/g;
                if (frontmatter.match(duplicateUseTranslationsEs) && frontmatter.split('import { useTranslations, defaultLang }').length > 2) {
                   // don't touch unless needed, it might be messy.
                }

                if (modified) {
                    content = '---\n' + frontmatter + '\n---' + content.substring(frontmatterMatch[0].length);
                    fs.writeFileSync(filePath, content);
                    console.log('Fixed ' + filePath);
                }
            }
        }
    }
}

removeLegacyLangFromFiles('./src/pages/proyectos');
removeLegacyLangFromFiles('./src/pages/en/proyectos');
