import { GoArrowRight } from "react-icons/go";
import { cn } from "@/utils/cn";
import QuickPurchase from "@/pages/GeneralPages/QuickPurchase";

const WhoWeServe = () => {
  const serveTemplates = [
    {
      img: "assets/images/residenceicon.png",
      title: "Residential Estates & Gated Communities",
    },
    {
      img: "assets/images/propicon.png",
      title: "Property Developers & Estate Managers",
    },
    {
      img: "assets/images/utilsicon.png",
      title: "Utility Providers & Municipal Authorities",
    },
    {
      img: "assets/images/build.png",
      title: "Commercial & Industrial Facilities",
    },
    {
      img: "assets/images/renewicon.png",
      title: "Renewable Energy Investors",
    },
    {
      img: "assets/images/truckicon.png",
      title: "Fleet & Transport Companies (EV Charging Infrastructure)",
    },
  ];
  return (
    <div className="flex items-start gap-10 flex-col">
      <div
        className={cn(
          "w-full relative py-20 bg-cover bg-center",
          `bg-[url(/assets/images/serve-frame.png)]`
        )}
      >
        <div className="w-full flex items-center gap-2 flex-col mb-10">
          <div className="font-bold leading-[1.2] text-[30px] lg:text-[35px]">
            Who we serve
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 w-full mt-10">
            {serveTemplates.map((item, i) => (
              <div
                key={i}
                className="bg-transparent border p-3 rounded-md h-32 flex items-start flex-col justify-between"
              >
                <img src={item.img} alt="image icons" />
                <div className="text-[16px] w-10/12 text-white">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <QuickPurchase />
      <div className="w-full">
        <div
          className={cn(
            "w-11/12 mx-auto rounded-xl relative py-10 bg-cover bg-center",
            `bg-[url(/assets/images/solutionsframe.png)]`
          )}
        >
          <div className="w-11/12 mx-auto flex items-center flex-col gap-10">
            <div className="lg:w-[65%] mx-auto text-center text-[25px] font-bold lg:text-[30px]">
              Smart Utilities, Secure Estates, Sustainable Energy. All in One
              Platform
            </div>
            <div className="flex w-full md:w-fit flex-col md:flex-row items-center justify-center gap-3">
              <div className="w-full md:w-auto px-4 py-3 text-[var(--primary)] cursor-pointer hover:scale-105 transition duration-500 ease-in-out flex items-center justify-center gap-2 rounded-md bg-white">
                <div>Get started today</div>
                <GoArrowRight className="text-[var(--primary)] font-bold text-2xl" />
              </div>
              <button
                type="button"
                className="w-full md:w-auto cursor-pointer hover:scale-105 transition duration-500 ease-in-out px-4 py-[.7rem] rounded-md border bg-transparent"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeServe;
