function asyncHandler(fn){
 return function (req,res,next)
 {

    return Promise.resolve(fn(req,res,next)).catch(next)
 }


}
    
export default asyncHandler

// it helps to not write the repetetevie try and catch block of codes in the program