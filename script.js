
// ==========================================
// 01 — NAVIGATION CONTROLLER
// ==========================================

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('#header');
const navLinks = document.querySelectorAll('.navbar a');
const progressBar = document.querySelector('#scrollProgress');
const sections = document.querySelectorAll('section[id]');

function closeMenu() {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    menuIcon.setAttribute('aria-expanded', 'false');
}

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');

    const isOpen = navbar.classList.toggle('active');

    menuIcon.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', event => {
    if (!header.contains(event.target)) {
        closeMenu();
    }
});

// ==========================================
// 02 — SCROLL INTELLIGENCE
// ==========================================

function updateNavigation() {

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    progressBar.style.width =
        Math.min(100, Math.max(0, progress)) + '%';

    header.classList.toggle('scrolled', scrollTop > 50);

    let currentSection = 'home';

    sections.forEach(section => {
        if (
            section.getBoundingClientRect().top
            <= window.innerHeight * 0.35
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive =
            link.getAttribute('href') === '#' + currentSection;

        link.classList.toggle('active', isActive);

        if (isActive) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('scroll', updateNavigation, {
    passive: true
});

window.addEventListener('resize', updateNavigation);

updateNavigation();

// ==========================================
// 03 — CONTACT INTERACTION
// ==========================================

const contactCard = document.getElementById('contactCard');

function openContactCard() {
    contactCard.style.display = 'flex';
}

function closeContactCard() {
    contactCard.style.display = 'none';
}

contactCard.addEventListener('click', event => {
    if (event.target === contactCard) {
        closeContactCard();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeContactCard();
        closeMenu();
    }
});


// ==========================================
// 04 — INTERACTIVE HERO IDENTITY
// ==========================================

const heroVisual = document.querySelector('.hero-visual');
const visualFrame = document.querySelector('.visual-frame');

const supportsTilt = window.matchMedia(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
);

if (heroVisual && visualFrame) {

    heroVisual.addEventListener('pointermove', event => {

        if (!supportsTilt.matches) return;

        const rect = heroVisual.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        const rotateX = -y * 12;
        const rotateY = x * 12;

        visualFrame.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    heroVisual.addEventListener('pointerleave', () => {
        visualFrame.style.transform =
            'rotateX(0deg) rotateY(0deg)';
    });
}


// ==========================================
// 05 — SCROLL REVEAL ENGINE
// ==========================================

const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
);

if ('IntersectionObserver' in window && !reduceMotion.matches) {

    document.documentElement.classList.add('motion-enabled');

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.08
        }
    );

    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });

}

// ==========================================
// 06 — ANIMATED STATISTICS
// ==========================================

function animateCounter(element) {

    const target = Number(element.dataset.target);
    const duration = 1300;

    let startTime = null;

    function update(timestamp) {

        if (startTime === null) {
            startTime = timestamp;
        }

        const progress = Math.min(
            (timestamp - startTime) / duration,
            1
        );

        const eased = 1 - Math.pow(1 - progress, 3);

        const value = Math.round(target * eased);

        element.textContent = String(value).padStart(2, '0');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

if ('IntersectionObserver' in window && !reduceMotion.matches) {

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

}

// ==========================================
// 07 — BENTO SPOTLIGHT EFFECT
// ==========================================

document.querySelectorAll('.bento-card').forEach(card => {

    card.addEventListener('pointermove', event => {

        if (!supportsTilt.matches) return;

        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            '--mouse-x',
            `${event.clientX - rect.left}px`
        );

        card.style.setProperty(
            '--mouse-y',
            `${event.clientY - rect.top}px`
        );

    });

    card.addEventListener('pointerleave', () => {

        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');

    });

});


// ==========================================
// INTERACTIVE INTEREST PANELS
// ==========================================

const interestPanels =
    document.querySelectorAll('.interest-panel');

interestPanels.forEach(panel => {

    panel.addEventListener('click', () => {

        interestPanels.forEach(item => {

            const isActive = item === panel;

            item.classList.toggle('active', isActive);

            item.setAttribute(
                'aria-expanded',
                String(isActive)
            );

        });

    });

});



// ==========================================
// TECHNOLOGY BROWSER
// ==========================================

const technologyData = {

    embedded: {
        title: 'Embedded Systems',

        description:
            'Microcontrollers, real-time systems and connected devices.',

        skills: [
           'STM32 / ARM Cortex-M',
           'ESP32 / ESP-IDF',
           'PIC Microcontrollers',
           'TI C6000 DSP',
           'FreeRTOS',
           'Bare-Metal Programming',
           'Interrupts & DMA',
           'UART / SPI / I²C',
           'CAN Bus',
           'RS-485 / Modbus',
           'USB / Ethernet',
           'MQTT / IoT',
           'JTAG / SWD',
           'STM32CubeIDE'
]
    },

    hardware: {
        title: 'Hardware Design',

        description:
            'Electronic design, PCB layout and hardware simulation.',

        skills: [
    'Altium Designer',
    'KiCad',
    'LTspice',
    'Analog & Digital Circuits',
    'Mixed-Signal Design',
    'Multilayer PCB Design',
    'PCB Stack-Up',
    'High-Speed Routing',
    'Signal & Power Integrity',
    'Power Supply Design',
    'EMI / EMC',
    'Power Electronics',
    'HyperLynx',
    'DFM / DRC'
]
    },

    digital: {
        title: 'Digital Design',

        description:
            'RTL development, processor architectures and FPGA prototyping.',

        skills: [
    'SystemVerilog',
    'Verilog',
    'VHDL',
    'RTL Design',
    'Functional Verification',
    'Testbench Dev',
    'FSM Design',
    'RISC-V',
    'FPGA / Cyclone V',
    'Logic Synthesis',
    'Static Timing Analysis',
    'ASIC Design Flow',
    'ModelSim / Questa',
    'Quartus Prime'
]
    },

    programming: {
        title: 'Programming',

        description:
            'Low-level programming, software development and engineering tools.',

        skills: [
    'C/C++',
    'Python',
    'MATLAB',
    'RISC-V Assembly',
    'TI C6000 Assembly',
    'Bash / Shell',
    'Linux',
    'Flask',
    'Git / GitHub',
    'CMake',
    'Object-Oriented Programming',
    'Memory Management',
    'Data Structures & Algorithms',
    'Software Debugging'
]
    },

    robotics: {
    title: 'Robotics, Control & AI',

    description:
        'Robotic systems, mathematical modeling, control and intelligent perception.',

    skills: [
        'ROS Noetic',
        'ROS Control',
        'Gazebo',
        'RViz',
        'URDF / Xacro',
        'Kinematics',
        'MATLAB / Simulink',
        'PID Control',
        'State-Space Modeling',
        'OpenCV',
        'TensorFlow / Keras',
        'Neural Networks',
        'Edge AI'
    ]
}

};

// DOM elements

const technologyTabs =
    document.querySelectorAll('.technology-tab');

const technologyGrid =
    document.getElementById('technologyGrid');

const technologyTitle =
    document.getElementById('technologyTitle');

const technologyDescription =
    document.getElementById('technologyDescription');

// Render technologies

function renderTechnologies(category) {

    const data = technologyData[category];

    if (
        !data ||
        !technologyGrid ||
        !technologyTitle ||
        !technologyDescription
    ) return;

    technologyTitle.textContent = data.title;

    technologyDescription.textContent =
        data.description;

    technologyGrid.replaceChildren();

    // Generate text-only technology cards

    data.skills.forEach(skill => {

        const card = document.createElement('div');

        card.className = 'technology-card';

        const name = document.createElement('span');

        name.textContent = skill;

        card.appendChild(name);

        technologyGrid.appendChild(card);

    });

    // Update active category

    technologyTabs.forEach(tab => {

        const active =
            tab.dataset.category === category;

        tab.classList.toggle('active', active);

        tab.setAttribute(
            'aria-pressed',
            String(active)
        );

    });

    // Content transition

    technologyGrid.classList.remove('refresh');

    void technologyGrid.offsetWidth;

    technologyGrid.classList.add('refresh');

}

// Category interaction

technologyTabs.forEach(tab => {

    tab.addEventListener('click', () => {

        renderTechnologies(tab.dataset.category);

    });

});

// Default category

if (technologyGrid) {

    renderTechnologies('embedded');

}


// ==========================================
// PROJECT GALLERY
// ==========================================

const portfolioProjects = [

    {
        title: 'EdgeGuard',
        category: 'hardware',
        label: 'Hardware Design',
        image: 'project7.png',
        status: '',

        description:
            'Industrial embedded monitoring and communication platform integrating STM32 processing, isolated RS-485, LTE and GNSS on a custom four-layer PCB.',

        tags: [
            'Altium Designer',
            'STM32F407',
            'RS-485',
            'Modbus',
            'LTE',
            'PCB Design'
        ],

        link:
            'https://github.com/bk201-dev/industrial-edge-monitoring-platform'
    },

    {
        title: 'RISC-V Processor',
        category: 'digital',
        label: 'Digital Design',
        image: 'project1.png',
        status: '',

        description:
            'A 32-bit single-cycle RV32I processor implemented in SystemVerilog, combining instruction decoding, ALU operations, register access and memory execution.',

        tags: [
            'SystemVerilog',
            'RISC-V',
            'RTL Design',
            'ModelSim'
        ],

        link:
            'https://github.com/bk201-dev/riscv-rv32i-single-cycle-cpu'
    },

    {
        title: 'FusionCore-MX',
        category: 'hardware',
        label: 'Mixed-Signal Design',
        image: 'fusion.png',
        status: '',

        description:
            'A multilayer mixed-signal PCB integrating STM32 processing, Ethernet communication, analog data acquisition and motor control.',

        tags: [
            'Altium Designer',
            'Mixed-Signal',
            'Ethernet',
            'Signal Integrity',
            'ADC / DAC'
        ],

        link:
            'https://github.com/bk201-dev/FusionCore-MX'
    },

    {
        title: 'Frame2Motion',
        category: 'robotics',
        label: 'Robotics & Control',
        image: 'project8.png',
        status: 'In development',

        description:
            'A robotic arm control stack connecting kinematics, URDF modeling, Gazebo simulation and ROS-based control with physical servo actuation.',

        tags: [
            'ROS',
            'Gazebo',
            'URDF / Xacro',
            'Kinematics',
            'Arduino'
        ],

        link:
            'https://github.com/bk201-dev/frame2motion'
    },

    {
        title: 'HAKUHO',
        category: 'robotics',
        label: 'Autonomous Robotics',
        image: 'project2.png',
        status: '',

        description:
            'An autonomous sumo robot powered by a custom STM32 control board, integrating distance sensors, line detection and motor control.',

        tags: [
            'STM32',
            'PCB Design',
            'Sensors',
            'Motor Control'
        ],

        link:
            'https://github.com/bk201-dev/HAKUHO-Hardware'
    },

    {
        title: 'FPGA Digital Systems',
        category: 'digital',
        label: 'FPGA Development',
        image: 'project4.jpg',
        status: '',

        description:
            'Digital systems implemented in VHDL, exploring arithmetic logic, finite state machines and hardware-software integration using the NIOS II soft-core processor.',

        tags: [
            'VHDL',
            'FPGA',
            'Quartus',
            'NIOS II'
        ],

        link: ''
    },

    {
        title: 'ESP32 IoT Platform',
        category: 'embedded',
        label: 'Embedded Firmware',
        image: 'project5.png',
        status: '',

        description:
            'Connected-device firmware integrating FreeRTOS multitasking, Wi-Fi, MQTT, AWS IoT Core and an embedded web server.',

        tags: [
            'ESP32',
            'FreeRTOS',
            'MQTT',
            'AWS IoT Core'
        ],

        link: ''
    },

    {
        title: 'Industrial PLC & HMI',
        category: 'embedded',
        label: 'Industrial Automation',
        image: 'project6.png',
        status: '',

        description:
            'Simulation and supervision of an automated industrial production line using PLC programming and an interactive HMI interface.',

        tags: [
            'PLC',
            'Ladder Logic',
            'RSLogix',
            'RSView32'
        ],

        link:
            'https://github.com/bk201-dev/Industrial-Control-HMI-PLC'
    }

];

// ==========================================
// GALLERY CONTROLLER
// ==========================================

const projectSelector =
    document.getElementById('projectSelector');

const featuredProject =
    document.getElementById('featuredProject');

const projectFilters =
    document.querySelectorAll('.project-filter');

let activeProjectFilter = 'all';
let activeProjectIndex = 0;

function selectPortfolioProject(index) {

    const project = portfolioProjects[index];

    if (!project || !featuredProject) return;

    activeProjectIndex = index;

    // Update featured project

    const image =
        document.getElementById('featuredImage');

    image.src = project.image;
    image.alt = project.title;
    image.parentElement.style.setProperty(
    '--project-background',
    `url("${project.image}")`
);

    document.getElementById('featuredTitle')
        .textContent = project.title;

    document.getElementById('featuredCategory')
        .textContent = project.label;

    document.getElementById('featuredDescription')
        .textContent = project.description;

    document.getElementById('featuredStatus')
        .textContent = project.status;

    // Generate technology tags

    const tags =
        document.getElementById('featuredTags');

    tags.replaceChildren();

    project.tags.forEach(tag => {

        const element = document.createElement('span');

        element.textContent = tag;

        tags.appendChild(element);

    });

    // GitHub link

    const link =
        document.getElementById('featuredLink');

    if (project.link) {

        link.href = project.link;
        link.hidden = false;

    } else {

        link.removeAttribute('href');
        link.hidden = true;

    }

    // Update selected item

    document.querySelectorAll('.project-option')
        .forEach(option => {

            const active =
                Number(option.dataset.index) === index;

            option.classList.toggle('active', active);

            option.setAttribute(
                'aria-pressed',
                String(active)
            );

        });

    // Project transition

    featuredProject.classList.remove('refresh');

    void featuredProject.offsetWidth;

    featuredProject.classList.add('refresh');

}

// Generate project list

function renderProjectSelector() {

    if (!projectSelector) return;

    projectSelector.replaceChildren();

    portfolioProjects.forEach((project, index) => {

        if (
            activeProjectFilter !== 'all' &&
            project.category !== activeProjectFilter
        ) return;

        const option =
            document.createElement('button');

        option.type = 'button';
        option.className = 'project-option';
        option.dataset.index = index;

        option.setAttribute(
            'aria-pressed',
            String(index === activeProjectIndex)
        );

        option.classList.toggle(
            'active',
            index === activeProjectIndex
        );

        const thumbnail =
            document.createElement('img');

        thumbnail.src = project.image;
        thumbnail.alt = '';
        thumbnail.loading = 'lazy';

        const info =
            document.createElement('div');

        info.className = 'project-option-info';

        const title =
            document.createElement('span');

        title.className = 'project-option-name';
        title.textContent = project.title;

        const category =
            document.createElement('span');

        category.className = 'project-option-category';
        category.textContent = project.label;

        info.append(title, category);

        const arrow =
            document.createElement('i');

        arrow.className = 'bx bx-chevron-right';
        arrow.setAttribute('aria-hidden', 'true');

        option.append(thumbnail, info, arrow);

        option.addEventListener('click', () => {

            selectPortfolioProject(index);

        });

        projectSelector.appendChild(option);

    });

}

// Filter interaction

projectFilters.forEach(filter => {

    filter.addEventListener('click', () => {

        activeProjectFilter = filter.dataset.filter;

        projectFilters.forEach(item => {

            const active = item === filter;

            item.classList.toggle('active', active);

            item.setAttribute(
                'aria-pressed',
                String(active)
            );

        });

        const firstIndex =
            portfolioProjects.findIndex(project =>

                activeProjectFilter === 'all' ||
                project.category === activeProjectFilter

            );

        if (firstIndex === -1) return;

        activeProjectIndex = firstIndex;

        renderProjectSelector();

        selectPortfolioProject(firstIndex);

    });

});

// Initialize gallery

if (projectSelector && featuredProject) {

    renderProjectSelector();

    selectPortfolioProject(0);

}


// ==========================================
// CONTACT — COPY EMAIL
// ==========================================

const copyEmailButton =
    document.getElementById('copyEmailButton');

const copyEmailText =
    document.getElementById('copyEmailText');

const contactEmail =
    'm.reda.ezzouhry@gmail.com';

let copyEmailTimeout;

if (copyEmailButton && copyEmailText) {

    const copyIcon =
        copyEmailButton.querySelector('i');

    copyEmailButton.addEventListener('click', async () => {

        clearTimeout(copyEmailTimeout);

        try {

            await navigator.clipboard.writeText(
                contactEmail
            );

            copyEmailText.textContent = 'Email copied';

            copyEmailButton.classList.add('copied');

            if (copyIcon) {
                copyIcon.className = 'bx bx-check';
            }

        } catch (error) {

            copyEmailButton.classList.remove('copied');

            copyEmailText.textContent =
                'Copy unavailable';

            openContactCard();

        }

        copyEmailTimeout = setTimeout(() => {

            copyEmailText.textContent = 'Copy email';

            copyEmailButton.classList.remove('copied');

            if (copyIcon) {
                copyIcon.className = 'bx bx-copy';
            }

        }, 2200);

    });

}


// ==========================================
// CONTACT FORM — FORMSPREE
// ==========================================

const portfolioContactForm =
    document.getElementById('portfolioContactForm');

const contactSubmit =
    document.getElementById('contactSubmit');

const contactFormStatus =
    document.getElementById('contactFormStatus');

if (portfolioContactForm) {

    portfolioContactForm.addEventListener(
        'submit',
        async (event) => {

            event.preventDefault();

            if (contactSubmit.disabled) return;

            const formData =
                new FormData(portfolioContactForm);

            const submitText =
                contactSubmit.querySelector('span');

            contactSubmit.disabled = true;

            submitText.textContent = 'Sending...';

            contactFormStatus.textContent = '';
            contactFormStatus.className =
                'contact-form-status';

            try {

                const response = await fetch(
                    portfolioContactForm.action,
                    {
                        method: 'POST',

                        body: formData,

                        headers: {
                            Accept: 'application/json'
                        }
                    }
                );

                if (!response.ok) {

                    throw new Error('Submission failed');

                }

                contactFormStatus.textContent =
                    'Message sent successfully. Thank you!';

                contactFormStatus.classList.add('success');

                portfolioContactForm.reset();

            } catch (error) {

                contactFormStatus.textContent =
                    'Unable to send your message. Please try again or contact me by email.';

                contactFormStatus.classList.add('error');

            } finally {

                contactSubmit.disabled = false;

                submitText.textContent = 'Send message';

            }
        }
    );
}

