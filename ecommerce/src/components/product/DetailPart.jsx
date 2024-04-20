import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from '../../plugin/react-image-lightbox/index';
import '../../plugin/react-image-lightbox/style.css';

export default function DetailPart({ product }) {
    const zoomImages = [];
    const midImages = [];
    const thumbImages = [];

    product.image.filter((state) =>
        state.includes('zoom') ? zoomImages.push(state) : 
        state.includes('mid')  ? midImages.push(state)  :
        state.includes('thumb') ? thumbImages.push(state) : null
    )

    const [currentImage, setCurrentImage] = useState(midImages[0]);
    const [lightbox, setLightbox] = useState(false);
    const [bigImage, setBigImages] = useState(zoomImages[midImages.indexOf(currentImage)]);
    const nextImage = zoomImages[((zoomImages.indexOf(bigImage) + 1) % zoomImages.length)];
    const prevImage = zoomImages[((zoomImages.indexOf(bigImage) + zoomImages.length - 1) % zoomImages.length)];

    const currentImageHandler = (e) => {
        e.preventDefault(); 
        setCurrentImage(midImages[thumbImages.indexOf(e.target.attributes.src['value'])])
    };


    useEffect(() => {
        setBigImages(zoomImages[midImages.indexOf(currentImage)])
    }, [currentImage]);

    return (
        <div>
            <h1 className="text-4xl text-gray-800 p-5 border-b">{product.name}</h1>
            <div className="md:flex md:justify-evenly">
                <div className="mt-10 flex justify-center items-center md:items-start flex-col">
                    <div>
                        <div className="mt-5">
                            {/* <button onClick={() => setLightbox(true)}>asasas</button> */}
                            <button className="focus:outline-none cursor-zoom-in" onClick={() => setLightbox(true)}>
                            {lightbox &&
                                        
                                <Lightbox 
                                    mainSrc={bigImage}
                                    nextSrc={nextImage}
                                    prevSrc={prevImage}
                                    onCloseRequest={() => {setLightbox(false); setBigImages(zoomImages[midImages.indexOf(currentImage)])}}
                                    onMoveNextRequest={() => setBigImages(nextImage)}
                                    onMovePrevRequest = {() => setBigImages(prevImage)}
                                />
                            } 
                                <img className="inline" alt="midImage" src={currentImage}/>
                            
                            </button>
                        </div>
                        <div className="mt-5">
                            {thumbImages.map((state, index) => {
                                return (
                                    <button key={index} className="focus:outline-none cursor-pointer" onClick={currentImageHandler}>
                                        <img className="w-full h-full inline" alt="midi" src={state}/>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="ml-10 mt-10">
                    <ul>
                        <li className="py-5 flex border-b flex-col items-center">
                            <div>
                                <Link className="bg-gray-800 flex text-base rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-expanded="false" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-20 w-20 rounded-full" src={"/images/profil.png"} alt=""/>
                                </Link>
                            </div>
                            <span className="mt-4">{product.city}</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Owner</span>
                            <Link className="text-blue-800 underline">
                                <span>{product.owner}</span>
                            </Link>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Phone</span>
                            <span className="text-gray-700">{product.phone}</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Ads Date</span>
                            <span className="text-gray-700">{(product.updatedAt.split('T')[0])}</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Species</span>
                            <span className="text-gray-700">{product.category}</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Gender</span>
                            <span className="text-gray-700">{product.gender}</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Age</span>
                            <span className="text-gray-700">{product.age}</span>
                        </li>
                        <li className="py-5 flex border-b">
                            <span className="font-semibold w-1/2 sm:w-48">Seller</span>
                            <span className="text-gray-700">{product.seller}</span>
                        </li>
                    </ul>
                </div>       
            </div>
            <div className="mt-10">
                <h3 className="border-b py-5 font-bold text-3xl">Explanation</h3>
                <div className="mt-4 max-w-6xl">
                    <p>
                        {product.description} 
                    </p>
                </div>
            </div>
        </div>
    )
}