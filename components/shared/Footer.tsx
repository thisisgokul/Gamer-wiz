const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 p-4 text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} GamerWiz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
