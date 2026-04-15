/**
 * Behavior to expand all accordions on the CFRT website
 */
async function setup(page) {
  // Wait for the page to load the accordion script
  await page.waitForSelector('.w-tabs.initialized', { timeout: 10000 }).catch(() => {});

  // Execute in the browser context
  await page.evaluate(() => {
    const sections = document.querySelectorAll('.w-tabs-section');
    sections.forEach(section => {
      // Add the active class to the container
      section.classList.add('active');
      
      // Force the hidden content div to display
      const content = section.querySelector('.w-tabs-section-content');
      if (content) {
        content.style.display = 'block';
        content.style.height = 'auto';
        content.style.visibility = 'visible';
        content.style.opacity = '1';
      }
    });
  });
}

module.exports = setup;