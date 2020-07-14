class ResponeFormat {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  data: any;

 static setResponce(statusCode : number,isSuccess : boolean,message : string,data : any){
      return {
          statusCode : statusCode,
          isSuccess : isSuccess,
          message : message,
          data : data
      }
  }
}

export = ResponeFormat;
