import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
import ReactStars from "react-rating-stars-component";
import GetAvgRating from "../../../../utils/avgRating";

const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col w-full">
            {cart.map((course, index) => (
                <div
                    key={course._id}
                    className={`xl:flex w-full items-start justify-between xl:space-y-0 space-y-6 gap-6 ${
                        index !== cart.length - 1 &&
                        "border-b border-b-richblack-400 pb-6"
                    } ${index !== 0 && "mt-6"} `}
                >
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <img
                            src={course?.thumbnail}
                            alt={course?.courseName}
                            className="h-[148px] w-[220px] rounded-lg object-cover"
                        />
                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-richblack-5">
                                {course?.courseName}
                            </p>
                            <p className="text-sm text-richblack-300">
                                {course?.category?.name}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-yellow-5">{GetAvgRating(course.ratingAndReviews)}</span>
                                <ReactStars
                                    count={5}
                                    value={GetAvgRating(course.ratingAndReviews)}
                                    size={18}
                                    edit={false}
                                    activeColor="#ffd700"
                                    isHalf={true}
                                />
                                <span className="text-richblack-400">
                                    ({course?.ratingAndReviews?.length} Ratings)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 w-fit">
                        <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                            className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                        >
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                        </button>
                        <p className="mb-6 text-2xl font-medium text-yellow-100">
                            ₹ {course?.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RenderCartCourses;
