const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
    try {
        // Fetch data from the request body
        const { sectionName, courseId } = req.body;
        // Validate the input
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing required properties",
            });
        }
        // Create a new section with the given name
        const newSection = await Section.create({ sectionName });
        // Add the new section to the course's content array
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        // Return the updated course object in the response
        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId, courseId } = req.body;
        if (!sectionName || !sectionId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}
		const newSection = await Section.findByIdAndUpdate(
			sectionId, 
			{ sectionName },
			{ new: true }
		);
		// Add the new section to the course's content array
        const updatedCourse = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
		res.status(200).json({
			success: true,
			message: "Section updated successfully",
			updatedCourse,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

exports.deleteSection = async (req, res) => {
	try {
		const { sectionId, courseId }  = req.body;
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findByIdAndDelete(sectionId);
        if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
        //delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});
		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course,
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};