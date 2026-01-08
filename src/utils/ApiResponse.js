class ApiResponse{
    constructor(statusCode, message){
        this.statusCode=statusCode;
        this.success=statusCode<400;
        this.data=this.data;
        this.message= message||"";

    }
}
export default ApiResponse