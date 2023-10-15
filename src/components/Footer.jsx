const Footer = () => {
  return (
    <footer className="bg-gray-900 container mx-auto p-8 text-sm text-teal-500 text-center border-t border-dashed border-teal-600">
      <p> &copy; {new Date().getFullYear} TodoApp. All Right Reserved.</p>
    </footer>
  );
};

export default Footer;
