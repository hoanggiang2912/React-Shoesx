function Section({ children, className }) {
  return (
    <section className={`px-48 py-8 lg:px-48 md:px-10 sm:px-4 ${className}`}>
      {children}
    </section>
  );
}

export default Section;
