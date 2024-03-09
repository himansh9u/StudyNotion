import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import "video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const playerRef = useRef(null);
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } =
        useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] = useState([]);
    const [previewSource, setPreviewSource] = useState("");
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (!courseSectionData.length) return;
            if (!courseId || !sectionId || !subSectionId) {
                navigate(`/dashboard/enrolled-courses`);
            } else {
                const filteredData = courseSectionData.filter(
                    (section) => section._id === sectionId
                );
                const filteredVideoData = filteredData?.[0]?.subSection.filter(
                    (data) => data._id === subSectionId
                );
                setVideoData(filteredVideoData[0]);
                setPreviewSource(courseEntireData.thumbnail);
                setVideoEnded(false);
            }
        })();
    }, [courseSectionData, courseEntireData, location.pathname]);

    // check if the lecture is the first video of the course
    const isFirstVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId);

        if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
            return true;
        } else {
            return false;
        }
    };
    // check if the lecture is the last video of the course
    const isLastVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const noOfSubsections =
            courseSectionData[currentSectionIndx].subSection.length;

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId);
        if (
            currentSectionIndx === courseSectionData.length - 1 &&
            currentSubSectionIndx === noOfSubsections - 1
        ) {
            return true;
        } else {
            return false;
        }
    };
    const goToNextVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
        const noOfSubsections =
            courseSectionData[currentSectionIndx].subSection.length;
        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId);
        if (currentSubSectionIndx !== noOfSubsections - 1) {
            const nextSubSectionId =
                courseSectionData[currentSectionIndx].subSection[
                    currentSubSectionIndx + 1
                ]._id;
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            );
        } else {
            const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
            const nextSubSectionId =
                courseSectionData[currentSectionIndx + 1].subSection[0]._id;
            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            );
        }
    };
    const goToPrevVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId);
        if (currentSubSectionIndx !== 0) {
            const prevSubSectionId =
                courseSectionData[currentSectionIndx].subSection[
                    currentSubSectionIndx - 1
                ]._id;
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            );
        } else {
            const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
            const prevSubSectionLength =
                courseSectionData[currentSectionIndx - 1].subSection.length;
            const prevSubSectionId =
                courseSectionData[currentSectionIndx - 1].subSection[
                    prevSubSectionLength - 1
                ]._id;
            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            );
        }
    };
    const handleLectureCompletion = async () => {
        setLoading(true);
        const res = await markLectureAsComplete(
            { courseId: courseId, subsectionId: subSectionId },
            token
        );
        if (res) {
            dispatch(updateCompletedLectures(subSectionId));
        }
        setLoading(false);
    };
    return (
        <div className="flex flex-col gap-5 text-white">
            {!videoData ? (
                <img
                    src={previewSource}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                />
            ) : (
                <Player
                    ref={playerRef}
                    aspectRatio="16:9"
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData?.videoUrl}
                >
                    <BigPlayButton position="center" />
                    {videoEnded && (
                        <div
                            style={{
                                backgroundImage:
                                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                            }}
                            className="full absolute inset-0 z-[20] grid h-full place-content-center font-inter"
                        >
                            {!completedLectures.includes(subSectionId) && (
                                <IconBtn
                                    disabled={loading}
                                    onclick={() => handleLectureCompletion()}
                                    text={
                                        !loading
                                            ? "Mark As Completed"
                                            : "Loading..."
                                    }
                                    customClasses="text-xl max-w-max px-4 mx-auto"
                                />
                            )}
                            <IconBtn
                                disabled={loading}
                                onclick={() => {
                                    if (playerRef?.current) {
                                        // set the current time of the video to 0
                                        playerRef?.current?.video?.seek(0);
                                        playerRef?.current?.video?.play();
                                        setVideoEnded(false);
                                    }
                                }}
                                text="Rewatch"
                                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                            />
                            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                {!isFirstVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToPrevVideo}
                                        className="blackButton"
                                    >
                                        Prev
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button
                                        disabled={loading}
                                        onClick={goToNextVideo}
                                        className="blackButton"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </Player>
            )}
        </div>
    );
};

export default VideoDetails;
