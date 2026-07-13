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

// Serve /public (css, js, images)
app.use(express.static(path.join(__dirname, 'public')));

// ===========================================================================
// SITE CONTENT — everything below is what you'll actually want to edit.
// Nothing in the .hbs templates needs to change; just update the data here.
// ===========================================================================

const name = 'Krizchel Rouz G. Lachica';
const role = 'Statistics Graduate';

// Shown letter-by-letter under the hero title. Keep it short — one line.
const tagline = 'Finding the signal in the noise.';

// One-paragraph intro shown at the top of the About page.
const bioSummary =
  'Statistics graduate with a strong foundation in data analysis, statistical ' +
  'modeling, and turning raw numbers into clear, decision-ready insight. ' +
  '[Replace this paragraph with 2-3 sentences about your interests, the kind ' +
  'of problems you like solving, and what you\'re looking for next.]';

const socials = [
  { icon: 'fab fa-github', url: 'https://github.com/your-username' },
  { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/your-username' },
  { icon: 'fas fa-envelope', url: 'mailto:your.email@example.com' }
];

// ---------------------------------------------------------------------------
// Education — About page "Education" tab.
// ---------------------------------------------------------------------------
const education = [
  {
    school: 'University of the Philippines Diliman',
    degree: 'Bachelor of Science in Statistics',
    period: '[20XX - 20XX]',
    description:
      'Coursework in [Probability & Statistical Inference, Regression Analysis, ' +
      'Sampling Theory, Data Mining, Statistical Computing — edit to match your ' +
      'actual courses].',
    honors: '' // e.g. "Cum Laude" or "Dean's Lister" — leave blank to hide
  }
];

// ---------------------------------------------------------------------------
// Experience — About page "Experience" tab (timeline).
// Add or remove entries freely; the template loops over this array.
// ---------------------------------------------------------------------------
const experience = [
  {
    title: '[Your Role / Job Title]',
    company: '[Company or Organization Name]',
    period: '[Mon 20XX - Mon 20XX]',
    points: [
      '[Describe a key responsibility or dataset you worked with]',
      '[Describe a tool, method, or analysis you contributed]',
      '[Describe an outcome or result, with a number if you have one]'
    ]
  },
  {
    title: '[Another Role]',
    company: '[Company or Organization Name]',
    period: '[Mon 20XX - Mon 20XX]',
    points: [
      '[Describe what you did in this role]',
      '[Add a second bullet if useful]'
    ]
  }
];

// ---------------------------------------------------------------------------
// Skills — About page "Skills" tab. Trim this down to what's actually true.
// ---------------------------------------------------------------------------
const skills = {
  technical: ['R', 'Python', 'SQL', 'Excel / Google Sheets', 'SPSS'],
  analysis: ['Statistical Modeling', 'Hypothesis Testing', 'Regression Analysis', 'A/B Testing', 'Data Cleaning'],
  visualization: ['Tableau', 'Power BI', 'ggplot2', 'matplotlib / seaborn'],
  soft: ['Analytical Thinking', 'Technical Writing', 'Collaboration', 'Attention to Detail']
};

// ---------------------------------------------------------------------------
// Projects — Projects page. Each is marked `sample: true` so the site is
// upfront about placeholder content; set to false (or remove the field)
// once you replace it with a real project.
// ---------------------------------------------------------------------------
const projects = [
  {
    title: 'Sample Project — Exploratory Data Analysis',
    description:
      '[Replace with a real project. Describe the dataset, the question you ' +
      'were answering, your approach, and one concrete finding.]',
    sample: true,
    github: 'https://github.com/your-username',
    tools: ['R', 'ggplot2', 'Statistics']
  },
  {
    title: 'Sample Project — Predictive Model',
    description:
      '[Replace with a real project. What did you predict, what model did you ' +
      'use, and how did you evaluate it?]',
    sample: true,
    github: 'https://github.com/your-username',
    tools: ['Python', 'Regression', 'pandas']
  },
  {
    title: 'Sample Project — Dashboard / Report',
    description:
      '[Replace with a real project. What decision did this dashboard or ' +
      'report support, and who was it for?]',
    sample: true,
    github: 'https://github.com/your-username',
    tools: ['Tableau', 'SQL', 'Data Viz']
  }
];

// ===========================================================================
// Routes
// ===========================================================================
app.get('/', (req, res) => {
  res.render('home', { name, role, tagline, socials, year: new Date().getFullYear() });
});

app.get('/projects', (req, res) => {
  res.render('projects', { name, projects, year: new Date().getFullYear() });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name,
    role,
    bioSummary,
    education,
    experience,
    skills,
    socials,
    year: new Date().getFullYear()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
