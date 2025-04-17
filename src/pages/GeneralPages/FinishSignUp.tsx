import { useCallback, useState } from "react";
import frame from "../../assets/generalImages/signup_bg.png";
import logo from "../../assets/generalImages/miraton-logo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import CustomSelect from "@/utils/CustomSelect";
import imageframe from "../../assets/generalImages/signin_frame.png";
import ModalLayout from "@/utils/ModalLayout";
import Loader from "@/utils/Loader/Loader";
import { useForm } from "react-hook-form";
import {
  finishSignupSchema,
  FinishSignupValues,
} from "@/utils/validator/finishSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { cn } from "@/utils/cn";
import { usePropertyStore } from "@/store/usePropertyStore";
import { Property, PropertyType } from "@/types/property";
import houseApi from "@/api/houseApi";
import { ErrorHandler } from "@/utils/logger/errorLogger";
import { House } from "@/types/house";
import authApi from "@/api/authApi";
import { ErrorMessage } from "@/utils/pageUtils";

const FinishSignUp = () => {
  const [screen, setScreen] = useState(1);
  const [loading, setLoading] = useState(false);
  const properties = usePropertyStore((state) => state.properties);
  const [houses, setHouses] = useState<House[]>([]);

  // Form states
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FinishSignupValues>({
    resolver: zodResolver(finishSignupSchema),
  });

  const estateOptions = properties.map((property) => property.name);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  if (email) {
    setValue("email", email); // Set the email value in the form
  }

  const onSubmit = async (data: FinishSignupValues) => {
    setLoading(true);
    try {
      const res = await authApi.addHouseDetails(data);
      if (res.error) {
        ErrorMessage(res.message);
        return;
      } else {
        setScreen(2);
      }
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEstateSelection = async (selectedOption: string) => {
    setValue("house", ""); // Reset the house address when estate changes
    setHouses([]); // Clear the house options array
    const selectedProperty = properties.find(
      (property: Property) => property.name === selectedOption
    );
    setValue("estate", selectedProperty?.id || "");
    // Populate house options based on selected estate
    selectedProperty && fetchHouses(selectedProperty.id);
  };

  const handleHouseSelection = (selectedOption: string) => {
    const selectedHouse = houses.find(
      (house: House) => house.address === selectedOption
    );
    setValue("house", (selectedHouse && selectedHouse.id) || "");
  };

  // Fetch houses based on selected property
  // Memoize the fetchHouses function to avoid unnecessary re-creations
  const fetchHouses = useCallback(async (propertyId: string) => {
    try {
      const { data } = await houseApi.getHouses(propertyId);
      if (data) {
        setHouses(data);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  }, []);

  return (
    <div className="w-full h-screen ">
      {loading && (
        <ModalLayout setModal={setLoading} addclas="w-fit">
          <Loader title="processing" />
        </ModalLayout>
      )}

      {screen === 1 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* LEFT SIDE IMAGE PANEL */}
            <div className="hidden h-full lg:block relative">
              <img
                src={logo}
                className="absolute w-[6rem]  top-10 left-20 z-20 "
                alt=""
              />
              <div className="flex items-start text-white flex-col absolute bottom-10 z-10 left-10">
                <div className="font-bold text-[40px]">Get Started with Us</div>
                <div className="text-[16px] font-light">
                  Complete these easy steps to register your account.
                </div>
              </div>
              <img
                src={imageframe}
                alt="image frame"
                className="h-[100dvh]  z-0 rounded-md w-full object-cover"
              />
            </div>
            <div className="w-full  flex flex-col gap-5 py-10 overflow-auto">
              <div className="flex items-center lg:hidden w-full justify-center">
                <img src={logo} className="w-[8rem]" alt="" />
              </div>
              <div className="text-center border border-[var(--gray)] rounded-md lg:border-none  flex items-center gap-3 flex-col w-11/12 mx-auto p-5 ">
                <div className="flex items-center flex-col">
                  <div className="font-semibold text-[var(--dark)] text-[20px]">
                    Complete your details
                  </div>
                  <div className="text-center">
                    Enter your residential information to use services tailored
                    for you
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-2/5 mx-auto"
                >
                  <div className="mt-10 flex w-full mx-auto items-start flex-col gap-5">
                    <div className="w-full pt-1">
                      <CustomSelect
                        label={`Select Estate/Apartment`}
                        options={estateOptions}
                        onSelect={handleEstateSelection}
                      />
                      {errors.estate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.estate?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full pt-1">
                      <CustomSelect
                        label={`Select House/Flat`}
                        options={houses.map((house) => house.address)}
                        onSelect={handleHouseSelection}
                      />
                      {errors.house && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.house?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full text-left">
                      <Input
                        {...register("meter_number")}
                        label="Prepaid meter number"
                        placeholder="Enter your prepaid meter number"
                        error={
                          errors.meter_number && errors.meter_number?.message
                        }
                      />
                    </div>
                    <div className="w-full flex justify-center">
                      <Button
                        name="Continue"
                        className={cn(
                          "text-white w-full p-3 rounded-lg",
                          "bg-[var(--primary)]"
                        )}
                        loaderColor="#ffffff"
                        type="submit"
                        isLoading={loading}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {screen === 2 && (
        <div className="relative h-full text-white">
          <img src={frame} className="w-full z-0 h-[100dvh] " alt="" />
          <img
            src={logo}
            className="absolute w-[6rem]  top-10 left-20 z-20 "
            alt=""
          />
          <div className="w-11/12 mx-auto absolute flex-col lg:flex-row left-1/2 -translate-x-1/2 bottom-10 flex lg:items-center  z-20 gap-4 lg:gap-0 lg:justify-between">
            <div className="flex items-start flex-col  gap-1 lg:w-3/4 w-full">
              <div className="font-bold text-[28px] lg:text-[40px]  w-full">
                Welcome to Miraton Rose
              </div>
              <div className="text-[16px] font-light">
                Making utility vending seamless and easy for home owners and
                estate managers
              </div>
            </div>

            <Link
              to={`/signin`}
              className="lg:w-[30%] w-fit gap-2 border cursor-pointer justify-between px-3 py-2.5 rounded-md flex  items-center  bg-white text-[var(--dark-green)]  "
            >
              <div className="text-[15px] md:text-[18px]">
                Login to your Dashboard
              </div>
              <div className="w-fit py-2 px-3 rounded-md bg-[var(--dark-green)] text-white flex items-center justify-center ">
                <FaArrowRightLong className="text-white" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinishSignUp;
