
const files = {
  'primero': ['libro1.pdf', 'libro2.docx'],
  'segundo': ['libro3.pdf'],
  'tercero': [],
  'cuarto': [],
  'quinto': [],
  'sexto': []
};

function showTab(year) {
  const section = document.getElementById('content');
  section.innerHTML = `<h2>${year.charAt(0).toUpperCase() + year.slice(1)} Año</h2>`;
  const fileList = files[year];
  if (!fileList || fileList.length === 0) {
    section.innerHTML += '<p>No hay libros disponibles.</p>';
    return;
  }
  fileList.forEach(file => {
    const fileId = year + '-' + file;
    section.innerHTML += \`
      <div class="file">
        <a href="./\${year}/\${file}" download>\${file}</a>
        <div class="rating" data-id="\${fileId}">
          \${[1,2,3,4,5].map(i =>
            '<span onclick="setRating(\'\${fileId}\', '+i+')" class="'+(getRating(fileId)>=i?'selected':'')+'">★</span>'
          ).join('')}
        </div>
      </div>
    \`;
  });
}

function getRating(id) {
  return localStorage.getItem(id) || 0;
}

function setRating(id, val) {
  localStorage.setItem(id, val);
  showTab(id.split('-')[0]);
}

document.addEventListener('DOMContentLoaded', () => showTab('primero'));
