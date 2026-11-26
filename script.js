
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


// ==========================================
// ENGINEERING MODE — WINDOW CONTROLLER
// ==========================================

const terminalTrigger =
    document.getElementById('terminalTrigger');

const terminalOverlay =
    document.getElementById('terminalOverlay');

const terminalClose =
    document.getElementById('terminalClose');

const terminalInput =
    document.getElementById('terminalInput');

const terminalForm =
    document.getElementById('terminalForm');

let terminalPreviousOverflow = '';

function openTerminal() {

    if (!terminalOverlay.hidden) return;

    terminalPreviousOverflow =
        document.body.style.overflow;

    terminalOverlay.hidden = false;

    document.body.style.overflow = 'hidden';

    if (!terminalBooted) {
    bootTerminal();
} else if (!terminalInput.disabled) {
    terminalInput.focus();
}

}

function closeTerminal() {

    if (terminalOverlay.hidden) return;

    terminalOverlay.hidden = true;

    document.body.style.overflow =
        terminalPreviousOverflow;

    terminalTrigger.focus();

}

terminalTrigger.addEventListener(
    'click', openTerminal
);

terminalClose.addEventListener(
    'click', closeTerminal
);

terminalOverlay.addEventListener('click', (event) => {

    if (event.target === terminalOverlay) {
        closeTerminal();
    }

});

document.addEventListener('keydown', (event) => {

    if (terminalOverlay.hidden) return;

    if (event.key === 'Escape') {

        event.preventDefault();

        closeTerminal();

    }

    if (event.key === 'Tab') {

        const focusable = [
            terminalClose,
            terminalInput
        ];

        const first = focusable[0];
        const last = focusable[1];

        if (event.shiftKey &&
            document.activeElement === first) {

            event.preventDefault();
            last.focus();

        } else if (!event.shiftKey &&
                   document.activeElement === last) {

            event.preventDefault();
            first.focus();

        }

    }

});

// Prevent page reload during command entry.
// Command execution will be implemented next.



// ==========================================
// ENGINEERING MODE — BOOT SEQUENCE
// ==========================================

const terminalOutput =
    document.getElementById('terminalOutput');

const terminalScreen =
    document.getElementById('terminalScreen');

let terminalBooted = false;

const terminalBootMessages = [
    ['[ OK ] Initializing system core...', 'terminal-success'],
    ['[ OK ] Loading engineering modules...', 'terminal-success'],
    ['[ OK ] Mounting project database...', 'terminal-success'],
    ['[ OK ] Establishing user interface...', 'terminal-success'],
    ['Welcome, curious human.', ''],
    ["Type 'help' to discover available commands.", 'terminal-muted']
];

function terminalDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function printTerminalLine(text, className = '') {

    const line = document.createElement('p');

    line.textContent = text;
    line.className = className;

    terminalOutput.appendChild(line);

    terminalScreen.scrollTop =
        terminalScreen.scrollHeight;
}

async function bootTerminal() {

    if (terminalBooted) return;

    terminalBooted = true;
    terminalInput.disabled = true;

    terminalOutput.replaceChildren();

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    for (const [message, className] of terminalBootMessages) {

        if (!reducedMotion) {
            await terminalDelay(300);
        }

        printTerminalLine(message, className);
    }

    terminalInput.disabled = false;

    if (!terminalOverlay.hidden) {
        terminalInput.focus();
    }
}


// ==========================================
// ENGINEERING MODE — COMMAND INTERPRETER
// ==========================================

const terminalCommands = {

    help() {

    printTerminalLine(
        'PORTFOLIO COMMANDS',
        'terminal-accent'
    );

    printTerminalLine(`whoami        Professional profile
skills        Technical capabilities
projects      Engineering projects
about         About me
journey       Experience & education
technologies  Explore technologies
cv            View resume
github        GitHub profile
contact       Send a message`);

    printTerminalLine(
    '\nEXPLORE & EXPERIMENT',
    'terminal-accent'
);

printTerminalLine(`lab           Open Engineering Lab
neofetch      System information
matrix        Toggle Matrix theme
ls            Explore virtual files
cat           Read a virtual file
pwd           Current directory
uname         System identity
ping          Test virtual connection
coffee        Check caffeine levels`);

    printTerminalLine(
        '\nSYSTEM COMMANDS',
        'terminal-accent'
    );

    printTerminalLine(`history       Command history
clear         Clear terminal
reboot        Restart interface
exit          Close terminal`);

    printTerminalLine(
        '\nHint: Not every command is documented. Stay curious.',
        'terminal-muted'
    );

},

    whoami() {

        printTerminalLine(
            'MOHAMED REDA EZ-ZOUHRY',
            'terminal-accent'
        );

        printTerminalLine(
            'Final-year Embedded Systems & Control Engineering student.'
        );

        printTerminalLine(
            'ENSA Marrakech, Morocco.'
        );

        printTerminalLine(
            'Exploring electronics, embedded software and digital architectures.'
        );

        printTerminalLine(
            'Available for a final-year internship from February 2027.',
            'terminal-success'
        );

    },

    skills() {

        printTerminalLine(
            'TECHNICAL CAPABILITIES',
            'terminal-accent'
        );

        printTerminalLine(`
  [01] Embedded Systems
       STM32, ESP32, FreeRTOS, Communication Protocols

  [02] Hardware Design
       Altium Designer, Mixed-Signal PCB, SI / PI

  [03] Digital Design
       SystemVerilog, VHDL, RTL, FPGA, RISC-V

  [04] Programming
       C, C++, Python, MATLAB, Assembly

  [05] Robotics & Control
       ROS, Gazebo, Kinematics, Simulink
        `.trimEnd());

    },

    projects() {

        printTerminalLine(
            'PROJECT DIRECTORY',
            'terminal-accent'
        );

        if (typeof portfolioProjects !== 'undefined') {

            portfolioProjects.forEach((project, index) => {

                printTerminalLine(
                    `  [${String(index + 1).padStart(2, '0')}] ${project.title} — ${project.label}`
                );

            });

        }

        printTerminalLine(
            "Type 'open projects' to explore the gallery.",
            'terminal-muted'
        );

    },

    about() {

        terminalNavigate('about');

    },

    journey() {

        terminalNavigate('journey');

    },

    technologies() {

        terminalNavigate('services');

    },

    github() {

        window.open(
            'https://github.com/bk201-dev',
            '_blank',
            'noopener,noreferrer'
        );

        printTerminalLine(
            '[ OK ] Opening GitHub...',
            'terminal-success'
        );

    },

    cv() {

        window.open(
            'Mohamed_Reda_EZ-ZOUHRY_CV_English_Original_Design.pdf',
            '_blank',
            'noopener,noreferrer'
        );

        printTerminalLine(
            '[ OK ] Opening resume...',
            'terminal-success'
        );

    },

    contact() {

        closeTerminal();

        openContactCard();

    },

    clear() {

        terminalOutput.replaceChildren();

    },

    reboot() {

        terminalBooted = false;

        bootTerminal();

    },

    exit() {

        closeTerminal();

    },

    sudo() {

        printTerminalLine(
            'ACCESS DENIED.',
            'terminal-error'
        );

        printTerminalLine(
            'Curiosity detected. Root privileges not granted.'
        );

        printTerminalLine(
            'Nice try, engineer.',
            'terminal-muted'
        );

    },

    hello() {

        printTerminalLine(
            'Hello, fellow curious human!',
            'terminal-success'
        );

    }

};


// Navigate to a portfolio section

function terminalNavigate(sectionId) {

    const section = document.getElementById(sectionId);

    if (!section) {

        printTerminalLine(
            'Section not found.',
            'terminal-error'
        );

        return;

    }

    closeTerminal();

    section.scrollIntoView({
        behavior: 'smooth'
    });

}


// Execute command

function executeTerminalCommand(rawCommand) {

    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    // Store command in history

if (terminalHistory.at(-1) !== rawCommand.trim()) {

    terminalHistory.push(rawCommand.trim());

}

terminalHistoryIndex = terminalHistory.length;

    printTerminalLine(
        `visitor@mr:~$ ${rawCommand}`,
        'terminal-command-echo'
    );

    if (command === 'open projects') {

        terminalNavigate('projects');

        return;

    }

    if (
        Object.prototype.hasOwnProperty.call(
            terminalCommands,
            command
        )
    ) {

        terminalCommands[command]();

    } else {

        printTerminalLine(
            `Command not found: ${command}`,
            'terminal-error'
        );

        printTerminalLine(
            "Type 'help' to see available commands.",
            'terminal-muted'
        );

    }

}


// Handle command submission

terminalForm.addEventListener('submit', (event) => {

    event.preventDefault();

    if (terminalInput.disabled) return;

    const command = terminalInput.value;

    terminalInput.value = '';

    executeTerminalCommand(command);

    terminalScreen.scrollTop =
        terminalScreen.scrollHeight;

});

// ==========================================
// ENGINEERING MODE — KEYBOARD INTERACTIONS
// ==========================================

const terminalHistory = [];

let terminalHistoryIndex = 0;
let terminalDraft = '';

const terminalAutocompleteCommands = [
    ...Object.keys(terminalCommands),
    'open projects',
    'neofetch',
    'matrix',
    'coffee',
    'ls',
    'pwd',
    'cat',
    'cat about.txt',
    'uname',
    'history',
    'ping'
].filter((command, index, array) =>
    array.indexOf(command) === index &&
    ![
        'sudo',
        'hello',
        'hack',
        'cat secret.txt'
    ].includes(command)
);

// Save command history

terminalForm.addEventListener('submit', () => {

    terminalHistoryIndex = terminalHistory.length;
    terminalDraft = '';

});

// Keyboard controller

terminalInput.addEventListener('keydown', (event) => {

    if (terminalInput.disabled) return;

    // Previous command

    if (event.key === 'ArrowUp') {

        event.preventDefault();

        if (terminalHistoryIndex === terminalHistory.length) {
            terminalDraft = terminalInput.value;
        }

        if (terminalHistoryIndex > 0) {

            terminalHistoryIndex--;

            terminalInput.value =
                terminalHistory[terminalHistoryIndex];

        }

        return;
    }

    // Next command

    if (event.key === 'ArrowDown') {

        event.preventDefault();

        if (terminalHistoryIndex < terminalHistory.length) {

            terminalHistoryIndex++;

            terminalInput.value =
                terminalHistoryIndex === terminalHistory.length
                    ? terminalDraft
                    : terminalHistory[terminalHistoryIndex];

        }

        return;
    }

    // Tab autocomplete

    if (event.key === 'Tab' && !event.shiftKey) {

        const input =
            terminalInput.value.trim().toLowerCase();

        if (!input) return;

        event.preventDefault();
        event.stopPropagation();

        const matches =
            terminalAutocompleteCommands.filter(command =>
                command.startsWith(input)
            );

        if (matches.length === 1) {

            terminalInput.value = matches[0];

        } else if (matches.length > 1) {

            printTerminalLine(
                matches.join('    '),
                'terminal-muted'
            );

        }

        return;
    }

    // Ctrl + L — Clear screen

    if (event.ctrlKey &&
        event.key.toLowerCase() === 'l') {

        event.preventDefault();

        terminalOutput.replaceChildren();

        return;
    }

    // Ctrl + C — Cancel current input

    if (event.ctrlKey &&
        event.key.toLowerCase() === 'c') {

        // Preserve normal text copying

        if (terminalInput.selectionStart !==
            terminalInput.selectionEnd) return;

        if (window.getSelection()?.toString()) return;

        event.preventDefault();

        printTerminalLine(
            `visitor@mr:~$ ${terminalInput.value}^C`,
            'terminal-muted'
        );

        terminalInput.value = '';

        terminalHistoryIndex = terminalHistory.length;

        terminalDraft = '';

    }

});


// ==========================================
// ENGINEERING MODE — EASTER EGGS
// ==========================================

Object.assign(terminalCommands, {

    neofetch() {

        printTerminalLine(`
███╗   ███╗██████╗
████╗ ████║██╔══██╗
██╔████╔██║██████╔╝
██║╚██╔╝██║██╔══██╗
██║ ╚═╝ ██║██║  ██║
╚═╝     ╚═╝╚═╝  ╚═╝
        `.trim(), 'terminal-accent');

        printTerminalLine(
            'visitor@mr',
            'terminal-accent'
        );

        printTerminalLine('──────────────────────────');

        printTerminalLine('OS       : MR Engineering OS v1.0');
        printTerminalLine('Kernel   : Curiosity');
        printTerminalLine('Shell    : Vanilla JavaScript');
        printTerminalLine('Focus    : Hardware & Silicon');
        printTerminalLine('Location : Morocco');
        printTerminalLine('Status   : Open to opportunities');

        printTerminalLine(
            '● ● ● ● ● ● ●',
            'terminal-accent'
        );

    },

    ls() {

        printTerminalLine(
            'about.txt    projects/    skills/    secret.txt'
        );

    },

    pwd() {

        printTerminalLine('/home/visitor');

    },

    'cat about.txt'() {

        printTerminalLine(
            'I like building things that connect the physical and digital worlds.'
        );

        printTerminalLine(
            'From electronic circuits to embedded software, from RTL to silicon.'
        );

    },

    'cat secret.txt'() {

        printTerminalLine(
            '[ HIDDEN FILE DISCOVERED ]',
            'terminal-success'
        );

        printTerminalLine(
            'You found something most visitors never will.'
        );

        printTerminalLine(
            'The best engineering tool is curiosity.',
            'terminal-accent'
        );

    },

    cat() {

        printTerminalLine(
            'Usage: cat <filename>',
            'terminal-muted'
        );

        printTerminalLine(
            "Type 'ls' to explore available files."
        );

    },

    uname() {

        printTerminalLine(
            'MR-OS v1.0 — Engineering Edition'
        );

    },

    hack() {

        printTerminalLine(
            '[ ... ] Establishing connection...'
        );

        printTerminalLine(
            '[ ... ] Checking credentials...'
        );

        printTerminalLine(
            '[ ERR ] ACCESS DENIED.',
            'terminal-error'
        );

        printTerminalLine(
            'Nice try. This is a portfolio, not a CTF.',
            'terminal-muted'
        );

    },

    coffee() {

        printTerminalLine(
            '[ WARNING ] Caffeine level below threshold.',
            'terminal-accent'
        );

        printTerminalLine(
            'Recommended action: refill immediately.'
        );

    },

    ping() {

        printTerminalLine('PING mr.local');

        printTerminalLine(
            'Reply received: simulated latency 0.42 ms'
        );

        printTerminalLine(
            '[ OK ] Connection established.',
            'terminal-success'
        );

    },

    history() {

        terminalHistory.forEach((command, index) => {

            printTerminalLine(
                `${index + 1}    ${command}`
            );

        });

    },

    matrix() {

        const enabled = terminalOverlay.classList.toggle(
            'matrix-mode'
        );

        printTerminalLine(

            enabled
                ? 'Wake up, engineer. Welcome to the Matrix.'
                : 'Default interface restored.',

            'terminal-success'

        );

    }

});

// ENGINEERING LAB — WINDOW CONTROLLER

const labOverlay =
    document.getElementById('labOverlay');

const labClose =
    document.getElementById('labClose');

let labPreviousOverflow = '';

function openEngineeringLab() {

    closeTerminal();

    labPreviousOverflow =
        document.body.style.overflow;

    labOverlay.hidden = false;

    document.body.style.overflow = 'hidden';

    labClose.focus();

}

function closeEngineeringLab() {

    if (labOverlay.hidden) return;

    labOverlay.hidden = true;

    document.body.style.overflow =
        labPreviousOverflow;

    openTerminal();

}

labClose.addEventListener(
    'click',
    closeEngineeringLab
);

labOverlay.addEventListener('click', event => {

    if (event.target === labOverlay) {
        closeEngineeringLab();
    }

});

document.addEventListener('keydown', event => {

    if (labOverlay.hidden) return;

    if (event.key === 'Escape') {

        event.preventDefault();

        closeEngineeringLab();

    } else if (event.key === 'Tab') {

        const elements = [...labOverlay.querySelectorAll(
            'button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href]'
        )].filter(element => element.getClientRects().length);

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (event.shiftKey &&
            document.activeElement === first) {

            event.preventDefault();
            last.focus();

        } else if (!event.shiftKey &&
                   document.activeElement === last) {

            event.preventDefault();
            first.focus();

        }

    }

});

// Register terminal command

terminalCommands.lab = function () {

    openEngineeringLab();

};

if (!terminalAutocompleteCommands.includes('lab')) {

    terminalAutocompleteCommands.push('lab');

}


// ==========================================
// ENGINEERING LAB — DIGITAL LOGIC
// ==========================================

const labContent =
    document.getElementById('labContent');

const logicState = {
    gate: 'AND',
    a: 1,
    b: 0
};

const logicDefinitions = {

    AND: {
        evaluate: (a, b) => a & b,
        expression: 'Y = A · B',
        description:
            'The output is HIGH only when both inputs are HIGH.'
    },

    OR: {
        evaluate: (a, b) => a | b,
        expression: 'Y = A + B',
        description:
            'The output is HIGH when at least one input is HIGH.'
    },

    XOR: {
        evaluate: (a, b) => a ^ b,
        expression: 'Y = A ⊕ B',
        description:
            'The output is HIGH when the two inputs are different.'
    },

    NAND: {
        evaluate: (a, b) => 1 - (a & b),
        expression: 'Y = NOT(A · B)',
        description:
            'The inverse of AND. A universal logic gate.'
    },

    NOR: {
        evaluate: (a, b) => 1 - (a | b),
        expression: 'Y = NOT(A + B)',
        description:
            'The inverse of OR. The output is HIGH only when both inputs are LOW.'
    },

    XNOR: {
        evaluate: (a, b) => 1 - (a ^ b),
        expression: 'Y = NOT(A ⊕ B)',
        description:
            'The output is HIGH when both inputs have the same value.'
    }

};


// Generate SVG logic gate

function renderLogicCircuit() {

    const { gate, a, b } = logicState;

    const y = logicDefinitions[gate].evaluate(a, b);

    const isAnd = ['AND', 'NAND'].includes(gate);

    const isXor = ['XOR', 'XNOR'].includes(gate);

    const inverted =
        ['NAND', 'NOR', 'XNOR'].includes(gate);

    const gateShape = isAnd

        ? `<path d="M155 47 H200
                    A55 55 0 0 1 200 157
                    H155 Z"/>`

        : `<path d="M140 47
                    Q180 102 140 157
                    Q210 160 255 102
                    Q210 44 140 47 Z"/>`;

    const xorLine = isXor

        ? `<path d="M128 47 Q168 102 128 157"
                 fill="none"/>`

        : '';

    const inversionBubble = inverted

        ? `<circle cx="262" cy="102"
                   r="7"
                   fill="#09090b"/>`

        : '';

    const inputEnd = isAnd
        ? 155
        : isXor ? 148 : 160;

    return `
        <svg viewBox="0 0 400 205"
             xmlns="http://www.w3.org/2000/svg"
             role="img"
             aria-label="${gate} gate:
                         A=${a}, B=${b}, Y=${y}">

            <defs>
                <pattern id="logicGrid"
                         width="20"
                         height="20"
                         patternUnits="userSpaceOnUse">

                    <path d="M20 0 H0 V20"
                          fill="none"
                          stroke="#ffffff08"
                          stroke-width="1"/>

                </pattern>
            </defs>

            <rect width="400"
                  height="205"
                  fill="url(#logicGrid)"/>

            <!-- Input signals -->

            <path d="M55 72 H${inputEnd}"
                  class="logic-wire ${a ? 'high' : ''}"/>

            <path d="M55 132 H${inputEnd}"
                  class="logic-wire ${b ? 'high' : ''}"/>

            <!-- Logic gate -->

            <g fill="#19191c"
               stroke="#a1a1aa"
               stroke-width="2"
               stroke-linejoin="round">

                ${gateShape}
                ${xorLine}
                ${inversionBubble}

            </g>

            <!-- Output signal -->

            <path d="M${inverted ? 269 : 255} 102 H345"
                  class="logic-wire ${y ? 'high' : ''}"/>

            <!-- Input and output LEDs -->

            <circle cx="42" cy="72" r="12"
                    class="logic-led ${a ? 'high' : ''}"/>

            <circle cx="42" cy="132" r="12"
                    class="logic-led ${b ? 'high' : ''}"/>

            <circle cx="359" cy="102" r="14"
                    class="logic-led ${y ? 'high' : ''}"/>

            <!-- Labels -->

            <g font-family="monospace"
               font-size="12"
               fill="#a1a1aa"
               text-anchor="middle">

                <text x="42" y="43">A = ${a}</text>

                <text x="42" y="165">B = ${b}</text>

                <text x="359" y="65">OUT</text>

                <text x="200" y="107"
                      font-weight="bold"
                      fill="#f4f4f5">
                    ${gate}
                </text>

                <text x="359" y="143"
                      font-size="14"
                      fill="${y ? '#ff6b35' : '#71717a'}">
                    Y = ${y}
                </text>

            </g>

        </svg>
    `;

}


// Generate truth table

function renderLogicTruthTable() {

    const definition =
        logicDefinitions[logicState.gate];

    const combinations = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ];

    return combinations.map(([a, b]) => {

        const current =
            a === logicState.a &&
            b === logicState.b;

        return `
            <tr class="${current ? 'current' : ''}">
                <td>${a}</td>
                <td>${b}</td>
                <td>${definition.evaluate(a, b)}</td>
            </tr>
        `;

    }).join('');

}


// Update simulation

function updateLogicSimulation() {

    const definition =
        logicDefinitions[logicState.gate];

    document.getElementById('logicCircuitSVG')
        .innerHTML = renderLogicCircuit();

    document.getElementById('logicTruthBody')
        .innerHTML = renderLogicTruthTable();

    document.getElementById('logicExpression')
        .textContent = definition.expression;

    document.getElementById('logicDescription')
        .textContent = definition.description;

    document.querySelectorAll('.logic-gate')
        .forEach(button => {

            const active =
                button.dataset.gate === logicState.gate;

            button.classList.toggle('active', active);

            button.setAttribute(
                'aria-pressed',
                String(active)
            );

        });

    document.querySelectorAll('.logic-input')
        .forEach(button => {

            const value =
                logicState[button.dataset.input];

            button.classList.toggle(
                'active',
                Boolean(value)
            );

            button.setAttribute(
                'aria-pressed',
                String(Boolean(value))
            );

            button.querySelector('strong')
                .textContent = value;

        });

}


// Generate module interface

function renderDigitalLogicLab() {

    labContent.innerHTML = `

        <div class="logic-header">

            <h3>Digital Logic</h3>

            <span class="logic-status">
                <span class="status-dot"></span>
                Simulation active
            </span>

        </div>

        <div class="logic-gates">

            ${Object.keys(logicDefinitions).map(gate => `

                <button type="button"
                        class="logic-gate"
                        data-gate="${gate}"
                        aria-pressed="false">

                    ${gate}

                </button>

            `).join('')}

        </div>

        <div class="logic-layout">

            <div class="logic-circuit">

                <div id="logicCircuitSVG"></div>

                <div class="logic-inputs">

                    <button type="button"
                            class="logic-input"
                            data-input="a">

                        Input A
                        <strong>1</strong>

                    </button>

                    <button type="button"
                            class="logic-input"
                            data-input="b">

                        Input B
                        <strong>0</strong>

                    </button>

                </div>

            </div>

            <div class="logic-table-panel">

                <h4>Truth table</h4>

                <table class="logic-table">

                    <thead>
                        <tr>
                            <th>A</th>
                            <th>B</th>
                            <th>Y</th>
                        </tr>
                    </thead>

                    <tbody id="logicTruthBody">
                    </tbody>

                </table>

                <div class="logic-expression">

                    <small>Boolean expression</small>

                    <strong id="logicExpression">
                    </strong>

                </div>

            </div>

        </div>

        <p class="logic-description"
           id="logicDescription"></p>

    `;

    labContent.querySelectorAll('.logic-gate')
        .forEach(button => {

            button.addEventListener('click', () => {

                logicState.gate =
                    button.dataset.gate;

                updateLogicSimulation();

            });

        });

    labContent.querySelectorAll('.logic-input')
        .forEach(button => {

            button.addEventListener('click', () => {

                const input = button.dataset.input;

                logicState[input] =
                    1 - logicState[input];

                updateLogicSimulation();

            });

        });

    updateLogicSimulation();

}


// Initialize Digital Logic module

renderDigitalLogicLab();


// ==========================================
// ENGINEERING LAB — SIGNAL STUDIO
// ==========================================

const signalState = {
    type: 'sine',
    frequency: 1000,
    amplitude: 3.3,
    duty: 50,
    timebase: 0.5,
    running: true
};


// Waveform definitions

const signalTypes = {

    sine: {
        label: 'Sine',
        icon: 'M0 9 Q7 -5 15 9 T30 9'
    },

    square: {
        label: 'Square',
        icon: 'M0 15 V3 H15 V15 H30 V3'
    },

    triangle: {
        label: 'Triangle',
        icon: 'M0 9 L7.5 2 L22.5 16 L30 9'
    },

    pwm: {
        label: 'PWM',
        icon: 'M0 15 V3 H9 V15 H24 V3 H30'
    }

};


// Calculate instantaneous voltage

function calculateSignal(t) {

    const {
        type,
        frequency,
        amplitude,
        duty
    } = signalState;

    const phase = (t * frequency) % 1;

    switch (type) {

        case 'sine':

            return amplitude *
                Math.sin(2 * Math.PI * phase);

        case 'square':

            return phase < 0.5
                ? amplitude
                : -amplitude;

        case 'triangle':

            return amplitude * (2 / Math.PI) *
                Math.asin(
                    Math.sin(2 * Math.PI * phase)
                );

        case 'pwm':

            return phase < duty / 100
                ? amplitude
                : 0;

        default:

            return 0;

    }

}


// Generate oscilloscope waveform

function generateSignalPath() {

    const width = 800;
    const height = 320;

    const horizontalDivisions = 10;
    const verticalDivisions = 8;

    const voltsPerDivision = 2;

    const pixelsPerVolt =
        height / verticalDivisions /
        voltsPerDivision;

    const duration =
        horizontalDivisions *
        signalState.timebase / 1000;

    const segments = 1600;

    let path = '';

    for (let i = 0; i <= segments; i++) {

        const x = i / segments * width;

        const t = i / segments * duration;

        const voltage = calculateSignal(t);

        const y =
            height / 2 -
            voltage * pixelsPerVolt;

        path +=
            `${i === 0 ? 'M' : 'L'}` +
            `${x.toFixed(2)} ${y.toFixed(2)} `;

    }

    return path;

}


// Generate oscilloscope SVG

function renderOscilloscope() {

    return `

        <svg class="scope-canvas"
             viewBox="0 0 800 320"
             xmlns="http://www.w3.org/2000/svg"
             role="img"
             aria-label="Simulated oscilloscope waveform">

            <defs>

                <pattern id="scopeGrid"
                         width="80"
                         height="40"
                         patternUnits="userSpaceOnUse">

                    <path d="M80 0 H0 V40"
                          fill="none"
                          stroke="#26262b"
                          stroke-width="1"/>

                </pattern>

            </defs>

            <rect width="800"
                  height="320"
                  fill="url(#scopeGrid)"/>

            <!-- Center axes -->

            <path d="M0 160 H800 M400 0 V320"
                  fill="none"
                  stroke="#55555d"
                  stroke-width="1"
                  stroke-dasharray="5 5"/>

            <!-- Soft waveform glow -->

            <path id="scopeGlow"
                  d=""
                  fill="none"
                  stroke="#ff6b35"
                  stroke-width="7"
                  opacity=".12"/>

            <!-- Main waveform -->

            <path id="scopeTrace"
                  d=""
                  fill="none"
                  stroke="#ff874c"
                  stroke-width="2"
                  stroke-linejoin="round"/>

        </svg>

    `;

}


// Update measurements and waveform

function updateSignalStudio() {

    const frequency =
        signalState.frequency;

    const amplitude =
        signalState.amplitude;

    const pwm =
        signalState.type === 'pwm';

    // Update control values

    document.getElementById('signalFrequencyValue')
        .textContent = `${frequency} Hz`;

    document.getElementById('signalAmplitudeValue')
        .textContent = `${amplitude.toFixed(1)} V`;

    document.getElementById('signalDutyValue')
        .textContent = `${signalState.duty}%`;

    document.getElementById('signalDutyControl')
        .hidden = !pwm;

    // Update selected waveform button

    labContent.querySelectorAll('.signal-type')
        .forEach(button => {

            const active =
                button.dataset.signal === signalState.type;

            button.classList.toggle('active', active);

            button.setAttribute(
                'aria-pressed',
                String(active)
            );

        });

    // Update RUN / STOP status

    const status =
        document.getElementById('signalStatus');

    status.textContent =
        signalState.running ? '● RUN' : '● STOP';

    status.classList.toggle(
        'stopped',
        !signalState.running
    );

    document.getElementById('signalRunButton')
        .innerHTML = signalState.running

        ? '<i class="bx bx-pause"></i> Stop'

        : '<i class="bx bx-play"></i> Run';

    // Preserve frozen waveform when stopped

    if (!signalState.running) return;

    const path = generateSignalPath();

    document.getElementById('scopeTrace')
        .setAttribute('d', path);

    document.getElementById('scopeGlow')
        .setAttribute('d', path);

    document.getElementById('scopeChannel')
        .textContent =
            `CH1 · ${signalState.type.toUpperCase()}`;

    document.getElementById('scopeTimebase')
        .textContent =
            `${signalState.timebase} ms/div · 2 V/div`;

    // Calculate measurements

    const peakToPeak =
        pwm ? amplitude : amplitude * 2;

    const period = 1000 / frequency;

    document.getElementById('signalMeasuredFrequency')
        .textContent = `${frequency} Hz`;

    document.getElementById('signalMeasuredVpp')
        .textContent = `${peakToPeak.toFixed(2)} V`;

    document.getElementById('signalMeasuredPeriod')
        .textContent = `${period.toFixed(2)} ms`;

}


// Render Signal Studio

function renderSignalStudio() {

    signalState.running = true;

    labContent.innerHTML = `

        <div class="signal-header">

            <div>

                <h3>Signal Studio</h3>

                <p>
                    Virtual oscilloscope & function generator
                </p>

            </div>

            <span class="signal-status"
                  id="signalStatus">

                ● RUN

            </span>

        </div>

        <div class="signal-types">

            ${Object.entries(signalTypes)
                .map(([type, definition]) => `

                <button type="button"
                        class="signal-type"
                        data-signal="${type}"
                        aria-pressed="false">

                    <svg viewBox="0 0 30 18"
                         aria-hidden="true">

                        <path d="${definition.icon}"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"/>

                    </svg>

                    ${definition.label}

                </button>

            `).join('')}

        </div>

        <div class="scope-screen">

            <div class="scope-toolbar">

                <span class="scope-channel"
                      id="scopeChannel"></span>

                <span id="scopeTimebase"></span>

            </div>

            ${renderOscilloscope()}

            <div class="scope-footer">

                <span>CH1 · DC coupling</span>

                <button type="button"
                        class="scope-toggle"
                        id="signalRunButton">

                    <i class="bx bx-pause"></i>

                    Stop

                </button>

            </div>

        </div>

        <!-- Measurements -->

        <div class="signal-measurements">

            <div class="signal-measurement">

                <small>Frequency</small>

                <strong id="signalMeasuredFrequency">
                </strong>

            </div>

            <div class="signal-measurement">

                <small>Peak-to-peak</small>

                <strong id="signalMeasuredVpp">
                </strong>

            </div>

            <div class="signal-measurement">

                <small>Period</small>

                <strong id="signalMeasuredPeriod">
                </strong>

            </div>

        </div>

        <!-- Signal controls -->

        <div class="signal-controls">

            <div class="signal-control">

                <div class="signal-control-label">

                    <label for="signalFrequency">
                        Frequency
                    </label>

                    <output id="signalFrequencyValue">
                    </output>

                </div>

                <input type="range"
                       id="signalFrequency"
                       min="100"
                       max="2000"
                       step="100"
                       value="${signalState.frequency}">

            </div>

            <div class="signal-control">

                <div class="signal-control-label">

                    <label for="signalAmplitude">
                        Amplitude
                    </label>

                    <output id="signalAmplitudeValue">
                    </output>

                </div>

                <input type="range"
                       id="signalAmplitude"
                       min="0.5"
                       max="5"
                       step="0.1"
                       value="${signalState.amplitude}">

            </div>

            <div class="signal-control">

                <div class="signal-control-label">

                    <label for="signalTimebase">
                        Timebase
                    </label>

                </div>

                <select id="signalTimebase">

                    ${[0.1, 0.2, 0.5, 1, 2]
                        .map(value => `

                        <option value="${value}"
                            ${value === signalState.timebase
                                ? 'selected' : ''}>

                            ${value} ms/div

                        </option>

                    `).join('')}

                </select>

            </div>

            <div class="signal-control"
                 id="signalDutyControl"
                 hidden>

                <div class="signal-control-label">

                    <label for="signalDuty">
                        Duty cycle
                    </label>

                    <output id="signalDutyValue">
                    </output>

                </div>

                <input type="range"
                       id="signalDuty"
                       min="5"
                       max="95"
                       step="5"
                       value="${signalState.duty}">

            </div>

        </div>

    `;

    // Waveform selection

    labContent.querySelectorAll('.signal-type')
        .forEach(button => {

            button.addEventListener('click', () => {

                signalState.type =
                    button.dataset.signal;

                updateSignalStudio();

            });

        });


    // Frequency

    document.getElementById('signalFrequency')
        .addEventListener('input', event => {

            signalState.frequency =
                Number(event.target.value);

            updateSignalStudio();

        });


    // Amplitude

    document.getElementById('signalAmplitude')
        .addEventListener('input', event => {

            signalState.amplitude =
                Number(event.target.value);

            updateSignalStudio();

        });


    // Duty cycle

    document.getElementById('signalDuty')
        .addEventListener('input', event => {

            signalState.duty =
                Number(event.target.value);

            updateSignalStudio();

        });


    // Timebase

    document.getElementById('signalTimebase')
        .addEventListener('change', event => {

            signalState.timebase =
                Number(event.target.value);

            updateSignalStudio();

        });


    // Run / Stop

    document.getElementById('signalRunButton')
        .addEventListener('click', () => {

            signalState.running =
                !signalState.running;

            updateSignalStudio();

        });

    updateSignalStudio();

}

// ENGINEERING LAB — MODULE NAVIGATION

const labTabs =
    document.querySelectorAll('.lab-tab');

labTabs.forEach(tab => {

    tab.setAttribute(
        'aria-pressed',
        String(tab.classList.contains('active'))
    );

    tab.addEventListener('click', () => {

        if (tab.disabled) return;

        labTabs.forEach(item => {

            const active = item === tab;

            item.classList.toggle('active', active);

            item.setAttribute(
                'aria-pressed',
                String(active)
            );

        });

        switch (tab.dataset.lab) {

    case 'logic':
        renderDigitalLogicLab();
        break;

    case 'signal':
        renderSignalStudio();
        break;

    case 'processor':
        renderProcessorLab();
        break;

}

    });

});


// ==========================================
// ENGINEERING LAB — PROCESSOR LAB
// ==========================================

const aluState = {
    a: 127,
    b: 1,
    operation: 'ADD'
};

const aluOperations = {

    ADD: 'Addition: A + B',

    SUB: 'Subtraction: A - B',

    AND: 'Bitwise AND: A & B',

    OR: 'Bitwise OR: A | B',

    XOR: 'Bitwise XOR: A ^ B',

    NOT: 'Bitwise inversion: NOT A',

    SLL: 'Logical shift left: A << 1',

    SRL: 'Logical shift right: A >> 1'

};


// Number representation

function aluHex(value) {

    return '0x' + (value & 0xFF)
        .toString(16)
        .toUpperCase()
        .padStart(2, '0');

}

function aluSigned(value) {

    return value & 0x80
        ? value - 256
        : value;

}


// ALU computation

function calculateALU() {

    const { a, b, operation } = aluState;

    let raw = 0;
    let carry = 0;
    let overflow = 0;

    switch (operation) {

        case 'ADD':

            raw = a + b;

            carry = Number(raw > 255);

            break;

        case 'SUB':

            raw = a - b;

            // Carry = 1 means no borrow.

            carry = Number(a >= b);

            break;

        case 'AND':

            raw = a & b;

            break;

        case 'OR':

            raw = a | b;

            break;

        case 'XOR':

            raw = a ^ b;

            break;

        case 'NOT':

            raw = ~a;

            break;

        case 'SLL':

            carry = (a >> 7) & 1;

            raw = a << 1;

            break;

        case 'SRL':

            carry = a & 1;

            raw = a >>> 1;

            break;

    }

    // Limit output to 8 bits.

    const result = raw & 0xFF;

    // Signed overflow detection.

    if (operation === 'ADD') {

        overflow = Number(

            (~(a ^ b) & (a ^ result) & 0x80) !== 0

        );

    } else if (operation === 'SUB') {

        overflow = Number(

            ((a ^ b) & (a ^ result) & 0x80) !== 0

        );

    }

    return {

        result,

        zero: Number(result === 0),

        carry,

        negative: (result >> 7) & 1,

        overflow

    };

}


// Generate register bits

function renderALUBits(value, register = '') {

    return Array.from({ length: 8 }, (_, index) => {

        const bit = 7 - index;

        const active = (value >> bit) & 1;

        const content = register

            ? `
                <button type="button"
                        class="alu-bit ${active ? 'high' : ''}"
                        data-register="${register}"
                        data-bit="${bit}"
                        aria-label="Register ${register.toUpperCase()}, bit ${bit}"
                        aria-pressed="${Boolean(active)}">

                    ${active}

                </button>
            `

            : `
                <span class="alu-bit ${active ? 'high' : ''}">
                    ${active}
                </span>
            `;

        return `

            <div class="alu-bit-wrapper">

                <span class="alu-bit-index">
                    ${bit}
                </span>

                ${content}

            </div>

        `;

    }).join('');

}


// Register interface

function renderALURegister(register) {

    const name = register.toUpperCase();

    return `

        <div class="alu-register">

            <div class="alu-register-header">

                <h4>Register ${name}</h4>

                <span class="alu-register-value"
                      id="aluValue${name}">
                </span>

            </div>

            <div class="alu-bits">

                ${renderALUBits(
                    aluState[register],
                    register
                )}

            </div>

            <input type="range"
                   min="0"
                   max="255"
                   step="1"
                   data-alu-range="${register}"
                   aria-label="Register ${name} value"
                   value="${aluState[register]}">

        </div>

    `;

}


// Update simulator

function updateALUSimulation() {

    const output = calculateALU();

    // Update input registers.

    ['a', 'b'].forEach(register => {

        const value = aluState[register];

        const name = register.toUpperCase();

        document.getElementById(`aluValue${name}`)
            .textContent = `${value} · ${aluHex(value)}`;

        labContent.querySelectorAll(
            `[data-register="${register}"]`
        ).forEach(button => {

            const bit = Number(button.dataset.bit);

            const active = (value >> bit) & 1;

            button.textContent = active;

            button.classList.toggle(
                'high',
                Boolean(active)
            );

            button.setAttribute(
                'aria-pressed',
                String(Boolean(active))
            );

        });

        labContent.querySelector(
            `[data-alu-range="${register}"]`
        ).value = value;

    });

    // Update selected operation.

    labContent.querySelectorAll('.alu-operation')
        .forEach(button => {

            const active =
                button.dataset.operation ===
                aluState.operation;

            button.classList.toggle('active', active);

            button.setAttribute(
                'aria-pressed',
                String(active)
            );

        });

    // Update diagram.

    document.getElementById('aluDiagramOperation')
        .textContent = aluState.operation;

    // Update result register.

    document.getElementById('aluResultBits')
        .innerHTML = renderALUBits(output.result);

    document.getElementById('aluResultHex')
        .textContent = aluHex(output.result);

    document.getElementById('aluResultUnsigned')
        .textContent = output.result;

    document.getElementById('aluResultSigned')
        .textContent = aluSigned(output.result);

    // Update status flags.

    labContent.querySelectorAll('.alu-flag')
        .forEach(flag => {

            const value = output[flag.dataset.flag];

            flag.classList.toggle(
                'active',
                Boolean(value)
            );

            flag.querySelector('strong')
                .textContent =
                    `${flag.dataset.symbol} = ${value}`;

        });

    document.getElementById('aluDescription')
        .textContent =

        aluOperations[aluState.operation] +

        '. Results are limited to 8 bits. ' +

        'NOT and shift operations use register A only.';

}


// Render Processor Lab

function renderProcessorLab() {

    labContent.innerHTML = `

        <div class="alu-header">

            <div>

                <h3>Processor Lab</h3>

                <p>8-bit Arithmetic Logic Unit</p>

            </div>

            <span class="logic-status">

                <span class="status-dot"></span>

                ALU active

            </span>

        </div>


        <div class="alu-registers">

            ${renderALURegister('a')}

            ${renderALURegister('b')}

        </div>


        <div class="alu-diagram">

            <svg viewBox="0 0 400 170"
                 role="img"
                 aria-label="Arithmetic logic unit diagram">

                <!-- Input buses -->

                <g fill="none"
                   stroke="var(--main-color)"
                   stroke-width="2">

                    <path d="M80 15 V40 H145 V65"/>

                    <path d="M320 15 V40 H255 V65"/>

                    <path d="M200 125 V155"/>

                    <path d="M195 150 L200 155 L205 150"/>

                </g>

                <!-- ALU body -->

                <path d="M105 65 H175
                         L200 85 L225 65
                         H295 L250 125
                         H150 Z"

                      fill="#221a16"
                      stroke="var(--main-color)"
                      stroke-width="1.5"/>

                <!-- Labels -->

                <g font-family="monospace"
                   text-anchor="middle"
                   font-size="12"
                   fill="#a1a1aa">

                    <text x="80" y="11">A[7:0]</text>

                    <text x="320" y="11">B[7:0]</text>

                    <text x="200" y="167">Y[7:0]</text>

                    <text x="200" y="103"
                          fill="var(--main-color)"
                          font-size="19"
                          font-weight="bold">

                        ALU

                    </text>

                    <text x="200" y="117"
                          id="aluDiagramOperation">

                        ADD

                    </text>

                </g>

            </svg>

        </div>


        <div class="alu-operations">

            ${Object.keys(aluOperations)
                .map(operation => `

                <button type="button"
                        class="alu-operation"
                        data-operation="${operation}"
                        aria-pressed="false">

                    ${operation}

                </button>

            `).join('')}

        </div>


        <!-- Output register -->

        <div class="alu-result">

            <div class="alu-register-header">

                <h4>Output register</h4>

                <span class="alu-register-value">
                    Y[7:0]
                </span>

            </div>

            <div class="alu-bits"
                 id="aluResultBits">
            </div>

            <div class="alu-result-values">

                <div class="alu-result-value">

                    <small>Hexadecimal</small>

                    <strong id="aluResultHex"></strong>

                </div>

                <div class="alu-result-value">

                    <small>Unsigned</small>

                    <strong id="aluResultUnsigned"></strong>

                </div>

                <div class="alu-result-value">

                    <small>Signed</small>

                    <strong id="aluResultSigned"></strong>

                </div>

            </div>

        </div>


        <!-- Status flags -->

        <h4 class="alu-flags-title">
            Status flags
        </h4>

        <div class="alu-flags">

            ${[
                ['zero', 'Z', 'Zero'],
                ['carry', 'C', 'Carry'],
                ['negative', 'N', 'Negative'],
                ['overflow', 'V', 'Overflow']
            ].map(([flag, symbol, label]) => `

                <div class="alu-flag"
                     data-flag="${flag}"
                     data-symbol="${symbol}">

                    <small>${label}</small>

                    <strong>${symbol} = 0</strong>

                </div>

            `).join('')}

        </div>

        <p class="alu-description"
           id="aluDescription"></p>

    `;


    // Toggle individual input bits.

    labContent.querySelectorAll('[data-register]')
        .forEach(button => {

            button.addEventListener('click', () => {

                const register =
                    button.dataset.register;

                const bit =
                    Number(button.dataset.bit);

                aluState[register] ^= (1 << bit);

                updateALUSimulation();

            });

        });


    // Register sliders.

    labContent.querySelectorAll('[data-alu-range]')
        .forEach(input => {

            input.addEventListener('input', () => {

                aluState[input.dataset.aluRange] =
                    Number(input.value);

                updateALUSimulation();

            });

        });


    // Operation selection.

    labContent.querySelectorAll('.alu-operation')
        .forEach(button => {

            button.addEventListener('click', () => {

                aluState.operation =
                    button.dataset.operation;

                updateALUSimulation();

            });

        });

    updateALUSimulation();

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

