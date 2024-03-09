import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
];
const TimelineSection = () => {
    return (
        <div className="flex flex-col md:flex-row gap-20 mb-20 items-center">
            <div className="lg:w-[45%] flex flex-col gap-3">
                {timeline.map((element, index) => {
                    return (
                        <div className="flex flex-col gap-2" key={index}>
                            <div className="flex flex-row gap-6">
                                <div className="w-[50px] h-[50px] bg-white flex items-center rounded-full justify-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                    <img src={element.Logo} />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-[18px]">
                                        {element.heading}
                                    </h2>
                                    <p className="text-base">
                                        {element.Description}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={`${
                                    timeline.length - 1 === index
                                        ? "hidden"
                                        : "block"
                                }  h-10 border-dotted border-r-[1.5px] border-richblack-100 bg-richblack-400/0 mb-2 w-[26px]`} 
                            ></div>
                        </div>
                    );
                })}
            </div>
            <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
                <img
                    src={timelineImage}
                    alt="timelineImage"
                    className="shadow-white object-cover h-fit"
                />

                <div
                    className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%] lg:py-10"
                >
                    <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                        <p className="text-3xl font-bold">10</p>
                        <p className="text-caribbeangreen-300 text-sm">
                            Years of Experience
                        </p>
                    </div>

                    <div className="flex gap-5 items-center px-7">
                        <p className="text-3xl font-bold">250</p>
                        <p className="text-caribbeangreen-300 text-sm">
                            Type of Courses
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineSection;
