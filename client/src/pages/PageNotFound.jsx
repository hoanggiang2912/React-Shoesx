import Button from "../components/Button";
import Section from "../components/Section";

function PageNotFound() {
  return (
    <Section>
      <div className="flex flex-col items-center justify-center">
        <img src="../../src/assets/404-computer.svg" alt="page not found!" />
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">
          Oops! Your page is not found.
        </h2>
        <nav>
          <Button href="/" className="mt-4">
            Back to Home
          </Button>
        </nav>
      </div>
    </Section>
  );
}

export default PageNotFound;
