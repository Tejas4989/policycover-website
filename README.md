# PolicyCover - Insurance Services Website

A modern, professional, and fully responsive single-page website for insurance services. Built with clean HTML5, CSS3, and vanilla JavaScript.

## 🌟 Features

- **Modern Design**: Professional and clean design inspired by industry-leading websites
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Single Page Layout**: Smooth scrolling navigation between sections
- **Interactive Elements**: Engaging animations and hover effects
- **Contact Form**: Functional contact form with validation
- **SEO-Friendly**: Semantic HTML and proper meta tags
- **Performance Optimized**: Fast loading with optimized assets
- **Accessibility**: WCAG compliant with keyboard navigation support

## 📋 Sections

1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **About Us**: Company mission, values, and expertise
3. **Services**: Comprehensive insurance offerings including:
   - Auto Insurance
   - Home Insurance
   - Life Insurance
   - Business Insurance
   - Travel Insurance
   - Health & Dental
4. **Why Choose Us**: Key benefits and differentiators
5. **Testimonials**: Client reviews and success stories
6. **Contact**: Contact form and business information
7. **Footer**: Quick links and additional information

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.) for customization

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process or dependencies required.

### Local Development

Simply open the `index.html` file in your browser. For a better development experience with live reload:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## 🎨 Customization

### Colors

The color scheme can be easily customized by modifying the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00D4AA;      /* Main brand color */
    --primary-dark: #00B890;       /* Darker shade for hover states */
    --primary-light: #E6F9F5;      /* Light background tint */
    --secondary-color: #1F2937;    /* Secondary brand color */
    --text-dark: #1F2937;          /* Main text color */
    --text-light: #6B7280;         /* Secondary text color */
}
```

### Content

1. **Company Name**: Search for "PolicyCover" and replace throughout the files
2. **Contact Information**: Update phone, email, and address in the Contact section
3. **Services**: Modify the service cards in the Services section
4. **Testimonials**: Replace with real client testimonials
5. **Images**: Replace SVG placeholders with actual images

### Logo

Replace the SVG logo in the navigation and footer with your company logo:

```html
<img src="path/to/your/logo.png" alt="Your Company Name">
```

## 📱 Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: Below 768px

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Google Fonts**: Inter font family

## 📝 Form Submission

The contact form currently simulates submission (console.log). To make it functional:

1. **Using a Backend Service**: 
   - Integrate with services like Formspree, EmailJS, or Web3Forms
   - Example with Formspree:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

2. **Custom Backend**:
   - Create an API endpoint to handle form submissions
   - Update the form submission handler in `script.js`

3. **Email Services**:
   - Use services like SendGrid, Mailgun, or AWS SES
   - Implement server-side code to process and send emails

## 🌐 Deployment

### Cloudflare Pages (Recommended) ⚡

This site is optimized for Cloudflare Pages deployment. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

**Quick Deploy**:
1. Push code to GitHub
2. Connect to Cloudflare Pages
3. Deploy automatically!

**Features**:
- Global CDN
- Free SSL/HTTPS
- Unlimited bandwidth
- Auto-deploy from GitHub
- Custom domains

### Alternative Deployment Options

#### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select your branch and save
4. Your site will be live at `https://yourusername.github.io/repository-name`

#### Netlify
1. Drag and drop your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your Git repository for automatic deployments

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Traditional Hosting
Upload all files to your web hosting via FTP/SFTP to the public_html directory.

## 🎯 SEO Optimization

- Update the `<title>` tag in `index.html`
- Modify the meta description
- Add your business schema markup
- Include relevant keywords in content
- Add alt text to all images
- Create a `sitemap.xml`
- Add a `robots.txt` file

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🔒 Security Considerations

- Implement CAPTCHA for the contact form (Google reCAPTCHA)
- Use HTTPS in production
- Sanitize form inputs on the backend
- Implement rate limiting for form submissions

## 📊 Performance

- Optimized CSS with minimal dependencies
- Vanilla JavaScript (no heavy frameworks)
- Lazy loading for images (when implemented)
- Minify CSS and JS for production

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📞 Support

For questions or support, please contact:
- Email: info@policycover.com
- Phone: +1 (555) 123-4567

## 📜 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern insurance and SaaS websites
- Icons created with SVG for lightweight performance
- Inter font family from Google Fonts

---

**Made with ❤️ for PolicyCover**

*Last Updated: October 2025*
