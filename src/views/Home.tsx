import Button from "@components/Button";
import AuthForm from "@components/AuthForm";

const Home = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[#f8f3fb] flex justify-center items-center">
        <div className="flex flex-col gap-8 items-center px-4 md:flex-row md:gap-32 md:px-4">
          <div className="inline-flex flex-col gap-4 text-center md:text-start">
            <h1 className="font-bold text-4xl">Organise your way!</h1>
            <p className="text-xl md:max-w-[400px]">
              Part spreadsheet, part database, and entirely flexible, teams use
              Airtable to organize their work, their way.
            </p>
            <Button className="bg-[#282828] text-white hover:bg-black mx-auto md:mx-0">
              Get started
            </Button>
          </div>
          <AuthForm />
        </div>
      </div>
    </>
  );
};

export default Home;
