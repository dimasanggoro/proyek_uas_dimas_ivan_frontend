import React from "react";
import { Link } from "react-router-dom";

import { blogData } from "../data/data";

import {MdOutlineArrowForward,AiOutlineHeart,FaRegComment,FaRegCalendar} from "../assets/icons/vander"

export default function Blog(){
    return(
        <div className="row">
            {blogData.slice(0,3).map((item,index)=>{
                return(
                    <div className="col-lg-4 col-md-6 mt-4 pt-2" key={index}>
                        <div className="card blog blog-primary shadow rounded overflow-hidden border-0">
                            <div className="card-img image position-relative overflow-hidden">
                                <div className="position-relative overflow-hidden">
                                    <img src={item.image} className="img-fluid" alt=""/>
                                    <div className="card-overlay"></div>
                                </div>

                                <div className="blog-tag">
                                    <Link to="/blog-standard-post" className="badge bg-light text-dark">{item.tag}</Link>
                                </div>

                                <div className="read-more">
                                    <Link to="/blog-standard-post" className="text-white title-dark-50">More <MdOutlineArrowForward/></Link>
                                </div>
                            </div>

                            <div className="card-body content p-0">
                                <div className="p-4">
                                    <Link to="/blog-standard-post" className="h5 title text-dark d-block mb-0">{item.title}</Link>
                                    <p className="text-muted mt-2 mb-0">{item.desc}</p>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}