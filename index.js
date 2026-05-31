const rooms = [
  { id:1, type:'single', badge:'Popular', badgeClass:'', category:'Standard Room', name:'Classic Single', desc:'A serene retreat for the solo traveller. Featuring a plush single bed, blackout curtains, smart TV, and a private bathroom with a rainfall shower.', img:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', price:2499, amenities:['AC','Smart TV','Private Bath','Coffee Maker','Free Wi-Fi','City View'], fullAmenities:['King Pillow-top Mattress','Rainfall Shower','Air Conditioning','55" Smart TV','High-speed Wi-Fi','Mini Fridge','In-room Safe','Daily Housekeeping','Room Service 24/7'] },
  { id:2, type:'double', badge:'Best Value', badgeClass:'', category:'Deluxe Room', name:'Grand Double', desc:'Perfect for couples or business travellers. Spacious layout with a king-size double bed, work desk, and a panoramic city-view balcony.', img:'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80', price:3999, amenities:['AC','Smart TV','Bathtub','Espresso','Wi-Fi','Balcony'], fullAmenities:['King-size Double Bed','Soaking Bathtub Shower','Private Balcony','Work Desk Chair','Espresso Machine','65" Smart TV','Minibar','Turn-down Service','Concierge Access'] },
  { id:3, type:'share', badge:'Group Friendly', badgeClass:'', category:'Triple Share', name:'Three Share Suite', desc:'Ideal for friends or family groups. Three premium beds, dual bathrooms, a lounge area, and curated amenities for a luxurious group stay.', img:'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&q=80', price:5499, amenities:['AC','2 Smart TV','2 Bath','Lounge','Wi-Fi','View'], fullAmenities:['3 Premium Single Beds','Two Private Bathrooms','Separate Living Area','Dual Smart TVs','Mini Kitchen','Group Breakfast Included','Luggage Storage','Airport Transfer Option'] },
  { id:4, type:'suite', badge:'Premium', badgeClass:'premium', category:'Executive Suite', name:'Executive Suite', desc:'Indulge in our signature suite with a separate bedroom, living room, dining area, and an exclusive butler service. Business meets luxury.', img:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', price:9999, amenities:['Jacuzzi','Dining','Butler','55 TV','Wi-Fi','Skyline'], fullAmenities:['Master King Bedroom','Private Jacuzzi','Formal Dining Room','Personal Butler','Skyline View Terrace','85" OLED TV','Full Bar Setup','Premium Toiletries','Late Checkout Guaranteed'] },
  { id:5, type:'suite', badge:'New', badgeClass:'new', category:'Presidential Suite', name:'Presidential Suite', desc:'The pinnacle of luxury. A two-floor private sanctuary with a rooftop terrace, private pool, personal chef service, and curated wellness amenities.', img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', price:24999, amenities:['Private Pool','Chef','Wellness','Cinema','Chauffeur','Rooftop'], fullAmenities:['Two-Floor Private Penthouse','Private Rooftop Pool','Personal Chef on Call','Home Cinema Room','Dedicated Chauffeur','Wellness Spa Room','Helipad Access','Custom Pillow Menu','Sommelier Service'] },
  { id:6, type:'double', badge:'Popular', badgeClass:'', category:'Garden View Room', name:'Garden Retreat', desc:'Wake up to lush gardens and birdsong. A tranquil double room with natural decor, garden access, and a private outdoor sitting area.', img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', price:3299, amenities:['Garden','Smart TV','Rain Shower','Sunrise','Wi-Fi','Yoga Deck'], fullAmenities:['Queen-size Bed','Private Garden View','Rain Shower','Outdoor Sitting Patio','Yoga Mat Deck','Organic Toiletries','Smart TV','Complimentary Breakfast'] }
];

const features = [
  { icon:'✨', title:'World-Class Service', desc:'Our trained concierge team is available around the clock, ensuring every request is met with a smile and swift action.' },
  { icon:'🍽️', title:'Fine Dining', desc:'Multiple in-house restaurants serving authentic Indian cuisine, international buffets, and private candlelit dinners.' },
  { icon:'🧖', title:'Signature Spa', desc:'Rejuvenate with our Ayurvedic treatments, aromatherapy massages, and luxury wellness rituals.' },
  { icon:'🏊', title:'Infinity Pool', desc:'Dive into our rooftop infinity pool with panoramic city views, open from sunrise to midnight.' },
  { icon:'🏋️', title:'Fitness Centre', desc:'State-of-the-art equipment, personal trainers, and wellness programs tailored to your goals.' },
  { icon:'🚗', title:'Airport Transfer', desc:'Complimentary luxury vehicle pickup and drop-off for all suite guests. Travel in absolute comfort.' },
  { icon:'📶', title:'Ultra-fast Wi-Fi', desc:'1Gbps fibre throughout the property. Stream, work, and connect without limits.' },
  { icon:'🔒', title:'Secure Premises', desc:'24/7 security, CCTV surveillance, electronic key access, and a dedicated safety team.' }
];

const testimonials = [
  { stars:5, text:'An absolutely breathtaking experience. The Presidential Suite was beyond anything I\'ve ever imagined. The butler service was impeccable and the rooftop pool was magical under the stars.', name:'Priya Sharma', loc:'Mumbai', avatar:'https://i.pravatar.cc/100?img=47' },
  { stars:5, text:'We stayed for our anniversary and Stellar Stays made it unforgettable. The room was immaculate, the food was divine, and the staff remembered our names every single time.', name:'Arjun Meena', loc:'Bangalore', avatar:'https://i.pravatar.cc/100?img=32' },
  { stars:5, text:'Business travel has never felt this indulgent. The Executive Suite, high-speed internet, and the 5-star breakfast made my week-long stay feel like a vacation.', name:'Rahul Verma', loc:'Delhi', avatar:'https://i.pravatar.cc/100?img=11' },
  { stars:4, text:'The Garden Retreat room was so peaceful. Waking up to the sound of birds and stepping onto my private patio with morning chai was truly restorative.', name:'Ananya Reddy', loc:'Hyderabad', avatar:'https://i.pravatar.cc/100?img=25' },
  { stars:5, text:'Travelled with three friends for a wedding and the Three Share Suite was perfect. Plenty of space, two gorgeous bathrooms, and the group breakfast was a lovely touch.', name:'Kiran, Syed & Friends', loc:'Chennai', avatar:'https://i.pravatar.cc/100?img=60' }
];

let currentRoom = null;
let wishlist = new Set();
let currentFilter = 'all';
let toastTimer;

function renderRooms(filter='all'){
  const grid = document.getElementById('roomsGrid');
  const filtered = filter === 'all' ? rooms : rooms.filter(r => r.type === filter);
  grid.innerHTML = filtered.map((r, i) => `
    <div class="room-card reveal reveal-delay-${i % 4 + 1}" onclick="openModal(${r.id})" style="animation-delay:${i * 0.1}s">
      <div class="room-img">
        <img src="${r.img}" alt="${r.name}" loading="lazy" />
        <span class="room-badge ${r.badgeClass}">${r.badge}</span>
        <button class="room-wishlist ${wishlist.has(r.id) ? 'active' : ''}" onclick="toggleWishlist(event, ${r.id})">${wishlist.has(r.id) ? '♥' : '♡'}</button>
      </div>
      <div class="room-body">
        <div class="room-type">${r.category}</div>
        <div class="room-name">${r.name}</div>
        <div class="room-desc">${r.desc.slice(0, 100)}...</div>
        <div class="room-amenities">
          ${r.amenities.slice(0,4).map(a => `<span class="amenity">${a}</span>`).join('')}
        </div>
        <div class="room-footer">
          <div class="room-price">
            <div class="room-price-from">From</div>
            <div class="room-price-val">₹${r.price.toLocaleString('en-IN')}</div>
            <div class="room-price-night">/night</div>
          </div>
          <button class="btn-book-room">Book Now</button>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

function renderFeatures(){
  document.getElementById('featuresGrid').innerHTML = features.map((f, i) => `
    <div class="feature-card reveal reveal-delay-${i % 4 + 1}">
      <span class="feature-icon">${f.icon}</span>
      <div class="feature-title">${f.title}</div>
      <div class="feature-desc">${f.desc}</div>
    </div>
  `).join('');
}

function renderTestimonials(){
  document.getElementById('testimonialsTrack').innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="t-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <div class="t-text">${t.text}</div>
      <div class="t-author">
        <img class="t-avatar" src="${t.avatar}" alt="${t.name}" loading="lazy" />
        <div>
          <div class="t-name">${t.name}</div>
          <div class="t-loc">${t.loc}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterRooms(type, btn){
  currentFilter = type;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRooms(type);
}

function openModal(id){
  const r = rooms.find(x => x.id === id);
  currentRoom = r;
  document.getElementById('modalImg').src = r.img;
  document.getElementById('modalType').textContent = r.category;
  document.getElementById('modalTitle').textContent = r.name;
  document.getElementById('modalDesc').textContent = r.desc;
  document.getElementById('modalPrice').innerHTML = `₹${r.price.toLocaleString('en-IN')}<sub>/night</sub>`;
  document.getElementById('modalAmenities').innerHTML = r.fullAmenities.map(a => `<span class="modal-amenity">${a}</span>`).join('');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e){
  if(!e || e.target.id === 'modalOverlay' || e.currentTarget?.classList?.contains('modal-close')){
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }
}

function confirmBooking(){
  closeModal();
  showToast(`${currentRoom.name} booking initiated! Redirecting to checkout...`);
  setTimeout(() => showToast('Secure payment gateway ready!'), 2500);
}

function toggleWishlist(e, id){
  e.stopPropagation();
  if(wishlist.has(id)) wishlist.delete(id);
  else wishlist.add(id);
  showToast(wishlist.has(id) ? 'Added to wishlist!' : 'Removed from wishlist!');
  renderRooms(currentFilter);
}

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

function handleQuickSearch(){
  const ci = document.getElementById('checkin').value;
  const co = document.getElementById('checkout').value;
  if(!ci || !co) return showToast('Please select check-in and check-out dates.');
  if(new Date(co) <= new Date(ci)) return showToast('Check-out must be after check-in.');
  const nights = Math.round((new Date(co) - new Date(ci)) / 86400000);
  document.getElementById('rooms').scrollIntoView({behavior:'smooth'});
  showToast(`Showing rooms for ${nights} night${nights > 1 ? 's' : ''}`);
}

function handleContact(){
  showToast("Message sent! We'll reply within 2 hours.");
}

function observeReveal(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
}

function setDefaultDates(){
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const fmt = d => d.toISOString().split('T')[0];
  document.getElementById('checkin').value = fmt(today);
  document.getElementById('checkout').value = fmt(tomorrow);
  document.getElementById('checkin').min = fmt(today);
  document.getElementById('checkout').min = fmt(tomorrow);
}

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('[data-mobile-link]').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeModal();
});

window.addEventListener('DOMContentLoaded', () => {
  setDefaultDates();
  renderRooms();
  renderFeatures();
  renderTestimonials();
  observeReveal();
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1800);
});