import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from "@mui/icons-material/Twitter"; // Replace with actual Twitter icon

const SidePanel = () => {
  const links = [
    {
        href: "https://www.linkedin.com/in/bompalli-narasimhulu-b03566217/",
        icon: <LinkedInIcon sx={{ fontSize: "35px" }} />,
        label: "LinkedIn",
        color: "#0077b5", // LinkedIn primary color
    },
    {
      href: "https://github.com/Bompalli458",
      icon: <GitHubIcon sx={{ fontSize: "30px" }} />,
      label: "GitHub",
      color: "#c9510c", // GitHub primary color
    },
    
    {
      href: "https://twitter.com/your-profile",
      icon: <TwitterIcon sx={{ fontSize: "35px" }} />,
      label: "Twitter",
      color: "#1DA1F2", // Twitter primary color
    },
    {
        href: "https://www.instagram.com/bompalli225/",
        icon: <InstagramIcon sx={{ fontSize: "35px" }} />,
        label: "Instagram",
        color: "#E4405F", // Twitter primary color
      },
  ];

  return (
    <div className="side-panel">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="side-panel-link"
          style={{ "--hover-color": link.color }}
        >
          <div className="icon-container">{link.icon}</div>
        </a>
      ))}
    </div>
  );
};

export default SidePanel;
