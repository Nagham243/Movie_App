import React from "react" ; 
const Loader = () =>{
    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh" ,
            color :"#FFD700"

        }}>
            <div className="spinner-border " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
     
    )
}
export default Loader;