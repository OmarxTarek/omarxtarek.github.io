const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');

      const tabName = button.getAttribute('data-tab');
      document.getElementById(`${tabName}-content`).classList.add('active');
    });
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');

    if (href.endsWith('.html')) {
      return;
    }

    e.preventDefault();

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    link.classList.add('active');

    const targetId = href;
    if (targetId !== '#home' && targetId !== '#projects' && targetId !== '#contact') {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

const resumeBtn = document.querySelector('.btn-resume');
if (resumeBtn) {
  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'Omar_Tarek_Student_resume.pdf';
    link.download = 'Omar_Tarek_Resume.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.send-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    emailjs.init('pMiaxcwX_a8VGCLGJ');

    const templateParams = {
      from_name: contactForm.name.value,
      from_email: contactForm.email.value,
      message: contactForm.message.value,
      to_email: 'Omarxtarek1@gmail.com'
    };

    emailjs.send('service_ey0ugoq', 'template_ub46po9', templateParams)
      .then(() => {
        submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
        submitBtn.style.backgroundColor = '#10b981';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
        submitBtn.innerHTML = 'Failed to Send <i class="fa-solid fa-times"></i>';
        submitBtn.style.backgroundColor = '#ef4444';
        submitBtn.disabled = false;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      });
  });
}
