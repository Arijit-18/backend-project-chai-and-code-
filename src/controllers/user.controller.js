import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //1. get user details from frontend(postman here)
    //2. validation - not empty
    //3. check if user already exists: username, email
    //4. check for images, check for avatar
    //5. upload them to cloudinary, avatar
    //6. create user object - create entry in db
    //7. remove password and refresh token field from response
    //8. check for user creation
    //9. return res

    //1
    const {fullname, email, username, password} = req.body;
    console.log(email);

    //2
    if(
        [fullname, email, username, password].some((field) => (field?.trim() === ""))
    ) {
        throw new ApiError(400, "All fields are required");
    }

    //3
    const existeduUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if(existeduUser) {
        throw new ApiError(409, "User with username or email already exists");
    }

    //multer gives access of files
    //4
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    //5
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }
    // console.log(req.files);

    //6
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    //7
    const createdUser = await User.findById(user._id).select(
        //in created user these 2 field will not be send
        "-password -refreshToken"
    );

    //8
    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    //9
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
});




export {registerUser};