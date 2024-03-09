import React, { useEffect, useState } from "react";
import CountryCode from "../../data/countrycode.json";
import { useForm } from "react-hook-form";
import { contactusEndpoint } from "../../services/apis";
import { apiConnector } from "../../services/apiconnector";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();
    const submitContactForm = async (data) => {
        console.log("Form Data - ", data);
        try {
            setLoading(true);
            const response = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            );
            // const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        } catch (error) {
            console.log("Error:", error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            });
        }
    }, [reset, isSubmitSuccessful]);
    return (
        <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(submitContactForm)}
        >
            <div className="flex gap-5">
                {/* firstName */}
                <div className="flex flex-col gap-2 w-[48%]">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter first name"
                        className="form-style"
                        {...register("firstname", { required: true })}
                    />
                    {errors.firstname && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your name.
                        </span>
                    )}
                </div>
                {/* lastName */}
                <div className="flex flex-col gap-2 w-[48%]">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        className="form-style"
                        placeholder="Enter Last name"
                        {...register("lastname")}
                    />
                </div>
            </div>
            {/* email */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-style"
                    placeholder="Enter email Address"
                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Email address.
                    </span>
                )}
            </div>
            {/* phoneNo */}
            <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber">Phone Number</label>
                <div className="flex gap-5">
                    {/* dropdown */}
                    <select
                        name="dropdown"
                        id="dropdown"
                        className="form-style w-[81px]"
                        {...register("countrycode", { required: true })}
                    >
                        {CountryCode.map((element, index) => {
                            return (
                                <option key={index} value={element.code}>
                                    {element.code} - {element.country}
                                </option>
                            );
                        })}
                    </select>
                    <input
                        type="number"
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="12345 67890"
                        className="form-style w-[calc(100%-90px)]"
                        {...register("phoneNo", {
                            required: {
                                value: true,
                                message: "Please enter Phone Number",
                            },
                            maxLength: {
                                value: 10,
                                message: "Invalid Phone Number",
                            },
                            minLength: {
                                value: 8,
                                message: "Invalid Phone Number",
                            },
                        })}
                    />
                </div>
                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>
            {/* message */}
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="lable-style">
                    Message
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    className="form-style"
                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Message.
                    </span>
                )}
            </div>
            <button
                disabled={loading}
                type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
                    !loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>
        </form>
    );
};

export default ContactUsForm;
