// utils/sendResponse.js
const sendResponse = (res, data, message = "تمت العملية بنجاح", statusCode = 200) => {
    res.status(statusCode).json({
        status: "success",
        data,
        message
    });
};

export default sendResponse;
