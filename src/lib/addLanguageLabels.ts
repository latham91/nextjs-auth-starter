'use client';

// Function that adds the data-language attribute to pre tags based on their inner code's language class
export function addLanguageLabels() {
  // Find all pre elements with code elements that have a language class
  const preElements = document.querySelectorAll('pre');
  
  preElements.forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;
    
    // Extract language from the class name (language-xxx)
    const classes = Array.from(code.classList);
    const languageClass = classes.find(cls => cls.startsWith('language-'));
    
    if (languageClass) {
      const language = languageClass.replace('language-', '');
      
      // Set the data-language attribute on the pre element
      pre.setAttribute('data-language', language);
    }
  });
} 