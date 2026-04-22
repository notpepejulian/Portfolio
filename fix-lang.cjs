const fs = require('fs');

function cleanFile(path) {
    let content = fs.readFileSync(path, 'utf8');
    
    // Check if there are multiple occurrences of 'const lang = Astro.currentLocale || defaultLang;'
    const targetEs = 'const lang = Astro.currentLocale || defaultLang;\nconst t = useTranslations(lang);';
    
    // Find where the frontmatter ends (second ---)
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
        let frontmatter = frontmatterMatch[1];
        
        // Remove ALL occurrences of the target lines
        const line1 = 'const lang = Astro.currentLocale || defaultLang;';
        const line2 = 'const t = useTranslations(lang);';
        
        // Count how many times line1 appears in frontmatter
        const counts = frontmatter.split(line1).length - 1;
        
        if (counts > 1) {
            console.log(`Fixing duplicates in ${path}`);
            // Keep only one occurrence of these lines by replacing all, then adding one back to the bottom of first front matter.
            // Wait, maybe the user had different definitions.
            // Let's just remove ALL matched lines from front matter and then prepend them once.
            
            frontmatter = frontmatter.replace(/const lang = Astro\.currentLocale \|\| defaultLang;/g, '');
            frontmatter = frontmatter.replace(/const t = useTranslations\(lang\);/g, '');
            
            // Bring back exactly one copy
            frontmatter = frontmatter.trim() + '\n\n' + line1 + '\n' + line2;
            
            // Reconstruct the file
            content = '---\n' + frontmatter + '\n---' + content.substring(frontmatterMatch[0].length);
            fs.writeFileSync(path, content);
        }
    }
}

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.astro')) {
            cleanFile(dir + '/' + file);
        }
    }
}

traverse('./src/pages/proyectos');
traverse('./src/pages/en/proyectos');
