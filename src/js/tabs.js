// tabs.js
export function setupTabs(tabSelector, panelSelector, activeClasses = [], inactiveClasses = []) {
  const tabs = document.querySelectorAll(tabSelector);
  const panels = document.querySelectorAll(panelSelector);

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-target");
      const targetPanel = document.getElementById(targetId);

      // sembunyikan semua panel
      panels.forEach(panel => panel.classList.add("hidden"));

      // nonaktifkan semua tab
      tabs.forEach(t => {
        inactiveClasses.forEach(c => t.classList.add(c));
        activeClasses.forEach(c => t.classList.remove(c));
      });

      // tampilkan panel target
      targetPanel.classList.remove("hidden");

      // aktifkan tab yang dipilih
      activeClasses.forEach(c => tab.classList.add(c));
      inactiveClasses.forEach(c => tab.classList.remove(c));
    });
  });

  // 👉 Set default: aktifkan tab pertama & panel pertama
  if (tabs.length > 0 && panels.length > 0) {
    const firstTab = tabs[0];
    const firstTargetId = firstTab.getAttribute("data-target");
    const firstPanel = document.getElementById(firstTargetId);

    // tampilkan panel pertama
    firstPanel.classList.remove("hidden");

    // aktifkan tab pertama
    activeClasses.forEach(c => firstTab.classList.add(c));
    inactiveClasses.forEach(c => firstTab.classList.remove(c));
  }
}