import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Instructor = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const toastId = toast.loading("Loading...");
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            toast.dismiss(toastId);
            console.log(instructorApiData);
            if (instructorApiData.length) setInstructorData(instructorApiData);
            if (result) {
                setCourses(result);
            }
            setLoading(false);
        })();
    }, []);
    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    );
    const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    );
    return (
        <div className="min-w-[380px]">
            <div className="space-y-2 my-8">
                <h1 className="text-2xl font-bold text-richblack-5">
                    Hi {user?.firstName} 👋
                </h1>
                <p className="font-medium text-richblack-200">
                    Let's start something new
                </p>
            </div>
            {loading ? (
                <div className="h-[calc(100vh-12.5rem)] grid flex-1 place-items-center">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    <div className="my-4 lg:flex lg:space-x-4 space-y-4 lg:space-y-0">
                        {totalAmount > 0 || totalStudents > 0 ? (
                            <InstructorChart courses={instructorData} />
                        ) : (
                            <div className="rounded-md bg-richblack-800 p-6">
                                <p className="text-lg font-bold text-richblack-5">
                                    Visualize
                                </p>
                                <p className="mt-4 text-xl font-medium text-richblack-50">
                                    Not Enough Data To Visualize
                                </p>
                            </div>
                        )}
                        {/* Total Statistics */}
                        <div className="flex w-full min-w-[30%] flex-col rounded-md bg-richblack-800 p-8">
                            <p className="text-lg font-bold text-richblack-5">
                                Statistics
                            </p>
                            <div className="md:flex lg:flex-col mt-4 lg:space-y-4 md:space-x-8 lg:space-x-0">
                                <div>
                                    <p className="text-lg text-richblack-200">
                                        Total Courses
                                    </p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        {courses.length}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">
                                        Total Students
                                    </p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        {totalStudents}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">
                                        Total Income
                                    </p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        ₹ {totalAmount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md bg-richblack-800 p-6">
                        {/* Render 3 courses */}
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-richblack-5">
                                Your Courses
                            </p>
                            <Link to="/dashboard/my-courses">
                                <p className="text-xs font-semibold text-yellow-50">
                                    View All
                                </p>
                            </Link>
                        </div>
                        <div className="my-4 flex items-start space-x-6">
                            {courses.slice(0, 3).map((course, index) => (
                                <div
                                    key={course._id}
                                    className={`w-full ${
                                        index == 2 ? "hidden lg:block" : ""
                                    } ${
                                        index == 1 ? "hidden md:block" : ""
                                    }`}
                                >
                                    <img
                                        src={course.thumbnail}
                                        alt={course.courseName}
                                        className="h-[201px] w-full rounded-md object-cover"
                                    />
                                    <div className="mt-3 w-full">
                                        <p className="text-sm font-medium text-richblack-50">
                                            {course.courseName}
                                        </p>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <p className="text-xs font-medium text-richblack-300">
                                                {course.studentsEnrolled.length}{" "}
                                                students
                                            </p>
                                            <p className="text-xs font-medium text-richblack-300">
                                                |
                                            </p>
                                            <p className="text-xs font-medium text-richblack-300">
                                                ₹ {course.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Instructor;
