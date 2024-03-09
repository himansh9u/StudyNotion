import React from "react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";
import { convertSecondsToTimeDuration } from "../../../utils/convertSecondsToDuration";

export default function CourseAccordionBar({
    section,
    isActive,
    handleActive,
}) {
    const contentEl = useRef(null);
    const [active, setActive] = useState(false);
    const [sectionHeight, setSectionHeight] = useState(0);
    useEffect(() => {
        setActive(isActive?.includes(section._id));
    }, [isActive]);
    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0);
    }, [active]);
    console.log(section);
    return (
        <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
            <div>
                <div
                    className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
                    onClick={() => {
                        handleActive(section._id);
                    }}
                >
                    <div className="flex items-center gap-2">
                        <i
                            className={
                                isActive.includes(section._id)
                                    ? "rotate-180"
                                    : "rotate-0"
                            }
                        >
                            <AiOutlineDown />
                        </i>
                        <p>{section?.sectionName}</p>
                    </div>
                    <div className="space-x-4">
                        <span className="text-yellow-25">
                            {`${section.subSection.length || 0} lecture(s)`}
                        </span>
                        <span className="text-yellow-25">
                            {`${convertSecondsToTimeDuration(section.duration || 0)}`}
                        </span>
                    </div>
                </div>
            </div>
            <div
                ref={contentEl}
                className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
                style={{
                    height: sectionHeight,
                }}
            >
                <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
                    {section?.subSection?.map((subSec, i) => {
                        return (
                            <CourseSubSectionAccordion
                                subSec={subSec}
                                key={i}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
