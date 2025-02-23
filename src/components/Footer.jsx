import { resourcesLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-4">About Us</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index} className="flex items-center space-x-2">
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-neutral-300 hover:text-white"
                >
                  {link.text} {/* LinkedIn Icon */}
                  {/* <span>{link.href.includes("charvi") ? "Charvi Wadhwa" : "Disha Sahay"}</span> */}
                 
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;