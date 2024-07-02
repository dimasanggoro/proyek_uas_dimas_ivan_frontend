import React from 'react';


import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/style.scss";
import "../assets/css/materialdesignicons.min.css";

import Navbar from "../components/navbar/Navbar";
import SmallFooter from "../components/footer/smallFooter";

import Blog from "../components/blog";


export default function Index(){
  return (
    <>
        <Navbar/>
        <section className="section bg-light" id="featuresone">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center mb-0 pb-2">
                            <h4 className="title-heading text-center">Project UAS PEMROGRAMAN WEBFULLSTACK</h4>
                            <h5 className="title-heading text-center">Dosen: Giri Purnama, S.Pd., M.Kom</h5>
                            <ul className="list-inline text-center mb-0">
                              <li className="list-inline-item mx-4 mt-4">
                                <span className="text-black-50 d-block">Nama Mahasiswa</span>
                                <a className="text-black title-dark" href="/blog-standard-post/2">Dimas A Anindyojati</a>
                                <a className="text-black title-dark d-block" href="/blog-standard-post/2">Ivan</a>
                                </li>
                                <li className="list-inline-item mx-4 mt-4">
                                  <span className="text-black-50 d-block">NIM</span>
                                  <span className="text-black title-dark">411211117</span>
                                  <span className="text-black title-dark d-block">4112</span>
                                  </li>
                                  <li className="list-inline-item mx-4 mt-4">
                                    <span className="text-black-50 d-block">Sebagai</span>
                                    <span className="text-black title-dark">Backend Developer</span>
                                    <span className="text-black title-dark d-block">Frontend Developer</span>
                                 </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
       
        <div className="container">
                <Blog/>
        </div>
        <SmallFooter/>
        
    </>
  );
}
