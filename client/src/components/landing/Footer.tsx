import logoIcon from "@/assets/logo-icon.png";

const footerLinks = {
  Product: ["Features", "Pricing", "For Farmers", "For Buyers"],
  Company: ["About Us", "Careers", "Blog", "Press"],
  Support: ["Help Center", "Contact", "Privacy", "Terms"],
};

const Footer = () => {
  return (
   <footer className="bg-card text-card-foreground py-16">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-12 mb-12">

      <div>
        <div className="flex items-center gap-2 mb-4">
          <img src={logoIcon} alt="FarmLink" width={32} height={32} className="rounded-full" />
          <span className="font-display text-lg font-bold">
            FarmLink
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Bridging the gap between farmers and markets with transparent pricing and direct connections.
        </p>
      </div>

      {Object.entries(footerLinks).map(([title, links]) => (
        <div key={title}>
          <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">
            {title}
          </h4>

          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} FarmLink. All rights reserved.</p>
    </div>
  </div>
</footer>
  );
};

export default Footer;
