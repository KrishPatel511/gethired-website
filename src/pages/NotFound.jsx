import { Link } from "react-router-dom";
import { useArrayTranslation } from "../components/common/hooks/useArrayTranslation";
import Button from "../components/ui/Button";

const NotFound = () => {
  const notFound = useArrayTranslation("not_found");

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-[72px]">
      <h1 className="text-4xl sm:text-5xl font-bold text-navy">
        {notFound?.title}
      </h1>
      <p className="mt-4 text-base text-[#4d5b7c]">{notFound?.description}</p>
      <Link to="/">
        <Button className="mt-8">{notFound?.cta}</Button>
      </Link>
    </section>
  );
};

export default NotFound;
