import React from "react";
import { Link } from "react-router-dom";

export default function SmallFooter(){
    return(
        <>
        <footer className="bg-footer footer-bar mt-5">
            <div className="footer-py-30">
                <div className="container text-center">
                    <div className="row align-items-center">
                        <div className="col-sm-3">
                            <div className="text-sm-start">
                                <Link to="#" className="logo-footer">
                                    <div src="#" alt="">Lapangan Booking</div>
                                </Link>
                            </div>
                        </div>

                        <div className="col-sm-5 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <div className="text-center">
                                <p className="mb-0">© {new Date().getFullYear()}</p>
                            </div>
                        </div>
    
                        
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}