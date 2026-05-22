let content = null;

const $ = (id) => document.getElementById(id);

function setStatus(message) {
  $('status').textContent = message;
}

function bindTabs() {
  document.querySelectorAll('.tabs button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tabs button').forEach((item) => item.classList.remove('active'));
      document.querySelectorAll('.panel').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      $(`tab-${button.dataset.tab}`).classList.add('active');
      updateJsonPreview();
    });
  });
}

async function loadContent() {
  const response = await fetch('/api/content');
  content = await response.json();
  renderAll();
  setStatus('Content loaded from data/site-content.json');
}

function syncTopLevelFromForm() {
  content.brand.name = $('brandName').value;
  content.brand.tagline = $('brandTagline').value;
  content.brand.description = $('brandDescription').value;
  content.brand.logoBlack = $('brandLogoBlack').value;
  content.brand.logoWhite = $('brandLogoWhite').value;
  content.contact.address = $('contactAddress').value;
  content.contact.googleMapsUrl = $('contactMaps').value;
  content.contact.whatsappDisplay = $('contactWaDisplay').value;
  content.contact.whatsappInternational = $('contactWaIntl').value;
  content.policies.checkIn = $('policyCheckIn').value;
  content.policies.checkOut = $('policyCheckOut').value;
  content.policies.earlyLate = $('policyEarlyLate').value;
  content.policies.cancelRefund = $('policyCancelRefund').value;
}

function renderTopLevel() {
  $('brandName').value = content.brand.name;
  $('brandTagline').value = content.brand.tagline;
  $('brandDescription').value = content.brand.description;
  $('brandLogoBlack').value = content.brand.logoBlack;
  $('brandLogoWhite').value = content.brand.logoWhite;
  $('contactAddress').value = content.contact.address;
  $('contactMaps').value = content.contact.googleMapsUrl;
  $('contactWaDisplay').value = content.contact.whatsappDisplay;
  $('contactWaIntl').value = content.contact.whatsappInternational;
  $('policyCheckIn').value = content.policies.checkIn;
  $('policyCheckOut').value = content.policies.checkOut;
  $('policyEarlyLate').value = content.policies.earlyLate;
  $('policyCancelRefund').value = content.policies.cancelRefund;
}

function makeInput(value, onInput, placeholder = '') {
  const input = document.createElement('input');
  input.value = value ?? '';
  input.placeholder = placeholder;
  input.addEventListener('input', () => onInput(input.value));
  return input;
}

function renderEditableList(containerId, items, fields, onAdd) {
  const container = $(containerId);
  container.innerHTML = '';
  items.forEach((item, index) => {
    const article = document.createElement('article');
    article.className = 'item';
    const row = document.createElement('div');
    row.className = 'row';
    fields.forEach((field) => {
      row.appendChild(makeInput(
        Array.isArray(item[field.key]) ? item[field.key].join(', ') : item[field.key],
        (value) => {
          item[field.key] = field.array ? value.split(',').map((part) => part.trim()).filter(Boolean) : field.number ? Number(value) : value;
          updateJsonPreview();
        },
        field.label
      ));
    });
    const del = document.createElement('button');
    del.className = 'danger';
    del.type = 'button';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      items.splice(index, 1);
      renderAll();
    });
    article.append(row, del);
    container.appendChild(article);
  });
  onAdd();
}

function renderRooms() {
  renderEditableList('roomsList', content.rooms, [
    { key: 'id', label: 'id' },
    { key: 'name', label: 'name' },
    { key: 'quantity', label: 'quantity', number: true },
    { key: 'capacity', label: 'capacity' },
    { key: 'weekdayPrice', label: 'weekday price', number: true },
    { key: 'weekendPrice', label: 'weekend price', number: true },
    { key: 'facilities', label: 'facilities', array: true },
    { key: 'image', label: 'image path' },
    { key: 'description', label: 'description' },
  ], () => {});
}

function renderPackages() {
  renderEditableList('packagesList', content.packages, [
    { key: 'id', label: 'id' },
    { key: 'name', label: 'name' },
    { key: 'description', label: 'description' },
  ], () => {});
}

function renderFacilities() {
  renderEditableList('facilitiesList', content.facilities, [
    { key: 'id', label: 'id' },
    { key: 'name', label: 'name' },
    { key: 'image', label: 'image path' },
  ], () => {});
}

function renderGallery() {
  const container = $('galleryList');
  container.innerHTML = '';
  content.gallery.forEach((image, index) => {
    const article = document.createElement('article');
    article.className = 'item';
    const row = document.createElement('div');
    row.className = 'row';
    row.appendChild(makeInput(image, (value) => {
      content.gallery[index] = value;
      updateJsonPreview();
    }, 'image path'));
    const del = document.createElement('button');
    del.className = 'danger';
    del.type = 'button';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      content.gallery.splice(index, 1);
      renderAll();
    });
    article.append(row, del);
    container.appendChild(article);
  });
}

function renderAll() {
  renderTopLevel();
  renderRooms();
  renderPackages();
  renderFacilities();
  renderGallery();
  updateJsonPreview();
}

function updateJsonPreview() {
  if (!content) return;
  syncTopLevelFromForm();
  $('jsonPreview').textContent = JSON.stringify(content, null, 2);
}

async function saveContent() {
  updateJsonPreview();
  const response = await fetch('/api/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });
  if (!response.ok) throw new Error('Save failed');
  setStatus('Saved data/site-content.json');
}

async function buildPages() {
  await saveContent();
  const response = await fetch('/api/build', { method: 'POST' });
  const result = await response.json();
  setStatus(`Rebuilt pages: ${result.pages.join(', ')}`);
}

async function uploadImage() {
  const file = $('uploadFile').files[0];
  if (!file) return setStatus('Choose an image first.');
  const base64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.readAsDataURL(file);
  });
  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, folder: $('uploadFolder').value, base64 }),
  });
  const result = await response.json();
  if (result.ok) {
    content.gallery.push(result.path);
    renderGallery();
    updateJsonPreview();
    setStatus(`Uploaded ${result.path}`);
  }
}

function bindActions() {
  document.querySelectorAll('input, textarea').forEach((input) => input.addEventListener('input', updateJsonPreview));
  $('saveBtn').addEventListener('click', saveContent);
  $('saveBtn2').addEventListener('click', saveContent);
  $('buildBtn').addEventListener('click', buildPages);
  $('buildBtn2').addEventListener('click', buildPages);
  $('uploadBtn').addEventListener('click', uploadImage);
  $('addRoom').addEventListener('click', () => {
    content.rooms.push({ id: 'new-room', name: 'New Room', quantity: 1, capacity: 'Max 2 orang', weekdayPrice: 0, weekendPrice: 0, facilities: [], image: '', description: '' });
    renderAll();
  });
  $('addPackage').addEventListener('click', () => {
    content.packages.push({ id: 'new-package', name: 'New Package', description: '' });
    renderAll();
  });
  $('addFacility').addEventListener('click', () => {
    content.facilities.push({ id: 'new-facility', name: 'New Facility', image: '' });
    renderAll();
  });
  $('addGallery').addEventListener('click', () => {
    content.gallery.push('assets/images/uploads/gallery/new-image.webp');
    renderAll();
  });
}

bindTabs();
bindActions();
loadContent().catch((error) => setStatus(error.message));
