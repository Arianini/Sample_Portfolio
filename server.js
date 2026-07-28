const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

// ---------------------------------------------------------------------------
// Handlebars setup
// ---------------------------------------------------------------------------
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    eq: (a, b) => a === b
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve FontAwesome (npm install must have run for this folder to exist)
app.use('/assets',
  express.static(path.join(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free'))
);

// Serve /public (css, js, images, resume)
app.use(express.static(path.join(__dirname, 'public')));

// ===========================================================================
// SITE CONTENT — everything below is what you'll actually want to edit.
// Nothing in the .hbs templates needs to change; just update the data here.
// ===========================================================================

const name = 'Krizchel Rouz G. Lachica';
const role = 'Statistics Graduate';

// Shown letter-by-letter under the hero title. Keep it short — one line.
const tagline = 'Finding the signal in the noise.';

// Downloadable résumé. The PDF lives in /public/resume/ and is served at this
// path. Replace the file to update it; the "Résumé" button links here.
const resumeUrl = '/resume/Krizchel-Lachica-Resume.pdf';

// One-paragraph intro shown at the top of the About page.
const bioSummary =
  'Statistics graduate from the University of the Philippines Diliman, eager to ' +
  'apply quantitative and analytical skills in a data-driven professional ' +
  'environment. I bring strong research, data analysis, and documentation ' +
  'experience, with the ability to synthesize complex information into clear, ' +
  'actionable insights — backed by a demonstrated commitment to accuracy, ' +
  'compliance, and continuous learning.';

// Each social needs an `icon`, the `url` it links to, and a `label` (the clean
// text shown on the Contact tab, so visitors don't see "mailto:" / "tel:").
const socials = [
  { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/krizchel-lachica/', label: 'linkedin.com/in/krizchel-lachica' },
  { icon: 'fas fa-envelope', url: 'mailto:krizchellachica@gmail.com', label: 'krizchellachica@gmail.com' },
  { icon: 'fas fa-phone', url: 'tel:+639569918363', label: '+63 956-991-8363' },
  { icon: 'fas fa-location-dot', url: 'https://maps.google.com/?q=Marikina+City+Philippines', label: 'Marikina City, Philippines' }
];

// ---------------------------------------------------------------------------
// Education — About page "Education" tab.
// ---------------------------------------------------------------------------
const education = [
  {
    school: 'University of the Philippines Diliman',
    degree: 'Bachelor of Science in Statistics',
    period: 'Sep 2022 – Jul 2026',
    description:
      'Relevant coursework: Statistical Theory, Regression Analysis, ' +
      'Multivariate Methods, and Machine Learning.',
    honors: '' // no honors listed — leave blank to hide the badge
  },
  {
    school: 'St. Scholastica\'s Academy of Marikina',
    degree: 'Accountancy, Business Management (ABM) Strand',
    period: 'Sep 2020 – Jul 2022',
    description:
      'First Place — "Return on Invest 2021: Conquer Your Tomorrow" ' +
      'business case competition.',
    honors: 'Outstanding Academic Strand Awardee, S.Y. 2021–2022'
  }
];

// ---------------------------------------------------------------------------
// Experience — About page "Experience" tab (timeline).
// Add or remove entries freely; the template loops over this array.
// ---------------------------------------------------------------------------
const experience = [
  {
    title: 'Vice President for Finance and Sales',
    company: 'AIESEC in UP Diliman · Talent Management Department',
    period: 'Jul 2025 – Jan 2026',
    points: [
      'Managed end-to-end event budgeting, tracking revenue and expenses across multiple streams.',
      'Developed sales strategies and tracked outcomes against revenue targets.',
      'Negotiated sponsor contracts, ensuring risk mitigation and organizational policy compliance.'
    ]
  },
  {
    title: 'Team Member — STATeach Programs',
    company: 'UP Statistical Society · Personnel Committee Subcommittee',
    period: 'Aug 2025 – Dec 2025',
    points: [
      'Developed data-informed presentations that communicated statistical concepts to non-technical audiences.',
      'Coordinated the program across multiple stakeholder groups, ensuring consistent follow-through on deliverables within set timelines.'
    ]
  },
  {
    title: 'Director for Internal Controls — Auditing',
    company: 'AIESEC in UP Diliman · Finance and Legalities Administration',
    period: 'Feb 2024 – Jan 2025',
    points: [
      'Developed and implemented internal audit procedures to ensure compliance with organizational policies.',
      'Conducted regular audits of financial records, contracts, and operational processes, identifying and flagging discrepancies.',
      'Prepared audit reports and presented findings and recommendations to internal teams and senior leadership.'
    ]
  },
  {
    title: 'Team Member — Projects and Documentation',
    company: 'UP Statistical Society · Internal Committee Subcommittee',
    period: 'Sep 2024 – Dec 2024',
    points: [
      'Maintained systematic records of organizational initiatives, reviewing outputs for completeness and consistency before submission.',
      'Authored structured reports and articles, shaping them into clear, concise narratives for diverse audiences.'
    ]
  }
];

// ---------------------------------------------------------------------------
// Skills — About page "Skills" tab.
// ---------------------------------------------------------------------------
const skills = {
  technical: ['R / RStudio', 'SAS', 'SQL (upskilling)', 'Python (upskilling)', 'Microsoft Excel', 'Google Workspace'],
  analysis: ['Statistical Modeling', 'Regression Analysis', 'Multivariate Methods', 'Machine Learning', 'Data Analysis', 'Financial Auditing'],
  visualization: ['Canva', 'Microsoft PowerPoint', 'Data-Informed Presentations'],
  soft: ['Research Writing', 'Leadership', 'Stakeholder Coordination', 'Attention to Detail', 'English & Filipino']
};

// ---------------------------------------------------------------------------
// Projects — Projects page. These are drawn from selected academic research
// projects. Add a `github` or `live` URL to any entry to show its link button.
// ---------------------------------------------------------------------------
const projects = [
  {
    title: 'DPWH Infrastructure Project Delays',
    description:
      'Modeled the drivers of on-time completion for DPWH infrastructure ' +
      'projects, using logistic regression and decision-tree modeling in R to ' +
      'identify which project characteristics best predicted delay.',
    sample: false,
    tools: ['R', 'Logistic Regression', 'Decision Trees']
  },
  {
    title: 'Determinants of Provincial Poverty in the Philippines',
    description:
      'Examined province-level determinants of poverty across the Philippines ' +
      'with ordinal logistic regression, ranking the socioeconomic factors ' +
      'most associated with poverty severity.',
    sample: false,
    tools: ['R', 'Ordinal Logistic Regression']
  },
  {
    title: 'Unsupervised Learning on the Ames Housing Dataset',
    description:
      'Applied principal component analysis and K-means clustering to the Ames ' +
      'Housing dataset to reduce dimensionality and surface natural groupings ' +
      'of homes by their underlying characteristics.',
    sample: false,
    tools: ['R', 'PCA', 'K-means Clustering']
  }
];

// ===========================================================================
// Routes
// ===========================================================================
app.get('/', (req, res) => {
  res.render('home', { name, role, tagline, resumeUrl, socials, year: new Date().getFullYear() });
});

app.get('/projects', (req, res) => {
  res.render('projects', { name, projects, year: new Date().getFullYear() });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name,
    role,
    bioSummary,
    resumeUrl,
    education,
    experience,
    skills,
    socials,
    year: new Date().getFullYear()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
