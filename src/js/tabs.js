export function setupTabSwitching({ summaryId, detailId, tabSummaryId, tabDetailId }) {
  const tabSummary = document.getElementById(tabSummaryId);
  const tabDetail = document.getElementById(tabDetailId);
  const summaryTab = document.getElementById(summaryId);
  const detailTab = document.getElementById(detailId);

  tabSummary.addEventListener("click", () => {
    summaryTab.classList.remove("hidden");
    detailTab.classList.add("hidden");
    tabSummary.classList.replace("bg-gray-200", "bg-blue-600");
    tabSummary.classList.replace("text-gray-700", "text-white");
    tabDetail.classList.replace("bg-blue-600", "bg-gray-200");
    tabDetail.classList.replace("text-white", "text-gray-700");
  });

  tabDetail.addEventListener("click", () => {
    summaryTab.classList.add("hidden");
    detailTab.classList.remove("hidden");
    tabDetail.classList.replace("bg-gray-200", "bg-blue-600");
    tabDetail.classList.replace("text-gray-700", "text-white");
    tabSummary.classList.replace("bg-blue-600", "bg-gray-200");
    tabSummary.classList.replace("text-white", "text-gray-700");
  });
}