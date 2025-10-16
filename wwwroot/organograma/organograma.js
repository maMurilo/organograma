const employees = [
  { id: 1, name: "Alice Vanderbilt", title: "CEO", email: "alice@company.com", leaderId: null, photo: "https://i.pravatar.cc/60?img=1", level: 1 },
  { id: 2, name: "Bob Daniels", title: "VP Marketing", email: "bob@company.com", leaderId: 1, photo: "https://i.pravatar.cc/60?img=2", level: 2 },
  { id: 3, name: "Carol Prescott", title: "VP Operations", email: "carol@company.com", leaderId: 1, photo: "https://i.pravatar.cc/60?img=3", level: 2 },
  { id: 4, name: "David Cain", title: "Director Marketing", email: "david@company.com", leaderId: 2, photo: "https://i.pravatar.cc/60?img=4", level: 3 },
  { id: 5, name: "Eve Spinelli", title: "Manager Operations", email: "eve@company.com", leaderId: 3, photo: "https://i.pravatar.cc/60?img=5", level: 3 }
];

const select = document.getElementById("leaderSelect");
const chartDiv = document.getElementById("orgChart");

// Preencher select
employees.forEach(emp => {
  select.innerHTML += `<option value="${emp.id}">${emp.name}</option>`;
});

// Função recursiva para montar o organograma
function buildOrgChart(leaderId) {
  const subs = employees.filter(e => e.leaderId === leaderId);
  if (subs.length === 0) return "";

  let html = "<ul>";
  subs.forEach(sub => {
    html += `<li>
      <div class="card level-${sub.level}">
        <img src="${sub.photo}" alt="${sub.name}">
        <h3>${sub.name}</h3>
        <p>${sub.title}</p>
        <p>${sub.email}</p>
      </div>
      ${buildOrgChart(sub.id)}
    </li>`;
  });
  html += "</ul>";
  return html;
}

// Atualiza o organograma ao selecionar líder
select.addEventListener("change", function () {
  const leaderId = parseInt(this.value);
  if (!leaderId) {
    chartDiv.innerHTML = "";
    return;
  }
  const leader = employees.find(e => e.id === leaderId);
  chartDiv.innerHTML = `<div class="card level-${leader.level}">
    <img src="${leader.photo}" alt="${leader.name}">
    <h3>${leader.name}</h3>
    <p>${leader.title}</p>
    <p>${leader.email}</p>
  </div>` + buildOrgChart(leaderId);
});

