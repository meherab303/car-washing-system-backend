/* eslint-disable @typescript-eslint/no-explicit-any */
export const emptyDataCheck=(result:any[] )=>{
    if (Array.isArray(result)) {
        if (result.length === 0) {
          return {
            success: true,
            message: "No Data Found",
            data: [],  
          };
        }
      }
    
    return null
}