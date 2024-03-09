import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import HighlightText from "./HighlightText";

const Codeblocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codeColor,
}) => {
    return (
        <div className={`w-[100%] flex ${position} my-20 justify-between flex-col gap-10`}>
            {/* Section 1  */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {heading}

                {/* Sub Heading */}
                <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
                    {subheading}
                </div>

                {/* Button Group */}
                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
                        <div className="flex items-center gap-2">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>
            {/* Section 2  */}
            <div className="code-border relative h-fit w-[100%] lg:w-[470px] flex flex-row leading-[22px] text-[14px] py-3">
                {backgroundGradient}
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>
                <div
                    className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
                >
                    <TypeAnimation
                        splitter={(str)=> [...str]}
                        sequence={[codeblock, 1000, ""]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                        style={{ whiteSpace: "pre-line", display: "inline-block" }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Codeblocks;
