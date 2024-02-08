
//PROMISE method
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err));
    }
}



export {asyncHandler};

//higher order func
// const asyncHandler = () => {};
// const asyncHandler = (fn) => {() => {}}
// const asyncHandler = (fn) => async () => {} 

// TRY-CATCH method
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(res, res, next);
//     } catch (err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }