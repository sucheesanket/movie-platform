class Apierror extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
        this.isOperational=true;
    }
}

export default Apierror