class ExpandAccordions {
  static id = 'expand-cfrt-accordions';

  // This tells Browsertrix to run the script on every page of the site
  static isMatch(url) {
    return url.includes('cfrt.org.nz');
  }

  // The main logic that runs after the page loads
  async run(ctx) {
    const { page } = ctx;

    // 1. Wait briefly for the site's own JS to initialize (max 3 seconds)
    try {
      await page.waitForSelector('.w-tabs.initialized', { timeout: 3000 });
    } catch (e) {
      // If no accordion is found, we just exit the script gracefully
      return;
    }

    // 2. Expand all sections
    await page.evaluate(() => {
      const sections = document.querySelectorAll('.w-tabs-section');
      sections.forEach(section => {
        section.classList.add('active');
        const content = section.querySelector('.w-tabs-section-content');
        if (content) {
          content.style.display = 'block';
          content.style.height = 'auto';
          content.style.opacity = '1';
        }
      });
    });

    // 3. Optional: Brief pause to ensure content is fully rendered before snapshot
    await new Promise(r => setTimeout(r, 500));
  }
}

// Crucial: Browsertrix needs the class exported this way
module.exports = ExpandAccordions;
